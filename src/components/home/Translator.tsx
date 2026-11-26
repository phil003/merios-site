"use client";

import { useState, type KeyboardEvent } from "react";
import { keepHyphens } from "./text";

/* The lab report translator (Home2 v24, "01"): an example report, each line a
   button, read back on the glass card next to it. The card says what the line
   is, in plain words: a title, then two or three sentences. The value on the
   lab's own range comes last, small. Example data. */

type Row = {
  id: string;
  name: string;
  res: string;
  flag: "" | "H" | "L";
  unit: string;
  ref: string;
  lo: number;
  hi: number;
  v: number;
  d0: number;
  d1: number;
  log?: boolean;
  openLo?: boolean;
  openHi?: boolean;
  plain: string;
  why: string;
};

const ROWS: Row[] = [
  { id: "iron", name: "Iron, total", res: "71", flag: "", unit: "ug/dL", ref: "38–169", lo: 38, hi: 169, v: 71, d0: 0, d1: 250,
    plain: "Iron in transit.",
    why: "This is the iron traveling in your blood right now, on its way to make red blood cells. It rises and falls through the day and after a meal, so on its own it says little about your reserves." },
  { id: "ferritin", name: "Ferritin", res: "21", flag: "L", unit: "ng/mL", ref: "30–400", lo: 30, hi: 400, v: 21, d0: 5, d1: 700, log: true,
    plain: "Your iron savings.",
    why: "Ferritin is the protein that stores iron in your body, and the small amount in your blood mirrors how much is put aside. Your body draws on these savings to make red blood cells, which carry oxygen everywhere." },
  { id: "vitd", name: "Vitamin D, 25-OH", res: "22.4", flag: "L", unit: "ng/mL", ref: "30–100", lo: 30, hi: 100, v: 22.4, d0: 0, d1: 120,
    plain: "Your vitamin D reserve.",
    why: "25-OH is the form of vitamin D your blood carries, the one that shows how much you have on hand. Your skin makes vitamin D in sunlight and food adds some. Your body needs it to absorb calcium for your bones." },
  { id: "b12", name: "Vitamin B12", res: "388", flag: "", unit: "pg/mL", ref: "232–1245", lo: 232, hi: 1245, v: 388, d0: 0, d1: 1500,
    plain: "A vitamin for your nerves and blood.",
    why: "B12 helps your body make red blood cells and keeps your nerves working. It comes from animal foods, fortified foods or supplements, and your liver keeps a reserve that can last for years." },
  { id: "apob", name: "Apolipoprotein B", res: "96", flag: "H", unit: "mg/dL", ref: "<90", lo: 0, hi: 90, v: 96, d0: 0, d1: 150, openLo: true,
    plain: "A head count of cholesterol carriers.",
    why: "Each particle that can carry cholesterol into your artery walls has exactly one ApoB on its surface, so ApoB counts those particles. LDL cholesterol, by contrast, measures how much cholesterol they hold." },
  { id: "hdl", name: "HDL cholesterol", res: "58", flag: "", unit: "mg/dL", ref: ">39", lo: 39, hi: 120, v: 58, d0: 0, d1: 120, openHi: true,
    plain: "Cholesterol on its way back.",
    why: "HDL particles collect extra cholesterol from your tissues and carry it back to your liver, which clears it. That is why HDL is often called the good cholesterol." },
  { id: "mchc", name: "MCHC", res: "33.6", flag: "", unit: "g/dL", ref: "31.5–35.7", lo: 31.5, hi: 35.7, v: 33.6, d0: 28, d1: 38,
    plain: "How full your red cells are.",
    why: "Hemoglobin is the protein that carries oxygen inside your red blood cells. MCHC is how concentrated it is in them, on average. Your lab works it out from your blood count." },
  { id: "glucose", name: "Glucose, fasting", res: "94", flag: "", unit: "mg/dL", ref: "70–99", lo: 70, hi: 99, v: 94, d0: 50, d1: 140,
    plain: "Your blood sugar at rest.",
    why: "Measured after at least 8 hours without food, this is the sugar your body keeps in your blood between meals. Insulin holds it in a narrow band, so it shows how that balance looks when you are not eating." },
  { id: "tsh", name: "TSH", res: "2.41", flag: "", unit: "mIU/L", ref: "0.45–4.50", lo: 0.45, hi: 4.5, v: 2.41, d0: 0, d1: 6,
    plain: "Your thyroid’s control signal.",
    why: "TSH is the hormone your pituitary gland, at the base of your brain, sends to tell your thyroid how hard to work. When the thyroid slows down, TSH rises to push it. When it runs fast, TSH falls. That is why it is usually the first thyroid test." },
  { id: "egfr", name: "eGFR", res: "104", flag: "", unit: "mL/min/1.73m²", ref: ">59", lo: 59, hi: 150, v: 104, d0: 0, d1: 150, openHi: true,
    plain: "How well your kidneys filter.",
    why: "eGFR estimates how much blood your kidneys clean every minute. It is calculated from creatinine, a waste product of your muscles, together with your age and sex. It is the usual way to follow kidney function over time." },
];

const pos = (r: Row, x: number) => {
  const t = r.log
    ? (Math.log(Math.max(x, r.d0)) - Math.log(r.d0)) / (Math.log(r.d1) - Math.log(r.d0))
    : (x - r.d0) / (r.d1 - r.d0);
  return Math.min(1, Math.max(0, t)) * 100;
};

function readout(r: Row) {
  const inRange = r.openLo ? r.v < r.hi : r.openHi ? r.v > r.lo : r.v >= r.lo && r.v <= r.hi;
  const lab = r.openLo
    ? `Lab range under ${r.hi} ${r.unit}`
    : r.openHi
      ? `Lab range over ${r.lo} ${r.unit}`
      : `Lab range ${r.ref} ${r.unit}`;
  const bandL = r.openLo ? 0 : pos(r, r.lo);
  const bandR = r.openHi ? 100 : pos(r, r.hi);
  return { inRange, lab, bandL, bandW: Math.max(1, bandR - bandL), dot: pos(r, r.v) };
}

export default function Translator() {
  const [active, setActive] = useState("ferritin");
  const row = ROWS.find((r) => r.id === active) ?? ROWS[1];
  const ro = readout(row);

  // arrow keys walk the report, one line at a time
  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    const buttons = Array.from(e.currentTarget.querySelectorAll<HTMLButtonElement>("button"));
    const i = buttons.indexOf(document.activeElement as HTMLButtonElement);
    if (i < 0) return;
    e.preventDefault();
    const next = buttons[(i + (e.key === "ArrowDown" ? 1 : -1) + buttons.length) % buttons.length];
    next.focus();
    if (next.dataset.id) setActive(next.dataset.id);
  };

  return (
    <section id="translate" className="hv2-sec hv2-translate" aria-labelledby="translate-title">
      <div className="hv2-wrap">
        <p className="hv2-eyebrow">01 · The translation</p>
        <h2 className="hv2-h2 hv2-translate__title" id="translate-title">
          Your lab report <em>wasn&rsquo;t written for you.</em>
        </h2>
        <p className="hv2-lead">
          Your report was written for your doctor. Merios reads every line,
          places it in your lab&rsquo;s own range and tells you what it means.
          Tap a line.
        </p>

        <div className="hv2-translate__grid">
          <div className="hv2-report">
            <div className="hv2-report__head">
              <div>
                <p className="hv2-label">Laboratory report</p>
                <p className="hv2-report__lab">Comprehensive panel with iron studies</p>
              </div>
              <p className="hv2-report__meta">
                Collected Sep 22, 2026
                <br />
                Example data
              </p>
            </div>
            <div className="hv2-report__cols" aria-hidden="true">
              <span>Test</span>
              <span>Result</span>
              <span className="hv2-report__colflag">Flag</span>
              <span>Range</span>
            </div>
            <div
              className="hv2-report__rows"
              role="group"
              aria-label="Example lab report. Choose a line to read it in plain English."
              onKeyDown={onKeyDown}
            >
              {ROWS.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  data-id={r.id}
                  className="hv2-row"
                  aria-pressed={active === r.id}
                  aria-label={`${r.name}, ${r.res} ${r.unit}${r.flag ? `, flagged ${r.flag === "H" ? "high" : "low"}` : ""}. Read it in plain English.`}
                  onClick={() => setActive(r.id)}
                >
                  <span className="hv2-row__name">{keepHyphens(r.name)}</span>
                  <span className="hv2-row__res">
                    <b>{r.res}</b> <span className="hv2-unit">{r.unit}</span>
                    {r.flag ? <i className="hv2-row__inflag">{r.flag}</i> : null}
                  </span>
                  <span className="hv2-row__flag">{r.flag}</span>
                  <span className="hv2-row__ref">{r.ref}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="hv2-readout" aria-live="polite">
            <p className="hv2-readout__raw">
              {keepHyphens(row.name.toUpperCase())} · {row.res}{" "}
              <span className="hv2-unit">{row.unit}</span>
              {row.flag ? ` · FLAG ${row.flag}` : ""}
            </p>
            <p key={row.id} className="hv2-readout__plain hv2-swap">
              {row.plain}
            </p>
            <p key={`${row.id}-why`} className="hv2-readout__why hv2-swap">
              {keepHyphens(row.why)}
            </p>
            <div className="hv2-range" aria-hidden="true">
              <span className="hv2-range__track" />
              <span className="hv2-range__band" style={{ left: `${ro.bandL}%`, width: `${ro.bandW}%` }} />
              <span
                className={`hv2-range__dot${ro.inRange ? "" : " is-out"}`}
                style={{ left: `${ro.dot}%` }}
              />
            </div>
            <p className="hv2-range__lab">{ro.lab}</p>
          </div>
        </div>
        <p className="hv2-fine hv2-translate__fine">Example data · general information, not a diagnosis.</p>
      </div>
    </section>
  );
}
