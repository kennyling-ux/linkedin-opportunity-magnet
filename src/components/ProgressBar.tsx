"use client";

import { useEffect, useRef, useState } from "react";

interface ProgressBarProps {
  loading: boolean;
}

export function ProgressBar({ loading }: ProgressBarProps) {
  const [width, setWidth] = useState(0);
  const [visible, setVisible] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const fadeRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (loading) {
      setVisible(true);
      setWidth(0);

      // Quick jump to 15% immediately
      setTimeout(() => setWidth(15), 50);

      // Slowly crawl to ~85% while loading
      intervalRef.current = setInterval(() => {
        setWidth((w) => {
          if (w >= 85) return w;
          // Decelerate as it approaches 85
          const increment = (85 - w) * 0.06;
          return w + Math.max(increment, 0.4);
        });
      }, 120);
    } else {
      // Complete the bar
      if (intervalRef.current) clearInterval(intervalRef.current);
      setWidth(100);
      // Fade out after completion
      fadeRef.current = setTimeout(() => {
        setVisible(false);
        setWidth(0);
      }, 500);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (fadeRef.current) clearTimeout(fadeRef.current);
    };
  }, [loading]);

  if (!visible) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[100] h-[3px] bg-slate-800"
      style={{ opacity: width === 100 ? 0 : 1, transition: "opacity 0.4s ease 0.1s" }}
    >
      <div
        className="h-full bg-gradient-to-r from-blue-500 via-indigo-400 to-blue-400 shadow-lg shadow-blue-500/50 rounded-r-full"
        style={{
          width: `${width}%`,
          transition: width === 100 ? "width 0.25s ease" : "width 0.12s ease",
        }}
      />
    </div>
  );
}
