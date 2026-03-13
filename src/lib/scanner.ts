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
    screenshot?: string;
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

function mapViolation(
  result: AxeRuleResult,
  screenshots: Map<string, string>,
): ScanIssue {
  const translation = getCzechTranslation(result.id, result.help, result.description);

  return {
    id: result.id,
    impact: (result.impact as ScanIssue["impact"]) || "moderate",
    title: translation.title,
    description: translation.description,
    helpUrl: result.helpUrl,
    fix: translation.fix,
    nodes: result.nodes.map((node) => ({
      html: node.html.length > 300 ? node.html.slice(0, 300) + "…" : node.html,
      target: node.target.join(", "),
      failureSummary: node.failureSummary || "",
      screenshot: screenshots.get(node.target[0]) || undefined,
    })),
  };
}

const SCREENSHOT_QUALITY = 55;

/** Capture one screenshot per node selector using element.screenshot() for reliability. */
async function captureScreenshots(
  page: Awaited<ReturnType<Awaited<ReturnType<typeof puppeteer.launch>>["newPage"]>>,
  violations: AxeRuleResult[],
): Promise<Map<string, string>> {
  const shots = new Map<string, string>();

  // Collect unique selectors across all violations
  const selectorQueue: string[] = [];
  const seen = new Set<string>();
  for (const violation of violations) {
    for (const node of violation.nodes) {
      const sel = node.target[0];
      if (sel && !seen.has(sel)) {
        seen.add(sel);
        selectorQueue.push(sel);
      }
    }
  }

  for (const selector of selectorQueue) {
    try {
      const el = await page.$(selector);
      if (!el) continue;

      // Scroll element into view — helps capture off-viewport elements (carousels, lazy-loaded)
      await page.evaluate((s: string) => {
        const e = document.querySelector(s);
        if (e) e.scrollIntoView({ block: "center", behavior: "instant" });
      }, selector).catch(() => {});

      const box = await el.boundingBox();
      if (!box || box.width < 1 || box.height < 1) continue;

      // For tiny elements (small text), temporarily add padding so screenshot isn't 1px tall
      const needsPadding = box.height < 30 || box.width < 50;
      if (needsPadding) {
        await page.evaluate((s: string) => {
          const e = document.querySelector(s) as HTMLElement | null;
          if (e) {
            e.dataset.origPadding = e.style.padding;
            e.style.setProperty("padding", "12px 16px", "important");
          }
        }, selector);
      }

      try {
        // element.screenshot() handles scrolling + captures exactly the element
        const buf = await el.screenshot({
          encoding: "base64",
          type: "jpeg",
          quality: SCREENSHOT_QUALITY,
        });

        shots.set(selector, `data:image/jpeg;base64,${buf}`);
      } finally {
        if (needsPadding) {
          await page.evaluate((s: string) => {
            const e = document.querySelector(s) as HTMLElement | null;
            if (e) {
              if (e.dataset.origPadding) {
                e.style.padding = e.dataset.origPadding;
              } else {
                e.style.removeProperty("padding");
              }
              delete e.dataset.origPadding;
            }
          }, selector).catch(() => {});
        }
      }
    } catch {
      // Skip elements that can't be captured
    }
  }

  return shots;
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

    // Navigate — use "load" (not networkidle2 which hangs on ad-heavy sites)
    await page.goto(url, {
      waitUntil: "load",
      timeout: PAGE_TIMEOUT_MS,
    });

    // Give JS a moment to render dynamic content (and settle any JS redirects)
    await new Promise((r) => setTimeout(r, 2000));

    // Inject and run axe-core with retry (handles late redirects that destroy context)
    const AXE_ATTEMPTS = 2;
    let results: AxeResults | null = null;

    for (let attempt = 1; attempt <= AXE_ATTEMPTS; attempt++) {
      try {
        await page.addScriptTag({ content: axe.source });

        results = await page.evaluate(() => {
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
        break; // Success — exit retry loop
      } catch (err) {
        if (attempt === AXE_ATTEMPTS) throw err;
        // Wait for any in-flight navigation to settle, then retry
        await new Promise((r) => setTimeout(r, 2000));
        try {
          await page.waitForNavigation({ waitUntil: "load", timeout: 5000 });
        } catch {
          // No navigation — page might have settled already
        }
      }
    }

    if (!results) throw new Error("axe-core not loaded");

    // Capture screenshots of violating elements while browser is open
    const incompleteFiltered = results.incomplete
      .filter((r) => r.nodes.length > 0)
      .slice(0, 10);
    const screenshots = await captureScreenshots(
      page,
      [...results.violations, ...incompleteFiltered],
    );

    const violations = results.violations.map((v) => mapViolation(v, screenshots));
    const incomplete = incompleteFiltered.map((v) => mapViolation(v, screenshots));

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
