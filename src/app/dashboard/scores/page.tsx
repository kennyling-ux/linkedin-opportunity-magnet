"use client";

import { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Zap, TrendingUp, RefreshCw, Target, Briefcase, BookOpen, Users, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { useLanguage } from "@/context/LanguageContext";
import { useIsPro, ProGate } from "@/components/PaywallGate";

function ScoreArc({ score, label, color, size = 96 }: { score: number; label: string; color: string; size?: number }) {
  const r = size * 0.38;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - score / 100);
  const cx = size / 2;
  const cy = size / 2;
  return (
    <div className="flex flex-col items-center gap-2">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#1e293b" strokeWidth={size * 0.075} />
        <circle
          cx={cx} cy={cy} r={r} fill="none" stroke={color} strokeWidth={size * 0.075}
          strokeDasharray={circ} strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1s ease" }}
        />
      </svg>
      <div className="text-center -mt-1" style={{ marginTop: `-${size * 0.6}px`, marginBottom: `${size * 0.52}px` }}>
        <p className="font-bold text-slate-900 leading-none" style={{ fontSize: size * 0.22 }}>{score}</p>
      </div>
      <p className="text-xs font-medium text-slate-500 text-center leading-tight">{label}</p>
    </div>
  );
}

export default function ScoresPage() {
  const { input, analysis, positioning, setPositioning } = useApp();
  const router = useRouter();
  const { t, tArr } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [openTips, setOpenTips] = useState<string | null>(null);
  const isPro = useIsPro();

  useEffect(() => { if (!analysis) router.replace("/analyze"); }, [analysis, router]);
  if (isPro === null || !analysis) return null;
  if (!isPro) return <ProGate feature={t("scoresTitle")} desc={t("proGateScoresDesc")} />;

  const { scores, suggestedTargetRoles } = analysis;

  const scoreDimensions = [
    {
      key: "visibility" as const,
      icon: "🔍",
      label: t("visibilityLabel"),
      desc: t("visibilityDesc"),
      tips: tArr("visTips"),
      color: "#3b82f6",
      bg: "bg-blue-50 border-blue-200",
      badge: "bg-blue-100 text-blue-700",
    },
    {
      key: "credibility" as const,
      icon: "🏆",
      label: t("credibilityLabel"),
      desc: t("credibilityDesc"),
      tips: tArr("credTips"),
      color: "#6366f1",
      bg: "bg-indigo-50 border-indigo-200",
      badge: "bg-indigo-100 text-indigo-700",
    },
    {
      key: "positioning" as const,
      icon: "🎯",
      label: t("positioningLabel"),
      desc: t("positioningDesc"),
      tips: tArr("posTips"),
      color: "#8b5cf6",
      bg: "bg-violet-50 border-violet-200",
      badge: "bg-violet-100 text-violet-700",
    },
  ];

  const getScoreLabel = (score: number) =>
    score >= 75 ? t("gradeGood") : score >= 50 ? t("gradeImprove") : t("gradeWeak");

  async function generatePositioning() {
    if (!input) return;
    setLoading(true);
    try {
      const res = await fetch("/api/positioning", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      if (!res.ok) throw new Error();
      setPositioning(await res.json());
      toast.success(t("successPos"));
    } catch {
      toast.error(t("errGenFail"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 max-w-5xl space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-sky-100 flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-sky-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{t("scoresTitle")}</h1>
          <p className="text-slate-500 text-sm">{t("scoresSub")}</p>
        </div>
      </div>

      {/* Score rings — visual row */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {/* Overall */}
          <div className="flex flex-col items-center gap-2 md:border-r border-slate-100 pr-0 md:pr-4">
            <svg width={112} height={112} className="-rotate-90">
              <circle cx={56} cy={56} r={44} fill="none" stroke="#1e293b" strokeWidth={8} />
              <circle
                cx={56} cy={56} r={44} fill="none"
                stroke={scores.overall >= 75 ? "#0ea5e9" : scores.overall >= 50 ? "#f59e0b" : "#ef4444"}
                strokeWidth={8}
                strokeDasharray={2 * Math.PI * 44}
                strokeDashoffset={2 * Math.PI * 44 * (1 - scores.overall / 100)}
                strokeLinecap="round"
                style={{ transition: "stroke-dashoffset 1s ease" }}
              />
            </svg>
            <div className="text-center" style={{ marginTop: -70, marginBottom: 54 }}>
              <p className="text-2xl font-bold text-slate-900 leading-none">{scores.overall}</p>
            </div>
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{t("scoreTotal")}</p>
            <div className="flex flex-col gap-1 items-center">
              <Badge className={
                scores.overall >= 75 ? "bg-sky-100 text-sky-700" :
                scores.overall >= 50 ? "bg-amber-100 text-amber-700" :
                "bg-red-100 text-red-600"
              }>{getScoreLabel(scores.overall)}</Badge>
              {suggestedTargetRoles[0] && (
                <span className="text-[10px] text-slate-400 text-center leading-tight mt-1">{suggestedTargetRoles[0]}</span>
              )}
            </div>
          </div>

          {/* Dimension rings */}
          {scoreDimensions.map((dim) => {
            const score = scores[dim.key];
            return (
              <div key={dim.key} className="flex flex-col items-center gap-2">
                <svg width={96} height={96} className="-rotate-90">
                  <circle cx={48} cy={48} r={36} fill="none" stroke="#1e293b" strokeWidth={7} />
                  <circle
                    cx={48} cy={48} r={36} fill="none" stroke={dim.color} strokeWidth={7}
                    strokeDasharray={2 * Math.PI * 36}
                    strokeDashoffset={2 * Math.PI * 36 * (1 - score / 100)}
                    strokeLinecap="round"
                    style={{ transition: "stroke-dashoffset 1s ease" }}
                  />
                </svg>
                <div className="text-center" style={{ marginTop: -60, marginBottom: 46 }}>
                  <p className="text-xl font-bold text-slate-900 leading-none">{score}</p>
                </div>
                <p className="text-xs font-medium text-slate-500 text-center">{dim.icon} {dim.label.split("（")[0].split("(")[0].trim()}</p>
                <Badge className={dim.badge}>{getScoreLabel(score)}</Badge>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dimension cards — compact with collapsible tips */}
      <div className="space-y-3">
        <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{t("detailedScores")}</h2>
        {scoreDimensions.map((dim) => {
          const score = scores[dim.key];
          const isOpen = openTips === dim.key;
          return (
            <div key={dim.key} className={`bg-white rounded-xl border ${isOpen ? "border-slate-300" : "border-slate-200"} overflow-hidden transition-all duration-200`}>
              <div className="flex items-center gap-4 p-4">
                <span className="text-2xl shrink-0">{dim.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-slate-800 text-sm truncate">{dim.label.split("（")[0].split("(")[0].trim()}</h3>
                    <Badge className={`shrink-0 ${dim.badge}`}>{getScoreLabel(score)}</Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ width: `${score}%`, backgroundColor: dim.color }}
                      />
                    </div>
                    <span className="text-xs text-slate-400 shrink-0">{score}/100</span>
                  </div>
                </div>
                <button
                  onClick={() => setOpenTips(isOpen ? null : dim.key)}
                  className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-600 shrink-0 transition-colors"
                >
                  {t("improvement")}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                </button>
              </div>

              {isOpen && (
                <div className={`border-t border-slate-100 px-4 py-4 ${dim.bg.split(" ")[0]}`}>
                  <p className="text-xs text-slate-500 mb-2 leading-relaxed">{dim.desc}</p>
                  <ul className="space-y-1.5">
                    {dim.tips.map((tip, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                        <span className="w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: dim.color }} />
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* AI Positioning */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{t("aiPositioning")}</h2>
          {positioning && (
            <Button variant="outline" size="sm" onClick={generatePositioning} disabled={loading} className="gap-2">
              <RefreshCw className="w-3.5 h-3.5" />{t("regenerate")}
            </Button>
          )}
        </div>

        {!positioning ? (
          <div className="bg-white rounded-xl border border-slate-200 p-8 text-center space-y-4">
            <p className="text-slate-600 text-sm">{t("posGenDesc")}</p>
            <Button onClick={generatePositioning} disabled={loading} className="bg-sky-600 hover:bg-sky-700 active:scale-[0.97] text-white h-11 px-8 transition-all duration-150 hover:scale-[1.02]">
              {loading ? (
                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />{t("generating")}</>
              ) : (
                <><Zap className="w-4 h-4 mr-2" />{t("posGenBtn")}</>
              )}
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {/* Career Directions */}
            <div className="md:col-span-2 bg-white rounded-xl border border-slate-200 p-5 space-y-4">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-sky-500" />
                <h3 className="font-semibold text-slate-800">{t("careerDirections")}</h3>
              </div>
              <div className="grid md:grid-cols-3 gap-3">
                {positioning.topCareerDirections.map((dir, i) => (
                  <div key={i} className="border border-sky-200 rounded-lg p-4 bg-sky-50">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="w-6 h-6 rounded-full bg-sky-600 text-white text-xs flex items-center justify-center font-bold shrink-0">
                        {i + 1}
                      </span>
                      <p className="font-semibold text-slate-800 text-sm">{dir.title}</p>
                    </div>
                    <p className="text-xs text-slate-600 leading-relaxed">{dir.rationale}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Target Markets */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
              <div className="flex items-center gap-2">
                <Target className="w-4 h-4 text-sky-500" />
                <h3 className="font-semibold text-slate-800">{t("targetMarkets")}</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {positioning.targetMarkets.map((m, i) => (
                  <Badge key={i} variant="outline" className="text-slate-700">{m}</Badge>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-sky-500" />
                <h3 className="font-semibold text-slate-800">{t("skillsToStrengthen")}</h3>
              </div>
              <ul className="space-y-2">
                {positioning.skillsToStrengthen.map((s, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0" />
                    {s}
                  </li>
                ))}
              </ul>
            </div>

            {/* Content Directions */}
            <div className="md:col-span-2 bg-white rounded-xl border border-slate-200 p-5 space-y-3">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-sky-500" />
                <h3 className="font-semibold text-slate-800">{t("contentDirections")}</h3>
              </div>
              <div className="grid md:grid-cols-2 gap-2">
                {positioning.contentDirections.map((dir, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-slate-700 bg-slate-50 rounded-lg p-3">
                    <span className="w-5 h-5 rounded-full bg-sky-100 text-sky-700 text-xs flex items-center justify-center font-bold shrink-0">
                      {i + 1}
                    </span>
                    {dir}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
