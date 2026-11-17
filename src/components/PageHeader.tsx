import type { ReactNode } from "react";
import Words from "./Words";

/** Opening block for inner pages: label, giant title, short intro, optional image strip. */
export default function PageHeader({
  label,
  title,
  accent,
  intro,
  image,
  aside,
}: {
  label: string;
  title: string;
  accent?: string;
  intro?: string;
  image?: string;
  aside?: ReactNode;
}) {
  return (
    <section className="relative pt-32 md:pt-40">
      <div className="wrap">
        <p data-reveal="up" className="label mb-8 flex items-center gap-3">
          <span className="h-px w-8 bg-gold" /> {label}
        </p>
        <h1 data-reveal="words" className="display text-[17vw] md:text-[11rem] lg:text-[13rem]">
          <Words text={title} />
          {accent && (
            <>
              {" "}
              <Words text={accent} className="text-molten" />
            </>
          )}
        </h1>
        <div className="mt-10 grid gap-8 md:mt-14 md:grid-cols-12">
          {intro && (
            <p data-reveal="up" className="text-xl leading-relaxed text-bone-muted md:col-span-6 md:col-start-7 md:text-2xl">
              {intro}
            </p>
          )}
          {aside && <div className="md:col-span-5 md:row-start-1">{aside}</div>}
        </div>
      </div>
      {image && (
        <div className="wrap mt-16 md:mt-24">
          <div data-reveal="img" className="relative aspect-[16/10] overflow-hidden rounded-lg md:aspect-[21/9]">
            <img src={image} alt="" className="graded h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
          </div>
        </div>
      )}
    </section>
  );
}
