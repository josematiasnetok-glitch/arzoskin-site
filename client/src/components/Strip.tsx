import { useT } from "@/i18n";
import { Diamond } from "./Gem";

export function Strip() {
  const t = useT();
  const items = [...t.strip, ...t.strip, ...t.strip];
  return (
    <div className="overflow-hidden bg-gold py-4 text-ink" aria-hidden="true">
      <div className="marquee flex w-max items-center gap-8 whitespace-nowrap font-display text-2xl italic">
        {items.map((s, i) => (
          <span key={i} className="flex items-center gap-8">{s}<Diamond className="h-3 w-3" /></span>
        ))}
      </div>
    </div>
  );
}
