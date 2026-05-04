import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Mark cancelled in DB — subscription credits zero out, topup credits preserved
  const { error } = await supabaseAdmin
    .from("subscriptions")
    .update({ status: "cancelled" })
    .eq("user_id", userId)
    .eq("status", "active");

  if (error) {
    console.error("[subscriptions/cancel]", error);
    return NextResponse.json({ error: "Failed to cancel" }, { status: 500 });
  }

  // Zero out subscription credits immediately; topup credits stay
  await supabaseAdmin
    .from("user_credits")
    .update({ subscription_credits: 0 })
    .eq("user_id", userId);

  return NextResponse.json({ success: true });
}
