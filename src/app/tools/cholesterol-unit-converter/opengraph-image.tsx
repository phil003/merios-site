import { renderOgCard, OG_SIZE } from "@/lib/og";

/** Open Graph card for /tools/cholesterol-unit-converter (src/lib/og.tsx). Static, rendered at build. */

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Cholesterol converter from mg/dL to mmol/L, free from Merios.";

export default function OgImage() {
  return renderOgCard({
    eyebrow: "Free converter",
    title: "Cholesterol converter: mg/dL to mmol/L",
    meta: "LDL, HDL, triglycerides and ApoB, each with its own factor",
  });
}
