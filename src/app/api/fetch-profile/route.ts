import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 60;

interface Experience {
  title?: string;
  companyName?: string;
  jobDescription?: string;
  jobStartedOn?: string;
  jobEndedOn?: string | null;
  jobStillWorking?: boolean;
}

interface Education {
  title?: string;
  subtitle?: string;
  period?: { startedOn?: string | null; endedOn?: string | null };
}

interface Certificate {
  name?: string;
  title?: string;
}

interface Profile {
  firstName?: string;
  lastName?: string;
  fullName?: string;
  headline?: string;
  about?: string;
  addressWithoutCountry?: string;
  addressCountryOnly?: string;
  experiences?: Experience[];
  educations?: Education[];
  skills?: string[];
  licenseAndCertificates?: Certificate[];
}

function buildRawContent(p: Profile): string {
  const sections: string[] = [];

  const name = p.fullName || [p.firstName, p.lastName].filter(Boolean).join(" ");
  if (name) sections.push(`Name: ${name}`);
  if (p.headline) sections.push(`Headline: ${p.headline}`);

  const loc = p.addressWithoutCountry || p.addressCountryOnly;
  if (loc) sections.push(`Location: ${loc}`);

  if (p.about) sections.push(`\nAbout:\n${p.about}`);

  if (p.experiences?.length) {
    const lines = p.experiences.map((e) => {
      const start = e.jobStartedOn || "";
      const end = e.jobStillWorking ? "Present" : (e.jobEndedOn || "Present");
      const period = start ? `(${start} – ${end})` : "";
      const header = `${e.title || "Role"} at ${e.companyName || "Company"} ${period}`.trim();
      return e.jobDescription ? `${header}\n${e.jobDescription}` : header;
    });
    sections.push(`\nExperience:\n${lines.join("\n\n")}`);
  }

  if (p.educations?.length) {
    const lines = p.educations.map((e) => {
      const subtitle = e.subtitle && e.subtitle !== "null, null" ? e.subtitle : "";
      const start = e.period?.startedOn;
      const end = e.period?.endedOn;
      const years = start || end ? `(${[start, end].filter(Boolean).join(" – ")})` : "";
      return [e.title, subtitle, years].filter(Boolean).join(" — ");
    });
    sections.push(`\nEducation:\n${lines.join("\n")}`);
  }

  if (p.skills?.length) {
    const skillList = p.skills.slice(0, 30).join(", ");
    if (skillList) sections.push(`\nSkills:\n${skillList}`);
  }

  if (p.licenseAndCertificates?.length) {
    const certs = p.licenseAndCertificates.map((c) => c.name || c.title).filter(Boolean);
    if (certs.length) sections.push(`\nCertifications:\n${certs.join("\n")}`);
  }

  return sections.join("\n");
}

export async function POST(req: NextRequest) {
  const { url } = await req.json() as { url: string };

  if (!url || !url.includes("linkedin.com/in/")) {
    return NextResponse.json({ error: "Invalid LinkedIn URL" }, { status: 400 });
  }

  const apiToken = process.env.APIFY_API_TOKEN;
  if (!apiToken) {
    return NextResponse.json({ error: "APIFY_API_TOKEN not configured" }, { status: 503 });
  }

  const runUrl = `https://api.apify.com/v2/acts/dev_fusion~Linkedin-Profile-Scraper/run-sync-get-dataset-items?token=${apiToken}`;

  const res = await fetch(runUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ profileUrls: [url] }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error("Apify error", res.status, body);
    if (res.status === 401 || res.status === 403) {
      return NextResponse.json({ error: "Invalid API token" }, { status: 403 });
    }
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 502 });
  }

  const items: Profile[] = await res.json();
  const profile = items?.[0];
  const name = profile?.fullName ||
    [profile?.firstName, profile?.lastName].filter(Boolean).join(" ");

  if (!profile || !name) {
    return NextResponse.json({ error: "Profile not found or private" }, { status: 404 });
  }

  return NextResponse.json({
    rawContent: buildRawContent(profile),
    name,
    headline: profile.headline ?? "",
  });
}
