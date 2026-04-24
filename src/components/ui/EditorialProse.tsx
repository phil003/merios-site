import type { ReactNode } from "react";

/**
 * EditorialProse — long-form reading wrapper for editorial pages.
 *
 * Applies max-width 680px, Fraunces for headings, Inter Tight for body at
 * 18px leading-relaxed, and standard vertical rhythm. A top-level paragraph
 * can opt into a drop-cap by adding className="drop-cap".
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
    <article
      className={`editorial-prose mx-auto max-w-[680px] ${className}`}
      style={{
        fontFamily: "var(--font-sans)",
        fontSize: 18,
        lineHeight: 1.7,
        color: "var(--color-ink-secondary)",
      }}
    >
      {children}
    </article>
  );
}

interface PullQuoteProps {
  children: ReactNode;
  cite?: string;
}

export function PullQuote({ children, cite }: PullQuoteProps) {
  return (
    <figure
      className="my-10"
      style={{
        borderLeft: "2px solid var(--color-green-deep)",
        paddingLeft: 24,
      }}
    >
      <blockquote
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(1.25rem, 1.6vw, 1.5rem)",
          fontWeight: 400,
          fontStyle: "italic",
          lineHeight: 1.35,
          letterSpacing: "-0.01em",
          color: "var(--color-ink)",
        }}
      >
        {children}
      </blockquote>
      {cite ? (
        <figcaption
          className="mt-3"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
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
