"use client";

import { useApp } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { ScoreRing } from "@/components/ScoreRing";
import { OpportunityMeter } from "@/components/OpportunityMeter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, User, FileText, Award, TrendingUp, AlertCircle, CheckCircle2 } from "lucide-react";

const moduleCards = [
  {
    href: "/dashboard/profile",
    icon: User,
    title: "Profile Engine",
    desc: "Headline 優化、About 重寫、Experience 強化",
    color: "blue",
  },
  {
    href: "/dashboard/content",
    icon: FileText,
    title: "Content Engine",
    desc: "30 個貼文主題 + 完整貼文生成",
    color: "indigo",
  },
  {
    href: "/dashboard/credibility",
    icon: Award,
    title: "Credibility Engine",
    desc: "案例研究、信任證據缺口分析",
    color: "violet",
  },
  {
    href: "/dashboard/scores",
    icon: TrendingUp,
    title: "Scores & Positioning",
    desc: "詳細評分 + 職涯方向建議",
    color: "sky",
  },
];

const colorMap: Record<string, string> = {
  blue: "bg-blue-50 text-blue-600 border-blue-200 hover:border-blue-400",
  indigo: "bg-indigo-50 text-indigo-600 border-indigo-200 hover:border-indigo-400",
  violet: "bg-violet-50 text-violet-600 border-violet-200 hover:border-violet-400",
  sky: "bg-sky-50 text-sky-600 border-sky-200 hover:border-sky-400",
};
const iconBgMap: Record<string, string> = {
  blue: "bg-blue-100",
  indigo: "bg-indigo-100",
  violet: "bg-violet-100",
  sky: "bg-sky-100",
};

export default function DashboardPage() {
  const { analysis, input } = useApp();
  const router = useRouter();

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

  return (
    <div className="p-8 space-y-8 max-w-5xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900 mb-1">Dashboard</h1>
        <p className="text-slate-500 text-sm">
          {input?.industry || suggestedIndustry} · 目標：{input?.targetRole || suggestedTargetRoles[0]}
        </p>
      </div>

      {/* Opportunity Meter */}
      <OpportunityMeter
        level={scores.opportunityLevel}
        reason={scores.opportunityReason}
        improvements={scores.opportunityImprovements}
      />

      {/* Score Rings */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-sm font-semibold text-slate-700 mb-6 uppercase tracking-wide">綜合評分</h2>
        <div className="grid grid-cols-4 gap-4">
          <ScoreRing score={scores.overall} label="總分" size={96} />
          <ScoreRing score={scores.visibility} label="曝光度" size={96} />
          <ScoreRing score={scores.credibility} label="可信度" size={96} />
          <ScoreRing score={scores.positioning} label="定位清晰度" size={96} />
        </div>
      </div>

      {/* Gap Analysis */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-sm font-semibold text-slate-700 mb-4 uppercase tracking-wide flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-amber-500" />
          缺口分析
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { label: "缺少的關鍵元素", items: gaps.missingElements, icon: "⚠️" },
            { label: "內容策略缺口", items: gaps.contentGaps, icon: "📝" },
            { label: "曝光度問題", items: gaps.visibilityIssues, icon: "🔍" },
            { label: "可信度問題", items: gaps.credibilityIssues, icon: "🏆" },
          ].map(({ label, items, icon }) =>
            items.length > 0 ? (
              <div key={label}>
                <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wide">
                  {icon} {label}
                </p>
                <ul className="space-y-1.5">
                  {items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null
          )}
        </div>
      </div>

      {/* AI Suggestions */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <h2 className="text-sm font-semibold text-slate-700 mb-4 uppercase tracking-wide flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-blue-500" />
          AI 建議定位
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <p className="text-xs font-medium text-slate-500 mb-2">建議產業</p>
            <Badge variant="secondary" className="bg-blue-50 text-blue-700 border-blue-200">
              {suggestedIndustry}
            </Badge>
          </div>
          <div>
            <p className="text-xs font-medium text-slate-500 mb-2">建議目標職位 / 受眾</p>
            <div className="flex flex-wrap gap-2">
              {suggestedTargetRoles.map((role) => (
                <Badge key={role} variant="outline" className="text-slate-700">
                  {role}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Module Cards */}
      <div>
        <h2 className="text-sm font-semibold text-slate-700 mb-4 uppercase tracking-wide">優化模組</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {moduleCards.map(({ href, icon: Icon, title, desc, color }) => (
            <Link key={href} href={href}>
              <div className={`border rounded-xl p-5 bg-white hover:shadow-sm transition-all cursor-pointer group ${colorMap[color]}`}>
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center mb-3 ${iconBgMap[color]}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-slate-900 mb-1">{title}</p>
                    <p className="text-xs text-slate-500">{desc}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-colors" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
