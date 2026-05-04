import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { deductCredits, type CreditAction } from "@/lib/credits";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { action } = (await req.json()) as { action: CreditAction };
  if (!action) return NextResponse.json({ error: "Missing action" }, { status: 400 });

  const result = await deductCredits(userId, action);

  if (!result.success) {
    const status = result.error === "insufficient_credits" ? 402 : 429;
    return NextResponse.json({ error: result.error }, { status });
  }

  return NextResponse.json({ success: true, remaining: result.remaining });
}
