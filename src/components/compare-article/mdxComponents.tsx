import {
  Children,
  cloneElement,
  isValidElement,
  type ComponentProps,
  type ReactElement,
  type ReactNode,
} from "react";
import { protectCell } from "@/components/blog-article/tableText";
import styles from "./compareArticle.module.css";

/**
 * MDX components for the /compare/[slug] editorial article.
 *
 * Strategy:
 * - Heading ids: h2/h3 derive an `id` from their text children using a
 *   deterministic slugifier, so the sticky TOC can scan the DOM for them.
 * - Paragraphs render as written (Open Sky has no drop-cap); the long-read
 *   look comes from the article template's scoped `.prose` rules.
 * - Tables: wrapped in a scroll container (presentation only — the table
 *   markup and its cells are rendered exactly as MDX produced them, plus a
 *   `data-label` on each body cell, its column's header). On phones, a
 *   two-column table, or a three-column one that carries links, stacks:
 *   each row's label above its value(s), no cut-off column (`data-stack`).
 *   Wider tables keep scrolling sideways with their first column frozen;
 *   the scroll box is focusable so keyboard users can scroll it too.
 *   Values keep their units and hyphenated terms stay whole (tableText).
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
type ElementWithChildren = ReactElement<{ children?: ReactNode }>;
type LabelledCell = ReactElement<{ children?: ReactNode; "data-label"?: string }>;

function isTag(node: ReactNode, tag: string): node is ElementWithChildren {
  return isValidElement(node) && node.type === tag;
}

/** Does this node hold a link anywhere inside it? */
function hasLink(node: ReactNode): boolean {
  return Children.toArray(node).some(
    (child) =>
      isValidElement<{ children?: ReactNode }>(child) &&
      (child.type === "a" || hasLink(child.props.children)),
  );
}

/** The header texts, in column order ("" for an empty corner cell). */
function headerTexts(children: ReactNode): string[] {
  for (const section of Children.toArray(children)) {
    if (!isTag(section, "thead")) continue;
    for (const row of Children.toArray(section.props.children)) {
      if (!isTag(row, "tr")) continue;
      return Children.toArray(row.props.children)
        .filter((c) => isTag(c, "th"))
        .map((c) => toPlainText(c).trim());
    }
  }
  return [];
}

/** Any body cell after the first (the row label) that carries a link. */
function valuesHaveLinks(children: ReactNode): boolean {
  return Children.toArray(children).some(
    (section) =>
      isTag(section, "tbody") &&
      Children.toArray(section.props.children).some(
        (row) =>
          isTag(row, "tr") &&
          Children.toArray(row.props.children)
            .filter((c) => isTag(c, "td"))
            .slice(1)
            .some((cell) => hasLink(cell)),
      ),
  );
}

/** Cells with protected text; body cells also get their column's label. */
function labelCells(children: ReactNode, headers: string[]): ReactNode {
  return Children.map(children, (section) => {
    if (!isTag(section, "thead") && !isTag(section, "tbody")) return section;
    const body = isTag(section, "tbody");
    return cloneElement(
      section,
      undefined,
      Children.map(section.props.children, (row) => {
        if (!isTag(row, "tr")) return row;
        let col = 0;
        return cloneElement(
          row,
          undefined,
          Children.map(row.props.children, (cell) => {
            if (!isTag(cell, "th") && !isTag(cell, "td")) return cell;
            const label = headers[col++] ?? "";
            const text = protectCell(cell.props.children, isTag(cell, "th"));
            return body && label
              ? cloneElement(cell as LabelledCell, { "data-label": label }, text)
              : cloneElement(cell, undefined, text);
          }),
        );
      }),
    );
  });
}

export function createMdxComponents() {
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

  const p = ({ className, children, ...rest }: ParagraphProps) => (
    <p className={className} {...rest}>
      {children}
    </p>
  );

  const table = ({ className, children, ...rest }: TableProps) => {
    const headers = headerTexts(children);
    const cols = headers.length;
    const stack = cols === 2 || (cols === 3 && valuesHaveLinks(children));
    return (
      <div className={styles.tableScroll} tabIndex={0}>
        <table
          className={[styles.table, className].filter(Boolean).join(" ")}
          data-cols={cols || undefined}
          data-stack={stack ? "" : undefined}
          {...rest}
        >
          {labelCells(children, headers)}
        </table>
      </div>
    );
  };

  return { h2, h3, p, table };
}
