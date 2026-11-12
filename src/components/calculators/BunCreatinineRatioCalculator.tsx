"use client";

import { useState, useMemo } from "react";
import {
  Shell, CalcHead, Eyebrow, CalcTitle, CalcInputs, Fields, Field, Toggle, CalcOutput, ResultPanel,
  ResultBody, Empty, ResultLabel, Chip, RangeBar, Refs, RefRow, CalcFoot, Footnote, Cta, round,
  styles as s, type Tone, type Zone,
} from "./_shared";

/**
 * BUN/creatinine ratio calculator.
 *
 *   ratio = BUN (mg/dL) / creatinine (mg/dL)
 *   SI input:  BUN mg/dL        = urea (mmol/L) × 2.8   (28 mg of nitrogen per mmol of urea)
 *              creatinine mg/dL = creatinine (µmol/L) ÷ 88.4
 *
 * The usual band, about 10:1 to 20:1, is a convention rather than a single
 * agreed standard and varies between laboratories. Causes of a high or low
 * ratio follow Hosten, "BUN and Creatinine", in Clinical Methods, 3rd ed.
 * (NCBI Bookshelf NBK305).
 */
export default function BunCreatinineRatioCalculator() {
  const [bun, setBun] = useState("");
  const [cr, setCr] = useState("");
  const [unit, setUnit] = useState<"us" | "si">("us");

  const result = useMemo(() => {
    const b = parseFloat(bun);
    const c = parseFloat(cr);
    if (!Number.isFinite(b) || !Number.isFinite(c) || b <= 0 || c <= 0) return null;
    const bunMg = unit === "si" ? b * 2.8 : b;
    const crMg = unit === "si" ? c / 88.4 : c;
    const ratio = bunMg / crMg;
    return { ratio: round(ratio, 1), bunMg: round(bunMg, 1), crMg: round(crMg, 2), band: band(ratio) };
  }, [bun, cr, unit]);

  return (
    <Shell labelledBy="bcr-title">
      <CalcHead>
        <Eyebrow>Free interactive tool</Eyebrow>
        <CalcTitle id="bcr-title">BUN/creatinine ratio from your metabolic panel</CalcTitle>
      </CalcHead>

      <CalcInputs>
        <div>
          <Toggle
            legend="Units on your report"
            options={[
              { key: "us", label: "US (mg/dL)" },
              { key: "si", label: "SI (mmol/L, µmol/L)" },
            ]}
            value={unit}
            onChange={(v) => { setUnit(v as "us" | "si"); setBun(""); setCr(""); }}
          />
        </div>

        <Fields>
          <Field
            label={unit === "us" ? "BUN (urea nitrogen)" : "Urea"}
            unit={unit === "us" ? "mg/dL" : "mmol/L"}
            placeholder={unit === "us" ? "e.g. 15" : "e.g. 5.4"}
            value={bun}
            onChange={setBun}
            inputId="bcr-bun"
          />
          <Field
            label="Creatinine"
            unit={unit === "us" ? "mg/dL" : "µmol/L"}
            placeholder={unit === "us" ? "e.g. 0.9" : "e.g. 80"}
            value={cr}
            onChange={setCr}
            inputId="bcr-cr"
            step={unit === "us" ? "0.01" : "1"}
          />
        </Fields>
      </CalcInputs>

      <CalcOutput>
        <ResultPanel active={!!result}>
          {result ? (
            <ResultBody>
              <ResultLabel>
                <span>BUN/creatinine ratio</span> — <Chip tone={result.band.tone}>{result.band.name}</Chip>
              </ResultLabel>
              <div className={s.bigNumber}>{result.ratio}<span className={s.unitTight}>:1</span></div>
              {unit === "si" && (
                <div className={s.monoLine}>
                  BUN {result.bunMg} mg/dL · creatinine {result.crMg} mg/dL
                </div>
              )}
              <RangeBar min={0} max={40} value={result.ratio} tone={result.band.tone} zones={ZONES} />
              <p className={s.resultText}>{result.band.description}</p>
            </ResultBody>
          ) : (
            <Empty>
              Enter BUN and creatinine exactly as your report prints them. If your lab reports urea in mmol/L and
              creatinine in µmol/L, switch to SI and the tool converts both before dividing.
            </Empty>
          )}
        </ResultPanel>

        <Refs>
          <RefRow label="Low ratio" range="under 10:1" tone="warn" />
          <RefRow label="Usual band (lab-dependent)" range="10:1–20:1" tone="ok" />
          <RefRow label="High ratio" range="above 20:1" tone="warn" />
        </Refs>
      </CalcOutput>

      <CalcFoot>
        <Footnote>
          Educational tool, not a diagnosis. The ratio only adds information when BUN, creatinine or both are outside
          their own ranges; with two normal values, an unusual ratio is rarely meaningful. It is not a measure of
          kidney function itself, and eGFR is the number clinicians use for that. The 10:1 to 20:1 band is a common
          convention, and laboratories differ. Compare against the ranges printed on your report.
        </Footnote>
        <Cta />
      </CalcFoot>
    </Shell>
  );
}

/* Range bar scale (presentation only — mirrors the bands in band()). */
const ZONES: Zone[] = [
  { from: 0, to: 10, tone: "warn" },
  { from: 10, to: 20, tone: "ok" },
  { from: 20, to: 40, tone: "warn" },
];

function band(r: number): { name: string; tone: Tone; description: string } {
  if (r < 10) return {
    name: "Low", tone: "warn",
    description:
      "Below the usual band. A low ratio is associated with low protein intake, reduced urea production in advanced liver disease, and higher creatinine production, as with a large muscle mass or muscle breakdown (rhabdomyolysis). With BUN and creatinine both inside their ranges, a low ratio on its own is usually not significant.",
  };
  if (r <= 20) return {
    name: "Within usual band", tone: "ok",
    description:
      "Within the band most references use. This says nothing about kidney function by itself: two raised values can still give a ratio in this band, so read it next to creatinine and eGFR rather than in place of them.",
  };
  return {
    name: "High", tone: "warn",
    description:
      "Above the usual band. A high ratio is classically associated with reduced blood flow to the kidneys, as in dehydration or heart failure, and also with a high-protein diet, bleeding in the upper digestive tract, catabolic states such as fever or infection, and corticosteroids. With a normal creatinine it often reflects hydration or diet; with a raised creatinine it is worth discussing with your clinician.",
  };
}
