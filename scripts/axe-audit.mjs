// axe-core a11y audit for the Sprint 5 Phase 4 pages.
// Usage: node scripts/axe-audit.mjs
// Requires a running dev server (default BASE_URL http://localhost:3000).
// Fails (exit 1) if any page reports a violation with impact "critical" or
// "serious". Moderate and minor violations are logged but do not fail.

import { chromium } from "playwright";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const axeSource = readFileSync(
  require.resolve("axe-core/axe.min.js"),
  "utf8",
);

const BASE = process.env.BASE_URL ?? "http://localhost:3000";

const SPEC_URLS = {
  "sprint5-phase4": [
    "/early-access?variant=us",
    "/early-access?variant=rest",
    "/science",
    "/how-it-works",
    "/faq",
  ],
  sprint6: [
    "/about",
    "/contact",
    "/compare",
    "/compare/merios-vs-function-health",
    "/compare/merios-vs-insidetracker",
  ],
};

const SPEC = process.env.AUDIT_SPEC ?? "sprint5-phase4";
const URLS = SPEC_URLS[SPEC];
if (!URLS) {
  console.error(`Unknown AUDIT_SPEC: ${SPEC}`);
  process.exit(1);
}

const FAIL_IMPACTS = new Set(["critical", "serious"]);

async function runAxe(page) {
  await page.addScriptTag({ content: axeSource });
  return page.evaluate(async () => {
    // axe is attached as window.axe by the injected script.
    // eslint-disable-next-line no-undef
    const result = await axe.run(document, {
      resultTypes: ["violations"],
      runOnly: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "best-practice"],
    });
    return result.violations;
  });
}

async function main() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 1,
  });

  let failed = 0;
  const report = [];

  for (const url of URLS) {
    const page = await context.newPage();
    await page.goto(BASE + url, { waitUntil: "networkidle" });
    await page.waitForTimeout(600);
    const violations = await runAxe(page);
    const blocking = violations.filter((v) => FAIL_IMPACTS.has(v.impact));
    const moderate = violations.filter((v) => !FAIL_IMPACTS.has(v.impact));
    report.push({ url, blocking, moderate });
    if (blocking.length > 0) failed += blocking.length;
    await page.close();
  }

  await context.close();
  await browser.close();

  console.log("\n=== axe-core audit report ===");
  for (const r of report) {
    console.log(`\n${r.url}`);
    if (r.blocking.length === 0 && r.moderate.length === 0) {
      console.log("  ✓ no violations");
      continue;
    }
    for (const v of r.blocking) {
      console.log(`  ✗ [${v.impact}] ${v.id} — ${v.help}`);
      for (const n of v.nodes.slice(0, 3)) {
        console.log(`      target: ${n.target.join(", ")}`);
      }
      console.log(`      docs: ${v.helpUrl}`);
    }
    for (const v of r.moderate) {
      console.log(`  · [${v.impact}] ${v.id} — ${v.help}`);
    }
  }

  if (failed > 0) {
    console.log(`\n❌ ${failed} critical/serious violation(s) across ${URLS.length} pages`);
    process.exit(1);
  }
  console.log(`\n✓ 0 critical/serious violations across ${URLS.length} pages`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
