import { renderOgCard, OG_SIZE } from "@/lib/og";

/**
 * Open Graph card for /pricing — same card system as the blog and compare
 * articles (src/lib/og.tsx). The file convention registers it as og:image,
 * and the Twitter card picks it up from there. Static, rendered at build.
 */

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Merios pricing: free to download, Merios Plus is $44 a year.";

export default function OgImage() {
  return renderOgCard({
    eyebrow: "Pricing",
    title: "Merios Plus is $44 a year.",
    meta: "Free to download · 7-day free trial",
  });
}
