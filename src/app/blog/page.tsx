import Link from "next/link";
import { Zap, ArrowRight, Clock } from "lucide-react";
import { BLOG_POSTS } from "@/lib/blog-posts";

const CATEGORY_COLORS: Record<string, string> = {
  Visibility: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Strategy: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
  Copywriting: "bg-violet-500/10 text-violet-400 border-violet-500/20",
};

export default function BlogPage() {
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
          <Link href="/pricing" className="text-slate-400 hover:text-white transition-colors">Pricing</Link>
          <Link href="/sign-in" className="text-slate-400 hover:text-white transition-colors">Sign in</Link>
          <Link href="/analyze" className="px-4 py-1.5 rounded-lg bg-blue-500 hover:bg-blue-400 text-white font-medium text-xs transition-colors">
            Try Free
          </Link>
        </nav>
      </header>

      <main className="flex-1 max-w-5xl mx-auto px-6 py-16 w-full">
        <div className="mb-12">
          <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">LinkedIn Growth Blog</h1>
          <p className="text-slate-400 text-base">Practical strategies to make your LinkedIn profile work harder for you.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col hover:border-slate-700 hover:bg-slate-900/80 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <span className={`px-2.5 py-1 rounded-full border text-xs font-medium ${CATEGORY_COLORS[post.category] ?? "bg-slate-800 text-slate-400 border-slate-700"}`}>
                  {post.category}
                </span>
                <span className="flex items-center gap-1 text-slate-600 text-xs">
                  <Clock className="w-3 h-3" />
                  {post.readTime}
                </span>
              </div>
              <h2 className="text-white font-semibold text-base leading-snug mb-3 group-hover:text-blue-300 transition-colors">
                {post.title}
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed flex-1 mb-4">{post.excerpt}</p>
              <div className="flex items-center justify-between">
                <span className="text-slate-600 text-xs">{post.date}</span>
                <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-blue-400 group-hover:translate-x-0.5 transition-all" />
              </div>
            </Link>
          ))}
        </div>
      </main>

      <footer className="border-t border-slate-800/60 px-6 py-6 text-center text-slate-600 text-xs">
        © 2026 Luminary ·{" "}
        <Link href="/pricing" className="hover:text-slate-400 transition-colors">Pricing</Link>
        {" · "}
        <Link href="/analyze" className="hover:text-slate-400 transition-colors">Try Free</Link>
      </footer>
    </div>
  );
}
