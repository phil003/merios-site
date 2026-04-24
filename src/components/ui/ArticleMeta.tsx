import type { CSSProperties } from "react";

interface ArticleMetaProps {
  date: string;
  readingTime: number | string;
  category?: string;
  author?: string;
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

export default function ArticleMeta({
  date,
  readingTime,
  category,
  author,
  className = "",
  style,
}: ArticleMetaProps) {
  const parts = [
    formatDate(date).toUpperCase(),
    formatReadingTime(readingTime).toUpperCase(),
    category ? category.toUpperCase() : null,
    author ? author.toUpperCase() : null,
  ].filter((p): p is string => Boolean(p));

  return (
    <div
      className={`flex flex-wrap items-center gap-x-2.5 gap-y-1 ${className}`}
      style={{
        fontFamily: "var(--font-mono)",
        fontSize: 11,
        letterSpacing: "0.14em",
        color: "color-mix(in srgb, var(--color-ink) 60%, transparent)",
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
                background:
                  "color-mix(in srgb, var(--color-ink) 35%, transparent)",
              }}
            />
          ) : null}
          <span>{part}</span>
        </span>
      ))}
    </div>
  );
}
