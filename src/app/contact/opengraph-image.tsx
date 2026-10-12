import { renderOgCard, OG_SIZE } from "@/lib/og";

/**
 * Open Graph card for /contact — same card system as the blog and compare
 * articles (src/lib/og.tsx). The file convention registers it as og:image,
 * and the Twitter card picks it up from there. Static, rendered at build.
 */

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Contact Merios: questions, feedback, press and partnerships.";

export default function OgImage() {
  return renderOgCard({
    eyebrow: "Contact",
    title: "Let’s talk.",
    meta: "Questions · Feedback · Press · Partnerships",
  });
}
