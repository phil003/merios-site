import type { ReactNode } from "react";

// "Before you write" — what to put in a message so it can be answered first
// time, and where requests that are not messages (data export / deletion,
// vulnerability reports) actually go. A white card on fog, like the form and
// channel cards above it; three columns from md up. Copy comes in as props.

export type ContactGuideItem = {
  id: string;
  title: string;
  body: ReactNode;
};

type ContactGuideProps = {
  eyebrow: string;
  title: string;
  items: ContactGuideItem[];
};

export default function ContactGuide({ eyebrow, title, items }: ContactGuideProps) {
  return (
    <section
      aria-labelledby="contact-guide-title"
      className="cg px-[var(--spacing-container)]"
      // Same gutter as between the form and the FAQ card it sits between.
      style={{ paddingBottom: "clamp(20px, 3vw, 40px)" }}
    >
      <div
        className="mx-auto max-w-[1320px]"
        style={{
          background: "var(--color-canvas-alt)",
          border: "1px solid var(--color-grid)",
          borderRadius: "clamp(22px, 2.4vw, 30px)",
          padding: "clamp(22px, 3.4vw, 48px)",
        }}
      >
        <div className="label" style={{ color: "var(--color-ink-tertiary)" }}>
          <span aria-hidden className="label-dot label-dot--ink" />
          <span>{eyebrow}</span>
        </div>
        <h2 id="contact-guide-title" className="cg-title">
          {title}
        </h2>

        <div className="cg-grid">
          {items.map((item) => (
            <div key={item.id} className="cg-item">
              <h3 className="cg-item-title">{item.title}</h3>
              <div className="cg-body">{item.body}</div>
            </div>
          ))}
        </div>
      </div>

      <style>{styles}</style>
    </section>
  );
}

// ─── Scoped styles (prefixed .cg) ────────────────────────────────────────────
// Type scale mirrors the channel cards (ContactInfo): display titles, sans
// body in ink-secondary (AAA on white), the lime-underlined link treatment.
const styles = `
.cg .cg-title {
  margin-top: 22px;
  max-width: 22ch;
  font-family: var(--font-display);
  font-size: clamp(1.65rem, 1.2rem + 1.3vw, 2.3rem);
  font-weight: 740;
  line-height: 1.04;
  letter-spacing: -0.035em;
  color: var(--color-ink);
  text-wrap: balance;
}
.cg .cg-grid {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 30px;
  margin-top: clamp(28px, 3.4vw, 44px);
}
@media (min-width: 768px) {
  .cg .cg-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: clamp(24px, 3vw, 40px);
  }
}
.cg .cg-item {
  padding-top: 20px;
  border-top: 1px solid var(--color-grid);
}
.cg .cg-item-title {
  font-family: var(--font-display);
  font-size: clamp(1.2rem, 1.08rem + 0.4vw, 1.4rem);
  font-weight: 720;
  line-height: 1.1;
  letter-spacing: -0.03em;
  color: var(--color-ink);
}
.cg .cg-body {
  margin-top: 12px;
  font-family: var(--font-sans);
  font-size: 0.9375rem;
  line-height: 1.6;
  letter-spacing: -0.005em;
  color: var(--color-ink-secondary);
  text-wrap: pretty;
}
.cg .cg-body > * + * {
  margin-top: 10px;
}
.cg .cg-body ul {
  padding-left: 1.15rem;
  list-style: disc;
}
.cg .cg-body li + li {
  margin-top: 6px;
}
.cg .cg-body li::marker {
  color: var(--color-ink-tertiary);
}
.cg .cg-body strong {
  font-weight: 600;
  color: var(--color-ink);
}
/* An in-app menu path ("Settings › Export my data") reads as one unit. */
.cg .cg-body .cg-path {
  white-space: nowrap;
}
.cg .cg-body a {
  font-weight: 500;
  color: var(--color-ink);
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 4px;
  text-decoration-color: color-mix(in srgb, var(--color-lime-deep) 70%, transparent);
  transition: background-color 200ms var(--ease-smooth), text-decoration-color 200ms var(--ease-smooth);
}
.cg .cg-body a:hover {
  background: color-mix(in srgb, var(--color-lime) 55%, transparent);
  text-decoration-color: var(--color-ink);
}
.cg .cg-body a:focus-visible {
  outline: 2px solid var(--color-ink);
  outline-offset: 2px;
  border-radius: 2px;
}
`;
