"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useApp } from "@/context/AppContext";
import { Zap, ArrowRight, Lock, Clock, Sparkles, Download, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

const INDUSTRIES = [
  "SaaS / Software", "FinTech", "Consulting", "Marketing / Advertising",
  "Healthcare", "Education", "E-commerce / Retail", "Finance / Banking",
  "Real Estate", "Manufacturing", "Media / Entertainment", "Legal",
  "HR / Recruitment", "Design / Creative", "Non-profit", "Other",
];

const TARGET_ROLES = [
  "Hiring Manager / Recruiter", "CTO / Technical Leader", "CEO / Founder",
  "Product Manager", "Software Engineer", "Data Scientist",
  "Marketing Manager", "Sales Leader", "B2B Clients",
  "Investors / VCs", "Freelance Clients", "Career Changers", "Other",
];

export default function AnalyzePage() {
  const router = useRouter();
  const { setInput, setAnalysis, setIsAnalyzing } = useApp();
  const { t } = useLanguage();
  const [rawContent, setRawContent] = useState("");
  const [profileUrl, setProfileUrl] = useState("");
  const [industry, setIndustry] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [fetched, setFetched] = useState(false);

  async function handleFetch() {
    if (!profileUrl.trim()) return;
    setFetching(true);
    setFetched(false);
    try {
      const res = await fetch("/api/fetch-profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: profileUrl.trim() }),
      });

      if (res.status === 403 || res.status === 404) {
        const data = await res.json() as { error: string };
        toast.error(res.status === 404 ? t("fetchErrNotFound") : t("fetchErrPrivate"));
        console.error(data.error);
        return;
      }
      if (!res.ok) throw new Error();

      const data = await res.json() as { rawContent: string; name: string; headline: string };
      setRawContent(data.rawContent);
      setFetched(true);
      toast.success(t("fetchSuccess"));
    } catch {
      toast.error(t("fetchErrGeneral"));
    } finally {
      setFetching(false);
    }
  }

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
            {/* URL field + fetch button */}
            <div className="space-y-2">
              <Label htmlFor="url" className="text-sm font-medium text-slate-300">
                {t("urlLabel")} <span className="text-blue-400">*</span>
              </Label>
              <div className="flex gap-2">
                <Input
                  id="url"
                  type="url"
                  placeholder={t("urlPlaceholder")}
                  value={profileUrl}
                  onChange={(e) => { setProfileUrl(e.target.value); setFetched(false); }}
                  className="flex-1 bg-slate-900 border-slate-700 text-slate-200 placeholder:text-slate-600 focus:border-blue-500 text-sm h-10 rounded-lg"
                  disabled={loading || fetching}
                />
                <Button
                  type="button"
                  onClick={handleFetch}
                  disabled={!profileUrl.trim() || fetching || loading}
                  className="h-10 px-4 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 text-white border-0 text-sm font-medium rounded-lg shrink-0 transition-all"
                >
                  {fetching ? (
                    <span className="flex items-center gap-2">
                      <span className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      {t("fetching")}
                    </span>
                  ) : fetched ? (
                    <span className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {t("fetchedBadge")}
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Download className="w-3.5 h-3.5" />
                      {t("fetchBtn")}
                    </span>
                  )}
                </Button>
              </div>
            </div>

            {/* Profile content textarea */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="content" className="text-sm font-medium text-slate-300">
                  {t("contentLabel")} <span className="text-blue-400">*</span>
                </Label>
                {fetched && (
                  <span className="flex items-center gap-1.5 text-xs text-emerald-400">
                    <CheckCircle2 className="w-3 h-3" />
                    {t("fetchedBadge")}
                  </span>
                )}
              </div>
              <Textarea
                id="content"
                placeholder={t("contentPlaceholder")}
                value={rawContent}
                onChange={(e) => setRawContent(e.target.value)}
                className="min-h-52 text-sm resize-none bg-slate-900 border-slate-700 text-slate-100 placeholder:text-slate-600 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl"
                disabled={loading}
              />
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
                <Label className="text-xs font-medium text-slate-400">
                  {t("industryLabel")} <span className="text-slate-600">({t("industryOptional")})</span>
                </Label>
                <Select value={industry} onValueChange={(v) => setIndustry(v ?? "")} disabled={loading}>
                  <SelectTrigger className="w-full bg-slate-900 border-slate-700 text-slate-200 data-[placeholder]:text-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 h-9 text-sm rounded-lg">
                    <SelectValue placeholder={t("industryPlaceholder")} />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-800 shadow-xl z-50 max-h-64 overflow-y-auto">
                    {INDUSTRIES.map((item) => (
                      <SelectItem
                        key={item}
                        value={item}
                        className="text-slate-300 text-sm py-2 px-3 cursor-pointer rounded-md hover:bg-slate-700 hover:text-white focus:bg-blue-600 focus:text-white data-[highlighted]:bg-slate-700 data-[highlighted]:text-white"
                      >
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-medium text-slate-400">
                  {t("targetLabel")} <span className="text-slate-600">({t("industryOptional")})</span>
                </Label>
                <Select value={targetRole} onValueChange={(v) => setTargetRole(v ?? "")} disabled={loading}>
                  <SelectTrigger className="w-full bg-slate-900 border-slate-700 text-slate-200 data-[placeholder]:text-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 h-9 text-sm rounded-lg">
                    <SelectValue placeholder={t("targetPlaceholder")} />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-800 shadow-xl z-50 max-h-64 overflow-y-auto">
                    {TARGET_ROLES.map((item) => (
                      <SelectItem
                        key={item}
                        value={item}
                        className="text-slate-300 text-sm py-2 px-3 cursor-pointer rounded-md hover:bg-slate-700 hover:text-white focus:bg-blue-600 focus:text-white data-[highlighted]:bg-slate-700 data-[highlighted]:text-white"
                      >
                        {item}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
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
