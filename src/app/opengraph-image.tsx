import { renderOgCard, OG_SIZE } from "@/lib/og";

/**
 * Open Graph card for the homepage, in the v2 "Open Sky" card system
 * (src/lib/og.tsx). It replaces the static v3 /og-image.png for the root
 * segment; pages with their own opengraph-image.tsx keep theirs. Static,
 * rendered at build.
 */

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "Merios: your health, finally readable.";

export default function OgImage() {
  return renderOgCard({
    eyebrow: "The preventive health platform",
    title: "Your health, finally readable.",
  });
}
