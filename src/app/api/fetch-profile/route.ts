import { NextRequest, NextResponse } from "next/server";

interface ApifyDate {
  year?: number;
  month?: number;
  text?: string;
}

interface ApifyExperience {
  position?: string;
  companyName?: string;
  description?: string;
  startDate?: ApifyDate;
  endDate?: ApifyDate | null;
}

interface ApifyEducation {
  schoolName?: string;
  degree?: string;
  fieldOfStudy?: string;
  startDate?: ApifyDate;
  endDate?: ApifyDate;
  period?: string;
}

interface ApifySkill {
  name?: string;
}

interface ApifyLocation {
  linkedinText?: string;
  parsed?: { city?: string; state?: string; country?: string };
}

interface ApifyProfile {
  firstName?: string;
  lastName?: string;
  headline?: string;
  about?: string;
  location?: ApifyLocation;
  experience?: ApifyExperience[];
  education?: ApifyEducation[];
  skills?: ApifySkill[] | string[];
  certifications?: { name?: string }[];
}

function formatDate(d?: ApifyDate | null): string {
  if (!d) return "Present";
  if (d.text && d.text !== "Present") return d.text;
  if (!d.year) return "Present";
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  return d.month ? `${months[d.month - 1]} ${d.year}` : String(d.year);
}

function buildRawContent(p: ApifyProfile): string {
  const sections: string[] = [];

  const name = [p.firstName, p.lastName].filter(Boolean).join(" ");
  if (name) sections.push(`Name: ${name}`);
  if (p.headline) sections.push(`Headline: ${p.headline}`);

  const loc = p.location?.linkedinText ||
    [p.location?.parsed?.city, p.location?.parsed?.state, p.location?.parsed?.country].filter(Boolean).join(", ");
  if (loc) sections.push(`Location: ${loc}`);

  if (p.about) sections.push(`\nAbout:\n${p.about}`);

  if (p.experience?.length) {
    const lines = p.experience.map((e) => {
      const start = formatDate(e.startDate);
      const end = formatDate(e.endDate);
      const header = `${e.position || "Role"} at ${e.companyName || "Company"} (${start} – ${end})`;
      return e.description ? `${header}\n${e.description}` : header;
    });
    sections.push(`\nExperience:\n${lines.join("\n\n")}`);
  }

  if (p.education?.length) {
    const lines = p.education.map((e) => {
      const parts = [e.schoolName];
      if (e.degree || e.fieldOfStudy) {
        parts.push([e.degree, e.fieldOfStudy].filter(Boolean).join(", "));
      }
      const years = e.period || [e.startDate?.year, e.endDate?.year].filter(Boolean).join(" – ");
      if (years) parts.push(`(${years})`);
      return parts.filter(Boolean).join(" — ");
    });
    sections.push(`\nEducation:\n${lines.join("\n")}`);
  }

  if (p.skills?.length) {
    const skillList = (p.skills as (ApifySkill | string)[])
      .map((s) => (typeof s === "string" ? s : s.name ?? ""))
      .filter(Boolean)
      .slice(0, 30)
      .join(", ");
    if (skillList) sections.push(`\nSkills:\n${skillList}`);
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

  const apiToken = process.env.APIFY_API_TOKEN;
  if (!apiToken) {
    return NextResponse.json({ error: "APIFY_API_TOKEN not configured" }, { status: 503 });
  }

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
  const name = [profile?.firstName, profile?.lastName].filter(Boolean).join(" ");

  if (!profile || !name) {
    return NextResponse.json({ error: "Profile not found or private" }, { status: 404 });
  }

  return NextResponse.json({
    rawContent: buildRawContent(profile),
    name,
    headline: profile.headline ?? "",
  });
}
