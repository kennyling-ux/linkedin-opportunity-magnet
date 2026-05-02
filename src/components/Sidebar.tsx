"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, User, FileText, Award, TrendingUp, Zap, Plus, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { UserButton, useUser } from "@clerk/nextjs";
import { useIsPro } from "@/components/PaywallGate";

export function Sidebar() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const isPro = useIsPro();
  const { isSignedIn } = useUser();

  const nav = [
    { href: "/dashboard", label: t("navDashboard"), icon: LayoutDashboard, pro: false },
    { href: "/dashboard/profile", label: t("navProfile"), icon: User, pro: true },
    { href: "/dashboard/content", label: t("navContent"), icon: FileText, pro: true },
    { href: "/dashboard/credibility", label: t("navCredibility"), icon: Award, pro: true },
    { href: "/dashboard/scores", label: t("navScores"), icon: TrendingUp, pro: true },
  ];

  return (
    <aside className="w-56 shrink-0 border-r border-slate-200 bg-white flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="px-5 py-4 border-b border-slate-100">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center shadow-sm shadow-blue-500/30">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-bold text-slate-900 text-sm tracking-tight">{t("brand")}</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
        {nav.map(({ href, label, icon: Icon, pro }) => {
          const active = pathname === href;
          const locked = pro && isPro === false;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-150",
                active
                  ? "bg-slate-950 text-white shadow-sm"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-50 hover:translate-x-0.5"
              )}
            >
              <Icon className={cn("w-4 h-4 shrink-0", active ? "text-white" : "text-slate-400")} />
              <span className="font-medium flex-1">{label}</span>
              {locked && (
                <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 font-bold">Pro</span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Upgrade CTA — only for free users */}
      {isPro === false && (
        <div className="mx-3 mb-2">
          <Link
            href="/pricing"
            className="flex items-center gap-2 w-full px-3 py-2.5 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/5 border border-amber-500/20 hover:border-amber-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all duration-150"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <div className="leading-tight">
              <p className="text-xs font-semibold text-amber-600">{t("sidebarUpgrade")}</p>
              <p className="text-[10px] text-slate-500">{t("sidebarUnlock")}</p>
            </div>
          </Link>
        </div>
      )}

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-slate-100 space-y-2">
        <div className="flex items-center justify-between">
            {isSignedIn ? (
            <UserButton />
          ) : (
            <Link href="/sign-in" className="text-xs text-slate-500 hover:text-slate-700 transition-colors">{t("navSignIn")}</Link>
          )}
          <LanguageSwitcher variant="light" />
        </div>
        <Link
          href="/analyze"
          className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-white text-xs font-semibold transition-colors shadow-sm shadow-blue-500/20"
        >
          <Plus className="w-3.5 h-3.5" />
          {t("reanalyze")}
        </Link>
      </div>
    </aside>
  );
}
