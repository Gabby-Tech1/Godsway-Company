import { cn } from "@/lib/utils";

/** Wordmark: a gold peak (mountain / ore pile) + GODSWAY. */
export default function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg viewBox="0 0 32 32" className="h-7 w-7 shrink-0" aria-hidden="true">
        <path d="M16 4 29 27H3Z" fill="none" stroke="rgb(var(--gold))" strokeWidth="2.6" strokeLinejoin="round" />
        <path d="M10.5 27 16 17.5 21.5 27Z" fill="rgb(var(--gold))" />
      </svg>
      <span className="font-display text-[22px] uppercase leading-none tracking-[0.04em]">
        Godsway
      </span>
    </span>
  );
}
