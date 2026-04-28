"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useApp } from "@/context/AppContext";
import { Zap, ArrowRight, Lock, Clock, Sparkles } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export default function AnalyzePage() {
  const router = useRouter();
  const { setInput, setAnalysis, setIsAnalyzing } = useApp();
  const { t } = useLanguage();
  const [rawContent, setRawContent] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const [industry, setIndustry] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!rawContent.trim()) {
      toast.error(t("errEmpty"));
      return;
    }
    if (rawContent.trim().length < 100) {
      toast.error(t("errTooShort"));
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
      toast.success(t("successAnalysis"));
      router.push("/dashboard");
    } catch {
      toast.error(t("errFail"));
    } finally {
      setLoading(false);
      setIsAnalyzing(false);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Nav */}
      <header className="border-b border-slate-800 px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-white text-sm">{t("brand")}</span>
        </Link>
        <LanguageSwitcher variant="dark" />
      </header>

      <main className="flex-1 flex items-start justify-center py-12 px-6">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-5">
              <Sparkles className="w-3.5 h-3.5" />
              {t("tagline")}
            </div>
            <h1 className="text-3xl font-bold text-white mb-3 tracking-tight">{t("analyzeTitle")}</h1>
            <p className="text-slate-400 text-base">{t("analyzeSub")}</p>
          </div>

          {/* Trust bar */}
          <div className="flex items-center gap-5 mb-8 text-xs text-slate-500">
            <span className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5" />{t("trustNoStore")}</span>
            <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{t("trust30s")}</span>
            <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5" />{t("trustFree")}</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Main textarea */}
            <div className="space-y-2">
              <Label htmlFor="content" className="text-sm font-medium text-slate-300">
                {t("contentLabel")} <span className="text-blue-400">*</span>
              </Label>
              <div className="relative">
                <Textarea
                  id="content"
                  placeholder={t("contentPlaceholder")}
                  value={rawContent}
                  onChange={(e) => setRawContent(e.target.value)}
                  className="min-h-52 text-sm resize-none bg-slate-900 border-slate-700 text-slate-100 placeholder:text-slate-600 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                  disabled={loading}
                />
              </div>
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-600">{t("contentHint")}</p>
                <span className={`text-xs tabular-nums ${rawContent.length < 100 ? "text-slate-600" : "text-blue-500"}`}>
                  {rawContent.length}
                </span>
              </div>
            </div>

            {/* Optional fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="industry" className="text-xs font-medium text-slate-400">
                  {t("industryLabel")} <span className="text-slate-600">({t("industryOptional")})</span>
                </Label>
                <Input
                  id="industry"
                  placeholder={t("industryPlaceholder")}
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  className="bg-slate-900 border-slate-700 text-slate-200 placeholder:text-slate-600 focus:border-blue-500 text-sm h-9 rounded-lg"
                  disabled={loading}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="target" className="text-xs font-medium text-slate-400">
                  {t("targetLabel")} <span className="text-slate-600">({t("industryOptional")})</span>
                </Label>
                <Input
                  id="target"
                  placeholder={t("targetPlaceholder")}
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                  className="bg-slate-900 border-slate-700 text-slate-200 placeholder:text-slate-600 focus:border-blue-500 text-sm h-9 rounded-lg"
                  disabled={loading}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="url" className="text-xs font-medium text-slate-400">
                {t("urlLabel")} <span className="text-slate-600">({t("industryOptional")})</span>
              </Label>
              <Input
                id="url"
                type="url"
                placeholder={t("urlPlaceholder")}
                value={profileUrl}
                onChange={(e) => setProfileUrl(e.target.value)}
                className="bg-slate-900 border-slate-700 text-slate-200 placeholder:text-slate-600 focus:border-blue-500 text-sm h-9 rounded-lg"
                disabled={loading}
              />
            </div>

            {/* Submit */}
            <div className="pt-2">
              <Button
                type="submit"
                disabled={loading || rawContent.trim().length < 100}
                className="w-full h-12 bg-blue-500 hover:bg-blue-400 disabled:bg-slate-800 disabled:text-slate-600 text-white border-0 shadow-xl shadow-blue-500/20 font-semibold text-sm rounded-xl transition-all"
              >
                {loading ? (
                  <span className="flex items-center gap-2.5">
                    <span className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    {t("analyzing")}
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    {t("submitBtn")}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </Button>
              {rawContent.trim().length > 0 && rawContent.trim().length < 100 && (
                <p className="text-center text-xs text-amber-500/70 mt-2">
                  {t("tooShort")} {100 - rawContent.trim().length} {t("tooShortSuffix")}
                </p>
              )}
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
