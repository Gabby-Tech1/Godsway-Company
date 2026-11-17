import { cn } from "@/lib/utils";

export default function Marquee({ items, className, reverse = false, speed = 40 }: { items: string[]; className?: string; reverse?: boolean; speed?: number }) {
  const row = (
    <div className="flex shrink-0 items-center" aria-hidden>
      {items.map((t, i) => (
        <span key={i} className="flex items-center">
          <span className="px-6 sm:px-10">{t}</span>
          <svg viewBox="0 0 10 10" className="h-3 w-3 shrink-0 sm:h-4 sm:w-4">
            <path d="M5 0 10 5 5 10 0 5Z" fill="currentColor" />
          </svg>
        </span>
      ))}
    </div>
  );
  return (
    <div className={cn("relative flex overflow-hidden whitespace-nowrap", className)}>
      <span className="sr-only">{items.join(", ")}</span>
      <div className="flex animate-marquee" style={{ animationDuration: `${speed}s`, animationDirection: reverse ? "reverse" : "normal" }}>
        {row}
        {row}
      </div>
    </div>
  );
}
