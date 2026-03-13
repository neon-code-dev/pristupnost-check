"use client";

import { useState } from "react";
import { getImpactLabel, getImpactColor } from "@/lib/translations";
import type { ScanIssue } from "@/lib/scanner";

/** Extract visible text content from an HTML snippet */
function extractText(html: string): string {
  // Remove HTML tags
  const text = html
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (text.length > 80) return text.slice(0, 77) + "…";
  return text;
}

/** Detect element type from HTML tag and return Czech label */
function describeElement(html: string): { type: string; text: string; icon: string } {
  const tagMatch = html.match(/^<(\w+)/);
  const tag = tagMatch ? tagMatch[1].toLowerCase() : "";
  const text = extractText(html);

  const typeMap: Record<string, [string, string]> = {
    button: ["Tlačítko", "🔘"],
    a: ["Odkaz", "🔗"],
    input: ["Vstupní pole", "📝"],
    select: ["Rozbalovací menu", "📋"],
    textarea: ["Textové pole", "📝"],
    img: ["Obrázek", "🖼️"],
    svg: ["Ikona/grafika", "🎨"],
    h1: ["Nadpis H1", "📌"],
    h2: ["Nadpis H2", "📌"],
    h3: ["Nadpis H3", "📌"],
    h4: ["Nadpis H4", "📌"],
    h5: ["Nadpis H5", "📌"],
    h6: ["Nadpis H6", "📌"],
    iframe: ["Vložený obsah", "📦"],
    video: ["Video", "🎬"],
    audio: ["Zvuk", "🔊"],
    form: ["Formulář", "📋"],
    nav: ["Navigace", "🧭"],
    header: ["Záhlaví", "📄"],
    footer: ["Patička", "📄"],
    main: ["Hlavní obsah", "📄"],
    table: ["Tabulka", "📊"],
    label: ["Popisek pole", "🏷️"],
    span: ["Text", "💬"],
    p: ["Odstavec", "💬"],
    div: ["Sekce", "📦"],
    li: ["Položka seznamu", "📝"],
    ul: ["Seznam", "📝"],
    ol: ["Číslovaný seznam", "📝"],
    html: ["Stránka", "🌐"],
  };

  const [typeName, icon] = typeMap[tag] || ["Prvek", "📄"];

  // Special handling for img (show alt or src)
  if (tag === "img") {
    const altMatch = html.match(/alt=["']([^"']*)["']/);
    const alt = altMatch ? altMatch[1] : "";
    if (alt) return { type: typeName, text: alt, icon };
    const srcMatch = html.match(/src=["']([^"']*?)["']/);
    const src = srcMatch ? srcMatch[1].split("/").pop()?.split("?")[0] || "" : "";
    return { type: typeName, text: src || "(bez popisu)", icon };
  }

  // Special handling for input
  if (tag === "input") {
    const typeAttr = html.match(/type=["']([^"']*)["']/);
    const inputType = typeAttr ? typeAttr[1] : "text";
    const placeholder = html.match(/placeholder=["']([^"']*)["']/);
    const name = html.match(/name=["']([^"']*)["']/);
    const label = placeholder?.[1] || name?.[1] || inputType;
    return { type: typeName, text: label, icon };
  }

  return { type: typeName, text: text || tag, icon };
}

function NodeItem({ node, index }: { node: { html: string; target: string; failureSummary: string }; index: number }) {
  const [showCode, setShowCode] = useState(false);
  const { type, text, icon } = describeElement(node.html);

  return (
    <div className="rounded-lg border border-slate-200 bg-white overflow-hidden">
      {/* Human-readable summary */}
      <div className="p-3 flex items-start gap-3">
        <span className="text-lg shrink-0 mt-0.5" aria-hidden="true">{icon}</span>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-slate-800">
            {type}{text ? ": " : ""}<span className="font-normal text-slate-600">{text}</span>
          </p>
          {node.target && (
            <p className="text-xs text-slate-400 mt-0.5 truncate" title={node.target}>
              {node.target}
            </p>
          )}
        </div>
        <button
          onClick={() => setShowCode(!showCode)}
          className="shrink-0 text-xs text-indigo-600 hover:text-indigo-800 font-medium px-2 py-1 rounded hover:bg-indigo-50 transition-colors cursor-pointer"
        >
          {showCode ? "Skrýt kód" : "Zobrazit kód"}
        </button>
      </div>

      {/* Technical details (for developers) */}
      {showCode && (
        <div className="border-t border-slate-100 bg-slate-900 p-3">
          <code className="text-xs text-slate-300 break-all whitespace-pre-wrap block">
            {node.html}
          </code>
        </div>
      )}
    </div>
  );
}

export default function ViolationCard({ issue, pageUrl }: { issue: ScanIssue; pageUrl?: string }) {
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
          {/* Quick summary of affected elements count */}
          {issue.nodes.length > 0 && (
            <p className="mt-2 text-xs font-medium opacity-60">
              {issue.nodes.length} {issue.nodes.length === 1 ? "výskyt" : issue.nodes.length < 5 ? "výskyty" : "výskytů"} na stránce
            </p>
          )}
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
                Kde na stránce ({issue.nodes.length})
              </p>
              <div className="space-y-2">
                {issue.nodes.slice(0, 8).map((node, i) => (
                  <NodeItem key={i} node={node} index={i} />
                ))}
                {issue.nodes.length > 8 && (
                  <p className="text-xs text-slate-500 italic">
                    … a dalších {issue.nodes.length - 8} výskytů
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Links row */}
          <div className="flex flex-wrap gap-4 pt-1">
            {pageUrl && (
              <a
                href={pageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-800 transition-colors"
              >
                Otevřít skenovanou stránku
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </a>
            )}
            <a
              href={issue.helpUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-700 hover:text-indigo-900 transition-colors"
            >
              Technická dokumentace
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
