/** Resolves when the preloader has finished, so page intros can wait for it. */
let resolve: () => void = () => {};
export const introReady = new Promise<void>((r) => (resolve = r));
export const markIntroDone = () => resolve();

const KEY = "gw-intro-seen";
let decided: boolean | null = null;

/** First visit in this tab session? Decided once, so repeat calls agree. */
export function shouldShowPreloader() {
  if (decided !== null) return decided;
  let seen = false;
  try {
    seen = !!sessionStorage.getItem(KEY);
    sessionStorage.setItem(KEY, "1");
  } catch {
    /* storage blocked: show it */
  }
  decided = !seen && !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  return decided;
}
