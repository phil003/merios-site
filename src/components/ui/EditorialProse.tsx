import type { ReactNode } from "react";

/**
 * EditorialProse — long-form reading wrapper for editorial pages.
 *
 * Renders the `.editorial-prose` article (base rules in globals.css). The
 * measure and the Open Sky long-read styles (Figtree body, Figtree 600
 * headings, glass lists, white tables) are set by the page around it — see
 * the scoped `.prose` rules in blog-article/article.module.css and
 * compare-article/compareArticle.module.css — so the column can follow the
 * page grid (760px in the article template).
 */

interface EditorialProseProps {
  children: ReactNode;
  className?: string;
}

export default function EditorialProse({
  children,
  className = "",
}: EditorialProseProps) {
  return (
    <article className={`editorial-prose ${className}`.trim()}>
      {children}
    </article>
  );
}

interface PullQuoteProps {
  children: ReactNode;
  cite?: string;
}

/** A pull quote: Figtree 600 statement on a zenith rule (Open Sky). */
export function PullQuote({ children, cite }: PullQuoteProps) {
  return (
    <figure className="relative my-10" style={{ paddingLeft: 28 }}>
      <span
        aria-hidden
        className="absolute left-0 top-1 bottom-1 rounded-full"
        style={{ width: 2, background: "var(--color-zenith, #6E8FE8)" }}
      />
      <blockquote
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(1.5rem, 1.1rem + 1.2vw, 2.125rem)",
          fontWeight: 600,
          fontStyle: "normal",
          lineHeight: 1.2,
          letterSpacing: "-0.025em",
          color: "var(--color-ink)",
        }}
      >
        {children}
      </blockquote>
      {cite ? (
        <figcaption
          className="mt-3"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.14em",
            textTransform: "uppercase",
            color: "var(--color-ink-tertiary)",
          }}
        >
          {cite}
        </figcaption>
      ) : null}
    </figure>
  );
}
