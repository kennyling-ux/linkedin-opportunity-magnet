"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, User, FileText, Award, TrendingUp, Zap, Plus, CreditCard } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { UserButton, useUser } from "@clerk/nextjs";
import { CreditWidget } from "@/components/CreditWidget";
import { useCredits } from "@/hooks/useCredits";

export function Sidebar() {
  const pathname = usePathname();
  const { t } = useLanguage();
  const { isSignedIn } = useUser();
  const { balance } = useCredits();

  const nav = [
    { href: "/dashboard",              label: t("navDashboard"),    icon: LayoutDashboard },
    { href: "/dashboard/profile",      label: t("navProfile"),      icon: User },
    { href: "/dashboard/content",      label: t("navContent"),      icon: FileText },
    { href: "/dashboard/credibility",  label: t("navCredibility"),  icon: Award },
    { href: "/dashboard/scores",       label: t("navScores"),       icon: TrendingUp },
    { href: "/dashboard/billing",      label: "Billing",            icon: CreditCard },
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

      {/* Founding Member badge */}
      {balance?.isFoundingMember && (
        <div className="mx-3 mt-3 px-3 py-2 rounded-lg bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-300/40 flex items-center gap-2">
          <span className="text-base leading-none">👑</span>
          <div>
            <p className="text-[11px] font-bold text-amber-700 leading-tight">Founding Member</p>
            <p className="text-[10px] text-amber-600/80 leading-tight">Lifetime access</p>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
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
              <span className="font-medium">{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Credit widget */}
      <CreditWidget />

      {/* Bottom */}
      <div className="px-3 py-4 border-t border-slate-100 space-y-2">
        <div className="flex items-center">
          {isSignedIn ? (
            <UserButton />
          ) : (
            <Link href="/sign-in" className="text-xs text-slate-500 hover:text-slate-700 transition-colors">{t("navSignIn")}</Link>
          )}
        </div>
        <Link
          href="/analyze"
          className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-white text-xs font-semibold transition-all shadow-sm shadow-blue-500/20 hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="w-3.5 h-3.5" />
          {t("reanalyze")}
        </Link>
      </div>
    </aside>
  );
}
