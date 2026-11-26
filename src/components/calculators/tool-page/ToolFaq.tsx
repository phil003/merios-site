import { withSubs } from "../subscript";
import css from "./toolPage.module.css";

/**
 * The FAQ as an accordion (<details>, no JS): every answer stays in the
 * HTML, word for word the same as the FAQPage JSON-LD. The first one opens.
 * Subscript digits (CO₂) render as <sub>, the same characters as the JSON-LD.
 */
export default function ToolFaq({ items, name = "tool-faq" }: { items: { q: string; a: string }[]; name?: string }) {
  return (
    <div className={css.faqList}>
      {items.map(({ q, a }, i) => (
        <details key={q} className={css.faqItem} name={name} open={i === 0}>
          <summary className={css.faqQ}>
            <span>{withSubs(q)}</span>
            <span aria-hidden className={css.faqSign} />
          </summary>
          <p className={css.faqA}>{withSubs(a)}</p>
        </details>
      ))}
    </div>
  );
}
