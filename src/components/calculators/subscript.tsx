import { Fragment, type ReactNode } from "react";

/**
 * Chemical subscripts (HCO₃, CO₂, VO₂) as <sub>.
 *
 * Figtree and Newsreader load the latin subset only, which has no subscript
 * digits (U+2080–2089): typed as Unicode they fall back to another font and
 * sit on the baseline. Copy keeps the Unicode digit (so JSON-LD and data stay
 * correct); this renders each run of them as a real <sub>.
 */
const SUBSCRIPTS = /([₀-₉]+)/;

export function withSubs(text: string): ReactNode {
  if (!SUBSCRIPTS.test(text)) return text;
  return text.split(SUBSCRIPTS).map((part, i) =>
    i % 2 === 1 ? (
      <sub key={i}>{Array.from(part, (c) => String(c.charCodeAt(0) - 0x2080)).join("")}</sub>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}
