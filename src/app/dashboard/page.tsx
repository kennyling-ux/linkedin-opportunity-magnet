"use client";

import { useApp } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";
import { ScoreRing } from "@/components/ScoreRing";
import { OpportunityMeter } from "@/components/OpportunityMeter";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, User, FileText, Award, TrendingUp, AlertCircle, Sparkles, Plus, Zap } from "lucide-react";

const MODULES = [
  {
    href: "/dashboard/profile",
    icon: User,
    label: "Profile Engine",
    desc: "Headlines, About & Experience rewrites",
    accent: "border-blue-200 hover:border-blue-400",
    iconBg: "bg-blue-50 text-blue-600",
    dot: "bg-blue-500",
  },
  {
    href: "/dashboard/content",
    icon: FileText,
    label: "Content Engine",
    desc: "30 post topics + full post generator",
    accent: "border-indigo-200 hover:border-indigo-400",
    iconBg: "bg-indigo-50 text-indigo-600",
    dot: "bg-indigo-500",
  },
  {
    href: "/dashboard/credibility",
    icon: Award,
    label: "Credibility Engine",
    desc: "AI case studies from your work history",
    accent: "border-violet-200 hover:border-violet-400",
    iconBg: "bg-violet-50 text-violet-600",
    dot: "bg-violet-500",
  },
  {
    href: "/dashboard/scores",
    icon: TrendingUp,
    label: "Scores & Positioning",
    desc: "4-dimension breakdown + career advice",
    accent: "border-sky-200 hover:border-sky-400",
    iconBg: "bg-sky-50 text-sky-600",
    dot: "bg-sky-500",
  },
];

export default function DashboardPage() {
  const { analysis, input } = useApp();
  const router = useRouter();
  const { t } = useLanguage();

  useEffect(() => {
    if (!analysis) router.replace("/analyze");
  }, [analysis, router]);

  if (!analysis) return null;

  const { scores, gaps, suggestedIndustry, suggestedTargetRoles } = analysis;
  const allGaps = [
    ...gaps.missingElements,
    ...gaps.contentGaps,
    ...gaps.visibilityIssues,
    ...gaps.credibilityIssues,
  ];
  const totalGaps = allGaps.length;

  return (
    <div className="flex gap-6 p-7 min-h-full">

      {/* ── Main column ── */}
      <div className="flex-1 min-w-0 space-y-5">

        {/* Page header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{t("dashTitle")}</h1>
            <p className="text-sm text-slate-400 mt-0.5">
              {input?.industry || suggestedIndustry}
              <span className="mx-2 text-slate-300">·</span>
              {t("dashTarget")}{input?.targetRole || suggestedTargetRoles[0]}
            </p>
          </div>
          {totalGaps > 0 && (
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium">
              <AlertCircle className="w-3.5 h-3.5 shrink-0" />
              {totalGaps} {t("dashGaps")}
            </div>
          )}
        </div>

        {/* Opportunity meter */}
        <OpportunityMeter
          level={scores.opportunityLevel}
          reason={scores.opportunityReason}
          improvements={scores.opportunityImprovements}
        />

        {/* Scores row */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-5">{t("scoresSection")}</p>
          <div className="grid grid-cols-4 gap-3">
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
              <p className="text-[11px] font-semibold text-slate-700 uppercase tracking-widest">{t("gapSection")}</p>
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
      </div>

      {/* ── Right panel ── */}
      <div className="w-72 shrink-0 space-y-4">

        {/* Quick actions */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-4">AI Engines</p>
          <div className="space-y-2">
            {MODULES.map(({ href, icon: Icon, label, desc, accent, iconBg, dot }) => (
              <Link
                key={href}
                href={href}
                className={`group flex items-center gap-3 p-3 rounded-xl border bg-white hover:bg-slate-50 transition-all duration-150 ${accent}`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${iconBg}`}>
                  <Icon className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-slate-800 leading-tight">{label}</p>
                  <p className="text-[11px] text-slate-400 leading-tight mt-0.5 truncate">{desc}</p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all shrink-0" />
              </Link>
            ))}
          </div>
        </div>

        {/* AI suggestions */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">{t("aiSection")}</p>
          </div>
          <div className="space-y-4">
            <div>
              <p className="text-xs text-slate-500 mb-2">{t("suggestedIndustry")}</p>
              <Badge className="bg-blue-50 text-blue-700 border border-blue-200 font-medium text-xs">
                {suggestedIndustry}
              </Badge>
            </div>
            <div>
              <p className="text-xs text-slate-500 mb-2">{t("suggestedRoles")}</p>
              <div className="flex flex-wrap gap-1.5">
                {suggestedTargetRoles.slice(0, 4).map((role) => (
                  <Badge key={role} variant="outline" className="text-slate-600 font-normal text-xs">
                    {role}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Re-analyze CTA */}
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl border border-blue-200 p-5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-6 h-6 rounded-md bg-blue-500 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white" />
            </div>
            <p className="text-sm font-semibold text-slate-800">Analyze again</p>
          </div>
          <p className="text-xs text-slate-500 mb-4 leading-relaxed">Updated your profile? Re-run the analysis to track your progress.</p>
          <Link
            href="/analyze"
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-white text-xs font-semibold transition-all duration-150 hover:scale-[1.02] active:scale-[0.98]"
          >
            <Plus className="w-3.5 h-3.5" />
            New Analysis
          </Link>
        </div>
      </div>

    </div>
  );
}
