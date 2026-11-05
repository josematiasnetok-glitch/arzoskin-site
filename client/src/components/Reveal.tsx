import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { createElement, useRef, type ReactNode } from "react";

const ease = [0.22, 1, 0.36, 1] as const;

/** Surgimento suave: fade + subida + leve desfoque. */
export function Reveal({ children, delay = 0, className = "", y = 32 }: { children: ReactNode; delay?: number; className?: string; y?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(5px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.9, delay, ease }}
    >
      {children}
    </motion.div>
  );
}

/** Título que sobe palavra por palavra, de dentro de uma máscara. */
export function SplitHeading({ text, as = "h2", className = "", delay = 0 }: { text: string; as?: "h1" | "h2" | "h3" | "p"; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return createElement(as, { className }, text);
  const words = text.split(" ");
  return createElement(
    as,
    { className, "aria-label": text },
    <motion.span
      aria-hidden="true"
      className="inline"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ staggerChildren: 0.07, delayChildren: delay }}
    >
      {words.map((w, i) => (
        <span key={i} className="mr-[0.26em] inline-block overflow-hidden pb-[0.14em] -mb-[0.14em] align-bottom last:mr-0">
          <motion.span className="inline-block" variants={{ hidden: { y: "115%" }, show: { y: 0, transition: { duration: 1, ease } } }}>
            {w}
          </motion.span>
        </span>
      ))}
    </motion.span>,
  );
}

/** Imagem que se revela com cortina vertical e zoom out. O observador fica num elemento SEM clip-path (senão nunca dispara). */
export function ImageReveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={`overflow-hidden ${className}`}>{children}</div>;
  return (
    <motion.div className={className} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-40px" }}>
      <motion.div
        className="h-full w-full overflow-hidden rounded-[inherit]"
        variants={{ hidden: { clipPath: "inset(0 0 100% 0)" }, show: { clipPath: "inset(0 0 0% 0)", transition: { duration: 1.2, delay, ease: [0.76, 0, 0.24, 1] } } }}
      >
        <motion.div className="h-full w-full" variants={{ hidden: { scale: 1.2 }, show: { scale: 1, transition: { duration: 1.6, delay, ease } } }}>
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/** Parallax suave dentro de uma moldura que corta o excesso. */
export function Parallax({ children, className = "", amount = 7 }: { children: ReactNode; className?: string; amount?: number }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`]);
  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.div className="h-full w-full" style={reduce ? undefined : { y, scale: 1.16 }}>
        {children}
      </motion.div>
    </div>
  );
}
