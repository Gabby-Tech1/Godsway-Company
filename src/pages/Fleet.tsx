import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import CTA from "@/components/CTA";
import { useQuote } from "@/components/quote";
import { fleet, fleetCategories, included, media } from "@/data/site";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/motion";
import { cn, usd } from "@/lib/utils";

type Filter = "All" | (typeof fleetCategories)[number];

export default function Fleet() {
  const [filter, setFilter] = useState<Filter>("All");
  const [availableOnly, setAvailableOnly] = useState(false);
  const grid = useRef<HTMLDivElement>(null);
  const openQuote = useQuote();

  const items = useMemo(
    () => fleet.filter((m) => (filter === "All" || m.category === filter) && (!availableOnly || m.availability === "Available")),
    [filter, availableOnly],
  );

  // Re-animate cards whenever the filter changes.
  useLayoutEffect(() => {
    if (!grid.current || prefersReducedMotion()) return;
    // revert() (not kill) so an interrupted tween never leaves cards hidden
    const ctx = gsap.context(() => {
      gsap.from(grid.current!.children, { y: 40, opacity: 0, duration: 0.7, ease: "power3.out", stagger: 0.05 });
    });
    // grid height changed: recompute triggers below it on the next frame
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      cancelAnimationFrame(id);
      ctx.revert();
    };
  }, [items]);

  const available = fleet.filter((m) => m.availability === "Available").length;

  return (
    <>
      <PageHeader
        label="Equipment rental & sales"
        title="The"
        accent="fleet."
        intro="Excavators, rollers, concrete pumps, drill rigs, tippers and breakers from the manufacturers we know best, maintained in-house and delivered to your site."
        aside={
          <div data-reveal="up" className="flex gap-10">
            <div>
              <p className="display text-6xl text-gold">{fleet.length}</p>
              <p className="label mt-1">Machines</p>
            </div>
            <div>
              <p className="display text-6xl">{available}</p>
              <p className="label mt-1">Available now</p>
            </div>
          </div>
        }
      />

      {/* filter bar */}
      <div className="sticky top-[76px] z-30 mt-20 border-y border-line bg-ink/85 backdrop-blur-xl">
        <div className="wrap flex items-center gap-3 overflow-x-auto py-3 [&::-webkit-scrollbar]:hidden">
          {(["All", ...fleetCategories] as Filter[]).map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-sm transition-colors",
                filter === c ? "border-gold bg-gold text-ink" : "border-line text-bone-muted hover:border-bone/40 hover:text-bone",
              )}
              aria-pressed={filter === c}
            >
              {c}
            </button>
          ))}
          <span className="mx-2 h-6 w-px shrink-0 bg-line" />
          <label className="flex shrink-0 cursor-pointer items-center gap-2 text-sm text-bone-muted">
            <input type="checkbox" checked={availableOnly} onChange={(e) => setAvailableOnly(e.target.checked)} className="peer sr-only" />
            <span className="relative h-5 w-9 rounded-full bg-ink-700 transition-colors peer-checked:bg-gold peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-gold after:absolute after:left-0.5 after:top-0.5 after:h-4 after:w-4 after:rounded-full after:bg-bone after:transition-transform peer-checked:after:translate-x-4" />
            Available now
          </label>
        </div>
      </div>

      <section className="wrap py-14 md:py-20">
        <p className="label mb-8" aria-live="polite">
          Showing {items.length} of {fleet.length}
        </p>
        <div ref={grid} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((m) => (
            <article key={m.slug} className="group relative flex flex-col overflow-hidden rounded-lg border border-line bg-ink-900 transition-colors hover:border-gold/40">
              <div className="relative aspect-[16/11] overflow-hidden">
                <img src={m.image} alt="" className="graded h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-900 to-transparent" />
                <span className="label absolute left-4 top-4 rounded-full bg-ink/70 px-3 py-1.5 text-bone backdrop-blur">{m.category}</span>
                <span className="label absolute right-4 top-4 flex items-center gap-2 rounded-full bg-ink/70 px-3 py-1.5 backdrop-blur">
                  <span className={cn("h-1.5 w-1.5 rounded-full", m.availability === "Available" ? "bg-gold" : "bg-bone-faint")} />
                  {m.availability}
                </span>
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="label text-gold">{m.brand}</p>
                <h3 className="display mt-1 text-5xl">
                  <Link to={`/fleet/${m.slug}`} data-cursor="View" className="after:absolute after:inset-0 after:z-0 after:content-['']">
                    {m.name}
                  </Link>
                </h3>
                <p className="mt-2 text-bone-muted">{m.spec}</p>
                <div className="mt-auto flex items-end justify-between border-t border-line pt-5">
                  <p className="text-sm text-bone-muted">
                    from <span className="display text-3xl text-bone">{usd(m.rate)}</span> /day
                  </p>
                  <div className="relative z-10 flex items-center gap-2">
                    <span className="label hidden items-center gap-1 text-bone-muted transition-colors group-hover:text-gold xl:inline-flex">
                      Details <ArrowRight size={12} />
                    </span>
                    <button onClick={() => openQuote({ machine: m })} className="btn-ghost px-4 py-2.5 hover:border-gold hover:text-gold">
                      Quote <ArrowUpRight size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
        {items.length === 0 && (
          <p className="py-20 text-center text-bone-muted">Nothing available in this category right now. Ask us, we can often source it.</p>
        )}
      </section>

      {/* what's included */}
      <section className="relative overflow-hidden border-t border-line py-24 md:py-32">
        <div className="absolute inset-0 -z-10">
          <img src={media.machinesRow} alt="" className="graded h-full w-full object-cover opacity-20" loading="lazy" />
          <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/80 to-ink" />
        </div>
        <div className="wrap">
          <p data-reveal="up" className="label mb-6">Every hire includes</p>
          <h2 data-reveal="up" className="display mb-16 text-6xl md:text-8xl">
            More than <span className="text-molten">the machine.</span>
          </h2>
          <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {included.map(([t, d], i) => (
              <div key={t} data-reveal="up" data-delay={i * 0.08} className="bg-ink-900/95 p-8">
                <p className="label text-gold">0{i + 1}</p>
                <p className="display mt-8 text-4xl">{t}</p>
                <p className="mt-3 text-bone-muted">{d}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm text-bone-faint">Rates are indicative day rates in USD and depend on duration, location and operator requirements.</p>
        </div>
      </section>

      <CTA lead="Need it" accent="on site?" kicker="Rent or buy" />
    </>
  );
}
