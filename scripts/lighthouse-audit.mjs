// Lighthouse audit for the Sprint 5 Phase 4 pages.
// Usage: node scripts/lighthouse-audit.mjs
// Requires a running server (default BASE_URL http://localhost:3000).
// Fails (exit 1) if any page falls below the thresholds:
//   SEO >= 95, Accessibility >= 95, Best Practices >= 90, Performance >= 85.

import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";

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
  sprint7: [
    "/blog",
    "/blog/vitamin-d-deficiency",
    "/blog/apob-heart-disease-risk",
  ],
};

const SPEC = process.env.AUDIT_SPEC ?? "sprint5-phase4";
const URLS = SPEC_URLS[SPEC];
if (!URLS) {
  console.error(`Unknown AUDIT_SPEC: ${SPEC}`);
  process.exit(1);
}

const THRESHOLDS = {
  performance: 85,
  accessibility: 95,
  "best-practices": 90,
  seo: 95,
};

function pct(score) {
  return Math.round(score * 100);
}

async function main() {
  const chrome = await chromeLauncher.launch({
    chromeFlags: ["--headless=new", "--no-sandbox"],
  });

  const results = [];
  let failed = 0;

  try {
    for (const url of URLS) {
      const full = BASE + url;
      const runnerResult = await lighthouse(
        full,
        {
          port: chrome.port,
          output: "json",
          logLevel: "error",
          onlyCategories: [
            "performance",
            "accessibility",
            "best-practices",
            "seo",
          ],
        },
      );
      const { categories } = runnerResult.lhr;
      const scores = {
        url,
        performance: pct(categories.performance.score),
        accessibility: pct(categories.accessibility.score),
        "best-practices": pct(categories["best-practices"].score),
        seo: pct(categories.seo.score),
      };
      results.push(scores);

      for (const [k, v] of Object.entries(THRESHOLDS)) {
        if (scores[k] < v) failed++;
      }
    }
  } finally {
    await chrome.kill();
  }

  console.log("\n=== Lighthouse audit report ===");
  console.log(
    "URL".padEnd(38) +
      "PERF".padStart(6) +
      "A11Y".padStart(6) +
      "BP".padStart(6) +
      "SEO".padStart(6),
  );
  console.log("-".repeat(62));
  for (const r of results) {
    const row = [
      r.url.padEnd(38),
      String(r.performance).padStart(6),
      String(r.accessibility).padStart(6),
      String(r["best-practices"]).padStart(6),
      String(r.seo).padStart(6),
    ].join("");
    console.log(row);
  }
  console.log("-".repeat(62));
  console.log(
    "thresholds".padEnd(38) +
      String(THRESHOLDS.performance).padStart(6) +
      String(THRESHOLDS.accessibility).padStart(6) +
      String(THRESHOLDS["best-practices"]).padStart(6) +
      String(THRESHOLDS.seo).padStart(6),
  );

  if (failed > 0) {
    console.log(`\n❌ ${failed} metric(s) below threshold`);
    process.exit(1);
  }
  console.log("\n✓ all metrics pass thresholds");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
