import { useLayoutEffect, useRef, useState } from "react";
import { gsap, lockScroll } from "@/lib/motion";
import { markIntroDone, shouldShowPreloader } from "@/lib/intro";

/**
 * First-visit intro: a depth counter runs 0 → 100 while a gold seam
 * cuts across the screen, then the two halves split open like rock.
 */
export default function Preloader() {
  const [show] = useState(shouldShowPreloader);
  const root = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(!show);

  useLayoutEffect(() => {
    if (!show) {
      markIntroDone();
      return;
    }
    lockScroll(true);
    const num = root.current!.querySelector<HTMLElement>("[data-num]")!;
    const counter = { v: 0 };
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          lockScroll(false);
          setGone(true);
        },
      });
      tl.from("[data-pl-word]", { yPercent: 110, duration: 0.9, ease: "power4.out", stagger: 0.08 })
        .to(counter, {
          v: 100,
          duration: 1.6,
          ease: "power2.inOut",
          onUpdate: () => { num.textContent = String(Math.round(counter.v)).padStart(3, "0"); },
        }, 0.1)
        .fromTo("[data-pl-seam]", { scaleX: 0 }, { scaleX: 1, duration: 1.6, ease: "power2.inOut" }, 0.1)
        .to("[data-pl-content]", { opacity: 0, duration: 0.3 }, ">-0.05")
        .add(() => markIntroDone(), ">-0.1")
        .to("[data-pl-top]", { yPercent: -100, duration: 1.1, ease: "power4.inOut" }, ">")
        .to("[data-pl-bottom]", { yPercent: 100, duration: 1.1, ease: "power4.inOut" }, "<")
        .to("[data-pl-seam]", { opacity: 0, duration: 0.4 }, "<");
    }, root);
    return () => {
      ctx.revert();
      lockScroll(false);
      markIntroDone();
    };
  }, [show]);

  if (gone) return null;

  return (
    <div ref={root} className="fixed inset-0 z-[200]" aria-hidden>
      <div data-pl-top className="absolute inset-x-0 top-0 h-1/2 bg-ink-900" />
      <div data-pl-bottom className="absolute inset-x-0 bottom-0 h-1/2 bg-ink-900" />
      <div data-pl-seam className="absolute inset-x-0 top-1/2 h-px origin-left bg-gold shadow-[0_0_24px_rgb(var(--gold))]" />
      <div data-pl-content className="absolute inset-0">
        <div className="wrap flex h-full flex-col justify-between py-8">
          <div className="flex justify-between">
            <span className="label overflow-hidden"><span data-pl-word className="inline-block">Godsway Company Ltd</span></span>
            <span className="label overflow-hidden"><span data-pl-word className="inline-block">Accra · Est. 2004</span></span>
          </div>
          <div className="flex items-end justify-between">
            <span className="display overflow-hidden text-[18vw] leading-none md:text-[11rem]">
              <span data-pl-word className="inline-block">
                <span data-num>000</span>
                <span className="text-molten text-[0.5em]">m</span>
              </span>
            </span>
            <span className="label mb-4 overflow-hidden text-right">
              <span data-pl-word className="inline-block">Breaking ground</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
