import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { MessageCircle } from "lucide-react";
import { useLang } from "@/i18n";
import { useIntro } from "@/lib/intro";
import { WA_MESSAGES, whatsappLink } from "@/data/site";
import { media } from "@/lib/hooks";

const ease = [0.22, 1, 0.36, 1] as const;

function Line({ children, d, show, className = "" }: { children: string; d: number; show: boolean; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className={`block ${className}`}
        initial={reduce ? false : { y: "110%" }}
        animate={show ? { y: 0 } : undefined}
        transition={{ duration: 1.1, delay: d, ease }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function Hero() {
  const { t, lang } = useLang();
  const { done } = useIntro();
  const reduce = useReducedMotion();
  const vid = useRef<HTMLVideoElement>(null);
  const sec = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sec, offset: ["start start", "end start"] });
  const vScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const vFade = useTransform(scrollYProgress, [0.3, 1], [1, 0.15]);
  const cY = useTransform(scrollYProgress, [0, 1], ["0%", "-22%"]);
  const cOp = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  // vídeo mudo e decorativo: toca sempre; se o navegador bloquear, tenta de novo no primeiro gesto.
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

  // holofote dourado que segue o mouse (só desktop)
  const move = (e: React.MouseEvent) => {
    const r = sec.current?.getBoundingClientRect();
    if (!r || !sec.current) return;
    sec.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    sec.current.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const fade = (d: number) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    animate: done ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 1, delay: d, ease },
  });

  return (
    <section
      id="top" ref={sec} onMouseMove={move}
      className="relative overflow-hidden bg-ink text-cream"
      style={{ backgroundImage: "radial-gradient(520px circle at var(--mx,70%) var(--my,30%), rgba(184,154,98,.16), transparent 62%)" }}
    >
      {/* vídeo de fundo, tela cheia */}
      <motion.div aria-hidden="true" className="absolute inset-0" style={reduce ? undefined : { scale: vScale, opacity: vFade }} initial={reduce ? false : { opacity: 0 }} animate={done ? { opacity: 1 } : undefined} transition={{ duration: 1.8, ease }}>
        <video ref={vid} src={media("hero-video.mp4")} poster={media("hero-sm.webp")} autoPlay muted loop playsInline preload="auto" className="h-full w-full object-cover object-[50%_30%]" />
      </motion.div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/20 lg:bg-gradient-to-r lg:from-ink/90 lg:via-ink/50 lg:to-ink/5" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-ink to-transparent" />
      <motion.div style={reduce ? undefined : { y: cY, opacity: cOp }} className="relative mx-auto flex min-h-[100svh] w-full max-w-6xl items-end px-5 pb-14 pt-28 lg:items-center lg:pb-16 lg:pt-24">
        <div className="relative z-10 max-w-xl lg:order-1">
          <motion.p {...fade(0.1)} className="kicker !text-gold">{t.hero.eyebrow}</motion.p>
          <h1 className="mt-5 font-display text-[3rem] font-medium leading-[0.92] sm:text-7xl lg:text-[6.1rem]">
            <Line d={0.2} show={done}>{t.hero.l1}</Line>
            <Line d={0.35} show={done} className="italic text-gold">{t.hero.em}</Line>
            <Line d={0.5} show={done}>{t.hero.l2}</Line>
          </h1>
          <motion.p {...fade(0.75)} className="mt-5 max-w-md text-base leading-relaxed text-cream/80 sm:text-lg">{t.hero.sub}</motion.p>
          <motion.div {...fade(0.9)} className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a href={whatsappLink(WA_MESSAGES.general[lang])} target="_blank" rel="noopener noreferrer" data-cta="whatsapp-hero" className="btn btn-gold">
              <MessageCircle size={18} aria-hidden="true" /> {t.hero.ctaBook}
            </a>
            <a href="#results" className="btn btn-ghost">{t.hero.ctaResults}</a>
          </motion.div>
        </div>
      </motion.div>
      <a
        href={whatsappLink(WA_MESSAGES.general[lang])} target="_blank" rel="noopener noreferrer" data-cta="whatsapp-hero-ring" aria-label={t.hero.ctaBook}
        className="group absolute bottom-14 right-10 z-10 hidden h-[150px] w-[150px] items-center justify-center lg:flex"
      >
        <svg viewBox="0 0 150 150" className="spin-slow absolute inset-0 h-full w-full" aria-hidden="true">
          <defs><path id="ring" d="M75 75 m-58 0 a58 58 0 1 1 116 0 a58 58 0 1 1 -116 0" /></defs>
          <circle cx="75" cy="75" r="73" fill="#1B201A" stroke="#B89A62" strokeOpacity=".6" />
          <text fill="#B89A62" fontSize="9.5" fontFamily="DM Sans, sans-serif"><textPath href="#ring" textLength="360" lengthAdjust="spacing">{t.hero.ring}</textPath></text>
        </svg>
        <span className="relative flex h-14 w-14 items-center justify-center rounded-full bg-gold text-ink transition duration-500 group-hover:scale-110"><MessageCircle size={22} aria-hidden="true" /></span>
      </a>
      <a href="#manifesto" aria-label={t.hero.scroll} className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-gold/80 lg:flex">
        {t.hero.scroll}
        <span className="h-10 w-px animate-pulse bg-gradient-to-b from-gold to-transparent" />
      </a>
    </section>
  );
}
