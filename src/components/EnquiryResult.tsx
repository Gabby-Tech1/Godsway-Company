import { Check, Mail, RotateCcw } from "lucide-react";
import { WhatsAppIcon } from "./WhatsApp";
import { mailtoFor, whatsappFor, type EnquiryState } from "@/lib/enquiry";

/** Success and fallback panels shared by the quote and contact forms. */
export default function EnquiryResult({ state, onReset }: { state: EnquiryState; onReset: () => void }) {
  if (state.status === "sent") {
    return (
      <div role="status" className="flex flex-col items-start gap-5 py-6">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-gold text-on-gold">
          <Check size={26} />
        </span>
        <h3 className="display text-5xl">
          Thank you{state.name ? `, ${state.name}` : ""}. <span className="text-molten">We're on it.</span>
        </h3>
        <p className="max-w-md text-bone-muted">Your enquiry has reached our team. We usually reply within one working day.</p>
        <button onClick={onReset} className="btn-ghost">
          <RotateCcw size={14} /> Send another
        </button>
      </div>
    );
  }

  if (state.status === "fallback") {
    return (
      <div role="alert" className="flex flex-col items-start gap-5 py-6">
        <h3 className="display text-4xl">Almost there.</h3>
        <p className="max-w-md text-bone-muted">
          We couldn't send this from the website just now. Your details are ready to go: pick one and press send.
        </p>
        <div className="flex flex-wrap gap-3">
          <a href={whatsappFor(state.kind, state.fields)} target="_blank" rel="noopener noreferrer" className="btn bg-[#25D366] text-white hover:brightness-110">
            <WhatsAppIcon className="h-5 w-5" /> Send on WhatsApp
          </a>
          <a href={mailtoFor(state.kind, state.fields)} className="btn-ghost">
            <Mail size={16} /> Send by email
          </a>
        </div>
        <button onClick={onReset} className="label inline-flex items-center gap-2 hover:text-gold">
          <RotateCcw size={12} /> Back to the form
        </button>
      </div>
    );
  }

  return null;
}

/** Hidden field bots fill in and people never see. */
export function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Website
        <input name="website" tabIndex={-1} autoComplete="off" />
      </label>
    </div>
  );
}
