import type { CSSProperties } from "react";

// The Merios logo, provisional (brand rule since 21/11/2026: the drop + pulse
// mark is abandoned everywhere). Until the new logo exists, the logo is the
// name "merios" set in text, Figtree 600, ink. Where a square mark is needed
// (app icons, favicons, the /phil card, the about emblem) the mark is the
// lowercase "m" of that same wordmark, drawn as a path so it never depends on
// the web font: the Figtree 600 outline, normalised to a 100-unit-wide box.
// The favicons in public/ use the same outline.

const M_GLYPH =
  "M0 68.18L0 1.6L13.98 1.6L14.65 10.52Q17.71 5.33 22.5 2.66Q27.3 0 33.42 0Q41.41 0 47 3.6Q52.6 7.19 55.13 14.51Q58.06 7.46 63.38 3.73Q68.71 0 75.9 0Q87.48 0 93.74 7.39Q100 14.78 99.87 30.09L99.87 68.18L85.09 68.18L85.09 34.09Q85.09 26.1 83.36 21.77Q81.62 17.44 78.7 15.71Q75.77 13.98 71.9 13.98Q64.98 13.85 61.19 18.91Q57.39 23.97 57.39 33.42L57.39 68.18L42.48 68.18L42.48 34.09Q42.48 26.1 40.81 21.77Q39.15 17.44 36.22 15.71Q33.29 13.98 29.43 13.98Q22.5 13.85 18.71 18.91Q14.91 23.97 14.91 33.42L14.91 68.18L0 68.18Z";

interface MarkProps {
  /** colour of the "m" */
  color?: string;
  /** kept for older call sites (the drop mark's cut colour); no longer drawn */
  cut?: string;
  /** kept for older call sites (the drop mark's apricot sun); no longer drawn */
  dot?: string;
  className?: string;
  style?: CSSProperties;
  title?: string;
}

/** The provisional mark: the wordmark's lowercase "m", scaled to its box. */
export function Mark({ color = "currentColor", className, style, title }: MarkProps) {
  return (
    <svg
      viewBox="0 0 100 68.18"
      className={className}
      style={style}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <path d={M_GLYPH} fill={color} />
    </svg>
  );
}

interface LockupProps {
  /** font-size of the wordmark */
  size?: string | number;
  color?: string;
  /** kept for older call sites (the drop mark's cut colour); no longer drawn */
  cut?: string;
  wordStyle?: CSSProperties;
  className?: string;
}

/** The wordmark: "merios" in Figtree 600, set tight. */
export default function Logo({
  size = "1.6rem",
  color = "currentColor",
  wordStyle,
  className,
}: LockupProps) {
  return (
    <span
      className={className}
      style={{
        display: "inline-block",
        fontSize: size,
        lineHeight: 1,
        color,
        fontFamily: "var(--font-sans)",
        fontWeight: 600,
        letterSpacing: "-0.035em",
        ...wordStyle,
      }}
    >
      merios
    </span>
  );
}
