import Link from "next/link";
import { ArrowRight, Zap, BarChart2, FileText, Award, TrendingUp, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: BarChart2,
    title: "AI 評分系統",
    desc: "即時分析你的曝光度、可信度與定位清晰度，找出真正的瓶頸所在。",
  },
  {
    icon: TrendingUp,
    title: "Profile Engine",
    desc: "3 種風格的 Headline、About 區塊優化、Experience 重寫，全部附帶一鍵複製。",
  },
  {
    icon: FileText,
    title: "Content Engine",
    desc: "生成 30 個專屬你領域的貼文主題，選擇語氣風格後直接產出完整貼文。",
  },
  {
    icon: Award,
    title: "Credibility Engine",
    desc: "將你的專案轉化為顧問等級案例研究，識別缺失的信任證據。",
  },
];

const steps = [
  "貼上你的 LinkedIn 個人頁面內容",
  "AI 自動分析並評分",
  "查看差距分析與優化建議",
  "逐步優化 Profile、Content、Credibility",
];

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <header className="border-b border-slate-100 sticky top-0 bg-white/90 backdrop-blur z-10">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-slate-900">Opportunity Magnet</span>
          </div>
          <Link href="/analyze">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
              開始分析 <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 text-xs font-medium mb-6">
          <Zap className="w-3.5 h-3.5" />
          AI 個人品牌優化系統
        </div>
        <h1 className="text-5xl md:text-6xl font-bold text-slate-900 leading-tight mb-6">
          讓 LinkedIn<br />
          <span className="text-blue-600">主動吸引機會</span>
        </h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-relaxed">
          不只是內容生成工具。Opportunity Magnet 分析你的 LinkedIn 定位，
          找出曝光、可信度與策略上的缺口，提供可立即執行的優化建議。
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/analyze">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8 h-12">
              免費開始分析 <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Steps */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-blue-50 rounded-2xl p-8">
          <p className="text-center text-sm font-semibold text-blue-600 uppercase tracking-wider mb-8">
            使用流程
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col items-center text-center gap-3">
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm shrink-0">
                  {i + 1}
                </div>
                <p className="text-sm text-slate-700 leading-snug">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-3">核心功能模組</h2>
        <p className="text-center text-slate-500 mb-10">四大引擎，全面提升你的 LinkedIn 機會轉換能力</p>
        <div className="grid md:grid-cols-2 gap-6">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="p-6 rounded-xl border border-slate-200 hover:border-blue-200 hover:shadow-sm transition-all group">
              <div className="w-10 h-10 rounded-lg bg-blue-50 group-hover:bg-blue-100 flex items-center justify-center mb-4 transition-colors">
                <Icon className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-semibold text-slate-900 mb-2">{title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="bg-blue-600 rounded-2xl p-10 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">準備好讓機會主動找上你了嗎？</h2>
          <p className="text-blue-100 mb-8 text-lg">貼上你的 LinkedIn 內容，60 秒內取得完整分析報告。</p>
          <Link href="/analyze">
            <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 px-8 h-12 font-semibold">
              立即開始 — 完全免費 <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      <footer className="border-t border-slate-100 py-8 text-center text-slate-400 text-sm">
        © 2025 Opportunity Magnet · 所有資料均由使用者提供，AI 僅負責分析與建議。
      </footer>
    </div>
  );
}
