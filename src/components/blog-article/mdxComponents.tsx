import {
  Children,
  cloneElement,
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
import { protectCell } from "./tableText";
import styles from "./article.module.css";

/**
 * MDX component overrides for the /blog/[slug] editorial article (Open Sky).
 *
 * - h2 / h3 inject an `id` from their text content using `slugify`. Dedupe is
 *   tracked via counters local to the render closure, matching the numbering
 *   done by `extractHeadings`, so the sticky TOC anchors resolve.
 * - Presentation only: the text and the elements stay exactly what the
 *   markdown produces; a class (or a wrapper) is chosen from their shape:
 *     · the article's first paragraph, when it opens with a bold answer
 *       ("**Technically normal, functionally borderline.** …"), becomes the
 *       "short answer" glass card, with the article's value when it has one
 *     · "**Key insight:** …" → lavender plate; "**Important:** …" → peach
 *       plate; "**Medical Disclaimer:** …" / "**Note:** …" → glass note
 *     · a paragraph that is only a link (in-article CTA) → ink pill
 *     · a paragraph set entirely in italics (closing disclaimer) → fine print
 *     · a paragraph that is only bold text (step titles) → Figtree lead-in
 *     · lists: short items → glass chips; "**Term** — text" items → cards;
 *       link-only items → link rows; ordered lists → numbered glass steps
 *       (Newsreader numerals); anything else keeps classic bullets
 *   Tables get a scroll frame (no page overflow on phones) and the reader's
 *   row ("Your value …") is marked; blockquotes (notes) become glass notes.
 * - <MeriosBlock> (added by remarkMeriosBlock) is the article's own Merios
 *   section, set as the page's one ink block.
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
type ListProps = ComponentProps<"ul">;
type OrderedListProps = ComponentProps<"ol">;

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

function cx(...names: (string | false | null | undefined)[]): string | undefined {
  const out = names.filter(Boolean).join(" ");
  return out || undefined;
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
  | { kind: "answer" }
  | { kind: "plain" };

function paragraphShape(children: ReactNode): ParagraphShape {
  const parts = meaningful(children);
  if (parts.length === 0) return { kind: "plain" };
  const first = parts[0];

  if (parts.length === 1 && isTag(first, "a")) return { kind: "cta" };
  if (parts.length === 1 && isTag(first, "em")) return { kind: "fine" };

  if (isTag(first, "strong")) {
    const raw = toPlainText(first.props.children).trim();
    const label = raw.replace(/[:.]\s*$/, "").toLowerCase();
    const callout = CALLOUT_LABELS[label];
    // "**Key insight:** text" (label inside the bold) or "**Key insight**: text"
    if (callout && parts.length > 1) return { kind: "callout", callout };
    if (parts.length === 1) return { kind: "leadIn" };
    // "**Technically normal, functionally borderline.** 30 ng/mL falls…"
    if (/[.?!]$/.test(raw)) return { kind: "answer" };
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

type MarkableRow = ReactElement<{ children?: ReactNode; "data-you"?: string }>;

/** A row's cells, their text protected (see tableText.tsx). */
function protectRow(row: ElementWithChildren): ReactNode {
  return Children.map(row.props.children, (cell) =>
    isTag(cell, "th") || isTag(cell, "td")
      ? cloneElement(
          cell,
          undefined,
          protectCell(cell.props.children, isTag(cell, "th")),
        )
      : cell,
  );
}

/**
 * Marks the body row that is the reader's own value ("**Your value (30
 * ng/mL)**"), so it reads as the highlighted band, as in the mockup, and
 * keeps values with their units and hyphenated terms whole. Adds a data
 * attribute and wrapping spans only; the text is untouched.
 */
function markReaderRow(children: ReactNode): ReactNode {
  return Children.map(children, (section) => {
    if (!isTag(section, "tbody") && !isTag(section, "thead")) return section;
    const body = isTag(section, "tbody");
    return cloneElement(
      section,
      undefined,
      Children.map(section.props.children, (row) => {
        if (!isTag(row, "tr")) return row;
        const cells = protectRow(row);
        const firstCell = Children.toArray(row.props.children).find((c) =>
          isTag(c, "td"),
        );
        const text = firstCell ? toPlainText(firstCell).trim() : "";
        return body && /^your\b/i.test(text)
          ? cloneElement(row as MarkableRow, { "data-you": "" }, cells)
          : cloneElement(row, undefined, cells);
      }),
    );
  });
}

type ListShape = "chips" | "cards" | "cardsWide" | "links" | "plain";

/** Card text longer than this stacks the cards in one column (no grid). */
const LONG_CARD = 200;

/**
 * `<Cite id="…" />` in an article → a superscript number linking to the
 * matching entry of the Sources list. Numbers come from `resolveSources`
 * (order of first citation), passed in so text and list always agree.
 * `after` (set by remarkCiteSeparators on a citation that directly follows
 * another) prints the comma between them: "¹,²".
 */
function makeCite(citeNumbers: ReadonlyMap<string, number>) {
  return function Cite({ id, after }: { id: string; after?: boolean }) {
    const number = citeNumbers.get(id);
    if (number === undefined) return null;
    return (
      <sup className={styles.cite}>
        {after ? (
          <span aria-hidden className={styles.citeSep}>
            ,
          </span>
        ) : null}
        <a href={`#source-${id}`} aria-label={`Source ${number}`}>
          {number}
        </a>
      </sup>
    );
  };
}

/** The article's own Merios section, wrapped by remarkMeriosBlock. */
function MeriosBlock({ children }: { children?: ReactNode }) {
  return (
    <div className={`night ${styles.inkBlock}`} data-nav="dark">
      {children}
    </div>
  );
}

export interface ArticleMdxOptions {
  /** The value an article is about (gauge covers), shown in the short answer. */
  answerValue?: { display: string; unit: string };
}

export function createMdxComponents(
  citeNumbers: ReadonlyMap<string, number> = new Map(),
  options: ArticleMdxOptions = {},
) {
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

    if (index === 0 && shape.kind === "answer") {
      const value = options.answerValue;
      return (
        <div className={styles.short}>
          {value ? (
            <div aria-hidden className={styles.shortValue}>
              <span className={styles.shortNum}>{value.display}</span>
              <span className={styles.shortUnit}>{value.unit}</span>
            </div>
          ) : null}
          <div className={styles.shortBody}>
            <p className={styles.shortLabel}>The short answer</p>
            <p className={cx(className, styles.shortText)} {...rest}>
              {children}
            </p>
          </div>
        </div>
      );
    }

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
    return (
      <p
        className={cx(className, shapeClass)}
        data-callout={shape.kind === "callout" ? shape.callout : undefined}
        {...rest}
      >
        {children}
      </p>
    );
  };

  /** Item contents of a tight, flat list — null when the list is loose or nested. */
  const listItems = (children: ReactNode): ReactNode[][] | null => {
    const items = meaningful(children);
    if (items.length < 2 || !items.every((li) => isTag(li, "li"))) return null;
    const contents = items.map((li) =>
      meaningful((li as ElementWithChildren).props.children),
    );
    const blocky = (n: ReactNode) =>
      isValidElement(n) &&
      (n.type === p || n.type === ul || n.type === ol || n.type === "ul" || n.type === "ol");
    if (contents.some((parts) => parts.length === 0 || parts.some(blocky))) {
      return null;
    }
    return contents;
  };

  const listShape = (children: ReactNode): ListShape => {
    const contents = listItems(children);
    if (!contents) return "plain";
    if (contents.every((parts) => parts.length === 1 && isTag(parts[0], "a"))) {
      return "links";
    }
    if (contents.every((parts) => parts.length > 1 && isTag(parts[0], "strong"))) {
      return contents.some((parts) => toPlainText(parts).length > LONG_CARD)
        ? "cardsWide"
        : "cards";
    }
    if (
      contents.length >= 4 &&
      contents.every(
        (parts) => !isTag(parts[0], "strong") && toPlainText(parts).length <= 64,
      )
    ) {
      return "chips";
    }
    return "plain";
  };

  /**
   * "**Poor absorption** — H. pylori…": the bold term becomes the card title
   * (block), and the separator after it is kept in the DOM but visually
   * hidden, so the text content stays identical.
   */
  const cardItem = (li: ReactNode): ReactNode => {
    if (!isTag(li, "li")) return li;
    const parts = Children.toArray(li.props.children);
    const firstStrong = parts.findIndex((n) => isTag(n, "strong"));
    const next = parts[firstStrong + 1];
    if (firstStrong === -1 || typeof next !== "string") return li;
    const sep = next.match(/^\s*[—–:-]\s+/);
    if (!sep) return li;
    const rebuilt = [
      ...parts.slice(0, firstStrong + 1),
      <span key="sep" className={styles.vh}>
        {sep[0]}
      </span>,
      next.slice(sep[0].length),
      ...parts.slice(firstStrong + 2),
    ];
    return cloneElement(li, undefined, ...rebuilt);
  };

  const ul = ({ className, children, ...rest }: ListProps) => {
    const shape = listShape(children);
    if (shape === "cards" || shape === "cardsWide") {
      return (
        <ul
          className={cx(
            className,
            styles.listCards,
            shape === "cardsWide" && styles.listCardsWide,
          )}
          {...rest}
        >
          {Children.map(children, cardItem)}
        </ul>
      );
    }
    const shapeClass =
      shape === "chips"
        ? styles.listChips
        : shape === "links"
          ? styles.listLinks
          : null;
    return (
      <ul className={cx(className, shapeClass)} {...rest}>
        {children}
      </ul>
    );
  };

  const ol = ({ className, children, start, style, ...rest }: OrderedListProps) => {
    const steps = listItems(children) !== null;
    // Honour `start` (e.g. a list resumed after a paragraph) on the counter.
    const counterStyle: CSSProperties | undefined =
      typeof start === "number" && start > 1
        ? { ...style, counterReset: `editorial-ol ${start - 1}` }
        : style;
    return (
      <ol
        className={cx(className, steps ? styles.listSteps : null)}
        start={start}
        style={counterStyle}
        {...rest}
      >
        {children}
      </ol>
    );
  };

  const table = ({ children, ...rest }: TableProps) => (
    <div
      className={styles.tableWrap}
      tabIndex={0}
      style={{ "--cols": countColumns(children) } as CSSProperties}
    >
      <table {...rest}>{markReaderRow(children)}</table>
    </div>
  );

  const blockquote = ({ className, children, ...rest }: BlockquoteProps) => (
    <blockquote className={cx(className, styles.note)} {...rest}>
      {children}
    </blockquote>
  );

  return {
    h2,
    h3,
    p,
    ul,
    ol,
    table,
    blockquote,
    Cite: makeCite(citeNumbers),
    MeriosBlock,
    HomaIRCalculator,
    TrigHdlRatioCalculator,
    PhenoAgeCalculator,
    A1CConverter,
    Zone2Calculator,
  };
}
