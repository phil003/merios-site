import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pre-bake image transforms. Next/Image will serve AVIF or WebP to clients
  // that accept it (Safari falls back to JPEG/PNG). Smaller deviceSizes set
  // since the layout targets a 1280-max content column on desktop and
  // viewports rarely exceed it.
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 414, 640, 750, 828, 1080, 1280, 1600],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year — busted by content hash
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tools.applemediaservices.com",
      },
    ],
  },
  // Tree-shake aggressive Motion / GSAP barrel imports. Reduces the initial
  // JS bundle on routes that only pull a couple of variants from these libs
  // instead of dragging the full surface.
  experimental: {
    optimizePackageImports: ["motion", "gsap"],
  },
  async redirects() {
    return [
      // 308 permanent redirects. Listed in sitemap is forbidden — these
      // routes intentionally don't appear there.
      { source: "/features", destination: "/how-it-works", permanent: true },
      { source: "/support", destination: "/faq", permanent: true },
      // Retired brand-vs comparison. "merios vs X" has no search demand
      // (Google autocomplete returns nothing for "merios"), so this page
      // targeted a query that does not exist. Its topic is now served by the
      // competitor-vs-competitor page, where Merios is a labelled third
      // column. The remaining /compare/merios-vs-* pages stay live until
      // their own competitor-vs-competitor replacements are written.
      // /blog/a1c-to-blood-sugar-chart was a near-duplicate of the tool page:
      // both titled "A1C to Average Blood Sugar ... eAG ... Chart", both
      // chasing the same conversion cluster. Google ranked neither — positions
      // 58 to 80 across roughly 500 impressions a month. Consolidated into the
      // tool, which now carries the calculator, the full 4.0-14.0 chart and the
      // reverse conversion. The article's 11 inbound links were repointed.
      {
        source: "/blog/a1c-to-blood-sugar-chart",
        destination: "/tools/a1c-calculator",
        permanent: true,
      },
      // Same pattern as the A1C consolidation above. /blog/homa-ir-calculator
      // and /tools/homa-ir-calculator were both indexed, both titled "HOMA-IR
      // Calculator", and both embedded the same <HomaIRCalculator />. They split
      // the signal for "homa ir calculator", which sits at position 28.0 despite
      // a dedicated tool page. They also disagreed clinically: the article put
      // early insulin resistance at 1.5-2.5 and "severe" above 5.0, the tool page
      // at 2.0-2.9 and 3.0, the calculator widget at 2.0-2.5 and 2.5 — three
      // different answers on one site for one score. The article's formula, its
      // worked example, its mmol/L note and its unique FAQ entries now live on
      // the tool page, which is the one Google has had indexed since 27/06.
      {
        source: "/blog/homa-ir-calculator",
        destination: "/tools/homa-ir-calculator",
        permanent: true,
      },
      {
        source: "/compare/merios-vs-function-health",
        destination: "/compare/function-health-vs-superpower",
        permanent: true,
      },
      // Same rationale, and this one was also factually stale: it quoted a
      // WHOOP price, marker count and hardware requirement that are all wrong
      // as of Sept 2026, and would have contradicted the new page.
      {
        source: "/compare/merios-vs-whoop-advanced-labs",
        destination: "/compare/whoop-advanced-labs-vs-function-health",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
