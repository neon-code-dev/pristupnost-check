import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium-min";
import axe from "axe-core";
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

interface AxeNodeResult {
  html: string;
  target: string[];
  failureSummary?: string;
}

interface AxeRuleResult {
  id: string;
  impact?: string;
  help: string;
  description: string;
  helpUrl: string;
  nodes: AxeNodeResult[];
}

interface AxeResults {
  passes: AxeRuleResult[];
  violations: AxeRuleResult[];
  incomplete: AxeRuleResult[];
}

const PAGE_TIMEOUT_MS = 20000;
const CHROMIUM_PACK_URL =
  "https://github.com/Sparticuz/chromium/releases/download/v143.0.4/chromium-v143.0.4-pack.x64.tar";

function normalizeUrl(input: string): string {
  let url = input.trim();
  if (!url.match(/^https?:\/\//i)) {
    url = `https://${url}`;
  }
  new URL(url);
  return url;
}

function mapViolation(result: AxeRuleResult): ScanIssue {
  const translation = getCzechTranslation(result.id);

  return {
    id: result.id,
    impact: (result.impact as ScanIssue["impact"]) || "moderate",
    title: translation?.title || result.help,
    description: translation?.description || result.description,
    helpUrl: result.helpUrl,
    fix: translation?.fix || "",
    nodes: result.nodes.map((node) => ({
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

  // Disable WebGL for faster startup
  chromium.setGraphicsMode = false;

  const browser = await puppeteer.launch({
    args: puppeteer.defaultArgs({
      args: chromium.args,
      headless: "shell",
    }),
    defaultViewport: { width: 1366, height: 768 },
    executablePath: await chromium.executablePath(CHROMIUM_PACK_URL),
    headless: "shell",
  });

  try {
    const page = await browser.newPage();

    // Set realistic browser headers
    await page.setUserAgent(
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36"
    );

    // Navigate and wait for network to settle
    await page.goto(url, {
      waitUntil: "networkidle2",
      timeout: PAGE_TIMEOUT_MS,
    });

    // Inject axe-core into the page
    await page.addScriptTag({ content: axe.source });

    // Run axe-core in the browser context (all rules, including color-contrast and target-size)
    const results: AxeResults = await page.evaluate(() => {
      return new Promise<AxeResults>((resolve, reject) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const w = window as any;
        if (!w.axe) {
          reject(new Error("axe-core not loaded"));
          return;
        }
        w.axe
          .run(document, {
            runOnly: {
              type: "tag",
              values: [
                "wcag2a",
                "wcag2aa",
                "wcag21a",
                "wcag21aa",
                "wcag22aa",
                "best-practice",
              ],
            },
          })
          .then((r: AxeResults) => resolve(r))
          .catch((e: Error) => reject(e));
      });
    });

    const violations = results.violations.map(mapViolation);
    const incomplete = results.incomplete
      .filter((r) => r.nodes.length > 0)
      .slice(0, 10)
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
    await browser.close();
  }
}
