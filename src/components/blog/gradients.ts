// Tag → pop surface for editorial panels (category cards, emoji stickers).
// One colour per topic family (see getTagTone in src/lib/covers.ts), so the
// same subject reads in the same colour on covers, panels and chips.
import { getTagTone, TONE_HEX, TONE_LIGHT } from "@/lib/covers";

/** CSS background for a pop panel: the tone with a soft light sheen. */
export function getBlogGradient(tag: string): string {
  const tone = getTagTone(tag);
  return `radial-gradient(120% 90% at 18% 0%, ${TONE_LIGHT[tone]} 0%, ${TONE_HEX[tone]} 62%)`;
}

/** Flat tone colour (dots, small stickers). */
export function getBlogToneHex(tag: string): string {
  return TONE_HEX[getTagTone(tag)];
}
