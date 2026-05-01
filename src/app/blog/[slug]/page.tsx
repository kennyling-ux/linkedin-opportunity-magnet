import { notFound } from "next/navigation";
import Link from "next/link";
import { Zap, ArrowLeft, Clock, ArrowRight } from "lucide-react";
import { BLOG_POSTS, getPost } from "@/lib/blog-posts";

const CATEGORY_COLORS: Record<string, string> = {
  Visibility: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Strategy: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  Copywriting: "bg-violet-500/10 text-violet-400 border-violet-500/20",
};

export function generateStaticParams() {
  return BLOG_POSTS.map((p) => ({ slug: p.slug }));
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const paragraphs = post.content.trim().split("\n").filter((l) => l.trim() !== "");

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Nav */}
      <header className="border-b border-slate-800/60 px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-blue-500 flex items-center justify-center shadow-lg shadow-blue-500/30">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <span className="font-semibold text-white text-sm">Luminary</span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/blog" className="text-slate-400 hover:text-white transition-colors">Blog</Link>
          <Link href="/pricing" className="text-slate-400 hover:text-white transition-colors">Pricing</Link>
          <Link href="/analyze" className="px-4 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-400 text-white font-medium text-xs transition-colors">
            Try Free
          </Link>
        </nav>
      </header>

      <main className="flex-1 max-w-2xl mx-auto px-6 py-16 w-full">
        <Link href="/blog" className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-300 text-sm mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>

        <div className="flex items-center gap-3 mb-5">
          <span className={`px-2.5 py-1 rounded-full border text-xs font-medium ${CATEGORY_COLORS[post.category] ?? "bg-slate-800 text-slate-400 border-slate-700"}`}>
            {post.category}
          </span>
          <span className="flex items-center gap-1 text-slate-600 text-xs">
            <Clock className="w-3 h-3" />
            {post.readTime}
          </span>
          <span className="text-slate-600 text-xs">{post.date}</span>
        </div>

        <h1 className="text-3xl font-bold text-white mb-6 leading-tight tracking-tight">{post.title}</h1>
        <p className="text-slate-400 text-base leading-relaxed mb-10 border-l-2 border-blue-500/40 pl-4">{post.excerpt}</p>

        {/* Render content */}
        <div className="prose-custom space-y-4">
          {paragraphs.map((line, i) => {
            if (line.startsWith("## ")) {
              return (
                <h2 key={i} className="text-xl font-bold text-white mt-10 mb-3">
                  {line.replace("## ", "")}
                </h2>
              );
            }
            if (line.startsWith("**") && line.endsWith("**")) {
              return (
                <p key={i} className="text-white font-semibold">
                  {line.replace(/\*\*/g, "")}
                </p>
              );
            }
            if (line.startsWith("*") && line.endsWith("*")) {
              return (
                <p key={i} className="text-slate-300 italic text-sm bg-slate-900 px-4 py-3 rounded-lg border border-slate-800">
                  {line.replace(/^\*/, "").replace(/\*$/, "")}
                </p>
              );
            }
            if (line.startsWith("- ")) {
              return (
                <li key={i} className="text-slate-400 text-sm leading-relaxed list-none flex gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500/60 mt-2 shrink-0" />
                  {line.replace("- ", "")}
                </li>
              );
            }
            // Handle bold inline
            const parts = line.split(/(\*\*[^*]+\*\*)/g);
            return (
              <p key={i} className="text-slate-400 text-sm leading-relaxed">
                {parts.map((part, j) =>
                  part.startsWith("**") ? (
                    <strong key={j} className="text-slate-200 font-semibold">{part.replace(/\*\*/g, "")}</strong>
                  ) : part
                )}
              </p>
            );
          })}
        </div>

        {/* CTA */}
        <div className="mt-16 bg-gradient-to-br from-blue-500/10 to-indigo-500/5 border border-blue-500/20 rounded-2xl p-8 text-center">
          <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold mb-3">Ready to apply this?</p>
          <h3 className="text-white text-xl font-bold mb-3">Get your LinkedIn score in 30 seconds</h3>
          <p className="text-slate-400 text-sm mb-6">Paste your profile content and get an AI analysis of your Visibility, Credibility, and Positioning scores — free.</p>
          <Link
            href="/analyze"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-semibold text-sm transition-colors shadow-lg shadow-blue-500/25"
          >
            Analyze my profile free
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <footer className="border-t border-slate-800/60 px-6 py-6 text-center text-slate-600 text-xs">
        © 2026 Luminary ·{" "}
        <Link href="/blog" className="hover:text-slate-400 transition-colors">Blog</Link>
        {" · "}
        <Link href="/pricing" className="hover:text-slate-400 transition-colors">Pricing</Link>
      </footer>
    </div>
  );
}
