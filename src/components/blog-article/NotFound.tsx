import Link from "next/link";

/**
 * Fallback for an invalid /blog/[slug] (should never fire at runtime because
 * generateStaticParams enumerates all posts, but kept for defensive SSR).
 */
export default function ArticleNotFound() {
  return (
    <main
      className="flex min-h-[60vh] items-center justify-center px-6 py-24 text-center"
      style={{ background: "var(--color-canvas)" }}
    >
      <div className="max-w-[520px]">
        <p
          className="inline-flex items-center gap-2.5"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <span
            aria-hidden
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{ background: "var(--color-accent-warm)" }}
          />
          <span
            style={{
              fontSize: 10.5,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--color-accent-warm)",
              fontWeight: 500,
            }}
          >
            Article not found
          </span>
        </p>
        <h1
          className="mt-6"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 300,
            lineHeight: 1.05,
            letterSpacing: "-0.025em",
            color: "var(--color-ink)",
          }}
        >
          We can&rsquo;t find that post.
        </h1>
        <p
          className="mt-5"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 17,
            lineHeight: 1.65,
            color: "var(--color-ink-secondary)",
            letterSpacing: "-0.003em",
          }}
        >
          The link may have moved or the article has been retired.
        </p>
        <Link
          href="/blog"
          className="mt-8 inline-flex items-center gap-2 rounded-full px-6 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
          style={{
            background: "var(--color-green-deep)",
            color: "var(--color-canvas)",
            fontFamily: "var(--font-sans)",
            fontSize: 14,
            fontWeight: 500,
          }}
        >
          Back to the Journal →
        </Link>
      </div>
    </main>
  );
}
