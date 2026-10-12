import { renderOgCard, OG_SIZE } from "@/lib/og";

/**
 * Open Graph card for /how-it-works — same card system as the blog and compare
 * articles (src/lib/og.tsx). The file convention registers it as og:image,
 * and the Twitter card picks it up from there. Static, rendered at build.
 */

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "How Merios works: from blood tests to action, in three calm steps.";

export default function OgImage() {
  return renderOgCard({
    eyebrow: "How it works",
    title: "From blood tests to action, in three calm steps.",
  });
}
