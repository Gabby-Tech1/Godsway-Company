import { ArrowUpRight } from "lucide-react";
import Words from "./Words";
import Magnetic from "./Magnetic";
import { useQuote } from "./quote";
import { media } from "@/data/site";

/** Closing call to action: giant headline + spinning circular quote button. */
export default function CTA({
  lead = "Ready to",
  accent = "break ground?",
  kicker = "Start a project",
}: {
  lead?: string;
  accent?: string;
  kicker?: string;
}) {
  const openQuote = useQuote();
  return (
    <section data-stratum="Core" className="relative overflow-hidden py-28 md:py-44">
      <div className="absolute inset-0 -z-10">
        <div data-speed="0.3" className="absolute -inset-y-[20%] inset-x-0">
          <img src={media.mineDusk} alt="" className="graded h-full w-full object-cover opacity-30" loading="lazy" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/70 to-ink" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(var(--gold)/0.18),transparent_60%)]" />
      </div>

      <div className="wrap relative grid items-center gap-14 lg:grid-cols-12">
        <div className="lg:col-span-8">
          <p data-reveal="up" className="label mb-8 text-gold">{kicker}</p>
          <h2 data-reveal="words" className="display text-[17vw] md:text-[10rem] lg:text-[11.5rem]">
            <Words text={lead} /> <Words text={accent} className="text-molten" />
          </h2>
          <p data-reveal="up" className="mt-8 max-w-lg text-lg text-bone-muted">
            Tell us about the site, the timeline and the machines you need. We usually reply within one working day.
          </p>
        </div>

        <div className="flex justify-center lg:col-span-4" data-reveal="up">
          <Magnetic strength={0.4}>
            <button
              onClick={() => openQuote()}
              className="group relative grid h-56 w-56 place-items-center rounded-full bg-gold text-on-gold shadow-[0_30px_80px_-20px_rgb(var(--gold)/0.6)] transition-transform duration-500 hover:scale-105 md:h-64 md:w-64"
              aria-label="Start a project: get a quote"
            >
              <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full animate-[spin-slow_18s_linear_infinite]" aria-hidden>
                <defs>
                  <path id="cta-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
                </defs>
                <text className="fill-current font-mono text-[11px] uppercase tracking-[0.32em]">
                  <textPath href="#cta-circle">Start a project · Get a quote · Start a project · Get a quote ·</textPath>
                </text>
              </svg>
              <ArrowUpRight className="h-14 w-14 transition-transform duration-500 group-hover:rotate-45" strokeWidth={1.4} />
            </button>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
