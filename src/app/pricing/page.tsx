import Link from "next/link";
import { Check, Zap, Sparkles, ArrowRight, Lock } from "lucide-react";

const FREE_FEATURES = [
  "Analyze any LinkedIn profile",
  "Overall Opportunity Score",
  "Basic gap summary (counts only)",
  "Industry & role suggestions",
  "Unlimited analyses",
];

const PRO_FEATURES = [
  "Everything in Free",
  "All 4 dimension scores (Visibility, Credibility, Positioning)",
  "Full gap analysis with specific fixes",
  "Profile Engine — AI headline & About writer",
  "Content Engine — 30 topics + post generator",
  "Credibility Engine — AI case study builder",
  "Positioning Engine — career direction advisor",
  "Copy-ready outputs for everything",
  "Priority email support",
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Nav */}
      <header className="border-b border-slate-800/60 px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-white text-sm">Luminary</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/blog" className="text-slate-400 hover:text-white transition-colors">Blog</Link>
          <Link href="/sign-in" className="text-slate-400 hover:text-white transition-colors">Sign in</Link>
          <Link href="/analyze" className="px-4 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-400 text-white font-medium text-xs transition-colors">
            Try Free
          </Link>
        </nav>
      </header>

      <main className="flex-1 px-6 py-20">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            Simple, transparent pricing
          </div>
          <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
            Start free. Upgrade when<br />you&apos;re ready to go deep.
          </h1>
          <p className="text-slate-400 text-base leading-relaxed">
            Run your analysis for free. Upgrade to Pro to unlock AI-generated rewrites, post ideas, case studies, and positioning advice.
          </p>
        </div>

        {/* Pricing cards */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-6">
          {/* Free */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 flex flex-col">
            <div className="mb-6">
              <p className="text-slate-400 text-sm font-medium mb-1">Free</p>
              <div className="flex items-end gap-2">
                <span className="text-5xl font-bold text-white">$0</span>
                <span className="text-slate-500 text-sm mb-2">forever</span>
              </div>
            </div>
            <ul className="space-y-3 flex-1 mb-8">
              {FREE_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm">
                  <Check className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />
                  <span className="text-slate-300">{f}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/analyze"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-slate-700 hover:border-slate-600 text-slate-200 text-sm font-semibold transition-colors"
            >
              Start analyzing — free
            </Link>
          </div>

          {/* Pro */}
          <div className="relative bg-gradient-to-b from-slate-900 to-slate-900/80 border border-blue-500/40 rounded-2xl p-8 flex flex-col shadow-2xl shadow-blue-500/10">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-bold shadow-lg">
                Most Popular
              </span>
            </div>
            <div className="mb-6">
              <p className="text-blue-400 text-sm font-medium mb-1">Pro</p>
              <div className="flex items-end gap-2">
                <span className="text-5xl font-bold text-white">$12</span>
                <span className="text-slate-400 text-sm mb-2">/ month</span>
              </div>
              <p className="text-slate-500 text-xs mt-1">$99/year — save 31%</p>
            </div>
            <ul className="space-y-3 flex-1 mb-8">
              {PRO_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm">
                  <div className="w-4 h-4 rounded-full bg-blue-500/20 flex items-center justify-center mt-0.5 shrink-0">
                    <Check className="w-2.5 h-2.5 text-blue-400" />
                  </div>
                  <span className={f === "Everything in Free" ? "text-slate-500" : "text-slate-200"}>{f}</span>
                </li>
              ))}
            </ul>
            <Link
              href="/sign-up"
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-blue-500 hover:bg-blue-400 text-white text-sm font-semibold transition-colors shadow-lg shadow-blue-500/25"
            >
              <Sparkles className="w-4 h-4" />
              Get Pro access
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* FAQ */}
        <div className="max-w-2xl mx-auto mt-20">
          <h2 className="text-2xl font-bold text-white text-center mb-10">Frequently asked questions</h2>
          <div className="space-y-6">
            {[
              {
                q: "Do I need to create an account to use the free plan?",
                a: "No. You can paste your LinkedIn content and get your overall score without signing up. An account is only required to save results and access Pro features.",
              },
              {
                q: "How does the AI analysis work?",
                a: "We use Google Gemini to analyze your profile content across three dimensions: visibility (how findable you are), credibility (how convincing your profile is), and positioning (how clearly you communicate your expertise).",
              },
              {
                q: "Can I cancel my Pro subscription anytime?",
                a: "Yes. Cancel anytime from your account settings. You'll keep Pro access until the end of your billing period.",
              },
              {
                q: "Is my profile data stored?",
                a: "No. Your profile content is processed in memory for analysis and never stored on our servers. We take privacy seriously.",
              },
            ].map(({ q, a }) => (
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
