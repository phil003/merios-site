"use client";

import { useState, useMemo } from "react";
import {
  Shell, CalcHead, Eyebrow, CalcTitle, CalcInputs, Fields, Field, Toggle, CalcOutput, ResultPanel,
  ResultBody, Empty, ResultLabel, Chip, RangeBar, CalcFoot, Footnote, Cta, round,
  styles as s, type Tone, type Zone,
} from "./_shared";

/**
 * Bilirubin unit converter — serum total bilirubin, mg/dL ↔ µmol/L.
 *
 * The conversion follows from the molar mass of bilirubin (584.66 g/mol):
 * 1 mg/dL = 10 mg/L ÷ 584.66 g/mol = 17.104 µmol/L, usually rounded to 17.1.
 * Direct (conjugated) and indirect bilirubin use the same factor.
 *
 * Bands are adult reference points, not a diagnosis: MedlinePlus ("Bilirubin
 * blood test") lists total bilirubin 0.1–1.2 mg/dL (1.71–20.5 µmol/L) and
 * direct bilirubin under 0.3 mg/dL (5.1 µmol/L), and notes that about
 * 2.0 mg/dL can cause jaundice. Newborn levels are NOT interpreted here: they
 * are read on hour-specific charts (AAP 2022 guideline).
 */
const FACTOR = 17.104; // µmol/L per mg/dL

type Unit = "mg" | "umol";

const UNIT_LABEL: Record<Unit, string> = { mg: "mg/dL", umol: "µmol/L" };

export default function BilirubinConverter() {
  const [value, setValue] = useState("");
  const [from, setFrom] = useState<Unit>("mg");

  const result = useMemo(() => {
    const v = parseFloat(value.replace(",", "."));
    if (!Number.isFinite(v) || v <= 0) return null;
    const mg = from === "mg" ? v : v / FACTOR;
    const umol = mg * FACTOR;
    const out = from === "mg" ? round(umol, 1) : round(mg, 2);
    return { out, unit: from === "mg" ? "µmol/L" : "mg/dL", mg, umol, band: bandFromMg(mg) };
  }, [value, from]);

  return (
    <Shell labelledBy="bili-title">
      <CalcHead>
        <Eyebrow>Free interactive tool</Eyebrow>
        <CalcTitle id="bili-title">Bilirubin Converter</CalcTitle>
      </CalcHead>

      <CalcInputs>
        <div>
          <Toggle
            legend="Your result is in"
            options={[
              { key: "mg", label: "mg/dL" },
              { key: "umol", label: "µmol/L" },
            ]}
            value={from}
            onChange={(v) => setFrom(v as Unit)}
          />
        </div>

        <Fields cols="1">
          <Field
            label="Total bilirubin"
            unit={UNIT_LABEL[from]}
            placeholder={from === "mg" ? "e.g. 1.2" : "e.g. 20"}
            value={value}
            onChange={setValue}
            inputId="bili-value"
          />
        </Fields>
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
              <RangeBar min={0} max={5} value={result.mg} tone={result.band.tone} zones={ZONES} />
              <p className={s.resultText}>
                That is <strong>{round(result.mg, 2)} mg/dL</strong> or <strong>{round(result.umol, 1)} µmol/L</strong>.
                The factor comes from the weight of the bilirubin molecule: 1 mg/dL is 17.1 µmol/L. Labs that round
                differently may print a result that differs from this one by a decimal.
              </p>
              <p className={s.resultText}>{result.band.description}</p>
            </ResultBody>
          ) : (
            <Empty>
              Enter your total bilirubin in the unit your lab used. US labs report mg/dL; labs in the UK, Europe,
              Australia and much of Asia report µmol/L, so the same level reads 1.2 on one report and 20.5 on another.
            </Empty>
          )}
        </ResultPanel>
      </CalcOutput>

      <CalcFoot>
        <Footnote>
          Educational tool, not a diagnosis. The bands apply to <strong>total bilirubin in adults</strong>. Direct
          (conjugated) and indirect bilirubin convert with the same factor, but they have their own reference ranges.
          This tool does not interpret newborn bilirubin, which is read on charts by age in hours. Reference ranges
          vary by lab; read your result against the range printed on your own report and discuss it with your
          clinician.
        </Footnote>
        <Cta />
      </CalcFoot>
    </Shell>
  );
}

/* Range bar scale in mg/dL (presentation only — mirrors bandFromMg). */
const ZONES: Zone[] = [
  { from: 0, to: 0.1, tone: "warn" },
  { from: 0.1, to: 1.2, tone: "ok" },
  { from: 1.2, to: 3, tone: "warn" },
  { from: 3, to: 5, tone: "bad" },
];

function bandFromMg(mg: number): { name: string; tone: Tone; description: string } {
  if (mg < 0.1) return {
    name: "below the usual range", tone: "warn",
    description:
      "Below 0.1 mg/dL (about 1.7 µmol/L) is under the lower limit that MedlinePlus lists for adult total bilirubin. A low result is unusual and rarely a concern on its own; it can reflect the assay or medication, and it is usually read alongside the rest of the panel.",
  };
  if (mg <= 1.2) return {
    name: "within the usual adult range", tone: "ok",
    description:
      "0.1 to 1.2 mg/dL (about 1.7 to 20.5 µmol/L) is the usual adult range for total bilirubin listed by MedlinePlus. Exact limits vary slightly between labs, so check the range printed on your own report.",
  };
  if (mg < 3) return {
    name: "mildly above the range", tone: "warn",
    description:
      "1.2 to 3 mg/dL (about 20.5 to 51 µmol/L) is mildly above the usual adult range. A mild, mostly indirect rise is often seen with Gilbert syndrome, a common, generally mild inherited trait, and it can also follow fasting, dehydration or illness. MedlinePlus notes that a level of about 2 mg/dL (34 µmol/L) can cause jaundice. Worth reviewing with your clinician, together with ALT, AST and ALP.",
  };
  return {
    name: "well above the range", tone: "bad",
    description:
      "3 mg/dL (about 51 µmol/L) and above is well beyond the usual adult range, and at this level yellowing of the eyes or skin (jaundice) can be visible. Higher bilirubin can be associated with liver, bile duct or red blood cell conditions, and it needs a clinician to work out which. Review this result with your clinician promptly rather than acting on it alone.",
  };
}
