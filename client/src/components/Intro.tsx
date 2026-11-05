import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useT } from "@/i18n";
import { useIntro } from "@/lib/intro";
import { media } from "@/lib/hooks";
import { Mark } from "./Wordmark";

/** Abertura: monograma desenha, nome abre com espaçamento e sobe. Com "reduzir movimento" vira fade curto. */
export function Intro() {
  const t = useT();
  const reduce = useReducedMotion();
  const { finish } = useIntro();
  const [show, setShow] = useState(true);

  const close = useCallback(() => {
    setShow(false);
    finish();
  }, [finish]);

  useEffect(() => {
    if (!show) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const id = window.setTimeout(close, reduce ? 2000 : 3300);
    const key = (e: KeyboardEvent) => e.key === "Escape" && close();
    window.addEventListener("keydown", key);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener("keydown", key);
      document.body.style.overflow = prev;
    };
  }, [show, reduce, close]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="intro"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-ink text-cream"
          exit={reduce ? { opacity: 0 } : { y: "-100%" }}
          transition={{ duration: reduce ? 0.6 : 1.1, ease: [0.76, 0, 0.24, 1] }}
          role="presentation"
        >
          <motion.img
            src={media("hero-sm.webp")} alt="" aria-hidden="true"
            className="absolute inset-0 h-full w-full object-cover opacity-20"
            initial={{ scale: reduce ? 1 : 1.15 }} animate={{ scale: 1 }} transition={{ duration: 4, ease: [0.22, 1, 0.36, 1] }}
          />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(27,32,26,.45)_0%,rgba(27,32,26,.96)_100%)]" />
          <div className="relative flex flex-col items-center px-4">
            <motion.div initial={{ opacity: 0, scale: reduce ? 1 : 0.85 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}>
              <Mark className="h-16 w-16 text-gold sm:h-20 sm:w-20" />
            </motion.div>
            <motion.h1
              className="shine-text mt-6 font-display text-[2.6rem] font-medium sm:text-6xl md:text-7xl"
              initial={{ opacity: 0, letterSpacing: reduce ? "0.3em" : "0.6em" }} animate={{ opacity: 1, letterSpacing: "0.3em" }}
              transition={{ duration: reduce ? 0.8 : 1.8, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              ARZOSKIN
            </motion.h1>
            <motion.span className="mt-5 block h-px bg-gold" initial={{ width: 0 }} animate={{ width: 140 }} transition={{ duration: 1.1, delay: 1.4, ease: "easeInOut" }} />
            <motion.p className="mt-5 text-center text-[11px] uppercase tracking-[0.42em] text-gold" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7, duration: 0.8 }}>
              {t.intro.tagline}
            </motion.p>
          </div>
          <button onClick={close} className="absolute bottom-8 right-6 inline-flex min-h-[44px] items-center gap-2 px-3 text-xs uppercase tracking-[0.25em] text-gold hover:text-cream">
            {t.common.skip} <ArrowRight size={14} aria-hidden="true" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
