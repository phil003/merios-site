"use client";

import { useState, type KeyboardEvent } from "react";

/* The lab report translator (Home2 "01"): an example report, each line a
   button, read back in plain English on the glass card next to it, with the
   value placed in the lab's own range. Example data. */

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
type Item = { sec: string } | Row;

const LAB: Item[] = [
  { sec: "Iron status / vitamins" },
  { id: "iron", name: "Iron, total", res: "71", flag: "", unit: "ug/dL", ref: "38–169", lo: 38, hi: 169, v: 71, d0: 0, d1: 250,
    plain: "Iron in your blood today, in range.", why: "It moves with your last meals, so it says less about your reserves than ferritin does." },
  { id: "ferritin", name: "Ferritin", res: "21", flag: "L", unit: "ng/mL", ref: "30–400", lo: 30, hi: 400, v: 21, d0: 5, d1: 700, log: true,
    plain: "Iron stores on the low side.", why: "Ferritin reflects the iron your body keeps in reserve. Low stores are often linked to feeling tired." },
  { id: "vitd", name: "Vitamin D, 25-OH", res: "22.4", flag: "L", unit: "ng/mL", ref: "30–100", lo: 30, hi: 100, v: 22.4, d0: 0, d1: 120,
    plain: "Vitamin D, under the lab’s range.", why: "Your skin makes it from sunlight, which is why it often tracks the time you spend outdoors." },
  { id: "b12", name: "Vitamin B12", res: "388", flag: "", unit: "pg/mL", ref: "232–1245", lo: 232, hi: 1245, v: 388, d0: 0, d1: 1500,
    plain: "Vitamin B12, comfortably in range.", why: "B12 helps your body make red blood cells and keeps nerves working." },
  { sec: "Lipids" },
  { id: "apob", name: "Apolipoprotein B", res: "96", flag: "H", unit: "mg/dL", ref: "<90", lo: 0, hi: 90, v: 96, d0: 0, d1: 150, openLo: true,
    plain: "Cholesterol carriers, just above the range.", why: "ApoB counts the particles that carry cholesterol, not just the cholesterol inside them." },
  { id: "hdl", name: "HDL cholesterol", res: "58", flag: "", unit: "mg/dL", ref: ">39", lo: 39, hi: 120, v: 58, d0: 0, d1: 120, openHi: true,
    plain: "Protective cholesterol, in range.", why: "HDL helps carry cholesterol away from your arteries, back to the liver." },
  { sec: "CBC" },
  { id: "mchc", name: "MCHC", res: "33.6", flag: "", unit: "g/dL", ref: "31.5–35.7", lo: 31.5, hi: 35.7, v: 33.6, d0: 29, d1: 38,
    plain: "How packed your red cells are with hemoglobin.", why: "In range. It is one line of a standard blood count." },
  { sec: "Metabolic / thyroid" },
  { id: "glucose", name: "Glucose, fasting", res: "94", flag: "", unit: "mg/dL", ref: "70–99", lo: 70, hi: 99, v: 94, d0: 50, d1: 140,
    plain: "Fasting blood sugar, in range.", why: "Measured after a night without food, so it reflects your baseline rather than your last meal." },
  { id: "tsh", name: "TSH", res: "2.41", flag: "", unit: "mIU/L", ref: "0.45–4.50", lo: 0.45, hi: 4.5, v: 2.41, d0: 0, d1: 6,
    plain: "Your thyroid’s control signal, in range.", why: "TSH is the message your brain sends to your thyroid. In range means that conversation looks typical." },
  { id: "egfr", name: "eGFR", res: "104", flag: "", unit: "mL/min/1.73m²", ref: ">59", lo: 59, hi: 140, v: 104, d0: 0, d1: 140, openHi: true,
    plain: "How well your kidneys filter, in range.", why: "An estimate of filtering, calculated from creatinine, age and sex." },
];
const ROWS = LAB.filter((r): r is Row => "id" in r);

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
        <p className="hv2-eyebrow">01 · Lab report → plain English</p>
        <h2 className="hv2-h2 hv2-translate__title" id="translate-title">
          Your lab report <em>wasn&rsquo;t written for you.</em>
        </h2>
        <p className="hv2-lead">
          It was written for your doctor, then it landed in your inbox. Merios
          reads every line and says what it means, against your lab&rsquo;s own
          range.
        </p>
        <div className="hv2-flags" aria-hidden="true">
          <span className="hv2-flag">
            <i>H</i>means high
          </span>
          <span className="hv2-flag">
            <i>L</i>means low
          </span>
          <span className="hv2-flag hv2-flag--plain">Not every line is a flag</span>
          <span className="hv2-hint">tap any line</span>
        </div>

        <div className="hv2-translate__grid">
          <div className="hv2-report">
            <div className="hv2-report__head">
              <div>
                <p className="hv2-label">Laboratory report — final</p>
                <p className="hv2-report__lab">Halcyon Diagnostics</p>
              </div>
              <p className="hv2-report__meta">
                Patient: Morgan, Alex J. · Fasting: yes
                <br />
                Collected: 02/12/2026 · Example data
              </p>
            </div>
            <div className="hv2-report__cols" aria-hidden="true">
              <span>Test</span>
              <span>Result</span>
              <span>Flag</span>
              <span>Reference</span>
            </div>
            <div
              className="hv2-report__rows"
              role="group"
              aria-label="Example lab report. Choose a line to read it in plain English."
              onKeyDown={onKeyDown}
            >
              {LAB.map((r) =>
                "sec" in r ? (
                  <p key={r.sec} className="hv2-report__sec" aria-hidden="true">
                    {r.sec}
                  </p>
                ) : (
                  <button
                    key={r.id}
                    type="button"
                    data-id={r.id}
                    className="hv2-row"
                    aria-pressed={active === r.id}
                    aria-label={`${r.name}, ${r.res} ${r.unit}${r.flag ? `, flagged ${r.flag === "H" ? "high" : "low"}` : ""}. Read it in plain English.`}
                    onClick={() => setActive(r.id)}
                  >
                    <span className="hv2-row__name">{r.name}</span>
                    <span className="hv2-row__res">
                      <b>{r.res}</b> {r.unit}
                    </span>
                    <span className="hv2-row__flag">{r.flag}</span>
                    <span className="hv2-row__ref">{r.ref}</span>
                  </button>
                ),
              )}
            </div>
            <p className="hv2-report__foot">
              Results flagged H (high) or L (low) fall outside the reference
              interval. <mark>This report is intended for the ordering provider.</mark>
              <span className="hv2-report__note" aria-hidden="true">
                see? not for you
              </span>
            </p>
          </div>

          <div className="hv2-readout" aria-live="polite">
            <div>
              <p className="hv2-label hv2-readout__says">Merios says</p>
              <p className="hv2-readout__raw">
                {`${row.name.toUpperCase()} · ${row.res} ${row.unit}${row.flag ? ` · FLAG ${row.flag}` : ""}`}
              </p>
              <p key={row.id} className="hv2-readout__plain hv2-swap">
                {row.plain}
              </p>
            </div>
            <div>
              <div className="hv2-range" aria-hidden="true">
                <span className="hv2-range__track" />
                <span className="hv2-range__band" style={{ left: `${ro.bandL}%`, width: `${ro.bandW}%` }} />
                <span
                  className={`hv2-range__dot${ro.inRange ? "" : " is-out"}`}
                  style={{ left: `${ro.dot}%` }}
                />
              </div>
              <div className="hv2-range__legend">
                <span>{ro.lab}</span>
                <span className={`hv2-status${ro.inRange ? "" : " is-out"}`}>
                  {ro.inRange ? "In your range" : "Outside your range"}
                </span>
              </div>
              <p key={`${row.id}-why`} className="hv2-readout__why hv2-swap">
                {row.why}
              </p>
            </div>
          </div>
        </div>
        <p className="hv2-fine hv2-translate__fine">Example data · general information, not a diagnosis.</p>
      </div>
    </section>
  );
}
