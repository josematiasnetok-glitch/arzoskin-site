import { ArrowUpRight, MessageCircle } from "lucide-react";
import { useLang } from "@/i18n";
import { GEMS, PROTOCOLS, WA_MESSAGES, whatsappLink } from "@/data/site";
import { Reveal, SplitHeading } from "./Reveal";

function Gem({ k }: { k: keyof typeof GEMS }) {
  const [a, b] = GEMS[k];
  return (
    <span
      aria-hidden="true"
      className="block h-11 w-11 shrink-0 rounded-full shadow-[inset_0_2px_6px_rgba(255,255,255,.55),0_8px_18px_-8px_rgba(0,0,0,.5)]"
      style={{ background: `radial-gradient(circle at 30% 28%, ${a}, ${b})` }}
    />
  );
}

export function Protocols() {
  const { t, lang } = useLang();
  const concernLink = (c: string) => whatsappLink(WA_MESSAGES.concern[lang](c.toLowerCase()));
  return (
    <section id="protocols" className="section bg-sand/60">
      <div className="wrap">
        <div className="max-w-2xl">
          <Reveal><p className="kicker">{t.protocols.kicker}</p></Reveal>
          <SplitHeading text={t.protocols.title} className="h2 mt-5" />
          <Reveal delay={0.1}><p className="mt-5 text-lg leading-relaxed text-ink/70">{t.protocols.sub}</p></Reveal>
        </div>

        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {PROTOCOLS.map((p, i) => {
            const it = t.protocols.items[p.key];
            return (
              <Reveal key={p.id} delay={(i % 3) * 0.08}>
                <li className="group flex h-full flex-col rounded-2xl border border-ink/10 bg-cream p-6 transition duration-500 hover:-translate-y-1 hover:border-gold hover:shadow-[0_24px_50px_-30px_rgba(27,32,26,.5)]">
                  <div className="flex items-center gap-4">
                    <Gem k={p.key} />
                    <div>
                      <h3 className="font-display text-[1.7rem] font-medium leading-none">{it.name}</h3>
                      <p className="mt-1.5 text-[11px] uppercase tracking-[0.18em] text-goldDeep">{it.sub}</p>
                    </div>
                  </div>
                  <p className="mt-5 flex-1 leading-relaxed text-ink/70">{it.d}</p>
                  <a
                    href={whatsappLink(WA_MESSAGES.protocol[lang](`${it.name} (${it.sub})`))} target="_blank" rel="noopener noreferrer" data-cta={`whatsapp-${p.id}`}
                    className="mt-6 inline-flex min-h-[44px] items-center gap-2 text-sm font-medium text-ink underline-offset-4 hover:text-goldDeep hover:underline"
                  >
                    {t.protocols.ask} <ArrowUpRight size={16} aria-hidden="true" />
                  </a>
                </li>
              </Reveal>
            );
          })}
        </ul>

        <Reveal delay={0.1}>
          <div className="mt-10 rounded-2xl bg-ink p-7 text-cream md:flex md:items-center md:justify-between md:gap-10 md:p-10">
            <div className="max-w-md">
              <h3 className="font-display text-3xl font-medium">{t.protocols.notSure}</h3>
              <p className="mt-2 text-cream/70">{t.protocols.notSureSub}</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2.5 md:mt-0 md:max-w-md md:justify-end" aria-label={t.concerns.label}>
              {t.concerns.items.map((c) => (
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
