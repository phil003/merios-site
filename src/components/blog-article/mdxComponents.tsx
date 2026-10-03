import {
  Children,
  isValidElement,
  type ComponentProps,
  type CSSProperties,
  type ReactElement,
  type ReactNode,
} from "react";

import HomaIRCalculator from "@/components/calculators/HomaIRCalculator";
import PhenoAgeCalculator from "@/components/calculators/PhenoAgeCalculator";
import TrigHdlRatioCalculator from "@/components/calculators/TrigHdlRatioCalculator";
import A1CConverter from "@/components/calculators/A1CConverter";
import Zone2Calculator from "@/components/calculators/Zone2Calculator";
import { slugify } from "./toc";
import styles from "./article.module.css";

/**
 * MDX component overrides for the /blog/[slug] editorial article.
 *
 * - h2 / h3 inject an `id` from their text content using `slugify`. Dedupe is
 *   tracked via counters local to the render closure, matching the numbering
 *   done by `extractHeadings`, so the sticky TOC anchors resolve.
 * - The first top-level paragraph picks up `className="drop-cap"` to trigger
 *   the editorial drop-cap from globals.css.
 * - Presentation only (site v3) — the text and the elements stay exactly
 *   what the markdown produces; a class is added from the paragraph's shape:
 *     · "**Key insight:** …" → lilac sticker; "**Important:** …" → peach;
 *       "**Medical Disclaimer:** …" / "**Note:** …" → paper card
 *     · a paragraph that is only a link (in-article CTA) → ink pill
 *     · a paragraph set entirely in italics (closing disclaimer) → fine print
 *     · a paragraph that is only bold text (step titles) → Bricolage lead-in
 *   Tables get a scroll frame (no page overflow on phones); blockquotes —
 *   all notes in the journal — become a quiet paper card.
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
type TableProps = ComponentProps<"table">;
type BlockquoteProps = ComponentProps<"blockquote">;

type ElementWithChildren = ReactElement<{ children?: ReactNode }>;

/** Children without whitespace-only text nodes. */
function meaningful(children: ReactNode): ReactNode[] {
  return Children.toArray(children).filter(
    (c) => !(typeof c === "string" && c.trim() === ""),
  );
}

function isTag(node: ReactNode, tag: string): node is ElementWithChildren {
  return isValidElement(node) && node.type === tag;
}

type Callout = "insight" | "important" | "note";

const CALLOUT_LABELS: Record<string, Callout> = {
  "key insight": "insight",
  "key takeaway": "insight",
  "pro tip": "insight",
  "bottom line": "insight",
  important: "important",
  warning: "important",
  caution: "important",
  "medical disclaimer": "note",
  disclaimer: "note",
  note: "note",
};

type ParagraphShape =
  | { kind: "callout"; callout: Callout }
  | { kind: "cta" }
  | { kind: "fine" }
  | { kind: "leadIn" }
  | { kind: "plain" };

function paragraphShape(children: ReactNode): ParagraphShape {
  const parts = meaningful(children);
  if (parts.length === 0) return { kind: "plain" };
  const first = parts[0];

  if (parts.length === 1 && isTag(first, "a")) return { kind: "cta" };
  if (parts.length === 1 && isTag(first, "em")) return { kind: "fine" };

  if (isTag(first, "strong")) {
    const label = toPlainText(first.props.children)
      .trim()
      .replace(/[:.]\s*$/, "")
      .toLowerCase();
    const callout = CALLOUT_LABELS[label];
    // "**Key insight:** text" (label inside the bold) or "**Key insight**: text"
    if (callout && parts.length > 1) return { kind: "callout", callout };
    if (parts.length === 1) return { kind: "leadIn" };
  }
  return { kind: "plain" };
}

/** Column count from the GFM table head (thead > tr > th). */
function countColumns(children: ReactNode): number {
  for (const section of Children.toArray(children)) {
    if (!isTag(section, "thead")) continue;
    for (const row of Children.toArray(section.props.children)) {
      if (!isTag(row, "tr")) continue;
      return Math.max(
        1,
        Children.toArray(row.props.children).filter((c) => isTag(c, "th")).length,
      );
    }
  }
  return 2;
}

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
    const shape = paragraphShape(children);
    const shapeClass =
      shape.kind === "callout"
        ? styles.callout
        : shape.kind === "cta"
          ? styles.ctaLine
          : shape.kind === "fine"
            ? styles.fine
            : shape.kind === "leadIn"
              ? styles.leadIn
              : null;
    const classes = [className, index === 0 ? "drop-cap" : null, shapeClass]
      .filter(Boolean)
      .join(" ");
    return (
      <p
        className={classes || undefined}
        data-callout={shape.kind === "callout" ? shape.callout : undefined}
        {...rest}
      >
        {children}
      </p>
    );
  };

  const table = ({ children, ...rest }: TableProps) => (
    <div
      className={styles.tableWrap}
      tabIndex={0}
      style={{ "--cols": countColumns(children) } as CSSProperties}
    >
      <table {...rest}>{children}</table>
    </div>
  );

  const blockquote = ({ className, children, ...rest }: BlockquoteProps) => (
    <blockquote
      className={[className, styles.note].filter(Boolean).join(" ")}
      {...rest}
    >
      {children}
    </blockquote>
  );

  return {
    h2,
    h3,
    p,
    table,
    blockquote,
    HomaIRCalculator,
    TrigHdlRatioCalculator,
    PhenoAgeCalculator,
    A1CConverter,
    Zone2Calculator,
  };
}
