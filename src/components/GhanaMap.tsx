import { useMemo } from "react";
import { cn } from "@/lib/utils";

/**
 * Dot-matrix map of Ghana with project locations.
 * The outline is a simplified, stylised border (lon, lat) — not survey-accurate.
 */
const outline: [number, number][] = [
  [-2.83, 11.0], [-1.1, 11.0], [-0.68, 10.98], [-0.15, 11.13], [0.03, 11.08], [-0.05, 10.7], [0.27, 10.4],
  [0.4, 9.5], [0.55, 8.8], [0.5, 8.4], [0.65, 8.2], [0.6, 7.7], [0.5, 7.4], [0.65, 7.0], [1.0, 6.6], [1.2, 6.1],
  [0.9, 5.9], [0.6, 5.75], [0.2, 5.65], [0.0, 5.63], [-0.25, 5.53], [-0.6, 5.33], [-1.0, 5.15], [-1.3, 5.08],
  [-1.62, 4.95], [-1.95, 4.77], [-2.1, 4.74], [-2.35, 4.9], [-2.7, 5.0], [-3.1, 5.1], [-3.0, 5.6], [-3.25, 6.2],
  [-3.22, 6.8], [-2.95, 7.3], [-2.8, 8.0], [-2.65, 8.5], [-2.75, 9.2], [-2.7, 9.6], [-2.85, 10.1], [-2.95, 10.7],
];

const W = 480;
const H = 640;
const LON0 = -3.45, LON1 = 1.45, LAT0 = 4.55, LAT1 = 11.3;
export const project = (lon: number, lat: number) => [((lon - LON0) / (LON1 - LON0)) * W, (1 - (lat - LAT0) / (LAT1 - LAT0)) * H] as const;

function inside(x: number, y: number, poly: (readonly [number, number])[]) {
  let c = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i];
    const [xj, yj] = poly[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) c = !c;
  }
  return c;
}

export const places = {
  accra: { name: "Accra", ll: [-0.19, 5.6] },
  tema: { name: "Tema", ll: [-0.02, 5.67] },
  takoradi: { name: "Takoradi", ll: [-1.76, 4.9] },
  tarkwa: { name: "Tarkwa", ll: [-1.99, 5.3] },
  ahafo: { name: "Ahafo", ll: [-2.35, 7.0] },
  kumasi: { name: "Kumasi", ll: [-1.62, 6.69] },
  obuasi: { name: "Obuasi", ll: [-1.67, 6.2] },
  dunkwa: { name: "Dunkwa", ll: [-1.78, 5.96] },
} as const;
type Place = keyof typeof places;

/** Which map features light up for each project slug. */
export const projectGeo: Record<string, { pins: Place[]; route?: Place[] }> = {
  railway: { pins: ["takoradi", "kumasi"], route: ["takoradi", "tarkwa", "dunkwa", "obuasi", "kumasi"] },
  "takoradi-tarkwa": { pins: ["takoradi", "tarkwa"], route: ["takoradi", "tarkwa"] },
  "newmont-ahafo": { pins: ["ahafo"] },
  "tema-port": { pins: ["tema"] },
  urban: { pins: ["accra", "kumasi"] },
  quarry: { pins: [] },
};

export default function GhanaMap({ active, onPin, className }: { active: string | null; onPin?: (slug: string | null) => void; className?: string }) {
  const poly = useMemo(() => outline.map(([lon, lat]) => project(lon, lat)), []);
  const dots = useMemo(() => {
    const out: [number, number][] = [];
    const step = 11;
    for (let y = step / 2; y < H; y += step) for (let x = step / 2; x < W; x += step) if (inside(x, y, poly)) out.push([x, y]);
    return out;
  }, [poly]);

  const activeGeo = active ? projectGeo[active] : null;
  const allPins = Array.from(new Set(Object.values(projectGeo).flatMap((g) => g.pins)));
  const pinOwner = (p: Place) => Object.entries(projectGeo).find(([, g]) => g.pins.includes(p))?.[0] ?? null;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={cn("h-auto w-full", className)} role="img" aria-label="Map of Ghana showing Godsway project locations">
      <defs>
        <radialGradient id="pin-glow">
          <stop offset="0" stopColor="rgb(var(--gold))" stopOpacity="0.55" />
          <stop offset="1" stopColor="rgb(var(--gold))" stopOpacity="0" />
        </radialGradient>
      </defs>

      <g className={cn("transition-opacity duration-500", active === "quarry" ? "opacity-100" : "opacity-60")}>
        {dots.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={1.6} fill={active === "quarry" ? "rgb(var(--gold))" : "rgb(var(--bone))"} opacity={active === "quarry" ? 0.55 : 0.32} />
        ))}
      </g>

      {/* routes */}
      {Object.entries(projectGeo).map(([slug, g]) =>
        g.route ? (
          <polyline
            key={slug}
            points={g.route.map((p) => project(places[p].ll[0], places[p].ll[1]).join(",")).join(" ")}
            fill="none"
            stroke="rgb(var(--gold))"
            strokeWidth={active === slug ? 3 : 1.5}
            strokeDasharray={slug === "railway" ? "6 5" : undefined}
            strokeLinecap="round"
            opacity={active === slug ? 1 : active ? 0.15 : 0.5}
            className="transition-all duration-500"
          />
        ) : null,
      )}

      {/* pins */}
      {allPins.map((p) => {
        const [x, y] = project(places[p].ll[0], places[p].ll[1]);
        const on = !!activeGeo?.pins.includes(p);
        const dim = !!active && !on;
        const owner = pinOwner(p);
        return (
          <g
            key={p}
            transform={`translate(${x} ${y})`}
            className="cursor-pointer transition-opacity duration-500"
            opacity={dim ? 0.3 : 1}
            onPointerEnter={() => onPin?.(owner)}
            onPointerLeave={() => onPin?.(null)}
          >
            <circle r={on ? 34 : 18} fill="url(#pin-glow)" className="transition-all duration-500" />
            <circle r={on ? 7 : 5} fill="rgb(var(--gold))" className="transition-all duration-500" />
            <circle r="5" fill="none" stroke="rgb(var(--gold))" strokeWidth="1.2">
              <animate attributeName="r" from="5" to="22" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" from="0.9" to="0" dur="2.4s" repeatCount="indefinite" />
            </circle>
            <text x={p === "accra" ? -12 : 12} y={p === "accra" ? 14 : 4} textAnchor={p === "accra" ? "end" : "start"} className="fill-bone font-mono text-[12px] uppercase tracking-[0.12em]" opacity={on || !active ? 1 : 0.5}>
              {places[p].name}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
