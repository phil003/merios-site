import type { CSSProperties } from "react";

// The Merios mark: a drop crossed by a heartbeat that ends on a lime dot.
// Drawn without a clipPath (the inner stretch of the pulse is simply painted
// again in the cut colour) so it is safe to render many times on one page and
// from server components. The viewBox is cropped to the glyph so that, in the
// lockup, the bottom of the drop sits exactly on the wordmark's baseline.

const PULSE = "M45 117 L81 117 L93 137 L109 62 L131 174 L148 117 L194 117";
const PULSE_INSIDE = "M70.16 117 L81 117 L93 137 L109 62 L131 174 L148 117 L169.84 117";
const DROP = "M120 10 L169.84 116.73 A55 55 0 1 1 70.16 116.73 Z";

interface MarkProps {
  /** colour of the drop and of the pulse outside it */
  color?: string;
  /** colour of the pulse where it crosses the drop (usually the background) */
  cut?: string;
  dot?: string;
  className?: string;
  style?: CSSProperties;
  title?: string;
}

export function Mark({
  color = "currentColor",
  cut = "var(--mark-cut, #0D1114)",
  dot = "#D6F050",
  className,
  style,
  title,
}: MarkProps) {
  return (
    <svg
      viewBox="40 6 170 187"
      className={className}
      style={style}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
      focusable="false"
    >
      <path d={PULSE} fill="none" stroke={color} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
      <path d={DROP} fill={color} />
      <path d={PULSE_INSIDE} fill="none" stroke={cut} strokeWidth={10} strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={194} cy={117} r={11} fill={dot} />
    </svg>
  );
}

interface LockupProps {
  /** font-size of the wordmark; the mark scales with it */
  size?: string | number;
  color?: string;
  cut?: string;
  wordStyle?: CSSProperties;
  className?: string;
}

/** Drop + "Merios", the drop's base on the word's baseline. */
export default function Logo({
  size = "1.6rem",
  color = "currentColor",
  cut,
  wordStyle,
  className,
}: LockupProps) {
  return (
    <span
      className={className}
      style={{
        display: "inline-flex",
        alignItems: "baseline",
        gap: "0.26em",
        fontSize: size,
        lineHeight: 1,
        color,
      }}
    >
      <Mark cut={cut} style={{ width: "0.955em", height: "1.05em", flex: "none" }} />
      <span
        style={{
          fontFamily: "var(--font-serif)",
          fontWeight: 500,
          letterSpacing: "-0.02em",
          ...wordStyle,
        }}
      >
        Merios
      </span>
    </span>
  );
}
