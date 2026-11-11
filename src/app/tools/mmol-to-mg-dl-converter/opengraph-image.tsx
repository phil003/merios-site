import { renderOgCard, OG_SIZE } from "@/lib/og";

/**
 * Open Graph card for /tools/mmol-to-mg-dl-converter — same card system as the blog and compare
 * articles (src/lib/og.tsx). The file convention registers it as og:image,
 * and the Twitter card picks it up from there. Static, rendered at build.
 */

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "mmol/L to mg/dL converter for glucose, cholesterol and more, free from Merios.";

export default function OgImage() {
  return renderOgCard({
    eyebrow: "Free converter",
    title: "mmol/L to mg/dL converter",
    meta: "One factor per marker, from molar mass",
  });
}
