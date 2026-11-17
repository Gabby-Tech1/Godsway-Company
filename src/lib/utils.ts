import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

/** Resolve a theme token (e.g. "gold") to an rgba() string GSAP can tween. */
export function token(name: string, alpha = 1) {
  const v = getComputedStyle(document.documentElement).getPropertyValue(`--${name}`).trim().split(/\s+/).join(",");
  return `rgba(${v},${alpha})`;
}
