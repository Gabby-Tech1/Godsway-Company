import { useLayoutEffect, type RefObject } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "./motion";

/**
 * Scans the scope for data-reveal / data-speed attributes and wires up
 * scroll animations. Re-runs whenever `key` (the route) changes.
 *
 *   data-reveal="up"     fade + rise
 *   data-reveal="words"  children made with <Words/> slide up one by one
 *   data-reveal="img"    clip-path opens, inner <img> settles from a zoom
 *   data-reveal="line"   horizontal rule draws from the left
 *   data-speed="0.2"     parallax drift (positive = slower than scroll)
 */
export function useReveals(scope: RefObject<HTMLElement>, key: string) {
  useLayoutEffect(() => {
    if (!scope.current || prefersReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal='up']").forEach((el) => {
        gsap.from(el, {
          y: 48,
          opacity: 0,
          duration: 1.1,
          ease: "power3.out",
          delay: Number(el.dataset.delay ?? 0),
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal='words']").forEach((el) => {
        gsap.from(el.querySelectorAll("[data-word]"), {
          yPercent: 115,
          duration: 1.1,
          ease: "power4.out",
          stagger: 0.06,
          delay: Number(el.dataset.delay ?? 0),
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal='img']").forEach((el) => {
        const img = el.querySelector("img");
        const tl = gsap.timeline({
          scrollTrigger: { trigger: el, start: "top 92%", end: "top 35%", scrub: 0.6 },
        });
        tl.fromTo(el, { clipPath: "inset(14% 10% 14% 10%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none" }, 0);
        if (img) tl.fromTo(img, { scale: 1.3 }, { scale: 1, ease: "none" }, 0);
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal='line']").forEach((el) => {
        gsap.from(el, {
          scaleX: 0,
          transformOrigin: "left center",
          duration: 1.4,
          ease: "power3.inOut",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-speed]").forEach((el) => {
        const speed = Number(el.dataset.speed);
        gsap.fromTo(
          el,
          { yPercent: -speed * 50 },
          {
            yPercent: speed * 50,
            ease: "none",
            scrollTrigger: { trigger: el.parentElement ?? el, start: "top bottom", end: "bottom top", scrub: true },
          },
        );
      });
    }, scope);

    ScrollTrigger.sort();
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      cancelAnimationFrame(id);
      ctx.revert();
    };
  }, [scope, key]);
}
