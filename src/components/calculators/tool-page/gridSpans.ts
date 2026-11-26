import type { CSSProperties } from "react";

/**
 * Card spans for the tool grid (hub and "More calculators"), so that no row
 * ends with an empty slot and no card is left alone on the last row.
 *
 * The grid has explicit column counts by breakpoint (toolPage.module.css:
 * 1, 2 from 620px, 3 from 960px, 4 from 1300px); each card gets
 * `--span-2/3/4`, the number of columns it takes at that count. A single row
 * (a filtered view with few tools) is left as it is.
 */

/** Columns each card spans at `cols` columns. `wide` marks the PhenoAge card (2). */
export function spansFor(wide: boolean[], cols: number): number[] {
  const spans = wide.map((w) => (w && cols >= 2 ? 2 : 1));
  const total = spans.reduce((a, b) => a + b, 0);
  if (cols < 2 || total <= cols || total % cols === 0) return spans;

  // The wide card narrows if that alone squares the grid.
  const wideAt = spans.indexOf(2);
  if (wideAt !== -1 && (total - 1) % cols === 0) {
    spans[wideAt] = 1;
    return spans;
  }

  const rest = total % cols;
  if (rest === 1 && cols === 2) {
    // Two columns, one card over: the first card takes the whole first row.
    spans[0] = 2;
    return spans;
  }

  // The cards of the last row (or, when only one card is left over, of the
  // last two rows, so neither row holds a single card) widen to fill it.
  const rows = rest === 1 ? 2 : 1;
  const slots = rest + (rows - 1) * cols;
  const tail: number[] = [];
  let used = 0;
  for (let i = spans.length - 1; i >= 0 && used < slots; i--) {
    tail.unshift(i);
    used += spans[i];
  }
  if (used !== slots || tail.some((i) => spans[i] !== 1)) return spans;

  // Split the tail into `rows` rows of at least two cards, then let the
  // last cards of each row take the spare columns.
  const perRow = rows === 2 ? [Math.ceil(tail.length / 2), Math.floor(tail.length / 2)] : [tail.length];
  let start = 0;
  for (const count of perRow) {
    const row = tail.slice(start, start + count);
    start += count;
    let spare = cols - row.length;
    for (let k = row.length - 1; spare > 0; k = k === 0 ? row.length - 1 : k - 1) {
      spans[row[k]] += 1;
      spare -= 1;
    }
  }
  return spans;
}

/** `--span-2/3/4` for each card. `maxCols` caps the grid (3 for "More calculators"). */
export function spanStyles(wide: boolean[], maxCols = 4): CSSProperties[] {
  const by = [2, 3, 4].map((c) => spansFor(wide, Math.min(c, maxCols)));
  return wide.map(
    (_, i) =>
      ({
        "--span-2": by[0][i],
        "--span-3": by[1][i],
        "--span-4": by[2][i],
      }) as CSSProperties,
  );
}
