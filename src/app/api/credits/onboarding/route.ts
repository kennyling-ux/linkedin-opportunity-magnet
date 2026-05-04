import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { grantSignupBonus } from "@/lib/credits";

export async function POST() {
  const { userId } = await auth();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  await grantSignupBonus(userId);
  return NextResponse.json({ success: true });
}
