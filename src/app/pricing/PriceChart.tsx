import type { CSSProperties } from "react";
import { PRICE_CHART, type ChartMark } from "./content";
import s from "./pricing.module.css";

/**
 * What each price buys: Merios Plus against the bundled services the page
 * compares it with, on one dollar scale. Server component, no JS. The bars
 * are aria-hidden; each row's name and note carry the same figures as text.
 */

const pct = (value: number) => `${((value / PRICE_CHART.scaleMax) * 100).toFixed(2)}%`;
const span = (from: number, to: number) => ({ left: pct(from), width: pct(to - from) });
const money = (value: number) => `$${value.toLocaleString("en-US")}`;

function Mark({ mark }: { mark: ChartMark }) {
  switch (mark.kind) {
    case "reads":
      return <span className={s.markReads} style={span(mark.from, mark.to)} />;
    case "ownPanel":
      return <span className={s.markOwn} style={span(mark.from, mark.to)} />;
    case "draw":
      return <span className={s.markDraw} style={span(mark.from, mark.to)} />;
    case "drawPoint":
      return <span className={`${s.markPoint} ${s.markPointDraw}`} style={{ left: pct(mark.at) }} />;
    case "membership":
      return <span className={`${s.markPoint} ${s.markPointMember}`} style={{ left: pct(mark.at) }} />;
  }
}

export default function PriceChart() {
  const { rows, ticks, legend, caption } = PRICE_CHART;

  return (
    <figure className={s.chart} data-rv="" style={{ "--rv-delay": "0.08s" } as CSSProperties}>
      <div className={s.legend} aria-hidden>
        <span className={s.legendItem}>
          <span className={`${s.swatch} ${s.swatchReads}`} />
          {legend.reads}
        </span>
        <span className={s.legendItem}>
          <span className={`${s.swatch} ${s.swatchDraw}`} />
          {legend.draw}
        </span>
        <span className={s.legendItem}>
          <span className={`${s.swatch} ${s.swatchOwn}`} />
          {legend.ownPanel}
        </span>
        <span className={s.legendItem}>
          <span className={`${s.markPointMember} ${s.swatchMember}`} />
          {legend.membership}
        </span>
      </div>

      <ul className={s.chartRows}>
        {rows.map((row) => (
          <li key={row.name} className={s.chartRow}>
            <div className={s.chartLabel}>
              <p className={s.chartName}>{row.name}</p>
              <p className={s.chartNote}>{row.note}</p>
            </div>
            <div className={s.track} aria-hidden>
              {row.marks.map((mark) => (
                <Mark key={`${mark.kind}-${"at" in mark ? mark.at : mark.from}`} mark={mark} />
              ))}
            </div>
          </li>
        ))}
      </ul>

      <div className={`${s.chartRow} ${s.axisRow}`} aria-hidden>
        <span />
        <div className={s.axis}>
          {ticks.map((tick) => (
            <span key={tick} style={{ left: pct(tick) }} data-start={tick === 0 ? "" : undefined}>
              {money(tick)}
            </span>
          ))}
        </div>
      </div>

      <figcaption className={s.chartCaption}>{caption}</figcaption>
    </figure>
  );
}
