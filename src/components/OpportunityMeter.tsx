"use client";

import type { OpportunityLevel } from "@/types";
import { cn } from "@/lib/utils";
import { TrendingUp } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface OpportunityMeterProps {
  level: OpportunityLevel;
  reason: string;
  improvements: string[];
}

const config = {
  low: {
    labelKey: "oppLow" as const,
    bg: "bg-red-50",
    border: "border-red-100",
    badgeBg: "bg-red-100",
    badgeText: "text-red-600",
    bar: "bg-gradient-to-r from-red-400 to-red-500",
    barWidth: "w-[22%]",
    dot: "bg-red-400",
    icon: "text-red-500",
    labelColor: "text-red-600",
  },
  medium: {
    labelKey: "oppMedium" as const,
    bg: "bg-amber-50",
    border: "border-amber-100",
    badgeBg: "bg-amber-100",
    badgeText: "text-amber-700",
    bar: "bg-gradient-to-r from-amber-400 to-amber-500",
    barWidth: "w-[52%]",
    dot: "bg-amber-400",
    icon: "text-amber-500",
    labelColor: "text-amber-700",
  },
  high: {
    labelKey: "oppHigh" as const,
    bg: "bg-blue-50",
    border: "border-blue-100",
    badgeBg: "bg-blue-100",
    badgeText: "text-blue-700",
    bar: "bg-gradient-to-r from-blue-400 to-blue-500",
    barWidth: "w-[82%]",
    dot: "bg-blue-400",
    icon: "text-blue-500",
    labelColor: "text-blue-700",
  },
};

export function OpportunityMeter({ level, reason, improvements }: OpportunityMeterProps) {
  const c = config[level];
  const { t } = useLanguage();
  return (
    <div className={cn("rounded-2xl border p-6 space-y-5", c.bg, c.border)}>
      {/* Header row */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center", c.badgeBg)}>
            <TrendingUp className={cn("w-4.5 h-4.5", c.icon)} />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest leading-none mb-1">
              {t("opportunityLabel")}
            </p>
            <p className="font-semibold text-slate-800 text-sm">{t("opportunityLabel")}：{t(c.labelKey)}</p>
          </div>
        </div>
        <div className={cn("flex items-center justify-center w-12 h-12 rounded-xl shrink-0", c.badgeBg)}>
          <span className={cn("text-xl font-black leading-none", c.labelColor)}>{t(c.labelKey)}</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="space-y-1.5">
        <div className="h-2 bg-white/80 rounded-full overflow-hidden shadow-inner">
          <div className={cn("h-full rounded-full transition-all duration-700", c.bar, c.barWidth)} />
        </div>
        <div className="flex justify-between text-[10px] text-slate-400 px-0.5">
          <span>{t("oppLow")}</span>
          <span>{t("oppMedium")}</span>
          <span>{t("oppHigh")}</span>
        </div>
      </div>

      {/* Reason */}
      <p className="text-sm text-slate-600 leading-relaxed">{reason}</p>

      {/* Improvements */}
      {improvements.length > 0 && (
        <div className="space-y-2 pt-1 border-t border-white/60">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">{t("improvementsTitle")}</p>
          <ul className="space-y-2">
            {improvements.slice(0, 4).map((item, i) => (
              <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                <span className={cn("w-1.5 h-1.5 rounded-full mt-1.5 shrink-0", c.dot)} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
