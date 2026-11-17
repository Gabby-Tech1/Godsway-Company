/**
 * POST /api/enquiry — Vercel Function that emails website enquiries via Resend.
 *
 * Environment variables (Vercel → Project → Settings → Environment Variables):
 *   RESEND_API_KEY  required. From https://resend.com/api-keys
 *   ENQUIRY_TO      inbox that receives enquiries (default info@godswaycompany.com)
 *   ENQUIRY_FROM    verified sender, e.g. "Godsway Website <web@godswaycompany.com>"
 *                   (default uses Resend's test sender, which only delivers to
 *                   the Resend account owner's own address until a domain is verified)
 */

declare const process: { env: Record<string, string | undefined> };

const LIMITS: Record<string, number> = {
  kind: 20,
  name: 120,
  company: 160,
  email: 200,
  phone: 40,
  service: 80,
  machine: 120,
  start: 60,
  duration: 60,
  location: 160,
  message: 5000,
};

const LABELS: Record<string, string> = {
  name: "Name",
  company: "Company",
  email: "Email",
  phone: "Phone",
  service: "Service",
  machine: "Machine",
  start: "Start date",
  duration: "Duration",
  location: "Site location",
  message: "Message",
};

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "content-type": "application/json" } });

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(request: Request) {
  let raw: Record<string, unknown>;
  try {
    raw = await request.json();
  } catch {
    return json({ ok: false, error: "Invalid request." }, 400);
  }

  // Honeypot: real people never fill the hidden "website" field.
  if (typeof raw.website === "string" && raw.website.trim()) return json({ ok: true });

  const data: Record<string, string> = {};
  for (const [key, max] of Object.entries(LIMITS)) {
    const v = raw[key];
    if (typeof v === "string" && v.trim()) data[key] = v.trim().slice(0, max);
  }

  if (!data.name) return json({ ok: false, error: "Please add your name." }, 422);
  if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return json({ ok: false, error: "Please add a valid email address." }, 422);
  }
  if (data.kind === "contact" && !data.message) return json({ ok: false, error: "Please add a message." }, 422);

  const key = process.env.RESEND_API_KEY;
  if (!key) return json({ ok: false, error: "Email sending is not configured yet." }, 503);

  const isQuote = data.kind === "quote";
  const subject = `${isQuote ? "Quote request" : "Website enquiry"}${data.machine ? `: ${data.machine}` : data.service ? `: ${data.service}` : ""} — ${data.name}`;
  const rows = Object.entries(LABELS)
    .filter(([k]) => data[k])
    .map(([k, label]) => [label, data[k]] as const);

  const text = rows.map(([l, v]) => `${l}: ${v}`).join("\n");
  const html = `
    <div style="font-family:system-ui,sans-serif;max-width:560px">
      <h2 style="margin:0 0 16px">${escape(subject)}</h2>
      <table style="border-collapse:collapse;width:100%">
        ${rows
          .map(
            ([l, v]) =>
              `<tr><td style="padding:8px 12px;border-bottom:1px solid #eee;color:#666;vertical-align:top;white-space:nowrap">${escape(l)}</td><td style="padding:8px 12px;border-bottom:1px solid #eee;white-space:pre-wrap">${escape(v)}</td></tr>`,
          )
          .join("")}
      </table>
      <p style="color:#999;font-size:12px;margin-top:16px">Sent from the Godsway website. Reply to this email to answer ${escape(data.name)} directly.</p>
    </div>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.ENQUIRY_FROM || "Godsway Website <onboarding@resend.dev>",
      to: (process.env.ENQUIRY_TO || "info@godswaycompany.com").split(",").map((s) => s.trim()),
      reply_to: data.email,
      subject,
      text,
      html,
    }),
  });

  if (!res.ok) {
    console.error("Resend error", res.status, await res.text().catch(() => ""));
    return json({ ok: false, error: "We couldn't send your message right now." }, 502);
  }
  return json({ ok: true });
}
