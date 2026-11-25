import type { CSSProperties } from "react";
import {
  getCoverPlate,
  getDrawnCover,
  PLATES,
  type CoverBand,
  type CoverCurve,
  type CoverRow,
  type DrawnCover,
} from "@/lib/covers";
import styles from "./cover.module.css";

/**
 * Drawn article cover (Open Sky, mockup Journal.dc.html « couvertures
 * dessinées »): the subject of the article on a soft dawn plate — the marker
 * and its unit, the value on its range, a comparison, a count, a curve, a
 * lab-report extract or a short list (data in src/lib/covers.ts).
 *
 * HTML, not an image: crisp at any size, zero bytes, brand fonts from the page.
 * The cover is its own size container, so it fills whatever box it is given
 * (pass sizing through className, e.g. "block h-full w-full" in an
 * aspect-ratio box) and keeps the mockup's proportions at any width.
 * Decorative for assistive tech: the link or figure around it carries the
 * title. Works as a server component and inside client trees.
 */

type Variant = "card" | "feature" | "wide" | "tall";

interface ArticleCoverProps {
  post: { slug: string; title?: string; tag: string };
  className?: string;
  /**
   * Kept for compatibility. The cover now adapts to its own width (card,
   * featured card, article hero), so every variant renders the same way.
   */
  variant?: Variant;
}

export default function ArticleCover({
  post,
  className = "",
  variant = "card",
}: ArticleCoverProps) {
  const spec = getDrawnCover(post);
  const plate = PLATES[spec.plate];
  const style = { "--cv-a": plate.from, "--cv-b": plate.to } as CSSProperties;

  return (
    <span
      className={className ? `${styles.cv} ${className}` : styles.cv}
      style={style}
      data-variant={variant}
      aria-hidden="true"
    >
      <span className={styles.top}>
        <span className={styles.kicker}>{spec.kicker}</span>
        {spec.note ? <span className={styles.note}>{spec.note}</span> : null}
      </span>
      <span className={styles.body}>
        <CoverMainLine spec={spec} />
        {spec.band ? <Band band={spec.band} /> : null}
        {spec.curve ? <Curve curve={spec.curve} /> : null}
        {spec.dots ? <Dots count={spec.dots} /> : null}
        {spec.rows ? <Rows rows={spec.rows} /> : null}
        {spec.bars ? (
          <span className={styles.bars}>
            {spec.bars.map((b) => (
              <span key={b.label} className={styles.bar}>
                <span>{b.label}</span>
                <span className={styles.barTrack}>
                  <span
                    className={styles.barFill}
                    style={{ width: `${b.pct}%`, background: b.color }}
                  />
                </span>
              </span>
            ))}
          </span>
        ) : null}
      </span>
    </span>
  );
}

function CoverMainLine({ spec }: { spec: DrawnCover }) {
  const main = spec.main;
  const size = { "--cv-size": String(main.size) } as CSSProperties;
  if (main.kind === "two") {
    return (
      <>
        <span className={styles.two} style={size}>
          <span>{main.left}</span>
          <span className={styles.sep}>{main.sep}</span>
          <span>{main.right}</span>
        </span>
        {main.sub ? <span className={styles.sub}>{main.sub}</span> : null}
      </>
    );
  }
  return (
    <span className={styles.one}>
      <span className={styles.big} style={size}>
        {main.big}
      </span>
      {main.unit ? <span className={styles.unit}>{main.unit}</span> : null}
    </span>
  );
}

function Band({ band }: { band: CoverBand }) {
  return (
    <>
      <span className={styles.band}>
        <span className={styles.track}>
          {band.segs.map((s) => (
            <span
              key={`${s.left}-${s.width}`}
              className={styles.seg}
              style={{ left: `${s.left}%`, width: `${s.width}%`, background: s.color }}
            />
          ))}
        </span>
        {band.pins.map((p) => (
          <span key={p} className={styles.pin} style={{ left: `${p}%` }} />
        ))}
      </span>
      <span className={styles.ticks}>
        {band.ticks.map((t) => (
          <span
            key={`${t.at}-${t.label}`}
            className={t.strong ? `${styles.tick} ${styles.tickStrong}` : styles.tick}
            data-align={t.align}
            style={{ left: `${t.at}%` }}
          >
            {t.label}
          </span>
        ))}
      </span>
    </>
  );
}

function Curve({ curve }: { curve: CoverCurve }) {
  return (
    <svg
      className={styles.curve}
      viewBox="0 0 300 70"
      preserveAspectRatio="none"
      aria-hidden="true"
      focusable="false"
    >
      {curve.ghost ? (
        <path
          d={curve.ghost}
          fill="none"
          stroke="#18213F"
          strokeWidth="2"
          strokeDasharray={curve.ghostDash}
          opacity="0.45"
          vectorEffect="non-scaling-stroke"
        />
      ) : null}
      <path
        d={curve.path}
        fill="none"
        stroke="#6E8FE8"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function Dots({ count }: { count: number }) {
  return (
    <span className={styles.dots}>
      {Array.from({ length: count }, (_, i) => (
        <span key={i} className={styles.dot} />
      ))}
    </span>
  );
}

function flagTone(flag: string): "hl" | "none" | "mark" {
  if (flag === "H" || flag === "L") return "hl";
  if (flag === "") return "none";
  return "mark";
}

function Rows({ rows }: { rows: CoverRow[] }) {
  return (
    <span className={styles.rows}>
      {rows.map((r) => (
        <span key={r.label} className={styles.row}>
          <span className={styles.rowLabel}>{r.label}</span>
          <span className={styles.rowEnd}>
            {r.value ? <span className={styles.rowValue}>{r.value}</span> : null}
            <span className={styles.flag} data-tone={flagTone(r.flag)}>
              {r.flag}
            </span>
          </span>
        </span>
      ))}
    </span>
  );
}

/**
 * Text-free companion of the cover: the same plate, no words, for panels that
 * add their own content on top (related articles). Decorative only; the
 * consumer sizes and positions it through className.
 */
export function CoverBackdrop({
  post,
  className = "",
}: {
  post: { slug: string; tag: string };
  className?: string;
}) {
  const plate = getCoverPlate(post);
  return (
    <span
      className={className ? `${styles.backdrop} ${className}` : styles.backdrop}
      style={{ "--cv-a": plate.from, "--cv-b": plate.to } as CSSProperties}
      aria-hidden="true"
    />
  );
}
