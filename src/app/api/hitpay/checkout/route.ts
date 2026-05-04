import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { createPaymentLink, type PlanId } from "@/lib/hitpay";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { planId } = (await req.json()) as { planId: PlanId };
  if (!planId) return NextResponse.json({ error: "Missing planId" }, { status: 400 });

  // Get user email from Supabase
  const { data: user } = await supabaseAdmin
    .from("users")
    .select("email")
    .eq("id", userId)
    .single();

  const email = user?.email ?? "";
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
  const redirectUrl = `${appUrl}/dashboard?payment=success&plan=${planId}`;

  try {
    const { url } = await createPaymentLink({ planId, userId, email, redirectUrl });
    return NextResponse.json({ url });
  } catch (err) {
    console.error("[hitpay/checkout]", err);
    return NextResponse.json({ error: "Failed to create payment link" }, { status: 500 });
  }
}
