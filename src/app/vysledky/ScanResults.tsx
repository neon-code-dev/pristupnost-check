"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import type { ScanResult, ScanIssue } from "@/lib/scanner";
import { getImpactLabel } from "@/lib/translations";
import { posthog } from "@/lib/posthog";
import ScoreCircle from "@/components/ScoreCircle";
import ViolationCard from "@/components/ViolationCard";
import LoadingState from "@/components/LoadingState";
import ScanForm from "@/components/ScanForm";

type SeverityGroup = {
  impact: string;
  label: string;
  issues: ScanIssue[];
};

function groupBySeverity(violations: ScanIssue[]): SeverityGroup[] {
  const order = ["critical", "serious", "moderate", "minor"];
  const groups: Record<string, ScanIssue[]> = {};

  for (const v of violations) {
    if (!groups[v.impact]) groups[v.impact] = [];
    groups[v.impact].push(v);
  }

  return order
    .filter((impact) => groups[impact]?.length)
    .map((impact) => ({
      impact,
      label: getImpactLabel(impact),
      issues: groups[impact],
    }));
}

export default function ScanResults() {
  const searchParams = useSearchParams();
  const url = searchParams.get("url") || "";

  const [result, setResult] = useState<ScanResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!url) {
      setError("Nebyla zadána URL adresa.");
      setLoading(false);
      return;
    }

    const controller = new AbortController();

    async function runScan() {
      // Track scan started
      posthog.capture("scan_started", {
        scanned_url: url,
        source: "results_page",
      });

      try {
        const res = await fetch("/api/scan", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ url }),
          signal: controller.signal,
        });

        const data = await res.json();

        if (!res.ok) {
          setError(data.error || `Chyba ${res.status}`);
          posthog.capture("scan_error", {
            scanned_url: url,
            error: data.error || `HTTP ${res.status}`,
          });
          return;
        }

        setResult(data);

        // Track scan completed with key metrics
        posthog.capture("scan_completed", {
          scanned_url: data.url,
          score: data.score,
          violations_count: data.violations.length,
          passes_count: data.passes,
          total_checks: data.totalChecks,
          scan_time_ms: data.scanTimeMs,
          critical_count: data.violations.filter((v: ScanIssue) => v.impact === "critical").length,
          serious_count: data.violations.filter((v: ScanIssue) => v.impact === "serious").length,
          top_issues: data.violations.slice(0, 5).map((v: ScanIssue) => v.id),
        });
      } catch (err) {
        if ((err as Error).name !== "AbortError") {
          setError("Nepodařilo se připojit k serveru. Zkuste to znovu.");
          posthog.capture("scan_error", {
            scanned_url: url,
            error: "connection_failed",
          });
        }
      } finally {
        setLoading(false);
      }
    }

    runScan();
    return () => controller.abort();
  }, [url]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b border-slate-200 bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-700 flex items-center justify-center">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <span className="font-bold text-slate-900 text-sm tracking-tight">
              Přístupnost<span className="text-indigo-700">Check</span>
            </span>
          </Link>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 w-full py-8 sm:py-12">
        {loading && <LoadingState url={url} />}

        {error && (
          <div className="max-w-xl mx-auto text-center py-20 animate-fade-up">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="15" y1="9" x2="9" y2="15" />
                <line x1="9" y1="9" x2="15" y2="15" />
              </svg>
            </div>
            <h2
              className="text-2xl font-black text-slate-900 mb-3"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Sken se nezdařil
            </h2>
            <p className="text-slate-600 mb-8">{error}</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-700 text-white font-semibold hover:bg-indigo-800 transition-colors"
            >
              Zkusit jinou stránku
            </Link>
          </div>
        )}

        {result && (
          <div className="animate-fade-up">
            {/* Result header */}
            <div className="mb-8 sm:mb-12">
              <div className="flex items-center gap-2 text-sm text-slate-500 mb-3">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M2 12h20" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
                <a
                  href={result.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-indigo-700 transition-colors break-all"
                >
                  {result.url}
                </a>
              </div>
              <h1
                className="text-3xl sm:text-4xl font-black text-slate-950"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Výsledky kontroly přístupnosti
              </h1>
              <p className="text-slate-500 mt-2 text-sm">
                Skenováno {new Date(result.scannedAt).toLocaleString("cs-CZ")} · Doba skenu {(result.scanTimeMs / 1000).toFixed(1)}s
              </p>
            </div>

            {/* Score + stats row */}
            <div className="grid sm:grid-cols-3 gap-6 mb-12">
              <ScoreCircle
                score={result.score}
                passes={result.passes}
                totalChecks={result.totalChecks}
              />

              <div className="sm:col-span-2 grid grid-cols-2 gap-4">
                <div className="p-5 rounded-xl bg-white border-2 border-slate-200">
                  <p className="text-3xl font-black text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                    {result.violations.length}
                  </p>
                  <p className="text-sm text-slate-500 mt-1 font-medium">Nalezených problémů</p>
                </div>
                <div className="p-5 rounded-xl bg-white border-2 border-slate-200">
                  <p className="text-3xl font-black text-green-700" style={{ fontFamily: "var(--font-display)" }}>
                    {result.passes}
                  </p>
                  <p className="text-sm text-slate-500 mt-1 font-medium">Kontrol v pořádku</p>
                </div>
                <div className="p-5 rounded-xl bg-white border-2 border-slate-200">
                  <p className="text-3xl font-black text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                    {result.totalChecks}
                  </p>
                  <p className="text-sm text-slate-500 mt-1 font-medium">Celkem kontrol</p>
                </div>
                <div className="p-5 rounded-xl bg-white border-2 border-slate-200">
                  <p className="text-3xl font-black text-slate-900" style={{ fontFamily: "var(--font-display)" }}>
                    {result.violations.reduce((sum, v) => sum + v.nodes.length, 0)}
                  </p>
                  <p className="text-sm text-slate-500 mt-1 font-medium">Dotčených elementů</p>
                </div>
              </div>
            </div>

            {/* Violations */}
            {result.violations.length > 0 ? (
              <div className="space-y-10">
                {groupBySeverity(result.violations).map((group) => (
                  <section key={group.impact}>
                    <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-3">
                      <span className="font-black text-2xl" style={{ fontFamily: "var(--font-display)" }}>
                        {group.issues.length}
                      </span>
                      <span>
                        {group.label}{group.issues.length === 1 ? " problém" : group.issues.length < 5 ? " problémy" : " problémů"}
                      </span>
                    </h2>
                    <div className="space-y-3">
                      {group.issues.map((issue) => (
                        <ViolationCard key={issue.id} issue={issue} />
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-green-50 border-2 border-green-200 rounded-2xl">
                <div className="text-5xl mb-4">&#10003;</div>
                <h2
                  className="text-2xl font-black text-green-800 mb-2"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Žádné problémy nenalezeny
                </h2>
                <p className="text-green-700">
                  Automatická kontrola nenašla žádné porušení WCAG 2.1 AA. Doporučujeme doplnit manuální audit.
                </p>
              </div>
            )}

            {/* Incomplete checks */}
            {result.incomplete.length > 0 && (
              <section className="mt-12">
                <h2
                  className="text-lg font-bold text-slate-900 mb-4"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Ke kontrole manuálně ({result.incomplete.length})
                </h2>
                <p className="text-sm text-slate-500 mb-4">
                  Tyto kontroly vyžadují lidské ověření — automatický sken nedokázal jednoznačně rozhodnout.
                </p>
                <div className="space-y-3">
                  {result.incomplete.map((issue) => (
                    <ViolationCard key={issue.id} issue={issue} />
                  ))}
                </div>
              </section>
            )}

            {/* Disclaimer + CTA */}
            <div className="mt-16 pt-8 border-t-2 border-slate-200">
              <div className="bg-slate-50 border-2 border-slate-200 rounded-xl p-5 mb-8">
                <p className="text-sm text-slate-600 leading-relaxed">
                  <strong className="text-slate-800">Upozornění:</strong> Automatický sken pokrývá přibližně 30–40 % požadavků WCAG 2.1 AA. Kontrola barevného kontrastu, testování klávesnicí a testování se čtečkou obrazovky vyžadují manuální audit. Tento nástroj není právním poradenstvím.
                </p>
              </div>

              <div className="text-center">
                <h3
                  className="text-xl font-bold text-slate-900 mb-4"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Skenovat další stránku
                </h3>
                <div className="flex justify-center">
                  <ScanForm size="compact" />
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-slate-500">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-indigo-700 flex items-center justify-center">
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <span>PřístupnostCheck</span>
          </Link>
          <p>
            Engine{" "}
            <a href="https://github.com/dequelabs/axe-core" target="_blank" rel="noopener noreferrer" className="underline hover:text-slate-700">axe-core</a>{" "}
            (MPL-2.0) · Nejedná se o právní poradenství
          </p>
        </div>
      </footer>
    </div>
  );
}
