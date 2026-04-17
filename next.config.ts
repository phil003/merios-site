import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/features", destination: "/how-it-works", permanent: true },
      { source: "/support", destination: "/faq", permanent: true },
    ];
  },
};

export default nextConfig;
