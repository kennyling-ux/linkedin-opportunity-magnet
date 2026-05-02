import Link from "next/link";
import { Check, Zap, Sparkles, ArrowRight, Lock, Infinity, Shield } from "lucide-react";

const FREE_FEATURES = [
  "Analyze any LinkedIn profile",
  "Overall Opportunity Score",
  "Basic gap summary (counts only)",
  "Industry & role suggestions",
  "Unlimited analyses",
];

const PRO_FEATURES = [
  "Everything in Free",
  "All 4 dimension scores breakdown",
  "Full gap analysis with specific fixes",
  "Profile Engine — AI headline & About writer",
  "Content Engine — 30 topics + post generator",
  "Credibility Engine — AI case study builder",
  "Positioning Engine — career direction advisor",
  "Copy-ready outputs for everything",
  "Priority email support",
];

const LIFETIME_FEATURES = [
  "Everything in Pro — forever",
  "All future feature updates included",
  "No recurring billing, ever",
  "One-time payment, unlimited use",
  "Priority email support",
  "Early access to new engines",
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
          <Link href="/analyze" className="px-4 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-400 active:scale-[0.97] text-white font-medium text-xs transition-all duration-150 hover:scale-[1.03]">
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
            Start free. Go Pro when<br />you&apos;re ready to grow.
          </h1>
          <p className="text-slate-400 text-base leading-relaxed">
            Run your analysis for free. Upgrade to unlock AI-generated rewrites, post ideas, case studies, and career positioning.
          </p>
        </div>

        {/* Pricing cards — 3 columns */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-5">

          {/* Free */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-7 flex flex-col">
            <div className="mb-6">
              <p className="text-slate-400 text-sm font-medium mb-1">Free</p>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-bold text-white">$0</span>
                <span className="text-slate-500 text-sm mb-1.5">forever</span>
              </div>
              <p className="text-slate-600 text-xs mt-1">No credit card needed</p>
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
              Start analyzing — free
            </Link>
          </div>

          {/* Pro */}
          <div className="relative bg-gradient-to-b from-slate-900 to-slate-900/80 border border-blue-500/40 rounded-2xl p-7 flex flex-col shadow-2xl shadow-blue-500/10">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-bold shadow-lg">
                Most Popular
              </span>
            </div>
            <div className="mb-6">
              <p className="text-blue-400 text-sm font-medium mb-1">Pro</p>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-bold text-white">$12</span>
                <span className="text-slate-400 text-sm mb-1.5">/ month</span>
              </div>
              <p className="text-slate-500 text-xs mt-1">or <span className="text-slate-300 font-medium">$8/mo</span> billed yearly ($96/yr) — save 33%</p>
            </div>
            <ul className="space-y-3 flex-1 mb-7">
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
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 active:scale-[0.97] text-white text-sm font-semibold transition-all duration-150 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:scale-[1.02]"
            >
              <Sparkles className="w-4 h-4" />
              Get Pro access
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Lifetime */}
          <div className="relative bg-gradient-to-b from-amber-950/40 to-slate-900 border border-amber-500/35 rounded-2xl p-7 flex flex-col shadow-2xl shadow-amber-500/8">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold shadow-lg">
                🔥 Best Deal
              </span>
            </div>
            <div className="mb-6">
              <p className="text-amber-400 text-sm font-medium mb-1">Lifetime</p>
              <div className="flex items-end gap-2">
                <span className="text-4xl font-bold text-white">$99</span>
                <span className="text-amber-500/70 text-sm mb-1.5">one-time</span>
              </div>
              <p className="text-slate-500 text-xs mt-1">Pay once, use forever — all future updates included</p>
            </div>
            <ul className="space-y-3 flex-1 mb-7">
              {LIFETIME_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm">
                  <div className="w-4 h-4 rounded-full bg-amber-500/20 flex items-center justify-center mt-0.5 shrink-0">
                    <Check className="w-2.5 h-2.5 text-amber-400" />
                  </div>
                  <span className={f === "Everything in Pro — forever" ? "text-amber-400/70 font-medium" : "text-slate-200"}>{f}</span>
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-1.5 justify-center mb-4">
              <Infinity className="w-3.5 h-3.5 text-amber-500/60" />
              <span className="text-amber-500/60 text-xs">Limited-time offer</span>
            </div>
            <Link
              href="/sign-up"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 active:scale-[0.97] text-white text-sm font-semibold transition-all duration-150 shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02]"
            >
              <Zap className="w-4 h-4" />
              Get Lifetime access
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Money back guarantee */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium">
            <Shield className="w-4 h-4 shrink-0" />
            30-Day Money-Back Guarantee — no questions asked
          </div>
        </div>
        <p className="text-center text-slate-600 text-xs mt-3">
          All paid plans include a 30-day full refund. <Link href="/terms" className="text-slate-500 hover:text-slate-400 underline underline-offset-2">See terms</Link>
        </p>

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
                q: "What's the difference between Pro monthly and Lifetime?",
                a: "Pro monthly is $12/mo (or $8/mo billed yearly). Lifetime is a one-time $59 payment — no renewals, no subscriptions. You get everything in Pro plus all future updates, forever.",
              },
              {
                q: "How does the AI analysis work?",
                a: "We use Google Gemini to analyze your profile content across three dimensions: visibility (how findable you are), credibility (how convincing your profile is), and positioning (how clearly you communicate your expertise).",
              },
              {
                q: "Is there a money-back guarantee?",
                a: "Yes. All paid plans (Pro monthly, Pro yearly, and Lifetime) come with a 30-day full refund guarantee. If you're not satisfied for any reason, email us within 30 days of purchase and we'll refund you in full — no questions asked. The 30-day window starts from the date of your first payment. Refunds are processed within 5–10 business days. See our Terms & Conditions for the full policy.",
              },
              {
                q: "Can I cancel my Pro subscription anytime?",
                a: "Yes. Cancel anytime from your account settings. You'll keep Pro access until the end of your billing period. The 30-day money-back guarantee applies regardless of cancellation.",
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
