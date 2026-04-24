import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

/**
 * Final newsletter-style CTA banner for the /blog/[slug] article.
 * Links to /early-access (no inline form here — waitlist is the conversion path).
 */
export default function ArticleCTA() {
  return (
    <section
      className="border-y"
      style={{
        background: "var(--color-canvas-alt)",
        borderColor: "var(--color-grid)",
      }}
    >
      <div className="mx-auto max-w-[680px] px-6 py-16 text-center md:px-10 md:py-20">
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
              Newsletter
            </span>
          </div>

          <h2
            className="mx-auto mt-5"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              fontWeight: 300,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "var(--color-ink)",
            }}
          >
            Like this? Get the next one in your inbox.
          </h2>

          <p
            className="mx-auto mt-5 max-w-[520px]"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 15.5,
              lineHeight: 1.65,
              color: "var(--color-ink-secondary)",
              letterSpacing: "-0.003em",
            }}
          >
            Early access includes our weekly briefing — new biomarker deep-dives,
            plain-English study breakdowns, nothing else.
          </p>

          <div className="mt-8 flex justify-center">
            <Link
              href="/early-access"
              className="group inline-flex items-center gap-3 rounded-full px-8 py-3 transition-transform duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 hover:-translate-y-0.5"
              style={{
                background: "var(--color-green-deep)",
                color: "var(--color-canvas)",
                fontFamily: "var(--font-sans)",
                fontSize: 15,
                fontWeight: 500,
                letterSpacing: "-0.005em",
              }}
            >
              Join the waitlist
              <span
                aria-hidden
                className="inline-block transition-transform duration-300 group-hover:translate-x-0.5"
              >
                →
              </span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
