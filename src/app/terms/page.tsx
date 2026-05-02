import Link from "next/link";
import { Zap, Lock } from "lucide-react";

export const metadata = {
  title: "Terms & Conditions — Luminary",
  description: "Luminary Terms of Service, Refund Policy, and Privacy terms.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      <header className="border-b border-slate-800/60 px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-white text-sm">Luminary</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/pricing" className="text-slate-400 hover:text-white transition-colors">Pricing</Link>
          <Link href="/blog" className="text-slate-400 hover:text-white transition-colors">Blog</Link>
        </nav>
      </header>

      <main className="flex-1 max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold text-white mb-2">Terms & Conditions</h1>
        <p className="text-slate-500 text-sm mb-12">Last updated: May 2026</p>

        <div className="space-y-10 text-slate-300">

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">1. Acceptance of Terms</h2>
            <p className="text-sm leading-relaxed text-slate-400">
              By accessing or using Luminary (&ldquo;the Service&rdquo;), you agree to be bound by these Terms & Conditions. If you do not agree, please do not use the Service. Luminary reserves the right to update these terms at any time. Continued use after changes constitutes acceptance.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">2. Service Description</h2>
            <p className="text-sm leading-relaxed text-slate-400">
              Luminary is an AI-powered LinkedIn profile optimization platform. It analyzes profile content provided by users and generates scoring, recommendations, and copy-ready outputs using large language model AI. The Service does not scrape, store, or retain any LinkedIn data beyond the active session.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">3. Plans & Pricing</h2>
            <div className="space-y-3 text-sm leading-relaxed text-slate-400">
              <p><span className="text-white font-medium">Free Plan:</span> Available to all users without an account. Includes overall opportunity score and basic gap summary. No payment required.</p>
              <p><span className="text-white font-medium">Pro Monthly:</span> $12 USD per month, billed monthly. Auto-renews each month until cancelled.</p>
              <p><span className="text-white font-medium">Pro Yearly:</span> $96 USD per year ($8/mo), billed annually. Auto-renews each year until cancelled.</p>
              <p><span className="text-white font-medium">Lifetime Plan:</span> $99 USD one-time payment. Grants permanent access to all current and future Pro features. No recurring charges. No expiry.</p>
            </div>
          </section>

          <section className="bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-6">
            <h2 className="text-lg font-semibold text-emerald-400 mb-3">4. 30-Day Money-Back Guarantee</h2>
            <div className="space-y-3 text-sm leading-relaxed text-slate-400">
              <p>All paid plans — Pro Monthly, Pro Yearly, and Lifetime — are covered by a <span className="text-white font-medium">30-day full refund guarantee</span>.</p>
              <p><span className="text-white font-medium">Eligibility:</span> You may request a full refund within 30 calendar days of your first payment for that plan. The 30-day window begins on the date your payment is processed, not the date you first use the Service.</p>
              <p><span className="text-white font-medium">How to request:</span> Email <span className="text-white">support@luminary.app</span> with your account email and order reference. No reason is required — we will process your refund without question.</p>
              <p><span className="text-white font-medium">Processing time:</span> Refunds are processed within 5–10 business days and returned to your original payment method.</p>
              <p><span className="text-white font-medium">Limitations:</span></p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>The guarantee applies once per customer per plan type. Repeated purchases and refund requests for the same plan type are not eligible.</li>
                <li>Refunds are not available for renewal charges on monthly or yearly plans that were not cancelled before the renewal date. Only the initial payment per plan is covered.</li>
                <li>Accounts found to be abusing the guarantee (e.g., repeated plan purchases followed by refund requests) may be suspended at Luminary&apos;s discretion.</li>
              </ul>
              <p>After a refund is issued, your Pro or Lifetime access will be revoked and your account will revert to the Free plan.</p>
            </div>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">5. Cancellation Policy</h2>
            <p className="text-sm leading-relaxed text-slate-400">
              You may cancel your Pro Monthly or Pro Yearly subscription at any time from your account settings. Cancellation stops future billing. You retain Pro access until the end of your current paid period. No partial refunds are issued for unused days within a billing cycle, except where covered by the 30-day guarantee in Section 4. The Lifetime plan is a one-time purchase and cannot be &ldquo;cancelled&rdquo; — it does not auto-renew.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">6. Data & Privacy</h2>
            <p className="text-sm leading-relaxed text-slate-400">
              Luminary does not store the LinkedIn profile content you submit for analysis. Content is processed in memory during your session only. Account data (email, subscription status) is stored securely via our authentication provider. We do not sell, share, or transfer user data to third parties. AI analysis is powered by Google Gemini; content submitted is subject to Google&apos;s API data usage policies.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">7. Intellectual Property</h2>
            <p className="text-sm leading-relaxed text-slate-400">
              All AI-generated content (headlines, About sections, posts, case studies) produced by Luminary is provided for your personal and professional use. You own any content you create or modify using the Service. Luminary retains rights to its platform, algorithms, and underlying systems.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">8. Disclaimer of Warranties</h2>
            <p className="text-sm leading-relaxed text-slate-400">
              The Service is provided &ldquo;as is.&rdquo; Luminary makes no guarantee that use of the Service will result in specific career outcomes, job offers, increased profile views, or business opportunities. AI-generated content is a starting point and should be reviewed and edited by the user before use.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">9. Limitation of Liability</h2>
            <p className="text-sm leading-relaxed text-slate-400">
              To the maximum extent permitted by law, Luminary shall not be liable for any indirect, incidental, or consequential damages arising from use of the Service. Our total liability in any matter is limited to the amount you paid for the Service in the 30 days preceding the claim.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-white mb-3">10. Contact</h2>
            <p className="text-sm leading-relaxed text-slate-400">
              For billing inquiries, refund requests, or support: <span className="text-white">support@luminary.app</span>
            </p>
          </section>

        </div>
      </main>

      <footer className="border-t border-slate-800/60 px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-md bg-blue-500 flex items-center justify-center">
            <Zap className="w-3.5 h-3.5 text-white" />
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
