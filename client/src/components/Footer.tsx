import { useT } from "@/i18n";
import { SITE } from "@/data/site";
import { Wordmark } from "./Wordmark";

export function Footer() {
  const t = useT();
  return (
    <footer className="border-t border-white/10 bg-ink px-5 py-10 text-cream/70">
      <div className="wrap flex flex-col gap-4 text-sm md:flex-row md:items-center md:justify-between">
        <Wordmark light />
        <p>© {new Date().getFullYear()} {SITE.name} · {t.footer.location}. {t.footer.rights}</p>
      </div>
    </footer>
  );
}
