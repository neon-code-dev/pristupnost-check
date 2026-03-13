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

const SCREENSHOT_MAX_TOTAL = 10;
const SCREENSHOT_MAX_PER_RULE = 2;
const SCREENSHOT_CLIP_W = 800;
const SCREENSHOT_CLIP_H = 400;
const SCREENSHOT_QUALITY = 55;
const SCREENSHOT_PAD = 80;
const VIEWPORT_W = 1366;
const VIEWPORT_H = 768;

async function captureScreenshots(
  page: Awaited<ReturnType<Awaited<ReturnType<typeof puppeteer.launch>>["newPage"]>>,
  violations: AxeRuleResult[],
): Promise<Map<string, string>> {
  const shots = new Map<string, string>();
  let total = 0;

  for (const violation of violations) {
    if (total >= SCREENSHOT_MAX_TOTAL) break;
    let perRule = 0;

    for (const node of violation.nodes) {
      if (total >= SCREENSHOT_MAX_TOTAL || perRule >= SCREENSHOT_MAX_PER_RULE) break;
      const selector = node.target[0];
      if (!selector || shots.has(selector)) continue;

      try {
        const el = await page.$(selector);
        if (!el) continue;

        // Scroll element to center of viewport
        await page.evaluate((s: string) => {
          document.querySelector(s)?.scrollIntoView({ block: "center", inline: "center" });
        }, selector);
        await new Promise((r) => setTimeout(r, 100));

        // Add red outline highlight
        await page.evaluate((s: string) => {
          const e = document.querySelector(s) as HTMLElement | null;
          if (e) {
            e.style.setProperty("outline", "3px solid #ef4444", "important");
            e.style.setProperty("outline-offset", "2px", "important");
          }
        }, selector);

        try {
          const box = await el.boundingBox();
          if (!box || box.width < 1 || box.height < 1) continue;

          // Calculate clip region centered on element with generous context
          const pad = SCREENSHOT_PAD;
          const w = Math.min(box.width + pad * 2, SCREENSHOT_CLIP_W);
          const h = Math.min(box.height + pad * 2, SCREENSHOT_CLIP_H);
          const cx = box.x + box.width / 2;
          const cy = box.y + box.height / 2;
          const clipX = Math.max(0, cx - w / 2);
          const clipY = Math.max(0, cy - h / 2);

          const clip = {
            x: clipX,
            y: clipY,
            width: Math.min(w, VIEWPORT_W - clipX),
            height: Math.min(h, VIEWPORT_H - clipY),
          };
          if (clip.width < 10 || clip.height < 10) continue;

          const buf = await page.screenshot({
            encoding: "base64",
            type: "jpeg",
            quality: SCREENSHOT_QUALITY,
            clip,
          });

          shots.set(selector, `data:image/jpeg;base64,${buf}`);
          total++;
          perRule++;
        } finally {
          // Always remove outline to avoid leaking into subsequent screenshots
          await page.evaluate((s: string) => {
            const e = document.querySelector(s) as HTMLElement | null;
            if (e) {
              e.style.removeProperty("outline");
              e.style.removeProperty("outline-offset");
            }
          }, selector).catch(() => {});
        }
      } catch {
        // Skip elements that can't be captured
      }
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

    // Give JS a moment to render dynamic content
    await new Promise((r) => setTimeout(r, 2000));

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

    // Capture screenshots of violating elements while browser is open
    const screenshots = await captureScreenshots(page, results.violations);

    const violations = results.violations.map((v) => mapViolation(v, screenshots));
    const incomplete = results.incomplete
      .filter((r) => r.nodes.length > 0)
      .slice(0, 10)
      .map((v) => mapViolation(v, screenshots));

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
