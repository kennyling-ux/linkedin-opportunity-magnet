import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { getCreditBalance } from "@/lib/credits";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const [balance, subscription] = await Promise.all([
    getCreditBalance(userId),
    supabaseAdmin
      .from("subscriptions")
      .select("plan_type, billing_cycle, status, current_period_end")
      .eq("user_id", userId)
      .eq("status", "active")
      .maybeSingle(),
  ]);

  return NextResponse.json({
    ...balance,
    subscription: subscription.data ?? null,
  });
}
