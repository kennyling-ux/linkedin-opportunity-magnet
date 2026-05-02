"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { Zap, ChevronDown, ArrowRight, BookOpen, Sparkles, HelpCircle, FileText } from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";
import { UserButton, useUser } from "@clerk/nextjs";

const RESOURCES_EN = [
  { href: "/blog",       icon: BookOpen,   label: "Blog",         desc: "Tips & strategies" },
  { href: "/changelog",  icon: Sparkles,   label: "What's New",   desc: "Latest updates" },
  { href: "/help",       icon: HelpCircle, label: "Help & FAQ",   desc: "Common questions" },
  { href: "/terms",      icon: FileText,   label: "Terms",        desc: "Policies & refund" },
];

const RESOURCES_ZH = [
  { href: "/blog",       icon: BookOpen,   label: "部落格",        desc: "技巧與策略" },
  { href: "/changelog",  icon: Sparkles,   label: "最新動態",      desc: "功能更新記錄" },
  { href: "/help",       icon: HelpCircle, label: "幫助與常見問題", desc: "常見問題解答" },
  { href: "/terms",      icon: FileText,   label: "條款",          desc: "政策與退款" },
];

export function Navbar({ variant = "dark" }: { variant?: "dark" | "light" }) {
  const { t, lang } = useLanguage();
  const { isSignedIn } = useUser();
  const pathname = usePathname();
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const RESOURCES = lang === "zh" ? RESOURCES_ZH : RESOURCES_EN;

  const isDark = variant === "dark";
  const bg = isDark ? "bg-slate-950/90 border-slate-800/60" : "bg-white/90 border-slate-200/80";
  const logoText = isDark ? "text-white" : "text-slate-900";
  const navText = isDark ? "text-slate-400 hover:text-white" : "text-slate-500 hover:text-slate-900";
  const dropdownBg = isDark ? "bg-slate-900 border-slate-800" : "bg-white border-slate-200";
  const dropdownItem = isDark ? "hover:bg-slate-800" : "hover:bg-slate-50";
  const dropdownLabel = isDark ? "text-slate-200" : "text-slate-800";
  const dropdownDesc = isDark ? "text-slate-500" : "text-slate-400";

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setResourcesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 border-b ${bg} backdrop-blur-md`}>
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className={`font-bold text-sm tracking-tight ${logoText}`}>{t("brand")}</span>
        </Link>

        {/* Center nav */}
        <nav className="hidden md:flex items-center gap-1">
          {/* Resources dropdown */}
          <div ref={dropdownRef} className="relative">
            <button
              onClick={() => setResourcesOpen((o) => !o)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${navText}`}
            >
              {lang === "zh" ? "資源" : "Resources"}
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${resourcesOpen ? "rotate-180" : ""}`} />
            </button>

            {resourcesOpen && (
              <div className={`absolute top-full mt-1 left-0 w-56 rounded-xl border shadow-2xl shadow-black/20 overflow-hidden ${dropdownBg}`}>
                <div className="p-1.5">
                  {RESOURCES.map(({ href, icon: Icon, label, desc }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setResourcesOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-150 ${dropdownItem} ${pathname === href ? "bg-blue-500/10" : ""}`}
                    >
                      <div className="w-7 h-7 rounded-lg bg-blue-500/10 flex items-center justify-center shrink-0">
                        <Icon className="w-3.5 h-3.5 text-blue-400" />
                      </div>
                      <div className="min-w-0">
                        <p className={`text-sm font-medium leading-tight ${dropdownLabel}`}>{label}</p>
                        <p className={`text-xs leading-tight mt-0.5 ${dropdownDesc}`}>{desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Link href="/pricing" className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150 ${navText}`}>
            {t("navPricing")}
          </Link>
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher variant={variant} />
          {isSignedIn ? (
            <>
              <UserButton />
              <Link
                href="/analyze"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-blue-500 hover:bg-blue-400 active:scale-[0.97] text-white font-semibold text-xs transition-all duration-150 shadow-md shadow-blue-500/25 hover:scale-[1.04] hover:shadow-blue-500/40"
              >
                {t("startAnalysis")} <ArrowRight className="w-3 h-3" />
              </Link>
            </>
          ) : (
            <>
              <Link href="/sign-in" className={`text-sm transition-colors duration-150 ${navText}`}>
                {t("navSignIn")}
              </Link>
              <Link
                href="/analyze"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-blue-500 hover:bg-blue-400 active:scale-[0.97] text-white font-semibold text-sm transition-all duration-150 shadow-md shadow-blue-500/25 hover:scale-[1.04] hover:shadow-blue-500/40"
              >
                {t("navTryFree")} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </>
          )}
        </div>

      </div>
    </header>
  );
}
