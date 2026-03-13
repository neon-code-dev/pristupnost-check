"use client";

import { useState } from "react";
import { getImpactLabel, getImpactColor } from "@/lib/translations";
import type { ScanIssue } from "@/lib/scanner";

export default function ViolationCard({ issue }: { issue: ScanIssue }) {
  const [expanded, setExpanded] = useState(false);
  const colorClasses = getImpactColor(issue.impact);

  return (
    <div className={`rounded-xl border-2 overflow-hidden transition-all ${colorClasses}`}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full text-left p-4 sm:p-5 flex items-start gap-4 cursor-pointer hover:bg-white/40 transition-colors"
      >
        {/* Severity badge */}
        <span className="shrink-0 mt-0.5 inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider border border-current/20">
          {getImpactLabel(issue.impact)}
        </span>

        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-base leading-snug">
            {issue.title}
          </h3>
          <p className="mt-1 text-sm opacity-80 leading-relaxed">
            {issue.description}
          </p>
        </div>

        {/* Expand chevron */}
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`shrink-0 mt-1 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {expanded && (
        <div className="border-t border-current/10 bg-white/60 p-4 sm:p-5 space-y-4">
          {/* Fix instruction */}
          {issue.fix && (
            <div className="flex gap-3">
              <div className="shrink-0 w-6 h-6 rounded-full bg-indigo-100 flex items-center justify-center mt-0.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4338ca" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                </svg>
              </div>
              <div>
                <p className="text-xs font-bold uppercase tracking-wider text-indigo-700 mb-1">
                  Jak opravit
                </p>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {issue.fix}
                </p>
              </div>
            </div>
          )}

          {/* Affected elements */}
          {issue.nodes.length > 0 && (
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Dotčené elementy ({issue.nodes.length})
              </p>
              <div className="space-y-2">
                {issue.nodes.slice(0, 5).map((node, i) => (
                  <div key={i} className="rounded-lg bg-slate-900 p-3 overflow-x-auto">
                    <code className="code-snippet text-slate-300 break-all whitespace-pre-wrap">
                      {node.html}
                    </code>
                    {node.target && (
                      <p className="mt-1.5 text-xs text-slate-500 font-mono">
                        {node.target}
                      </p>
                    )}
                  </div>
                ))}
                {issue.nodes.length > 5 && (
                  <p className="text-xs text-slate-500 italic">
                    … a dalších {issue.nodes.length - 5} výskytů
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Reference link */}
          <a
            href={issue.helpUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 hover:text-indigo-900 transition-colors"
          >
            Více informací (axe-core dokumentace)
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      )}
    </div>
  );
}
