"use client";

import Link from "next/link";
import { ArrowRight, Zap, BarChart2, FileText, Award, TrendingUp, Sparkles, Users, Star, Check, Lock, Clock } from "lucide-react";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { useLanguage } from "@/context/LanguageContext";
import { UserButton, useUser } from "@clerk/nextjs";

const STATS = [
  { value: "2,400+", label: "Profiles analyzed" },
  { value: "3×", label: "Avg. profile view increase" },
  { value: "94%", label: "Found new opportunities" },
  { value: "< 60s", label: "To get your score" },
];

const TESTIMONIALS = [
  { quote: "I went from zero inbound to 3 recruiter messages a week after optimizing my headline using the suggestions.", name: "Sarah K.", role: "Senior Product Manager", avatar: "SK" },
  { quote: "The credibility engine helped me articulate case studies I've been sitting on for years. My profile finally reflects what I actually do.", name: "James T.", role: "Independent Consultant", avatar: "JT" },
  { quote: "My positioning score went from 42 to 81 in two weeks. Got my first inbound client DM two days after.", name: "Michelle C.", role: "Brand Strategist", avatar: "MC" },
];

export default function LandingPage() {
  const { t } = useLanguage();
  const { isSignedIn } = useUser();

  const features = [
    { icon: BarChart2, title: t("f1Title"), desc: t("f1Desc"), tag: "Visibility Score", accent: "from-blue-500/15 to-transparent", border: "border-blue-500/20", iconColor: "text-blue-400", tagColor: "text-blue-400" },
    { icon: TrendingUp, title: t("f2Title"), desc: t("f2Desc"), tag: "Positioning Engine", accent: "from-indigo-500/15 to-transparent", border: "border-indigo-500/20", iconColor: "text-indigo-400", tagColor: "text-indigo-400" },
    { icon: FileText, title: t("f3Title"), desc: t("f3Desc"), tag: "Content Engine", accent: "from-violet-500/15 to-transparent", border: "border-violet-500/20", iconColor: "text-violet-400", tagColor: "text-violet-400" },
    { icon: Award, title: t("f4Title"), desc: t("f4Desc"), tag: "Credibility Engine", accent: "from-sky-500/15 to-transparent", border: "border-sky-500/20", iconColor: "text-sky-400", tagColor: "text-sky-400" },
  ];

  return (
    <div className="min-h-screen bg-slate-950">

      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-slate-800/60 bg-slate-950/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-white text-sm tracking-tight">{t("brand")}</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/pricing" className="text-slate-400 hover:text-white transition-colors">Pricing</Link>
            <Link href="/blog" className="text-slate-400 hover:text-white transition-colors">Blog</Link>
          </nav>
          <div className="flex items-center gap-3">
            <LanguageSwitcher variant="dark" />
            {isSignedIn ? (
              <>
                <UserButton />
                <Link href="/analyze" className="px-4 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-400 text-white font-semibold text-xs transition-colors shadow-md shadow-blue-500/20">
                  {t("startAnalysis")}
                </Link>
              </>
            ) : (
              <>
                <Link href="/sign-in" className="text-slate-400 hover:text-white text-xs transition-colors">Sign in</Link>
                <Link href="/analyze" className="px-4 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-400 text-white font-semibold text-xs transition-colors shadow-md shadow-blue-500/20">
                  Try Free
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden pt-14">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-blue-600/8 rounded-full blur-3xl" />
          <div className="absolute top-32 right-1/4 w-[300px] h-[300px] bg-indigo-600/6 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-6 pt-24 pb-20">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-7">
                <Sparkles className="w-3.5 h-3.5" />
                AI-Powered LinkedIn Optimizer
              </div>
              <h1 className="text-5xl md:text-6xl font-bold leading-[1.08] tracking-tight mb-6">
                <span className="text-white">{t("heroTitle1")}</span><br />
                <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent">
                  {t("heroTitle2")}
                </span>
              </h1>
              <p className="text-slate-400 text-lg leading-relaxed mb-8 max-w-md">{t("heroSub")}</p>
              <div className="flex flex-wrap gap-3 mb-6">
                <Link href="/analyze" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-400 active:scale-[0.97] text-white font-semibold transition-all duration-150 shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.03]">
                  {t("startAnalysis")} <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href="/pricing" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-700 hover:border-blue-500/50 text-slate-300 hover:text-white font-semibold transition-all duration-150 text-sm hover:bg-blue-500/5">
                  See pricing
                </Link>
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-600">
                <span className="flex items-center gap-1.5"><Lock className="w-3 h-3" /> No data stored</span>
                <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> Results in 30s</span>
                <span className="flex items-center gap-1.5"><Sparkles className="w-3 h-3" /> Free to start</span>
              </div>
            </div>

            {/* Product preview */}
            <div className="relative">
              <div className="absolute -inset-6 bg-blue-500/5 rounded-3xl blur-2xl" />
              <div className="relative bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Opportunity Level</p>
                    <span className="px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 text-xs font-bold border border-amber-500/20">Medium</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => <Star key={i} className={`w-3 h-3 ${i < 3 ? "text-amber-400 fill-amber-400" : "text-slate-700"}`} />)}
                  </div>
                </div>
                <div className="h-1.5 bg-slate-800 rounded-full mb-5 overflow-hidden">
                  <div className="h-full w-[56%] bg-gradient-to-r from-amber-500 to-amber-400 rounded-full" />
                </div>
                <div className="grid grid-cols-4 gap-2 mb-5">
                  {[
                    { label: "Overall", score: 58, color: "#f59e0b" },
                    { label: "Visibility", score: 52, color: "#3b82f6" },
                    { label: "Credibility", score: 61, color: "#6366f1" },
                    { label: "Positioning", score: 63, color: "#8b5cf6" },
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
                      <span className="text-slate-500 text-[10px] text-center">{label}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-2 border-t border-slate-800 pt-4">
                  <p className="text-slate-600 text-[10px] uppercase tracking-wider font-semibold mb-2">Top improvements</p>
                  {["Add quantified results to experience", "Rewrite headline to target specific audience", "Request 3 recommendations"].map((gap) => (
                    <div key={gap} className="flex items-center gap-2 text-xs text-slate-400">
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

      {/* Stats */}
      <section className="border-y border-slate-800/60 bg-slate-900/40">
        <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map(({ value, label }) => (
            <div key={label} className="text-center">
              <p className="text-3xl font-bold text-white mb-1">{value}</p>
              <p className="text-slate-500 text-xs">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="max-w-5xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <p className="text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">How it works</p>
          <h2 className="text-3xl font-bold text-white tracking-tight">From paste to insights in 60 seconds</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {([t("step1"), t("step2"), t("step3"), t("step4")] as string[]).map((text, i) => (
            <div key={i} className="relative">
              {i < 3 && <div className="hidden md:block absolute top-5 left-full w-full h-px z-0" />}
              <div className="relative z-10 flex flex-col gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-sm">
                  {String(i + 1).padStart(2, "0")}
                </div>
                <p className="text-slate-300 text-sm leading-snug font-medium">{text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <div className="text-center mb-12">
          <p className="text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">What you get</p>
          <h2 className="text-3xl font-bold text-white tracking-tight mb-3">{t("featuresTitle")}</h2>
          <p className="text-slate-500 text-base max-w-lg mx-auto">{t("featuresSub")}</p>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          {features.map(({ icon: Icon, title, desc, tag, accent, border, iconColor, tagColor }) => (
            <div key={tag} className={`group bg-gradient-to-br ${accent} border ${border} rounded-2xl p-6 hover:scale-[1.01] transition-all duration-300`}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-900/80 flex items-center justify-center shrink-0">
                  <Icon className={`w-5 h-5 ${iconColor}`} />
                </div>
                <div>
                  <p className={`text-xs font-semibold mb-1 ${tagColor}`}>{tag}</p>
                  <h3 className="font-semibold text-white mb-1.5">{title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-t border-slate-800/60 bg-slate-900/30 py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">What people say</p>
            <h2 className="text-3xl font-bold text-white tracking-tight">Real results from real professionals</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.map(({ quote, name, role, avatar }) => (
              <div key={name} className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />)}
                </div>
                <p className="text-slate-300 text-sm leading-relaxed mb-5">&ldquo;{quote}&rdquo;</p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white text-xs font-bold">{avatar}</div>
                  <div>
                    <p className="text-white text-xs font-semibold">{name}</p>
                    <p className="text-slate-500 text-xs">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing teaser */}
      <section className="max-w-4xl mx-auto px-6 py-20">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-6">
            <Sparkles className="w-3.5 h-3.5" /> Free to start
          </div>
          <h2 className="text-3xl font-bold text-white mb-4 tracking-tight">Start free. Upgrade when you&apos;re ready.</h2>
          <p className="text-slate-400 text-base mb-8 max-w-md mx-auto leading-relaxed">
            Your overall score and gap summary are always free. Upgrade to Pro to unlock AI-generated rewrites, post ideas, and career positioning.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-5 mb-8">
            {[
              { label: "Overall score", free: true },
              { label: "Gap analysis", free: true },
              { label: "AI profile rewrite", free: false },
              { label: "Post generator", free: false },
              { label: "Case study builder", free: false },
            ].map(({ label, free }) => (
              <span key={label} className={`flex items-center gap-1.5 text-sm ${free ? "text-slate-300" : "text-amber-400"}`}>
                {free ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Sparkles className="w-3.5 h-3.5" />}
                {label}
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${free ? "bg-emerald-500/10 text-emerald-500" : "bg-amber-500/10 text-amber-500"}`}>
                  {free ? "Free" : "Pro"}
                </span>
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link href="/analyze" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-400 active:scale-[0.97] text-white font-semibold transition-all duration-150 shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.03]">
              Analyze free <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/pricing" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-700 hover:border-blue-500/50 text-slate-300 hover:text-white font-semibold transition-all duration-150 text-sm hover:bg-blue-500/5">
              View all plans
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-slate-800/60 py-20">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/8 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-2xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-1.5 mb-6">
            <Users className="w-4 h-4 text-slate-500" />
            <span className="text-slate-500 text-sm">Join 2,400+ professionals who&apos;ve optimized their profiles</span>
          </div>
          <h2 className="text-4xl font-bold text-white mb-4 tracking-tight">{t("ctaTitle")}</h2>
          <p className="text-slate-400 text-base mb-8 leading-relaxed">{t("ctaSub")}</p>
          <Link href="/analyze" className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-blue-500 hover:bg-blue-400 active:scale-[0.97] text-white font-semibold text-base transition-all duration-150 shadow-2xl shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-[1.02]">
            {t("ctaBtn")} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800/60 py-8">
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-blue-500 flex items-center justify-center">
              <Zap className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-slate-500 text-xs font-medium">© 2026 Luminary</span>
          </div>
          <nav className="flex items-center gap-6 text-xs text-slate-600">
            <Link href="/pricing" className="hover:text-slate-400 transition-colors">Pricing</Link>
            <Link href="/blog" className="hover:text-slate-400 transition-colors">Blog</Link>
            <Link href="/analyze" className="hover:text-slate-400 transition-colors">Analyze</Link>
            <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> No data stored</span>
          </nav>
        </div>
      </footer>

    </div>
  );
}
