import { anthropic } from "@ai-sdk/anthropic";
import { generateObject } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  headlines: z.array(
    z.object({
      style: z.enum(["authority", "outcome", "niche"]),
      label: z.string(),
      text: z.string(),
    })
  ).length(3),
  aboutOriginal: z.string(),
  aboutOptimized: z.string(),
  experienceRewrites: z.array(
    z.object({ original: z.string(), optimized: z.string() })
  ),
  keywords: z.array(z.string()),
});

export async function POST(req: NextRequest) {
  const { rawContent, industry, targetRole } = await req.json();

  const { object } = await generateObject({
    model: anthropic("claude-sonnet-4.6"),
    schema,
    prompt: `You are a world-class LinkedIn profile optimizer. Rewrite the following profile content to maximize opportunity attraction.

PROFILE CONTENT:
${rawContent}
${industry ? `\nINDUSTRY: ${industry}` : ""}
${targetRole ? `\nTARGET: ${targetRole}` : ""}

Rules:
- Headlines: "authority" = establishes expertise, "outcome" = focuses on results for others, "niche" = super-specific positioning
- About: rewrite to open with a hook, include proof points, end with a clear call-to-action. Keep the person's voice.
- Experience: rewrite each role with quantified outcomes. Format: [Action] [Result] [Scale/Context].
- Keywords: 10-15 high-value search terms for this profile's target audience.
- Do NOT invent data. Enhance what exists. If numbers aren't given, use relative language ("significantly", "consistently").
- Extract the About section and each Experience entry separately from the raw content.`,
  });

  return NextResponse.json(object);
}
