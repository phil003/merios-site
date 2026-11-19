import { renderOgCard, OG_SIZE } from "@/lib/og";

/**
 * Open Graph card for /tools/creatinine-unit-converter — same card system as the
 * other tools (src/lib/og.tsx). Static, rendered at build.
 */

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Creatinine unit converter from µmol/L to mg/dL, free from Merios.";

export default function OgImage() {
  return renderOgCard({
    eyebrow: "Free converter",
    title: "Creatinine conversion: µmol/L to mg/dL",
    meta: "1 mg/dL = 88.4 µmol/L = 0.0884 mmol/L",
  });
}
