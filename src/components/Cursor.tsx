import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/motion";
import { token } from "@/lib/utils";

/**
 * Gold cursor: a precise dot plus a lagging ring. Elements can set
 * data-cursor="View" (or any word) to grow the ring into a labelled disc.
 * Only on devices with a fine pointer.
 */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [enabled] = useState(() => window.matchMedia("(hover: hover) and (pointer: fine)").matches);

  useEffect(() => {
    if (!enabled) return;
    const html = document.documentElement;
    html.classList.add("has-cursor");

    gsap.set([dot.current, ring.current], { xPercent: -50, yPercent: -50 });
    const dx = gsap.quickTo(dot.current, "x", { duration: 0.08 });
    const dy = gsap.quickTo(dot.current, "y", { duration: 0.08 });
    const rx = gsap.quickTo(ring.current, "x", { duration: 0.45, ease: "power3" });
    const ry = gsap.quickTo(ring.current, "y", { duration: 0.45, ease: "power3" });

    let mode: "idle" | "link" | "label" = "idle";
    const setMode = (m: typeof mode, text = "") => {
      if (m === mode && !text) return;
      mode = m;
      setLabel(text);
      gsap.to(ring.current, {
        width: m === "label" ? 96 : m === "link" ? 64 : 40,
        height: m === "label" ? 96 : m === "link" ? 64 : 40,
        backgroundColor: m === "label" ? token("gold") : token("gold", 0),
        borderColor: m === "idle" ? token("bone", 0.35) : token("gold"),
        duration: 0.35,
        ease: "power3",
      });
      gsap.to(dot.current, { scale: m === "idle" ? 1 : 0, duration: 0.25 });
    };

    const onMove = (e: PointerEvent) => {
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
      const t = e.target as HTMLElement | null;
      const labelled = t?.closest<HTMLElement>("[data-cursor]");
      if (labelled) return setMode("label", labelled.dataset.cursor);
      if (t?.closest("a,button,label,select,[role=button]")) return setMode("link");
      setMode("idle");
    };
    const onDown = () => gsap.fromTo(ring.current, { scale: 0.85 }, { scale: 1, duration: 0.4, ease: "back.out(3)" });
    const onLeave = () => gsap.to([dot.current, ring.current], { opacity: 0, duration: 0.2 });
    const onEnter = () => gsap.to([dot.current, ring.current], { opacity: 1, duration: 0.2 });

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown);
    document.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerenter", onEnter);
    return () => {
      html.classList.remove("has-cursor");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerenter", onEnter);
    };
  }, [enabled]);

  if (!enabled) return null;
  return (
    <>
      <div
        ref={ring}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[150] grid h-10 w-10 place-items-center rounded-full border border-bone/35"
      >
        <span className="font-mono text-[11px] font-medium uppercase tracking-[0.15em] text-on-gold">{label}</span>
      </div>
      <div ref={dot} aria-hidden className="pointer-events-none fixed left-0 top-0 z-[150] h-1.5 w-1.5 rounded-full bg-gold" />
    </>
  );
}
