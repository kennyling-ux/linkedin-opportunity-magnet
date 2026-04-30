import { NextRequest, NextResponse } from "next/server";

interface ScrapInExperience {
  title?: string;
  companyName?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
}

interface ScrapInEducation {
  schoolName?: string;
  degreeName?: string;
  fieldOfStudy?: string;
  startDate?: string;
  endDate?: string;
}

interface ScrapInProfile {
  firstName?: string;
  lastName?: string;
  headline?: string;
  summary?: string;
  city?: string;
  region?: string;
  country?: string;
  currentJobTitle?: string;
  currentCompanyName?: string;
  experiences?: ScrapInExperience[];
  education?: ScrapInEducation[];
  skills?: string[];
  certifications?: { name?: string }[];
  success?: boolean;
}

function buildRawContent(p: ScrapInProfile): string {
  const sections: string[] = [];

  const name = [p.firstName, p.lastName].filter(Boolean).join(" ");
  if (name) sections.push(`Name: ${name}`);
  if (p.headline) sections.push(`Headline: ${p.headline}`);
  const location = [p.city, p.region, p.country].filter(Boolean).join(", ");
  if (location) sections.push(`Location: ${location}`);

  if (p.summary) {
    sections.push(`\nAbout:\n${p.summary}`);
  }

  if (p.experiences?.length) {
    const expLines = p.experiences.map((e) => {
      const dateRange = [e.startDate, e.endDate || "Present"].filter(Boolean).join(" – ");
      const header = `${e.title || "Role"} at ${e.companyName || "Company"}${dateRange ? ` (${dateRange})` : ""}`;
      return e.description ? `${header}\n${e.description}` : header;
    });
    sections.push(`\nExperience:\n${expLines.join("\n\n")}`);
  }

  if (p.education?.length) {
    const eduLines = p.education.map((e) => {
      const years = [e.startDate, e.endDate].filter(Boolean).join(" – ");
      return [
        e.schoolName,
        e.degreeName && e.fieldOfStudy ? `${e.degreeName}, ${e.fieldOfStudy}` : (e.degreeName || e.fieldOfStudy),
        years ? `(${years})` : "",
      ].filter(Boolean).join(" — ");
    });
    sections.push(`\nEducation:\n${eduLines.join("\n")}`);
  }

  if (p.skills?.length) {
    sections.push(`\nSkills:\n${p.skills.slice(0, 30).join(", ")}`);
  }

  if (p.certifications?.length) {
    const certs = p.certifications.map((c) => c.name).filter(Boolean);
    if (certs.length) sections.push(`\nCertifications:\n${certs.join("\n")}`);
  }

  return sections.join("\n");
}

export async function POST(req: NextRequest) {
  const { url } = await req.json() as { url: string };

  if (!url || !url.includes("linkedin.com/in/")) {
    return NextResponse.json({ error: "Invalid LinkedIn URL" }, { status: 400 });
  }

  const apiKey = process.env.SCRAPIN_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "SCRAPIN_API_KEY not configured" }, { status: 503 });
  }

  const endpoint = `https://api.scrapin.io/enrichment/profile?apikey=${apiKey}&linkedinUrl=${encodeURIComponent(url)}`;

  const res = await fetch(endpoint);

  if (!res.ok) {
    const body = await res.text();
    console.error("ScrapIn error", res.status, body);
    if (res.status === 404) {
      return NextResponse.json({ error: "Profile not found or private" }, { status: 404 });
    }
    if (res.status === 401 || res.status === 403) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 403 });
    }
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 502 });
  }

  const profile: ScrapInProfile = await res.json();

  if (!profile.success) {
    return NextResponse.json({ error: "Profile not found or private" }, { status: 404 });
  }

  const rawContent = buildRawContent(profile);
  const name = [profile.firstName, profile.lastName].filter(Boolean).join(" ");

  return NextResponse.json({
    rawContent,
    name,
    headline: profile.headline ?? "",
  });
}
