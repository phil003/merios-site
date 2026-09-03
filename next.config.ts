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
      // /pricing retired (pricing model not finalised pre App-Store launch).
      // All commercial intent flows now go through /early-access.
      { source: "/pricing", destination: "/early-access", permanent: true },
      // Retired brand-vs comparison. "merios vs X" has no search demand
      // (Google autocomplete returns nothing for "merios"), so this page
      // targeted a query that does not exist. Its topic is now served by the
      // competitor-vs-competitor page, where Merios is a labelled third
      // column. The remaining /compare/merios-vs-* pages stay live until
      // their own competitor-vs-competitor replacements are written.
      {
        source: "/compare/merios-vs-function-health",
        destination: "/compare/function-health-vs-superpower",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
