import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { verifyWebhookSignature, parsePlanFromReference, PLANS } from "@/lib/hitpay";

export async function POST(req: Request) {
  const text = await req.text();
  const params = Object.fromEntries(new URLSearchParams(text));
  const hmac = params.hmac ?? "";

  if (!verifyWebhookSignature(params, hmac)) {
    console.error("[hitpay/webhook] Invalid HMAC signature");
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const { status, reference_number, payment_id, amount, currency } = params;

  if (status !== "completed") {
    return NextResponse.json({ received: true });
  }

  const parsed = parsePlanFromReference(reference_number ?? "");
  if (!parsed) {
    console.error("[hitpay/webhook] Unrecognised reference:", reference_number);
    return NextResponse.json({ error: "Unknown reference" }, { status: 400 });
  }

  const { planId, userId } = parsed;
  const plan = PLANS[planId];

  try {
    // ── Lifetime / Founding Member ─────────────────────────────────────────
    if (planId === "lifetime") {
      // Check cap
      const { data: cfg } = await supabaseAdmin
        .from("app_config")
        .select("value")
        .eq("key", "lifetime_deal_open")
        .single();

      if (cfg?.value !== "true") {
        console.warn("[hitpay/webhook] Lifetime deal closed, refund needed for", userId);
        return NextResponse.json({ received: true });
      }

      await Promise.all([
        supabaseAdmin.from("lifetime_deals").upsert(
          { user_id: userId, hitpay_payment_ref: payment_id, is_active: true },
          { onConflict: "user_id" }
        ),
        // Increment counter
        supabaseAdmin.rpc("increment_app_config_int", { config_key: "lifetime_deal_count", increment_by: 1 }),
      ]);

      // Auto-close if cap reached
      const { data: count } = await supabaseAdmin
        .from("app_config")
        .select("value")
        .eq("key", "lifetime_deal_count")
        .single();

      const { data: cap } = await supabaseAdmin
        .from("app_config")
        .select("value")
        .eq("key", "lifetime_deal_cap")
        .single();

      if (count && cap && parseInt(count.value) >= parseInt(cap.value)) {
        await supabaseAdmin
          .from("app_config")
          .update({ value: "false" })
          .eq("key", "lifetime_deal_open");
      }

      return NextResponse.json({ received: true });
    }

    // ── Credit Top-up Packs ────────────────────────────────────────────────
    if (planId.startsWith("topup_")) {
      await Promise.all([
        supabaseAdmin.rpc("add_topup_credits", { p_user_id: userId, p_credits: plan.credits }),
        supabaseAdmin.from("credit_transactions").insert({
          user_id: userId,
          action_type: `topup_${planId}`,
          credits_used: -plan.credits,
          source: "topup",
          metadata: { payment_id, amount, currency },
        }),
      ]);
      return NextResponse.json({ received: true });
    }

    // ── Subscriptions (monthly / annual) ──────────────────────────────────
    const isAnnual = planId.endsWith("_annual");
    const planType = planId.startsWith("starter") ? "starter" : "agency";
    const now = new Date();
    const periodEnd = new Date(now);
    periodEnd.setMonth(periodEnd.getMonth() + (isAnnual ? 12 : 1));

    await Promise.all([
      // Upsert subscription row
      supabaseAdmin.from("subscriptions").upsert(
        {
          user_id: userId,
          plan_type: planType,
          billing_cycle: isAnnual ? "annual" : "monthly",
          status: "active",
          hitpay_payment_ref: payment_id,
          current_period_start: now.toISOString(),
          current_period_end: periodEnd.toISOString(),
        },
        { onConflict: "user_id" }
      ),
      // Reset / assign subscription credits
      supabaseAdmin.from("user_credits").upsert(
        { user_id: userId, subscription_credits: plan.credits, last_reset_at: now.toISOString() },
        { onConflict: "user_id" }
      ),
      supabaseAdmin.from("credit_transactions").insert({
        user_id: userId,
        action_type: "subscription_activated",
        credits_used: -plan.credits,
        source: "subscription",
        metadata: { plan_id: planId, payment_id, amount },
      }),
    ]);

  } catch (err) {
    console.error("[hitpay/webhook] Handler error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
