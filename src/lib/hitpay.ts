import crypto from "crypto";

const API_KEY = process.env.HITPAY_API_KEY!;
const BASE_URL = process.env.HITPAY_API_URL ?? "https://api.hit-pay.com/v1";
const WEBHOOK_SALT = process.env.HITPAY_WEBHOOK_SALT!;

export const PLANS = {
  starter_monthly:  { name: "Starter Monthly",  amount: "12.00",  currency: "USD", credits: 20 },
  starter_annual:   { name: "Starter Annual",   amount: "99.00",  currency: "USD", credits: 20 },
  agency_monthly:   { name: "Agency Monthly",   amount: "39.00",  currency: "USD", credits: 80 },
  agency_annual:    { name: "Agency Annual",    amount: "319.00", currency: "USD", credits: 80 },
  lifetime:         { name: "Founding Member",  amount: "99.00",  currency: "USD", credits: -1 }, // -1 = unlimited
  topup_boost:      { name: "Boost Pack +10",   amount: "5.00",   currency: "USD", credits: 10 },
  topup_power:      { name: "Power Pack +30",   amount: "12.00",  currency: "USD", credits: 30 },
  topup_mega:       { name: "Mega Pack +80",    amount: "25.00",  currency: "USD", credits: 80 },
} as const;

export type PlanId = keyof typeof PLANS;

interface HitPayPaymentLinkResponse {
  id: string;
  name: string;
  url: string;
  active: boolean;
}

export async function createPaymentLink(params: {
  planId: PlanId;
  userId: string;
  email: string;
  redirectUrl: string;
}): Promise<{ url: string; paymentId: string }> {
  const plan = PLANS[params.planId];

  const body = new URLSearchParams({
    amount: plan.amount,
    currency: plan.currency,
    name: plan.name,
    redirect_url: params.redirectUrl,
    webhook: `${process.env.NEXT_PUBLIC_APP_URL}/api/hitpay/webhook`,
    reference_number: `${params.planId}__${params.userId}`,
    email: params.email,
  });

  const res = await fetch(`${BASE_URL}/payment-requests`, {
    method: "POST",
    headers: {
      "X-BUSINESS-API-KEY": API_KEY,
      "Content-Type": "application/x-www-form-urlencoded",
      "X-Requested-With": "XMLHttpRequest",
    },
    body: body.toString(),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`HitPay error: ${err}`);
  }

  const data = (await res.json()) as { id: string; url: string };
  return { url: data.url, paymentId: data.id };
}

// Verify HitPay webhook HMAC signature
export function verifyWebhookSignature(payload: Record<string, string>, hmac: string): boolean {
  const sortedKeys = Object.keys(payload).sort();
  const message = sortedKeys
    .filter((k) => k !== "hmac")
    .map((k) => `${k}${payload[k]}`)
    .join("");
  const expected = crypto.createHmac("sha256", WEBHOOK_SALT).update(message).digest("hex");
  return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(hmac));
}

// Parse plan info from HitPay reference_number field
export function parsePlanFromReference(reference: string): { planId: PlanId; userId: string } | null {
  const parts = reference.split("__");
  if (parts.length !== 2) return null;
  const [planId, userId] = parts;
  if (!(planId in PLANS)) return null;
  return { planId: planId as PlanId, userId };
}
