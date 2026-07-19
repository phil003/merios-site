interface FaqItem {
  q: string;
  a: string;
}

interface ArticleFAQProps {
  items: FaqItem[];
}

/**
 * Editorial FAQ accordion for the /blog/[slug] article.
 *
 * Native <details>/<summary> for keyboard + a11y. The +/× indicator rotates
 * via CSS (`.acc-icon` in globals.css) — no client JS, renders on the server.
 */
export default function ArticleFAQ({ items }: ArticleFAQProps) {
  if (items.length === 0) return null;

  return (
    <section
      aria-labelledby="article-faq-heading"
      className="mx-auto mt-16 max-w-[820px] px-6 md:px-10"
    >
      <h2
        id="article-faq-heading"
        className="mb-8"
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "var(--text-display-m)",
          fontWeight: 300,
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          color: "var(--color-ink)",
        }}
      >
        Frequently asked questions
      </h2>
      <ul className="flex flex-col">
        {items.map((item, idx) => (
          <li
            key={`${idx}-${item.q}`}
            style={{
              borderTop: idx === 0 ? "1px solid var(--color-grid)" : undefined,
              borderBottom: "1px solid var(--color-grid)",
            }}
          >
            <details className="group">
              <summary
                className="flex cursor-pointer list-none items-center justify-between gap-6 py-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: 22,
                  fontWeight: 400,
                  lineHeight: 1.3,
                  letterSpacing: "-0.015em",
                  color: "var(--color-ink)",
                }}
              >
                <span>{item.q}</span>
                <span
                  aria-hidden
                  className="acc-icon inline-flex h-7 w-7 flex-shrink-0 items-center justify-center"
                  style={{
                    color: "var(--color-green-deep)",
                    fontSize: 22,
                    lineHeight: 1,
                  }}
                >
                  +
                </span>
              </summary>
              <div
                className="pb-6 pr-10"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: 17,
                  lineHeight: 1.7,
                  color: "var(--color-ink-secondary)",
                  letterSpacing: "-0.003em",
                }}
              >
                {item.a}
              </div>
            </details>
          </li>
        ))}
      </ul>
    </section>
  );
}
