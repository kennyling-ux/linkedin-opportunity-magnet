"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApp } from "@/context/AppContext";
import { Zap, ArrowRight, Info } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";

export default function AnalyzePage() {
  const router = useRouter();
  const { setInput, setAnalysis, setIsAnalyzing } = useApp();
  const [rawContent, setRawContent] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const [industry, setIndustry] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!rawContent.trim()) {
      toast.error("請貼上你的 LinkedIn 個人頁面內容");
      return;
    }
    if (rawContent.trim().length < 100) {
      toast.error("內容太短，請貼上更完整的個人頁面資訊");
      return;
    }

    setLoading(true);
    setIsAnalyzing(true);

    const input = { rawContent, profileUrl, industry, targetRole };
    setInput(input);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });

      if (!res.ok) throw new Error("Analysis failed");
      const data = await res.json();
      setAnalysis(data);
      toast.success("分析完成！");
      router.push("/dashboard");
    } catch {
      toast.error("分析失敗，請確認 API 金鑰設定並重試");
    } finally {
      setLoading(false);
      setIsAnalyzing(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="border-b border-slate-200 bg-white px-6 h-14 flex items-center gap-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-slate-900 text-sm">Opportunity Magnet</span>
        </Link>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full px-6 py-12">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">分析你的 LinkedIn</h1>
          <p className="text-slate-500">貼上個人頁面內容，AI 將在 30 秒內給出完整評分與優化建議。</p>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3 mb-8 text-sm text-blue-700">
          <Info className="w-4 h-4 mt-0.5 shrink-0" />
          <p>請從 LinkedIn 個人頁面手動複製內容貼上（包含 About、Experience、技能等區塊）。本系統不會自動爬取任何資料。</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="content" className="text-sm font-medium text-slate-700">
              LinkedIn 個人頁面內容 <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="content"
              placeholder="貼上你的 LinkedIn About、工作經歷、技能、推薦等內容..."
              value={rawContent}
              onChange={(e) => setRawContent(e.target.value)}
              className="min-h-52 text-sm resize-none"
              disabled={loading}
            />
            <p className="text-xs text-slate-400">{rawContent.length} 字元 · 建議貼上至少 300 字元</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="url" className="text-sm font-medium text-slate-700">
              LinkedIn 個人頁面連結 <span className="text-slate-400 font-normal">（選填）</span>
            </Label>
            <Input
              id="url"
              type="url"
              placeholder="https://www.linkedin.com/in/yourprofile"
              value={profileUrl}
              onChange={(e) => setProfileUrl(e.target.value)}
              disabled={loading}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="industry" className="text-sm font-medium text-slate-700">
                所屬產業 <span className="text-slate-400 font-normal">（選填，AI 可建議）</span>
              </Label>
              <Input
                id="industry"
                placeholder="例：SaaS、金融科技、顧問"
                value={industry}
                onChange={(e) => setIndustry(e.target.value)}
                disabled={loading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="target" className="text-sm font-medium text-slate-700">
                目標職位或受眾 <span className="text-slate-400 font-normal">（選填）</span>
              </Label>
              <Input
                id="target"
                placeholder="例：CTO、新創創辦人、B2B 客戶"
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                disabled={loading}
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={loading || !rawContent.trim()}
            className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium text-base"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                AI 分析中...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                開始分析
                <ArrowRight className="w-4 h-4" />
              </span>
            )}
          </Button>
        </form>
      </main>
    </div>
  );
}
