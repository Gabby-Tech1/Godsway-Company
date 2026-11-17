import { lazy, Suspense, useEffect, useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Words from "@/components/Words";
import Counter from "@/components/Counter";
import Marquee from "@/components/Marquee";
import Magnetic from "@/components/Magnetic";
import GhanaMap from "@/components/GhanaMap";
import CTA from "@/components/CTA";
import { useQuote } from "@/components/quote";
import { company, fleet, fleetCategories, goldFacts, media, partners, projects, services, stats } from "@/data/site";
import { gsap, prefersReducedMotion } from "@/lib/motion";
import { introReady } from "@/lib/intro";
import { cn, usd } from "@/lib/utils";

// three.js is heavy: load it in its own chunk so text paints first.
const GoldField = lazy(() => import("@/components/GoldField"));

export default function Home() {
  return (
    <>
      <Hero />
      <TapeBands />
      <Manifesto />
      <Services />
      <FleetPicker />
      <GoldVein />
      <ProjectMap />
      <Partners />
      <CTA />
    </>
  );
}

/* ================================================================ HERO */

function AccraTime() {
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

function Hero() {
  const root = useRef<HTMLElement>(null);
  const progress = useRef(0);
  const openQuote = useQuote();

  useLayoutEffect(() => {
    const reduced = prefersReducedMotion();
    const ctx = gsap.context(() => {
      gsap.set("[data-hero-letter], [data-hero-serif]", { yPercent: 115 });
      gsap.set("[data-hero-fade]", { opacity: 0, y: 24 });

      if (!reduced) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: root.current,
              start: "top top",
              end: "+=220%",
              pin: true,
              scrub: 0.6,
              onUpdate: (s) => (progress.current = s.progress),
            },
          })
          .to("[data-hero-a]", { xPercent: -35, opacity: 0, ease: "power2.in", duration: 0.32 }, 0)
          .to("[data-hero-b]", { xPercent: 35, opacity: 0, ease: "power2.in", duration: 0.32 }, 0)
          .to("[data-hero-copy], [data-scroll-cue]", { y: 60, opacity: 0, duration: 0.25 }, 0)
          .to("[data-phase='1']", { yPercent: -100, opacity: 0, duration: 0.1 }, 0.3)
          .fromTo("[data-phase='2']", { yPercent: 100, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.1 }, 0.32)
          .fromTo("[data-hero-after]", { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.25 }, 0.62)
          .to({}, { duration: 0.13 });
      }
    }, root);

    // play the entrance once the preloader has opened
    introReady.then(() =>
      ctx.add(() => {
        gsap
          .timeline({ delay: 0.15 })
          .to("[data-hero-letter]", { yPercent: 0, duration: 1.3, ease: "power4.out", stagger: 0.045 })
          .to("[data-hero-serif]", { yPercent: 0, duration: 1.4, ease: "power4.out" }, 0.25)
          .to("[data-hero-fade]", { opacity: 1, y: 0, duration: 1, ease: "power3.out", stagger: 0.08 }, 0.5);
      }),
    );
    return () => ctx.revert();
  }, []);

  // Variable-font "lens": letters near the cursor swell wider and heavier.
  useEffect(() => {
    if (prefersReducedMotion() || !window.matchMedia("(hover: hover)").matches) return;
    const letters = Array.from(root.current!.querySelectorAll<HTMLElement>("[data-hero-letter]"));
    const state = letters.map(() => ({ s: 72, w: 800 }));
    let mx = -9999, my = -9999, raf = 0;
    const onMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
    };
    const loop = () => {
      raf = requestAnimationFrame(loop);
      letters.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        const d = Math.hypot(mx - (r.left + r.width / 2), my - (r.top + r.height / 2));
        const f = Math.max(0, 1 - d / 420);
        const st = state[i];
        st.s += (72 + f * 40 - st.s) * 0.12;
        st.w += (800 + f * 100 - st.w) * 0.12;
        el.style.fontStretch = `${st.s.toFixed(1)}%`;
        el.style.fontWeight = st.w.toFixed(0);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    loop();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <section ref={root} data-stratum="Surface" className="relative h-[100svh] min-h-[640px] overflow-hidden">
      {/* backdrop */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-1/2 h-[90vmin] w-[90vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/10 blur-[140px] md:left-[68%]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgb(var(--bone)/0.04)_1px,transparent_1px),linear-gradient(90deg,rgb(var(--bone)/0.04)_1px,transparent_1px)] bg-[size:80px_80px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />
        <Suspense fallback={null}>
          <GoldField progress={progress} className="absolute inset-0 animate-[fadein_2s_ease-out]" />
        </Suspense>
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>

      {/* survey HUD */}
      <div className="pointer-events-none absolute inset-x-3 bottom-3 top-[84px] sm:inset-x-6 sm:bottom-6">
        <div className="brackets absolute inset-0" />
        <div className="absolute inset-x-4 top-4 flex items-start justify-between gap-4 font-mono text-[10px] uppercase tracking-[0.18em] text-bone-muted sm:text-[11px]">
          <span data-hero-fade>05°36′N · 00°11′W<br className="sm:hidden" /><span className="hidden sm:inline"> — </span>Accra, GH</span>
          <span data-hero-fade className="relative hidden h-4 overflow-hidden text-center md:block">
            <span data-phase="1" className="block text-gold">Phase 01 — Break ground</span>
            <span data-phase="2" className="absolute inset-0 block text-gold opacity-0">Phase 02 — Open pit</span>
          </span>
          <span data-hero-fade className="text-right">GMT <AccraTime /></span>
        </div>
      </div>

      {/* headline */}
      <div className="wrap relative flex h-full flex-col justify-end pb-12 pt-32 md:pb-16">
        <h1 className="display select-none text-[22vw] leading-[0.8] sm:text-[17vw] lg:text-[12.5rem] xl:text-[14.5rem]">
          <span data-hero-a className="block overflow-hidden pb-[0.02em]">
            {"We move".split("").map((c, i) => (
              <span key={i} data-hero-letter className="inline-block will-change-transform" style={{ fontStretch: "72%" }}>
                {c === " " ? " " : c}
              </span>
            ))}
          </span>
          <span data-hero-b className="-mt-[0.06em] block overflow-hidden pb-[0.1em] pl-[0.6em] sm:pl-[1.2em]">
            <span data-hero-serif className="text-molten inline-block">the earth.</span>
          </span>
        </h1>

        <div data-hero-copy className="mt-6 flex flex-col gap-8 md:mt-10 md:flex-row md:items-end md:justify-between">
          <p data-hero-fade className="max-w-sm text-lg leading-relaxed text-bone-muted">
            Heavy equipment, construction and mining support for the people building Ghana and West Africa. Since {company.founded}.
          </p>
          <div data-hero-fade className="flex flex-wrap items-center gap-3">
            <Magnetic>
              <button onClick={() => openQuote()} className="btn-gold px-7 py-4">
                Get a quote <ArrowUpRight size={16} />
              </button>
            </Magnetic>
            <Magnetic>
              <Link to="/fleet" className="btn-ghost px-7 py-4 backdrop-blur">Explore the fleet</Link>
            </Magnetic>
          </div>
        </div>

        <div data-hero-fade data-scroll-cue className="pointer-events-none absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex">
          <span className="label">Scroll to dig</span>
          <span className="relative block h-10 w-px overflow-hidden bg-bone/15">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-scroll-hint bg-gold" />
          </span>
        </div>
      </div>

      {/* appears once the ore has settled into the pit */}
      <div data-hero-after className="pointer-events-none absolute inset-x-0 top-[15%] text-center opacity-0">
        <p className="label mb-5 text-gold">From a single seam to an open pit</p>
        <p className="display wrap mx-auto max-w-4xl text-[9vw] md:text-6xl lg:text-7xl">
          Every great build begins by <span className="text-molten">moving the earth.</span>
        </p>
      </div>
    </section>
  );
}

/* ================================================================ TAPE BANDS */

function TapeBands() {
  const items = ["Machine rentals", "Equipment sales", "Construction", "Mining support", "Technical consultation"];
  return (
    <section aria-label="What we do" className="relative z-10 -my-6 overflow-hidden py-16">
      <div className="-rotate-[3deg] scale-110 border-y border-line bg-ink-900">
        <Marquee items={items} reverse speed={50} className="py-4 font-display text-3xl font-extrabold uppercase text-bone/60 [font-stretch:72%] md:text-5xl" />
      </div>
      <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 rotate-[2deg] scale-110 bg-gold shadow-[0_20px_60px_-20px_rgb(var(--gold)/0.6)]">
        <Marquee items={["Since 2004", "Accra · Ghana", "24/7 support", "Rent · Supply · Build · Mine"]} speed={35} className="py-4 font-display text-3xl font-extrabold uppercase text-on-gold [font-stretch:72%] md:text-5xl" />
      </div>
    </section>
  );
}

/* ================================================================ MANIFESTO (scroll-filled) */

function Manifesto() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-fill]",
        { opacity: 0.14 },
        { opacity: 1, stagger: 0.1, ease: "none", scrollTrigger: { trigger: "[data-fill-wrap]", start: "top 80%", end: "bottom 45%", scrub: true } },
      );
      gsap.from("[data-chip]", {
        scale: 0,
        rotate: -12,
        duration: 1,
        ease: "back.out(2)",
        stagger: 0.15,
        scrollTrigger: { trigger: "[data-fill-wrap]", start: "top 70%" },
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const chip = (src: string) => (
    <span data-chip className="mx-1 inline-block h-[0.8em] w-[1.7em] translate-y-[0.08em] overflow-hidden rounded-full align-baseline">
      <img src={src} alt="" className="graded h-full w-full object-cover" loading="lazy" />
    </span>
  );
  const text = (s: string) => s.split(" ").map((w, i) => (
    <span key={i} data-fill className="inline">{w} </span>
  ));

  return (
    <section ref={root} data-stratum="Topsoil" className="wrap py-28 md:py-44">
      <div className="mb-12 flex items-center gap-4">
        <span className="label">(01)</span>
        <span className="h-px flex-1 bg-line" data-reveal="line" />
        <span className="label">Who we are</span>
      </div>
      <p data-fill-wrap className="text-[8.5vw] font-light leading-[1.08] tracking-[-0.03em] md:text-6xl lg:text-7xl xl:text-[5.4rem]">
        {text("Three decades on the ground.")} {chip(media.catExcavator)}{" "}
        {text("We rent, sell, build and mine alongside Ghana's biggest names")} {chip(media.quarryTop)}{" "}
        {text("bringing the machines, the people and the know-how,")}{" "}
        <span data-fill className="serif text-gold">and staying until the job is done.</span>
      </p>
      <div className="mt-16 grid gap-10 md:grid-cols-12">
        <p data-reveal="up" className="text-lg leading-relaxed text-bone-muted md:col-span-5 md:col-start-8">
          Our CEO started out as a technician at Atlas Copco in 1993 and went on to lead international sales, later at Epiroc. That depth is in every machine we supply.
        </p>
        <div data-reveal="up" className="md:col-span-4 md:col-start-8 md:row-start-2">
          <Link to="/about" className="btn-ghost">
            Our story <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ================================================================ SERVICES (stacked cards) */

function Services() {
  const root = useRef<HTMLElement>(null);
  const openQuote = useQuote();

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-card]");
      cards.forEach((card, i) => {
        const next = cards[i + 1];
        if (next) {
          gsap.to(card, {
            scale: 0.9,
            filter: "brightness(0.55)",
            ease: "none",
            scrollTrigger: { trigger: next, start: "top bottom", end: "top 15%", scrub: true },
          });
        }
        const img = card.querySelector("img");
        if (img) {
          gsap.fromTo(img, { scale: 1.25 }, { scale: 1, ease: "none", scrollTrigger: { trigger: card, start: "top bottom", end: "top 20%", scrub: true } });
        }
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} data-stratum="Laterite" className="relative pb-24">
      <div className="wrap mb-16 grid gap-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-8">
          <p data-reveal="up" className="label mb-6">(02) What we do</p>
          <h2 data-reveal="words" className="display text-[15vw] md:text-9xl">
            <Words text="Four ways" /> <Words text="to move" className="text-molten" /> <Words text="the earth." className="text-molten" />
          </h2>
        </div>
        <p data-reveal="up" className="text-lg text-bone-muted md:col-span-4">
          One partner from first excavation to final handover, with the equipment, crews and technical support to keep projects moving.
        </p>
      </div>

      <div className="wrap">
        {services.map((s, i) => (
          <article
            key={s.id}
            data-card
            className="sticky mb-6 origin-top overflow-hidden rounded-[28px] border border-line bg-ink-900 shadow-[0_-30px_80px_-40px_rgb(0_0_0/0.6)]"
            style={{ top: `${92 + i * 18}px` }}
          >
            <div className="grid min-h-[78svh] md:grid-cols-2">
              <div className="flex flex-col p-7 sm:p-10 lg:p-14">
                <div className="flex items-center justify-between">
                  <span className="label text-gold">{s.index} / 0{services.length}</span>
                  <span className="label">{s.title}</span>
                </div>
                <h3 className="display mt-auto pt-16 text-[24vw] leading-[0.8] md:text-[9rem] lg:text-[11rem]">{s.verb}.</h3>
                <p className="mt-6 max-w-md text-lg leading-relaxed text-bone-muted">{s.line}</p>
                <ul className="mt-8 grid max-w-md grid-cols-2 gap-x-6 gap-y-3 text-sm">
                  {s.points.map((p) => (
                    <li key={p} className="flex items-center gap-2.5">
                      <span className="h-1.5 w-1.5 rotate-45 bg-gold" /> {p}
                    </li>
                  ))}
                </ul>
                <button onClick={() => openQuote({ service: i === 0 ? "Machine rental" : i === 1 ? "Equipment purchase" : i === 2 ? "Construction" : "Mining support" })} className="btn-ghost mt-10 self-start">
                  Enquire <ArrowUpRight size={16} />
                </button>
              </div>
              <div className="relative min-h-[280px] overflow-hidden md:m-3 md:rounded-[20px]">
                <img src={s.image} alt={s.title} className="graded absolute inset-0 h-full w-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 to-transparent" />
                <span className="display absolute bottom-4 right-6 text-[7rem] leading-none text-bone/10 md:text-[12rem]">{s.index}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ================================================================ FLEET PICKER */

const categoryImage: Record<string, string> = {};
fleet.forEach((m) => (categoryImage[m.category] ??= m.image));

function FleetPicker() {
  const [cat, setCat] = useState<string>(fleetCategories[0]);
  const stage = useRef<HTMLDivElement>(null);
  const openQuote = useQuote();
  const machines = fleet.filter((m) => m.category === cat);

  useLayoutEffect(() => {
    if (!stage.current || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo("[data-stage-img]", { scale: 1.15, opacity: 0.4 }, { scale: 1, opacity: 1, duration: 1.1, ease: "power3.out" });
      gsap.from("[data-stage-row]", { y: 24, opacity: 0, duration: 0.6, stagger: 0.07, ease: "power3.out" });
    }, stage);
    return () => ctx.revert();
  }, [cat]);

  return (
    <section data-stratum="Bedrock" className="border-t border-line py-24 md:py-36">
      <div className="wrap">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p data-reveal="up" className="label mb-6">(03) The fleet</p>
            <h2 data-reveal="words" className="display text-[15vw] md:text-9xl">
              <Words text={`${fleet.length} machines.`} /> <Words text="ready to roll." className="text-molten" />
            </h2>
          </div>
          <Link data-reveal="up" to="/fleet" className="btn-ghost self-start md:self-auto">
            Browse the full fleet <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          <ul className="flex gap-2 overflow-x-auto pb-2 lg:col-span-4 lg:flex-col lg:gap-0 lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden" role="tablist">
            {fleetCategories.map((c) => {
              const on = c === cat;
              const n = fleet.filter((m) => m.category === c).length;
              return (
                <li key={c} className="shrink-0">
                  <button
                    role="tab"
                    aria-selected={on}
                    onClick={() => setCat(c)}
                    onPointerEnter={() => window.matchMedia("(hover: hover)").matches && setCat(c)}
                    className={cn(
                      "group flex w-full items-center gap-4 rounded-full border px-5 py-3 text-left transition-colors lg:rounded-none lg:border-0 lg:border-b lg:border-line lg:px-0 lg:py-5",
                      on ? "border-gold text-gold" : "border-line text-bone/60 hover:text-bone",
                    )}
                  >
                    <span className="display text-2xl lg:text-5xl xl:text-6xl">{c}</span>
                    <sup className="font-mono text-xs">{String(n).padStart(2, "0")}</sup>
                    <ArrowRight className={cn("ml-auto hidden h-6 w-6 transition-all duration-500 lg:block", on ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0")} />
                  </button>
                </li>
              );
            })}
          </ul>

          <div ref={stage} className="relative overflow-hidden rounded-[28px] border border-line bg-ink-900 lg:col-span-8">
            <div className="relative aspect-[16/10] overflow-hidden">
              <img key={cat} data-stage-img src={categoryImage[cat]} alt={cat} className="graded absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/20 to-transparent" />
              <div className="brackets absolute inset-5" />
              <span className="label absolute left-8 top-8 flex items-center gap-2 rounded-full bg-ink/70 px-3 py-1.5 text-bone backdrop-blur">
                <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-70" /><span className="relative inline-flex h-2 w-2 rounded-full bg-gold" /></span>
                Live availability
              </span>
            </div>
            <div className="divide-y divide-line px-6 pb-4 sm:px-8">
              {machines.map((m) => (
                <div key={m.slug} data-stage-row className="grid grid-cols-12 items-center gap-3 py-4">
                  <div className="col-span-7 sm:col-span-5">
                    <p className="label text-gold">{m.brand}</p>
                    <Link to={`/fleet/${m.slug}`} data-cursor="View" className="display block text-3xl transition-colors hover:text-gold sm:text-4xl">
                      {m.name}
                    </Link>
                  </div>
                  <p className="col-span-4 hidden text-sm text-bone-muted sm:block">{m.spec}</p>
                  <div className="col-span-5 flex items-center justify-end gap-4 sm:col-span-3">
                    <div className="text-right">
                      <p className="text-sm"><span className="text-bone-muted">from</span> {usd(m.rate)}<span className="text-bone-muted">/day</span></p>
                      <p className={cn("label mt-1", m.availability === "Available" ? "text-gold" : "")}>{m.availability}</p>
                    </div>
                    <button onClick={() => openQuote({ machine: m })} className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line transition-colors hover:border-gold hover:bg-gold hover:text-on-gold" aria-label={`Quote for ${m.brand} ${m.name}`}>
                      <ArrowUpRight size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ================================================================ GOLD VEIN (Au tile + numbers) */

function GoldVein() {
  const tile = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = tile.current;
    if (!el || !window.matchMedia("(hover: hover)").matches || prefersReducedMotion()) return;
    const rx = gsap.quickTo(el, "rotationX", { duration: 0.8, ease: "power3" });
    const ry = gsap.quickTo(el, "rotationY", { duration: 0.8, ease: "power3" });
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      ry(((e.clientX - (r.left + r.width / 2)) / r.width) * 24);
      rx(-((e.clientY - (r.top + r.height / 2)) / r.height) * 24);
      el.style.setProperty("--gx", `${((e.clientX - r.left) / r.width) * 100}%`);
      el.style.setProperty("--gy", `${((e.clientY - r.top) / r.height) * 100}%`);
    };
    const leave = () => {
      rx(0);
      ry(0);
    };
    el.parentElement!.addEventListener("pointermove", move);
    el.parentElement!.addEventListener("pointerleave", leave);
    return () => {
      el.parentElement?.removeEventListener("pointermove", move);
      el.parentElement?.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <section data-stratum="Quartz vein" className="relative overflow-hidden border-t border-line py-24 md:py-36">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_30%_50%,rgb(var(--gold)/0.12),transparent_60%)]" />
      <div className="wrap grid items-center gap-16 lg:grid-cols-12">
        <div className="flex justify-center lg:col-span-5 [perspective:1200px]" data-cursor="Au">
          <div
            ref={tile}
            data-reveal="up"
            className="relative aspect-square w-full max-w-[420px] rounded-[28px] p-[1.5px] [transform-style:preserve-3d]"
            style={{ background: "linear-gradient(135deg, rgb(var(--gold-bright)), rgb(var(--gold-deep)) 40%, rgb(var(--gold)) 70%, rgb(var(--gold-bright)))" }}
          >
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-[27px] bg-ink-900 p-8">
              <div
                className="pointer-events-none absolute inset-0 opacity-60 mix-blend-plus-lighter"
                style={{ background: "radial-gradient(circle at var(--gx,30%) var(--gy,30%), rgb(var(--gold)/0.35), transparent 45%)" }}
              />
              <div className="flex justify-between font-mono text-sm text-bone-muted">
                <span className="text-2xl text-gold">79</span>
                <span>Transition metal</span>
              </div>
              <p className="serif text-molten text-center text-[11rem] leading-none sm:text-[13rem]" style={{ transform: "translateZ(60px)" }}>
                Au
              </p>
              <div className="flex items-end justify-between">
                <span className="display text-3xl">Gold</span>
                <span className="font-mono text-sm text-bone-muted">196.967</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <p data-reveal="up" className="label mb-6">(04) The Gold Coast</p>
          <h2 data-reveal="words" className="display text-[13vw] md:text-8xl">
            <Words text="They named it" /> <Words text="for gold." className="text-molten" /> <Words text="We still work that ground." />
          </h2>
          <div className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10">
            {stats.map((s) => (
              <div key={s.label} data-reveal="up" className="border-t border-line pt-5">
                <Counter to={s.value} suffix={s.suffix} className="display block text-6xl text-molten no-serif md:text-7xl xl:text-8xl" />
                <p className="mt-2 text-bone-muted">{s.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4 border-t border-line pt-6">
            {goldFacts.map((f) => (
              <div key={f.label}>
                <p className="font-mono text-lg text-gold">{f.value}</p>
                <p className="text-xs text-bone-faint">{f.label}</p>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-bone-faint">Ghana gold-sector figures from the previous site. Verify before launch.</p>
        </div>
      </div>
    </section>
  );
}

/* ================================================================ PROJECT MAP */

function ProjectMap() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section data-stratum="Gold reef" className="border-t border-line py-24 md:py-36">
      <div className="wrap">
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p data-reveal="up" className="label mb-6">(05) Selected work</p>
            <h2 data-reveal="words" className="display text-[15vw] md:text-9xl">
              <Words text="Where we've" /> <Words text="dug in." className="text-molten" />
            </h2>
          </div>
          <Link data-reveal="up" to="/projects" className="btn-ghost self-start md:self-auto">
            All projects <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid items-center gap-12 lg:grid-cols-12">
          <div data-reveal="up" className="relative mx-auto w-full max-w-[460px] lg:col-span-5">
            <GhanaMap active={active} onPin={setActive} />
            <p className="label mt-4 text-center">Ghana · project locations</p>
          </div>

          <ul className="lg:col-span-7" onPointerLeave={() => setActive(null)}>
            {projects.map((p, i) => (
              <li key={p.slug} data-reveal="up">
                <Link
                  to={`/projects#${p.slug}`}
                  data-cursor="View"
                  onPointerEnter={() => setActive(p.slug)}
                  onFocus={() => setActive(p.slug)}
                  className={cn(
                    "group grid grid-cols-12 items-center gap-3 border-b border-line py-5 transition-colors first:border-t md:py-6",
                    active === p.slug && "text-gold",
                  )}
                >
                  <span className="label col-span-2 sm:col-span-1">0{i + 1}</span>
                  <span className="display col-span-10 text-3xl transition-transform duration-500 group-hover:translate-x-2 sm:col-span-7 md:text-5xl">
                    {p.title}
                  </span>
                  <span className="col-span-6 col-start-3 text-sm text-bone-muted sm:col-span-2 sm:col-start-auto">{p.sector}</span>
                  <span className="col-span-4 text-right text-sm text-bone-faint sm:col-span-2">{p.years}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ================================================================ PARTNERS */

function Partners() {
  return (
    <section className="border-y border-line py-10">
      <div className="wrap flex flex-col gap-6 md:flex-row md:items-center">
        <p className="label shrink-0 md:w-48">Trusted on projects with</p>
        <Marquee items={partners} speed={30} className="flex-1 font-display text-3xl font-extrabold uppercase text-bone/40 [font-stretch:72%] [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)] md:text-4xl" />
      </div>
    </section>
  );
}
