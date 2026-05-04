import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function GET() {
  const { data } = await supabaseAdmin
    .from("app_config")
    .select("key, value")
    .in("key", ["lifetime_deal_count", "lifetime_deal_cap", "lifetime_deal_open", "lifetime_deal_deadline"]);

  const config = Object.fromEntries((data ?? []).map((r) => [r.key, r.value]));

  return NextResponse.json({
    count: config.lifetime_deal_count ?? "0",
    cap:   config.lifetime_deal_cap   ?? "200",
    open:  config.lifetime_deal_open  ?? "true",
    deadline: config.lifetime_deal_deadline ?? null,
  });
}
