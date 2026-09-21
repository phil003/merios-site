import Link from "next/link";
import Footer from "@/components/Footer";

/**
 * Global 404.
 *
 * This exists because of a real bug: `/blog/[slug]` and `/compare/[slug]` used
 * to render a "not found" component from inside the page, which returns
 * **HTTP 200**. Google reads a 200 response whose body says "not found" as a
 * soft 404, and it applied to the whole `/blog/*` and `/compare/*` namespace,
 * not to one URL. The routes now set `dynamicParams = false`, so an unknown
 * slug is refused at the routing layer with a genuine 404 status, and Next
 * renders this page.
 */
export default function NotFound() {
  return (
    <>
      <main
        className="flex min-h-[60vh] items-center justify-center px-6 py-24 text-center"
        style={{ background: "var(--color-canvas)" }}
      >
        <div className="max-w-[560px]">
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
              404 — page not found
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
            We can&rsquo;t find that page.
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
            The link may have moved, or the page has been retired. The two
            places worth starting from:
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                background: "var(--color-green-deep)",
                color: "var(--color-canvas)",
                fontFamily: "var(--font-sans)",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              Read the Journal →
            </Link>
            <Link
              href="/tools"
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
              style={{
                border: "1px solid var(--color-grid)",
                color: "var(--color-ink-secondary)",
                fontFamily: "var(--font-sans)",
                fontSize: 14,
                fontWeight: 500,
              }}
            >
              Free calculators →
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
