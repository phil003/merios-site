import { renderOgCard, OG_SIZE } from "@/lib/og";

/**
 * Open Graph card for /tools/bilirubin-unit-converter — same card system as the
 * other tools (src/lib/og.tsx). Static, rendered at build.
 */

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Bilirubin converter from mg/dL to µmol/L, free from Merios.";

export default function OgImage() {
  return renderOgCard({
    eyebrow: "Free converter",
    title: "Bilirubin conversion: mg/dL to µmol/L",
    meta: "1 mg/dL = 17.1 µmol/L",
  });
}
