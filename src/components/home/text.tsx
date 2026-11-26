import { Fragment, type ReactNode } from "react";

/**
 * Keeps hyphenated terms ("25-OH", "7-day", "HOMA-IR") on one line: a line
 * break inside one reads as two words. Figtree has no non-breaking hyphen
 * (U+2011), so the term goes in a nowrap span instead.
 */
export function keepHyphens(text: string): ReactNode {
  const parts = text.split(/(\S+-\S+)/g);
  if (parts.length === 1) return text;
  return parts.map((part, i) =>
    i % 2 ? (
      <span key={i} className="hv2-nowrap">
        {part}
      </span>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}
