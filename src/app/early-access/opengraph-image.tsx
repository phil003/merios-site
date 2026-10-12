import { renderOgCard, OG_SIZE } from "@/lib/og";

/**
 * Open Graph card for /early-access — same card system as the blog and compare
 * articles (src/lib/og.tsx). The file convention registers it as og:image,
 * and the Twitter card picks it up from there. Static, rendered at build.
 */

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Merios is on the US App Store and rolling out worldwide.";

export default function OgImage() {
  return renderOgCard({
    eyebrow: "Get the app",
    title: "Now on the US App Store. Rolling out worldwide.",
    meta: "iPhone · iOS 15.1+ · Free to start",
  });
}
