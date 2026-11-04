import { renderOgCard, OG_SIZE } from "@/lib/og";

/** Open Graph card for /tools/testosterone-unit-converter (src/lib/og.tsx). Static, rendered at build. */

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Testosterone converter from ng/dL to nmol/L, free from Merios.";

export default function OgImage() {
  return renderOgCard({
    eyebrow: "Free converter",
    title: "Testosterone converter: ng/dL to nmol/L",
    meta: "Exact factor: 1 nmol/L = 28.84 ng/dL",
  });
}
