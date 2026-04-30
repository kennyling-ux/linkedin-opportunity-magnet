import { NextRequest, NextResponse } from "next/server";

interface ProxycurlExperience {
  title?: string;
  company?: string;
  description?: string;
  starts_at?: { year?: number; month?: number };
  ends_at?: { year?: number; month?: number } | null;
}

interface ProxycurlEducation {
  school?: string;
  degree_name?: string;
  field_of_study?: string;
  starts_at?: { year?: number };
  ends_at?: { year?: number };
}

interface ProxycurlProfile {
  full_name?: string;
  headline?: string;
  summary?: string;
  city?: string;
  country_full_name?: string;
  experiences?: ProxycurlExperience[];
  education?: ProxycurlEducation[];
  skills?: string[];
  certifications?: { name?: string }[];
}

function formatDate(d?: { year?: number; month?: number } | null): string {
  if (!d) return "Present";
  const months = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  if (d.month && d.year) return `${months[d.month - 1]} ${d.year}`;
  if (d.year) return String(d.year);
  return "Present";
}

function buildRawContent(p: ProxycurlProfile): string {
  const sections: string[] = [];

  if (p.full_name) sections.push(`Name: ${p.full_name}`);
  if (p.headline) sections.push(`Headline: ${p.headline}`);
  if (p.city || p.country_full_name) {
    sections.push(`Location: ${[p.city, p.country_full_name].filter(Boolean).join(", ")}`);
  }

  if (p.summary) {
    sections.push(`\nAbout:\n${p.summary}`);
  }

  if (p.experiences?.length) {
    const expLines = p.experiences.map((e) => {
      const dateRange = `${formatDate(e.starts_at)} – ${formatDate(e.ends_at)}`;
      const lines = [`${e.title || "Role"} at ${e.company || "Company"} (${dateRange})`];
      if (e.description) lines.push(e.description);
      return lines.join("\n");
    });
    sections.push(`\nExperience:\n${expLines.join("\n\n")}`);
  }

  if (p.education?.length) {
    const eduLines = p.education.map((e) => {
      const years = [e.starts_at?.year, e.ends_at?.year].filter(Boolean).join(" – ");
      return `${e.school || "School"}${e.degree_name ? ` — ${e.degree_name}` : ""}${e.field_of_study ? `, ${e.field_of_study}` : ""}${years ? ` (${years})` : ""}`;
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

  const apiKey = process.env.PROXYCURL_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "PROXYCURL_API_KEY not configured" }, { status: 503 });
  }

  const endpoint = `https://nubela.co/proxycurl/api/v2/linkedin?url=${encodeURIComponent(url)}&use_cache=if-present&fallback_to_cache=on-error`;

  const res = await fetch(endpoint, {
    headers: { Authorization: `Bearer ${apiKey}` },
  });

  if (!res.ok) {
    const body = await res.text();
    if (res.status === 404) {
      return NextResponse.json({ error: "Profile not found or private" }, { status: 404 });
    }
    if (res.status === 403) {
      return NextResponse.json({ error: "Profile is private" }, { status: 403 });
    }
    console.error("Proxycurl error", res.status, body);
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 502 });
  }

  const profile: ProxycurlProfile = await res.json();
  const rawContent = buildRawContent(profile);

  return NextResponse.json({
    rawContent,
    name: profile.full_name ?? "",
    headline: profile.headline ?? "",
  });
}
