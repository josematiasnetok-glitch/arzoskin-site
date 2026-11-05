import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { useLang } from "@/i18n";
import { GEMS, GEM_BG, PROTOCOLS, WA_MESSAGES, whatsappLink } from "@/data/site";
import { Gem } from "./Gem";
import { Reveal, SplitHeading } from "./Reveal";

const ROMAN = ["I", "II", "III", "IV", "V", "VI"];

export function Collection() {
  const { t, lang } = useLang();
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const cur = PROTOCOLS[i];
  const it = t.collection.items[cur.key];
  const [light, dark] = GEMS[cur.key];
  const concernLink = (c: string) => whatsappLink(WA_MESSAGES.concern[lang](c.toLowerCase()));
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") { e.preventDefault(); setI((i + 1) % 6); }
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") { e.preventDefault(); setI((i + 5) % 6); }
  };

  return (
    <section id="collection" className="section relative overflow-hidden text-cream transition-colors duration-[900ms]" style={{ backgroundColor: GEM_BG[cur.key] }}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-70 transition-opacity duration-700" style={{ background: `radial-gradient(ellipse 60% 50% at 78% 38%, ${dark}cc, transparent 70%)` }} />
      <div className="wrap relative">
        <div className="max-w-2xl">
          <Reveal><p className="kicker !text-gold">{t.collection.kicker}</p></Reveal>
          <SplitHeading text={t.collection.title} className="h2 mt-5 !text-cream" />
          <Reveal delay={0.1}><p className="mt-5 text-lg leading-relaxed text-cream/70">{t.collection.sub}</p></Reveal>
        </div>

        <div className="mt-12 grid gap-10 lg:grid-cols-[.95fr_1.05fr] lg:gap-16">
          <div className="min-w-0">
            <p className="mb-3 text-[11px] uppercase tracking-[0.3em] text-cream/50 lg:hidden">{t.collection.pick}</p>
            <div role="tablist" aria-label={t.collection.pick} onKeyDown={onKey} className="no-bar -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0 lg:pb-0">
              {PROTOCOLS.map((p, k) => {
                const active = k === i;
                return (
                  <button
                    key={p.id} role="tab" aria-selected={active} tabIndex={active ? 0 : -1} onClick={() => setI(k)}
                    className={`group relative flex shrink-0 items-center gap-4 rounded-full border px-5 py-3 text-left transition duration-500 lg:rounded-none lg:border-0 lg:border-b lg:border-cream/15 lg:px-0 lg:py-5 ${active ? "border-gold bg-white/10 text-cream" : "border-cream/25 text-cream/55 hover:text-cream"}`}
                  >
                    <span className="hidden w-9 font-display text-lg italic text-gold lg:block">{ROMAN[k]}</span>
                    <span className="font-display text-xl leading-none sm:text-2xl lg:text-4xl xl:text-[2.6rem]">{t.collection.items[p.key].name}</span>
                    <span aria-hidden="true" className="ml-auto hidden h-3 w-3 rounded-full transition-all duration-500 lg:block" style={{ background: GEMS[p.key][0], boxShadow: active ? `0 0 18px 4px ${GEMS[p.key][0]}` : "none", opacity: active ? 1 : 0.35 }} />
                    {active && <motion.span layoutId="gem-line" className="absolute bottom-0 left-0 hidden h-px w-full bg-gold lg:block" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="relative min-h-[460px] min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={cur.key} role="tabpanel"
                initial={reduce ? false : { opacity: 0, y: 20, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={reduce ? undefined : { opacity: 0, y: -14, scale: 0.97 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col items-center text-center lg:items-start lg:text-left"
              >
                <div className="relative">
                  <div aria-hidden="true" className="absolute left-1/2 top-1/2 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl" style={{ background: `radial-gradient(circle, ${light}55, transparent 65%)` }} />
                  <Gem k={cur.key} className="floaty relative w-56 sm:w-64 lg:w-[19rem]" />
                </div>
                <p className="mt-8 text-[11px] uppercase tracking-[0.28em]" style={{ color: light }}>{it.sub}</p>
                <h3 className="mt-2 font-display text-4xl font-medium sm:text-5xl">{it.name}</h3>
                <p className="mt-4 max-w-md text-lg leading-relaxed text-cream/75">{it.d}</p>
                <a
                  href={whatsappLink(WA_MESSAGES.protocol[lang](`${it.name} (${it.sub})`))} target="_blank" rel="noopener noreferrer" data-cta={`whatsapp-${cur.id}`}
                  className="btn btn-gold mt-7"
                >
                  {t.collection.ask} <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-16 rounded-2xl border border-cream/15 bg-black/20 p-7 backdrop-blur md:flex md:items-center md:justify-between md:gap-10 md:p-9">
            <div className="max-w-md">
              <h3 className="font-display text-3xl font-medium">{t.collection.notSure}</h3>
              <p className="mt-2 text-cream/65">{t.collection.notSureSub}</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2.5 md:mt-0 md:max-w-md md:justify-end" aria-label={t.collection.concern}>
              {t.collection.concerns.map((c) => (
                <a key={c} href={concernLink(c)} target="_blank" rel="noopener noreferrer" data-cta="whatsapp-concern" className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-gold/60 px-5 text-sm text-cream transition hover:bg-gold hover:text-ink">
                  <MessageCircle size={14} aria-hidden="true" /> {c}
                </a>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
