import { renderOgCard, OG_SIZE } from "@/lib/og";

/**
 * Open Graph card for /tools/homa-ir-calculator — same card system as the blog and compare
 * articles (src/lib/og.tsx). The file convention registers it as og:image,
 * and the Twitter card picks it up from there. Static, rendered at build.
 */

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "HOMA-IR calculator from fasting glucose and insulin, free from Merios.";

export default function OgImage() {
  return renderOgCard({
    eyebrow: "Free calculator",
    title: "HOMA-IR calculator",
    meta: "Fasting glucose + insulin · Matthews 1985",
  });
}
