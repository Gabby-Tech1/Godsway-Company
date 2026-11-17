import { createContext, useCallback, useContext, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { X, ArrowRight, Loader2 } from "lucide-react";
import EnquiryResult, { Honeypot } from "./EnquiryResult";
import { WhatsAppIcon } from "./WhatsApp";
import { serviceOptions, whatsappLink, type Machine } from "@/data/site";
import { gsap, lockScroll } from "@/lib/motion";
import { useEnquiry } from "@/lib/enquiry";
import { usd } from "@/lib/utils";

interface QuoteRequest {
  machine?: Machine;
  service?: string;
}

const QuoteCtx = createContext<(req?: QuoteRequest) => void>(() => {});

/** Call `openQuote()` anywhere to slide in the quote form. */
export const useQuote = () => useContext(QuoteCtx);

export function QuoteProvider({ children }: { children: ReactNode }) {
  const [req, setReq] = useState<QuoteRequest | null>(null);
  const open = useCallback((r: QuoteRequest = {}) => setReq(r), []);
  return (
    <QuoteCtx.Provider value={open}>
      {children}
      {req && <QuotePanel req={req} onClose={() => setReq(null)} />}
    </QuoteCtx.Provider>
  );
}

function QuotePanel({ req, onClose }: { req: QuoteRequest; onClose: () => void }) {
  const panel = useRef<HTMLDivElement>(null);
  const shade = useRef<HTMLDivElement>(null);
  const first = useRef<HTMLInputElement>(null);
  const closing = useRef(false);
  const { state, submit, reset } = useEnquiry("quote");

  const close = useCallback(() => {
    if (closing.current) return;
    closing.current = true;
    gsap.to(shade.current, { opacity: 0, duration: 0.4 });
    gsap.to(panel.current, { xPercent: 100, duration: 0.5, ease: "power3.in", onComplete: onClose });
  }, [onClose]);

  useLayoutEffect(() => {
    lockScroll(true);
    gsap.fromTo(shade.current, { opacity: 0 }, { opacity: 1, duration: 0.4 });
    gsap.fromTo(panel.current, { xPercent: 100 }, { xPercent: 0, duration: 0.7, ease: "power4.out", onComplete: () => first.current?.focus() });
    return () => lockScroll(false);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  const m = req.machine;
  const machineName = m ? `${m.brand} ${m.name}` : "";
  const defaultService = m ? "Machine rental" : req.service ?? "";
  const sending = state.status === "sending";
  const done = state.status === "sent" || state.status === "fallback";

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;
    submit({ ...f, machine: machineName });
  };

  return (
    <div className="fixed inset-0 z-[80]" role="dialog" aria-modal="true" aria-label="Request a quote">
      <div ref={shade} className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={close} />
      <div
        ref={panel}
        data-lenis-prevent
        className="absolute inset-y-0 right-0 flex w-full max-w-[560px] flex-col overflow-y-auto border-l border-line bg-ink-900"
      >
        <div className="flex items-center justify-between border-b border-line px-6 py-5 sm:px-10">
          <span className="label">Request a quote</span>
          <button onClick={close} className="grid h-10 w-10 place-items-center rounded-full border border-line hover:border-gold hover:text-gold" aria-label="Close">
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-8 sm:px-10">
          {m ? (
            <div className="mb-10 flex gap-5">
              <div className="h-24 w-32 shrink-0 overflow-hidden rounded-md">
                <img src={m.image} alt="" className="graded h-full w-full object-cover" />
              </div>
              <div>
                <p className="label text-gold">{m.brand} · {m.category}</p>
                <p className="display mt-2 text-4xl">{m.name}</p>
                <p className="mt-1 text-sm text-bone-muted">{m.spec} · from {usd(m.rate)}/day</p>
              </div>
            </div>
          ) : (
            !done && (
              <h2 className="display mb-10 text-5xl">
                Tell us what <span className="text-molten">you need.</span>
              </h2>
            )
          )}

          {done ? (
            <EnquiryResult state={state} onReset={reset} />
          ) : (
            <form onSubmit={onSubmit} className="relative grid gap-6" noValidate={false}>
              <Honeypot />
              <div className="grid gap-6 sm:grid-cols-2">
                <input ref={first} name="name" required maxLength={120} placeholder="Your name *" className="field" autoComplete="name" />
                <input name="company" maxLength={160} placeholder="Company" className="field" autoComplete="organization" />
                <input name="email" type="email" required maxLength={200} placeholder="Email *" className="field" autoComplete="email" />
                <input name="phone" type="tel" maxLength={40} placeholder="Phone / WhatsApp" className="field" autoComplete="tel" />
              </div>
              <select name="service" defaultValue={defaultService} className="field appearance-none">
                <option value="" className="bg-ink">What do you need?</option>
                {serviceOptions.map((s) => (
                  <option key={s} value={s} className="bg-ink">{s}</option>
                ))}
              </select>
              <div className="grid gap-6 sm:grid-cols-3">
                <input name="start" maxLength={60} placeholder="Start date" className="field" />
                <input name="duration" maxLength={60} placeholder="Duration" className="field" />
                <input name="location" maxLength={160} placeholder="Site location" className="field" />
              </div>
              <textarea name="message" rows={4} maxLength={5000} placeholder="Project details" className="field resize-none" />

              {state.status === "invalid" && (
                <p role="alert" className="text-sm text-gold">{state.error}</p>
              )}

              <button type="submit" disabled={sending} className="btn-gold mt-2 justify-center py-4 disabled:opacity-70">
                {sending ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Sending…
                  </>
                ) : (
                  <>
                    Send request <ArrowRight size={16} />
                  </>
                )}
              </button>
              <a
                href={whatsappLink(m ? `Hello Godsway, I'd like a quote for the ${machineName}.` : undefined)}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 text-sm text-bone-muted hover:text-[#25D366]"
              >
                <WhatsAppIcon className="h-4 w-4" /> Prefer WhatsApp? Message us instead
              </a>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
