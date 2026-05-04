"use client";

import { Zap, Crown, ShoppingCart, AlertTriangle } from "lucide-react";
import Link from "next/link";
import { useCredits } from "@/hooks/useCredits";

export function CreditWidget() {
  const { balance, loading } = useCredits();

  if (loading || !balance) {
    return (
      <div className="mx-3 mb-3 p-3 rounded-xl bg-slate-50 border border-slate-200 animate-pulse">
        <div className="h-3 bg-slate-200 rounded w-1/2 mb-2" />
        <div className="h-5 bg-slate-200 rounded w-3/4" />
      </div>
    );
  }

  // Founding Member
  if (balance.isFoundingMember) {
    const used = balance.lifetimeActionsThisMonth;
    const pct = Math.round((used / 150) * 100);
    return (
      <div className="mx-3 mb-3 p-3 rounded-xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200">
        <div className="flex items-center gap-1.5 mb-2">
          <Crown className="w-3.5 h-3.5 text-amber-500" />
          <span className="text-xs font-bold text-amber-700">Founding Member</span>
        </div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[11px] text-amber-600">Monthly actions</span>
          <span className="text-[11px] font-semibold text-amber-800">{used} / 150</span>
        </div>
        <div className="h-1.5 rounded-full bg-amber-200 overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-400 transition-all duration-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    );
  }

  const total = balance.total;
  const isLow = total <= 3;
  const isEmpty = total === 0;

  return (
    <div className={`mx-3 mb-3 p-3 rounded-xl border transition-colors ${
      isEmpty ? "bg-red-50 border-red-200" :
      isLow  ? "bg-amber-50 border-amber-200" :
               "bg-slate-50 border-slate-200"
    }`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <Zap className={`w-3.5 h-3.5 ${isEmpty ? "text-red-500" : isLow ? "text-amber-500" : "text-blue-500"}`} />
          <span className={`text-xs font-semibold ${isEmpty ? "text-red-700" : isLow ? "text-amber-700" : "text-slate-700"}`}>
            Credits
          </span>
        </div>
        <span className={`text-sm font-bold tabular-nums ${isEmpty ? "text-red-600" : isLow ? "text-amber-600" : "text-slate-900"}`}>
          {total}
        </span>
      </div>

      {(balance.subscriptionCredits > 0 || balance.topupCredits > 0) && (
        <div className="flex gap-3 mb-2">
          {balance.subscriptionCredits > 0 && (
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span className="text-[10px] text-slate-500">{balance.subscriptionCredits} plan</span>
            </div>
          )}
          {balance.topupCredits > 0 && (
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
              <span className="text-[10px] text-slate-500">{balance.topupCredits} top-up</span>
            </div>
          )}
        </div>
      )}

      {isEmpty && (
        <p className="text-[10px] text-red-600 mb-2 flex items-center gap-1">
          <AlertTriangle className="w-3 h-3" /> No credits left
        </p>
      )}
      {isLow && !isEmpty && (
        <p className="text-[10px] text-amber-600 mb-2">Running low</p>
      )}

      <Link
        href="/dashboard/billing"
        className={`flex items-center justify-center gap-1.5 w-full py-1.5 rounded-lg text-[11px] font-semibold transition-all ${
          isEmpty ? "bg-red-500 hover:bg-red-400 text-white" :
          isLow  ? "bg-amber-500 hover:bg-amber-400 text-white" :
                   "bg-white hover:bg-slate-100 text-slate-700 border border-slate-200"
        }`}
      >
        <ShoppingCart className="w-3 h-3" />
        {isEmpty ? "Buy credits" : isLow ? "Top up" : "Manage credits"}
      </Link>
    </div>
  );
}
