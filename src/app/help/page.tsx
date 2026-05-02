import { Navbar } from "@/components/Navbar";
import { Zap, Lock } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Help & FAQ — Luminary",
  description: "Answers to common questions about Luminary.",
};

const FAQS = [
  {
    section: "Getting Started",
    items: [
      {
        q: "How do I analyze my LinkedIn profile?",
        a: "Go to the Analyze page, paste your LinkedIn profile content (About section, Experience, Skills), optionally add your target role and industry, then click Start Analysis. Results appear in about 30 seconds.",
      },
      {
        q: "Do I need to create an account?",
        a: "No. You can paste your profile and get your overall opportunity score without signing up. An account is required to save results, unlock Pro features, and access the full dashboard.",
      },
      {
        q: "How do I copy my LinkedIn content?",
        a: "Visit your LinkedIn profile, scroll through each section (About, Experience, Skills, Recommendations), and copy-paste the text into the analyzer. The more content you provide, the more accurate your analysis.",
      },
      {
        q: "Can I use the auto-fetch feature?",
        a: "Yes — paste your LinkedIn profile URL and click Auto-fetch. Note that private profiles cannot be fetched automatically; you'll need to copy-paste manually.",
      },
    ],
  },
  {
    section: "Plans & Billing",
    items: [
      {
        q: "What's the difference between Free, Pro, and Lifetime?",
        a: "Free gives you the overall opportunity score and basic gap summary. Pro ($12/mo or $8/mo billed yearly) unlocks all 4 AI engines: Profile, Content, Credibility, and Scores & Positioning. Lifetime ($99 one-time) gives you everything in Pro forever — no renewals, all future updates included.",
      },
      {
        q: "Is there a money-back guarantee?",
        a: "Yes. All paid plans come with a 30-day full refund guarantee. Email support@luminary.app within 30 days of your first payment and we'll refund you in full — no questions asked. See our Terms & Conditions for the full policy.",
      },
      {
        q: "Can I cancel my subscription anytime?",
        a: "Yes. Cancel from your account settings at any time. You keep Pro access until the end of your billing period. The Lifetime plan never renews — it's a one-time payment.",
      },
      {
        q: "Does the Lifetime plan include future features?",
        a: "Yes. The Lifetime plan includes all current Pro features and any future features added to the Pro tier — forever, at no extra cost.",
      },
    ],
  },
  {
    section: "AI Engines",
    items: [
      {
        q: "How accurate is the AI analysis?",
        a: "The analysis is powered by Google Gemini and is designed to give actionable, specific feedback. It's most accurate when you provide complete profile content. The suggestions are starting points — we recommend reviewing and personalizing before using them.",
      },
      {
        q: "What does each engine do?",
        a: "Profile Engine: generates 3 headline styles, rewrites your About section, and optimizes each Experience entry. Content Engine: creates 30 tailored post topics and generates full LinkedIn posts. Credibility Engine: extracts case studies from your work history and identifies trust evidence gaps. Scores & Positioning: gives you a detailed 4-dimension breakdown and AI career direction advice.",
      },
      {
        q: "Can I regenerate results?",
        a: "Yes. Every engine has a Regenerate button that produces a fresh set of AI outputs using the same profile data.",
      },
      {
        q: "Is my data stored?",
        a: "No. Your profile content is processed in memory during the analysis session and never stored on our servers. We take privacy seriously.",
      },
    ],
  },
  {
    section: "Technical",
    items: [
      {
        q: "Why is the analysis taking longer than 30 seconds?",
        a: "The AI typically responds in 20–40 seconds. During peak usage, it may take up to 60 seconds. If it exceeds 90 seconds, try refreshing and submitting again.",
      },
      {
        q: "I lost my results after closing the browser. Can I recover them?",
        a: "Results are saved to your browser's local storage, so they persist across sessions on the same device and browser. Clearing browser data or switching devices will clear them. Sign in with an account to ensure your data is accessible.",
      },
      {
        q: "What languages does the AI support?",
        a: "The interface supports English and Traditional Chinese. The AI analysis works best with English-language profile content, though it can handle Chinese profiles with reasonable accuracy.",
      },
    ],
  },
];

export default function HelpPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <Navbar variant="dark" />

      <main className="flex-1 max-w-3xl mx-auto px-6 pt-28 pb-20">
        <div className="mb-12">
          <p className="text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">Support</p>
          <h1 className="text-3xl font-bold text-white mb-3 tracking-tight">Help & FAQ</h1>
          <p className="text-slate-400 text-base">
            Can&apos;t find your answer?{" "}
            <a href="mailto:support@luminary.app" className="text-blue-400 hover:text-blue-300 transition-colors">
              Email us
            </a>
            {" "}and we&apos;ll get back to you within 24 hours.
          </p>
        </div>

        <div className="space-y-12">
          {FAQS.map(({ section, items }) => (
            <div key={section}>
              <h2 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-5">{section}</h2>
              <div className="space-y-6">
                {items.map(({ q, a }) => (
                  <div key={q} className="border-b border-slate-800 pb-6">
                    <p className="text-white font-medium mb-2">{q}</p>
                    <p className="text-slate-400 text-sm leading-relaxed">{a}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center">
          <p className="text-white font-semibold mb-2">Still need help?</p>
          <p className="text-slate-400 text-sm mb-4">Our team responds within 24 hours on business days.</p>
          <a
            href="mailto:support@luminary.app"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-white text-sm font-semibold transition-all duration-150 hover:scale-[1.03] active:scale-[0.97]"
          >
            Contact Support
          </a>
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
          <Link href="/terms" className="hover:text-slate-400 transition-colors">Terms</Link>
          <span className="flex items-center gap-1"><Lock className="w-3 h-3" /> No data stored</span>
        </div>
      </footer>
    </div>
  );
}
