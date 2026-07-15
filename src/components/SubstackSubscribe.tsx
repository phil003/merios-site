import Reveal from "@/components/ui/Reveal";

/**
 * Substack newsletter capture (Baseline — merioslife.substack.com).
 *
 * Levier 7 of the Substack launch plan: a safety net for blog/SEO readers who
 * aren't ready to install the app yet. They subscribe here, then convert to the
 * app later via the newsletter's own CTAs (welcome email, footer, deep-dive CTAs).
 *
 * Uses the official Substack embed iframe so emails land directly in Substack —
 * no backend, works with the static export. The surrounding section is styled to
 * match the editorial design; the iframe itself carries Substack's default form.
 *
 * Drop it into an article once (see /blog/[slug]/page.tsx). Keep ArticleCTA (the
 * "get the app" banner) separate — that's the primary conversion path; this is
 * the newsletter fallback.
 */
export default function SubstackSubscribe() {
  return (
    <section
      className="mx-auto mt-16 max-w-[680px] rounded-2xl border px-6 py-10 text-center md:px-10 md:py-12"
      style={{
        background: "var(--color-canvas-alt)",
        borderColor: "var(--color-grid)",
      }}
    >
      <Reveal>
        <div
          className="inline-flex items-center gap-2.5"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <span
            aria-hidden
            className="inline-block h-1.5 w-1.5 rounded-full"
            style={{ background: "var(--color-pulse)" }}
          />
          <span
            style={{
              fontSize: 10.5,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--color-green-deep)",
              fontWeight: 500,
            }}
          >
            Baseline · The Newsletter
          </span>
        </div>

        <h2
          className="mx-auto mt-5"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.5rem, 2.6vw, 2rem)",
            fontWeight: 300,
            lineHeight: 1.12,
            letterSpacing: "-0.02em",
            color: "var(--color-ink)",
          }}
        >
          One biomarker, explained properly, every week.
        </h2>

        <p
          className="mx-auto mt-4 max-w-[480px]"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 15,
            lineHeight: 1.65,
            color: "var(--color-ink-secondary)",
            letterSpacing: "-0.003em",
          }}
        >
          Plain-English deep-dives on what your labs actually mean — functional
          ranges, trends, and the studies behind them. Free, no spam.
        </p>

        <div className="mt-7 flex justify-center">
          <iframe
            src="https://merioslife.substack.com/embed"
            title="Subscribe to Baseline"
            width="100%"
            height="150"
            style={{
              border: "1px solid var(--color-grid)",
              borderRadius: 12,
              background: "transparent",
              maxWidth: 480,
            }}
            frameBorder="0"
            scrolling="no"
          />
        </div>
      </Reveal>
    </section>
  );
}
