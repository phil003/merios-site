import { renderOgCard, OG_SIZE } from "@/lib/og";

/**
 * Open Graph card for /tools/vitamin-d-unit-converter — same card system as the
 * other tools (src/lib/og.tsx). Static, rendered at build.
 */

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Vitamin D converter from ng/mL to nmol/L, free from Merios.";

export default function OgImage() {
  return renderOgCard({
    eyebrow: "Free converter",
    title: "Vitamin D converter: ng/mL to nmol/L",
    meta: "Exact factor: 1 ng/mL = 2.496 nmol/L",
  });
}
