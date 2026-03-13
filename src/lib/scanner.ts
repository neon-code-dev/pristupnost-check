import { JSDOM } from "jsdom";
import axe, { type Result, type NodeResult } from "axe-core";
import { getCzechTranslation } from "./translations";

export interface ScanIssue {
  id: string;
  impact: "critical" | "serious" | "moderate" | "minor";
  title: string;
  description: string;
  helpUrl: string;
  fix: string;
  nodes: {
    html: string;
    target: string;
    failureSummary: string;
  }[];
}

export interface ScanResult {
  url: string;
  scannedAt: string;
  score: number;
  totalChecks: number;
  passes: number;
  violations: ScanIssue[];
  incomplete: ScanIssue[];
  scanTimeMs: number;
}

const FETCH_TIMEOUT_MS = 8000;

function normalizeUrl(input: string): string {
  let url = input.trim();
  if (!url.match(/^https?:\/\//i)) {
    url = `https://${url}`;
  }
  // Validate URL format
  new URL(url); // throws if invalid
  return url;
}

async function fetchPage(url: string): Promise<string> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "PristupnostCheck/1.0 (accessibility scanner; +https://pristupnost-check.vercel.app)",
        Accept: "text/html,application/xhtml+xml",
        "Accept-Language": "cs,en;q=0.5",
      },
      redirect: "follow",
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const contentType = response.headers.get("content-type") || "";
    if (!contentType.includes("text/html") && !contentType.includes("xhtml")) {
      throw new Error("Stránka nevrátila HTML obsah");
    }

    return await response.text();
  } finally {
    clearTimeout(timeout);
  }
}

function mapViolation(result: Result): ScanIssue {
  const translation = getCzechTranslation(result.id);

  return {
    id: result.id,
    impact: (result.impact as ScanIssue["impact"]) || "moderate",
    title: translation?.title || result.help,
    description: translation?.description || result.description,
    helpUrl: result.helpUrl,
    fix: translation?.fix || "",
    nodes: result.nodes.map((node: NodeResult) => ({
      html: node.html.length > 300 ? node.html.slice(0, 300) + "…" : node.html,
      target: node.target.join(", "),
      failureSummary: node.failureSummary || "",
    })),
  };
}

function calculateScore(passes: number, violations: number): number {
  const total = passes + violations;
  if (total === 0) return 100;
  return Math.round((passes / total) * 100);
}

export async function scanUrl(inputUrl: string): Promise<ScanResult> {
  const start = Date.now();
  const url = normalizeUrl(inputUrl);
  const html = await fetchPage(url);

  const dom = new JSDOM(html, {
    url,
    runScripts: "outside-only",
    pretendToBeVisual: true,
  });

  try {
    const results = await axe.run(dom.window.document, {
      rules: {
        // Disable rules that don't work in jsdom
        "color-contrast": { enabled: false },
      },
      runOnly: {
        type: "tag",
        values: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"],
      },
    });

    const violations = results.violations.map(mapViolation);
    const incomplete = results.incomplete
      .filter((r) => r.nodes.length > 0)
      .slice(0, 5)
      .map(mapViolation);

    return {
      url,
      scannedAt: new Date().toISOString(),
      score: calculateScore(results.passes.length, results.violations.length),
      totalChecks: results.passes.length + results.violations.length,
      passes: results.passes.length,
      violations,
      incomplete,
      scanTimeMs: Date.now() - start,
    };
  } finally {
    dom.window.close();
  }
}
