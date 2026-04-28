"use client";

import { useLanguage } from "@/context/LanguageContext";
import { cn } from "@/lib/utils";

interface LanguageSwitcherProps {
  variant?: "light" | "dark";
}

export function LanguageSwitcher({ variant = "light" }: LanguageSwitcherProps) {
  const { lang, toggle } = useLanguage();

  return (
    <button
      onClick={toggle}
      className={cn(
        "flex items-center gap-0.5 rounded-lg px-2.5 py-1.5 text-xs font-semibold transition-all border",
        variant === "dark"
          ? "border-slate-700 bg-slate-800 hover:bg-slate-700 text-slate-300"
          : "border-slate-200 bg-white hover:bg-slate-50 text-slate-600 hover:text-slate-900"
      )}
      title="Switch language"
    >
      <span className={cn("transition-opacity", lang === "zh" ? "opacity-100" : "opacity-40")}>中</span>
      <span className="mx-1 opacity-30">/</span>
      <span className={cn("transition-opacity", lang === "en" ? "opacity-100" : "opacity-40")}>EN</span>
    </button>
  );
}
