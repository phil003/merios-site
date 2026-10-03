import type { ReactNode } from "react";

/**
 * EditorialProse — long-form reading wrapper for editorial pages.
 *
 * Applies max-width 680px, Bricolage for headings, Newsreader for body at
 * 19px with comfortable leading, and standard vertical rhythm (all in the
 * .editorial-prose rules of globals.css). A top-level paragraph can opt into
 * a drop-cap by adding className="drop-cap".
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
    <article className={`editorial-prose mx-auto max-w-[680px] ${className}`}>
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
      className="relative my-10"
      style={{ paddingLeft: 26 }}
    >
      <span
        aria-hidden
        className="absolute left-0 top-1 bottom-1 w-1 rounded-full"
        style={{ background: "var(--color-lime)", boxShadow: "0 0 0 1px rgb(16 35 26 / 0.12)" }}
      />
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
