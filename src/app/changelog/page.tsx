import { Navbar } from "@/components/Navbar";
import { Zap, Lock } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "What's New — Luminary",
  description: "Latest updates and new features from Luminary.",
};

const UPDATES = [
  {
    date: "May 2026",
    tag: "New",
    tagColor: "bg-blue-500/15 text-blue-400 border-blue-500/20",
    title: "3-Tier Pricing with Lifetime Plan",
    items: [
      "Added Lifetime plan ($99 one-time) — pay once, use forever with all future updates",
      "Adjusted Pro pricing: $12/mo or $8/mo billed yearly ($96/yr)",
      "30-day money-back guarantee on all paid plans",
    ],
  },
  {
    date: "May 2026",
    tag: "Improved",
    tagColor: "bg-indigo-500/15 text-indigo-400 border-indigo-500/20",
    title: "Visual Scores Dashboard",
    items: [
      "Scores page redesigned with animated score rings for all 4 dimensions",
      "Improvement tips now collapsed by default — cleaner, less overwhelming",
      "Added collapsible tip accordion per dimension",
    ],
  },
  {
    date: "May 2026",
    tag: "Improved",
    tagColor: "bg-indigo-500/15 text-indigo-400 border-indigo-500/20",
    title: "Full Bilingual Support (EN / 中)",
    items: [
      "Zero mixed-language strings — every UI element respects your language choice",
      "Testimonials now switch between English and Chinese dynamically",
      "ProGate unlock screens fully translated",
    ],
  },
  {
    date: "April 2026",
    tag: "New",
    tagColor: "bg-blue-500/15 text-blue-400 border-blue-500/20",
    title: "Freemium System & Pro Gates",
    items: [
      "Free users see Overall Score and basic gap summary",
      "Pro users unlock all 4 engines: Profile, Content, Credibility, Scores & Positioning",
      "Clerk authentication integrated with Pro metadata",
    ],
  },
  {
    date: "April 2026",
    tag: "Launch",
    tagColor: "bg-emerald-500/15 text-emerald-400 border-emerald-500/20",
    title: "Luminary v1 Launch",
    items: [
      "AI-powered LinkedIn profile analysis across 3 dimensions: Visibility, Credibility, Positioning",
      "Profile Engine: headline variants, About rewrite, Experience optimization",
      "Content Engine: 30 tailored post topics + full post generator",
      "Credibility Engine: AI case studies from your work history",
    ],
  },
];

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Navbar variant="dark" />

      <main className="flex-1 max-w-2xl mx-auto px-6 pt-28 pb-20">
        <div className="mb-12">
          <p className="text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">Changelog</p>
          <h1 className="text-3xl font-bold text-white mb-3 tracking-tight">What&apos;s New</h1>
          <p className="text-slate-400 text-base">Latest features, improvements, and fixes.</p>
        </div>

        <div className="space-y-10">
          {UPDATES.map((update, i) => (
            <div key={i} className="relative pl-6 border-l border-slate-800">
              <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-slate-700 border-2 border-slate-950" />
              <div className="flex items-center gap-3 mb-3">
                <span className="text-slate-500 text-xs font-medium">{update.date}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${update.tagColor}`}>
                  {update.tag}
                </span>
              </div>
              <h2 className="text-white font-semibold mb-3">{update.title}</h2>
              <ul className="space-y-2">
                {update.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-slate-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600 mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </main>

      <footer className="border-t border-slate-800/60 px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-blue-500 flex items-center justify-center">
            <Zap className="w-3 h-3 text-white" />
          </div>
          <span className="text-slate-500 text-xs">© 2026 Luminary</span>
        </div>
        <div className="flex items-center gap-4 text-xs text-slate-600">
          <Link href="/pricing" className="hover:text-slate-400 transition-colors">Pricing</Link>
          <Link href="/blog" className="hover:text-slate-400 transition-colors">Blog</Link>
          <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> No data stored</span>
        </div>
      </footer>
    </div>
  );
}
