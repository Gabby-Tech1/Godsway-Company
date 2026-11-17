import { useEffect, useRef, type ReactNode } from "react";
import { gsap } from "@/lib/motion";
import { cn } from "@/lib/utils";

/** Pulls its child toward the cursor when hovered, then springs back. */
export default function Magnetic({ children, strength = 0.35, className }: { children: ReactNode; strength?: number; className?: string }) {
  const el = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const node = el.current;
    if (!node || !window.matchMedia("(hover: hover)").matches) return;
    const xTo = gsap.quickTo(node, "x", { duration: 0.8, ease: "elastic.out(1, 0.4)" });
    const yTo = gsap.quickTo(node, "y", { duration: 0.8, ease: "elastic.out(1, 0.4)" });
    const move = (e: PointerEvent) => {
      const r = node.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    };
    const leave = () => {
      xTo(0);
      yTo(0);
    };
    node.addEventListener("pointermove", move);
    node.addEventListener("pointerleave", leave);
    return () => {
      node.removeEventListener("pointermove", move);
      node.removeEventListener("pointerleave", leave);
    };
  }, [strength]);

  return (
    <span ref={el} className={cn("inline-block will-change-transform", className)}>
      {children}
    </span>
  );
}
