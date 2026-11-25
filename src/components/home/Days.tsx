import type { CSSProperties } from "react";

/* Your days (Home2 "03"): the year in 365 dots, one apricot blood-draw day and
   364 days Apple Health already counted, read below in three beats; then the
   three free rings. Example data throughout. Server-rendered SVG, no JS. */

const DRAW = 42; // Feb 12, 2026, the day of the blood test
const LEAD = 3; // Jan 1, 2026 is a Thursday; rows run Monday to Sunday
const CELL = 10;
const COLS = Math.ceil((365 + LEAD) / 7);

const DOTS = Array.from({ length: 365 }, (_, i) => {
  const c = i + LEAD;
  const s = 0.5 + 0.22 * Math.sin(i / 8.5) + 0.17 * Math.sin(i / 2.7 + 1.3) + 0.11 * Math.sin(i / 37 + 0.6);
  return {
    i,
    cx: Math.floor(c / 7) * CELL + CELL / 2,
    cy: (c % 7) * CELL + CELL / 2,
    o: (0.16 + 0.8 * Math.max(0.06, Math.min(1, s))).toFixed(2),
  };
});
const DRAW_DOT = DOTS[DRAW];

const MONTHS: [string, number][] = [
  ["Jan", 0], ["Feb", 31], ["Mar", 59], ["Apr", 90], ["May", 120], ["Jun", 151],
  ["Jul", 181], ["Aug", 212], ["Sep", 243], ["Oct", 273], ["Nov", 304], ["Dec", 334],
];

const BEATS = [
  {
    key: "blood",
    label: "Your blood",
    title: "One test. One day, in detail.",
    body: "Around forty markers, each against your lab’s own range.",
  },
  {
    key: "days",
    label: "Your days",
    title: "364 more, already counted.",
    body: "Apple Health has been keeping score all year. Merios reads it as three rings.",
  },
  {
    key: "both",
    label: "Read together",
    title: "Finally, one place that reads both.",
    body: "What moves with what, across your blood and your days. A pattern, never a cause.",
  },
];

const RINGS = [
  {
    name: "Activity",
    value: 90,
    color: "var(--color-activity)",
    glow: "rgb(255 164 114 / 0.6)",
    body: "How much you moved today, cardio, strength and everything in between.",
  },
  {
    name: "Recovery",
    value: 76,
    color: "var(--color-recovery)",
    glow: "rgb(110 143 232 / 0.55)",
    body: "How ready your body is today, based on last night.",
  },
  {
    name: "Zen",
    value: 81,
    color: "var(--color-zen)",
    glow: "rgb(154 139 234 / 0.55)",
    body: "How calm your nervous system stayed today.",
  },
];

export default function Days() {
  return (
    <div className="hv2-daysbg">
      <section id="days" className="hv2-sec hv2-days" aria-labelledby="days-title">
        <div className="hv2-wrap">
          <p className="hv2-eyebrow">03 · Your days</p>
          <div className="hv2-headrow">
            <h2 className="hv2-h2" id="days-title">
              Your blood test sees 1 day. Your iPhone saw <em>the other 364.</em>
            </h2>
            <p className="hv2-lead">
              Steps, sleep, heart rate and HRV have been counting all year. On
              day one, Merios imports your last 365 days. Read only,
              automatically.
            </p>
          </div>

          <div className="hv2-year" data-rv="">
            <div
              className="hv2-year__plot"
              role="img"
              aria-label="A year drawn as 365 dots, one per day. One dot, February 12, is the day of the blood test; the other 364 come from Apple Health. Example data."
            >
              <div className="hv2-year__chip" aria-hidden="true">
                <span>Feb 12 · the blood draw</span>
                <span />
              </div>
              <svg
                className="hv2-year__svg"
                viewBox={`0 0 ${COLS * CELL} ${7 * CELL}`}
                aria-hidden="true"
                focusable="false"
              >
                {DOTS.map((dot) =>
                  dot.i === DRAW ? null : (
                    <circle key={dot.i} cx={dot.cx} cy={dot.cy} r="3.4" fill="#6E8FE8" opacity={dot.o} />
                  ),
                )}
                <circle cx={DRAW_DOT.cx} cy={DRAW_DOT.cy} r="6.2" fill="#FFA472" opacity="0.25" />
                <circle className="hv2-year__draw" cx={DRAW_DOT.cx} cy={DRAW_DOT.cy} r="3.6" fill="#FFA472" />
              </svg>
              <div className="hv2-year__months" aria-hidden="true">
                {MONTHS.map(([m, start], i) => (
                  <span
                    key={m}
                    className={i % 3 ? "is-minor" : undefined}
                    style={{ left: `${((Math.floor((start + LEAD) / 7) / COLS) * 100).toFixed(2)}%` }}
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>

            <ul className="hv2-beats">
              {BEATS.map((b) => (
                <li key={b.key} className="hv2-beat">
                  <p className="hv2-beat__k">
                    <span className={`hv2-beat__dot hv2-beat__dot--${b.key}`} aria-hidden="true" />
                    {b.label}
                  </p>
                  <h3>{b.key === "both" ? <em>{b.title}</em> : b.title}</h3>
                  <p className="hv2-beat__body">{b.body}</p>
                </li>
              ))}
            </ul>

            <div className="hv2-year__foot">
              <span>One dot, one day · brighter, higher score · blood draw</span>
              <span>Example data</span>
            </div>
          </div>
        </div>
      </section>

      <section id="daily" className="hv2-sec hv2-daily" aria-labelledby="daily-title">
        <div className="hv2-wrap">
          <div className="hv2-headrow">
            <div className="hv2-daily__title">
              <span className="hv2-stamp">Free, for good</span>
              <h2 className="hv2-h2 hv2-h2--sm" id="daily-title">
                Your day, in <em>three rings.</em>
              </h2>
            </div>
            <p className="hv2-lead">
              One score from your Apple Health data, every morning. Higher is
              always better, and a low number is information, not a warning. It
              never turns red.
            </p>
          </div>

          <ul className="hv2-rings" data-rv="">
            {RINGS.map((r, i) => (
              <li key={r.name} className="hv2-ring">
                <div className="hv2-ring__dial">
                  <svg width="96" height="96" viewBox="0 0 96 96" aria-hidden="true" focusable="false">
                    <circle cx="48" cy="48" r="40" fill="none" stroke="#FFFFFF" strokeOpacity="0.8" strokeWidth="7" />
                    <circle
                      className="hv2-ring__arc"
                      cx="48"
                      cy="48"
                      r="40"
                      fill="none"
                      strokeWidth="7"
                      strokeLinecap="round"
                      pathLength={100}
                      strokeDasharray={`${r.value} 100`}
                      transform="rotate(-90 48 48)"
                      style={
                        {
                          stroke: r.color,
                          filter: `drop-shadow(0 0 5px ${r.glow})`,
                          "--d": `${0.2 + i * 0.15}s`,
                        } as CSSProperties
                      }
                    />
                  </svg>
                  <span className="hv2-ring__val">{r.value}</span>
                </div>
                <div>
                  <h3>{r.name}</h3>
                  <p>{r.body}</p>
                </div>
              </li>
            ))}
          </ul>
          <p className="hv2-score">
            <b>The Merios Score is four quarters:</b> Activity, Recovery and Zen,
            and the fourth is your blood. One photo of a lab report fills it in.
            Example data.
          </p>
        </div>
      </section>
    </div>
  );
}
