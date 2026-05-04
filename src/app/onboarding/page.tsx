"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Zap, Sparkles, ArrowRight, Check, Crown } from "lucide-react";
import Link from "next/link";

const CREDIT_COSTS = [
  { action: "Profile analysis + score",    cost: 1, icon: "🔍" },
  { action: "AI headline rewrite",          cost: 2, icon: "✏️" },
  { action: "AI About / summary rewrite",   cost: 2, icon: "📝" },
  { action: "LinkedIn post generation",     cost: 1, icon: "📣" },
  { action: "Full profile overhaul",        cost: 5, icon: "⚡" },
];

export default function OnboardingPage() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [claimed, setClaimed] = useState(false);

  useEffect(() => {
    if (!isLoaded) return;
    if (!user) { router.replace("/sign-in"); return; }

    // Grant signup bonus via API (idempotent)
    fetch("/api/credits/onboarding", { method: "POST" })
      .then(() => setClaimed(true))
      .catch(() => setClaimed(true));
  }, [isLoaded, user, router]);

  const firstName = user?.firstName ?? "there";

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6 py-16">
      {/* Step 0 — Welcome + credits granted */}
      {step === 0 && (
        <div className="w-full max-w-lg text-center animate-fade-in">
          {/* Icon */}
          <div className="w-20 h-20 rounded-2xl bg-blue-500 flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-blue-500/30">
            <Zap className="w-10 h-10 text-white" />
          </div>

          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
            Welcome, {firstName}! 👋
          </h1>
          <p className="text-slate-400 text-base mb-8">
            Your Luminary account is ready. Let&apos;s get your LinkedIn profile working harder for you.
          </p>

          {/* Credits granted banner */}
          <div className="bg-gradient-to-br from-emerald-500/15 to-emerald-500/5 border border-emerald-500/30 rounded-2xl p-5 mb-8 text-left">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">You received 5 free credits</p>
                <p className="text-emerald-400 text-xs">
                  {claimed ? "Credited to your account ✓" : "Crediting your account…"}
                </p>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Use them to run your first profile analysis and see your Opportunity Score — no payment needed.
            </p>
          </div>

          <button
            onClick={() => setStep(1)}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-semibold transition-all shadow-xl shadow-blue-500/25 hover:scale-[1.02] active:scale-[0.98]"
          >
            Show me how credits work <ArrowRight className="w-4 h-4" />
          </button>
          <p className="text-slate-600 text-xs mt-4">Takes 30 seconds</p>
        </div>
      )}

      {/* Step 1 — Credit cost explainer */}
      {step === 1 && (
        <div className="w-full max-w-lg animate-fade-in">
          <div className="text-center mb-8">
            <p className="text-blue-400 text-xs font-semibold uppercase tracking-wider mb-2">How credits work</p>
            <h2 className="text-2xl font-bold text-white mb-2">Each AI action costs credits</h2>
            <p className="text-slate-400 text-sm">You control exactly what you spend. Top up anytime.</p>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden mb-6">
            {CREDIT_COSTS.map(({ action, cost, icon }, i) => (
              <div
                key={action}
                className={`flex items-center justify-between px-5 py-3.5 ${i < CREDIT_COSTS.length - 1 ? "border-b border-slate-800/60" : ""}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-base">{icon}</span>
                  <span className="text-slate-300 text-sm">{action}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-blue-400" />
                  <span className="text-white font-bold text-sm tabular-nums">{cost}</span>
                </div>
              </div>
            ))}
            <div className="px-5 py-3 bg-emerald-500/5 border-t border-emerald-500/20 flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-emerald-400 text-xs font-medium">You have 5 free credits to start with</span>
            </div>
          </div>

          {/* Founding Member teaser */}
          <div className="bg-gradient-to-br from-amber-950/40 to-slate-900 border border-amber-500/25 rounded-2xl p-4 mb-6 flex items-center gap-4">
            <Crown className="w-8 h-8 text-amber-400 shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-amber-300">Upgrade to Founding Member — $99 once</p>
              <p className="text-xs text-slate-400 mt-0.5">150 actions/month, no counting, forever. Only 200 spots.</p>
            </div>
            <Link
              href="/pricing"
              className="shrink-0 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/30 text-amber-300 text-xs font-semibold transition-all"
            >
              View
            </Link>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => setStep(0)}
              className="px-5 py-3 rounded-xl border border-slate-700 hover:border-slate-600 text-slate-400 hover:text-white text-sm font-medium transition-all flex-shrink-0"
            >
              Back
            </button>
            <Link
              href="/analyze"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-semibold text-sm transition-all shadow-lg shadow-blue-500/20 hover:scale-[1.01] active:scale-[0.98]"
            >
              <Zap className="w-4 h-4" />
              Run my first analysis — free
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
