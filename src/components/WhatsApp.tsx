import { useLocation } from "react-router-dom";
import { fleet, whatsappLink } from "@/data/site";
import { cn } from "@/lib/utils";

export function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden fill="currentColor">
      <path d="M16.01 3C8.83 3 3 8.82 3 16c0 2.3.6 4.53 1.74 6.5L3 29l6.68-1.75A12.94 12.94 0 0 0 16.01 29C23.18 29 29 23.18 29 16S23.18 3 16.01 3Zm0 23.62c-1.98 0-3.92-.53-5.62-1.54l-.4-.24-3.96 1.04 1.06-3.86-.26-.4A10.6 10.6 0 0 1 5.38 16c0-5.86 4.77-10.62 10.63-10.62 5.85 0 10.6 4.76 10.6 10.62 0 5.86-4.75 10.62-10.6 10.62Zm5.83-7.95c-.32-.16-1.9-.94-2.19-1.04-.3-.11-.51-.16-.73.16-.21.32-.83 1.04-1.02 1.26-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.1-.21.05-.4-.03-.56-.08-.16-.72-1.74-.99-2.38-.26-.62-.53-.54-.73-.55h-.62c-.21 0-.56.08-.85.4-.29.32-1.12 1.1-1.12 2.67 0 1.58 1.15 3.1 1.31 3.32.16.21 2.26 3.45 5.47 4.84.77.33 1.36.53 1.83.68.77.24 1.47.21 2.02.13.62-.09 1.9-.78 2.17-1.53.27-.75.27-1.4.19-1.53-.08-.13-.29-.21-.61-.37Z" />
    </svg>
  );
}

/**
 * Floating "Chat on WhatsApp" button. On a machine page the message
 * is pre-filled with that machine's name.
 */
export default function WhatsAppButton() {
  const { pathname } = useLocation();
  const machine = pathname.startsWith("/fleet/") ? fleet.find((m) => `/fleet/${m.slug}` === pathname) : undefined;
  const text = machine
    ? `Hello Godsway, I'm interested in the ${machine.brand} ${machine.name} (${machine.category}). Is it available?`
    : undefined;

  return (
    <a
      href={whatsappLink(text)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={machine ? `Ask about the ${machine.brand} ${machine.name} on WhatsApp` : "Chat with Godsway on WhatsApp"}
      className={cn(
        "group fixed bottom-5 right-5 z-[70] flex h-14 items-center gap-0 rounded-full bg-[#25D366] pl-[14px] pr-[14px] text-white",
        "shadow-[0_12px_40px_-8px_rgba(37,211,102,0.6)] transition-[gap,padding] duration-500 [transition-timing-function:cubic-bezier(.7,0,.2,1)]",
        "hover:gap-3 hover:pr-6 focus-visible:gap-3 focus-visible:pr-6 sm:bottom-6 sm:right-6",
      )}
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-20 [animation-duration:2.6s]" aria-hidden />
      <WhatsAppIcon className="relative h-7 w-7 shrink-0" />
      <span className="relative max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium transition-[max-width] duration-500 [transition-timing-function:cubic-bezier(.7,0,.2,1)] group-hover:max-w-[12rem] group-focus-visible:max-w-[12rem]">
        {machine ? "Ask on WhatsApp" : "Chat on WhatsApp"}
      </span>
    </a>
  );
}
