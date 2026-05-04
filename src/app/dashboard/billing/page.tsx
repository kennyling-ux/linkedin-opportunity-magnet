"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { useCredits } from "@/hooks/useCredits";
import {
  Zap, Crown, ShoppingCart, ArrowRight, CreditCard,
  Clock, CheckCircle2, XCircle, AlertTriangle, RefreshCw
} from "lucide-react";
import Link from "next/link";

interface Transaction {
  id: string;
  action_type: string;
  credits_used: number;
  source: string;
  created_at: string;
}

const TOPUP_PACKS: { id: string; label: string; credits: number; price: string; popular?: boolean }[] = [
  { id: "topup_boost", label: "Boost", credits: 10, price: "$5" },
  { id: "topup_power", label: "Power", credits: 30, price: "$12", popular: true },
  { id: "topup_mega",  label: "Mega",  credits: 80, price: "$25" },
];

const ACTION_LABELS: Record<string, string> = {
  profile_analysis:      "Profile analysis",
  headline_rewrite:      "Headline rewrite",
  about_rewrite:         "About rewrite",
  post_generation:       "Post generation",
  full_profile_overhaul: "Full profile overhaul",
  signup_bonus:          "Signup bonus",
  subscription_activated:"Subscription credits",
  topup_topup_boost:     "Boost pack top-up",
  topup_topup_power:     "Power pack top-up",
  topup_topup_mega:      "Mega pack top-up",
};

const PLAN_LABELS: Record<string, string> = {
  starter: "Starter",
  agency:  "Agency",
};

export default function BillingPage() {
  const { user } = useUser();
  const router = useRouter();
  const { balance, loading: balanceLoading, refetch } = useCredits();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [txLoading, setTxLoading] = useState(true);
  const [purchasing, setPurchasing] = useState<string | null>(null);
  const [cancelling, setCancelling] = useState(false);

  useEffect(() => {
    if (!user) { router.replace("/sign-in"); return; }
    fetch("/api/credits/history")
      .then((r) => r.json())
      .then((d) => setTransactions(d.transactions ?? []))
      .finally(() => setTxLoading(false));
  }, [user, router]);

  async function handleTopUp(planId: string) {
    setPurchasing(planId);
    try {
      const res = await fetch("/api/hitpay/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });
      const { url } = await res.json();
      if (url) window.location.href = url;
    } finally {
      setPurchasing(null);
    }
  }

  async function handleCancel() {
    if (!confirm("Cancel your subscription? You'll keep credits until the end of your billing period.")) return;
    setCancelling(true);
    await fetch("/api/subscriptions/cancel", { method: "POST" });
    await refetch();
    setCancelling(false);
  }

  const sub = balance?.subscription;
  const periodEnd = sub?.current_period_end
    ? new Date(sub.current_period_end).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })
    : null;

  return (
    <div className="flex gap-6 p-7 min-h-full">

      {/* ── Left column ── */}
      <div className="flex-1 min-w-0 space-y-5">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Billing & Credits</h1>
          <p className="text-slate-400 text-sm mt-0.5">Manage your plan, credits, and purchase history.</p>
        </div>

        {/* Current plan card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-4">Current Plan</p>

          {balanceLoading ? (
            <div className="animate-pulse space-y-2">
              <div className="h-5 bg-slate-100 rounded w-1/3" />
              <div className="h-3 bg-slate-100 rounded w-1/2" />
            </div>
          ) : balance?.isFoundingMember ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                  <Crown className="w-5 h-5 text-amber-500" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Founding Member</p>
                  <p className="text-xs text-amber-600 font-medium">Lifetime access · No renewals</p>
                </div>
              </div>
              <span className="px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-700 text-xs font-bold">
                👑 Active
              </span>
            </div>
          ) : sub ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">
                    {PLAN_LABELS[sub.plan_type]} · {sub.billing_cycle === "annual" ? "Annual" : "Monthly"}
                  </p>
                  {periodEnd && (
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3" />
                      Renews {periodEnd}
                    </p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                  sub.status === "active" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
                  "bg-red-50 text-red-700 border border-red-200"
                }`}>
                  {sub.status === "active" ? "✓ Active" : sub.status}
                </span>
                <button
                  onClick={handleCancel}
                  disabled={cancelling}
                  className="text-xs text-slate-400 hover:text-red-500 transition-colors px-2 py-1 rounded hover:bg-red-50"
                >
                  {cancelling ? "Cancelling…" : "Cancel"}
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-slate-400" />
                </div>
                <div>
                  <p className="font-bold text-slate-900">Free plan</p>
                  <p className="text-xs text-slate-500">5 signup credits to get started</p>
                </div>
              </div>
              <Link
                href="/pricing"
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-500 hover:bg-blue-400 text-white text-xs font-semibold transition-all shadow-md shadow-blue-500/20 hover:scale-[1.02]"
              >
                Upgrade <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}
        </div>

        {/* Credit balance */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-4">Credit Balance</p>

          {balance?.isFoundingMember ? (
            <div className="flex items-center gap-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-amber-500">{balance.lifetimeActionsThisMonth}</p>
                <p className="text-xs text-slate-500 mt-1">Used this month</p>
              </div>
              <div className="flex-1 h-px bg-slate-100" />
              <div className="text-center">
                <p className="text-3xl font-bold text-slate-300">{150 - balance.lifetimeActionsThisMonth}</p>
                <p className="text-xs text-slate-500 mt-1">Remaining</p>
              </div>
              <div className="flex-1">
                <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-400 transition-all"
                    style={{ width: `${(balance.lifetimeActionsThisMonth / 150) * 100}%` }}
                  />
                </div>
                <p className="text-[10px] text-slate-400 mt-1 text-right">150 fair-use cap / month</p>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-6">
              <div className="text-center">
                <p className="text-3xl font-bold text-slate-900">{balance?.total ?? 0}</p>
                <p className="text-xs text-slate-500 mt-1">Total credits</p>
              </div>
              <div className="space-y-2 flex-1">
                {(balance?.subscriptionCredits ?? 0) > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-slate-600">
                      <span className="w-2 h-2 rounded-full bg-blue-400" /> Plan credits
                    </span>
                    <span className="font-semibold text-slate-900">{balance?.subscriptionCredits}</span>
                  </div>
                )}
                {(balance?.topupCredits ?? 0) > 0 && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-slate-600">
                      <span className="w-2 h-2 rounded-full bg-violet-400" /> Top-up credits
                    </span>
                    <span className="font-semibold text-slate-900">{balance?.topupCredits}</span>
                  </div>
                )}
                {(balance?.total ?? 0) === 0 && (
                  <div className="flex items-center gap-2 text-amber-600 text-sm">
                    <AlertTriangle className="w-4 h-4" />
                    No credits left — top up to continue
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Transaction history */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">Usage History</p>
            <button onClick={() => {
              setTxLoading(true);
              fetch("/api/credits/history").then(r => r.json()).then(d => setTransactions(d.transactions ?? [])).finally(() => setTxLoading(false));
            }} className="text-slate-400 hover:text-slate-600 transition-colors">
              <RefreshCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {txLoading ? (
            <div className="space-y-3 animate-pulse">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex justify-between">
                  <div className="h-4 bg-slate-100 rounded w-1/3" />
                  <div className="h-4 bg-slate-100 rounded w-16" />
                </div>
              ))}
            </div>
          ) : transactions.length === 0 ? (
            <p className="text-slate-400 text-sm text-center py-4">No transactions yet</p>
          ) : (
            <div className="divide-y divide-slate-100">
              {transactions.map((tx) => {
                const isCredit = tx.credits_used < 0;
                return (
                  <div key={tx.id} className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-lg flex items-center justify-center ${isCredit ? "bg-emerald-50" : "bg-slate-50"}`}>
                        {isCredit
                          ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                          : <XCircle className="w-3.5 h-3.5 text-slate-400" />}
                      </div>
                      <div>
                        <p className="text-sm text-slate-800 font-medium leading-tight">
                          {ACTION_LABELS[tx.action_type] ?? tx.action_type}
                        </p>
                        <p className="text-[11px] text-slate-400">
                          {new Date(tx.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                          {" · "}{tx.source}
                        </p>
                      </div>
                    </div>
                    <span className={`text-sm font-bold tabular-nums ${isCredit ? "text-emerald-600" : "text-slate-700"}`}>
                      {isCredit ? `+${Math.abs(tx.credits_used)}` : `-${tx.credits_used}`}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ── Right panel ── */}
      <div className="w-72 shrink-0 space-y-4">

        {/* Top-up packs */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5">
          <div className="flex items-center gap-2 mb-4">
            <ShoppingCart className="w-4 h-4 text-blue-500" />
            <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest">Buy Credits</p>
          </div>
          <p className="text-xs text-slate-500 mb-4 leading-relaxed">
            One-time top-ups. Never expire. Stack on top of any plan.
          </p>
          <div className="space-y-2">
            {TOPUP_PACKS.map((pack) => (
              <button
                key={pack.id}
                onClick={() => handleTopUp(pack.id)}
                disabled={purchasing !== null}
                className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all text-left disabled:opacity-60 ${
                  pack.popular
                    ? "border-blue-400 bg-blue-50 hover:bg-blue-100"
                    : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-slate-900">{pack.label}</span>
                    {pack.popular && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-blue-500 text-white font-bold">Best</span>
                    )}
                  </div>
                  <span className="text-xs text-slate-500">+{pack.credits} credits</span>
                </div>
                <div className="text-right">
                  {purchasing === pack.id ? (
                    <span className="w-4 h-4 border-2 border-blue-400/30 border-t-blue-400 rounded-full animate-spin block" />
                  ) : (
                    <span className="text-sm font-bold text-slate-900">{pack.price}</span>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Upgrade to better plan */}
        {!balance?.isFoundingMember && (
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-200 p-5">
            <Crown className="w-6 h-6 text-amber-500 mb-3" />
            <p className="text-sm font-bold text-slate-800 mb-1">Go Founding Member</p>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              150 actions/month, forever. $99 once — no subscriptions, no renewals.
            </p>
            <Link
              href="/pricing"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white text-xs font-bold transition-all shadow-lg shadow-amber-500/20 hover:scale-[1.02]"
            >
              <Crown className="w-3.5 h-3.5" /> Claim your spot
            </Link>
          </div>
        )}

        {/* Need help */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 text-center">
          <p className="text-sm font-medium text-slate-700 mb-1">Questions about billing?</p>
          <a
            href="mailto:support@luminary.app"
            className="text-xs text-blue-500 hover:text-blue-400 transition-colors"
          >
            support@luminary.app
          </a>
        </div>
      </div>
    </div>
  );
}
