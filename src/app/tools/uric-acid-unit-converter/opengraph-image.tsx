import { renderOgCard, OG_SIZE } from "@/lib/og";

/**
 * Open Graph card for /tools/uric-acid-unit-converter — same card system as the
 * other tools (src/lib/og.tsx). Static, rendered at build.
 */

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Uric acid converter from mg/dL to µmol/L, free from Merios.";

export default function OgImage() {
  return renderOgCard({
    eyebrow: "Free converter",
    title: "Uric acid conversion: mg/dL to µmol/L",
    meta: "1 mg/dL = 59.48 µmol/L = 0.0595 mmol/L",
  });
}
