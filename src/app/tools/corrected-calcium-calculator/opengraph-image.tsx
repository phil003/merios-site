import { renderOgCard, OG_SIZE } from "@/lib/og";

/**
 * Open Graph card for /tools/corrected-calcium-calculator — same card system as
 * the other tools (src/lib/og.tsx). Static, rendered at build.
 */

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Corrected calcium calculator, adjusting total calcium for albumin, free from Merios.";

export default function OgImage() {
  return renderOgCard({
    eyebrow: "Free calculator",
    title: "Corrected Calcium Calculator",
    meta: "Ca + 0.8 × (4.0 − albumin)",
  });
}
