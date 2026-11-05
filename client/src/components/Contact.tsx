import { Instagram, MapPin, MessageCircle } from "lucide-react";
import { useLang } from "@/i18n";
import { SITE, WA_MESSAGES, whatsappLink } from "@/data/site";
import { media } from "@/lib/hooks";
import { Gem } from "./Gem";
import { ImageReveal, Reveal, SplitHeading } from "./Reveal";

export function Contact() {
  const { t, lang } = useLang();
  const wa = whatsappLink(WA_MESSAGES.general[lang]);
  return (
    <section id="contact" className="section relative overflow-hidden bg-ink text-cream">
      <Gem k="diamante" className="floaty pointer-events-none absolute -right-20 -top-10 w-72 opacity-20 md:-right-10 md:w-[28rem]" />
      <div className="wrap relative grid items-center gap-12 lg:grid-cols-[.7fr_1.3fr] lg:gap-20">
        <ImageReveal className="facet-clip mx-auto aspect-[3/4] w-full max-w-xs rounded-[2rem] lg:max-w-none lg:rounded-none">
          <img src={media("amanda-2.webp")} alt={t.alt.amandaSuit} loading="lazy" className="h-full w-full object-cover object-[50%_18%]" />
        </ImageReveal>
        <div>
          <Reveal><p className="kicker !text-gold">{t.contact.kicker}</p></Reveal>
          <SplitHeading text={t.contact.title} className="mt-5 font-display text-[3rem] font-medium leading-[0.98] text-cream sm:text-7xl lg:text-[5.6rem]" />
          <Reveal delay={0.1}><p className="mt-6 max-w-xl text-lg leading-relaxed text-cream/75">{t.contact.sub}</p></Reveal>
          <Reveal delay={0.15}>
            <a href={wa} target="_blank" rel="noopener noreferrer" data-cta="whatsapp-contact" className="btn btn-gold mt-8 w-full sm:w-auto">
              <MessageCircle size={18} aria-hidden="true" /> {t.common.chat}
            </a>
            <ul className="mt-10 grid gap-5 sm:grid-cols-3">
              <li className="flex items-start gap-3">
                <MessageCircle size={20} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                <div><p className="text-xs uppercase tracking-[0.2em] text-cream/50">{t.contact.whatsapp}</p><a href={`tel:${SITE.phoneTel}`} className="mt-1 block hover:text-gold">{SITE.whatsappDisplay}</a></div>
              </li>
              <li className="flex items-start gap-3">
                <Instagram size={20} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                <div><p className="text-xs uppercase tracking-[0.2em] text-cream/50">{t.contact.instagram}</p><a href={SITE.instagramUrl} target="_blank" rel="noopener noreferrer" className="mt-1 block hover:text-gold">{SITE.instagramHandle}</a></div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={20} className="mt-0.5 shrink-0 text-gold" aria-hidden="true" />
                <div><p className="text-xs uppercase tracking-[0.2em] text-cream/50">{t.contact.where}</p><p className="mt-1">{t.contact.whereValue}</p></div>
              </li>
            </ul>
            <p className="mt-8 text-sm text-cream/50">{t.contact.note}</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
