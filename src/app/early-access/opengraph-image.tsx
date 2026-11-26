import { renderOgCard, OG_SIZE } from "@/lib/og";

/**
 * Open Graph card for /early-access — same card system as the blog and compare
 * articles (src/lib/og.tsx). The file convention registers it as og:image,
 * and the Twitter card picks it up from there. Static, rendered at build.
 */

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Merios is on the App Store in 174 countries and regions.";

export default function OgImage() {
  return renderOgCard({
    eyebrow: "Get the app",
    title: "Now on the App Store in 174 countries and regions.",
    // The card's meta line is uppercased (src/lib/og.tsx): no Apple name in
    // it, since "iPhone" and "iOS" must keep Apple's casing.
    meta: "Free to start",
  });
}
