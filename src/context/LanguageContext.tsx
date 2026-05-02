"use client";

import { createContext, useContext, ReactNode } from "react";
import type { Lang, TranslationKey } from "@/i18n/translations";
import { t, tArr } from "@/i18n/translations";

const LANG: Lang = "en";

interface LanguageContextValue {
  lang: Lang;
  toggle: () => void;
  t: (key: TranslationKey) => string;
  tArr: (key: TranslationKey) => string[];
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  return (
    <LanguageContext.Provider
      value={{
        lang: LANG,
        toggle: () => {},
        t: (key) => t(key, LANG),
        tArr: (key) => tArr(key, LANG),
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
