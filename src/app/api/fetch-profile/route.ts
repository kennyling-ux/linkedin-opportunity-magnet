import { NextRequest, NextResponse } from "next/server";

interface RapidExperience {
  title?: string;
  company?: string;
  description?: string;
  starts_at?: { year?: number; month?: number };
  ends_at?: { year?: number; month?: number } | null;
}

interface RapidEducation {
  school?: string;
  schoolName?: string;
  degree_name?: string;
  degreeName?: string;
  field_of_study?: string;
  fieldOfStudy?: string;
  starts_at?: { year?: number };
  ends_at?: { year?: number };
  start_year?: number;
  end_year?: number;
}

interface RapidProfile {
  full_name?: string;
  headline?: string;
  about?: string;
  summary?: string;
  city?: string;
  country?: string;
  experiences?: RapidExperience[];
  educations?: RapidEducation[];
  skills?: string | string[];
}

function formatDate(d?: { year?: number; month?: number } | null): string {
  if (!d?.year) return "Present";
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return d.month ? `${months[d.month - 1]} ${d.year}` : String(d.year);
}

function buildRawContent(p: RapidProfile): string {
  const sections: string[] = [];

  if (p.full_name) sections.push(`Name: ${p.full_name}`);
  if (p.headline) sections.push(`Headline: ${p.headline}`);
  const location = [p.city, p.country].filter(Boolean).join(", ");
  if (location) sections.push(`Location: ${location}`);

  const about = p.about || p.summary;
  if (about) sections.push(`\nAbout:\n${about}`);

  if (p.experiences?.length) {
    const expLines = p.experiences.map((e) => {
      const dateRange = `${formatDate(e.starts_at)} – ${formatDate(e.ends_at)}`;
      const header = `${e.title || "Role"} at ${e.company || "Company"} (${dateRange})`;
      return e.description ? `${header}\n${e.description}` : header;
    });
    sections.push(`\nExperience:\n${expLines.join("\n\n")}`);
  }

  if (p.educations?.length) {
    const eduLines = p.educations.map((e) => {
      const school = e.school || e.schoolName || "School";
      const degree = e.degree_name || e.degreeName;
      const field = e.field_of_study || e.fieldOfStudy;
      const startYear = e.starts_at?.year || e.start_year;
      const endYear = e.ends_at?.year || e.end_year;
      const years = [startYear, endYear].filter(Boolean).join(" – ");
      return [school, degree && field ? `${degree}, ${field}` : (degree || field), years ? `(${years})` : ""]
        .filter(Boolean).join(" — ");
    });
    sections.push(`\nEducation:\n${eduLines.join("\n")}`);
  }

  if (p.skills) {
    const skillList = Array.isArray(p.skills)
      ? p.skills.slice(0, 30).join(", ")
      : p.skills;
    if (skillList) sections.push(`\nSkills:\n${skillList}`);
  }

  return sections.join("\n");
}

export async function POST(req: NextRequest) {
  const { url } = await req.json() as { url: string };

  if (!url || !url.includes("linkedin.com/in/")) {
    return NextResponse.json({ error: "Invalid LinkedIn URL" }, { status: 400 });
  }

  const apiKey = process.env.RAPIDAPI_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "RAPIDAPI_KEY not configured" }, { status: 503 });
  }

  const endpoint = `https://fresh-linkedin-profile-data.p.rapidapi.com/get-linkedin-profile?linkedin_url=${encodeURIComponent(url)}`;

  const res = await fetch(endpoint, {
    headers: {
      "X-RapidAPI-Key": apiKey,
      "X-RapidAPI-Host": "fresh-linkedin-profile-data.p.rapidapi.com",
    },
  });

  if (!res.ok) {
    const body = await res.text();
    console.error("RapidAPI error", res.status, body);
    if (res.status === 404) {
      return NextResponse.json({ error: "Profile not found or private" }, { status: 404 });
    }
    if (res.status === 401 || res.status === 403) {
      return NextResponse.json({ error: "Invalid API key" }, { status: 403 });
    }
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 502 });
  }

  const profile: RapidProfile = await res.json();
  const rawContent = buildRawContent(profile);

  return NextResponse.json({
    rawContent,
    name: profile.full_name ?? "",
    headline: profile.headline ?? "",
  });
}
