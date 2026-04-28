import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { Toaster } from "@/components/ui/sonner";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: "Opportunity Magnet — LinkedIn 個人品牌優化系統",
  description: "分析並優化你的 LinkedIn 個人頁面，讓工作機會、客戶與合作邀約主動找上你。",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW">
      <body className={`${geist.variable} font-sans antialiased bg-white text-slate-900`}>
        <LanguageProvider>
          <AppProvider>
            {children}
            <Toaster richColors position="top-right" />
          </AppProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
