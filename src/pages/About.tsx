import { useLayoutEffect, useRef } from "react";
import PageHeader from "@/components/PageHeader";
import CTA from "@/components/CTA";
import Words from "@/components/Words";
import { company, goldFacts, media, producers, timeline, values } from "@/data/site";
import { gsap, prefersReducedMotion } from "@/lib/motion";
import { token } from "@/lib/utils";

export default function About() {
  return (
    <>
      <PageHeader
        label={`About · since ${company.founded}`}
        title="Rooted in"
        accent="Ghana."
        intro="Godsway Company Limited is a full-service construction and mining support company based in Accra. We rent, sell and run the machinery behind the roads, railways, ports and mines that drive Ghana's growth."
        image={media.openPit}
      />
      <Timeline />
      <Leadership />
      <Values />
      <GoldSector />
      <CTA lead="Build" accent="with us." kicker="Let's talk" />
    </>
  );
}

function Timeline() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-tl-fill]",
        { scaleY: 0 },
        { scaleY: 1, ease: "none", scrollTrigger: { trigger: "[data-tl-list]", start: "top 70%", end: "bottom 60%", scrub: true } },
      );
      gsap.utils.toArray<HTMLElement>("[data-tl-dot]").forEach((dot) => {
        gsap.fromTo(dot, { scale: 0.4, backgroundColor: token("ink-700") }, {
          scale: 1,
          backgroundColor: token("gold"),
          duration: 0.4,
          scrollTrigger: { trigger: dot, start: "top 62%", toggleActions: "play none none reverse" },
        });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="wrap py-24 md:py-36">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-4">
          <div className="md:sticky md:top-32">
            <p data-reveal="up" className="label mb-6">Our journey</p>
            <h2 data-reveal="words" className="display text-6xl md:text-7xl">
              <Words text="Three decades" /> <Words text="on the ground." className="text-molten" />
            </h2>
          </div>
        </div>
        <ol data-tl-list className="relative md:col-span-7 md:col-start-6">
          <span className="absolute bottom-2 left-[7px] top-2 w-px bg-line" />
          <span data-tl-fill className="absolute bottom-2 left-[7px] top-2 w-px origin-top bg-gold" />
          {timeline.map((t) => (
            <li key={t.year} className="relative pb-16 pl-12 last:pb-0">
              <span data-tl-dot className="absolute left-0 top-3 h-[15px] w-[15px] rounded-full border-2 border-ink bg-gold" />
              <p data-reveal="up" className="display text-7xl text-bone/90 md:text-8xl">{t.year}</p>
              <p data-reveal="up" className="label mt-3 text-gold">{t.title}</p>
              <p data-reveal="up" className="mt-3 max-w-lg text-lg leading-relaxed text-bone-muted">{t.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

function Leadership() {
  return (
    <section className="relative overflow-hidden border-y border-line bg-ink-900 py-24 md:py-36">
      <div className="wrap grid items-center gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          {/* Portrait placeholder — swap for a real photo of the CEO */}
          <div data-reveal="img" className="relative aspect-[4/5] overflow-hidden rounded-lg">
            <img src={media.excavatorBucket} alt="" className="graded h-full w-full object-cover" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
            <p className="label absolute bottom-5 left-5 text-bone">Atlas Copco → Epiroc → Godsway</p>
          </div>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <p data-reveal="up" className="label mb-6">Leadership</p>
          <blockquote data-reveal="words" className="display text-5xl md:text-6xl lg:text-7xl">
            <Words text="From technician to" /> <Words text="international sales leader," className="text-molten" />{" "}
            <Words text="and home again." />
          </blockquote>
          <div className="mt-10 space-y-5 text-lg leading-relaxed text-bone-muted">
            <p data-reveal="up">
              Our CEO began in 1993 as a technician at Atlas Copco and rose to lead international sales, later continuing that career at Epiroc.
            </p>
            <p data-reveal="up">
              That experience with the world's leading equipment manufacturers gives every Godsway project real technical depth and an international standard of service.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Values() {
  return (
    <section className="wrap py-24 md:py-36">
      <div className="mb-16 grid gap-8 md:grid-cols-12">
        <p data-reveal="up" className="label md:col-span-3">Our mission</p>
        <p data-reveal="up" className="text-2xl font-light leading-snug md:col-span-9 md:text-4xl">
          To deliver reliable equipment and expert-led construction and mining services across Ghana and West Africa, driving growth through{" "}
          <span className="text-gold">unwavering commitment to excellence.</span>
        </p>
      </div>
      <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-3">
        {values.map(([t, d], i) => (
          <div key={t} data-reveal="up" data-delay={i * 0.08} className="group bg-ink p-8 transition-colors hover:bg-ink-900 md:p-10">
            <p className="label text-gold">0{i + 1}</p>
            <p className="display mt-16 text-5xl transition-colors group-hover:text-gold md:text-6xl">{t}</p>
            <p className="mt-4 text-bone-muted">{d}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function GoldSector() {
  return (
    <section className="relative overflow-hidden border-t border-line py-24 md:py-36">
      <div className="absolute inset-0 -z-10">
        <div data-speed="0.3" className="absolute -inset-y-[25%] inset-x-0">
          <img src={media.rockWall} alt="" className="h-full w-full object-cover opacity-25 mix-blend-luminosity" loading="lazy" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/85 to-ink" />
      </div>
      <div className="wrap">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-5">
            <p data-reveal="up" className="label mb-6">Ghana mining insights</p>
            <h2 data-reveal="words" className="display text-6xl md:text-7xl">
              <Words text="Africa's" /> <Words text="gold engine." className="text-molten" />
            </h2>
            <p data-reveal="up" className="mt-8 text-lg leading-relaxed text-bone-muted">
              Mining is the backbone of Ghana's economy, and it runs on machinery. Obuasi alone has been producing gold since the late 1800s and has recently been modernised with new equipment and more sustainable practices.
            </p>
            <div className="mt-10 grid grid-cols-2 gap-6">
              {goldFacts.map((f) => (
                <div key={f.label} data-reveal="up" className="border-t border-line pt-4">
                  <p className="display text-4xl text-gold">{f.value}</p>
                  <p className="mt-1 text-sm text-bone-muted">{f.label}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="md:col-span-6 md:col-start-7">
            <p data-reveal="up" className="label mb-6">Ghana's top gold producers</p>
            <div className="overflow-hidden rounded-lg border border-line">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-line bg-ink-900/80">
                    <th className="label p-4 font-normal md:p-5">Company</th>
                    <th className="label hidden p-4 font-normal sm:table-cell md:p-5">Mine</th>
                    <th className="label p-4 text-right font-normal md:p-5">Output</th>
                  </tr>
                </thead>
                <tbody>
                  {producers.map((p) => (
                    <tr key={p.company} data-reveal="up" className="border-b border-line bg-ink/60 last:border-0">
                      <td className="p-4 md:p-5">
                        <span className="display block text-2xl md:text-3xl">{p.company}</span>
                        <span className="text-sm text-bone-muted sm:hidden">{p.mine}</span>
                      </td>
                      <td className="hidden p-4 text-bone-muted sm:table-cell md:p-5">{p.mine}</td>
                      <td className="p-4 text-right text-gold md:p-5">{p.output}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-xs text-bone-faint">Industry figures carried over from the previous site. Verify sources before launch.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
