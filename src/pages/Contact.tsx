import { ArrowRight, ArrowUpRight, Loader2 } from "lucide-react";
import Words from "@/components/Words";
import EnquiryResult, { Honeypot } from "@/components/EnquiryResult";
import { WhatsAppIcon } from "@/components/WhatsApp";
import { company, serviceOptions, whatsappLink } from "@/data/site";
import { useEnquiry } from "@/lib/enquiry";

export default function Contact() {
  const { state, submit: send, reset } = useEnquiry("contact");
  const sending = state.status === "sending";
  const done = state.status === "sent" || state.status === "fallback";

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    send(Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>);
  };

  const tel = (n: string) => `tel:${n.replace(/\s/g, "")}`;

  return (
    <>
      <section className="relative pt-32 md:pt-40">
        <div className="wrap">
          <p data-reveal="up" className="label mb-8 flex items-center gap-3">
            <span className="h-px w-8 bg-gold" /> Contact
          </p>
          <h1 data-reveal="words" className="display text-[19vw] md:text-[11rem] lg:text-[13rem]">
            <Words text="Talk to" /> <Words text="us." className="text-molten" />
          </h1>
        </div>
      </section>

      <section className="wrap grid gap-16 py-20 md:grid-cols-12 md:py-28">
        {/* details */}
        <div className="space-y-12 md:col-span-5">
          <a href={`mailto:${company.email}`} data-reveal="up" className="group block border-b border-line pb-8">
            <p className="label mb-3">Email</p>
            <p className="flex items-center justify-between gap-4 text-2xl transition-colors group-hover:text-gold md:text-3xl">
              {company.email} <ArrowUpRight className="shrink-0" />
            </p>
            <p className="mt-2 text-bone-muted">Projects: {company.projectsEmail}</p>
          </a>

          <a href={tel(company.phone)} data-reveal="up" className="group block border-b border-line pb-8">
            <p className="label mb-3">Phone</p>
            <p className="flex items-center justify-between gap-4 text-2xl transition-colors group-hover:text-gold md:text-3xl">
              {company.phone} <ArrowUpRight className="shrink-0" />
            </p>
            <p className="mt-2 text-bone-muted">Emergency: {company.emergencyPhone}</p>
          </a>

          <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" data-reveal="up" className="group block border-b border-line pb-8">
            <p className="label mb-3">WhatsApp</p>
            <p className="flex items-center justify-between gap-4 text-2xl transition-colors group-hover:text-[#25D366] md:text-3xl">
              <span className="inline-flex items-center gap-3"><WhatsAppIcon className="h-7 w-7" /> Chat with us</span> <ArrowUpRight className="shrink-0" />
            </p>
            <p className="mt-2 text-bone-muted">Quickest way to check availability</p>
          </a>

          <div data-reveal="up" className="grid grid-cols-2 gap-8 border-b border-line pb-8">
            <div>
              <p className="label mb-3">Office</p>
              <p className="text-lg">{company.city}</p>
              <p className="text-bone-muted">{company.region}</p>
            </div>
            <div>
              <p className="label mb-3">Hours</p>
              <dl className="space-y-1 text-sm">
                {company.hours.map(([d, h]) => (
                  <div key={d} className="flex justify-between gap-3">
                    <dt className="text-bone-muted">{d}</dt>
                    <dd>{h}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div data-reveal="up" className="flex items-center gap-4 rounded-lg border border-gold/30 bg-gold/5 p-5">
            <span className="relative flex h-3 w-3">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-60" />
              <span className="relative inline-flex h-3 w-3 rounded-full bg-gold" />
            </span>
            <p className="text-sm"><span className="text-gold">24/7 emergency support.</span> Breakdowns don't wait for office hours, and neither do we.</p>
          </div>
        </div>

        {/* form */}
        <div className="md:col-span-6 md:col-start-7">
          <div data-reveal="up" className="relative rounded-lg border border-line bg-ink-900 p-6 sm:p-10">
            {done ? (
              <EnquiryResult state={state} onReset={reset} />
            ) : (
              <form onSubmit={submit} className="relative grid gap-7">
                <Honeypot />
                <h2 className="display text-5xl">Send a message</h2>
                <div className="grid gap-7 sm:grid-cols-2">
                  <input name="name" required maxLength={120} placeholder="Your name *" className="field" autoComplete="name" />
                  <input name="company" maxLength={160} placeholder="Company" className="field" autoComplete="organization" />
                  <input name="email" type="email" required maxLength={200} placeholder="Email *" className="field" autoComplete="email" />
                  <input name="phone" type="tel" maxLength={40} placeholder="Phone / WhatsApp" className="field" autoComplete="tel" />
                </div>
                <select name="service" defaultValue="" className="field appearance-none">
                  <option value="" className="bg-ink">What's it about?</option>
                  {serviceOptions.map((s) => (
                    <option key={s} value={s} className="bg-ink">{s}</option>
                  ))}
                </select>
                <textarea name="message" required rows={5} maxLength={5000} placeholder="Tell us about your project *" className="field resize-none" />
                {state.status === "invalid" && <p role="alert" className="text-sm text-gold">{state.error}</p>}
                <button type="submit" disabled={sending} className="btn-gold justify-center py-4 disabled:opacity-70">
                  {sending ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Sending…
                    </>
                  ) : (
                    <>
                      Send message <ArrowRight size={16} />
                    </>
                  )}
                </button>
                <a href={whatsappLink()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 text-sm text-bone-muted hover:text-[#25D366]">
                  <WhatsAppIcon className="h-4 w-4" /> Prefer WhatsApp? Message us instead
                </a>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* map */}
      <section className="wrap pb-24 md:pb-36">
        <div data-reveal="img" className="relative aspect-[4/3] overflow-hidden rounded-lg border border-line md:aspect-[21/8]">
          <iframe
            title="Godsway location: Accra, Ghana"
            src="https://maps.google.com/maps?q=Accra%2C%20Ghana&z=12&output=embed"
            className="h-full w-full [filter:invert(0.92)_hue-rotate(180deg)_saturate(0.4)_sepia(0.35)_brightness(0.9)]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-line" />
        </div>
      </section>
    </>
  );
}
