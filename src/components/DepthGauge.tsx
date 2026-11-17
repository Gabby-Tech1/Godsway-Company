import { useEffect, useRef, useState } from "react";

/**
 * Fixed survey ruler on the right edge. Scrolling the page reads as
 * digging: depth in metres plus the name of the current stratum
 * (taken from the nearest section with data-stratum="...").
 */
const MAX_DEPTH = 1200;

export default function DepthGauge() {
  const needle = useRef<HTMLDivElement>(null);
  const num = useRef<HTMLSpanElement>(null);
  const [stratum, setStratum] = useState("Surface");

  useEffect(() => {
    let raf = 0;
    let last = "";
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      if (needle.current) needle.current.style.transform = `translateY(${p * 100}%)`;
      if (num.current) num.current.textContent = (p * MAX_DEPTH).toFixed(1).padStart(6, "0");

      let current = "Surface";
      document.querySelectorAll<HTMLElement>("[data-stratum]").forEach((s) => {
        if (s.getBoundingClientRect().top < window.innerHeight * 0.5) current = s.dataset.stratum!;
      });
      if (current !== last) {
        last = current;
        setStratum(current);
      }
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none fixed bottom-24 right-5 top-28 z-40 hidden w-16 xl:block">
      <div className="relative h-full">
        {/* ticks */}
        <div className="absolute inset-y-0 right-0 w-3 bg-[repeating-linear-gradient(to_bottom,rgb(var(--bone)/0.25)_0_1px,transparent_1px_12px)]" />
        <div className="absolute inset-y-0 right-0 w-5 bg-[repeating-linear-gradient(to_bottom,rgb(var(--bone)/0.4)_0_1px,transparent_1px_60px)]" />
        {/* needle */}
        <div ref={needle} className="absolute inset-x-0 top-0 h-full will-change-transform">
          <div className="absolute right-0 top-0 flex -translate-y-1/2 items-center gap-2">
            <div className="text-right">
              <span ref={num} className="block font-mono text-[11px] tabular-nums text-gold">0000.0</span>
              <span className="block whitespace-nowrap font-mono text-[9px] uppercase tracking-[0.15em] text-bone-muted">{stratum}</span>
            </div>
            <span className="h-px w-6 bg-gold" />
          </div>
        </div>
      </div>
    </div>
  );
}
