"use client";

// Statement is the biomarker marquee on the home page. Previously it pulled
// in gsap + @gsap/react just to translate the track at constant speed — a
// pure CSS @keyframes animation does the same thing for zero JS bytes. The
// pause-on-hover behaviour is implemented with a CSS state on the section,
// and prefers-reduced-motion stops the animation natively.

const BIOMARKERS = [
  "HDL",
  "LDL",
  "Ferritin",
  "Vitamin D",
  "TSH",
  "Cortisol",
  "CRP",
  "HbA1c",
  "Testosterone",
  "eGFR",
  "ALT",
  "AST",
  "Magnesium",
  "B12",
  "Folate",
  "Homocysteine",
  "ApoB",
  "Lp(a)",
  "Insulin",
  "Omega-3 Index",
  "Estradiol",
  "DHEA-S",
  "Free T4",
  "Platelets",
  "Albumin",
  "Uric Acid",
  "Creatinine",
  "Hemoglobin",
  "+130 more",
];

export default function Statement() {
  const items = [...BIOMARKERS, ...BIOMARKERS];

  return (
    <section
      aria-label="Biomarkers tracked by Merios"
      className="merios-statement relative overflow-hidden border-y py-14 md:py-16"
      style={{
        borderColor: "var(--color-grid)",
        background: "var(--color-canvas-alt)",
      }}
    >
      {/* Inline keyframes + reduced-motion stop. Scoped via the parent class
          so the rule doesn't leak. */}
      <style>{`
        @keyframes merios-marquee {
          from { transform: translate3d(0, 0, 0); }
          to   { transform: translate3d(-50%, 0, 0); }
        }
        .merios-statement .merios-marquee-track {
          animation: merios-marquee 55s linear infinite;
        }
        .merios-statement:hover .merios-marquee-track {
          animation-play-state: paused;
        }
        @media (prefers-reduced-motion: reduce) {
          .merios-statement .merios-marquee-track {
            animation: none;
          }
        }
      `}</style>

      <div className="mx-auto mb-8 max-w-[1280px] px-6 md:px-10">
        <div
          className="inline-flex items-center gap-2.5"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <span
            aria-hidden
            className="animate-pulse-dot inline-block h-1.5 w-1.5 rounded-full"
            style={{ background: "var(--color-pulse)" }}
          />
          <span
            className="text-[10.5px] uppercase"
            style={{
              color: "var(--color-green-deep)",
              letterSpacing: "0.22em",
              fontWeight: 500,
            }}
          >
            Tracked by Merios
          </span>
        </div>
      </div>

      <div className="relative">
        {/* edge fades so the marquee doesn't hit the viewport edges hard */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 md:w-28"
          style={{
            background:
              "linear-gradient(to right, var(--color-canvas-alt), transparent)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 md:w-28"
          style={{
            background:
              "linear-gradient(to left, var(--color-canvas-alt), transparent)",
          }}
        />

        <div
          className="merios-marquee-track flex items-center"
          style={{ width: "max-content", willChange: "transform" }}
        >
          {items.map((b, i) => (
            <span
              key={`${b}-${i}`}
              className="flex shrink-0 items-center gap-5 px-5"
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 14,
                  fontWeight: 500,
                  letterSpacing: "0.04em",
                  color: "var(--color-ink)",
                  whiteSpace: "nowrap",
                }}
              >
                {b}
              </span>
              <span
                aria-hidden
                className="inline-block h-1 w-1 rounded-full"
                style={{ background: "var(--color-pulse)" }}
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
