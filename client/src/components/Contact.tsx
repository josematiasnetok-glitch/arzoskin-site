import { Instagram, MapPin, MessageCircle } from "lucide-react";
import { useLang } from "@/i18n";
import { SITE, WA_MESSAGES, whatsappLink } from "@/data/site";
import { media } from "@/lib/hooks";
import { ImageReveal, Reveal, SplitHeading } from "./Reveal";

export function Contact() {
  const { t, lang } = useLang();
  const wa = whatsappLink(WA_MESSAGES.general[lang]);
  return (
    <section id="contact" className="section bg-ink text-cream">
      <div className="wrap grid items-center gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-20">
        <ImageReveal className="mx-auto aspect-[3/4] w-full max-w-sm rounded-t-[999px] lg:max-w-none">
          <img src={media("amanda-2.webp")} alt={t.alt.amandaSuit} loading="lazy" className="h-full w-full object-cover object-[50%_18%]" />
        </ImageReveal>
        <div>
          <Reveal><p className="kicker !text-gold">{t.contact.kicker}</p></Reveal>
          <SplitHeading text={t.contact.title} className="h2 mt-5 !text-cream" />
          <Reveal delay={0.1}><p className="mt-5 max-w-xl text-lg leading-relaxed text-cream/75">{t.contact.sub}</p></Reveal>
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
