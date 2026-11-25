import type { CSSProperties } from "react";

interface ArticleMetaProps {
  date: string;
  readingTime: number | string;
  category?: string;
  author?: string;
  /** "light" (default) on haze / white cards, "night" on an ink block. */
  tone?: "light" | "night";
  className?: string;
  style?: CSSProperties;
}

function formatDate(input: string): string {
  // Date-only ISO strings ("2026-04-30") are read in UTC, so the day never
  // shifts with the build machine's time zone.
  const d = new Date(/^\d{4}-\d{2}-\d{2}$/.test(input) ? `${input}T00:00:00Z` : input);
  if (Number.isNaN(d.getTime())) return input;
  return d.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  });
}

function formatReadingTime(rt: number | string): string {
  if (typeof rt === "number") return `${rt} min read`;
  return /\bread\b/i.test(rt) ? rt : `${rt} read`;
}

/**
 * Meta row (date · reading time · category · author) — the Open Sky label:
 * Figtree 700 caps at 0.14em, tabular figures, small round separators.
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
        fontFamily: "var(--font-sans)",
        fontSize: 11,
        fontWeight: 700,
        lineHeight: 1.4,
        letterSpacing: "0.14em",
        fontVariantNumeric: "tabular-nums",
        color: night ? "rgb(255 255 255 / 0.78)" : "var(--color-ink-tertiary)",
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
                  ? "rgb(255 255 255 / 0.4)"
                  : "rgb(24 33 63 / 0.32)",
              }}
            />
          ) : null}
          <span>{part}</span>
        </span>
      ))}
    </div>
  );
}
