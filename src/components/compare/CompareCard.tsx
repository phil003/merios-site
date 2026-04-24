import Link from "next/link";
import type { ComparePost } from "@/lib/compare";

interface CompareCardProps {
  post: ComparePost;
  /**
   * Three short labels shown under the description. Kept generic so the card
   * stays consistent across every comparison — the MDX layer owns detail.
   */
  tags?: readonly [string, string, string];
}

const DEFAULT_TAGS: readonly [string, string, string] = [
  "Biomarkers",
  "Pricing",
  "iOS",
];

/**
 * Scoped hover/focus styles. Inlined as a plain <style> tag so the card stays
 * a server component and we avoid hex colours (CSS vars only). The rule set
 * is tiny; no duplication across the grid because the browser dedupes by
 * identical text content in practice.
 */
const CARD_STYLES = `
.compare-card:hover,
.compare-card:focus-visible {
  border-color: color-mix(in srgb, var(--color-green-deep) 35%, var(--color-grid));
  box-shadow:
    inset 0 0 0 1px color-mix(in srgb, var(--color-green-deep) 20%, transparent),
    0 12px 30px -18px color-mix(in srgb, var(--color-ink) 40%, transparent);
}
.compare-card:focus-visible {
  outline: 2px solid var(--color-green-deep);
  outline-offset: 3px;
}
.compare-card:hover .compare-card-arrow,
.compare-card:focus-visible .compare-card-arrow {
  transform: translateX(4px);
}
`;

export default function CompareCard({
  post,
  tags = DEFAULT_TAGS,
}: CompareCardProps) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: CARD_STYLES }} />
      <Link
        href={`/compare/${post.slug}`}
        className="compare-card group relative flex h-full flex-col rounded-2xl p-6 md:p-7 transition-[transform,box-shadow,border-color] duration-300 ease-out will-change-transform hover:-translate-y-1 focus-visible:-translate-y-1 focus-visible:outline-none"
        style={{
          background: "var(--color-canvas-alt)",
          border: "1px solid var(--color-grid)",
        }}
        aria-label={`Read comparison: ${post.title}`}
      >
        {/* vs {competitor} — mono eyebrow */}
        <div
          className="inline-flex items-center gap-2"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <span
            aria-hidden
            className="inline-block h-1 w-1 rounded-full"
            style={{ background: "var(--color-pulse)" }}
          />
          <span
            style={{
              fontSize: 10.5,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--color-ink-tertiary)",
              fontWeight: 500,
            }}
          >
            vs {post.competitor}
          </span>
        </div>

        {/* Title */}
        <h2
          className="mt-5"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.375rem, 1.6vw, 1.6875rem)",
            fontWeight: 350,
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
            color: "var(--color-ink)",
          }}
        >
          {post.title}
        </h2>

        {/* Description */}
        <p
          className="mt-3"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 15,
            lineHeight: 1.55,
            color: "var(--color-ink-secondary)",
            letterSpacing: "-0.003em",
          }}
        >
          {post.description}
        </p>

        {/* Tags */}
        <ul
          className="mt-6 flex flex-wrap gap-2"
          aria-label="Comparison topics"
        >
          {tags.map((tag) => (
            <li
              key={tag}
              className="inline-flex items-center rounded-full px-2.5 py-1"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 10.5,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--color-ink-secondary)",
                border: "1px solid var(--color-grid)",
                fontWeight: 500,
              }}
            >
              {tag}
            </li>
          ))}
        </ul>

        {/* Spacer to push CTA to bottom */}
        <div className="flex-1" />

        {/* Footer meta + CTA */}
        <div
          className="mt-7 flex items-center justify-between gap-4 pt-5"
          style={{ borderTop: "1px solid var(--color-grid)" }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10.5,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--color-ink-tertiary)",
            }}
          >
            {post.readTime}
          </span>
          <span
            className="inline-flex items-center gap-2"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: 15,
              fontWeight: 400,
              color: "var(--color-green-deep)",
              letterSpacing: "-0.005em",
            }}
          >
            Read comparison
            <span
              aria-hidden
              className="compare-card-arrow inline-block transition-transform duration-300 ease-out"
            >
              →
            </span>
          </span>
        </div>
      </Link>
    </>
  );
}
