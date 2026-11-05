import { useT } from "@/i18n";
import { Reveal, SplitHeading } from "./Reveal";

export function Steps() {
  const t = useT();
  return (
    <section className="section bg-cream">
      <div className="wrap">
        <div className="max-w-2xl">
          <Reveal><p className="kicker">{t.steps.kicker}</p></Reveal>
          <SplitHeading text={t.steps.title} className="h2 mt-5" />
        </div>
        <ol className="mt-12 grid gap-8 md:grid-cols-3">
          {t.steps.items.map((s, i) => (
            <Reveal key={s.t} delay={i * 0.1}>
              <li className="border-t border-gold pt-5">
                <span className="font-display text-5xl italic text-gold">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-display text-3xl font-medium">{s.t}</h3>
                <p className="mt-2 leading-relaxed text-ink/70">{s.d}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
