import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import Magnetic from "./Magnetic";
import ThemeToggle from "./ThemeToggle";
import { company, nav } from "@/data/site";
import { gsap, prefersReducedMotion, scrollToEl } from "@/lib/motion";

function AccraClock() {
  const [t, setT] = useState("");
  useEffect(() => {
    const f = new Intl.DateTimeFormat("en-GB", { timeZone: "Africa/Accra", hour: "2-digit", minute: "2-digit", second: "2-digit" });
    const tick = () => setT(f.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{t}</span>;
}

/**
 * The page lifts away to uncover the footer underneath it.
 * The outer box reserves the footer's height; the footer itself is fixed.
 */
export default function Footer() {
  const inner = useRef<HTMLDivElement>(null);
  const holder = useRef<HTMLDivElement>(null);
  const [h, setH] = useState(0);

  useEffect(() => {
    const el = inner.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setH(el.offsetHeight));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useLayoutEffect(() => {
    if (prefersReducedMotion() || !h) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-foot-letter]",
        { yPercent: 100 },
        {
          yPercent: 0,
          ease: "none",
          stagger: 0.04,
          scrollTrigger: { trigger: holder.current, start: "top bottom", end: "bottom bottom", scrub: true },
        },
      );
      gsap.fromTo(
        "[data-foot-inner]",
        { yPercent: -30, opacity: 0.2 },
        { yPercent: 0, opacity: 1, ease: "none", scrollTrigger: { trigger: holder.current, start: "top bottom", end: "bottom bottom", scrub: true } },
      );
    }, holder);
    return () => ctx.revert();
  }, [h]);

  return (
    <div ref={holder} className="relative" style={{ height: h || undefined, clipPath: "polygon(0 0,100% 0,100% 100%,0 100%)" }}>
      <footer ref={inner} className="fixed inset-x-0 bottom-0 overflow-hidden bg-ink-900">
        <div data-foot-inner>
          <div className="wrap grid gap-12 pb-12 pt-20 md:grid-cols-12 md:pt-28">
            <div className="md:col-span-6">
              <p className="label mb-6">Have a project in mind?</p>
              <Magnetic strength={0.15}>
                <a href={`mailto:${company.email}`} className="group display block text-[11vw] transition-colors hover:text-gold md:text-7xl lg:text-8xl">
                  Let's <span className="text-molten">talk</span>
                  <ArrowUpRight className="ml-2 inline-block h-[0.6em] w-[0.6em] transition-transform duration-500 group-hover:-translate-y-2 group-hover:translate-x-2" />
                </a>
              </Magnetic>
              <p className="mt-6 text-lg text-bone-muted">{company.email}</p>
            </div>

            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 md:col-span-6">
              <div>
                <p className="label mb-5">Pages</p>
                <ul className="space-y-2.5">
                  {[{ label: "Home", href: "/" }, ...nav].map((n) => (
                    <li key={n.href}>
                      <Link to={n.href} className="text-bone-muted transition-colors hover:text-gold">{n.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="label mb-5">Contact</p>
                <ul className="space-y-2.5 text-bone-muted">
                  <li>{company.city}</li>
                  <li><a href={`tel:${company.phone.replace(/\s/g, "")}`} className="hover:text-gold">{company.phone}</a></li>
                  {company.socials.map((s) => (
                    <li key={s.label}><a href={s.href} className="hover:text-gold">{s.label}</a></li>
                  ))}
                </ul>
              </div>
              <div className="col-span-2 sm:col-span-1">
                <p className="label mb-5">Local time · Accra</p>
                <p className="font-mono text-2xl text-bone"><AccraClock /></p>
                <div className="mt-6 flex items-center gap-3">
                  <ThemeToggle />
                  <span className="text-sm text-bone-muted">Theme</span>
                </div>
              </div>
            </div>
          </div>

          <div className="wrap" aria-hidden>
            <p className="display flex select-none justify-between overflow-hidden text-[21vw] leading-[0.8] 2xl:text-[300px]">
              {"GODSWAY".split("").map((c, i) => (
                <span key={i} data-foot-letter className="no-serif inline-block text-molten">
                  {c}
                </span>
              ))}
            </p>
          </div>

          <div className="wrap flex flex-col items-start justify-between gap-4 border-t border-line py-6 text-sm text-bone-faint sm:flex-row sm:items-center">
            <p>© {new Date().getFullYear()} {company.name}. All rights reserved.</p>
            <button onClick={() => scrollToEl(0)} className="inline-flex items-center gap-2 hover:text-gold">
              Back to the surface <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
