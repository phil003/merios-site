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

async function newPage(browser, vp, path = "/") {
  const context = await browser.newContext({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: vp.deviceScaleFactor ?? 2,
    isMobile: vp.isMobile ?? false,
    hasTouch: vp.isMobile ?? false,
    reducedMotion: "no-preference",
  });
  const page = await context.newPage();
  await page.goto(BASE + path, { waitUntil: "networkidle" });
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
    if (spec === "sprint5-patch") {
      // Targeted shots for the Section-2 product-model patches (Sprint 5).
      // Hero (top of page) + Pillars + Science systems grid — desktop + mobile.
      const shots = [
        {
          name: "hero-patched",
          url: "/",
          locator: null, // top of page
        },
        {
          name: "pillars-patched",
          url: "/",
          locator: 'h2 >> text="What Merios measures."',
        },
        {
          name: "science-systems-patched",
          url: "/science",
          locator: "#coverage",
        },
      ];
      for (const shot of shots) {
        for (const [vpName, vp] of Object.entries(VIEWPORTS)) {
          const { page, context } = await newPage(browser, vp, shot.url);
          if (shot.locator) {
            await page.evaluate(async (sel) => {
              const el = sel.startsWith("h2 >> text=")
                ? [...document.querySelectorAll("h2")].find((h) =>
                    h.textContent?.includes(
                      sel.replace('h2 >> text="', "").replace(/"$/, ""),
                    ),
                  )
                : document.querySelector(sel);
              if (el) el.scrollIntoView({ block: "start", behavior: "instant" });
            }, shot.locator);
            await page.waitForTimeout(2200);
          } else {
            await page.waitForTimeout(600);
          }
          const path = join(
            OUT,
            "sprint-5",
            `${shot.name}-${vpName === "desktop" ? "desktop" : "mobile"}.png`,
          );
          await page.screenshot({ path, fullPage: false });
          console.log(`saved sprint-5/${shot.name}-${vpName}.png`);
          await context.close();
        }
      }
    }
    if (spec === "sprint5-phase32") {
      // Full-page shots for Phase 3.2 scaffolds:
      // /early-access (rest + US variants), /how-it-works, /faq.
      const pages = [
        { name: "early-access-rest-full", url: "/early-access" },
        { name: "early-access-us-full", url: "/early-access?variant=us" },
        { name: "how-it-works-full", url: "/how-it-works" },
        { name: "faq-full", url: "/faq" },
      ];
      for (const pg of pages) {
        for (const [vpName, vp] of Object.entries(VIEWPORTS)) {
          const { page, context } = await newPage(browser, vp, pg.url);
          // Scroll through the page so reveals settle before capture.
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
          const path = join(
            OUT,
            "sprint-5",
            `${pg.name}-${vpName === "desktop" ? "desktop" : "mobile"}.png`,
          );
          await page.screenshot({ path, fullPage: true });
          console.log(`saved sprint-5/${pg.name}-${vpName}.png`);
          await context.close();
        }
      }
    }
    if (spec === "sprint5-phase4") {
      // Phase 4 polish screenshots: 21 shots covering the 4 polished pages.
      const OUT_P4 = join(OUT, "sprint-5-phase4");
      mkdirSync(OUT_P4, { recursive: true });

      async function fullPageShot(url, file, vpName) {
        const vp = VIEWPORTS[vpName];
        const { page, context } = await newPage(browser, vp, url);
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
        const p = join(OUT_P4, `${file}-${vpName}.png`);
        await page.screenshot({ path: p, fullPage: true });
        console.log(`saved sprint-5-phase4/${file}-${vpName}.png`);
        await context.close();
      }

      async function viewportShot(url, file, vpName, scrollTo) {
        const vp = VIEWPORTS[vpName];
        const { page, context } = await newPage(browser, vp, url);
        if (scrollTo) {
          await page.evaluate(scrollTo);
          await page.waitForTimeout(1400);
        }
        const p = join(OUT_P4, `${file}-${vpName}.png`);
        await page.screenshot({ path: p, fullPage: false });
        console.log(`saved sprint-5-phase4/${file}-${vpName}.png`);
        await context.close();
      }

      // /early-access — 4 shots (US + Rest, desktop + mobile)
      await fullPageShot("/early-access?variant=us", "ea-us-full", "desktop");
      await fullPageShot("/early-access?variant=us", "ea-us-full", "mobile");
      await fullPageShot("/early-access?variant=rest", "ea-rest-full", "desktop");
      await fullPageShot("/early-access?variant=rest", "ea-rest-full", "mobile");

      // /science — 6 shots (full desktop + mobile, + 1 shot mid-scroll on coverage, + 1 on model diagram)
      await fullPageShot("/science", "science-full", "desktop");
      await fullPageShot("/science", "science-full", "mobile");
      await viewportShot("/science", "science-coverage", "desktop", () => {
        const el = document.querySelector("#coverage");
        if (el) el.scrollIntoView({ block: "start", behavior: "instant" });
      });
      await viewportShot("/science", "science-coverage", "mobile", () => {
        const el = document.querySelector("#coverage");
        if (el) el.scrollIntoView({ block: "start", behavior: "instant" });
      });
      await viewportShot("/science", "science-model-diagram", "desktop", () => {
        const el = document.querySelector("#model");
        if (el) el.scrollIntoView({ block: "start", behavior: "instant" });
      });
      await viewportShot("/science", "science-model-diagram", "mobile", () => {
        const el = document.querySelector("#model");
        if (el) el.scrollIntoView({ block: "start", behavior: "instant" });
      });

      // /how-it-works — 5 shots (full desktop + mobile, + pin mid-scroll on desktop)
      await fullPageShot("/how-it-works", "hiw-full", "desktop");
      await fullPageShot("/how-it-works", "hiw-full", "mobile");
      await viewportShot("/how-it-works", "hiw-understand-pin", "desktop", () => {
        const el = document.querySelector('[data-hiw-section="understand"]');
        if (el) {
          el.scrollIntoView({ block: "start", behavior: "instant" });
          window.scrollBy(0, 400);
        }
      });
      await viewportShot("/how-it-works", "hiw-understand-pin", "mobile", () => {
        const el = document.querySelector('[data-hiw-section="understand"]');
        if (el) el.scrollIntoView({ block: "start", behavior: "instant" });
      });
      await viewportShot("/how-it-works", "hiw-steps", "desktop", () => {
        window.scrollTo(0, document.documentElement.scrollHeight * 0.4);
      });

      // /faq — 6 shots (full desktop + mobile, + filter "science" active, + 3 accordions open)
      await fullPageShot("/faq", "faq-full", "desktop");
      await fullPageShot("/faq", "faq-full", "mobile");
      {
        const { page, context } = await newPage(browser, VIEWPORTS.desktop, "/faq");
        await page.evaluate(() => {
          const chip = [...document.querySelectorAll('button')].find(
            (b) => b.textContent?.toLowerCase().includes("science"),
          );
          if (chip) chip.click();
        });
        await page.waitForTimeout(800);
        await page.screenshot({
          path: join(OUT_P4, "faq-filter-science-desktop.png"),
          fullPage: true,
        });
        console.log("saved sprint-5-phase4/faq-filter-science-desktop.png");
        await context.close();
      }
      {
        const { page, context } = await newPage(browser, VIEWPORTS.mobile, "/faq");
        await page.evaluate(() => {
          const chip = [...document.querySelectorAll('button')].find(
            (b) => b.textContent?.toLowerCase().includes("science"),
          );
          if (chip) chip.click();
        });
        await page.waitForTimeout(800);
        await page.screenshot({
          path: join(OUT_P4, "faq-filter-science-mobile.png"),
          fullPage: true,
        });
        console.log("saved sprint-5-phase4/faq-filter-science-mobile.png");
        await context.close();
      }
      {
        const { page, context } = await newPage(browser, VIEWPORTS.desktop, "/faq");
        await page.evaluate(() => {
          const summaries = [...document.querySelectorAll("details > summary")];
          summaries.slice(0, 3).forEach((s) => (s.parentElement).setAttribute("open", ""));
        });
        await page.waitForTimeout(600);
        await page.screenshot({
          path: join(OUT_P4, "faq-three-open-desktop.png"),
          fullPage: true,
        });
        console.log("saved sprint-5-phase4/faq-three-open-desktop.png");
        await context.close();
      }
      {
        const { page, context } = await newPage(browser, VIEWPORTS.mobile, "/faq");
        await page.evaluate(() => {
          const summaries = [...document.querySelectorAll("details > summary")];
          summaries.slice(0, 3).forEach((s) => (s.parentElement).setAttribute("open", ""));
        });
        await page.waitForTimeout(600);
        await page.screenshot({
          path: join(OUT_P4, "faq-three-open-mobile.png"),
          fullPage: true,
        });
        console.log("saved sprint-5-phase4/faq-three-open-mobile.png");
        await context.close();
      }
    }
    if (spec === "sprint6") {
      // Sprint 6 premium pages: /about, /contact, /compare, /compare/[slug].
      const OUT_6 = join(OUT, "sprint-6");
      mkdirSync(OUT_6, { recursive: true });

      async function fullPageShot(url, file, vpName) {
        const vp = VIEWPORTS[vpName];
        const { page, context } = await newPage(browser, vp, url);
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
        const p = join(OUT_6, `${file}-${vpName}.png`);
        await page.screenshot({ path: p, fullPage: true });
        console.log(`saved sprint-6/${file}-${vpName}.png`);
        await context.close();
      }

      // /about — 2 shots
      await fullPageShot("/about", "about-full", "desktop");
      await fullPageShot("/about", "about-full", "mobile");

      // /contact — 2 shots + 1 success state
      await fullPageShot("/contact", "contact-full", "desktop");
      await fullPageShot("/contact", "contact-full", "mobile");
      {
        const { page, context } = await newPage(
          browser,
          VIEWPORTS.desktop,
          "/contact",
        );
        await page.evaluate(() => {
          const nameEl = document.querySelector('input[name="name"]');
          const emailEl = document.querySelector('input[name="email"]');
          const subjEl = document.querySelector('input[name="subject"]');
          const msgEl = document.querySelector('textarea[name="message"]');
          if (nameEl) nameEl.value = "Screenshot test";
          if (emailEl) emailEl.value = "shot@example.com";
          if (subjEl) subjEl.value = "Sprint 6 success state";
          if (msgEl)
            msgEl.value =
              "This is a screenshot of the contact form success state.";
          [nameEl, emailEl, subjEl, msgEl].forEach((el) => {
            if (el)
              el.dispatchEvent(new Event("input", { bubbles: true }));
          });
        });
        await page.waitForTimeout(400);
        await page.screenshot({
          path: join(OUT_6, "contact-prefilled-desktop.png"),
          fullPage: true,
        });
        console.log("saved sprint-6/contact-prefilled-desktop.png");
        await context.close();
      }

      // /compare (index) — 2 shots
      await fullPageShot("/compare", "compare-index-full", "desktop");
      await fullPageShot("/compare", "compare-index-full", "mobile");

      // /compare/[slug] — 4 shots across 2 slugs
      await fullPageShot(
        "/compare/merios-vs-function-health",
        "compare-function-health-full",
        "desktop",
      );
      await fullPageShot(
        "/compare/merios-vs-function-health",
        "compare-function-health-full",
        "mobile",
      );
      await fullPageShot(
        "/compare/merios-vs-insidetracker",
        "compare-insidetracker-full",
        "desktop",
      );
      await fullPageShot(
        "/compare/merios-vs-insidetracker",
        "compare-insidetracker-full",
        "mobile",
      );
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
