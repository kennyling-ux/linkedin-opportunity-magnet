import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  caseStudies: z.array(
    z.object({
      title: z.string(),
      background: z.string(),
      problem: z.string(),
      solution: z.string(),
      process: z.string(),
      results: z.string(),
      metrics: z.array(z.string()),
    })
  ),
  missingEvidence: z.array(z.string()),
  contentToAdd: z.array(z.string()),
  suggestedConnections: z.array(z.string()),
});

export async function POST(req: NextRequest) {
  const { rawContent, industry } = await req.json();

  const { object } = await generateObject({
    model: google("gemini-2.5-flash"),
    schema,
    prompt: `You are a consultant-level credibility strategist. Transform this LinkedIn profile into compelling case studies and identify credibility gaps.

PROFILE CONTENT:
${rawContent}
${industry ? `\nINDUSTRY: ${industry}` : ""}

Tasks:
1. Extract 2-3 projects/roles and reframe them as consultant-grade case studies with: background, problem, solution, process, results, and measurable metrics.
2. If numbers aren't explicit, derive reasonable relative metrics from context ("reduced onboarding time", "increased team output").
3. missingEvidence: list specific types of proof this profile lacks (e.g., "No client testimonials", "No portfolio links", "No published thought leadership").
4. contentToAdd: specific content they should create or add to increase trust (e.g., "A case study PDF on [specific project]", "Video testimonial from [role type]").
5. suggestedConnections: types of people they should connect with to build credibility (e.g., "Industry analysts in [field]", "Clients from [sector]").

Do NOT invent specific numbers. Use qualitative language if data is absent.`,
  });

  return NextResponse.json(object);
}
