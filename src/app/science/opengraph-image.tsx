import { renderOgCard, OG_SIZE } from "@/lib/og";

/**
 * Open Graph card for /science — same card system as the blog and compare
 * articles (src/lib/og.tsx). The file convention registers it as og:image,
 * and the Twitter card picks it up from there. Static, rendered at build.
 */

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "The science behind Merios: blood, read as a system.";

export default function OgImage() {
  return renderOgCard({
    eyebrow: "The science",
    title: "Blood, read as a system.",
    meta: "Composite score · Biological age",
  });
}
