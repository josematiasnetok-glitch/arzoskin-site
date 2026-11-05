import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useT } from "@/i18n";
import { Diamond } from "./Gem";

/** Faixa que desliza lateralmente conforme a página rola. */
export function Strip() {
  const t = useT();
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);
  const items = [...t.strip, ...t.strip, ...t.strip, ...t.strip];
  return (
    <div ref={ref} className="overflow-hidden bg-gold py-4 text-ink" aria-hidden="true">
      <motion.div style={reduce ? undefined : { x }} className="flex w-max items-center gap-8 whitespace-nowrap font-display text-2xl italic">
        {items.map((s, i) => (
          <span key={i} className="flex items-center gap-8">{s}<Diamond className="h-3 w-3" /></span>
        ))}
      </motion.div>
    </div>
  );
}
