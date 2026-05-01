import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { AppProvider } from "@/context/AppContext";
import { LanguageProvider } from "@/context/LanguageContext";
import { Toaster } from "@/components/ui/sonner";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" });

export const metadata: Metadata = {
  title: "Luminary — LinkedIn Personal Brand Optimizer",
  description: "Analyze and optimize your LinkedIn profile so opportunities, clients, and collaboration requests find you.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${geist.variable} font-sans antialiased`}>
          <LanguageProvider>
            <AppProvider>
              {children}
              <Toaster richColors position="top-right" />
            </AppProvider>
          </LanguageProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
