import { supabaseAdmin } from "./supabase";

export type CreditAction =
  | "profile_analysis"
  | "headline_rewrite"
  | "about_rewrite"
  | "post_generation"
  | "full_profile_overhaul"
  | "signup_bonus";

export const CREDIT_COSTS: Record<CreditAction, number> = {
  profile_analysis:     1,
  headline_rewrite:     2,
  about_rewrite:        2,
  post_generation:      1,
  full_profile_overhaul: 5,
  signup_bonus:         0, // granting, not spending
};

export const LIFETIME_MONTHLY_CAP = 150;

export interface CreditBalance {
  subscriptionCredits: number;
  topupCredits: number;
  total: number;
  isFoundingMember: boolean;
  lifetimeActionsThisMonth: number;
}

export async function getCreditBalance(userId: string): Promise<CreditBalance | null> {
  const [creditsResult, lifetimeResult] = await Promise.all([
    supabaseAdmin
      .from("user_credits")
      .select("subscription_credits, topup_credits, lifetime_actions_this_month, last_reset_at")
      .eq("user_id", userId)
      .single(),
    supabaseAdmin
      .from("lifetime_deals")
      .select("is_active")
      .eq("user_id", userId)
      .eq("is_active", true)
      .maybeSingle(),
  ]);

  if (creditsResult.error && creditsResult.error.code !== "PGRST116") return null;

  const credits = creditsResult.data;
  const isFoundingMember = !!lifetimeResult.data;

  // Reset lifetime monthly counter if it's a new month
  if (credits && isFoundingMember) {
    const lastReset = new Date(credits.last_reset_at);
    const now = new Date();
    if (lastReset.getMonth() !== now.getMonth() || lastReset.getFullYear() !== now.getFullYear()) {
      await supabaseAdmin
        .from("user_credits")
        .update({ lifetime_actions_this_month: 0, last_reset_at: now.toISOString() })
        .eq("user_id", userId);
      if (credits) credits.lifetime_actions_this_month = 0;
    }
  }

  return {
    subscriptionCredits: credits?.subscription_credits ?? 0,
    topupCredits: credits?.topup_credits ?? 0,
    total: (credits?.subscription_credits ?? 0) + (credits?.topup_credits ?? 0),
    isFoundingMember,
    lifetimeActionsThisMonth: credits?.lifetime_actions_this_month ?? 0,
  };
}

export type DeductResult =
  | { success: true; remaining: number }
  | { success: false; error: "insufficient_credits" | "fair_use_limit" | "not_found" };

export async function deductCredits(userId: string, action: CreditAction): Promise<DeductResult> {
  const balance = await getCreditBalance(userId);
  if (!balance) return { success: false, error: "not_found" };

  const cost = CREDIT_COSTS[action];

  // Founding Member path
  if (balance.isFoundingMember) {
    if (balance.lifetimeActionsThisMonth >= LIFETIME_MONTHLY_CAP) {
      return { success: false, error: "fair_use_limit" };
    }
    await Promise.all([
      supabaseAdmin
        .from("user_credits")
        .update({ lifetime_actions_this_month: balance.lifetimeActionsThisMonth + 1 })
        .eq("user_id", userId),
      supabaseAdmin.from("credit_transactions").insert({
        user_id: userId,
        action_type: action,
        credits_used: 1,
        source: "lifetime",
      }),
    ]);
    return { success: true, remaining: LIFETIME_MONTHLY_CAP - balance.lifetimeActionsThisMonth - 1 };
  }

  // Standard credit path
  if (balance.total < cost) return { success: false, error: "insufficient_credits" };

  // Deduct subscription credits first, then topup
  let subDeduct = Math.min(cost, balance.subscriptionCredits);
  let topupDeduct = cost - subDeduct;

  await Promise.all([
    supabaseAdmin
      .from("user_credits")
      .update({
        subscription_credits: balance.subscriptionCredits - subDeduct,
        topup_credits: balance.topupCredits - topupDeduct,
      })
      .eq("user_id", userId),
    supabaseAdmin.from("credit_transactions").insert({
      user_id: userId,
      action_type: action,
      credits_used: cost,
      source: subDeduct > 0 ? "subscription" : "topup",
    }),
  ]);

  return { success: true, remaining: balance.total - cost };
}

export async function grantSignupBonus(userId: string): Promise<void> {
  // Idempotent — only grants once
  const { data: user } = await supabaseAdmin
    .from("users")
    .select("signup_bonus_claimed")
    .eq("id", userId)
    .single();

  if (!user || user.signup_bonus_claimed) return;

  await Promise.all([
    supabaseAdmin
      .from("user_credits")
      .upsert({ user_id: userId, topup_credits: 5 }, { onConflict: "user_id" }),
    supabaseAdmin
      .from("users")
      .update({ signup_bonus_claimed: true })
      .eq("id", userId),
    supabaseAdmin.from("credit_transactions").insert({
      user_id: userId,
      action_type: "signup_bonus",
      credits_used: -5,
      source: "signup_bonus",
    }),
  ]);
}
