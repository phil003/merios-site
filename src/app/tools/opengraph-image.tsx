import { renderOgCard, OG_SIZE } from "@/lib/og";

/**
 * Open Graph card for /tools — same card system as the blog and compare
 * articles (src/lib/og.tsx). The file convention registers it as og:image,
 * and the Twitter card picks it up from there. Static, rendered at build.
 */

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Free health calculators from Merios, backed by published research.";

export default function OgImage() {
  return renderOgCard({
    eyebrow: "Free calculators",
    title: "Health calculators, backed by published research.",
    meta: "No signup · No email gate",
  });
}
