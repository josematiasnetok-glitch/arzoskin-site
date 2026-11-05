import { useEffect, useRef, useState } from "react";
import { animate, motion, useInView, useMotionTemplate, useMotionValue, useReducedMotion, useTransform } from "framer-motion";
import { ChevronsLeftRight } from "lucide-react";
import { media } from "@/lib/hooks";

type Props = { n: number; w: number; h: number; focus: string; before: string; after: string; labelB: string; labelA: string; label: string; hint: string; alt: string };

/** Comparador de arrastar: a linha dourada revela o "depois"; o puxador é um losango (a gema). */
export function Compare({ n, w, h, focus, before, after, labelB, labelA, label, hint, alt }: Props) {
  const reduce = useReducedMotion();
  const ratio = Math.max(w / h, 0.72); // fotos muito altas são enquadradas em 0,72 para o comparador não ficar estreito
  const box = useRef<HTMLDivElement>(null);
  const inView = useInView(box, { margin: "-12% 0px" });
  const pos = useMotionValue(50);
  const clip = useMotionTemplate`inset(0 0 0 ${pos}%)`;
  const left = useMotionTemplate`${pos}%`;
  const opB = useTransform(pos, [0, 14], [0, 1]);
  const opA = useTransform(pos, [86, 100], [1, 0]);
  const [val, setVal] = useState(50);
  const [touched, setTouched] = useState(false);
  const drag = useRef(false);

  useEffect(() => pos.on("change", (v) => setVal(Math.round(v))), [pos]);

  const anim = useRef<ReturnType<typeof animate> | null>(null);
  const used = useRef(false);

  // novo caso: volta ao meio e libera o convite de novo
  useEffect(() => { used.current = false; setTouched(false); pos.set(50); }, [n, pos]);

  // convite: varredura única quando o caso aparece; para assim que a pessoa interage
  useEffect(() => {
    if (!inView || reduce || used.current) return;
    anim.current = animate(pos, [50, 22, 78, 50], { duration: 2.8, delay: 0.5, ease: "easeInOut" });
    return () => anim.current?.stop();
  }, [n, inView, reduce, pos]);

  const takeOver = () => { used.current = true; anim.current?.stop(); setTouched(true); };

  const set = (x: number) => {
    const b = box.current!.getBoundingClientRect();
    pos.set(Math.max(0, Math.min(100, ((x - b.left) / b.width) * 100)));
  };
  const nudge = (d: number) => { takeOver(); pos.set(Math.max(0, Math.min(100, pos.get() + d))); };

  return (
    <div
      ref={box}
      onPointerDown={(e) => { drag.current = true; takeOver(); (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId); set(e.clientX); }}
      onPointerMove={(e) => drag.current && set(e.clientX)}
      onPointerUp={() => (drag.current = false)} onPointerCancel={() => (drag.current = false)}
      style={{ aspectRatio: `${ratio}`, width: `min(100%, calc(var(--cmp-h) * ${ratio}))`, touchAction: "pan-y" }}
      className="relative mx-auto cursor-ew-resize select-none overflow-hidden rounded-[1.6rem] bg-moss shadow-[0_40px_80px_-40px_rgba(27,32,26,.7)] ring-1 ring-gold/50"
    >
      <img src={media(before)} alt={alt} width={w} height={h} className="absolute inset-0 h-full w-full object-cover" style={{ objectPosition: focus }} draggable={false} />
      <motion.img src={media(after)} alt="" width={w} height={h} draggable={false} className="absolute inset-0 h-full w-full object-cover" style={{ clipPath: clip, WebkitClipPath: clip, objectPosition: focus }} />

      <motion.span style={{ opacity: opB }} className="pointer-events-none absolute left-3 top-3 rounded-full bg-ink/75 px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.25em] text-cream backdrop-blur">{labelB}</motion.span>
      <motion.span style={{ opacity: opA }} className="pointer-events-none absolute right-3 top-3 rounded-full bg-gold px-3.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.25em] text-ink">{labelA}</motion.span>

      <motion.div className="pointer-events-none absolute inset-y-0 w-px bg-gold shadow-[0_0_18px_3px_rgba(184,154,98,.65)]" style={{ left }} />
      <motion.div
        role="slider" tabIndex={0} aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={val} aria-orientation="horizontal"
        onKeyDown={(e) => {
          if (e.key === "ArrowLeft") { e.preventDefault(); nudge(-5); }
          if (e.key === "ArrowRight") { e.preventDefault(); nudge(5); }
          if (e.key === "Home") { e.preventDefault(); pos.set(0); }
          if (e.key === "End") { e.preventDefault(); pos.set(100); }
        }}
        className="absolute top-1/2 -ml-7 -mt-7 flex h-14 w-14 rotate-45 items-center justify-center rounded-[10px] border border-gold bg-ink/80 text-gold shadow-[0_12px_30px_-8px_rgba(0,0,0,.7)] backdrop-blur-md"
        style={{ left }}
      >
        <ChevronsLeftRight size={20} aria-hidden="true" className="-rotate-45" />
      </motion.div>

      <div className={`pointer-events-none absolute inset-x-0 bottom-4 flex justify-center transition-opacity duration-700 ${touched ? "opacity-0" : "opacity-100"}`}>
        <span className="rounded-full bg-ink/80 px-4 py-2 text-[10px] uppercase tracking-[0.3em] text-gold backdrop-blur">← {hint} →</span>
      </div>
    </div>
  );
}
