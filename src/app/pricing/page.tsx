"use client";

import { Check, Sparkles, ArrowRight, Lock, Infinity, Shield, Zap } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Navbar } from "@/components/Navbar";

export default function PricingPage() {
  const { t } = useLanguage();

  const FREE_FEATURES = [t("pf1"), t("pf2"), t("pf3"), t("pf4"), t("pf5")];
  const PRO_FEATURES = [t("ppf1"), t("ppf2"), t("ppf3"), t("ppf4"), t("ppf5"), t("ppf6"), t("ppf7"), t("ppf8"), t("ppf9")];
  const LIFETIME_FEATURES = [t("plf1"), t("plf2"), t("plf3"), t("plf4"), t("plf5"), t("plf6")];

  const FAQS = [
    { q: t("faq1q"), a: t("faq1a") },
    { q: t("faq2q"), a: t("faq2a") },
    { q: t("faq3q"), a: t("faq3a") },
    { q: t("faq5q"), a: t("faq5a") },
    { q: t("faq4q"), a: t("faq4a") },
    { q: t("faq6q"), a: t("faq6a") },
  ];

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Navbar variant="dark" />

      <main className="flex-1 px-6 py-20 pt-28">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            {t("pricingPageBadge")}
          </div>
          <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
            {t("pricingPageTitle")}
          </h1>
          <p className="text-slate-400 text-base leading-relaxed">
            {t("pricingPageSub")}
          </p>
        </div>

        {/* Pricing cards — 3 columns */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-5">

          {/* Free */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-7 flex flex-col">
            <div className="mb-6">
              <p className="text-slate-400 text-sm font-medium mb-1">{t("planFree")}</p>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-bold text-white">$0</span>
                <span className="text-slate-500 text-sm mb-1.5">{t("planFreeSub")}</span>
              </div>
              <p className="text-slate-600 text-xs mt-1">{t("planFreeNote")}</p>
            </div>
            <ul className="space-y-3 flex-1 mb-7">
              {FREE_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm">
                  <Check className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                  <span className="text-slate-400">{f}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/analyze"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white text-sm font-semibold transition-all duration-150"
            >
              {t("btnStartFree")}
            </Link>
          </div>

          {/* Pro */}
          <div className="relative bg-gradient-to-b from-slate-900 to-slate-900/80 border border-blue-500/40 rounded-2xl p-7 flex flex-col shadow-2xl shadow-blue-500/10">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-bold shadow-lg">
                {t("badgeMostPopular")}
              </span>
            </div>
            <div className="mb-6">
              <p className="text-blue-400 text-sm font-medium mb-1">{t("planPro")}</p>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-bold text-white">$12</span>
                <span className="text-slate-400 text-sm mb-1.5">{t("planProSub")}</span>
              </div>
              <p className="text-slate-500 text-xs mt-1">{t("planProNote")}</p>
            </div>
            <ul className="space-y-3 flex-1 mb-7">
              {PRO_FEATURES.map((f, i) => (
                <li key={f} className="flex items-start gap-3 text-sm">
                  <div className="w-4 h-4 rounded-full bg-blue-500/20 flex items-center justify-center mt-0.5 shrink-0">
                    <Check className="w-2.5 h-2.5 text-blue-400" />
                  </div>
                  <span className={i === 0 ? "text-slate-500" : "text-slate-200"}>{f}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/sign-up"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 active:scale-[0.97] text-white text-sm font-semibold transition-all duration-150 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4" />
              {t("btnGetPro")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Lifetime */}
          <div className="relative bg-gradient-to-b from-amber-950/40 to-slate-900 border border-amber-500/35 rounded-2xl p-7 flex flex-col shadow-2xl shadow-amber-500/8">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold shadow-lg">
                {t("badgeBestDeal")}
              </span>
            </div>
            <div className="mb-6">
              <p className="text-amber-400 text-sm font-medium mb-1">{t("planLifetime")}</p>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-bold text-white">$99</span>
                <span className="text-amber-500/70 text-sm mb-1.5">{t("planLifetimeSub")}</span>
              </div>
              <p className="text-slate-500 text-xs mt-1">{t("planLifetimeNote")}</p>
            </div>
            <ul className="space-y-3 flex-1 mb-7">
              {LIFETIME_FEATURES.map((f, i) => (
                <li key={f} className="flex items-start gap-3 text-sm">
                  <div className="w-4 h-4 rounded-full bg-amber-500/20 flex items-center justify-center mt-0.5 shrink-0">
                    <Check className="w-2.5 h-2.5 text-amber-400" />
                  </div>
                  <span className={i === 0 ? "text-amber-400/70 font-medium" : "text-slate-200"}>{f}</span>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-1.5 justify-center mb-4">
              <Infinity className="w-3.5 h-3.5 text-amber-500/60" />
              <span className="text-amber-500/60 text-xs">{t("planLifetimeLimited")}</span>
            </div>
            <Link
              href="/sign-up"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 active:scale-[0.97] text-white text-sm font-semibold transition-all duration-150 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02]"
            >
              <Zap className="w-4 h-4" />
              {t("btnGetLifetime")}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Money back guarantee */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
            <Shield className="w-4 h-4 shrink-0" />
            {t("guaranteeText")}
          </div>
        </div>
        <p className="text-center text-slate-600 text-xs mt-3">
          {t("guaranteeSub")}{" "}
          <Link href="/terms" className="text-slate-500 hover:text-slate-400 underline underline-offset-2">
            {t("seeTerms")}
          </Link>
        </p>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto mt-20">
          <h2 className="text-2xl font-bold text-white text-center mb-10">{t("faqTitle")}</h2>
          <div className="space-y-6">
            {FAQS.map(({ q, a }) => (
              <div key={q} className="border-b border-slate-800 pb-6">
                <p className="text-white font-medium mb-2">{q}</p>
                <p className="text-slate-400 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-800/60 px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md bg-blue-500 flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-white" />
          </div>
          <span className="text-slate-500 text-xs">© 2026 Luminary</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-slate-600">
          <Link href="/blog" className="hover:text-slate-400 transition-colors">Blog</Link>
          <Link href="/pricing" className="hover:text-slate-400 transition-colors">Pricing</Link>
          <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> No data stored</span>
        </div>
      </footer>
    </div>
  );
}
