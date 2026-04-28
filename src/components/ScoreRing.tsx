"use client";

import { useLanguage } from "@/context/LanguageContext";

interface ScoreRingProps {
  score: number;
  label: string;
  size?: number;
  strokeWidth?: number;
}

export function ScoreRing({ score, label, size = 88, strokeWidth = 6 }: ScoreRingProps) {
  const { t } = useLanguage();
  const r = (size - strokeWidth * 2) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (score / 100) * circ;

  const color =
    score >= 75 ? "#3b82f6" :
    score >= 60 ? "#6366f1" :
    score >= 50 ? "#f59e0b" : "#ef4444";

  const trackColor =
    score >= 75 ? "#eff6ff" :
    score >= 60 ? "#eef2ff" :
    score >= 50 ? "#fffbeb" : "#fef2f2";

  const textColor =
    score >= 75 ? "text-blue-600" :
    score >= 60 ? "text-indigo-600" :
    score >= 50 ? "text-amber-600" : "text-red-500";

  const grade =
    score >= 75 ? t("gradeGreat") :
    score >= 60 ? t("gradeOk") :
    score >= 50 ? t("gradePoor") : t("gradeBad");

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative" style={{ width: size, height: size }}>
        {/* Track */}
        <svg width={size} height={size} className="-rotate-90" style={{ position: "absolute" }}>
          <circle
            cx={size / 2} cy={size / 2} r={r}
            fill="none"
            stroke={trackColor}
            strokeWidth={strokeWidth}
          />
          <circle
            cx={size / 2} cy={size / 2} r={r}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circ}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.9s cubic-bezier(0.34,1.56,0.64,1)" }}
          />
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-xl font-black leading-none tabular-nums ${textColor}`}>{score}</span>
        </div>
      </div>
      <div className="text-center">
        <p className="text-xs font-semibold text-slate-500 leading-tight">{label}</p>
        <p className={`text-[10px] font-medium leading-tight ${textColor}`}>{grade}</p>
      </div>
    </div>
  );
}
