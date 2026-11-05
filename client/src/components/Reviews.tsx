import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useT } from "@/i18n";
import { FEEDBACK } from "@/data/site";
import { media } from "@/lib/hooks";
import { Reveal, SplitHeading } from "./Reveal";
import { Lightbox, type Item } from "./Lightbox";

export function Reviews() {
  const t = useT();
  const [idx, setIdx] = useState<number | null>(null);
  const rail = useRef<HTMLUListElement>(null);
  const items: Item[] = FEEDBACK.map((f) => ({ type: "img", src: media(f.src), alt: t.alt.review }));
  const scroll = (d: number) => rail.current?.scrollBy({ left: d * Math.min(640, window.innerWidth * 0.8), behavior: "smooth" });
  return (
    <section id="reviews" className="section overflow-hidden bg-sand/60">
      <div className="wrap">
        <div className="flex items-end justify-between gap-6">
          <div className="max-w-2xl">
            <Reveal><p className="kicker">{t.reviews.kicker}</p></Reveal>
            <SplitHeading text={t.reviews.title} className="h2 mt-5" />
            <Reveal delay={0.1}><p className="mt-5 text-lg leading-relaxed text-ink/70">{t.reviews.sub}</p></Reveal>
          </div>
          <div className="hidden gap-2 md:flex">
            <button onClick={() => scroll(-1)} aria-label={t.common.prev} className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/25 transition hover:bg-ink hover:text-cream"><ChevronLeft /></button>
            <button onClick={() => scroll(1)} aria-label={t.common.next} className="flex h-12 w-12 items-center justify-center rounded-full border border-ink/25 transition hover:bg-ink hover:text-cream"><ChevronRight /></button>
          </div>
        </div>
        <ul ref={rail} className="no-bar -mx-5 mt-12 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3 md:mx-0 md:px-0">
          {FEEDBACK.map((f, i) => (
            <li key={f.src} className="w-[72%] shrink-0 snap-start sm:w-[44%] md:w-[30%] lg:w-[24%]">
              <button onClick={() => setIdx(i)} className="group block aspect-[4/5] w-full overflow-hidden rounded-2xl bg-cream shadow-[0_18px_40px_-28px_rgba(27,32,26,.6)]" aria-label={t.alt.review}>
                <img src={media(f.src)} alt={t.alt.review} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <Lightbox items={items} index={idx} onIndex={setIdx} onClose={() => setIdx(null)} />
    </section>
  );
}
