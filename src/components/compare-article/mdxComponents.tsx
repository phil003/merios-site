import type { ComponentProps, ReactNode } from "react";
import styles from "./compareArticle.module.css";

/**
 * MDX components for the /compare/[slug] editorial article.
 *
 * Strategy:
 * - Heading ids: h2/h3 derive an `id` from their text children using a
 *   deterministic slugifier, so the sticky TOC can scan the DOM for them.
 * - Drop-cap: the first top-level paragraph of the article picks up
 *   `className="drop-cap"` via a module-scope counter created fresh per
 *   render. Next.js RSC renders each request in its own module worker, and
 *   MDX renders synchronously inside a single React pass, so the counter
 *   is safe for one-shot use (and we provide `createMdxComponents()` to
 *   force a fresh closure per render anyway).
 * - Tables: wrapped in a scroll container (presentation only — the table
 *   markup and its cells are rendered exactly as MDX produced them). Wide
 *   comparison tables scroll sideways inside it on phones instead of
 *   widening the page; it is focusable so keyboard users can scroll it too.
 */

function toPlainText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(toPlainText).join("");
  if (typeof node === "object" && "props" in node) {
    const element = node as { props: { children?: ReactNode } };
    return toPlainText(element.props.children);
  }
  return "";
}

export function slugify(raw: string): string {
  return raw
    .toLowerCase()
    .trim()
    .replace(/['’]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

type HeadingProps = ComponentProps<"h2">;
type ParagraphProps = ComponentProps<"p">;
type TableProps = ComponentProps<"table">;

export function createMdxComponents() {
  // Counter local to this render — incremented each time we render a top-level <p>.
  let paragraphIndex = 0;

  const h2 = ({ children, id, ...rest }: HeadingProps) => {
    const text = toPlainText(children);
    const resolvedId = id ?? (text ? slugify(text) : undefined);
    return (
      <h2 id={resolvedId} {...rest}>
        {children}
      </h2>
    );
  };

  const h3 = ({ children, id, ...rest }: HeadingProps) => {
    const text = toPlainText(children);
    const resolvedId = id ?? (text ? slugify(text) : undefined);
    return (
      <h3 id={resolvedId} {...rest}>
        {children}
      </h3>
    );
  };

  const p = ({ className, children, ...rest }: ParagraphProps) => {
    const index = paragraphIndex++;
    const classes = [className, index === 0 ? "drop-cap" : null]
      .filter(Boolean)
      .join(" ");
    return (
      <p className={classes || undefined} {...rest}>
        {children}
      </p>
    );
  };

  const table = ({ className, children, ...rest }: TableProps) => (
    <div className={styles.tableScroll} tabIndex={0}>
      <table
        className={[styles.table, className].filter(Boolean).join(" ")}
        {...rest}
      >
        {children}
      </table>
    </div>
  );

  return { h2, h3, p, table };
}
