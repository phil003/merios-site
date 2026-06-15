import Image from "next/image";

/**
 * AppScreens — "Inside Merios" real-screenshot gallery.
 *
 * Replaces the hand-drawn SVG mockups with actual product screens (sourced from
 * the App Store screenshot set, cropped to the device screen and re-framed in a
 * minimal CSS bezel). Three screens tell the input → output → integration story:
 * scan a lab report, read your biological age, unify Apple Health.
 *
 * Server component: no client JS. Images go through next/image (AVIF/WebP).
 */

const SCREENS = [
  {
    src: "/screens/ocr.png",
    label: "Scan",
    caption: "Photograph any lab report — Merios reads every marker in seconds.",
    alt: "The Merios scanner extracting biomarker values from a photographed blood-test report",
  },
  {
    src: "/screens/bio-age.png",
    label: "Biological age",
    caption: "See how old your body actually is, from nine standard biomarkers.",
    alt: "The Merios biological age screen showing a body age of 31.4 years, 3.6 years younger than chronological age",
  },
  {
    src: "/screens/apple-health.png",
    label: "Apple Health",
    caption: "Sleep, movement and recovery, folded into one composite score.",
    alt: "The Merios screen unifying Apple Health data with blood biomarkers into one health score",
  },
];

export default function AppScreens() {
  return (
    <section
      id="screens"
      className="relative py-24 md:py-32"
      style={{ background: "var(--color-canvas)" }}
      aria-label="Inside the Merios app"
    >
      <div className="mx-auto max-w-[1280px] px-6 md:px-10">
        {/* Header */}
        <div className="max-w-[640px]">
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
              className="text-[10.5px] uppercase"
              style={{
                color: "var(--color-ink-tertiary)",
                letterSpacing: "0.22em",
                fontWeight: 500,
              }}
            >
              Inside Merios
            </span>
          </div>

          <h2
            className="mt-6"
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "var(--text-display-m)",
              fontWeight: 300,
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
              color: "var(--color-ink)",
            }}
          >
            Your body, screen by screen.
          </h2>

          <p
            className="mt-5 max-w-[480px]"
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "1.0625rem",
              lineHeight: 1.6,
              color: "var(--color-ink-secondary)",
            }}
          >
            No dashboards to configure. Scan a report, connect Apple Health, and
            read your results with the clarity of a clinician — in your pocket.
          </p>
        </div>

        {/* Phone row */}
        <div className="mt-16 grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-7 md:gap-10">
          {SCREENS.map((s) => (
            <figure key={s.src} className="flex flex-col items-center">
              <div
                className="relative w-full max-w-[260px] overflow-hidden rounded-[40px]"
                style={{
                  background: "var(--color-ink)",
                  padding: 6,
                  boxShadow:
                    "0 36px 72px -28px rgba(14,20,18,0.42), inset 0 0 0 1px rgba(247,245,239,0.08)",
                }}
              >
                <Image
                  src={s.src}
                  alt={s.alt}
                  width={1179}
                  height={2556}
                  sizes="(max-width: 639px) 260px, (max-width: 767px) 30vw, 260px"
                  className="block h-auto w-full rounded-[34px]"
                />
              </div>

              <figcaption className="mt-7 max-w-[280px] text-center">
                <span
                  className="block"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--color-green-deep)",
                    fontWeight: 600,
                  }}
                >
                  {s.label}
                </span>
                <span
                  className="mt-2.5 block"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "0.9375rem",
                    lineHeight: 1.5,
                    color: "var(--color-ink-secondary)",
                  }}
                >
                  {s.caption}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
