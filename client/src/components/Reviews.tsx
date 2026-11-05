import { useState } from "react";
import { useT } from "@/i18n";
import { FEEDBACK } from "@/data/site";
import { media } from "@/lib/hooks";
import { Reveal, SplitHeading } from "./Reveal";
import { Lightbox, type Item } from "./Lightbox";

export function Reviews() {
  const t = useT();
  const [idx, setIdx] = useState<number | null>(null);
  const items: Item[] = FEEDBACK.map((f) => ({ type: "img", src: media(f.src), alt: t.alt.review }));
  const rowA = FEEDBACK.map((f, i) => ({ ...f, i }));
  const rowB = [...rowA.slice(4), ...rowA.slice(0, 4)];
  const Row = ({ list, cls }: { list: typeof rowA; cls: string }) => (
    <div className={`${cls} flex w-max gap-4`}>
      {[...list, ...list].map((f, k) => (
        <button key={k} onClick={() => setIdx(f.i)} aria-label={t.alt.review} className="group block h-[250px] w-[200px] shrink-0 overflow-hidden rounded-2xl bg-cream shadow-[0_18px_40px_-28px_rgba(27,32,26,.7)] sm:h-[320px] sm:w-[256px]">
          <img src={media(f.src)} alt={t.alt.review} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
        </button>
      ))}
    </div>
  );
  return (
    <section id="reviews" className="section overflow-hidden bg-cream">
      <div className="wrap">
        <div className="max-w-2xl">
          <Reveal><p className="kicker">{t.reviews.kicker}</p></Reveal>
          <SplitHeading text={t.reviews.title} className="h2 mt-5" />
          <Reveal delay={0.1}><p className="mt-5 text-lg leading-relaxed text-ink/70">{t.reviews.sub}</p></Reveal>
        </div>
      </div>
      <div className="pause-hover mt-12 space-y-4 [mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,#000_8%,#000_92%,transparent)]">
        <Row list={rowA} cls="marquee-slow" />
        <Row list={rowB} cls="marquee-rev" />
      </div>
      <Lightbox items={items} index={idx} onIndex={setIdx} onClose={() => setIdx(null)} />
    </section>
  );
}
