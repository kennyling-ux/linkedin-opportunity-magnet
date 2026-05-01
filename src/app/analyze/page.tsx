"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { useApp } from "@/context/AppContext";
import { Zap, ArrowRight, Lock, Clock, Sparkles, Download, CheckCircle2, ChevronDown, Check } from "lucide-react";
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

function Dropdown({
  value, onChange, options, placeholder, disabled,
}: {
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
  disabled?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [openUp, setOpenUp] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  function handleOpen() {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setOpenUp(window.innerHeight - rect.bottom < 240);
    }
    setOpen((o) => !o);
  }

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        disabled={disabled}
        onClick={handleOpen}
        className={`w-full flex items-center justify-between gap-2 px-3 h-10 rounded-lg border text-sm transition-all
          ${open ? "border-blue-500 ring-1 ring-blue-500/30" : "border-slate-700 hover:border-slate-600"}
          bg-slate-900 text-left disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <span className={value ? "text-slate-200" : "text-slate-500"}>
          {value || placeholder}
        </span>
        <ChevronDown className={`w-4 h-4 text-slate-500 shrink-0 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className={`absolute z-50 left-0 right-0 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl shadow-black/50 overflow-hidden
          ${openUp ? "bottom-full mb-1" : "top-full mt-1"}`}>
          <div className="max-h-56 overflow-y-auto py-1">
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => { onChange(opt); setOpen(false); }}
                className={`w-full flex items-center justify-between px-3 py-2 text-sm text-left transition-colors
                  ${value === opt
                    ? "bg-blue-600 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"}`}
              >
                {opt}
                {value === opt && <Check className="w-3.5 h-3.5 shrink-0" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

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
        toast.error(res.status === 404 ? t("fetchErrNotFound") : t("fetchErrPrivate"));
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
    if (!rawContent.trim()) { toast.error(t("errEmpty")); return; }
    if (rawContent.trim().length < 100) { toast.error(t("errTooShort")); return; }

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
      if (!res.ok) throw new Error();
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

  const charCount = rawContent.trim().length;
  const isReady = charCount >= 100;

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Nav */}
      <header className="border-b border-slate-800/60 px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-white text-sm">{t("brand")}</span>
        </Link>
        <LanguageSwitcher variant="dark" />
      </header>

      <main className="flex-1 flex items-start justify-center py-14 px-6">
        <div className="w-full max-w-xl">

          {/* Header */}
          <div className="mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-5">
              <Sparkles className="w-3.5 h-3.5" />
              {t("tagline")}
            </div>
            <h1 className="text-4xl font-bold text-white mb-3 tracking-tight leading-tight">
              {t("analyzeTitle")}
            </h1>
            <p className="text-slate-400 text-base leading-relaxed">{t("analyzeSub")}</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">

            {/* Step 1 — URL */}
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-bold flex items-center justify-center shrink-0">1</span>
                <span className="text-sm font-semibold text-slate-200">{t("urlLabel")}</span>
              </div>
              <div className="flex gap-2">
                <Input
                  type="url"
                  placeholder={t("urlPlaceholder")}
                  value={profileUrl}
                  onChange={(e) => { setProfileUrl(e.target.value); setFetched(false); }}
                  className="flex-1 bg-slate-900 border-slate-700 text-slate-200 placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 text-sm h-10 rounded-lg"
                  disabled={loading || fetching}
                />
                <Button
                  type="button"
                  onClick={handleFetch}
                  disabled={!profileUrl.trim() || fetching || loading}
                  className={`h-10 px-4 border-0 text-sm font-medium rounded-lg shrink-0 transition-all
                    ${fetched
                      ? "bg-emerald-600 hover:bg-emerald-500 text-white"
                      : "bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800 disabled:text-slate-600 text-white"}`}
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

            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-slate-800" />
              <span className="text-xs text-slate-600 font-medium">or paste manually</span>
              <div className="flex-1 h-px bg-slate-800" />
            </div>

            {/* Step 2 — Content */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-400 text-[10px] font-bold flex items-center justify-center shrink-0">2</span>
                  <span className="text-sm font-semibold text-slate-200">
                    {t("contentLabel")} <span className="text-blue-400 font-normal">*</span>
                  </span>
                </div>
                {fetched && (
                  <span className="flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                    <CheckCircle2 className="w-3 h-3" />
                    {t("fetchedBadge")}
                  </span>
                )}
              </div>
              <Textarea
                placeholder={t("contentPlaceholder")}
                value={rawContent}
                onChange={(e) => setRawContent(e.target.value)}
                className="min-h-48 text-sm resize-none bg-slate-900 border-slate-700 text-slate-100 placeholder:text-slate-600 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 rounded-xl leading-relaxed"
                disabled={loading}
              />
              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-600">{t("contentHint")}</p>
                <span className={`text-xs tabular-nums font-medium transition-colors ${isReady ? "text-emerald-500" : "text-slate-600"}`}>
                  {charCount} {isReady ? "✓" : `/ 100`}
                </span>
              </div>
              {charCount > 0 && !isReady && (
                <p className="text-xs text-amber-500/70">
                  {t("tooShort")} {100 - charCount} {t("tooShortSuffix")}
                </p>
              )}
            </div>

            {/* Step 3 — Context */}
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-700 text-slate-400 text-[10px] font-bold flex items-center justify-center shrink-0">3</span>
                <span className="text-sm font-semibold text-slate-400">
                  Context <span className="text-slate-600 font-normal text-xs">({t("industryOptional")})</span>
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-500 font-medium">{t("industryLabel")}</label>
                  <Dropdown
                    value={industry}
                    onChange={setIndustry}
                    options={INDUSTRIES}
                    placeholder={t("industryPlaceholder")}
                    disabled={loading}
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs text-slate-500 font-medium">{t("targetLabel")}</label>
                  <Dropdown
                    value={targetRole}
                    onChange={setTargetRole}
                    options={TARGET_ROLES}
                    placeholder={t("targetPlaceholder")}
                    disabled={loading}
                  />
                </div>
              </div>
            </div>

            {/* Submit */}
            <div className="pt-1 space-y-3">
              <Button
                type="submit"
                disabled={loading || !isReady}
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
              <div className="flex items-center justify-center gap-5 text-xs text-slate-600">
                <span className="flex items-center gap-1.5"><Lock className="w-3 h-3" />{t("trustNoStore")}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" />{t("trust30s")}</span>
                <span className="flex items-center gap-1.5"><Sparkles className="w-3 h-3" />{t("trustFree")}</span>
              </div>
            </div>

          </form>
        </div>
      </main>
    </div>
  );
}
