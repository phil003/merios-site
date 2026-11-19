"use client";

import { useState, useMemo } from "react";
import {
  Shell, CalcHead, Eyebrow, CalcTitle, CalcInputs, Fields, Field, Toggle, CalcOutput, ResultPanel,
  ResultBody, Empty, ResultLabel, Chip, RangeBar, CalcFoot, Footnote, Cta, round,
  styles as s, type Tone, type Zone,
} from "./_shared";

/**
 * Creatinine unit converter — serum creatinine, mg/dL ↔ µmol/L (and mmol/L).
 *
 * The conversion follows from the molar mass of creatinine (113.12 g/mol):
 * 1 mg/dL = 10 mg/L ÷ 113.12 g/mol = 88.4 µmol/L = 0.0884 mmol/L.
 * Labcorp's SI conversion table uses the same factor (88.4, inverse 0.0113).
 *
 * Bands are the adult reference intervals printed by Mayo Clinic
 * (mayoclinic.org, creatinine test): 0.74–1.35 mg/dL for men and
 * 0.59–1.04 mg/dL for women. They are not diagnostic cut-offs; kidney
 * function is judged on eGFR, computed by the lab, not on creatinine alone.
 */
const FACTOR = 88.4; // µmol/L per mg/dL

type Unit = "mg" | "umol" | "mmol";
type Sex = "f" | "m";

const UNIT_LABEL: Record<Unit, string> = { mg: "mg/dL", umol: "µmol/L", mmol: "mmol/L" };

const RANGE: Record<Sex, { lo: number; hi: number; label: string }> = {
  f: { lo: 0.59, hi: 1.04, label: "women" },
  m: { lo: 0.74, hi: 1.35, label: "men" },
};

export default function CreatinineConverter() {
  const [value, setValue] = useState("");
  const [from, setFrom] = useState<Unit>("umol");
  const [sex, setSex] = useState<Sex>("f");

  const result = useMemo(() => {
    const v = parseFloat(value.replace(",", "."));
    if (!Number.isFinite(v) || v <= 0) return null;
    const mg = from === "mg" ? v : from === "umol" ? v / FACTOR : (v * 1000) / FACTOR;
    const umol = mg * FACTOR;
    const mmol = umol / 1000;
    const out = from === "mg" ? round(umol, 0) : round(mg, 2);
    return { out, unit: from === "mg" ? "µmol/L" : "mg/dL", mg, umol, mmol, band: band(mg, sex) };
  }, [value, from, sex]);

  const r = RANGE[sex];
  const zones: Zone[] = [
    { from: 0, to: r.lo, tone: "warn" },
    { from: r.lo, to: r.hi, tone: "ok" },
    { from: r.hi, to: 3, tone: "warn" },
  ];

  return (
    <Shell labelledBy="cr-title">
      <CalcHead>
        <Eyebrow>Free interactive tool</Eyebrow>
        <CalcTitle id="cr-title">Creatinine Converter</CalcTitle>
      </CalcHead>

      <CalcInputs>
        <div>
          <Toggle
            legend="Your result is in"
            options={[
              { key: "umol", label: "µmol/L" },
              { key: "mg", label: "mg/dL" },
              { key: "mmol", label: "mmol/L" },
            ]}
            value={from}
            onChange={(v) => setFrom(v as Unit)}
          />
        </div>

        <Fields cols="1">
          <Field
            label="Serum creatinine"
            unit={UNIT_LABEL[from]}
            placeholder={from === "mg" ? "e.g. 0.9" : from === "umol" ? "e.g. 80" : "e.g. 0.08"}
            value={value}
            onChange={setValue}
            inputId="cr-value"
            step={from === "umol" ? "1" : from === "mg" ? "0.01" : "0.001"}
          />
        </Fields>

        <div>
          <Toggle
            legend="Compare with the adult range for"
            options={[
              { key: "f", label: "Women" },
              { key: "m", label: "Men" },
            ]}
            value={sex}
            onChange={(v) => setSex(v as Sex)}
          />
        </div>
      </CalcInputs>

      <CalcOutput>
        <ResultPanel active={!!result}>
          {result ? (
            <ResultBody>
              <ResultLabel>
                <span>Same result in {result.unit}</span> — <Chip tone={result.band.tone}>{result.band.name}</Chip>
              </ResultLabel>
              <div className={s.bigNumber}>
                {result.out} <span className={s.unit}>{result.unit}</span>
              </div>
              <RangeBar min={0} max={3} value={result.mg} tone={result.band.tone} zones={zones} />
              <p className={s.resultText}>
                That is <strong>{round(result.mg, 2)} mg/dL</strong>, <strong>{round(result.umol, 0)} µmol/L</strong>{" "}
                or <strong>{round(result.mmol, 3)} mmol/L</strong>. The factor comes from the weight of the creatinine
                molecule (113.12 g/mol): 1 mg/dL is 88.4 µmol/L, so divide µmol/L by 88.4 to get mg/dL.
              </p>
              <p className={s.resultText}>{result.band.description}</p>
            </ResultBody>
          ) : (
            <Empty>
              Enter your creatinine in the unit your lab used. US labs report mg/dL; labs in the UK, Europe, Canada,
              Australia and much of Asia report µmol/L, so the same level reads 0.9 on one report and 80 on another.
            </Empty>
          )}
        </ResultPanel>
      </CalcOutput>

      <CalcFoot>
        <Footnote>
          Educational tool, not a diagnosis. It converts <strong>serum or plasma creatinine</strong>, not urine
          creatinine or eGFR. Ranges shown are the adult intervals published by Mayo Clinic; your lab&apos;s range may
          differ by method, age and muscle mass. Kidney function is judged on eGFR, which your lab calculates, not on
          creatinine alone. Discuss any result outside your lab&apos;s range with your clinician.
        </Footnote>
        <Cta />
      </CalcFoot>
    </Shell>
  );
}

function band(mg: number, sex: Sex): { name: string; tone: Tone; description: string } {
  const r = RANGE[sex];
  const lo = `${r.lo} mg/dL (${Math.round(r.lo * FACTOR)} µmol/L)`;
  const hi = `${r.hi} mg/dL (${Math.round(r.hi * FACTOR)} µmol/L)`;
  if (mg < r.lo) return {
    name: `below the range for ${r.label}`, tone: "warn",
    description:
      `Below ${lo}, the lower limit Mayo Clinic gives for adult ${r.label}. Low creatinine usually reflects less muscle mass, and it is common in smaller, older or less muscular people. MedlinePlus also lists muscle-wasting conditions and malnutrition as causes. On its own it is rarely a concern; mention it to your clinician if it is new.`,
  };
  if (mg <= r.hi) return {
    name: `within the range for ${r.label}`, tone: "ok",
    description:
      `Between ${lo} and ${hi}, the adult range Mayo Clinic gives for ${r.label}. A result in range is reassuring, but creatinine can stay in range while kidney function drifts, so the eGFR your lab prints next to it, and the trend across tests, say more than one number.`,
  };
  return {
    name: `above the range for ${r.label}`, tone: "warn",
    description:
      `Above ${hi}, the upper limit Mayo Clinic gives for adult ${r.label}. A raised creatinine may reflect reduced kidney filtering, but it is also associated with a large muscle mass, creatine supplements, a cooked-meat meal or a hard workout before the draw, and dehydration. Check the eGFR on your report and talk to your clinician, especially if it is higher than your previous results.`,
  };
}
