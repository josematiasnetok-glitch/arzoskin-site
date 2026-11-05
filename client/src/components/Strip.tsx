import { useT } from "@/i18n";

export function Strip() {
  const t = useT();
  const items = [...t.strip, ...t.strip];
  return (
    <div className="overflow-hidden border-y border-ink/10 bg-ink py-4 text-cream" aria-hidden="true">
      <div className="marquee flex w-max items-center gap-10 whitespace-nowrap font-display text-xl italic">
        {items.map((s, i) => (
          <span key={i} className="flex items-center gap-10">
            {s}
            <span className="text-gold">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
