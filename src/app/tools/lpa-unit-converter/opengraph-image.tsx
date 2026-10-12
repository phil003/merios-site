import { renderOgCard, OG_SIZE } from "@/lib/og";

/**
 * Open Graph card for /tools/lpa-unit-converter — same card system as the blog and compare
 * articles (src/lib/og.tsx). The file convention registers it as og:image,
 * and the Twitter card picks it up from there. Static, rendered at build.
 */

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Lp(a) unit converter from nmol/L to mg/dL, free from Merios.";

export default function OgImage() {
  return renderOgCard({
    eyebrow: "Free converter",
    title: "Lp(a) unit converter: nmol/L to mg/dL",
    meta: "A range, not a false single number",
  });
}
