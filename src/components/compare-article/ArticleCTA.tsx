import Link from "next/link";
import Reveal from "@/components/ui/Reveal";

/**
 * Final article CTA — "Try Merios →" linking to /early-access.
 * Ink background, canvas text, Fraunces headline, centered.
 */
export default function ArticleCTA() {
  return (
    <section
      style={{
        background: "var(--color-ink)",
        color: "var(--color-canvas)",
      }}
    >
      <div className="mx-auto max-w-[1200px] px-6 py-20 text-center md:px-10 md:py-28">
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
                color: "var(--color-pulse)",
                fontWeight: 500,
              }}
            >
              Ready to decide?
            </span>
          </div>
          <h2
            className="mx-auto mt-6 max-w-[720px]"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2rem, 4vw, 3.25rem)",
              fontWeight: 300,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
              color: "var(--color-canvas)",
            }}
          >
            See your health in one clear score.
          </h2>
          <div className="mt-10 flex justify-center">
            <Link
              href="/early-access"
              className="group inline-flex items-center gap-3 rounded-full px-8 py-4 transition-transform duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 hover:-translate-y-0.5"
              style={{
                background: "var(--color-pulse)",
                color: "var(--color-ink)",
                fontFamily: "var(--font-sans)",
                fontSize: 15,
                fontWeight: 500,
                letterSpacing: "-0.005em",
              }}
            >
              Try Merios
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
