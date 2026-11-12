import { renderOgCard, OG_SIZE } from "@/lib/og";

/**
 * Open Graph card for /tools/anion-gap-calculator — same card system as the blog and compare
 * articles (src/lib/og.tsx). The file convention registers it as og:image,
 * and the Twitter card picks it up from there. Static, rendered at build.
 */

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Anion gap calculator, free from Merios.";

export default function OgImage() {
  return renderOgCard({
    eyebrow: "Free calculator",
    title: "Anion gap calculator",
    meta: "Na − (Cl + HCO3)",
  });
}
