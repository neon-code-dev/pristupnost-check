"use client";

import { useEffect, useState } from "react";

function getScoreColor(score: number): string {
  if (score >= 90) return "#16a34a"; // green-600
  if (score >= 70) return "#ca8a04"; // yellow-600
  if (score >= 50) return "#ea580c"; // orange-600
  return "#dc2626"; // red-600
}

function getScoreLabel(score: number): string {
  if (score >= 90) return "Výborný";
  if (score >= 70) return "Dobrý";
  if (score >= 50) return "Průměrný";
  return "Kritický";
}

function getScoreBg(score: number): string {
  if (score >= 90) return "bg-green-50 border-green-200";
  if (score >= 70) return "bg-yellow-50 border-yellow-200";
  if (score >= 50) return "bg-orange-50 border-orange-200";
  return "bg-red-50 border-red-200";
}

export default function ScoreCircle({
  score,
  passes,
  totalChecks,
}: {
  score: number;
  passes: number;
  totalChecks: number;
}) {
  const [animated, setAnimated] = useState(false);
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = getScoreColor(score);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className={`flex flex-col items-center gap-4 p-8 rounded-2xl border-2 ${getScoreBg(score)}`}>
      <div className="relative w-40 h-40">
        <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
          {/* Background track */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="8"
          />
          {/* Score arc */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={animated ? offset : circumference}
            style={{
              transition: "stroke-dashoffset 1.2s ease-out",
            }}
          />
        </svg>
        {/* Score number centered */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="text-4xl font-black tabular-nums"
            style={{ fontFamily: "var(--font-display)", color }}
          >
            {score}
          </span>
          <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest mt-0.5">
            / 100
          </span>
        </div>
      </div>

      <div className="text-center">
        <p
          className="text-lg font-bold"
          style={{ color }}
        >
          {getScoreLabel(score)}
        </p>
        <p className="text-sm text-slate-600 mt-1">
          {passes} z {totalChecks} kontrol v pořádku
        </p>
      </div>
    </div>
  );
}
