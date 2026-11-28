import { renderOgCard, OG_SIZE } from "@/lib/og";

/**
 * Open Graph card for /tools/albumin-unit-converter — same card system as the
 * other tools (src/lib/og.tsx). Static, rendered at build.
 */

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Albumin converter from g/dL to g/L and µmol/L, free from Merios.";

export default function OgImage() {
  return renderOgCard({
    eyebrow: "Free converter",
    title: "Albumin conversion: g/dL to g/L",
    meta: "1 g/dL = 10 g/L = 150.5 µmol/L",
  });
}
