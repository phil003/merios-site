import {
  Children,
  cloneElement,
  Fragment,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";
import styles from "./article.module.css";

/**
 * Table cell typography for the article and comparison tables (presentation
 * only: every character stays as written).
 *
 * - A value and its unit never part ("30 ng/mL", "5.7 %").
 * - A hyphenated term never splits at its hyphen ("cut-off", "non-HDL").
 * - In header cells, which are set in capitals, units keep their case:
 *   "Ferritin (ng/mL)", never "NG/ML" (µ would turn into M).
 */

const UNIT =
  "ng\\/mL|ng\\/dL|mg\\/dL|mg\\/L|g\\/dL|g\\/L|pg\\/mL|µg\\/dL|mcg\\/dL|µg\\/L|mcg\\/L|" +
  "µmol\\/L|umol\\/L|mmol\\/L|mmol\\/mol|nmol\\/L|pmol\\/L|mIU\\/L|mIU\\/mL|µIU\\/mL|" +
  "uIU\\/mL|IU\\/L|U\\/L|mEq\\/L|mL\\/min\\/1\\.73 ?m²|mL\\/min|mL\\/kg\\/min|kg\\/m²|" +
  "×10³\\/µL|×10⁹\\/L|fL|pg|bpm|ms|mmHg|%";

const TOKEN = new RegExp(
  // 1-3: a value and its unit
  `(?<![\\w.])(\\d[\\d.,]*(?:\\s?[–-]\\s?\\d[\\d.,]*)?)(\\s)(${UNIT})(?![A-Za-z])` +
    // 4: a hyphenated term
    `|(?<![\\w-])([A-Za-z0-9]+(?:-[A-Za-z0-9]+)+)(?![\\w-])` +
    // 5: a unit on its own
    `|(?<![A-Za-z])(${UNIT})(?![A-Za-z])`,
  "g",
);

function protectText(text: string, header: boolean): ReactNode {
  const parts: ReactNode[] = [];
  let last = 0;
  let key = 0;
  TOKEN.lastIndex = 0;
  for (let m = TOKEN.exec(text); m; m = TOKEN.exec(text)) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    if (m[1] !== undefined) {
      parts.push(
        <span key={key++} className={styles.cellNowrap}>
          {m[1]}
          {m[2]}
          {header ? <span className={styles.cellUnit}>{m[3]}</span> : m[3]}
        </span>,
      );
    } else if (m[4] !== undefined) {
      parts.push(
        <span key={key++} className={styles.cellNowrap}>
          {m[4]}
        </span>,
      );
    } else if (header) {
      parts.push(
        <span key={key++} className={styles.cellUnit}>
          {m[5]}
        </span>,
      );
    } else {
      parts.push(m[0]);
    }
    last = m.index + m[0].length;
  }
  if (parts.length === 0) return text;
  if (last < text.length) parts.push(text.slice(last));
  return <Fragment>{parts}</Fragment>;
}

/** The cell's children with values, units and hyphenated terms protected. */
export function protectCell(children: ReactNode, header: boolean): ReactNode {
  return Children.map(children, (child) => {
    if (typeof child === "string") return protectText(child, header);
    if (
      isValidElement<{ children?: ReactNode }>(child) &&
      child.props.children !== undefined
    ) {
      return cloneElement(
        child as ReactElement<{ children?: ReactNode }>,
        undefined,
        protectCell(child.props.children, header),
      );
    }
    return child;
  });
}
