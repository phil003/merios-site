"use client";

type Link = { label: string; href: string };

const COLUMNS: { title: string; links: Link[] }[] = [
  {
    title: "Product",
    links: [
      { label: "Science", href: "/#science" },
      { label: "Journal", href: "/#journal" },
      { label: "Waitlist", href: "/#waitlist" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Press", href: "/contact" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/privacy" },
      { label: "Terms", href: "/terms" },
      { label: "Security", href: "/privacy" },
    ],
  },
];

const currentYear = new Date().getFullYear();

function handleAnchorClick(
  e: React.MouseEvent<HTMLAnchorElement>,
  href: string,
) {
  if (!href.startsWith("/#")) return;
  const id = href.slice(2);
  const target = document.getElementById(id);
  if (!target) return;
  e.preventDefault();
  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function Footer() {
  return (
    <footer
      className="relative"
      style={{ background: "var(--color-canvas-alt)" }}
    >
      <div className="mx-auto max-w-[1280px] px-6 pt-20 pb-10 md:px-10 md:pt-28 md:pb-12">
        <div className="grid grid-cols-2 gap-x-8 gap-y-12 md:grid-cols-[2fr_1fr_1fr_1fr] md:gap-x-10 md:gap-y-0">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="inline-flex items-center gap-2.5">
              <span
                aria-hidden
                className="animate-pulse-dot inline-block h-1.5 w-1.5 rounded-full"
                style={{ background: "var(--color-pulse)" }}
              />
              <span
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(2rem, 3vw, 2.75rem)",
                  fontWeight: 300,
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  color: "var(--color-ink)",
                }}
              >
                Merios
              </span>
            </div>
            <p
              className="mt-5 max-w-[320px]"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 14.5,
                lineHeight: 1.6,
                color: "var(--color-ink-secondary)",
              }}
            >
              One score for every biomarker you&rsquo;ve ever produced.
              Quiet, composite, and built to last a decade.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10.5,
                  fontWeight: 500,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--color-ink-tertiary)",
                  marginBottom: 18,
                }}
              >
                {col.title}
              </h4>
              <ul className="flex flex-col gap-3">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      onClick={(e) => handleAnchorClick(e, l.href)}
                      className="inline-block transition-colors"
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: 14,
                        color: "var(--color-ink-secondary)",
                        fontWeight: 400,
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color =
                          "var(--color-pulse)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color =
                          "var(--color-ink-secondary)")
                      }
                    >
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom strip */}
        <div
          className="mt-16 flex flex-col items-start justify-between gap-4 pt-6 md:mt-20 md:flex-row md:items-center"
          style={{ borderTop: "1px solid var(--color-grid)" }}
        >
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--color-ink-tertiary)",
            }}
          >
            © {currentYear} Merios Health LLC · All rights reserved
          </p>
          <div
            className="inline-flex items-center gap-2"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              color: "var(--color-ink-tertiary)",
            }}
            aria-label="Locale (placeholder)"
          >
            <span
              aria-current="true"
              style={{ color: "var(--color-ink)", fontWeight: 500 }}
            >
              EN
            </span>
            <span
              aria-hidden
              className="inline-block h-px w-3"
              style={{ background: "var(--color-grid)" }}
            />
            <span>FR</span>
          </div>
        </div>

        {/* Medical disclaimer — App Store compliance (must not be removed) */}
        <p
          className="mt-8 max-w-[880px]"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 11,
            lineHeight: 1.55,
            color: "var(--color-ink-secondary)",
          }}
        >
          <strong style={{ fontWeight: 600 }}>Medical disclaimer.</strong>{" "}
          Merios is a wellness companion, not a medical device. It does not
          diagnose, treat, cure, or prevent any disease. Health scores and
          biological age estimates are algorithmic, not clinically validated.
          Always consult a qualified healthcare professional for medical
          advice and the interpretation of your lab results.
        </p>
      </div>
    </footer>
  );
}
