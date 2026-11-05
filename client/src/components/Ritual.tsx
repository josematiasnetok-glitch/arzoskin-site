import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { useT } from "@/i18n";
import { RITUAL } from "@/data/site";
import { media } from "@/lib/hooks";
import { Reveal, ScrollDrift, SplitHeading } from "./Reveal";
import { Lightbox, type Item } from "./Lightbox";

const ROMAN = ["I", "II", "III", "IV", "V"];

export function Ritual() {
  const t = useT();
  const [active, setActive] = useState(0);
  const [lb, setLb] = useState<number | null>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const cards = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const v = vid.current;
    if (!v) return;
    v.muted = true;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.2 });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(Number((e.target as HTMLElement).dataset.i))),
      { rootMargin: "-45% 0px -45% 0px" },
    );
    cards.current.forEach((c) => c && io.observe(c));
    return () => io.disconnect();
  }, []);

  const items: Item[] = [{ type: "video", src: media("session.mp4"), poster: media("session.webp"), alt: t.ritual.watch, sound: true }];

  return (
    <section id="ritual" className="section relative bg-ink text-cream">
      <div className="wrap grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-24 lg:self-start">
          <Reveal><p className="kicker !text-gold">{t.ritual.kicker}</p></Reveal>
          <SplitHeading text={t.ritual.title} className="h2 mt-5 !text-cream" />
          <Reveal delay={0.1}><p className="mt-5 max-w-md text-lg leading-relaxed text-cream/70">{t.ritual.sub}</p></Reveal>

          <div className="mt-10 hidden lg:block">
            <p className="text-[11px] uppercase tracking-[0.3em] text-gold">{t.ritual.moment}</p>
            <div className="relative mt-3 h-[9.5rem]">
              <AnimatePresence mode="wait">
                <motion.div key={active} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -14 }} transition={{ duration: 0.45 }} className="absolute inset-0 flex items-start gap-6">
                  <span className="outline-text font-display text-[7rem] italic leading-[0.9]">{ROMAN[active]}</span>
                  <div className="pt-3">
                    <h3 className="font-display text-3xl">{t.ritual.items[active].t}</h3>
                    <p className="mt-2 max-w-[16rem] text-cream/65">{t.ritual.items[active].d}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            <div className="mt-8 flex items-center gap-6">
              <ScrollDrift y={24} rotate={-4} className="shrink-0"><div className="facet-clip relative aspect-[3/4] w-36 overflow-hidden bg-moss">
                <video ref={vid} src={media("ritual.mp4")} poster={media("ritual.webp")} loop muted playsInline preload="metadata" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
              </div></ScrollDrift>
              <button onClick={() => setLb(0)} className="group inline-flex items-center gap-3 text-left">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold text-gold transition group-hover:bg-gold group-hover:text-ink"><Play size={20} aria-hidden="true" /></span>
                <span className="font-display text-2xl leading-tight">{t.ritual.watch}</span>
              </button>
            </div>
          </div>
        </div>

        <ol className="space-y-10 lg:space-y-24">
          {RITUAL.map((f, k) => (
            <li key={f} data-i={k} ref={(el) => { cards.current[k] = el; }}>
              <Reveal>
                <figure className="relative">
                  <div className="aspect-[4/5] overflow-hidden rounded-[1.6rem] ring-1 ring-gold/30">
                    <img src={media(f)} alt={t.ritual.alts[k]} loading="lazy" className="h-full w-full object-cover" />
                  </div>
                  <figcaption className="mt-4 flex items-baseline gap-4 lg:hidden">
                    <span className="font-display text-3xl italic text-gold">{ROMAN[k]}</span>
                    <span><span className="block font-display text-2xl">{t.ritual.items[k].t}</span><span className="text-sm text-cream/65">{t.ritual.items[k].d}</span></span>
                  </figcaption>
                  <span className="outline-text absolute -left-3 -top-8 hidden font-display text-8xl italic lg:block xl:-left-10">{ROMAN[k]}</span>
                </figure>
              </Reveal>
            </li>
          ))}
          <li className="lg:hidden">
            <button onClick={() => setLb(0)} className="group flex w-full items-center justify-center gap-3 rounded-2xl border border-gold/50 py-5 text-gold">
              <Play size={20} aria-hidden="true" /> <span className="font-display text-2xl">{t.ritual.watch}</span>
            </button>
          </li>
        </ol>
      </div>
      <Lightbox items={items} index={lb} onIndex={setLb} onClose={() => setLb(null)} />
    </section>
  );
}
