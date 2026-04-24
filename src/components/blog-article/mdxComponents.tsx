import type { ComponentProps, ReactNode } from "react";

import { slugify } from "./toc";

/**
 * MDX component overrides for the /blog/[slug] editorial article.
 *
 * - h2 / h3 inject an `id` from their text content using `slugify`. Dedupe is
 *   tracked via counters local to the render closure, matching the numbering
 *   done by `extractHeadings`, so the sticky TOC anchors resolve.
 * - The first top-level paragraph picks up `className="drop-cap"` to trigger
 *   the editorial drop-cap from globals.css.
 *
 * Each render creates a fresh closure via `createMdxComponents()` so the
 * counters restart.
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

type HeadingProps = ComponentProps<"h2">;
type ParagraphProps = ComponentProps<"p">;

export function createMdxComponents() {
  // Counters restart on every render.
  const slugCounts = new Map<string, number>();
  let paragraphIndex = 0;

  const nextId = (text: string): string | undefined => {
    const base = slugify(text);
    if (!base) return undefined;
    const count = slugCounts.get(base) ?? 0;
    slugCounts.set(base, count + 1);
    return count === 0 ? base : `${base}-${count + 1}`;
  };

  const h2 = ({ children, id, ...rest }: HeadingProps) => {
    const text = toPlainText(children);
    const resolvedId = id ?? nextId(text);
    return (
      <h2 id={resolvedId} {...rest}>
        {children}
      </h2>
    );
  };

  const h3 = ({ children, id, ...rest }: HeadingProps) => {
    const text = toPlainText(children);
    const resolvedId = id ?? nextId(text);
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

  return { h2, h3, p };
}
