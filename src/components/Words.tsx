import { Fragment } from "react";
import { cn } from "@/lib/utils";

/**
 * Splits text into masked words so headings can slide up word by word.
 * Put data-reveal="words" on a parent to animate them on scroll.
 */
export default function Words({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((w, i) => (
        <Fragment key={i}>
          <span className="-mb-[0.1em] inline-block overflow-hidden pb-[0.1em] align-top">
            <span data-word className={cn("inline-block will-change-transform", className)}>
              {w}
            </span>
          </span>
          {i < words.length - 1 && " "}
        </Fragment>
      ))}
    </>
  );
}
