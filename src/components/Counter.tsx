import { useLayoutEffect, useRef } from "react";
import { gsap, prefersReducedMotion } from "@/lib/motion";

/** Number that counts up from 0 the first time it scrolls into view. */
export default function Counter({ to, prefix = "", suffix = "", className }: { to: number; prefix?: string; suffix?: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || prefersReducedMotion()) return;
    const obj = { v: 0 };
    el.textContent = `${prefix}0${suffix}`;
    const tween = gsap.to(obj, {
      v: to,
      duration: 2.2,
      ease: "power2.out",
      scrollTrigger: { trigger: el, start: "top 90%", once: true },
      onUpdate: () => {
        el.textContent = `${prefix}${Math.round(obj.v)}${suffix}`;
      },
    });
    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      el.textContent = `${prefix}${to}${suffix}`;
    };
  }, [to, prefix, suffix]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {to}
      {suffix}
    </span>
  );
}
