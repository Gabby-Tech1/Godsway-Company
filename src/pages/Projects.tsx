import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import PageHeader from "@/components/PageHeader";
import CTA from "@/components/CTA";
import Words from "@/components/Words";
import Counter from "@/components/Counter";
import { projects } from "@/data/site";
import { scrollToEl } from "@/lib/motion";
import { cn } from "@/lib/utils";

const impact = [
  { to: 100, prefix: "", suffix: "+", label: "Projects completed" },
  { to: 500, prefix: "$", suffix: "M+", label: "Project value (USD)" },
  { to: 50, prefix: "", suffix: "+", label: "Partners" },
  { to: 10, prefix: "", suffix: "", label: "Regions served" },
];

export default function Projects() {
  const { hash } = useLocation();

  // Deep links like /projects#tema-port from the home page.
  useEffect(() => {
    if (!hash) return;
    const t = setTimeout(() => scrollToEl(hash, -80), 700);
    return () => clearTimeout(t);
  }, [hash]);

  return (
    <>
      <PageHeader
        label="Selected work"
        title="Built"
        accent="on site."
        intro="Two decades of rail, roads, ports, towers and gold mines, delivered alongside some of the biggest names working in Ghana."
      />

      <div className="wrap mt-24 space-y-28 md:mt-36 md:space-y-44">
        {projects.map((p, i) => {
          const flip = i % 2 === 1;
          return (
            <article key={p.slug} id={p.slug} className="grid scroll-mt-24 gap-8 md:grid-cols-12 md:gap-12">
              <div className={cn("md:col-span-7", flip && "md:order-2 md:col-start-6")}>
                <div data-reveal="img" className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <img src={p.image} alt={p.title} className="graded h-full w-full object-cover" loading="lazy" />
                  <span className="label absolute left-5 top-5 rounded-full bg-ink/70 px-3 py-1.5 text-bone backdrop-blur">{p.sector}</span>
                </div>
              </div>
              <div className={cn("flex flex-col md:col-span-5", flip && "md:order-1 md:col-start-1")}>
                <p data-reveal="up" className="label flex items-center gap-3 text-gold">
                  <span className="display text-5xl text-bone/20">0{i + 1}</span> {p.years}
                </p>
                <h2 data-reveal="words" className="display mt-6 text-6xl md:text-7xl">
                  <Words text={p.title} />
                </h2>
                <p data-reveal="up" className="mt-6 text-lg leading-relaxed text-bone-muted">{p.summary}</p>
                <dl data-reveal="up" className="mt-8 grid grid-cols-2 gap-6 border-t border-line pt-6 text-sm">
                  <div>
                    <dt className="label mb-1">Partner</dt>
                    <dd>{p.partner}</dd>
                  </div>
                  <div>
                    <dt className="label mb-1">Location</dt>
                    <dd>{p.location}</dd>
                  </div>
                </dl>
                <ul data-reveal="up" className="mt-8 flex flex-wrap gap-2">
                  {p.scope.map((s) => (
                    <li key={s} className="rounded-full border border-line px-3 py-1.5 text-sm text-bone-muted">{s}</li>
                  ))}
                </ul>
              </div>
            </article>
          );
        })}
      </div>

      <section className="wrap mt-32 border-t border-line py-20 md:mt-44">
        <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
          {impact.map((s) => (
            <div key={s.label} data-reveal="up">
              <Counter to={s.to} prefix={s.prefix} suffix={s.suffix} className="display block text-6xl text-molten md:text-8xl" />
              <p className="mt-2 text-bone-muted">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <CTA lead="Your project" accent="is next." kicker="Work with us" />
    </>
  );
}
