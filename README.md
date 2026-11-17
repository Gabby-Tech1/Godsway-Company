# Godsway Company Ltd — website

Marketing site for Godsway Company Limited: machine rentals, equipment sales, construction and mining support in Ghana since 2004.

Light and dark themes (toggle with a circular reveal; remembers the choice). The home page reads as a dig: a Three.js gold-ore hero bursts on scroll and settles into a glowing particle open-pit mine, and a depth gauge on the right counts metres as you scroll down through named strata.

Other details: first-visit preloader, custom gold cursor, magnetic buttons, variable-font headline that swells near the cursor, stacked service cards, interactive fleet picker, Ghana dot-map of projects, and a footer revealed from under the page.

## Stack

- React 18 + TypeScript + Vite
- Tailwind CSS (design tokens in `src/index.css`)
- GSAP + ScrollTrigger for scroll animation, Lenis for smooth scrolling
- Three.js for the hero (lazy-loaded in its own chunk)

## Develop

```bash
pnpm install
pnpm dev
pnpm build
```

## Where things live

| Path | What |
|---|---|
| `src/data/site.ts` | **All copy and data**: company details, services, fleet, projects, timeline |
| `public/media/` | Photos (free Unsplash stock, graded dark/warm in CSS via `.graded`) |
| `src/pages/` | Home, Fleet, machine details (`/fleet/:slug`), Projects, About, Contact, 404 |
| `src/components/GoldField.tsx` | Particle hero (ore → open pit) |
| `src/lib/theme.tsx` | Light/dark theme provider and toggle |
| `src/index.css` | Design tokens for both themes |
| `src/components/quote.tsx` | Slide-in quote form (`useQuote()`) |
| `src/lib/useReveals.ts` | `data-reveal` / `data-speed` scroll animations |

Old URLs `/services`, `/equipment` and `/mining-insights` redirect to `/`, `/fleet` and `/about`.

## Before launch

- Replace values marked `PLACEHOLDER` in `src/data/site.ts` (phone numbers, social links).
- Swap stock photos in `public/media/` for real photos of the fleet and sites; add a CEO portrait on the About page.
- Set `company.whatsapp` in `src/data/site.ts` to the real WhatsApp number (digits only, e.g. `233241234567`).
- Forms: add `RESEND_API_KEY` (and optionally `ENQUIRY_TO`, `ENQUIRY_FROM`) in Vercel → Settings → Environment Variables. See `.env.example`. Until then, and on local `pnpm dev` (which has no `/api`), forms fall back to "Send on WhatsApp / Send by email" with the details pre-filled.

## Forms

Quote and contact forms POST to `api/enquiry.ts`, a Vercel Function that validates input, drops spam caught by a hidden honeypot field, and emails the enquiry via [Resend](https://resend.com) with the visitor as reply-to.
- Verify the Ghana gold-sector figures on Home and About.
