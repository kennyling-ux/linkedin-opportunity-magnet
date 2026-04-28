"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  User,
  FileText,
  Award,
  TrendingUp,
  Zap,
  Plus,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function Sidebar() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const nav = [
    { href: "/dashboard", label: t("navDashboard"), icon: LayoutDashboard },
    { href: "/dashboard/profile", label: t("navProfile"), icon: User },
    { href: "/dashboard/content", label: t("navContent"), icon: FileText },
    { href: "/dashboard/credibility", label: t("navCredibility"), icon: Award },
    { href: "/dashboard/scores", label: t("navScores"), icon: TrendingUp },
  ];

  return (
    <aside className="w-56 shrink-0 border-r border-slate-100 bg-white flex flex-col h-screen sticky top-0">
      {/* Logo */}
      <div className="px-5 py-4 border-b border-slate-100">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center shadow-sm shadow-blue-500/30">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <div className="leading-tight">
            <p className="text-xs font-bold text-slate-900 tracking-tight">Opportunity</p>
            <p className="text-xs text-slate-400 tracking-tight -mt-0.5">Magnet</p>
          </div>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all",
                active
                  ? "bg-slate-950 text-white"
                  : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
              )}
            >
              <Icon className={cn("w-4 h-4 shrink-0", active ? "text-white" : "text-slate-400")} />
              <span className="font-medium">{label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Re-analyze CTA */}
      <div className="px-3 py-4 border-t border-slate-100 space-y-2">
        <div className="flex justify-center">
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
