import { NextRequest, NextResponse } from "next/server";

interface ApifyExperience {
  title?: string;
  companyName?: string;
  company?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  start?: { year?: number; month?: number };
  end?: { year?: number; month?: number } | null;
}

interface ApifyEducation {
  schoolName?: string;
  school?: string;
  degreeName?: string;
  degree?: string;
  fieldOfStudy?: string;
  field?: string;
  startDate?: string;
  endDate?: string;
}

interface ApifyProfile {
  fullName?: string;
  name?: string;
  firstName?: string;
  lastName?: string;
  headline?: string;
  title?: string;
  about?: string;
  summary?: string;
  description?: string;
  city?: string;
  location?: string;
  country?: string;
  experience?: ApifyExperience[];
  experiences?: ApifyExperience[];
  workExperience?: ApifyExperience[];
  education?: ApifyEducation[];
  educations?: ApifyEducation[];
  skills?: string[] | { name?: string }[] | string;
}

function getName(p: ApifyProfile): string {
  if (p.fullName) return p.fullName;
  if (p.name) return p.name;
  return [p.firstName, p.lastName].filter(Boolean).join(" ");
}

function getAbout(p: ApifyProfile): string {
  return p.about || p.summary || p.description || "";
}

function getExperiences(p: ApifyProfile): ApifyExperience[] {
  return p.experience || p.experiences || p.workExperience || [];
}

function getEducations(p: ApifyProfile): ApifyEducation[] {
  return p.education || p.educations || [];
}

function formatSkills(raw: ApifyProfile["skills"]): string {
  if (!raw) return "";
  if (typeof raw === "string") return raw;
  if (Array.isArray(raw)) {
    return raw
      .map((s) => (typeof s === "string" ? s : s.name ?? ""))
      .filter(Boolean)
      .slice(0, 30)
      .join(", ");
  }
  return "";
}

function buildRawContent(p: ApifyProfile): string {
  const sections: string[] = [];

  const name = getName(p);
  if (name) sections.push(`Name: ${name}`);

  const headline = p.headline || p.title;
  if (headline) sections.push(`Headline: ${headline}`);

  const location = p.location || [p.city, p.country].filter(Boolean).join(", ");
  if (location) sections.push(`Location: ${location}`);

  const about = getAbout(p);
  if (about) sections.push(`\nAbout:\n${about}`);

  const experiences = getExperiences(p);
  if (experiences.length) {
    const lines = experiences.map((e) => {
      const company = e.companyName || e.company || "Company";
      const start = e.startDate || (e.start?.year ? String(e.start.year) : "");
      const end = e.endDate || (e.end?.year ? String(e.end.year) : "Present");
      const dateRange = start ? `${start} – ${end}` : "";
      const header = `${e.title || "Role"} at ${company}${dateRange ? ` (${dateRange})` : ""}`;
      return e.description ? `${header}\n${e.description}` : header;
    });
    sections.push(`\nExperience:\n${lines.join("\n\n")}`);
  }

  const educations = getEducations(p);
  if (educations.length) {
    const lines = educations.map((e) => {
      const school = e.schoolName || e.school || "School";
      const degree = e.degreeName || e.degree;
      const field = e.fieldOfStudy || e.field;
      const years = [e.startDate, e.endDate].filter(Boolean).join(" – ");
      return [school, degree && field ? `${degree}, ${field}` : (degree || field), years ? `(${years})` : ""]
        .filter(Boolean).join(" — ");
    });
    sections.push(`\nEducation:\n${lines.join("\n")}`);
  }

  const skills = formatSkills(p.skills);
  if (skills) sections.push(`\nSkills:\n${skills}`);

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

  // Run actor synchronously and return dataset items directly (waits up to 300s)
  const runUrl = `https://api.apify.com/v2/acts/harvestapi~linkedin-profile-scraper/run-sync-get-dataset-items?token=${apiToken}`;

  const res = await fetch(runUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ urls: [url] }),
  });

  if (!res.ok) {
    const body = await res.text();
    console.error("Apify error", res.status, body);
    if (res.status === 401 || res.status === 403) {
      return NextResponse.json({ error: "Invalid API token" }, { status: 403 });
    }
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 502 });
  }

  const items: ApifyProfile[] = await res.json();
  const profile = items?.[0];

  if (!profile || !getName(profile)) {
    return NextResponse.json({ error: "Profile not found or private" }, { status: 404 });
  }

  const rawContent = buildRawContent(profile);

  return NextResponse.json({
    rawContent,
    name: getName(profile),
    headline: profile.headline || profile.title || "",
  });
}
