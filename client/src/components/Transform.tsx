import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { MessageCircle } from "lucide-react";
import { useLang } from "@/i18n";
import { CASES, WA_MESSAGES, whatsappLink } from "@/data/site";
import { media } from "@/lib/hooks";
import { Compare } from "./Compare";
import { Reveal, ScrollScale, SplitHeading } from "./Reveal";

export function Transform() {
  const { t, lang } = useLang();
  const [i, setI] = useState(0);
  const c = CASES[i];
  const info = t.transform.cases[i];
  return (
    <section id="results" className="section relative overflow-hidden bg-cream">
      <div className="wrap">
        <div className="max-w-2xl">
          <Reveal><p className="kicker">{t.transform.kicker}</p></Reveal>
          <SplitHeading text={t.transform.title} className="h2 mt-5" />
          <Reveal delay={0.1}><p className="mt-5 text-lg leading-relaxed text-ink/70">{t.transform.sub}</p></Reveal>
        </div>

        <ScrollScale from={0.92} className="mt-12"><div className="grid items-start gap-8 lg:grid-cols-[1.4fr_.6fr] lg:gap-14" style={{ ["--cmp-h" as string]: "min(74svh, 700px)" }}>
          <div className="min-w-0">
            <AnimatePresence mode="wait">
              <motion.div key={c.n} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.45 }}>
                <Compare
                  n={c.n} w={c.w} h={c.h} focus={c.focus} before={`case-${c.n}-before.webp`} after={`case-${c.n}-after.webp`}
                  labelB={t.transform.before} labelA={t.transform.after} label={t.transform.slider} hint={t.transform.drag}
                  alt={`${info.t} · ${info.s}`}
                />
              </motion.div>
            </AnimatePresence>
            <p className="mt-5 text-center font-display text-2xl italic text-goldDeep">{info.t} <span className="text-ink/40">·</span> <span className="text-ink/60">{info.s}</span></p>
          </div>

          <div className="min-w-0">
            <p className="mb-4 hidden text-[11px] uppercase tracking-[0.3em] text-ink/50 lg:block">{t.transform.case} {String(i + 1).padStart(2, "0")} / {String(CASES.length).padStart(2, "0")}</p>
            <ul className="no-bar -mx-5 flex gap-3 overflow-x-auto px-5 pb-2 lg:mx-0 lg:grid lg:grid-cols-2 lg:gap-3 lg:overflow-visible lg:px-0">
              {CASES.map((k, idx) => {
                const active = idx === i;
                return (
                  <li key={k.n} className="w-24 shrink-0 lg:w-auto">
                    <button onClick={() => setI(idx)} aria-pressed={active} aria-label={`${t.transform.case} ${idx + 1}: ${t.transform.cases[idx].t}`} className={`group relative block aspect-square w-full overflow-hidden rounded-2xl transition duration-500 ${active ? "ring-2 ring-gold ring-offset-2 ring-offset-cream" : "opacity-70 hover:opacity-100"}`}>
                      <img src={media(`case-${k.n}-after.webp`)} alt="" loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-110" />
                      <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/85 to-transparent px-2 pb-1.5 pt-6 text-left text-[10px] uppercase tracking-[0.14em] text-cream">{t.transform.cases[idx].t}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
            <a href={whatsappLink(WA_MESSAGES.general[lang])} target="_blank" rel="noopener noreferrer" data-cta="whatsapp-results" className="btn btn-dark mt-8 w-full">
              <MessageCircle size={18} aria-hidden="true" /> {t.transform.cta}
            </a>
            <p className="mt-5 text-sm text-ink/50">{t.transform.note}</p>
          </div>
        </div>
      </ScrollScale>
      </div>
    </section>
  );
}
