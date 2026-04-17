// Headless screenshot capture for Merios redesign review.
// Usage: node scripts/capture.mjs <spec-name>
//   spec-name = "apppreview-scrub" | "sprint3" | "all"

import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import { join } from "node:path";

const OUT = join(process.cwd(), "screenshots");
mkdirSync(OUT, { recursive: true });

const BASE = process.env.BASE_URL ?? "http://localhost:3000";
const spec = process.argv[2] ?? "all";

const VIEWPORTS = {
  desktop: { width: 1440, height: 900, deviceScaleFactor: 2 },
  mobile: { width: 390, height: 844, deviceScaleFactor: 3, isMobile: true },
};

async function newPage(browser, vp) {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: vp.deviceScaleFactor ?? 2,
    isMobile: vp.isMobile ?? false,
    hasTouch: vp.isMobile ?? false,
    reducedMotion: "no-preference",
  });
  const page = await context.newPage();
  await page.goto(BASE, { waitUntil: "networkidle" });
  // Kill Lenis smooth scrolling during capture — ScrollTrigger still drives scrub.
  await page.evaluate(() => {
    window.scrollTo(0, 0);
    document.documentElement.style.scrollBehavior = "auto";
  });
  await page.waitForTimeout(400);
  return { page, context };
}

async function scrollToAppPreviewProgress(page, progress) {
  // AppPreview pin uses start "top top" + end "+=800". Compute scroll offset
  // from the section's absolute top so we hit the desired scrub progress.
  await page.evaluate(async (p) => {
    const section = document.querySelector('[aria-label="The Merios Score"]');
    if (!section) {
      window.scrollTo(0, document.body.scrollHeight * p);
      return;
    }
    const rect = section.getBoundingClientRect();
    const top = window.scrollY + rect.top;
    window.scrollTo(0, top + 800 * p);
  }, progress);
  // scrub is 0.8s — wait for tween to settle.
  await page.waitForTimeout(1400);
}

async function captureAppPreviewScrub(browser) {
  // Reload between captures so Lenis/scrub state is clean for each shot.
  // 04b — final
  {
    const { page, context } = await newPage(browser, VIEWPORTS.desktop);
    await scrollToAppPreviewProgress(page, 1);
    await page.screenshot({
      path: join(OUT, "04b-apppreview-final.png"),
      fullPage: false,
    });
    console.log("saved 04b-apppreview-final.png");
    await context.close();
  }
  // 04c — enter (15%)
  {
    const { page, context } = await newPage(browser, VIEWPORTS.desktop);
    await scrollToAppPreviewProgress(page, 0.15);
    await page.screenshot({
      path: join(OUT, "04c-apppreview-enter.png"),
      fullPage: false,
    });
    console.log("saved 04c-apppreview-enter.png");
    await context.close();
  }
}

async function scrollSectionIntoView(page, selector) {
  await page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (el) el.scrollIntoView({ block: "start", behavior: "instant" });
  }, selector);
  // Wait for enter-reveals + count-up animations to settle.
  await page.waitForTimeout(2200);
}

async function captureSection(browser, { name, selector, file }) {
  for (const [vpName, vp] of Object.entries(VIEWPORTS)) {
    const { page, context } = await newPage(browser, vp);
    await scrollSectionIntoView(page, selector);
    const suffix = vpName === "desktop" ? "desktop" : "mobile";
    const path = join(OUT, `${file}-${suffix}.png`);
    await page.screenshot({ path, fullPage: false });
    console.log(`saved ${file}-${suffix}.png (${name})`);
    await context.close();
  }
}

async function main() {
  const browser = await chromium.launch();
  try {
    if (spec === "apppreview-scrub" || spec === "all") {
      await captureAppPreviewScrub(browser);
    }
    if (spec === "sprint3" || spec === "all") {
      await captureSection(browser, {
        name: "HowItWorks",
        selector: "#how-it-works",
        file: "05-howitworks",
      });
      await captureSection(browser, {
        name: "Numbers",
        selector: "#numbers",
        file: "06-numbers",
      });
      await captureSection(browser, {
        name: "Science",
        selector: "#science",
        file: "07-science",
      });
    }
    if (spec === "sprint4" || spec === "all") {
      // Navbar fold — at top of page (scrolled=false) AND after scroll (scrolled=true)
      for (const [vpName, vp] of Object.entries(VIEWPORTS)) {
        const { page, context } = await newPage(browser, vp);
        await page.screenshot({
          path: join(OUT, `08-navbar-${vpName}-top.png`),
          clip: { x: 0, y: 0, width: vp.width, height: Math.min(vp.height, 220) },
        });
        console.log(`saved 08-navbar-${vpName}-top.png`);
        await page.evaluate(() => window.scrollTo(0, window.innerHeight + 200));
        await page.waitForTimeout(900);
        await page.screenshot({
          path: join(OUT, `08-navbar-${vpName}-scrolled.png`),
          clip: { x: 0, y: 0, width: vp.width, height: Math.min(vp.height, 220) },
        });
        console.log(`saved 08-navbar-${vpName}-scrolled.png`);
        await context.close();
      }
      await captureSection(browser, {
        name: "Journal",
        selector: "#journal",
        file: "09-journal",
      });
      await captureSection(browser, {
        name: "Waitlist",
        selector: "#waitlist",
        file: "10-waitlist",
      });
      await captureSection(browser, {
        name: "Footer",
        selector: "footer",
        file: "11-footer",
      });
    }
    if (spec === "full" || spec === "all") {
      for (const [vpName, vp] of Object.entries(VIEWPORTS)) {
        const { page, context } = await newPage(browser, vp);
        // settle reveals / animations by scrolling full page once
        await page.evaluate(async () => {
          const max = document.documentElement.scrollHeight;
          const step = window.innerHeight;
          for (let y = 0; y < max; y += step) {
            window.scrollTo(0, y);
            await new Promise((r) => setTimeout(r, 120));
          }
          window.scrollTo(0, 0);
        });
        await page.waitForTimeout(800);
        await page.screenshot({
          path: join(OUT, `00-full-${vpName}.png`),
          fullPage: true,
        });
        console.log(`saved 00-full-${vpName}.png`);
        await context.close();
      }
    }
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
