import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useLang } from "@/i18n";
import { SITE, WA_MESSAGES, whatsappLink } from "@/data/site";
import { Wordmark } from "./Wordmark";
import { FlagBR, FlagUS } from "./Flags";
import { useLockScroll } from "@/lib/hooks";

export function Header() {
  const { t, lang, setLang } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const hiddenRef = useRef(false);
  hiddenRef.current = hidden;
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 110, damping: 24, mass: 0.2 });
  useLockScroll(open);

  useEffect(() => {
    let last = window.scrollY;
    const on = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > 500 && y > last + 4 ? true : y < last - 4 ? false : hiddenRef.current);
      last = y;
    };
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  const links = [
    ["#collection", t.nav.collection],
    ["#results", t.nav.results],
    ["#ritual", t.nav.ritual],
    ["#about", t.nav.about],
    ["#contact", t.nav.contact],
  ];
  const wa = whatsappLink(WA_MESSAGES.general[lang]);
  const solid = scrolled || open;
  // Mobile: o hero é escuro (texto claro). Desktop: o hero é claro, então o texto do topo é escuro.
  const tone = solid ? "text-ink" : "text-cream";

  const LangBtn = () => (
    <div className="flex items-center rounded-full border border-gold/70 p-0.5" role="group" aria-label={t.common.language}>
      {(["en", "pt"] as const).map((l) => (
        <button
          key={l} onClick={() => setLang(l)} aria-pressed={lang === l}
          className={`flex min-h-[36px] items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-medium ${lang === l ? "bg-gold text-ink" : "opacity-80 hover:opacity-100"}`}
        >
          {l === "en" ? <FlagUS /> : <FlagBR />}
          {l.toUpperCase()}
        </button>
      ))}
    </div>
  );

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition duration-500 ${hidden && !open ? "-translate-y-full" : "translate-y-0"} ${solid ? "bg-cream/95 shadow-sm backdrop-blur" : ""} ${tone}`}>
      <motion.div aria-hidden="true" className="absolute inset-x-0 top-0 h-0.5 origin-left bg-gold" style={{ scaleX: progress }} />
      <div className="wrap flex h-[68px] items-center justify-between px-5">
        <a href="#top" aria-label={SITE.name}><Wordmark light={!solid} /></a>
        <nav className="hidden items-center gap-8 text-sm lg:flex" aria-label="Main">
          {links.map(([h, l]) => (<a key={h} href={h} className="transition hover:text-goldDeep">{l}</a>))}
        </nav>
        <div className="hidden items-center gap-4 lg:flex">
          <LangBtn />
          <a href={wa} target="_blank" rel="noopener noreferrer" data-cta="whatsapp-header" className="btn btn-dark !py-2.5">{t.common.chat}</a>
        </div>
        <div className="flex items-center gap-2 lg:hidden">
          <LangBtn />
          <button className="flex min-h-[44px] min-w-[44px] items-center justify-center" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={t.nav.menu}>
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      {open && (
        <div className="h-[calc(100dvh-68px)] overflow-auto bg-cream px-5 pb-8 pt-2 text-ink lg:hidden">
          <nav className="flex flex-col" aria-label="Mobile">
            {links.map(([h, l]) => (<a key={h} href={h} onClick={() => setOpen(false)} className="border-b border-ink/10 py-4 font-display text-3xl">{l}</a>))}
          </nav>
          <a href={wa} target="_blank" rel="noopener noreferrer" data-cta="whatsapp-menu" className="btn btn-dark mt-6 w-full">{t.common.chat}</a>
        </div>
      )}
    </header>
  );
}
