import { useTheme } from "@/lib/theme";
import { cn } from "@/lib/utils";

/** Sun ↔ moon: the moon is the sun with a bite taken out by a sliding mask. */
export default function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const dark = theme === "dark";
  return (
    <button
      onClick={(e) => toggle({ x: e.clientX, y: e.clientY })}
      className={cn(
        "group grid h-11 w-11 place-items-center rounded-full border border-line text-bone transition-colors hover:border-gold hover:text-gold",
        className,
      )}
      aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
      title={dark ? "Light mode" : "Dark mode"}
    >
      <svg viewBox="0 0 24 24" className="h-[18px] w-[18px] transition-transform duration-700 [transition-timing-function:cubic-bezier(.7,0,.2,1)] group-hover:rotate-45" aria-hidden>
        <mask id="moon-mask">
          <rect width="24" height="24" fill="white" />
          <circle
            cx={dark ? 17 : 30}
            cy={dark ? 7 : -6}
            r="6.5"
            fill="black"
            style={{ transition: "cx .6s cubic-bezier(.7,0,.2,1), cy .6s cubic-bezier(.7,0,.2,1)" }}
          />
        </mask>
        <circle cx="12" cy="12" r={dark ? 8.5 : 5} fill="currentColor" mask="url(#moon-mask)" style={{ transition: "r .6s cubic-bezier(.7,0,.2,1)" }} />
        <g
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          style={{ opacity: dark ? 0 : 1, transform: dark ? "scale(.5)" : "scale(1)", transformOrigin: "center", transition: "all .6s cubic-bezier(.7,0,.2,1)" }}
        >
          {Array.from({ length: 8 }, (_, i) => {
            const a = (i * Math.PI) / 4;
            return <line key={i} x1={12 + Math.cos(a) * 8} y1={12 + Math.sin(a) * 8} x2={12 + Math.cos(a) * 10} y2={12 + Math.sin(a) * 10} />;
          })}
        </g>
      </svg>
    </button>
  );
}
