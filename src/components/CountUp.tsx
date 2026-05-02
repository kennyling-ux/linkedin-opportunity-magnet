"use client";

import { useEffect, useRef, useState } from "react";

interface CountUpProps {
  value: string; // e.g. "2,400+", "94%", "3×", "< 60s"
  duration?: number;
  className?: string;
}

// Parse a display string like "2,400+" → { prefix: "", suffix: "+", num: 2400 }
// Non-numeric strings just fade in as-is
function parse(value: string): { prefix: string; suffix: string; num: number | null } {
  const cleaned = value.replace(/,/g, "");
  const match = cleaned.match(/^([^0-9]*)(\d+(?:\.\d+)?)([^0-9]*)$/);
  if (!match) return { prefix: "", suffix: "", num: null };
  return {
    prefix: match[1],
    suffix: match[3],
    num: parseFloat(match[2]),
  };
}

function formatNum(n: number, original: string): string {
  // If original had commas (thousands), restore them
  if (original.includes(",")) {
    return Math.round(n).toLocaleString("en-US");
  }
  if (Number.isInteger(parseFloat(original.replace(/[^0-9.]/g, "")))) {
    return String(Math.round(n));
  }
  return String(Math.round(n));
}

export function CountUp({ value, duration = 1800, className }: CountUpProps) {
  const { prefix, suffix, num } = parse(value);
  const [display, setDisplay] = useState(num !== null ? `${prefix}0${suffix}` : value);
  const rafRef = useRef<number | null>(null);
  const startRef = useRef<number | null>(null);
  const hasRun = useRef(false);

  useEffect(() => {
    if (num === null || hasRun.current) return;
    hasRun.current = true;

    function tick(ts: number) {
      if (!startRef.current) startRef.current = ts;
      const elapsed = ts - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * num!;
      setDisplay(`${prefix}${formatNum(current, value)}${suffix}`);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    // Small delay so element is visible before animating
    const timeout = setTimeout(() => {
      rafRef.current = requestAnimationFrame(tick);
    }, 200);

    return () => {
      clearTimeout(timeout);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [num, duration, prefix, suffix, value]);

  return <span className={className}>{display}</span>;
}
