import { renderOgCard, OG_SIZE } from "@/lib/og";

/**
 * Open Graph card for /about — same card system as the blog and compare
 * articles (src/lib/og.tsx). The file convention registers it as og:image,
 * and the Twitter card picks it up from there. Static, rendered at build.
 */

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "About Merios: a quiet instrument for a noisy decade of health data.";

export default function OgImage() {
  return renderOgCard({
    eyebrow: "About Merios",
    title: "A quiet instrument for a noisy decade of health data.",
  });
}
