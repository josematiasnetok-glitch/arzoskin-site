import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { en, type Dict } from "./en";
import { pt } from "./pt";
import type { Lang } from "@/data/site";

const dicts: Record<Lang, Dict> = { en, pt };
const KEY = "arzo_lang";

type Ctx = { lang: Lang; setLang: (l: Lang) => void; t: Dict };
const LangContext = createContext<Ctx | null>(null);

function initialLang(): Lang {
  try {
    const saved = localStorage.getItem(KEY);
    if (saved === "en" || saved === "pt") return saved;
  } catch {
    /* sem storage */
  }
  const nav = typeof navigator !== "undefined" ? navigator.language || "" : "";
  return nav.toLowerCase().startsWith("pt") ? "pt" : "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(KEY, l);
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    const t = dicts[lang];
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en-US";
    document.title = t.meta.title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", t.meta.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", t.meta.title);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", t.meta.description);
  }, [lang]);

  const value = useMemo(() => ({ lang, setLang, t: dicts[lang] }), [lang]);
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): Ctx {
  const c = useContext(LangContext);
  if (!c) throw new Error("useLang must be used inside LanguageProvider");
  return c;
}

export const useT = () => useLang().t;
