import { google } from "@ai-sdk/google";
import { generateObject } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const topicsSchema = z.object({
  topics: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      angle: z.string(),
      estimatedEngagement: z.enum(["high", "medium", "standard"]),
    })
  ).min(20).max(35),
});

const postSchema = z.object({
  content: z.string(),
});

export async function POST(req: NextRequest) {
  const { rawContent, industry, targetRole, action, topicTitle, topicAngle, tone } =
    await req.json();

  if (action === "generate-post") {
    const { object } = await generateObject({
      model: google("gemini-2.5-flash"),
      schema: postSchema,
      prompt: `You are a LinkedIn content expert who writes posts that generate real business opportunities.

Write a LinkedIn post for:
TOPIC: ${topicTitle}
ANGLE: ${topicAngle}
TONE: ${tone} (professional=formal insights | educational=teach something | viral=strong opinion/story | engagement=question/discussion)
PROFILE CONTEXT: ${rawContent?.slice(0, 500) || ""}
${industry ? `INDUSTRY: ${industry}` : ""}

Rules:
- Open with a hook that stops the scroll (no "I'm excited to share" openings)
- No hashtag spam (max 3 relevant hashtags at end)
- Include a specific insight, story, or data point
- End with one clear call to action or thought-provoking question
- Length: 150-300 words
- No bullet point walls — use white space and short paragraphs`,
    });
    return NextResponse.json(object);
  }

  const { object } = await generateObject({
    model: google("gemini-2.5-flash"),
    schema: topicsSchema,
    prompt: `You are a LinkedIn content strategist. Generate 30 high-value post topics for this professional.

PROFILE CONTENT:
${rawContent}
${industry ? `\nINDUSTRY: ${industry}` : ""}
${targetRole ? `\nTARGET AUDIENCE: ${targetRole}` : ""}

Rules:
- Mix: 10 thought leadership, 8 educational/how-to, 7 personal story/lesson, 5 contrarian takes
- Each topic must be specific to this person's expertise — no generic topics
- estimatedEngagement: "high" = contrarian/story/strong POV, "medium" = educational, "standard" = informational
- angle: one sentence describing the unique hook or perspective
- id: use format "topic-1" through "topic-30"`,
  });

  return NextResponse.json(object);
}
