import Image from "next/image";
import { keepHyphens } from "./text";

/* Your days (Home2 v24, "03"): the year in 365 dots, one apricot blood-draw
   day and 364 days Apple Health already counted; then the three rings, each
   opening its full screen of the app (2.2, example data): Sleep, Activity and
   Zen, with the question each one answers and four points from the app's own
   texts. Server-rendered, no JS. */

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

type Screen = {
  key: "sleep" | "activity" | "zen";
  label: string;
  color: string;
  question: string;
  questionEnd: string;
  img: string;
  alt: string;
  caption: string;
  points: [string, string][];
};

// Questions from the App Store 2.2 listing; points from the app's own texts.
const SCREENS: Screen[] = [
  {
    key: "sleep",
    label: "Sleep · Recovery",
    color: "var(--color-recovery)",
    question: "Did I recover,",
    questionEnd: "and what about tonight?",
    img: "/images/v2/screens/sleep.jpg",
    alt: "Merios Sleep screen, example data: 7h24 asleep, 6 minutes under your need, Recovery 75, last night drawn in sleep stages with heart rate, and tonight’s plan, lights out by 11:15 PM.",
    caption: "The Sleep screen · Example data",
    points: [
      ["Last night, in one sentence.", "How long you slept, against the sleep you need. Your need is learned from the nights that left you rested."],
      ["Your night, drawn.", "Awake, REM, core and deep sleep from your Apple Watch, with your heart rate across the night."],
      ["A Recovery score.", "Your sleep, heart rate variability and resting heart rate, read against your own usual nights."],
      ["Tonight, planned.", "Set a wake-up time and Merios gives you a lights-out time and a wind-down reminder."],
    ],
  },
  {
    key: "activity",
    label: "Activity · Training",
    color: "var(--color-activity)",
    question: "What did I do,",
    questionEnd: "and what did it do to me?",
    img: "/images/v2/screens/activity.jpg",
    alt: "Merios Activity screen, example data: a 4-mile lunch run and 8,100 steps, an Activity score of 96 so far, the run from Apple Watch with a How did it feel? choice, and the last 7 days of training load.",
    caption: "The Activity screen · Example data",
    points: [
      ["Your day, in one line.", "A 4-mile lunch run and 8,100 steps, next to what a usual day looks like for you."],
      ["Every workout.", "Distance, pace and time from your Apple Watch, and how it felt, from easy to all out."],
      ["Your week of training.", "The load of your last 7 days, next to your 4-week average."],
      ["A score that builds.", "Your Activity score rises through the day and settles at 9 PM."],
    ],
  },
  {
    key: "zen",
    label: "Zen · Stress",
    color: "var(--color-zen)",
    question: "How is my nervous system doing,",
    questionEnd: "and what can I do now?",
    img: "/images/v2/screens/zen.jpg",
    alt: "Merios Zen screen, example data: a calm morning, then a busy afternoon. Zen 74 so far, 52 tension minutes in 15-minute bars, the run set aside, and Breathe with four rhythms.",
    caption: "The Zen screen · Example data",
    points: [
      ["Your day, in tension minutes.", "Minutes when your heart rate sat more than 20 bpm above your usual resting rate, outside a recorded workout, in 15-minute bars."],
      ["Your own baseline.", "The line comes from your resting heart rate, never from an average of other people."],
      ["A reading, not a feeling.", "Coffee, heat or a flight of stairs can count too. A recorded workout never does."],
      ["Breathe.", "Four guided rhythms, Settle, Reset, Focus and Unwind, from 1 to 10 minutes."],
    ],
  },
];

export default function Days() {
  return (
    <section id="days" className="hv2-sec hv2-days" aria-labelledby="days-title">
      <div className="hv2-wrap">
        <p className="hv2-eyebrow">03 · Your days</p>
        <div className="hv2-headrow">
          <h2 className="hv2-h2" id="days-title">
            Your blood test sees 1 day. Your iPhone saw <em>the other 364.</em>
          </h2>
          <p className="hv2-lead">
            Steps, sleep, heart rate and HRV have counted all year. On day one,
            Merios imports your last 365 days and reads them as three rings,
            every morning.
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

          <div className="hv2-year__foot">
            <p className="hv2-year__key">
              <span>
                <i className="hv2-swatch" aria-hidden="true" />
                One dot, one day
              </span>
              <span>
                <i className="hv2-swatch hv2-swatch--dim" aria-hidden="true" />
                <i className="hv2-swatch hv2-swatch--bright" aria-hidden="true" />
                Brighter, higher score
              </span>
            </p>
            <p>Example data</p>
          </div>
        </div>

        <div id="daily" className="hv2-headrow hv2-screens__head">
          <p className="hv2-screens__title">
            Each ring opens <em>a full screen.</em>
          </p>
          <p className="hv2-lead">
            Sleep, Activity and Zen each answer one question, every day, from
            what your iPhone and Apple Watch already record.
          </p>
        </div>

        <div className="hv2-screens" data-rv="">
          {SCREENS.map((s) => (
            <article key={s.key} className="hv2-screen" aria-labelledby={`hv2-screen-${s.key}`}>
              <p className="hv2-screen__k">
                <span className="hv2-screen__dot" style={{ background: s.color }} aria-hidden="true" />
                {s.label}
              </p>
              <h3 className="hv2-screen__q" id={`hv2-screen-${s.key}`}>
                {s.question} <em>{s.questionEnd}</em>
              </h3>
              <figure className="hv2-screen__fig">
                <Image
                  src={s.img}
                  alt={s.alt}
                  width={780}
                  height={1696}
                  sizes="(max-width: 999px) 240px, 270px"
                />
                <figcaption>{s.caption}</figcaption>
              </figure>
              <ul className="hv2-screen__points">
                {s.points.map(([lead, text]) => (
                  <li key={lead}>
                    <b>{lead}</b> {keepHyphens(text)}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <p className="hv2-score">
          <b>One score, four quarters.</b> Activity, Recovery and Zen, and the
          fourth is your blood. Higher is better; a low number is information,
          never a warning. Example data.
        </p>
      </div>
    </section>
  );
}
