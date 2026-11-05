import { useState } from "react";
import { useLang } from "@/i18n";
import { RESULTS } from "@/data/site";
import { media } from "@/lib/hooks";
import { Reveal, SplitHeading } from "./Reveal";
import { Lightbox, type Item } from "./Lightbox";

export function Results() {
  const { t, lang } = useLang();
  const [idx, setIdx] = useState<number | null>(null);
  const items: Item[] = RESULTS.map((r) => ({ type: "img", src: media(r.src), alt: r[lang] }));
  return (
    <section id="results" className="section bg-ink text-cream">
      <div className="wrap">
        <div className="max-w-2xl">
          <Reveal><p className="kicker !text-gold">{t.results.kicker}</p></Reveal>
          <SplitHeading text={t.results.title} className="h2 mt-5 !text-cream" />
          <Reveal delay={0.1}><p className="mt-5 text-lg leading-relaxed text-cream/70">{t.results.sub}</p></Reveal>
        </div>
        <ul className="no-bar -mx-5 mt-12 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 md:mx-0 md:grid md:grid-cols-3 md:gap-4 md:overflow-visible md:px-0">
          {RESULTS.map((r, i) => (
            <li key={r.src} className="w-[78%] shrink-0 snap-center sm:w-[46%] md:w-auto">
              <Reveal delay={(i % 3) * 0.08}>
                <button onClick={() => setIdx(i)} className="group block aspect-[4/5] w-full overflow-hidden rounded-2xl bg-moss" aria-label={r[lang]}>
                  <img src={media(r.src)} alt={r[lang]} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                </button>
              </Reveal>
            </li>
          ))}
        </ul>
        <p className="mt-8 text-sm text-cream/55">{t.results.note}</p>
      </div>
      <Lightbox items={items} index={idx} onIndex={setIdx} onClose={() => setIdx(null)} />
    </section>
  );
}
