"use client";

import Link from "next/link";
import { ArrowRight, Zap, BarChart2, FileText, Award, TrendingUp, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";

export default function LandingPage() {
  const { t } = useLanguage();

  const features = [
    { icon: BarChart2, tag: "01", title: t("f1Title"), desc: t("f1Desc"), accent: "bg-blue-500" },
    { icon: TrendingUp, tag: "02", title: t("f2Title"), desc: t("f2Desc"), accent: "bg-indigo-500" },
    { icon: FileText, tag: "03", title: t("f3Title"), desc: t("f3Desc"), accent: "bg-violet-500" },
    { icon: Award, tag: "04", title: t("f4Title"), desc: t("f4Desc"), accent: "bg-sky-500" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-white text-sm tracking-tight">{t("brand")}</span>
          </div>
          <div className="flex items-center gap-3">
            <LanguageSwitcher variant="dark" />
            <Link href="/analyze">
              <Button size="sm" className="bg-blue-500 hover:bg-blue-400 text-white border-0 shadow-lg shadow-blue-500/20 h-8 px-4 text-xs font-medium">
                {t("startAnalysis")}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative bg-slate-950 overflow-hidden pt-14">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-blue-600/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/4 w-[300px] h-[300px] bg-indigo-600/8 rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-24">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-8">
                <Sparkles className="w-3.5 h-3.5" />
                {t("tagline")}
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-white leading-[1.1] tracking-tight mb-6">
                {t("heroTitle1")}<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
                  {t("heroTitle2")}
                </span>
              </h1>
              <p className="text-slate-400 text-lg leading-relaxed mb-10 max-w-md">{t("heroSub")}</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href="/analyze">
                  <Button size="lg" className="bg-blue-500 hover:bg-blue-400 text-white border-0 shadow-xl shadow-blue-500/25 h-12 px-7 font-semibold">
                    {t("startAnalysis")} <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
              <p className="text-slate-600 text-xs mt-4">{t("heroDisclaimer")}</p>
            </div>

            {/* Product preview card */}
            <div className="relative">
              <div className="absolute -inset-4 bg-blue-500/5 rounded-3xl blur-xl" />
              <div className="relative bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-xs text-slate-500 mb-0.5">{t("opportunityLabel")}</p>
                    <div className="flex items-center gap-2">
                      <span className="text-white font-semibold text-sm">{t("opportunityLabel")}</span>
                      <span className="px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-400 text-xs font-bold">{t("oppMedium")}</span>
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center">
                    <Zap className="w-4 h-4 text-blue-400" />
                  </div>
                </div>
                <div className="h-1.5 bg-slate-800 rounded-full mb-6 overflow-hidden">
                  <div className="h-full w-1/2 bg-gradient-to-r from-amber-500 to-amber-400 rounded-full" />
                </div>
                <div className="grid grid-cols-4 gap-2 mb-5">
                  {[
                    { label: t("scoreTotal"), score: 58, color: "#f59e0b" },
                    { label: t("scoreVisibility"), score: 52, color: "#3b82f6" },
                    { label: t("scoreCredibility"), score: 61, color: "#6366f1" },
                    { label: t("scorePositioning"), score: 63, color: "#8b5cf6" },
                  ].map(({ label, score, color }) => (
                    <div key={label} className="flex flex-col items-center gap-1.5">
                      <div className="relative w-14 h-14">
                        <svg className="-rotate-90 w-14 h-14">
                          <circle cx="28" cy="28" r="22" fill="none" stroke="#1e293b" strokeWidth="5" />
                          <circle cx="28" cy="28" r="22" fill="none" stroke={color} strokeWidth="5"
                            strokeDasharray={`${2 * Math.PI * 22}`}
                            strokeDashoffset={`${2 * Math.PI * 22 * (1 - score / 100)}`}
                            strokeLinecap="round" />
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-white text-xs font-bold">{score}</span>
                        </div>
                      </div>
                      <span className="text-slate-500 text-[10px] text-center leading-tight">{label}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                  <p className="text-slate-600 text-[10px] uppercase tracking-wider font-semibold mb-2">{t("gapSection")}</p>
                  {[
                    t("visTips")[0] ?? "",
                    t("credTips")[0] ?? "",
                    t("posTips")[0] ?? "",
                  ].map((gap, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-slate-400">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-500/70 shrink-0" />
                      {gap}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-slate-50 border-y border-slate-100 py-14">
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {([t("step1"), t("step2"), t("step3"), t("step4")] as string[]).map((text, i) => (
              <div key={i} className="flex flex-col gap-3">
                <span className="text-3xl font-bold text-slate-200 leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="text-sm text-slate-600 leading-snug font-medium">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold text-slate-900 mb-3 tracking-tight">{t("featuresTitle")}</h2>
          <p className="text-slate-500 text-base max-w-xl mx-auto">{t("featuresSub")}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {features.map(({ icon: Icon, tag, title, desc, accent }) => (
            <div key={tag} className="group relative p-6 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-lg hover:shadow-slate-100 transition-all duration-300 overflow-hidden">
              <div className={`absolute top-0 left-0 w-1 h-full rounded-l-2xl ${accent} opacity-50 group-hover:opacity-100 transition-opacity`} />
              <div className="flex items-start gap-4 pl-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                  <Icon className="w-5 h-5 text-slate-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-bold text-slate-300 tabular-nums">{tag}</span>
                    <h3 className="font-semibold text-slate-900">{title}</h3>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-950 py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/8 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-2xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4 tracking-tight">{t("ctaTitle")}</h2>
          <p className="text-slate-400 text-base mb-8 leading-relaxed">{t("ctaSub")}</p>
          <Link href="/analyze">
            <Button size="lg" className="bg-blue-500 hover:bg-blue-400 text-white border-0 shadow-xl shadow-blue-500/20 h-12 px-8 font-semibold">
              {t("ctaBtn")} <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      <footer className="bg-slate-950 border-t border-slate-900 py-6 text-center text-slate-600 text-xs">
        © 2026 Luminary · {t("footerNote")}
      </footer>
    </div>
  );
}
