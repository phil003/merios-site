import type { CSSProperties } from "react";

interface ArticleMetaProps {
  date: string;
  readingTime: number | string;
  category?: string;
  author?: string;
  /** "light" (default) on fog / white cards, "night" on a night stage. */
  tone?: "light" | "night";
  className?: string;
  style?: CSSProperties;
}

function formatDate(input: string): string {
  const d = new Date(input);
  if (Number.isNaN(d.getTime())) return input;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function formatReadingTime(rt: number | string): string {
  if (typeof rt === "number") return `${rt} min read`;
  return /\bread\b/i.test(rt) ? rt : `${rt} read`;
}

/**
 * Mono meta row (date · reading time · category · author) — IBM Plex Mono
 * caps, tabular figures, small round separators.
 */
export default function ArticleMeta({
  date,
  readingTime,
  category,
  author,
  tone = "light",
  className = "",
  style,
}: ArticleMetaProps) {
  const parts = [
    formatDate(date).toUpperCase(),
    formatReadingTime(readingTime).toUpperCase(),
    category ? category.toUpperCase() : null,
    author ? author.toUpperCase() : null,
  ].filter((p): p is string => Boolean(p));

  const night = tone === "night";

  return (
    <div
      className={`flex flex-wrap items-center gap-x-2.5 gap-y-1.5 ${className}`}
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        fontWeight: 500,
        lineHeight: 1.4,
        letterSpacing: "0.14em",
        fontVariantNumeric: "tabular-nums",
        color: night ? "var(--color-on-night-2)" : "var(--color-ink-tertiary)",
        ...style,
      }}
    >
      {parts.map((part, i) => (
        <span key={`${i}-${part}`} className="inline-flex items-center gap-2.5">
          {i > 0 ? (
            <span
              aria-hidden
              className="inline-block h-[3px] w-[3px] rounded-full"
              style={{
                background: night
                  ? "rgb(244 246 247 / 0.4)"
                  : "rgb(16 35 26 / 0.32)",
              }}
            />
          ) : null}
          <span>{part}</span>
        </span>
      ))}
    </div>
  );
}
