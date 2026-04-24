import Link from "next/link";

/**
 * Compare article 404 fallback. Returned when `getComparePostBySlug(slug)`
 * yields null. Kept minimal and static — no ScrollAnimator.
 */
export default function ArticleNotFound() {
  return (
    <main
      className="flex min-h-[60vh] items-center px-6 pt-32 pb-20"
      style={{ background: "var(--color-canvas)" }}
    >
      <div className="mx-auto max-w-[560px] text-center">
        <div
          className="inline-flex items-center gap-2.5"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <span
            aria-hidden
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{ background: "var(--color-warm)" }}
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
            Not found
          </span>
        </div>
        <h1
          className="mt-6"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(2rem, 4vw, 3rem)",
            fontWeight: 300,
            lineHeight: 1.1,
            letterSpacing: "-0.025em",
            color: "var(--color-ink)",
          }}
        >
          Comparison not found
        </h1>
        <p
          className="mx-auto mt-5 max-w-[420px]"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 16,
            lineHeight: 1.6,
            color: "var(--color-ink-secondary)",
          }}
        >
          The comparison you&apos;re looking for has moved or doesn&apos;t
          exist. Browse every comparison Merios has written.
        </p>
        <div className="mt-8">
          <Link
            href="/compare"
            className="inline-flex items-center gap-2 rounded-full px-6 py-3 transition-transform duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 hover:-translate-y-0.5"
            style={{
              background: "var(--color-ink)",
              color: "var(--color-canvas)",
              fontFamily: "var(--font-sans)",
              fontSize: 14,
              fontWeight: 500,
              letterSpacing: "-0.005em",
            }}
          >
            Back to comparisons
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
