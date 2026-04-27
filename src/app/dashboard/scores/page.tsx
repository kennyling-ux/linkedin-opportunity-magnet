"use client";

import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScoreRing } from "@/components/ScoreRing";
import { Zap, TrendingUp, RefreshCw, Target, Briefcase, BookOpen, Users } from "lucide-react";
import { toast } from "sonner";

const scoreDescriptions = {
  visibility: {
    icon: "🔍",
    label: "曝光度（Visibility）",
    desc: "衡量你的 LinkedIn 在搜尋中被找到的機率。包含關鍵字密度、個人頁面完整度與 Headline 強度。",
    tips: [
      "在 Headline 和 About 中加入目標職位的核心關鍵字",
      "完成所有個人頁面區塊（技能、推薦、作品集）",
      "自訂 LinkedIn 個人頁面 URL",
    ],
  },
  credibility: {
    icon: "🏆",
    label: "可信度（Credibility）",
    desc: "衡量訪客對你能力的信任程度。包含量化成就、社交認證與案例研究。",
    tips: [
      "為每段工作經歷加入具體數字（%、金額、人數）",
      "向前同事或客戶索取推薦信",
      "新增作品集連結或案例研究文章",
    ],
  },
  positioning: {
    icon: "🎯",
    label: "定位清晰度（Positioning）",
    desc: "衡量你的獨特價值主張是否清晰。訪客在 10 秒內是否能理解你是誰、能幫誰解決什麼問題。",
    tips: [
      "在 Headline 中明確說明你服務的對象與成果",
      "在 About 開頭直接說明你的核心定位",
      "選擇一個主要的利基方向，避免過度分散",
    ],
  },
};

export default function ScoresPage() {
  const { input, analysis, positioning, setPositioning } = useApp();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  if (!analysis) { router.replace("/analyze"); return null; }

  const { scores, suggestedTargetRoles } = analysis;

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
      toast.success("定位分析完成！");
    } catch {
      toast.error("生成失敗，請重試");
    } finally {
      setLoading(false);
    }
  }

  const getScoreColor = (score: number) =>
    score >= 75 ? "text-blue-600" : score >= 50 ? "text-amber-600" : "text-red-500";
  const getScoreLabel = (score: number) =>
    score >= 75 ? "良好" : score >= 50 ? "待改善" : "需加強";
  const getScoreBadgeColor = (score: number) =>
    score >= 75 ? "bg-blue-100 text-blue-700" : score >= 50 ? "bg-amber-100 text-amber-700" : "bg-red-100 text-red-600";

  return (
    <div className="p-8 max-w-5xl space-y-8">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-sky-100 flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-sky-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Scores & Positioning</h1>
          <p className="text-slate-500 text-sm">詳細評分解析 + AI 職涯定位建議</p>
        </div>
      </div>

      {/* Overall Score */}
      <div className="bg-white rounded-xl border border-slate-200 p-6">
        <div className="flex items-center gap-8">
          <ScoreRing score={scores.overall} label="總分" size={112} strokeWidth={8} />
          <div className="flex-1">
            <h2 className="font-bold text-slate-900 text-lg mb-1">整體 LinkedIn 健康度</h2>
            <p className="text-slate-500 text-sm mb-4">
              基於曝光度（30%）、可信度（35%）、定位清晰度（35%）加權計算
            </p>
            <div className="flex gap-3">
              <Badge className={getScoreBadgeColor(scores.overall)}>{getScoreLabel(scores.overall)}</Badge>
              <Badge variant="outline" className="text-slate-600">目標建議職位：{suggestedTargetRoles[0]}</Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Scores */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">詳細評分</h2>
        {(["visibility", "credibility", "positioning"] as const).map((key) => {
          const score = scores[key];
          const cfg = scoreDescriptions[key];
          return (
            <div key={key} className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{cfg.icon}</span>
                    <h3 className="font-semibold text-slate-800">{cfg.label}</h3>
                    <Badge className={`ml-auto ${getScoreBadgeColor(score)}`}>{getScoreLabel(score)}</Badge>
                  </div>
                  <p className="text-sm text-slate-500 leading-relaxed">{cfg.desc}</p>
                </div>
                <div className={`text-3xl font-bold shrink-0 ${getScoreColor(score)}`}>{score}</div>
              </div>
              <Progress value={score} className="h-2" />
              <div className="space-y-2">
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">改善建議</p>
                <ul className="space-y-1.5">
                  {cfg.tips.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400 mt-1.5 shrink-0" />
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      {/* AI Positioning */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">AI 定位建議</h2>
          {positioning && (
            <Button variant="outline" size="sm" onClick={generatePositioning} disabled={loading} className="gap-2">
              <RefreshCw className="w-3.5 h-3.5" />重新分析
            </Button>
          )}
        </div>

        {!positioning ? (
          <div className="bg-white rounded-xl border border-slate-200 p-8 text-center space-y-4">
            <p className="text-slate-600 text-sm">AI 將根據你的完整背景，建議最適合的職涯方向、目標市場與內容策略。</p>
            <Button onClick={generatePositioning} disabled={loading} className="bg-sky-600 hover:bg-sky-700 text-white h-11 px-8">
              {loading ? (
                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />分析中...</>
              ) : (
                <><Zap className="w-4 h-4 mr-2" />生成 AI 定位建議</>
              )}
            </Button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">
            {/* Career Directions */}
            <div className="md:col-span-2 bg-white rounded-xl border border-slate-200 p-5 space-y-4">
              <div className="flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-sky-500" />
                <h3 className="font-semibold text-slate-800">最適合的 3 個職涯方向</h3>
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
                <h3 className="font-semibold text-slate-800">建議主打市場與受眾</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {positioning.targetMarkets.map((m, i) => (
                  <Badge key={i} variant="outline" className="text-slate-700">
                    {m}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-sky-500" />
                <h3 className="font-semibold text-slate-800">建議強化的技能</h3>
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
                <h3 className="font-semibold text-slate-800">建議的內容方向</h3>
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
