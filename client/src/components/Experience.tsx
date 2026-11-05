import { useEffect, useRef, useState } from "react";
import { Play } from "lucide-react";
import { useT } from "@/i18n";
import { RITUAL } from "@/data/site";
import { media } from "@/lib/hooks";
import { Reveal, SplitHeading } from "./Reveal";
import { Lightbox, type Item } from "./Lightbox";

export function Experience() {
  const t = useT();
  const [idx, setIdx] = useState<number | null>(null);
  const vid = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = vid.current;
    if (!v) return;
    v.muted = true;
    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? v.play().catch(() => {}) : v.pause()), { threshold: 0.25 });
    io.observe(v);
    return () => io.disconnect();
  }, []);

  const items: Item[] = [
    { type: "video", src: media("session.mp4"), poster: media("session.webp"), alt: t.experience.watch, sound: true },
    ...RITUAL.map((f, i): Item => ({ type: "img", src: media(f), alt: t.alt.ritual[i] })),
    { type: "img", src: media("ritual-5.webp"), alt: t.alt.ritual5 },
  ];
  const imgs = [...RITUAL.map((f, i) => ({ f, alt: t.alt.ritual[i], at: i + 1 })), { f: "ritual-5.webp", alt: t.alt.ritual5, at: 5 }];

  return (
    <section id="experience" className="section bg-cream">
      <div className="wrap">
        <div className="max-w-2xl">
          <Reveal><p className="kicker">{t.experience.kicker}</p></Reveal>
          <SplitHeading text={t.experience.title} className="h2 mt-5" />
          <Reveal delay={0.1}><p className="mt-5 text-lg leading-relaxed text-ink/70">{t.experience.sub}</p></Reveal>
        </div>

        <div className="mt-12 grid gap-3 md:grid-cols-4 md:gap-4">
          <Reveal>
            <div className="relative h-full min-h-[420px] overflow-hidden rounded-2xl bg-ink md:min-h-0">
              <video ref={vid} src={media("ritual.mp4")} poster={media("ritual.webp")} loop muted playsInline preload="metadata" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
            </div>
          </Reveal>
          <div className="grid grid-cols-2 gap-3 md:col-span-3 md:grid-cols-3 md:gap-4">
            {imgs.map((im, i) => (
              <Reveal key={im.f} delay={(i % 3) * 0.07}>
                <button onClick={() => setIdx(im.at)} className="group block aspect-[4/5] w-full overflow-hidden rounded-2xl bg-sand" aria-label={im.alt}>
                  <img src={media(im.f)} alt={im.alt} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                </button>
              </Reveal>
            ))}
            <Reveal delay={0.14}>
              <button onClick={() => setIdx(0)} className="group flex aspect-[4/5] w-full flex-col items-center justify-center gap-4 rounded-2xl bg-ink p-5 text-center text-cream transition hover:bg-moss">
                <span className="flex h-14 w-14 items-center justify-center rounded-full border border-gold text-gold transition group-hover:bg-gold group-hover:text-ink"><Play size={22} aria-hidden="true" /></span>
                <span className="font-display text-2xl leading-tight">{t.experience.watch}</span>
              </button>
            </Reveal>
          </div>
        </div>
      </div>
      <Lightbox items={items} index={idx} onIndex={setIdx} onClose={() => setIdx(null)} />
    </section>
  );
}
