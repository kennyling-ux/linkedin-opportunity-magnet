"use client";

import { useState, useEffect } from "react";
import { useApp } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CopyButton } from "@/components/CopyButton";
import { Zap, User, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import type { HeadlineVariant } from "@/types";
import { useLanguage } from "@/context/LanguageContext";
import { useIsPro, ProGate } from "@/components/PaywallGate";

export default function ProfilePage() {
  const { input, profile, setProfile, analysis } = useApp();
  const router = useRouter();
  const { t } = useLanguage();
  const [loading, setLoading] = useState(false);
  const isPro = useIsPro();

  useEffect(() => { if (!analysis) router.replace("/analyze"); }, [analysis, router]);
  if (isPro === null || !analysis) return null;
  if (!isPro) return <ProGate feature={t("profileTitle")} desc={t("proGateProfileDesc")} />;

  const styleLabels: Record<HeadlineVariant["style"], { label: string; desc: string; color: string }> = {
    authority: { label: t("styleAuthority"), desc: t("styleAuthorityDesc"), color: "bg-blue-50 text-blue-700 border-blue-200" },
    outcome: { label: t("styleOutcome"), desc: t("styleOutcomeDesc"), color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
    niche: { label: t("styleNiche"), desc: t("styleNicheDesc"), color: "bg-violet-50 text-violet-700 border-violet-200" },
  };

  async function generate() {
    if (!input) return;
    setLoading(true);
    try {
      const res = await fetch("/api/profile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(input),
      });
      if (!res.ok) throw new Error();
      setProfile(await res.json());
      toast.success(t("profileTitle") + " ✓");
    } catch {
      toast.error(t("errGenFail"));
    } finally {
      setLoading(false);
    }
  }

  if (!profile) {
    return (
      <div className="p-8 max-w-3xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center">
            <User className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{t("profileTitle")}</h1>
            <p className="text-slate-500 text-sm">{t("profileSub")}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-8 text-center space-y-4">
          <p className="text-slate-600">{t("profileGenDesc")}</p>
          <Button onClick={generate} disabled={loading} className="bg-blue-600 hover:bg-blue-500 active:scale-[0.97] hover:scale-[1.02] text-white h-11 px-8 transition-all duration-150 shadow-lg shadow-blue-600/25 hover:shadow-blue-500/40">
            {loading ? (
              <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />{t("generating")}</>
            ) : (
              <><Zap className="w-4 h-4 mr-2" />{t("profileGenBtn")}</>
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
          <div className="w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center">
            <User className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{t("profileTitle")}</h1>
            <p className="text-slate-500 text-sm">{t("profileGenSub")}</p>
          </div>
        </div>
        <Button variant="outline" size="sm" onClick={generate} disabled={loading} className="gap-2">
          <RefreshCw className="w-3.5 h-3.5" />{t("regenerate")}
        </Button>
      </div>

      {/* Headlines */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        <h2 className="font-semibold text-slate-800">{t("headlineSection")}</h2>
        <div className="space-y-3">
          {profile.headlines.map((h) => {
            const cfg = styleLabels[h.style];
            return (
              <div key={h.style} className="border border-slate-200 rounded-lg p-4 flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className={`text-xs ${cfg.color}`}>{cfg.label}</Badge>
                    <span className="text-xs text-slate-400">{cfg.desc}</span>
                  </div>
                  <p className="text-slate-800 font-medium">{h.text}</p>
                </div>
                <CopyButton text={h.text} />
              </div>
            );
          })}
        </div>
      </section>

      {/* About */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
        <h2 className="font-semibold text-slate-800">{t("aboutSection")}</h2>
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">{t("original")}</p>
            <div className="bg-slate-50 rounded-lg p-4 text-sm text-slate-600 whitespace-pre-wrap leading-relaxed min-h-32">
              {profile.aboutOriginal || input?.rawContent?.slice(0, 400)}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">{t("optimized")}</p>
              <CopyButton text={profile.aboutOptimized} />
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-slate-800 whitespace-pre-wrap leading-relaxed min-h-32">
              {profile.aboutOptimized}
            </div>
          </div>
        </div>
      </section>

      {/* Experience */}
      {profile.experienceRewrites.length > 0 && (
        <section className="bg-white rounded-xl border border-slate-200 p-6 space-y-4">
          <h2 className="font-semibold text-slate-800">{t("experienceSection")}</h2>
          <div className="space-y-4">
            {profile.experienceRewrites.map((exp, i) => (
              <div key={i} className="border border-slate-100 rounded-lg overflow-hidden">
                <div className="grid md:grid-cols-2 divide-x divide-slate-100">
                  <div className="p-4">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide mb-2">{t("original")}</p>
                    <p className="text-sm text-slate-600 leading-relaxed">{exp.original}</p>
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide">{t("optimized")}</p>
                      <CopyButton text={exp.optimized} />
                    </div>
                    <p className="text-sm text-slate-800 leading-relaxed font-medium">{exp.optimized}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Keywords */}
      <section className="bg-white rounded-xl border border-slate-200 p-6 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-slate-800">{t("keywordsSection")}</h2>
          <CopyButton text={profile.keywords.join(", ")} />
        </div>
        <p className="text-xs text-slate-500">{t("keywordsHint")}</p>
        <div className="flex flex-wrap gap-2">
          {profile.keywords.map((kw) => (
            <Badge key={kw} variant="secondary" className="bg-slate-100 text-slate-700">
              {kw}
            </Badge>
          ))}
        </div>
      </section>
    </div>
  );
}
