import { Webhook } from "svix";
import { headers } from "next/headers";
import { supabaseAdmin } from "@/lib/supabase";
import { grantSignupBonus } from "@/lib/credits";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.text();
  const headersList = await headers();

  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET!);
  let event: { type: string; data: { id: string; email_addresses: { email_address: string }[]; first_name?: string; last_name?: string } };

  try {
    event = wh.verify(body, {
      "svix-id":        headersList.get("svix-id") ?? "",
      "svix-timestamp": headersList.get("svix-timestamp") ?? "",
      "svix-signature": headersList.get("svix-signature") ?? "",
    }) as typeof event;
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type !== "user.created") {
    return NextResponse.json({ received: true });
  }

  const { id, email_addresses, first_name, last_name } = event.data;
  const email = email_addresses[0]?.email_address ?? "";
  const name = [first_name, last_name].filter(Boolean).join(" ") || null;

  // Country from Vercel's edge header (set on the webhook call from Clerk — may be absent)
  const country = headersList.get("x-vercel-ip-country") ?? null;
  const city = headersList.get("x-vercel-ip-city") ?? null;

  // Create user row
  await supabaseAdmin.from("users").upsert(
    { id, email, name, country, city, created_at: new Date().toISOString() },
    { onConflict: "id" }
  );

  // Create empty credits row
  await supabaseAdmin.from("user_credits").upsert(
    { user_id: id, subscription_credits: 0, topup_credits: 0 },
    { onConflict: "user_id" }
  );

  // Grant 5 free signup credits
  await grantSignupBonus(id);

  return NextResponse.json({ received: true });
}
