import { useEffect, useLayoutEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "sonner";
import Nav from "./Nav";
import Footer from "./Footer";
import Cursor from "./Cursor";
import Preloader from "./Preloader";
import DepthGauge from "./DepthGauge";
import Logo from "./Logo";
import WhatsAppButton from "./WhatsApp";
import { QuoteProvider } from "./quote";
import { gsap, ScrollTrigger, prefersReducedMotion, scrollToTop, startSmoothScroll } from "@/lib/motion";
import { useReveals } from "@/lib/useReveals";
import { ThemeProvider, useTheme } from "@/lib/theme";

function Shell() {
  const { pathname } = useLocation();
  const { theme } = useTheme();
  const main = useRef<HTMLElement>(null);
  const curtain = useRef<HTMLDivElement>(null);
  const prevPath = useRef(pathname);

  useEffect(() => {
    startSmoothScroll();
  }, []);

  // New route: jump to top, then lift a two-tone curtain off the new page.
  useLayoutEffect(() => {
    scrollToTop();
    // only on a real route change (not first load, not a dev re-run)
    if (prevPath.current === pathname || prefersReducedMotion()) return;
    prevPath.current = pathname;
    const ctx = gsap.context(() => {
      gsap
        .timeline()
        .set(curtain.current, { display: "block" })
        .set("[data-curtain-a], [data-curtain-b]", { yPercent: 0 })
        .from("[data-curtain-logo]", { opacity: 0, scale: 0.8, duration: 0.3 })
        .to("[data-curtain-logo]", { opacity: 0, duration: 0.25 }, "+=0.1")
        .to("[data-curtain-a]", { yPercent: -100, duration: 0.8, ease: "power4.inOut" }, "<")
        .to("[data-curtain-b]", { yPercent: -100, duration: 0.8, ease: "power4.inOut" }, "<0.08")
        .set(curtain.current, { display: "none" });
    }, curtain);
    return () => ctx.revert();
  }, [pathname]);

  useReveals(main, pathname);

  useEffect(() => {
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
  }, []);

  return (
    <QuoteProvider>
      <Preloader />
      <Nav />
      <main ref={main} key={pathname} className="relative z-10 bg-ink">
        <Outlet />
      </main>
      <Footer />
      <DepthGauge />
      <WhatsAppButton />
      <Cursor />
      <div className="grain-overlay" aria-hidden />
      <div ref={curtain} aria-hidden className="pointer-events-none fixed inset-0 z-[90] hidden">
        <div data-curtain-b className="absolute inset-0 bg-gold" />
        <div data-curtain-a className="absolute inset-0 grid place-items-center bg-ink-900">
          <span data-curtain-logo><Logo className="scale-150" /></span>
        </div>
      </div>
      <Toaster
        position="bottom-center"
        theme={theme}
        toastOptions={{ style: { background: "rgb(var(--ink-800))", color: "rgb(var(--bone))", border: "1px solid rgb(var(--bone) / 0.1)" } }}
      />
    </QuoteProvider>
  );
}

export default function Layout() {
  return (
    <ThemeProvider>
      <Shell />
    </ThemeProvider>
  );
}
