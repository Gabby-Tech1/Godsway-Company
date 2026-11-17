import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Logo from "./Logo";
import Magnetic from "./Magnetic";
import ThemeToggle from "./ThemeToggle";
import { useQuote } from "./quote";
import { company, nav } from "@/data/site";
import { gsap, lockScroll } from "@/lib/motion";
import { cn } from "@/lib/utils";

export default function Nav() {
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const openQuote = useQuote();
  const menu = useRef<HTMLDivElement>(null);

  // Hide while scrolling down, reveal on the way back up.
  useEffect(() => {
    let last = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      if (Math.abs(y - last) > 6) {
        setHidden(y > last && y > 300);
        last = y;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useLayoutEffect(() => {
    if (!open || !menu.current) return;
    lockScroll(true);
    const ctx = gsap.context(() => {
      gsap.fromTo(menu.current, { clipPath: "circle(0% at 100% 0%)" }, { clipPath: "circle(150% at 100% 0%)", duration: 0.9, ease: "power4.inOut" });
      gsap.from("[data-menu-item]", { yPercent: 110, rotate: 4, duration: 0.9, ease: "power4.out", stagger: 0.06, delay: 0.3 });
      gsap.from("[data-menu-foot]", { opacity: 0, y: 20, duration: 0.6, delay: 0.6 });
    }, menu);
    return () => {
      ctx.revert();
      lockScroll(false);
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[60] transition-transform duration-500 [transition-timing-function:cubic-bezier(.7,0,.2,1)]",
          hidden && !open && "-translate-y-full",
        )}
      >
        <div className="wrap flex h-[76px] items-center justify-between gap-4">
          <Link to="/" aria-label="Godsway home" className="relative z-10">
            <Logo />
          </Link>

          <nav
            className={cn(
              "absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border p-1.5 transition-colors duration-500 md:flex",
              scrolled ? "border-line bg-ink/70 backdrop-blur-xl" : "border-transparent",
            )}
            aria-label="Main"
          >
            {nav.map((n) => (
              <NavLink
                key={n.href}
                to={n.href}
                className={({ isActive }) =>
                  cn(
                    "relative rounded-full px-4 py-2 text-sm transition-colors",
                    isActive ? "bg-bone text-ink" : "text-bone-muted hover:text-bone",
                  )
                }
              >
                {n.label}
              </NavLink>
            ))}
          </nav>

          <div className="relative z-10 flex items-center gap-2">
            <ThemeToggle className={cn(scrolled && "bg-ink/70 backdrop-blur-xl")} />
            <Magnetic className="hidden sm:inline-block">
              <button onClick={() => openQuote()} className="btn-gold px-5 py-3">
                Get a quote <ArrowUpRight size={16} />
              </button>
            </Magnetic>
            <button
              onClick={() => setOpen((o) => !o)}
              className={cn("relative grid h-11 w-11 place-items-center rounded-full border border-line md:hidden", scrolled && "bg-ink/70 backdrop-blur-xl")}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <span className={cn("absolute h-px w-5 bg-bone transition-transform duration-300", open ? "rotate-45" : "-translate-y-[4px]")} />
              <span className={cn("absolute h-px w-5 bg-bone transition-transform duration-300", open ? "-rotate-45" : "translate-y-[4px]")} />
            </button>
          </div>
        </div>
      </header>

      {open && (
        <div ref={menu} className="fixed inset-0 z-[55] flex flex-col bg-ink-900 px-4 pb-8 pt-28 sm:px-8 md:hidden">
          <nav className="flex flex-col" aria-label="Mobile">
            {[{ label: "Home", href: "/" }, ...nav].map((n, i) => (
              <Link key={n.href} to={n.href} className="flex items-baseline gap-4 overflow-hidden border-b border-line py-2">
                <span className="label w-6">0{i + 1}</span>
                <span data-menu-item className={cn("display block origin-left text-[17vw]", pathname === n.href ? "text-gold" : "text-bone")}>
                  {n.label}
                </span>
              </Link>
            ))}
          </nav>
          <div data-menu-foot className="mt-auto flex flex-col gap-4">
            <button onClick={() => { setOpen(false); openQuote(); }} className="btn-gold justify-center py-4">
              Get a quote <ArrowUpRight size={16} />
            </button>
            <p className="label text-center">{company.email}</p>
          </div>
        </div>
      )}
    </>
  );
}
