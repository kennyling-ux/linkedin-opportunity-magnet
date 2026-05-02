"use client";

import { useUser } from "@clerk/nextjs";
import { Lock, Sparkles, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export function useIsPro(): boolean | null {
  const { user, isLoaded } = useUser();
  if (!isLoaded) return null;
  if (!user) return false;
  return (user.publicMetadata?.plan as string) === "pro";
}

interface PaywallGateProps {
  children: React.ReactNode;
  feature?: string;
  blurHeight?: string;
}

export function ProGate({ feature, desc }: { feature: string; desc: string }) {
  const { t } = useLanguage();
  return (
    <div className="flex-1 flex items-center justify-center p-16">
      <div className="text-center max-w-sm">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/30 flex items-center justify-center mx-auto mb-5">
          <Lock className="w-6 h-6 text-amber-400" />
        </div>
        <h2 className="text-slate-900 font-bold text-xl mb-2">{feature}</h2>
        <p className="text-slate-500 text-sm mb-6 leading-relaxed">{desc}</p>
        <Link
          href="/pricing"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-semibold shadow-lg shadow-amber-500/20 hover:shadow-amber-500/35 hover:scale-[1.03] active:scale-[0.97] transition-all duration-150"
        >
          <Sparkles className="w-3.5 h-3.5" />
          {t("proGateUpgrade")}
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
        <p className="text-slate-400 text-xs mt-3">
          {t("proGateSignIn")}{" "}
          <Link href="/sign-in" className="text-blue-500 hover:underline">{t("proGateSignInLink")}</Link>
        </p>
      </div>
    </div>
  );
}

export function PaywallGate({ children, feature = "this feature", blurHeight = "h-64" }: PaywallGateProps) {
  const isPro = useIsPro();

  if (isPro === null) return null; // loading
  if (isPro) return <>{children}</>;

  return (
    <div className="relative rounded-2xl overflow-hidden">
      {/* Blurred preview */}
      <div className={`${blurHeight} overflow-hidden pointer-events-none select-none`}>
        <div className="blur-sm opacity-40 scale-[0.98] origin-top">
          {children}
        </div>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent">
        <div className="text-center px-6 max-w-sm">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/10 border border-amber-500/30 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-5 h-5 text-amber-400" />
          </div>
          <h3 className="text-white font-bold text-lg mb-2">Pro Feature</h3>
          <p className="text-slate-400 text-sm mb-5 leading-relaxed">
            Upgrade to Pro to unlock {feature} and all AI-powered optimization tools.
          </p>
          <Link
            href="/pricing"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-semibold shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 transition-all"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Upgrade to Pro
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
