import { useT } from "@/i18n";
import { Reveal, SplitHeading } from "./Reveal";

export function Steps() {
  const t = useT();
  return (
    <section className="section bg-sand/70">
      <div className="wrap">
        <div className="max-w-2xl">
          <Reveal><p className="kicker">{t.steps.kicker}</p></Reveal>
          <SplitHeading text={t.steps.title} className="h2 mt-5" />
        </div>
        <ol className="relative mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          <span aria-hidden="true" className="rule-gold absolute left-0 right-0 top-[3.1rem] hidden md:block" />
          {t.steps.items.map((s, i) => (
            <Reveal key={s.t} delay={i * 0.12}>
              <li className="relative">
                <span className="outline-text block font-display text-[6rem] italic leading-none">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="mt-3 font-display text-3xl font-medium">{s.t}</h3>
                <p className="mt-2 max-w-xs leading-relaxed text-ink/70">{s.d}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
