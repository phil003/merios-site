"use client";

import { useState, useMemo, type ReactNode } from "react";
import {
  Shell, CalcHead, Eyebrow, CalcTitle, CalcInputs, Fields, Field, Toggle, CalcOutput, ResultPanel, ResultBody,
  Empty, ResultLabel, Chip, RangeBar, CalcFoot, Footnote, ctaInkClass, ctaGhostClass, styles as s,
  type Tone, type Zone,
} from "./_shared";

/**
 * PhenoAge biological-age calculator (Levine et al., 2018).
 *
 * Input: chronological age + 9 blood biomarkers, in US units (albumin g/dL,
 * creatinine mg/dL, glucose mg/dL) or SI units (g/L, µmol/L, mmol/L); hs-CRP
 * in mg/L either way, as labs print it. Everything is converted to the units
 * of Levine 2018, Table 1, before the formula runs.
 *
 * Formula (Levine ME, Aging (Albany NY) 2018;10(4):573-591, Table 1):
 *   xb = -19.9067
 *      + 0.0804 * age
 *      + (-0.0336) * albumin (g/L)
 *      + 0.0095 * creatinine (µmol/L)
 *      + 0.1953 * glucose (mmol/L)
 *      + 0.0954 * ln(CRP, mg/dL)       ← Table 1 gives CRP in mg/dL, so
 *                                         hs-CRP in mg/L is divided by 10
 *      + (-0.0120) * lymphocyte%
 *      + 0.0268 * MCV (fL)
 *      + 0.3306 * RDW (%)
 *      + 0.0019 * ALP (U/L)
 *      + 0.0554 * WBC (1000 cells/µL)
 *
 *   M = 1 - exp(-exp(xb) * (exp(0.0076927 * 120) - 1) / 0.0076927)
 *   PhenoAge = 141.50 + ln(-0.00553 * ln(1 - M)) / 0.09165
 *
 * Check: age 50, albumin 4.2 g/dL, creatinine 1.0 mg/dL, glucose 95 mg/dL,
 * hs-CRP 2.0 mg/L, lymphocytes 28 %, MCV 91, RDW 13.5, ALP 75, WBC 6.5
 * → PhenoAge 49.6. (Taking ln of the mg/L value directly adds
 * 0.0954 × ln 10 to xb, about 2.4 years on every result.)
 *
 * Every value is checked against a plausible range for its unit first: a
 * report in SI units typed into US fields (albumin 42, creatinine 88, glucose
 * 5.3) would otherwise return a confident, meaningless age.
 *
 * Embedded in /blog/biological-age-calculator-blood-test and the standalone
 * /tools/phenoage-calculator page.
 */

type Key = "age" | "alb" | "cr" | "glu" | "crp" | "ly" | "mcv" | "rdw" | "alp" | "wbc";
type System = "us" | "si";

const KEYS: Key[] = ["age", "alb", "cr", "glu", "crp", "ly", "mcv", "rdw", "alp", "wbc"];
const EMPTY: Record<Key, string> = {
  age: "", alb: "", cr: "", glu: "", crp: "", ly: "", mcv: "", rdw: "", alp: "", wbc: "",
};

const LABEL: Record<Key, string> = {
  age: "Chronological age",
  alb: "Albumin",
  cr: "Creatinine",
  glu: "Glucose (fasting)",
  crp: "hs-CRP",
  ly: "Lymphocytes",
  mcv: "MCV",
  rdw: "RDW",
  alp: "Alkaline phosphatase",
  wbc: "WBC",
};

/** Short names for the unit messages. */
const NAME: Record<Key, string> = { ...LABEL, age: "Age", glu: "Glucose" };

const HINT: Record<Key, string> = {
  age: "Age",
  alb: "Liver",
  cr: "Kidney",
  glu: "Metabolism",
  crp: "Inflammation",
  ly: "Immunity",
  mcv: "Hematology",
  rdw: "Hematology",
  alp: "Liver",
  wbc: "Immunity",
};

const UNIT: Record<System, Record<Key, ReactNode>> = {
  us: {
    age: "years", alb: "g/dL", cr: "mg/dL", glu: "mg/dL", crp: "mg/L",
    ly: "%", mcv: "fL", rdw: "%", alp: "U/L", wbc: "K/µL",
  },
  si: {
    age: "years", alb: "g/L", cr: "µmol/L", glu: "mmol/L", crp: "mg/L",
    ly: "%", mcv: "fL", rdw: "%", alp: "U/L", wbc: <>×10<sup>9</sup>/L</>,
  },
};

/* "Use example" fills each field with the value its placeholder shows; the SI
   placeholders are the US example converted (4.5 g/dL = 45 g/L, 0.9 mg/dL ≈ 80
   µmol/L, 90 mg/dL ≈ 5.0 mmol/L), so both give the same PhenoAge. */
const PLACEHOLDER: Record<System, Record<Key, string>> = {
  us: {
    age: "e.g. 35", alb: "e.g. 4.5", cr: "e.g. 0.9", glu: "e.g. 90", crp: "e.g. 0.8",
    ly: "e.g. 30", mcv: "e.g. 90", rdw: "e.g. 13", alp: "e.g. 70", wbc: "e.g. 5.5",
  },
  si: {
    age: "e.g. 35", alb: "e.g. 45", cr: "e.g. 80", glu: "e.g. 5.0", crp: "e.g. 0.8",
    ly: "e.g. 30", mcv: "e.g. 90", rdw: "e.g. 13", alp: "e.g. 70", wbc: "e.g. 5.5",
  },
};

export default function PhenoAgeCalculator() {
  const [values, setValues] = useState<Record<Key, string>>(EMPTY);
  const [system, setSystem] = useState<System>("us");
  const setters = useMemo(
    () =>
      Object.fromEntries(
        KEYS.map((k) => [k, (v: string) => setValues((prev) => (prev[k] === v ? prev : { ...prev, [k]: v }))]),
      ) as Record<Key, (v: string) => void>,
    [],
  );

  const state = useMemo(() => {
    const parsed = {} as Record<Key, number | null>;
    const problems: { key: Key; message: ReactNode }[] = [];
    for (const k of KEYS) {
      const n = num(values[k]);
      parsed[k] = n;
      if (n === null) continue;
      const message = problem(k, n, system);
      if (message) problems.push({ key: k, message });
    }
    if (problems.length) return { kind: "check" as const, problems };
    if (KEYS.some((k) => parsed[k] === null)) return { kind: "empty" as const };
    const v = parsed as Record<Key, number>;

    // To the units of Levine 2018, Table 1
    const albuminGL = system === "us" ? v.alb * 10 : v.alb; // g/dL × 10 = g/L
    const creatinineUmol = system === "us" ? v.cr * 88.4 : v.cr; // mg/dL × 88.4 = µmol/L
    const glucoseMmol = system === "us" ? v.glu * 0.0555 : v.glu; // mg/dL × 0.0555 = mmol/L
    const crpMgDl = Math.max(v.crp, 0.01) / 10; // mg/L ÷ 10 = mg/dL (clamped to avoid ln(0))

    const xb =
      -19.9067 +
      0.0804 * v.age +
      -0.0336 * albuminGL +
      0.0095 * creatinineUmol +
      0.1953 * glucoseMmol +
      0.0954 * Math.log(crpMgDl) +
      -0.012 * v.ly +
      0.0268 * v.mcv +
      0.3306 * v.rdw +
      0.0019 * v.alp +
      0.0554 * v.wbc;

    const mortalityScore =
      1 -
      Math.exp(
        (-Math.exp(xb) * (Math.exp(0.0076927 * 120) - 1)) / 0.0076927,
      );

    const safeM = Math.min(Math.max(mortalityScore, 1e-6), 1 - 1e-6);
    const phenoAge = Math.round((141.5 + Math.log(-0.00553 * Math.log(1 - safeM)) / 0.09165) * 10) / 10;
    // The delta is taken from the PhenoAge as shown, so the two numbers always agree.
    const delta = Math.round((phenoAge - v.age) * 10) / 10;

    return {
      kind: "ok" as const,
      age: v.age,
      phenoAge,
      delta,
      band: getBand(delta),
    };
  }, [values, system]);

  const result = state.kind === "ok" ? state : null;
  const invalid = new Set(state.kind === "check" ? state.problems.map((p) => p.key) : []);

  return (
    <Shell labelledBy="phenoage-calculator-title">
      <CalcHead>
        <Eyebrow>Free interactive tool — Levine 2018 method</Eyebrow>
        <CalcTitle id="phenoage-calculator-title">PhenoAge Biological Age Calculator</CalcTitle>
        <p className={s.intro}>
          Enter the 9 blood biomarkers from your most recent lab panel plus your chronological age, in the units
          printed on your report. The formula is the peer-reviewed PhenoAge method from Levine et al.,{" "}
          <em>Aging</em> (Albany NY), 2018.
        </p>
      </CalcHead>

      <CalcInputs>
        <div>
          <Toggle
            legend="Units on your report"
            options={[
              { key: "us", label: "US units" },
              { key: "si", label: "SI units" },
            ]}
            value={system}
            onChange={(v) => setSystem(v === "si" ? "si" : "us")}
          />
        </div>

        <Fields cols="panel">
          {KEYS.map((k) => (
            <Field
              key={k}
              label={LABEL[k]}
              unit={UNIT[system][k]}
              placeholder={PLACEHOLDER[system][k]}
              value={values[k]}
              onChange={setters[k]}
              inputId={`phenoage-${k}`}
              hint={HINT[k]}
              step="0.01"
              invalid={invalid.has(k)}
              describedBy={`phenoage-check-${k}`}
            />
          ))}
        </Fields>
      </CalcInputs>

      <CalcOutput>
        <ResultPanel active={!!result}>
          {result ? (
            <ResultBody>
              <ResultLabel>
                <span>Your PhenoAge</span> <Chip tone={result.band.tone}>{result.band.name}</Chip>
              </ResultLabel>

              <div className={s.numbers}>
                <div>
                  <div className={s.bigNumber}>
                    {result.phenoAge.toFixed(1)}
                    <span className={s.unit}>yrs</span>
                  </div>
                  <div className={s.caption}>
                    Biological age
                  </div>
                </div>

                <div>
                  <div className={s.midNumber} style={{ color: TONE_INK[result.band.tone] }}>
                    {signed(result.delta)}
                    <span className={s.unit}>yrs</span>
                  </div>
                  <div className={s.caption}>
                    vs chronological
                  </div>
                </div>
              </div>

              <AgeRuler age={result.age} phenoAge={result.phenoAge} tone={result.band.tone} />

              <p aria-hidden className={s.barLabel}>Years vs your age</p>
              <RangeBar min={-10} max={10} value={result.delta} tone={result.band.tone} zones={ZONES} marks={MARKS} />

              <p className={s.resultText}>
                {result.band.description}
              </p>
            </ResultBody>
          ) : state.kind === "check" ? (
            <div className={s.emptyWrap}>
              <p aria-hidden className={s.emptyNum}>
                ––.–
              </p>
              <p className={s.empty}>
                {state.problems.length === 1 ? "One value looks" : "Some values look"} out of range for the units
                selected. Check {state.problems.length === 1 ? "it" : "them"} before PhenoAge is computed:
              </p>
              <ul className={s.checkList}>
                {state.problems.map((p) => (
                  <li key={p.key} id={`phenoage-check-${p.key}`}>
                    {p.message}
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <Empty>
              Fill in all 10 fields to compute your PhenoAge biological age. The values come from a CBC with
              differential, a comprehensive metabolic panel (CMP) and an hs-CRP test.
            </Empty>
          )}
        </ResultPanel>
      </CalcOutput>

      <CalcFoot>
        <Footnote>
          Educational tool, not a medical diagnosis. PhenoAge is validated against
          all-cause mortality in NHANES + UK Biobank cohorts. Most actionable
          markers to lower it: hs-CRP, fasting glucose, albumin (protein status),
          lymphocyte% (immune health). hs-CRP goes in mg/L, as most labs print it
          (a result in mg/dL is multiplied by 10). To follow it over time, retest
          on the same lab and talk any change through with your clinician.
        </Footnote>

        <div className={s.ctaRow}>
          <a href="/early-access" className={ctaInkClass}>
            Track this in Merios <span className={`btn-arrow ${s.arrow}`}>→</span>
          </a>
          <a href="/blog/biological-age-vs-chronological-age" className={ctaGhostClass}>
            What does this mean? <span className={`btn-arrow ${s.arrow}`}>→</span>
          </a>
        </div>
      </CalcFoot>
    </Shell>
  );
}

function num(s: string): number | null {
  const n = parseFloat(s);
  return Number.isFinite(n) && n > 0 ? n : null;
}

/** 4.25 → "4.25", 88 → "88": what the reader typed, without float noise. */
function fmt(x: number, digits = 2): string {
  return String(Number(x.toFixed(digits)));
}

/** Signed delta with a true minus sign: +2.0, −2.8, 0.0. */
function signed(x: number): string {
  const sign = x > 0 ? "+" : x < 0 ? "−" : "";
  return `${sign}${Math.abs(x).toFixed(1)}`;
}

/**
 * A value outside the plausible range for its unit, with what it most likely
 * is instead. Returns null when the value is plausible.
 */
function problem(k: Key, x: number, system: System): ReactNode | null {
  const shown = (
    <strong>
      {NAME[k]} {fmt(x)}
    </strong>
  );
  const outside = (lo: number, hi: number, unit: ReactNode) => (
    <>
      {shown} is outside the range this tool accepts ({lo} to {hi} {unit}). Check the value on your report.
    </>
  );
  const us = system === "us";
  switch (k) {
    case "age":
      return x >= 18 && x <= 110 ? null : (
        <>{shown}: PhenoAge is built for adults, so enter an age from 18 to 110 years.</>
      );
    case "alb":
      if (us) {
        if (x >= 1 && x <= 7) return null;
        if (x > 7 && x <= 70)
          return <>{shown} looks like g/L. Switch to SI units, or enter {fmt(x / 10, 1)} g/dL.</>;
        return outside(1, 7, "g/dL");
      }
      if (x >= 10 && x <= 70) return null;
      if (x >= 1 && x <= 7)
        return <>{shown} looks like g/dL. Switch to US units, or enter {fmt(x * 10, 0)} g/L.</>;
      return outside(10, 70, "g/L");
    case "cr":
      if (us) {
        if (x >= 0.1 && x <= 20) return null;
        if (x > 20 && x <= 2000)
          return <>{shown} looks like µmol/L. Switch to SI units, or enter {fmt(x / 88.4)} mg/dL.</>;
        return outside(0.1, 20, "mg/dL");
      }
      if (x >= 20 && x <= 2000) return null;
      if (x >= 0.1 && x < 20)
        return <>{shown} looks like mg/dL. Switch to US units, or enter {fmt(x * 88.4, 0)} µmol/L.</>;
      return outside(20, 2000, "µmol/L");
    case "glu":
      if (us) {
        if (x >= 20 && x <= 1000) return null;
        if (x >= 1 && x < 20)
          return <>{shown} looks like mmol/L. Switch to SI units, or enter {fmt(x * 18.02, 0)} mg/dL.</>;
        return outside(20, 1000, "mg/dL");
      }
      if (x >= 1 && x <= 55) return null;
      if (x > 55 && x <= 1000)
        return <>{shown} looks like mg/dL. Switch to US units, or enter {fmt(x / 18.02, 1)} mmol/L.</>;
      return outside(1, 55, "mmol/L");
    case "crp":
      return x <= 300 ? null : outside(0.01, 300, "mg/L");
    case "ly":
      if (x >= 5 && x <= 90) return null;
      if (x < 5)
        return (
          <>
            {shown} looks like an absolute count (K/µL or ×10<sup>9</sup>/L). PhenoAge uses the lymphocyte
            percentage from the differential, usually between 20 and 40%.
          </>
        );
      return outside(5, 90, "%");
    case "mcv":
      return x >= 50 && x <= 150 ? null : outside(50, 150, "fL");
    case "rdw":
      if (x >= 8 && x <= 35) return null;
      if (x > 35 && x <= 80)
        return (
          <>
            {shown} looks like RDW-SD, in fL. PhenoAge uses RDW-CV, the percentage, usually between 11.5 and
            15%.
          </>
        );
      return outside(8, 35, "%");
    case "alp":
      if (x >= 10 && x <= 2000) return null;
      if (x < 10)
        return <>{shown} looks like µkat/L. Multiply by 60 for U/L: enter {fmt(x * 60, 0)}.</>;
      return outside(10, 2000, "U/L");
    case "wbc":
      if (x >= 1 && x <= 50) return null;
      if (x > 500 && x <= 50000)
        return <>{shown} looks like cells per µL. Divide by 1,000: enter {fmt(x / 1000, 1)}.</>;
      return outside(1, 50, UNIT[system].wbc);
  }
}

/* Delta color — status text tokens (defined on the card in calculators.module.css). */
const TONE_INK: Record<Tone, string> = {
  ok: "var(--tone-ok)",
  warn: "var(--tone-warn-ink)",
  bad: "var(--tone-bad-ink)",
  neutral: "var(--color-ink)",
};

/* Range bar scale: delta in years (presentation only — mirrors getBand). */
const ZONES: Zone[] = [
  { from: -10, to: -3, tone: "ok" },
  { from: -3, to: 1, tone: "ok" },
  { from: 1, to: 4, tone: "warn" },
  { from: 4, to: 10, tone: "bad" },
];

const MARKS = [
  { at: -10, label: "−10" },
  { at: -3, label: "−3" },
  { at: 1, label: "+1" },
  { at: 4, label: "+4" },
  { at: 10, label: "+10" },
];

/**
 * Age and PhenoAge on one ruler, the gap between them filled (decorative:
 * both numbers are spelled out above it).
 */
function AgeRuler({ age, phenoAge, tone }: { age: number; phenoAge: number; tone: Tone }) {
  const lo = Math.min(age, phenoAge);
  const hi = Math.max(age, phenoAge);
  const min = Math.max(0, Math.floor((lo - 10) / 5) * 5);
  let max = Math.ceil((hi + 10) / 5) * 5;
  if (max - min < 30) max = min + 30;
  const pos = (x: number) => Math.max(0, Math.min(100, ((x - min) / (max - min)) * 100));
  const label = (x: number) => Math.max(8, Math.min(92, x));
  const ageL = pos(age);
  const paL = pos(phenoAge);
  const ageText = String(Math.round(age * 10) / 10);
  return (
    <div aria-hidden>
      <div className={s.ruler}>
        <span
          className={s.rulerGap}
          data-tone={phenoAge <= age ? "ok" : tone}
          style={{ left: `${Math.min(ageL, paL)}%`, width: `${Math.abs(ageL - paL)}%` }}
        />
        <span className={s.rulerDot} data-k="age" style={{ left: `${ageL}%` }} />
        <span className={s.rulerDot} data-k="pa" style={{ left: `${paL}%` }} />
        <span className={s.rulerLabel} data-k="age" style={{ left: `${label(ageL)}%` }}>
          Age {ageText}
        </span>
        <span className={s.rulerLabel} data-k="pa" style={{ left: `${label(paL)}%` }}>
          PhenoAge {phenoAge.toFixed(1)}
        </span>
      </div>
      <div className={s.rulerScale}>
        <span>{min}</span>
        <span>{max} years</span>
      </div>
    </div>
  );
}

function getBand(delta: number): { name: string; tone: Tone; description: string } {
  if (delta <= -3) {
    return {
      name: "Aging slower",
      tone: "ok",
      description:
        "Excellent. Your biological age is meaningfully younger than your chronological age — your lifestyle, sleep, training, and metabolic health are paying off. Keep what you're doing and re-test in 6 months to confirm the trajectory.",
    };
  }
  if (delta < 1) {
    return {
      name: "Aging in step",
      tone: "ok",
      description:
        "On par with your chronological age. If one marker stands out, such as hs-CRP or fasting glucose, it is worth a conversation with your clinician; a retest on the same lab shows whether it holds.",
    };
  }
  if (delta < 4) {
    return {
      name: "Aging faster",
      tone: "warn",
      description:
        "Your biology is ahead of your birthday by a few years. Highest-leverage interventions: lower hs-CRP (sleep + omega-3 + remove ultra-processed foods), tighten fasting glucose, ensure protein intake supports albumin > 4.4 g/dL.",
    };
  }
  return {
    name: "Aging significantly faster",
    tone: "bad",
    description:
      "Your biology is meaningfully ahead of your chronological age on this model. One panel can be pushed up by a recent infection or a lab artifact, so discuss it with your physician and retest on the same lab before reading it as a trend.",
  };
}
