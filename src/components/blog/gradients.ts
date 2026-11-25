// Tag → Open Sky plate for editorial panels and tag dots. One plate per topic
// family (see getTagPlate in src/lib/covers.ts), so a subject reads in the
// same colour on its cover, its panels and its dots.
import { getTagPlate, PLATES } from "@/lib/covers";

/** CSS background for a panel: the family's soft dawn plate. */
export function getBlogGradient(tag: string): string {
  const plate = PLATES[getTagPlate(tag)];
  return `radial-gradient(60% 80% at 100% 0%, rgb(255 255 255 / 0.85) 0%, rgb(255 255 255 / 0) 60%), linear-gradient(135deg, ${plate.from} 0%, ${plate.to} 100%)`;
}

/** The family's mark colour (dots, small stickers). */
export function getBlogToneHex(tag: string): string {
  return PLATES[getTagPlate(tag)].mark;
}
