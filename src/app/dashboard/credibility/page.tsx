"use client";

import { useState } from "react";
import { useApp } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CopyButton } from "@/components/CopyButton";
import { Zap, Award, RefreshCw, AlertTriangle, Users, Plus } from "lucide-react";
import { toast } from "sonner";

export default function CredibilityPage() {
  const { input, credibility, setCredibility, analysis } = useApp();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [expandedCase, setExpandedCase] = useState<number | null>(0);

  if (!analysis) { router.replace("/analyze"); return null; }

  async function generate() {
    if (!input) return;
    setLoading(true);
    try {
      const res = await fetch("/api/credibility", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      if (!res.ok) throw new Error();
      setCredibility(await res.json());
      toast.success("Credibility 分析完成！");
    } catch {
      toast.error("生成失敗，請重試");
    } finally {
      setLoading(false);
    }
  }

  function formatCaseStudy(cs: NonNullable<typeof credibility>["caseStudies"][0]) {
    return `【${cs.title}】\n\n背景：${cs.background}\n\n問題：${cs.problem}\n\n解法：${cs.solution}\n\n流程：${cs.process}\n\n結果：${cs.results}\n\n關鍵數據：${cs.metrics.join("、")}`;
  }

  if (!credibility) {
    return (
      <div className="p-8 max-w-3xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-lg bg-violet-100 flex items-center justify-center">
            <Award className="w-5 h-5 text-violet-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Credibility Engine</h1>
            <p className="text-slate-500 text-sm">將你的專案轉化為顧問等級案例研究</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center space-y-4">
          <p className="text-slate-600">AI 將從你的工作經歷中提取 2-3 個案例，重新框架為高說服力的案例研究，並分析你缺少的信任證據。</p>
          <Button onClick={generate} disabled={loading} className="bg-violet-600 hover:bg-violet-700 text-white h-11 px-8">
            {loading ? (
              <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />分析中...</>
            ) : (
              <><Zap className="w-4 h-4 mr-2" />生成 Credibility 分析</>
            )}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-5xl space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-violet-100 flex items-center justify-center">
            <Award className="w-5 h-5 text-violet-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Credibility Engine</h1>
            <p className="text-slate-500 text-sm">{credibility.caseStudies.length} 個案例研究已生成</p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={generate} disabled={loading} className="gap-2">
          <RefreshCw className="w-3.5 h-3.5" />重新生成
        </Button>
      </div>

      {/* Case Studies */}
      <div className="space-y-4">
        <h2 className="text-sm font-semibold text-slate-700 uppercase tracking-wide">案例研究</h2>
        {credibility.caseStudies.map((cs, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            <button
              className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors"
              onClick={() => setExpandedCase(expandedCase === i ? null : i)}
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-violet-100 text-violet-700 flex items-center justify-center text-xs font-bold shrink-0">
                  {i + 1}
                </div>
                <p className="font-semibold text-slate-800">{cs.title}</p>
              </div>
              <div className="flex items-center gap-3">
                <CopyButton text={formatCaseStudy(cs)} />
                <span className="text-slate-400 text-sm">{expandedCase === i ? "▲" : "▼"}</span>
              </div>
            </button>

            {expandedCase === i && (
              <div className="border-t border-slate-100 p-5 space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  {[
                    { label: "背景", value: cs.background, icon: "📋" },
                    { label: "問題", value: cs.problem, icon: "⚠️" },
                    { label: "解法", value: cs.solution, icon: "💡" },
                    { label: "流程", value: cs.process, icon: "⚙️" },
                  ].map(({ label, value, icon }) => (
                    <div key={label} className="bg-slate-50 rounded-lg p-4">
                      <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">{icon} {label}</p>
                      <p className="text-sm text-slate-700 leading-relaxed">{value}</p>
                    </div>
                  ))}
                </div>

                <div className="bg-violet-50 border border-violet-200 rounded-lg p-4">
                  <p className="text-xs font-semibold text-violet-700 uppercase tracking-wide mb-2">📈 結果</p>
                  <p className="text-sm text-slate-800 font-medium leading-relaxed">{cs.results}</p>
                </div>

                {cs.metrics.length > 0 && (
                  <div>
                    <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">關鍵指標</p>
                    <div className="flex flex-wrap gap-2">
                      {cs.metrics.map((m, mi) => (
                        <Badge key={mi} className="bg-violet-100 text-violet-700 border-violet-200">
                          {m}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Missing Evidence */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-amber-200 p-5 space-y-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-500" />
            <h3 className="font-semibold text-slate-800 text-sm">缺少的證據</h3>
          </div>
          <ul className="space-y-2">
            {credibility.missingEvidence.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl border border-blue-200 p-5 space-y-3">
          <div className="flex items-center gap-2">
            <Plus className="w-4 h-4 text-blue-500" />
            <h3 className="font-semibold text-slate-800 text-sm">應該補強的內容</h3>
          </div>
          <ul className="space-y-2">
            {credibility.contentToAdd.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white rounded-xl border border-emerald-200 p-5 space-y-3">
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-500" />
            <h3 className="font-semibold text-slate-800 text-sm">建議建立的人脈</h3>
          </div>
          <ul className="space-y-2">
            {credibility.suggestedConnections.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
