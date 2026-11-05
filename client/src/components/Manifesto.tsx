import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { useT } from "@/i18n";
import { Gem } from "./Gem";

function Word({ w, i, n, p }: { w: string; i: number; n: number; p: MotionValue<number> }) {
  const a = (i / n) * 0.85;
  const o = useTransform(p, [a, a + 0.12], [0.14, 1]);
  return <motion.span style={{ opacity: o }} className="mr-[0.28em] inline-block">{w}</motion.span>;
}

export function Manifesto() {
  const t = useT();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.8", "end 0.55"] });
  const words = t.manifesto.text.split(" ");
  return (
    <section id="manifesto" ref={ref} className="relative overflow-hidden bg-cream px-5 py-24 md:py-36">
      <Gem k="diamante" glint className="floaty pointer-events-none absolute -right-16 top-10 w-48 opacity-90 md:-right-6 md:w-72" />
      <div className="wrap relative">
        <p className="kicker">{t.manifesto.kicker}</p>
        <p className="mt-8 max-w-4xl font-display text-[2rem] font-medium leading-[1.12] text-ink sm:text-5xl md:text-6xl">
          {reduce ? t.manifesto.text : words.map((w, i) => <Word key={i} w={w} i={i} n={words.length} p={scrollYProgress} />)}
        </p>
      </div>
    </section>
  );
}
