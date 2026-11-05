import { MessageCircle } from "lucide-react";
import { useLang } from "@/i18n";
import { SITE, WA_MESSAGES, whatsappLink } from "@/data/site";
import { media } from "@/lib/hooks";
import { ImageReveal, Parallax, Reveal, SplitHeading } from "./Reveal";

export function About() {
  const { t, lang } = useLang();
  return (
    <section id="about" className="section overflow-hidden bg-cream">
      <div className="wrap grid items-center gap-14 lg:grid-cols-[.9fr_1.1fr] lg:gap-20">
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <ImageReveal className="aspect-[4/5] w-full rounded-t-[999px]">
            <Parallax className="h-full w-full" amount={5}>
              <img src={media("amanda-1.webp")} alt={t.alt.amanda} loading="lazy" className="h-full w-full object-cover object-[50%_20%]" />
            </Parallax>
          </ImageReveal>
          <Reveal delay={0.3} className="absolute -bottom-8 -right-2 w-[42%] sm:-right-6">
            <div className="overflow-hidden rounded-2xl border-[6px] border-cream shadow-xl">
              <img src={media("amanda-bw.webp")} alt={t.alt.amandaBw} loading="lazy" className="aspect-[4/5] w-full object-cover" />
            </div>
          </Reveal>
        </div>

        <div>
          <Reveal><p className="kicker">{t.about.kicker}</p></Reveal>
          <SplitHeading text={t.about.title} className="h2 mt-5" />
          <Reveal delay={0.1}>
            <p className="mt-3 font-display text-2xl italic text-goldDeep">{SITE.founder}</p>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink/75">{t.about.p1}</p>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-ink/75">{t.about.p2}</p>
          </Reveal>
          <ul className="mt-9 grid gap-5 sm:grid-cols-3">
            {t.about.pillars.map((p, i) => (
              <Reveal key={p.t} delay={0.1 + i * 0.08}>
                <li className="border-t border-gold/70 pt-4">
                  <h3 className="font-display text-2xl font-medium">{p.t}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink/65">{p.d}</p>
                </li>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={0.2}>
            <a href={whatsappLink(WA_MESSAGES.general[lang])} target="_blank" rel="noopener noreferrer" data-cta="whatsapp-about" className="btn btn-dark mt-10">
              <MessageCircle size={18} aria-hidden="true" /> {t.about.cta}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
