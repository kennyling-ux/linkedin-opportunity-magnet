"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import type { Lang } from "@/i18n/translations";
import { t, tArr } from "@/i18n/translations";
import type { TranslationKey } from "@/i18n/translations";

interface LanguageContextValue {
  lang: Lang;
  toggle: () => void;
  t: (key: TranslationKey) => string;
  tArr: (key: TranslationKey) => string[];
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("zh");

  useEffect(() => {
    const saved = localStorage.getItem("om_lang") as Lang | null;
    if (saved === "en" || saved === "zh") setLang(saved);
  }, []);

  function toggle() {
    setLang((prev) => {
      const next: Lang = prev === "zh" ? "en" : "zh";
      localStorage.setItem("om_lang", next);
      return next;
    });
  }

  return (
    <LanguageContext.Provider
      value={{
        lang,
        toggle,
        t: (key) => t(key, lang),
        tArr: (key) => tArr(key, lang),
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used inside LanguageProvider");
  return ctx;
}
