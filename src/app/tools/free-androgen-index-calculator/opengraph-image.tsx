import { renderOgCard, OG_SIZE } from "@/lib/og";

/**
 * Open Graph card for /tools/free-androgen-index-calculator — same card system as the blog and compare
 * articles (src/lib/og.tsx). The file convention registers it as og:image,
 * and the Twitter card picks it up from there. Static, rendered at build.
 */

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Free androgen index (FAI) calculator for total testosterone and SHBG, from Merios.";

export default function OgImage() {
  return renderOgCard({
    eyebrow: "Free calculator",
    title: "Free androgen index calculator",
    meta: "100 × total T ÷ SHBG · ng/dL or nmol/L",
  });
}
