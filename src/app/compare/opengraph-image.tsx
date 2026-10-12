import { renderOgCard, OG_SIZE } from "@/lib/og";

/**
 * Open Graph card for /compare — same card system as the blog and compare
 * articles (src/lib/og.tsx). The file convention registers it as og:image,
 * and the Twitter card picks it up from there. Static, rendered at build.
 */

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Merios compared with other health platforms, side by side.";

export default function OgImage() {
  return renderOgCard({
    eyebrow: "Compare",
    title: "Merios vs the rest.",
    meta: "Honest, side-by-side breakdowns",
  });
}
