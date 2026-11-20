import { renderOgCard, OG_SIZE } from "@/lib/og";

/**
 * Open Graph card for /tools/iron-unit-converter — same card system as the
 * other tools (src/lib/og.tsx). Static, rendered at build.
 */

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Iron unit converter from µg/dL to µmol/L, with ferritin units, free from Merios.";

export default function OgImage() {
  return renderOgCard({
    eyebrow: "Free converter",
    title: "Iron conversion: µg/dL to µmol/L",
    meta: "1 µg/dL = 0.1791 µmol/L · ferritin 1 ng/mL = 1 µg/L",
  });
}
