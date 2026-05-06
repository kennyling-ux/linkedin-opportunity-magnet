"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { Navbar } from "@/components/Navbar";
import {
  Check, Zap, Sparkles, ArrowRight, Shield, Crown,
  ShoppingCart, Users, Lock, Infinity
} from "lucide-react";
import Link from "next/link";

// ── Plan definitions ─────────────────────────────────────────────────────────

const STARTER_FEATURES = [
  "20 credits per month",
  "Profile analysis (1 credit)",
  "AI headline rewrite (2 credits)",
  "AI About rewrite (2 credits)",
  "Post generation (1 credit)",
  "1 profile slot",
  "Standard support",
];

const AGENCY_FEATURES = [
  "80 credits per month",
  "Credit rollover (1 month)",
  "Everything in Starter",
  "Full profile overhaul (5 credits)",
  "Up to 10 profile slots",
  "Priority support",
  "Early access to new features",
];

const LIFETIME_FEATURES = [
  "150 actions / month (fair use)",
  "Unlimited — no credit counting",
  "All current & future features",
  "All profile slots",
  "Founding Member badge",
  "Priority support, forever",
];

const TOPUP_PACKS: { id: string; label: string; credits: number; price: string; pricePerCredit: string; popular?: boolean; color: string }[] = [
  { id: "topup_boost", label: "Boost", credits: 10, price: "$5",  pricePerCredit: "$0.50", color: "border-slate-200 hover:border-blue-300" },
  { id: "topup_power", label: "Power", credits: 30, price: "$12", pricePerCredit: "$0.40", popular: true, color: "border-blue-400 hover:border-blue-500" },
  { id: "topup_mega",  label: "Mega",  credits: 80, price: "$25", pricePerCredit: "$0.31", color: "border-slate-200 hover:border-violet-300" },
];

const CREDIT_COSTS = [
  { action: "Profile analysis + opportunity score", cost: 1 },
  { action: "AI headline rewrite",                 cost: 2 },
  { action: "AI About / summary rewrite",          cost: 2 },
  { action: "LinkedIn post generation",            cost: 1 },
  { action: "Full profile overhaul (all sections)", cost: 5 },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);
  const [lifetimeSpots, setLifetimeSpots] = useState<number | null>(null);
  const [lifetimeOpen, setLifetimeOpen] = useState(true);
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const { isSignedIn } = useUser();
  const router = useRouter();

  useEffect(() => {
    fetch("/api/pricing/lifetime-status")
      .then((r) => r.json())
      .then((d) => {
        setLifetimeSpots(200 - parseInt(d.count ?? "0"));
        setLifetimeOpen(d.open === "true");
      })
      .catch(() => {});
  }, []);

  async function handleUpgrade(planId: string) {
    if (!isSignedIn) { router.push("/sign-up"); return; }
    setLoadingPlan(planId);
    try {
      const res = await fetch("/api/hitpay/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Payment error: " + (data.error || "Unknown error. Check console."));
        console.error("[checkout]", data);
      }
    } catch (err) {
      console.error("[checkout]", err);
      alert("Failed to connect to payment. Please try again.");
    } finally {
      setLoadingPlan(null);
    }
  }

  const spotsLeft = lifetimeSpots ?? 200;
  const spotsPct = Math.max(0, Math.min(100, ((200 - spotsLeft) / 200) * 100));

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Navbar variant="dark" />

      <main className="flex-1 px-6 pt-28 pb-24">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium mb-5">
            <Sparkles className="w-3.5 h-3.5" />
            Simple, credit-based pricing
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight leading-tight">
            Pay for what you use.<br />
            <span className="text-blue-400">Nothing more.</span>
          </h1>
          <p className="text-slate-400 text-base leading-relaxed mb-8">
            Start with 5 free credits on signup. Top up anytime, or subscribe for a steady monthly credit refresh.
          </p>

          {/* Monthly / Annual toggle */}
          <div className="inline-flex items-center gap-1 p-1 rounded-xl bg-slate-900 border border-slate-800">
            <button
              onClick={() => setAnnual(false)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${!annual ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20" : "text-slate-400 hover:text-white"}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${annual ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20" : "text-slate-400 hover:text-white"}`}
            >
              Annual
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">
                2 months free
              </span>
            </button>
          </div>
        </div>

        {/* ── Subscription plans ──────────────────────────────────────────── */}
        <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-5 mb-6">

          {/* Starter */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-7 flex flex-col hover:border-slate-700 transition-colors">
            <div className="mb-6">
              <p className="text-slate-400 text-sm font-semibold mb-1 uppercase tracking-wider">Starter</p>
              <div className="flex items-end gap-2 mb-1">
                <span className="text-4xl font-bold text-white">{annual ? "$99" : "$12"}</span>
                <span className="text-slate-500 text-sm mb-1.5">{annual ? "/ year" : "/ month"}</span>
              </div>
              {annual && <p className="text-emerald-400 text-xs font-medium">$8.25/mo — save $45/yr</p>}
              <p className="text-slate-600 text-xs mt-1">20 credits refresh every billing cycle</p>
            </div>
            <ul className="space-y-3 flex-1 mb-7">
              {STARTER_FEATURES.map((f) => (
                <li key={f} className="flex items-start gap-3 text-sm">
                  <Check className="w-4 h-4 text-slate-500 mt-0.5 shrink-0" />
                  <span className="text-slate-400">{f}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleUpgrade(annual ? "starter_annual" : "starter_monthly")}
              disabled={loadingPlan !== null}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-slate-700 hover:border-blue-500 hover:bg-blue-500/5 text-slate-300 hover:text-white text-sm font-semibold transition-all duration-150 disabled:opacity-50"
            >
              {loadingPlan === (annual ? "starter_annual" : "starter_monthly") ? (
                <><span className="w-4 h-4 border-2 border-slate-400/30 border-t-slate-400 rounded-full animate-spin" /> Processing…</>
              ) : (
                <>Get Starter <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </div>

          {/* Agency */}
          <div className="relative bg-gradient-to-b from-slate-900 to-slate-900/80 border border-blue-500/50 rounded-2xl p-7 flex flex-col shadow-2xl shadow-blue-500/10">
            <div className="absolute -top-3 left-1/2 -translate-x-1/2">
              <span className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white text-xs font-bold shadow-lg shadow-blue-500/30">
                Most Popular
              </span>
            </div>
            <div className="mb-6">
              <p className="text-blue-400 text-sm font-semibold mb-1 uppercase tracking-wider">Agency</p>
              <div className="flex items-end gap-2 mb-1">
                <span className="text-4xl font-bold text-white">{annual ? "$319" : "$39"}</span>
                <span className="text-slate-400 text-sm mb-1.5">{annual ? "/ year" : "/ month"}</span>
              </div>
              {annual && <p className="text-emerald-400 text-xs font-medium">$26.58/mo — save $149/yr</p>}
              <p className="text-slate-500 text-xs mt-1">80 credits/mo · unused credits roll over 1 month</p>
            </div>
            <ul className="space-y-3 flex-1 mb-7">
              {AGENCY_FEATURES.map((f, i) => (
                <li key={f} className="flex items-start gap-3 text-sm">
                  <div className="w-4 h-4 rounded-full bg-blue-500/20 flex items-center justify-center mt-0.5 shrink-0">
                    <Check className="w-2.5 h-2.5 text-blue-400" />
                  </div>
                  <span className={i === 2 ? "text-slate-500" : "text-slate-200"}>{f}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleUpgrade(annual ? "agency_annual" : "agency_monthly")}
              disabled={loadingPlan !== null}
              className="flex items-center justify-center gap-2 w-full py-3 rounded-xl bg-blue-500 hover:bg-blue-400 text-white text-sm font-semibold transition-all duration-150 shadow-lg shadow-blue-500/25 hover:shadow-blue-400/40 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
            >
              {loadingPlan === (annual ? "agency_annual" : "agency_monthly") ? (
                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing…</>
              ) : (
                <><Sparkles className="w-4 h-4" /> Get Agency <ArrowRight className="w-4 h-4" /></>
              )}
            </button>
          </div>
        </div>

        {/* ── Founding Member Lifetime ─────────────────────────────────────── */}
        {lifetimeOpen && (
          <div className="max-w-4xl mx-auto mb-6">
            <div className="relative bg-gradient-to-br from-amber-950/50 via-slate-900 to-slate-900 border border-amber-500/30 rounded-2xl p-7 overflow-hidden">
              {/* Background glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Crown className="w-5 h-5 text-amber-400" />
                    <span className="text-amber-400 text-sm font-bold uppercase tracking-wider">Founding Member</span>
                    <span className="px-2 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-300 text-[10px] font-bold">
                      LIMITED
                    </span>
                  </div>
                  <div className="flex items-end gap-3 mb-2">
                    <span className="text-5xl font-bold text-white">$99</span>
                    <span className="text-amber-500/70 text-base mb-1.5">one-time · forever</span>
                  </div>
                  <p className="text-slate-400 text-sm mb-4">Pay once. Use forever. 150 actions/month, all features, all future updates.</p>

                  <ul className="grid grid-cols-2 gap-x-4 gap-y-2 mb-5">
                    {LIFETIME_FEATURES.map((f) => (
                      <li key={f} className="flex items-start gap-2 text-sm">
                        <div className="w-4 h-4 rounded-full bg-amber-500/20 flex items-center justify-center mt-0.5 shrink-0">
                          <Check className="w-2.5 h-2.5 text-amber-400" />
                        </div>
                        <span className="text-slate-300">{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Scarcity counter */}
                  <div className="mb-2">
                    <div className="flex items-center justify-between mb-1.5">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-amber-500" />
                        <span className="text-xs font-semibold text-amber-400">
                          {lifetimeSpots === null ? "..." : spotsLeft} of 200 spots remaining
                        </span>
                      </div>
                      <span className="text-xs text-slate-500">Closes Jun 30 or when full</span>
                    </div>
                    <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-400 transition-all duration-700"
                        style={{ width: `${spotsPct}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="md:w-52 shrink-0">
                  <button
                    onClick={() => handleUpgrade("lifetime")}
                    disabled={loadingPlan !== null}
                    className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-bold text-sm transition-all shadow-xl shadow-amber-500/25 hover:shadow-amber-400/40 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 mb-3"
                  >
                    {loadingPlan === "lifetime" ? (
                      <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Processing…</>
                    ) : (
                      <><Crown className="w-4 h-4" /> Claim Founding Spot</>
                    )}
                  </button>
                  <div className="flex items-center gap-1.5 justify-center">
                    <Infinity className="w-3.5 h-3.5 text-amber-500/60" />
                    <span className="text-amber-500/60 text-xs">No renewals, ever</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Credit top-up packs ─────────────────────────────────────────── */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="text-center mb-6">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">One-time top-ups</p>
            <h2 className="text-xl font-bold text-white">Need more credits? Just top up.</h2>
            <p className="text-slate-500 text-sm mt-1">Never expire. Stack on top of your plan.</p>
          </div>
          <div className="grid grid-cols-3 gap-4">
            {TOPUP_PACKS.map((pack) => (
              <div
                key={pack.id}
                className={`relative bg-slate-900 border-2 rounded-2xl p-5 flex flex-col hover:bg-slate-800/50 transition-all ${pack.color}`}
              >
                {pack.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-500 text-white text-[10px] font-bold">Best value</span>
                  </div>
                )}
                <p className="text-white font-bold text-base mb-1">{pack.label}</p>
                <p className="text-3xl font-bold text-white mb-1">+{pack.credits}</p>
                <p className="text-slate-500 text-xs mb-4">{pack.pricePerCredit} per credit</p>
                <button
                  onClick={() => handleUpgrade(pack.id)}
                  disabled={loadingPlan !== null}
                  className="flex items-center justify-center gap-2 w-full py-2.5 mt-auto rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white text-sm font-semibold transition-all disabled:opacity-50"
                >
                  {loadingPlan === pack.id ? (
                    <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <><ShoppingCart className="w-3.5 h-3.5" /> {pack.price}</>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* ── Credit cost table ───────────────────────────────────────────── */}
        <div className="max-w-2xl mx-auto mb-14">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="px-6 py-4 border-b border-slate-800">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">Credit costs per action</p>
            </div>
            <div className="divide-y divide-slate-800/60">
              {CREDIT_COSTS.map(({ action, cost }) => (
                <div key={action} className="flex items-center justify-between px-6 py-3">
                  <span className="text-slate-300 text-sm">{action}</span>
                  <span className="flex items-center gap-1.5 text-sm font-semibold text-white">
                    <Zap className="w-3.5 h-3.5 text-blue-400" />
                    {cost} {cost === 1 ? "credit" : "credits"}
                  </span>
                </div>
              ))}
            </div>
            <div className="px-6 py-3 bg-slate-950/50 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-xs text-emerald-400 font-medium">5 free credits on signup — no card required</span>
            </div>
          </div>
        </div>

        {/* ── Guarantee ───────────────────────────────────────────────────── */}
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-3">
            <Shield className="w-4 h-4 shrink-0" />
            30-Day Money-Back Guarantee — no questions asked
          </div>
          <p className="text-slate-600 text-xs">
            Not happy? Email us within 30 days for a full refund.{" "}
            <Link href="/terms" className="text-slate-500 hover:text-slate-400 underline underline-offset-2">See terms</Link>
          </p>
        </div>
      </main>

      <footer className="border-t border-slate-800/60 px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-blue-500 flex items-center justify-center">
            <Zap className="w-3 h-3 text-white" />
          </div>
          <span className="text-slate-500 text-xs">© 2026 Luminary</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-slate-600">
          <Link href="/terms" className="hover:text-slate-400 transition-colors">Terms</Link>
          <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> No data stored</span>
        </div>
      </footer>
    </div>
  );
}
