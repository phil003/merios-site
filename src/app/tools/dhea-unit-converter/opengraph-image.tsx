import { renderOgCard, OG_SIZE } from "@/lib/og";

/**
 * Open Graph card for /tools/dhea-unit-converter — same card system as the
 * other tools (src/lib/og.tsx). Static, rendered at build.
 */

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "DHEA unit converter: DHEA-S from µg/dL to µmol/L and DHEA from ng/mL to nmol/L, free from Merios.";

export default function OgImage() {
  return renderOgCard({
    eyebrow: "Free converter",
    title: "DHEA-S conversion: µg/dL to µmol/L",
    meta: "1 µg/dL = 0.02714 µmol/L · DHEA 1 ng/mL = 3.467 nmol/L",
  });
}
