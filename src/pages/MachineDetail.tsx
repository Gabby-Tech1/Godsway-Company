import { useLayoutEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from "lucide-react";
import Magnetic from "@/components/Magnetic";
import NotFound from "./NotFound";
import { useQuote } from "@/components/quote";
import { WhatsAppIcon } from "@/components/WhatsApp";
import { company, fleet, included, whatsappLink } from "@/data/site";
import { gsap, prefersReducedMotion } from "@/lib/motion";
import { cn, usd } from "@/lib/utils";

/**
 * One machine. Only facts we actually hold are shown (brand, model, class,
 * category, day rate, availability); a full spec sheet is offered on request.
 */
export default function MachineDetail() {
  const { slug } = useParams();
  const index = fleet.findIndex((m) => m.slug === slug);
  const m = fleet[index];
  const openQuote = useQuote();
  const root = useRef<HTMLDivElement>(null);
  const [days, setDays] = useState(7);

  useLayoutEffect(() => {
    if (!m || prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.from("[data-md-img]", { clipPath: "inset(12% 12% 12% 12% round 28px)", scale: 1.15, duration: 1.4, ease: "power4.out" });
      gsap.from("[data-md-in]", { y: 40, opacity: 0, duration: 1, ease: "power3.out", stagger: 0.07, delay: 0.2 });
    }, root);
    return () => ctx.revert();
  }, [m]);

  if (!m) return <NotFound />;

  const prev = fleet[(index - 1 + fleet.length) % fleet.length];
  const next = fleet[(index + 1) % fleet.length];
  const related = fleet.filter((x) => x.category === m.category && x.slug !== m.slug);
  const available = m.availability === "Available";
  const specParts = m.spec.split("·").map((s) => s.trim());

  const facts: [string, string][] = [
    ["Manufacturer", m.brand],
    ["Model", m.name],
    ["Category", m.category],
    ["Class", specParts[0]],
    ...(specParts[1] ? ([["Highlight", specParts[1]]] as [string, string][]) : []),
    ["Day rate", `from ${usd(m.rate)}`],
    ["Status", m.availability],
  ];

  return (
    <div ref={root}>
      {/* ---------------------------------------------------------- header */}
      <section className="wrap pt-28 md:pt-32">
        <nav data-md-in className="mb-8 flex items-center justify-between gap-4" aria-label="Breadcrumb">
          <Link to="/fleet" className="label inline-flex items-center gap-2 transition-colors hover:text-gold">
            <ArrowLeft size={14} /> All machines
          </Link>
          <span className="label hidden sm:block">
            Fleet / {m.category} / <span className="text-gold">{m.brand} {m.name}</span>
          </span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* image */}
          <div className="lg:col-span-7">
            <div data-md-img className="relative aspect-[4/3] overflow-hidden rounded-[28px] border border-line">
              <img src={m.image} alt={`${m.brand} ${m.name}`} className="graded h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              <div className="brackets absolute inset-5" />
              <span className="label absolute left-8 top-8 rounded-full bg-ink/70 px-3 py-1.5 text-bone backdrop-blur">{m.category}</span>
              <span className="label absolute right-8 top-8 flex items-center gap-2 rounded-full bg-ink/70 px-3 py-1.5 text-bone backdrop-blur">
                <span className="relative flex h-2 w-2">
                  {available && <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-70" />}
                  <span className={cn("relative inline-flex h-2 w-2 rounded-full", available ? "bg-gold" : "bg-bone-faint")} />
                </span>
                {m.availability}
              </span>
              <p className="display absolute bottom-6 left-8 text-[18vw] leading-none text-bone/10 lg:text-[9rem]">{String(index + 1).padStart(2, "0")}</p>
            </div>
            <p className="mt-3 text-xs text-bone-faint">Representative photo. Ask us for current photos of this unit.</p>
          </div>

          {/* summary */}
          <div className="flex flex-col lg:col-span-5">
            <p data-md-in className="label text-gold">{m.brand}</p>
            <h1 data-md-in className="display mt-2 text-[20vw] sm:text-8xl xl:text-9xl">{m.name}</h1>
            <p data-md-in className="mt-4 text-xl text-bone-muted">{m.spec}</p>

            <div data-md-in className="mt-8 flex items-end gap-3 border-y border-line py-6">
              <span className="text-bone-muted">from</span>
              <span className="display text-7xl text-molten no-serif">{usd(m.rate)}</span>
              <span className="pb-2 text-bone-muted">/ day</span>
            </div>

            {/* rental estimate */}
            <div data-md-in className="mt-6 rounded-2xl border border-line bg-ink-900 p-5">
              <div className="flex items-center justify-between">
                <label htmlFor="days" className="label">Hire length</label>
                <span className="font-mono text-sm">{days} {days === 1 ? "day" : "days"}</span>
              </div>
              <input
                id="days"
                type="range"
                min={1}
                max={90}
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="mt-4 w-full accent-[rgb(var(--gold))]"
              />
              <div className="mt-4 flex items-end justify-between">
                <span className="text-sm text-bone-muted">Indicative estimate</span>
                <span className="display text-4xl">{usd(m.rate * days)}</span>
              </div>
              <p className="mt-2 text-xs text-bone-faint">Based on the starting day rate. Excludes delivery, operator and longer-term discounts; your quote will confirm.</p>
            </div>

            <div data-md-in className="mt-6 flex flex-wrap gap-3">
              <Magnetic>
                <button onClick={() => openQuote({ machine: m })} className="btn-gold px-7 py-4">
                  Request a quote <ArrowUpRight size={16} />
                </button>
              </Magnetic>
              <a
                href={whatsappLink(`Hello Godsway, I'm interested in the ${m.brand} ${m.name}. Is it available for ${days} ${days === 1 ? "day" : "days"}?`)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn px-6 py-4 bg-[#25D366] text-white hover:brightness-110"
              >
                <WhatsAppIcon className="h-5 w-5" /> WhatsApp
              </a>
              <a href={`tel:${company.phone.replace(/\s/g, "")}`} className="btn-ghost px-7 py-4">Call the yard</a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------------------------------------------------- specs + included */}
      <section className="wrap mt-24 grid gap-12 md:mt-32 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <p data-reveal="up" className="label mb-6">Specification</p>
          <dl className="overflow-hidden rounded-2xl border border-line">
            {facts.map(([k, v], i) => (
              <div key={k} data-reveal="up" className={cn("grid grid-cols-5 gap-4 px-5 py-4 sm:px-6", i % 2 === 0 ? "bg-ink-900" : "bg-ink")}>
                <dt className="label col-span-2 self-center">{k}</dt>
                <dd className={cn("col-span-3 text-lg", k === "Status" && available && "text-gold")}>{v}</dd>
              </div>
            ))}
          </dl>
          <div data-reveal="up" className="mt-4 flex flex-col items-start justify-between gap-3 rounded-2xl border border-dashed border-gold/40 p-5 sm:flex-row sm:items-center">
            <p className="text-bone-muted">Need operating weight, engine power or attachments?</p>
            <button onClick={() => openQuote({ machine: m })} className="label inline-flex items-center gap-2 text-gold hover:underline">
              Request the full spec sheet <ArrowRight size={14} />
            </button>
          </div>
        </div>

        <div className="lg:col-span-5">
          <p data-reveal="up" className="label mb-6">Every hire includes</p>
          <ul className="space-y-3">
            {included.map(([t, d]) => (
              <li key={t} data-reveal="up" className="flex gap-4 rounded-2xl border border-line p-5">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gold text-on-gold">
                  <Check size={16} />
                </span>
                <div>
                  <p className="font-medium">{t}</p>
                  <p className="text-sm text-bone-muted">{d}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------------------------------------------------- related */}
      {related.length > 0 && (
        <section className="wrap mt-24 md:mt-32">
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 data-reveal="up" className="display text-5xl md:text-7xl">
              More <span className="text-molten">{m.category.toLowerCase()}</span>
            </h2>
            <Link to="/fleet" className="label hidden items-center gap-2 hover:text-gold sm:inline-flex">
              Full fleet <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {related.map((r) => (
              <Link
                key={r.slug}
                to={`/fleet/${r.slug}`}
                data-cursor="View"
                data-reveal="up"
                className="group flex items-center gap-5 overflow-hidden rounded-2xl border border-line bg-ink-900 p-3 transition-colors hover:border-gold/50"
              >
                <div className="h-24 w-32 shrink-0 overflow-hidden rounded-xl">
                  <img src={r.image} alt="" className="graded h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" loading="lazy" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="label text-gold">{r.brand}</p>
                  <p className="display truncate text-3xl">{r.name}</p>
                  <p className="text-sm text-bone-muted">from {usd(r.rate)}/day · {r.availability}</p>
                </div>
                <ArrowUpRight className="mr-3 shrink-0 transition-transform duration-500 group-hover:rotate-45 group-hover:text-gold" />
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* ---------------------------------------------------------- prev / next */}
      <nav className="wrap mt-24 grid border-y border-line md:mt-32 sm:grid-cols-2" aria-label="Other machines">
        {[
          { m: prev, label: "Previous", icon: <ArrowLeft size={16} /> },
          { m: next, label: "Next", icon: <ArrowRight size={16} /> },
        ].map(({ m: x, label, icon }, i) => (
          <Link
            key={label}
            to={`/fleet/${x.slug}`}
            className={cn("group flex flex-col gap-2 py-10 transition-colors hover:text-gold", i === 1 && "border-t border-line sm:items-end sm:border-l sm:border-t-0 sm:pl-8")}
          >
            <span className="label inline-flex items-center gap-2">{i === 0 && icon}{label} machine{i === 1 && icon}</span>
            <span className="display text-5xl md:text-6xl">{x.brand} {x.name}</span>
            <span className="text-sm text-bone-muted">{x.category}</span>
          </Link>
        ))}
      </nav>
      <div className="h-24 md:h-32" />
    </div>
  );
}
