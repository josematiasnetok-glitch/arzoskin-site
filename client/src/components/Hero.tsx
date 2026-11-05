import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { MessageCircle, ChevronDown } from "lucide-react";
import { useLang } from "@/i18n";
import { useIntro } from "@/lib/intro";
import { WA_MESSAGES, whatsappLink } from "@/data/site";
import { media } from "@/lib/hooks";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const { t, lang } = useLang();
  const { done } = useIntro();
  const reduce = useReducedMotion();
  const vid = useRef<HTMLVideoElement>(null);

  // vídeo mudo e decorativo: toca sempre (inclusive com "reduzir movimento").
  // Se o navegador bloquear o autoplay, tenta de novo no primeiro toque/scroll/movimento.
  useEffect(() => {
    const v = vid.current;
    if (!v) return;
    v.muted = true;
    v.defaultMuted = true;
    const play = () => v.play().catch(() => {});
    play();
    const evts = ["pointerdown", "touchstart", "keydown", "scroll", "mousemove"] as const;
    const once = () => { play(); evts.forEach((e) => window.removeEventListener(e, once)); };
    evts.forEach((e) => window.addEventListener(e, once, { passive: true }));
    v.addEventListener("canplay", play);
    return () => { evts.forEach((e) => window.removeEventListener(e, once)); v.removeEventListener("canplay", play); };
  }, []);

  const show = (d: number) => ({
    initial: reduce ? false : { opacity: 0, y: 26 },
    animate: done ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 1, delay: d, ease },
  });

  return (
    <section id="top" className="relative overflow-hidden bg-ink text-cream lg:bg-cream lg:text-ink">
      <div className="relative mx-auto flex min-h-[100svh] w-full max-w-6xl items-end px-5 pb-14 pt-28 lg:grid lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:gap-14 lg:pb-12 lg:pt-24">
        {/* vídeo: tela cheia no mobile; moldura em arco no desktop */}
        <div className="absolute inset-x-0 top-0 h-[62svh] [mask-image:linear-gradient(to_bottom,#000_62%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,#000_62%,transparent_100%)] lg:relative lg:order-2 lg:inset-auto lg:mx-auto lg:aspect-[3/4] lg:h-auto lg:w-full lg:max-w-[470px] lg:[mask-image:none] lg:[-webkit-mask-image:none]">
          <div className="hidden lg:block absolute -inset-3 rounded-t-[999px] border border-gold/60" aria-hidden="true" />
          <motion.div
            className="h-full w-full overflow-hidden lg:rounded-t-[999px]"
            initial={reduce ? false : { scale: 1.08 }} animate={done ? { scale: 1 } : undefined} transition={{ duration: 2.4, ease }}
          >
            <video
              ref={vid} src={media("hero-video.mp4")} poster={media("hero-sm.webp")}
              autoPlay muted loop playsInline preload="auto" aria-hidden="true"
              className="h-full w-full object-cover object-[50%_30%]"
            />
          </motion.div>
                    <motion.div
            {...show(1.1)}
            className="absolute -bottom-4 -left-4 hidden rounded-full bg-ink px-5 py-3 text-[11px] uppercase tracking-[0.25em] text-gold shadow-xl lg:block"
          >
            {t.hero.badge1} · {t.hero.badge2}
          </motion.div>
        </div>

        <div className="relative z-10 max-w-xl lg:order-1">
          <motion.p {...show(0.1)} className="kicker !text-gold lg:!text-goldDeep">{t.hero.eyebrow}</motion.p>
          <motion.h1 {...show(0.25)} className="mt-5 font-display text-[2.9rem] font-medium leading-[0.98] sm:text-7xl lg:text-[5.2rem]">
            {t.hero.title}
          </motion.h1>
          <motion.p {...show(0.45)} className="mt-5 max-w-md text-base leading-relaxed text-cream/85 sm:text-lg lg:text-ink/75">{t.hero.sub}</motion.p>
          <motion.div {...show(0.65)} className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a href={whatsappLink(WA_MESSAGES.general[lang])} target="_blank" rel="noopener noreferrer" data-cta="whatsapp-hero" className="btn btn-gold">
              <MessageCircle size={18} aria-hidden="true" /> {t.hero.ctaBook}
            </a>
            <a href="#results" className="btn btn-ghost lg:border-ink/35 lg:text-ink lg:hover:bg-ink lg:hover:text-cream">{t.hero.ctaResults}</a>
          </motion.div>
          <motion.ul {...show(0.85)} className="mt-6 flex gap-5 text-sm text-cream/75 lg:hidden">
            <li>{t.hero.badge1}</li>
            <li className="text-gold" aria-hidden="true">·</li>
            <li>{t.hero.badge2}</li>
          </motion.ul>
        </div>
      </div>
      <a href="#about" aria-hidden="true" tabIndex={-1} className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 text-ink/40 lg:block"><ChevronDown className="animate-bounce" /></a>
    </section>
  );
}
