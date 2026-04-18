/**
 * Science — sticky table of contents.
 *
 * Desktop only (hidden below lg). Static anchors in the scaffold; no
 * scroll-linked active state. Phase 4 may add IntersectionObserver-based
 * active highlighting if it fits the perf budget.
 */

const TOC = [
  { href: "#intro", label: "Intro" },
  { href: "#thesis", label: "Thesis" },
  { href: "#coverage", label: "Coverage" },
  { href: "#model", label: "The model" },
  { href: "#bioage", label: "Biological age" },
  { href: "#advisors", label: "Reviewed by" },
  { href: "#references", label: "References" },
];

export default function ScienceStickyTOC() {
  return (
    <nav
      aria-label="On this page"
      className="hidden lg:sticky lg:top-28 lg:block"
    >
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 10.5,
          letterSpacing: "0.22em",
          textTransform: "uppercase",
          color: "var(--color-ink-tertiary)",
          fontWeight: 500,
          marginBottom: 18,
        }}
      >
        On this page
      </p>
      <ol
        className="flex flex-col gap-3 border-l pl-4"
        style={{ borderColor: "var(--color-grid)" }}
      >
        {TOC.map((t, i) => (
          <li key={t.href}>
            <a
              href={t.href}
              className="inline-flex items-baseline gap-3 transition-colors"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: 13.5,
                color: "var(--color-ink-secondary)",
                letterSpacing: "-0.005em",
              }}
            >
              <span
                aria-hidden
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10.5,
                  letterSpacing: "0.08em",
                  color: "var(--color-ink-tertiary)",
                }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{t.label}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
