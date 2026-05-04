"use client";

import { useEffect, useState, useCallback } from "react";
import { useUser } from "@clerk/nextjs";

export interface CreditBalance {
  subscriptionCredits: number;
  topupCredits: number;
  total: number;
  isFoundingMember: boolean;
  lifetimeActionsThisMonth: number;
  subscription: {
    plan_type: "starter" | "agency";
    billing_cycle: "monthly" | "annual";
    status: string;
    current_period_end: string;
  } | null;
}

export function useCredits() {
  const { isSignedIn } = useUser();
  const [balance, setBalance] = useState<CreditBalance | null>(null);
  const [loading, setLoading] = useState(false);

  const refetch = useCallback(async () => {
    if (!isSignedIn) return;
    setLoading(true);
    try {
      const res = await fetch("/api/credits/balance");
      if (res.ok) setBalance(await res.json());
    } finally {
      setLoading(false);
    }
  }, [isSignedIn]);

  useEffect(() => { refetch(); }, [refetch]);

  return { balance, loading, refetch };
}
