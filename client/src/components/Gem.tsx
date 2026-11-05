import { useId, useMemo } from "react";
import { GEMS, type GemKey } from "@/data/site";

const hex = (h: string) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16));
const mix = (a: string, b: string, t: number) => {
  const [r1, g1, b1] = hex(a), [r2, g2, b2] = hex(b);
  return `rgb(${Math.round(r1 + (r2 - r1) * t)},${Math.round(g1 + (g2 - g1) * t)},${Math.round(b1 + (b2 - b1) * t)})`;
};
const pt = (r: number, deg: number): [number, number] => [100 + r * Math.cos((deg * Math.PI) / 180), 100 + r * Math.sin((deg * Math.PI) / 180)];

type Facet = { pts: [number, number][]; t: number };

/** Brilhante em vista superior: mesa (8), estrela (8), meio (8), cintura (16). */
function buildFacets(): Facet[] {
  const T = Array.from({ length: 8 }, (_, i) => pt(34, i * 45 - 90));
  const M = Array.from({ length: 8 }, (_, i) => pt(64, i * 45 - 90 + 22.5));
  const O = Array.from({ length: 16 }, (_, k) => pt(94, k * 22.5 - 90));
  const light = (x: number, y: number) => {
    const a = Math.atan2(y - 100, x - 100) - Math.atan2(-1, -1); // luz vem do alto à esquerda
    return 0.5 + 0.5 * Math.cos(a);
  };
  const out: Facet[] = [];
  const centroid = (p: [number, number][]) => [p.reduce((s, q) => s + q[0], 0) / p.length, p.reduce((s, q) => s + q[1], 0) / p.length];
  const add = (pts: [number, number][], bias: number) => {
    const [cx, cy] = centroid(pts);
    out.push({ pts, t: Math.max(0, Math.min(1, light(cx, cy) * 0.75 + bias)) });
  };
  add(T, 0.22);
  for (let i = 0; i < 8; i++) {
    const n = (i + 1) % 8, p = (i + 7) % 8;
    add([T[i], T[n], M[i]], 0.16);
    add([T[i], M[p], O[2 * i], M[i]], 0.02);
    add([M[i], O[2 * i], O[2 * i + 1]], 0.1);
    add([M[i], O[2 * i + 1], O[(2 * i + 2) % 16]], -0.04);
  }
  return out;
}
const FACETS = buildFacets();
const OUTER = Array.from({ length: 16 }, (_, k) => pt(94, k * 22.5 - 90)).map((p) => p.join(",")).join(" ");

export function Gem({ k, className = "", glint = true }: { k: GemKey; className?: string; glint?: boolean }) {
  const [light, dark] = GEMS[k];
  const id = useId().replace(/:/g, "");
  const facets = useMemo(() => FACETS.map((f) => ({ d: f.pts.map((p) => p.join(",")).join(" "), fill: mix(dark, light, f.t) })), [light, dark]);
  return (
    <svg viewBox="0 0 200 200" className={className} role="img" aria-hidden="true" style={{ overflow: "visible" }}>
      <defs>
        <clipPath id={`c${id}`}><polygon points={OUTER} /></clipPath>
        <linearGradient id={`g${id}`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset=".5" stopColor="#fff" stopOpacity=".75" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <radialGradient id={`s${id}`} cx="50%" cy="50%" r="50%"><stop offset=".6" stopColor={dark} stopOpacity=".55" /><stop offset="1" stopColor={dark} stopOpacity="0" /></radialGradient>
      </defs>
      <ellipse cx="100" cy="196" rx="74" ry="8" fill={`url(#s${id})`} />
      <g clipPath={`url(#c${id})`}>
        {facets.map((f, i) => (<polygon key={i} points={f.d} fill={f.fill} stroke="rgba(255,255,255,.28)" strokeWidth=".6" strokeLinejoin="round" />))}
        {glint && (
          <g className="gem-glint">
            <rect x="-70" y="-20" width="46" height="240" fill={`url(#g${id})`} transform="rotate(18 100 100)" />
          </g>
        )}
      </g>
      <polygon points={OUTER} fill="none" stroke="rgba(255,255,255,.5)" strokeWidth="1" strokeLinejoin="round" />
    </svg>
  );
}

/** Losango minúsculo, usado como marcador e como puxador dos sliders. */
export function Diamond({ className = "", fill = "currentColor" }: { className?: string; fill?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true"><path d="M12 1.5 22.5 12 12 22.5 1.5 12Z" fill={fill} /></svg>
  );
}
