import { useCallback, useState } from "react";
import { company, whatsappLink } from "@/data/site";

export type EnquiryKind = "quote" | "contact";
export type EnquiryFields = Record<string, string>;

export type EnquiryState =
  | { status: "idle" }
  | { status: "sending" }
  | { status: "sent"; name: string }
  | { status: "invalid"; error: string }
  /** server unreachable or not configured: offer email / WhatsApp instead */
  | { status: "fallback"; fields: EnquiryFields; kind: EnquiryKind };

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

const summary = (fields: EnquiryFields) =>
  Object.entries(LABELS)
    .filter(([k]) => fields[k]?.trim())
    .map(([k, l]) => `${l}: ${fields[k].trim()}`)
    .join("\n");

const subjectFor = (kind: EnquiryKind, f: EnquiryFields) =>
  `${kind === "quote" ? "Quote request" : "Website enquiry"}${f.machine ? `: ${f.machine}` : f.service ? `: ${f.service}` : ""}`;

export const mailtoFor = (kind: EnquiryKind, f: EnquiryFields) =>
  `mailto:${company.email}?subject=${encodeURIComponent(subjectFor(kind, f))}&body=${encodeURIComponent(summary(f))}`;

export const whatsappFor = (kind: EnquiryKind, f: EnquiryFields) =>
  whatsappLink(`Hello Godsway, ${kind === "quote" ? "I'd like a quote" : "I have an enquiry"}.\n\n${summary(f)}`);

/** Sends an enquiry to /api/enquiry and tracks the result for the UI. */
export function useEnquiry(kind: EnquiryKind) {
  const [state, setState] = useState<EnquiryState>({ status: "idle" });

  const submit = useCallback(
    async (fields: EnquiryFields) => {
      setState({ status: "sending" });
      try {
        const res = await fetch("/api/enquiry", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...fields, kind }),
        });
        const body = (await res.json().catch(() => null)) as { ok?: boolean; error?: string } | null;
        if (res.ok && body?.ok) return setState({ status: "sent", name: fields.name?.split(" ")[0] ?? "" });
        if (res.status === 422 && body?.error) return setState({ status: "invalid", error: body.error });
        setState({ status: "fallback", fields, kind });
      } catch {
        setState({ status: "fallback", fields, kind });
      }
    },
    [kind],
  );

  const reset = useCallback(() => setState({ status: "idle" }), []);
  return { state, submit, reset };
}
