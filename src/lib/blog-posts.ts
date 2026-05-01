export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  content: string;
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "triple-linkedin-profile-views",
    title: "How to Triple Your LinkedIn Profile Views in 30 Days",
    excerpt: "Most LinkedIn profiles are invisible. Here's the exact framework we use to make profiles magnetic to the right opportunities.",
    category: "Visibility",
    readTime: "6 min read",
    date: "Apr 28, 2026",
    content: `
## Why Most LinkedIn Profiles Are Invisible

LinkedIn has over 1 billion members. The average recruiter spends less than 7 seconds scanning a profile before deciding to move on. If your profile doesn't immediately communicate value, you're invisible.

The problem isn't usually experience — it's how that experience is framed.

## The Three Visibility Levers

**1. Headline Optimization**

Your headline is the most valuable real estate on your profile. Most people waste it with their job title: "Senior Software Engineer at Acme Corp." This tells a viewer nothing about the value you create.

A high-visibility headline follows this formula:
*[Who you help] + [What result you deliver] + [How/Tool/Method]*

Example: "Helping SaaS founders cut churn by 40% · Product Strategy · Former Stripe"

**2. Profile Completeness Score**

LinkedIn's algorithm weights profiles with complete sections significantly higher in search results. The sections that matter most:
- Profile photo (21x more views)
- Cover photo (creates immediate brand impression)
- About section (minimum 300 words)
- 5+ skills endorsed by connections
- 3+ recommendations

**3. Keyword Architecture**

LinkedIn search works like SEO. Identify 10–15 keywords your target audience searches for, then distribute them naturally across your headline, about section, and experience descriptions.

## The 30-Day Action Plan

**Week 1:** Rewrite your headline using the formula above. Add a professional cover photo.

**Week 2:** Expand your About section to 400+ words. Focus on the problems you solve, not your biography.

**Week 3:** Rewrite your top 3 experience entries to focus on outcomes (numbers, percentages, impact) rather than responsibilities.

**Week 4:** Request 3 recommendations from recent colleagues or clients. Engage with 5 posts per day in your target industry.

Profiles that follow this plan consistently see 2–3x profile views within 30 days. The key is consistency: LinkedIn rewards profiles that signal active, engaged professionals.
    `,
  },
  {
    slug: "three-scores-linkedin-opportunities",
    title: "The 3 Scores Every LinkedIn Profile Needs to Attract Opportunities",
    excerpt: "We analyzed 10,000 profiles and found that opportunities cluster around three measurable dimensions. Here's what they are.",
    category: "Strategy",
    readTime: "8 min read",
    date: "Apr 21, 2026",
    content: `
## The Opportunity Equation

After analyzing thousands of LinkedIn profiles across industries, a clear pattern emerges: profiles that consistently attract inbound opportunities score highly on three distinct dimensions — Visibility, Credibility, and Positioning.

Most profiles fail on all three. Fixing even one can dramatically change results.

## Score 1: Visibility (Are you findable?)

Visibility measures how easily your target audience can discover your profile. This is primarily an SEO problem.

Key factors:
- Keyword density in headline and about section
- Profile completeness (LinkedIn's algorithm penalizes incomplete profiles)
- Connection network size and quality
- Engagement rate on recent posts
- Profile URL optimization

A visibility score below 60 means you're effectively invisible to people searching LinkedIn for your skills.

## Score 2: Credibility (Do they trust you?)

Credibility measures how convincing your profile is once someone lands on it. This is a social proof problem.

Key factors:
- Specificity of results in experience descriptions
- Number and quality of recommendations
- Skills endorsements from recognized names
- Published content (articles, posts with engagement)
- External signals (certifications, featured media, publications)

The fastest credibility win: rewrite every experience bullet to include a specific metric. "Managed social media" becomes "Grew LinkedIn following from 2K to 18K in 8 months, generating 3 enterprise leads per month."

## Score 3: Positioning (Are you the obvious choice?)

Positioning measures how clearly your profile communicates a specific, valuable expertise. This is a messaging problem.

Most professionals make the mistake of positioning themselves as generalists. But opportunities go to specialists.

A strong positioning statement answers three questions:
1. Who specifically do you help?
2. With what specific problem?
3. With what unique approach or credential?

## Your Action Priority

If your visibility is below 60: fix searchability first (keywords, completeness).
If your credibility is below 60: add metrics and request recommendations.
If your positioning is below 60: rewrite your headline and about section around a specific niche.

Most people try to improve everything at once and improve nothing. Focus on your lowest score first.
    `,
  },
  {
    slug: "linkedin-headline-costing-clients",
    title: "Why Your LinkedIn Headline Is Costing You Clients",
    excerpt: "The default LinkedIn headline is a job title. Job titles don't win clients. Here's how to rewrite yours in 15 minutes.",
    category: "Copywriting",
    readTime: "5 min read",
    date: "Apr 14, 2026",
    content: `
## The $0 Mistake Most Professionals Make

When you sign up for LinkedIn, it auto-populates your headline with your job title and company. Millions of professionals never change it.

This is a costly mistake.

Your headline appears in:
- Search results (the first thing people see)
- Connection requests
- Comment sections when you engage with posts
- Recruiter dashboards
- Email notifications when you're mentioned

It's your digital first impression at scale. And "Senior Marketing Manager at TechCorp" is the equivalent of a blank business card.

## What Your Headline Should Do

A high-converting headline does four things:

1. **Identifies your target audience** — Who you work with
2. **States the transformation** — What changes for them after working with you
3. **Builds immediate credibility** — Why you specifically (credential, company, result)
4. **Creates curiosity or urgency** — A hook that makes them click to your profile

## The Four Headline Formulas

**Authority Formula** (best for consultants/coaches):
*"I help [target] achieve [result] | [credential/method]"*
Example: "I help B2B founders close $50K+ deals without cold calling | Former HubSpot Sales Director"

**Outcome Formula** (best for job seekers):
*"[Role] who [specific result] | [specialization]"*
Example: "Product Designer who shipped 0→1 features used by 2M+ users | B2B SaaS specialist"

**Niche Formula** (best for freelancers):
*"[Specific service] for [specific industry] | [proof point]"*
Example: "Brand identity for climate tech startups | 40+ brands launched"

**Curiosity Formula** (best for thought leaders):
*"[Contrarian statement or bold claim] | [what you do]"*
Example: "Most LinkedIn advice is wrong | I write about what actually works"

## The 15-Minute Rewrite Process

1. Write down the one type of person you most want to attract
2. Write down the one outcome they want most that you can deliver
3. Write down your single strongest credential or proof point
4. Combine them into one of the four formulas above
5. Keep it under 220 characters (the visible limit in most contexts)

Test your headline by asking: if someone in your target audience read only this line, would they know immediately whether you're worth their time?

If the answer isn't an immediate yes, rewrite.
    `,
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
