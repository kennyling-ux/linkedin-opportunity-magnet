import { anthropic } from "@ai-sdk/anthropic";
import { generateObject } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  scores: z.object({
    visibility: z.number().min(0).max(100),
    credibility: z.number().min(0).max(100),
    positioning: z.number().min(0).max(100),
    overall: z.number().min(0).max(100),
    opportunityLevel: z.enum(["low", "medium", "high"]),
    opportunityReason: z.string(),
    opportunityImprovements: z.array(z.string()).length(3),
  }),
  gaps: z.object({
    missingElements: z.array(z.string()),
    contentGaps: z.array(z.string()),
    visibilityIssues: z.array(z.string()),
    credibilityIssues: z.array(z.string()),
  }),
  suggestedIndustry: z.string(),
  suggestedTargetRoles: z.array(z.string()).length(3),
  suggestedAudience: z.string(),
});

export async function POST(req: NextRequest) {
  const { rawContent, industry, targetRole } = await req.json();

  if (!rawContent?.trim()) {
    return NextResponse.json({ error: "LinkedIn content is required" }, { status: 400 });
  }

  const { object } = await generateObject({
    model: anthropic("claude-sonnet-4.6"),
    schema,
    prompt: `You are an expert LinkedIn profile analyst and personal branding strategist.

Analyze the following LinkedIn profile content comprehensively.

LINKEDIN PROFILE CONTENT:
${rawContent}
${industry ? `\nSTATED INDUSTRY: ${industry}` : ""}
${targetRole ? `\nTARGET ROLE: ${targetRole}` : ""}

Scoring criteria:
- visibility (0-100): keyword density, searchability, profile completeness, headline strength
- credibility (0-100): quantified achievements, social proof, evidence of results
- positioning (0-100): clarity of value proposition, niche specificity, differentiation
- overall: weighted average (visibility 30%, credibility 35%, positioning 35%)
- opportunityLevel: low (<50), medium (50-74), high (75+)

Be brutally honest and specific. No generic advice. All feedback must be actionable.`,
  });

  return NextResponse.json(object);
}
