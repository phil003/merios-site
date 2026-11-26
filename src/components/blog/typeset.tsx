import type { ReactNode } from "react";

const HYPHENATED = /([^\s-]+(?:-[^\s-]+)+)/g;

/**
 * A hyphenated term never splits at its hyphen ("Borderline-High",
 * "Evidence-Based", "At-Home"): each one is kept on one line. Presentation
 * only — the text content is unchanged (titles, H1s and links read the same).
 */
export function keepHyphenated(text: string): ReactNode {
  if (!text.includes("-")) return text;
  return text.split(HYPHENATED).map((part, i) =>
    i % 2 === 1 ? (
      <span key={i} style={{ whiteSpace: "nowrap" }}>
        {part}
      </span>
    ) : (
      part
    ),
  );
}
