"use client";

import type { OpportunityLevel } from "@/types";
import { cn } from "@/lib/utils";

interface OpportunityMeterProps {
  level: OpportunityLevel;
  reason: string;
  improvements: string[];
}

const config = {
  low: {
    label: "低",
    sublabel: "被機會找上的機率：低",
    bg: "bg-red-50",
    border: "border-red-200",
    badge: "bg-red-100 text-red-700",
    bar: "bg-red-400",
    width: "w-1/4",
    dot: "bg-red-500",
  },
  medium: {
    label: "中",
    sublabel: "被機會找上的機率：中",
    bg: "bg-amber-50",
    border: "border-amber-200",
    badge: "bg-amber-100 text-amber-700",
    bar: "bg-amber-400",
    width: "w-1/2",
    dot: "bg-amber-500",
  },
  high: {
    label: "高",
    sublabel: "被機會找上的機率：高",
    bg: "bg-blue-50",
    border: "border-blue-200",
    badge: "bg-blue-100 text-blue-700",
    bar: "bg-blue-500",
    width: "w-3/4",
    dot: "bg-blue-500",
  },
};

export function OpportunityMeter({ level, reason, improvements }: OpportunityMeterProps) {
  const c = config[level];
  return (
    <div className={cn("rounded-xl border p-5 space-y-4", c.bg, c.border)}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500 uppercase tracking-wide mb-0.5">
            Opportunity Attraction
          </p>
          <p className="font-semibold text-slate-800">{c.sublabel}</p>
        </div>
        <span className={cn("px-3 py-1 rounded-full text-sm font-bold", c.badge)}>
          {c.label}
        </span>
      </div>

      <div className="h-2 bg-white/70 rounded-full overflow-hidden">
        <div className={cn("h-full rounded-full transition-all duration-700", c.bar, c.width)} />
      </div>

      <p className="text-sm text-slate-700 leading-relaxed">{reason}</p>

      {improvements.length > 0 && (
        <div className="space-y-1.5">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">改善方式</p>
          <ul className="space-y-1">
            {improvements.map((item, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                <span className={cn("w-1.5 h-1.5 rounded-full mt-1.5 shrink-0", c.dot)} />
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
