"use client";

import { useState, useMemo } from "react";
import {
  Shell, CalcHead, Eyebrow, CalcTitle, CalcInputs, Fields, Field, Toggle, CalcOutput, ResultPanel,
  ResultBody, Empty, ResultLabel, Chip, Refs, RefRow, CalcFoot, Footnote, Cta, round,
  styles as s,
} from "./_shared";

/**
 * Universal mmol/L (or µmol/L) ↔ mg/dL converter for the common chemistry
 * markers.
 *
 * There is no single factor: each one comes from the molar mass of the
 * molecule being measured, so it is different for every analyte.
 *
 *   factor (mg/dL per mmol/L) = molar mass (g/mol) ÷ 10
 *
 *  - glucose        180.16 g/mol   → 1 mmol/L = 18.02 mg/dL  (SI 0.05551)
 *  - cholesterol    386.65 g/mol   → 1 mmol/L = 38.67 mg/dL  (SI 0.02586)
 *                   (total, LDL, HDL and non-HDL all share it)
 *  - triglycerides  ~885.7 g/mol   → 1 mmol/L = 88.57 mg/dL  (SI 0.01129;
 *                   expressed as triolein, a conventional average)
 *  - urea → BUN     2 N × 14.007   → urea 1 mmol/L = BUN 2.801 mg/dL (SI 0.357)
 *  - calcium        40.078 g/mol   → 1 mmol/L = 4.008 mg/dL  (SI 0.2495, usually 0.25)
 *  - uric acid      168.11 g/mol   → 1 mg/dL = 59.48 µmol/L
 *  - creatinine     113.12 g/mol   → 1 mg/dL = 88.40 µmol/L
 *  - bilirubin      584.66 g/mol   → 1 mg/dL = 17.10 µmol/L  (17.104)
 *
 * Factors match the SI conversion tables in common clinical use (MSD Manual
 * SI conversion calculator; Laposata, SI Unit Conversion Guide, NEJM Books
 * 1992). Calculations use the unrounded molar-mass factor; the 4-significant-
 * figure value is what is displayed.
 */

type Key = "glu" | "chol" | "tg" | "bun" | "ca" | "ua" | "cr" | "bili";

type Analyte = {
  short: string;
  label: string;
  si: string; // SI unit
  conv: string; // conventional unit
  /** mg/dL per one SI unit (for µmol/L analytes this is a small number) */
  mgPerSi: number;
  /** how the factor is written for readers */
  rule: string;
  siDecimals: number;
  mgDecimals: number;
  example: { si: string; mg: string };
  /** plausible human range in mg/dL; outside it we suggest re-checking the unit */
  plausible: [number, number];
  note: string;
};

const ANALYTES: Record<Key, Analyte> = {
  glu: {
    short: "Glucose", label: "Glucose", si: "mmol/L", conv: "mg/dL", mgPerSi: 18.016,
    rule: "mg/dL = mmol/L × 18.02", siDecimals: 1, mgDecimals: 0,
    example: { si: "e.g. 5.6", mg: "e.g. 100" }, plausible: [20, 1000],
    note: "Glucose weighs 180.16 g/mol, so one millimole per litre is 18.02 milligrams per deciliter. Many references round to 18.",
  },
  chol: {
    short: "Cholesterol", label: "Cholesterol (total, LDL, HDL, non-HDL)", si: "mmol/L", conv: "mg/dL", mgPerSi: 38.67,
    rule: "mg/dL = mmol/L × 38.67", siDecimals: 2, mgDecimals: 0,
    example: { si: "e.g. 5.2", mg: "e.g. 200" }, plausible: [10, 1000],
    note: "Every cholesterol fraction carries the same molecule, cholesterol at 386.65 g/mol, so total, LDL, HDL and non-HDL cholesterol all use 38.67.",
  },
  tg: {
    short: "Triglycerides", label: "Triglycerides", si: "mmol/L", conv: "mg/dL", mgPerSi: 88.57,
    rule: "mg/dL = mmol/L × 88.57", siDecimals: 2, mgDecimals: 0,
    example: { si: "e.g. 1.7", mg: "e.g. 150" }, plausible: [10, 5000],
    note: "A triglyceride molecule is more than twice as heavy as cholesterol, so its factor is 88.57, not 38.67. Using the cholesterol factor here is the most common conversion error.",
  },
  bun: {
    short: "Urea / BUN", label: "Urea (mmol/L) and BUN (mg/dL)", si: "mmol/L urea", conv: "mg/dL BUN", mgPerSi: 2.8014,
    rule: "BUN mg/dL = urea mmol/L × 2.801", siDecimals: 1, mgDecimals: 1,
    example: { si: "e.g. 5.0", mg: "e.g. 14" }, plausible: [1, 250],
    note: "US labs report blood urea nitrogen, the weight of the two nitrogen atoms in each urea molecule (2 × 14.007 g/mol). Most other countries report urea itself in mmol/L. Urea in mg/dL, a third convention, is urea mmol/L × 6.006.",
  },
  ca: {
    short: "Calcium", label: "Calcium (total)", si: "mmol/L", conv: "mg/dL", mgPerSi: 4.0078,
    rule: "mg/dL = mmol/L × 4.008", siDecimals: 2, mgDecimals: 1,
    example: { si: "e.g. 2.35", mg: "e.g. 9.4" }, plausible: [3, 20],
    note: "Calcium is a single atom of 40.078 g/mol, so 1 mmol/L is 4.008 mg/dL. Many tables round the reverse factor to 0.25.",
  },
  ua: {
    short: "Uric acid", label: "Uric acid", si: "µmol/L", conv: "mg/dL", mgPerSi: 1 / 59.48,
    rule: "mg/dL = µmol/L ÷ 59.48", siDecimals: 0, mgDecimals: 2,
    example: { si: "e.g. 360", mg: "e.g. 6.0" }, plausible: [0.5, 20],
    note: "Uric acid (168.11 g/mol) is reported in micromoles, not millimoles, outside the US: 1 mg/dL is 59.48 µmol/L. Some labs round to 59.5 or 60.",
  },
  cr: {
    short: "Creatinine", label: "Creatinine", si: "µmol/L", conv: "mg/dL", mgPerSi: 1 / 88.4,
    rule: "mg/dL = µmol/L ÷ 88.4", siDecimals: 0, mgDecimals: 2,
    example: { si: "e.g. 88", mg: "e.g. 1.0" }, plausible: [0.1, 25],
    note: "Creatinine (113.12 g/mol) is reported in micromoles per litre outside the US: 1 mg/dL is 88.4 µmol/L.",
  },
  bili: {
    short: "Bilirubin", label: "Bilirubin (total or direct)", si: "µmol/L", conv: "mg/dL", mgPerSi: 1 / 17.104,
    rule: "mg/dL = µmol/L ÷ 17.10", siDecimals: 0, mgDecimals: 2,
    example: { si: "e.g. 17", mg: "e.g. 1.0" }, plausible: [0.05, 50],
    note: "Bilirubin is a large molecule (584.66 g/mol): 1 mg/dL is 17.10 µmol/L. Total, direct and indirect bilirubin share the factor.",
  },
};

const ORDER: Key[] = ["glu", "chol", "tg", "bun", "ca", "ua", "cr", "bili"];

export default function MmolMgdlConverter() {
  const [key, setKey] = useState<Key>("glu");
  const [value, setValue] = useState("");
  const [from, setFrom] = useState<"si" | "mg">("si");
  const a = ANALYTES[key];

  const result = useMemo(() => {
    const v = parseFloat(value);
    if (!Number.isFinite(v) || v <= 0) return null;
    const mg = from === "si" ? v * a.mgPerSi : v;
    const out = from === "si" ? round(mg, a.mgDecimals) : round(v / a.mgPerSi, a.siDecimals);
    const unit = from === "si" ? a.conv : a.si;
    const implausible = mg < a.plausible[0] || mg > a.plausible[1];
    return { out, unit, implausible };
  }, [value, from, a]);

  return (
    <Shell labelledBy="mmol-title">
      <CalcHead>
        <Eyebrow>Free interactive tool</Eyebrow>
        <CalcTitle id="mmol-title">Convert mmol/L and mg/dL by marker</CalcTitle>
      </CalcHead>

      <CalcInputs>
        <div>
          <Toggle
            legend="Marker"
            options={ORDER.map((k) => ({ key: k, label: ANALYTES[k].short }))}
            value={key}
            onChange={(v) => { setKey(v as Key); setValue(""); }}
          />
        </div>
        <div>
          <Toggle
            legend="Convert"
            options={[
              { key: "si", label: `${a.si} → ${a.conv}` },
              { key: "mg", label: `${a.conv} → ${a.si}` },
            ]}
            value={from}
            onChange={(v) => setFrom(v as typeof from)}
          />
        </div>

        <Fields cols="1">
          <Field
            label={a.label}
            unit={from === "si" ? a.si : a.conv}
            placeholder={from === "si" ? a.example.si : a.example.mg}
            value={value}
            onChange={setValue}
            inputId="mmol-value"
            step="0.01"
          />
        </Fields>
      </CalcInputs>

      <CalcOutput>
        <ResultPanel active={!!result}>
          {result ? (
            <ResultBody>
              <ResultLabel>
                <span>{a.short} in {result.unit}</span> — <Chip tone={result.implausible ? "warn" : "neutral"}>{result.implausible ? "check the unit" : "converted"}</Chip>
              </ResultLabel>
              <div className={s.bigNumber}>
                {result.out} <span className={s.unit}>{result.unit}</span>
              </div>
              <div className={s.monoLine}>{a.rule}</div>
              <p className={s.resultText}>{a.note}</p>
              {result.implausible && (
                <p className={s.resultText}>
                  <strong>That converted value is outside the range normally seen in blood.</strong> The most likely
                  explanation is that the number was entered in the other unit, or under a different marker. Check the
                  unit printed next to the result on your report.
                </p>
              )}
            </ResultBody>
          ) : (
            <Empty>
              Pick the marker first, then the direction. Each marker has its own factor, set by the weight of its
              molecule, so a glucose factor applied to cholesterol or triglycerides gives a wrong answer.
            </Empty>
          )}
        </ResultPanel>

        <Refs>
          <RefRow label="Glucose" range="× 18.02" tone="neutral" />
          <RefRow label="Cholesterol (TC, LDL, HDL)" range="× 38.67" tone="neutral" />
          <RefRow label="Triglycerides" range="× 88.57" tone="neutral" />
          <RefRow label="Urea to BUN" range="× 2.801" tone="neutral" />
          <RefRow label="Calcium" range="× 4.008" tone="neutral" />
        </Refs>
      </CalcOutput>

      <CalcFoot>
        <Footnote>
          Educational tool, not a diagnosis. Factors are derived from molar mass and shown to four significant figures;
          labs sometimes round them (18 for glucose, 0.25 for calcium, 60 for uric acid), so your report may differ in
          the last digit. Converting a value does not convert its reference range: always read a result against the
          range your own laboratory printed. Some markers, such as Lp(a), have no exact mass-to-molar conversion.
        </Footnote>
        <Cta />
      </CalcFoot>
    </Shell>
  );
}
