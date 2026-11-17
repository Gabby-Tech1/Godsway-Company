import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          DEFAULT: "rgb(var(--ink) / <alpha-value>)",
          900: "rgb(var(--ink-900) / <alpha-value>)",
          800: "rgb(var(--ink-800) / <alpha-value>)",
          700: "rgb(var(--ink-700) / <alpha-value>)",
        },
        bone: {
          DEFAULT: "rgb(var(--bone) / <alpha-value>)",
          muted: "rgb(var(--bone-muted) / <alpha-value>)",
          faint: "rgb(var(--bone-faint) / <alpha-value>)",
        },
        gold: {
          DEFAULT: "rgb(var(--gold) / <alpha-value>)",
          bright: "rgb(var(--gold-bright) / <alpha-value>)",
          deep: "rgb(var(--gold-deep) / <alpha-value>)",
        },
        line: "rgb(var(--bone) / 0.1)",
        "on-gold": "rgb(var(--on-gold) / <alpha-value>)",
      },
      fontFamily: {
        display: ['"Archivo"', '"Anton"', "Impact", "sans-serif"],
        serif: ['"Instrument Serif"', "Georgia", "serif"],
        sans: ['"Inter Tight"', "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "monospace"],
      },
      letterSpacing: {
        label: "0.18em",
      },
      maxWidth: {
        site: "1440px",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "scroll-hint": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(200%)" },
        },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "scroll-hint": "scroll-hint 1.8s cubic-bezier(.6,0,.4,1) infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
