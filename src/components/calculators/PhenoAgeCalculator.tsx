"use client";

import { useState, useMemo } from "react";
import {
  Shell, CalcHead, Eyebrow, CalcTitle, CalcInputs, Fields, Field, CalcOutput, ResultPanel, ResultBody,
  Empty, ResultLabel, Chip, RangeBar, CalcFoot, Footnote, ctaInkClass, ctaGhostClass, styles as s,
  type Tone, type Zone,
} from "./_shared";

/**
 * PhenoAge biological-age calculator (Levine et al., 2018).
 *
 * Input: 9 blood biomarkers + chronological age (US units, since US lab
 * reports ship in US units by default — we convert internally to SI for the
 * formula).
 *
 * Formula (Levine ME, Aging (Albany NY) 2018):
 *   xb = -19.9067
 *      + 0.0804 * age
 *      + (-0.0336) * albumin (g/L)
 *      + 0.0095 * creatinine (µmol/L)
 *      + 0.1953 * glucose (mmol/L)
 *      + 0.0954 * ln(CRP, mg/L)
 *      + (-0.0120) * lymphocyte%
 *      + 0.0268 * MCV (fL)
 *      + 0.3306 * RDW (%)
 *      + 0.0019 * ALP (U/L)
 *      + 0.0554 * WBC (1000 cells/µL)
 *
 *   M = 1 - exp(-exp(xb) * (exp(0.0076927 * 120) - 1) / 0.0076927)
 *   PhenoAge = 141.50 + ln(-0.00553 * ln(1 - M)) / 0.09165
 *
 * Result is years; subtract chronological age to get pace-of-aging delta.
 *
 * Embedded in /blog/biological-age-calculator-blood-test and
 * /blog/biological-age-complete-guide. Strongest backlink-magnet content
 * we ship: calculators with peer-reviewed formulas earn .edu and clinical
 * citations naturally.
 */
export default function PhenoAgeCalculator() {
  const [age, setAge] = useState<string>("");
  const [albumin, setAlbumin] = useState<string>("");
  const [creatinine, setCreatinine] = useState<string>("");
  const [glucose, setGlucose] = useState<string>("");
  const [crp, setCrp] = useState<string>("");
  const [lympho, setLympho] = useState<string>("");
  const [mcv, setMcv] = useState<string>("");
  const [rdw, setRdw] = useState<string>("");
  const [alp, setAlp] = useState<string>("");
  const [wbc, setWbc] = useState<string>("");

  const result = useMemo(() => {
    const a = num(age);
    const alb = num(albumin);
    const cr = num(creatinine);
    const glu = num(glucose);
    const cr_p = num(crp);
    const ly = num(lympho);
    const m = num(mcv);
    const rd = num(rdw);
    const al = num(alp);
    const wb = num(wbc);

    if (
      a === null ||
      alb === null ||
      cr === null ||
      glu === null ||
      cr_p === null ||
      ly === null ||
      m === null ||
      rd === null ||
      al === null ||
      wb === null
    ) {
      return null;
    }

    // US → SI conversions
    const albuminSi = alb * 10; // g/dL × 10 = g/L
    const creatinineSi = cr * 88.4; // mg/dL × 88.4 = µmol/L
    const glucoseSi = glu * 0.0555; // mg/dL × 0.0555 = mmol/L
    const crpSi = Math.max(cr_p, 0.01); // mg/L direct (clamp to avoid ln(0))

    const xb =
      -19.9067 +
      0.0804 * a +
      -0.0336 * albuminSi +
      0.0095 * creatinineSi +
      0.1953 * glucoseSi +
      0.0954 * Math.log(crpSi) +
      -0.012 * ly +
      0.0268 * m +
      0.3306 * rd +
      0.0019 * al +
      0.0554 * wb;

    const mortalityScore =
      1 -
      Math.exp(
        (-Math.exp(xb) * (Math.exp(0.0076927 * 120) - 1)) / 0.0076927,
      );

    const safeM = Math.min(Math.max(mortalityScore, 1e-6), 1 - 1e-6);
    const phenoAge =
      141.5 + Math.log(-0.00553 * Math.log(1 - safeM)) / 0.09165;

    const delta = phenoAge - a;

    return {
      phenoAge: Math.round(phenoAge * 10) / 10,
      delta: Math.round(delta * 10) / 10,
      band: getBand(delta),
    };
  }, [age, albumin, creatinine, glucose, crp, lympho, mcv, rdw, alp, wbc]);

  return (
    <Shell labelledBy="phenoage-calculator-title" layout="stack">
      <CalcHead>
        <Eyebrow>Free interactive tool — Levine 2018 method</Eyebrow>
        <CalcTitle id="phenoage-calculator-title">PhenoAge Biological Age Calculator</CalcTitle>
        <p className={s.intro}>
          Enter the 9 blood biomarkers from your most recent lab panel (US units)
          plus your chronological age. The formula is the peer-reviewed PhenoAge
          method from Levine et al., <em>Aging</em> (Albany NY), 2018.
        </p>
      </CalcHead>

      <CalcInputs>
        <Fields cols="panel">
          <Field label="Chronological age" unit="years" placeholder="e.g. 35" value={age} onChange={setAge} inputId="phenoage-age" step="0.01" />
          <Field label="Albumin" unit="g/dL" placeholder="e.g. 4.5" value={albumin} onChange={setAlbumin} inputId="phenoage-alb" step="0.01" />
          <Field label="Creatinine" unit="mg/dL" placeholder="e.g. 0.9" value={creatinine} onChange={setCreatinine} inputId="phenoage-cr" step="0.01" />
          <Field label="Glucose (fasting)" unit="mg/dL" placeholder="e.g. 90" value={glucose} onChange={setGlucose} inputId="phenoage-glu" step="0.01" />
          <Field label="hs-CRP" unit="mg/L" placeholder="e.g. 0.8" value={crp} onChange={setCrp} inputId="phenoage-crp" step="0.01" />
          <Field label="Lymphocytes" unit="%" placeholder="e.g. 30" value={lympho} onChange={setLympho} inputId="phenoage-ly" step="0.01" />
          <Field label="MCV" unit="fL" placeholder="e.g. 90" value={mcv} onChange={setMcv} inputId="phenoage-mcv" step="0.01" />
          <Field label="RDW" unit="%" placeholder="e.g. 13" value={rdw} onChange={setRdw} inputId="phenoage-rdw" step="0.01" />
          <Field label="Alkaline phosphatase" unit="U/L" placeholder="e.g. 70" value={alp} onChange={setAlp} inputId="phenoage-alp" step="0.01" />
          <Field label="WBC" unit="K/µL" placeholder="e.g. 5.5" value={wbc} onChange={setWbc} inputId="phenoage-wbc" step="0.01" />
        </Fields>
      </CalcInputs>

      <CalcOutput>
        <ResultPanel active={!!result}>
          {result ? (
            <ResultBody>
              <ResultLabel>
                <span>Your PhenoAge</span> — <Chip tone={result.band.tone}>{result.band.name}</Chip>
              </ResultLabel>

              <div className={s.numbers}>
                <div>
                  <div className={s.bigNumber}>
                    {result.phenoAge}
                    <span className={s.unit}>yrs</span>
                  </div>
                  <div className={s.caption}>
                    Biological age
                  </div>
                </div>

                <div>
                  <div className={s.midNumber} style={{ color: TONE_INK[result.band.tone] }}>
                    {result.delta > 0 ? "+" : ""}{result.delta}
                    <span className={s.unit}>yrs</span>
                  </div>
                  <div className={s.caption}>
                    vs chronological
                  </div>
                </div>
              </div>

              <RangeBar min={-10} max={10} value={result.delta} tone={result.band.tone} zones={ZONES} />

              <p className={s.resultText}>
                {result.band.description}
              </p>
            </ResultBody>
          ) : (
            <Empty>
              Fill in all 10 fields above to compute your PhenoAge biological age. All values come from a standard
              comprehensive blood panel (CBC + CMP + lipids + hs-CRP).
            </Empty>
          )}
        </ResultPanel>
      </CalcOutput>

      <CalcFoot>
        <Footnote>
          Educational tool, not a medical diagnosis. PhenoAge is validated against
          all-cause mortality in NHANES + UK Biobank cohorts. Most actionable
          markers to lower it: hs-CRP, fasting glucose, albumin (protein status),
          lymphocyte% (immune health). Improvement of 0.5–2 years over 6 months
          is realistic with consistent lifestyle change.
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

/* Delta colour — status text tokens (defined on the card in calculators.module.css). */
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
        "On par with your chronological age. Targeted improvements (better sleep, lower hs-CRP, fasting glucose < 90) typically pull this 1–3 years younger over 6 months.",
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
      "Your biology is meaningfully ahead of your chronological age. This is reversible — most intervention studies show 2–6 years of biological-age reduction within 8–12 months when the worst markers are systematically improved. Discuss this with your physician.",
  };
}
