import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { flushSync } from "react-dom";

export type Theme = "light" | "dark";

const ThemeCtx = createContext<{ theme: Theme; toggle: (origin?: { x: number; y: number }) => void }>({
  theme: "dark",
  toggle: () => {},
});

export const useTheme = () => useContext(ThemeCtx);

const read = (): Theme => (document.documentElement.dataset.theme === "light" ? "light" : "dark");

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>(read);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "light" ? "#f3eee4" : "#090806");
    try {
      localStorage.setItem("gw-theme", theme);
    } catch {
      /* private mode */
    }
    window.dispatchEvent(new CustomEvent("themechange", { detail: theme }));
  }, [theme]);

  /** Flip the theme with a circle that grows out of the click point. */
  const toggle = useCallback((origin?: { x: number; y: number }) => {
    const next: Theme = read() === "dark" ? "light" : "dark";
    const doc = document as Document & { startViewTransition?: (cb: () => void) => { ready: Promise<void> } };
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!doc.startViewTransition || reduced) {
      setTheme(next);
      return;
    }
    const x = origin?.x ?? window.innerWidth / 2;
    const y = origin?.y ?? 0;
    const r = Math.hypot(Math.max(x, window.innerWidth - x), Math.max(y, window.innerHeight - y));
    const vt = doc.startViewTransition(() => {
      flushSync(() => setTheme(next));
      document.documentElement.dataset.theme = next;
    });
    vt.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
        { duration: 900, easing: "cubic-bezier(.7,0,.2,1)", pseudoElement: "::view-transition-new(root)" },
      );
    });
  }, []);

  return <ThemeCtx.Provider value={{ theme, toggle }}>{children}</ThemeCtx.Provider>;
}
