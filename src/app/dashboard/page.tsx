"use client";

import { useApp } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import { ScoreRing } from "@/components/ScoreRing";
import { OpportunityMeter } from "@/components/OpportunityMeter";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, User, FileText, Award, TrendingUp, AlertCircle } from "lucide-react";

const moduleCardsBase = [
  {
    href: "/dashboard/profile",
    icon: User,
    descKey: "mod1Desc" as const,
    accent: "border-blue-200 hover:border-blue-400 hover:bg-blue-50/50",
    iconBg: "bg-blue-100 text-blue-600",
    tag: "bg-blue-50 text-blue-600",
  },
  {
    href: "/dashboard/content",
    icon: FileText,
    descKey: "mod2Desc" as const,
    accent: "border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50/50",
    iconBg: "bg-indigo-100 text-indigo-600",
    tag: "bg-indigo-50 text-indigo-600",
  },
  {
    href: "/dashboard/credibility",
    icon: Award,
    descKey: "mod3Desc" as const,
    accent: "border-violet-200 hover:border-violet-400 hover:bg-violet-50/50",
    iconBg: "bg-violet-100 text-violet-600",
    tag: "bg-violet-50 text-violet-600",
  },
  {
    href: "/dashboard/scores",
    icon: TrendingUp,
    descKey: "mod4Desc" as const,
    accent: "border-sky-200 hover:border-sky-400 hover:bg-sky-50/50",
    iconBg: "bg-sky-100 text-sky-600",
    tag: "bg-sky-50 text-sky-600",
  },
];

const navLabels: Record<string, string> = {
  "/dashboard/profile": "navProfile",
  "/dashboard/content": "navContent",
  "/dashboard/credibility": "navCredibility",
  "/dashboard/scores": "navScores",
};

export default function DashboardPage() {
  const { analysis, input } = useApp();
  const router = useRouter();
  const { t } = useLanguage();

  useEffect(() => {
    if (!analysis) router.replace("/analyze");
  }, [analysis, router]);

  if (!analysis) return null;

  const { scores, gaps, suggestedIndustry, suggestedTargetRoles } = analysis;
  const totalGaps = [
    ...gaps.missingElements,
    ...gaps.contentGaps,
    ...gaps.visibilityIssues,
    ...gaps.credibilityIssues,
  ].length;

  return (
    <div className="p-8 space-y-7 max-w-5xl">
      {/* Page header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight mb-1">{t("dashTitle")}</h1>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm text-slate-500">{input?.industry || suggestedIndustry}</span>
            <span className="text-slate-300">·</span>
            <span className="text-sm text-slate-500">{t("dashTarget")}{input?.targetRole || suggestedTargetRoles[0]}</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-slate-400">{totalGaps} {t("dashGaps")}</div>
        </div>
      </div>

      {/* Opportunity meter */}
      <OpportunityMeter
        level={scores.opportunityLevel}
        reason={scores.opportunityReason}
        improvements={scores.opportunityImprovements}
      />

      {/* Scores */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-6">{t("scoresSection")}</p>
        <div className="grid grid-cols-4 gap-2">
          <ScoreRing score={scores.overall} label={t("scoreTotal")} size={96} strokeWidth={7} />
          <ScoreRing score={scores.visibility} label={t("scoreVisibility")} size={96} strokeWidth={7} />
          <ScoreRing score={scores.credibility} label={t("scoreCredibility")} size={96} strokeWidth={7} />
          <ScoreRing score={scores.positioning} label={t("scorePositioning")} size={96} strokeWidth={7} />
        </div>
      </div>

      {/* Gap analysis */}
      {totalGaps > 0 && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center gap-2 mb-5">
            <AlertCircle className="w-4 h-4 text-amber-500" />
            <p className="text-xs font-semibold text-slate-700 uppercase tracking-widest">{t("gapSection")}</p>
            <span className="ml-auto text-xs text-slate-400">{totalGaps} {t("gapItems")}</span>
          </div>
          <div className="grid md:grid-cols-2 gap-x-8 gap-y-5">
            {[
              { label: t("gapMissing"), items: gaps.missingElements, dot: "bg-red-400" },
              { label: t("gapContent"), items: gaps.contentGaps, dot: "bg-amber-400" },
              { label: t("gapVisibility"), items: gaps.visibilityIssues, dot: "bg-orange-400" },
              { label: t("gapCredibility"), items: gaps.credibilityIssues, dot: "bg-yellow-500" },
            ].filter(({ items }) => items.length > 0).map(({ label, items, dot }) => (
              <div key={label}>
                <p className="text-xs font-semibold text-slate-500 mb-2">{label}</p>
                <ul className="space-y-1.5">
                  {items.slice(0, 4).map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                      <span className={`w-1.5 h-1.5 rounded-full ${dot} mt-1.5 shrink-0`} />
                      {item}
                    </li>
                  ))}
                  {items.length > 4 && (
                    <li className="text-xs text-slate-400 pl-3.5">+{items.length - 4}{t("gapMore")}</li>
                  )}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* AI suggestions */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">{t("aiSection")}</p>
        <div className="grid md:grid-cols-2 gap-5">
          <div>
            <p className="text-xs text-slate-500 mb-2">{t("suggestedIndustry")}</p>
            <Badge className="bg-blue-50 text-blue-700 border border-blue-200 font-medium">
              {suggestedIndustry}
            </Badge>
          </div>
          <div>
            <p className="text-xs text-slate-500 mb-2">{t("suggestedRoles")}</p>
            <div className="flex flex-wrap gap-2">
              {suggestedTargetRoles.slice(0, 4).map((role) => (
                <Badge key={role} variant="outline" className="text-slate-600 font-normal text-xs">
                  {role}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Module cards */}
      <div>
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-4">{t("modulesSection")}</p>
        <div className="grid md:grid-cols-2 gap-3">
          {moduleCardsBase.map(({ href, icon: Icon, descKey, accent, iconBg }) => (
            <Link key={href} href={href}>
              <div className={`group border rounded-2xl p-5 bg-white hover:shadow-md transition-all duration-200 cursor-pointer ${accent}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${iconBg}`}>
                      <Icon className="w-4.5 h-4.5" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 text-sm">{t(navLabels[href] as Parameters<typeof t>[0])}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{t(descKey)}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
