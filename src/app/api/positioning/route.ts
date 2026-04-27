import { anthropic } from "@ai-sdk/anthropic";
import { generateObject } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  topCareerDirections: z.array(
    z.object({ title: z.string(), rationale: z.string() })
  ).length(3),
  targetMarkets: z.array(z.string()),
  skillsToStrengthen: z.array(z.string()),
  contentDirections: z.array(z.string()),
});

export async function POST(req: NextRequest) {
  const { rawContent, industry, targetRole } = await req.json();

  const { object } = await generateObject({
    model: anthropic("claude-sonnet-4.6"),
    schema,
    prompt: `You are a strategic career positioning expert. Analyze this LinkedIn profile and provide high-value positioning advice.

PROFILE CONTENT:
${rawContent}
${industry ? `\nINDUSTRY: ${industry}` : ""}
${targetRole ? `\nSTATED TARGET: ${targetRole}` : ""}

Deliver:
1. topCareerDirections: 3 distinct career/business directions this person is uniquely positioned for, with specific rationale based on their background.
2. targetMarkets: 4-6 specific market segments or company types most likely to hire/engage them.
3. skillsToStrengthen: 4-5 skills or credentials that would unlock significantly higher-value opportunities.
4. contentDirections: 4-5 specific content pillars they should build to attract their target audience.

Be specific to this person's actual background. No generic career advice.`,
  });

  return NextResponse.json(object);
}
