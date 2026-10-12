import { renderOgCard, OG_SIZE } from "@/lib/og";

/**
 * Open Graph card for /security — same card system as the blog and compare
 * articles (src/lib/og.tsx). The file convention registers it as og:image,
 * and the Twitter card picks it up from there. Static, rendered at build.
 */

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Security at Merios: encryption, infrastructure, retention and disclosure.";

export default function OgImage() {
  return renderOgCard({
    eyebrow: "Security",
    title: "Security at Merios",
    meta: "Encryption · Infrastructure · Disclosure",
  });
}
