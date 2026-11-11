"use client";

import { useState, useMemo } from "react";
import {
  Shell, CalcHead, Eyebrow, CalcTitle, CalcInputs, Fields, Field, Toggle, CalcOutput, ResultPanel,
  ResultBody, Empty, ResultLabel, Chip, RangeBar, Refs, RefRow, CalcFoot, Footnote, Cta, round,
  styles as s, type Tone, type Zone,
} from "./_shared";

/**
 * Non-HDL cholesterol calculator.
 *
 *   non-HDL-C = total cholesterol − HDL cholesterol      (same unit for both)
 *   1 mmol/L = 38.67 mg/dL (molar mass of cholesterol, 386.65 g/mol)
 *
 * Bands: National Lipid Association, Recommendations for Patient-Centered
 * Management of Dyslipidemia, Part 1 (Jacobson et al., J Clin Lipidol 2014;
 * 8:473–488), Table 1: under 130 desirable, 130–159 above desirable, 160–189
 * borderline high, 190–219 high, 220 and above very high (mg/dL).
 *
 * Context from the 2018 AHA/ACC multisociety cholesterol guideline (Grundy et
 * al., Circulation 2019): non-HDL-C 190–219 mg/dL is listed with LDL-C 160–189
 * as "primary hypercholesterolemia", a risk-enhancing factor; nonfasting
 * non-HDL-C is described as a reasonable screening test.
 */

const FACTOR = 38.67;

type Band = { upTo: number; name: string; tone: Tone; description: string };

const BANDS: Band[] = [
  {
    upTo: 129.99, name: "desirable", tone: "ok",
    description:
      "Below 130 mg/dL (3.36 mmol/L), the level the National Lipid Association classes as desirable and the goal it sets for people at low, moderate and high risk. People at very high risk, for example after a heart attack, are usually given a lower goal, below 100 mg/dL (2.59 mmol/L).",
  },
  {
    upTo: 159.99, name: "above desirable", tone: "warn",
    description:
      "130 to 159 mg/dL (3.36 to 4.11 mmol/L) is above desirable in the NLA classification. On its own it is a modest elevation; how much it matters depends on blood pressure, smoking, diabetes, family history and age, which together set your overall risk.",
  },
  {
    upTo: 189.99, name: "borderline high", tone: "warn",
    description:
      "160 to 189 mg/dL (4.14 to 4.89 mmol/L) is borderline high. This band often appears when triglycerides are raised, because the extra cholesterol travels in VLDL and remnant particles that an LDL number alone does not show. Worth reviewing with your clinician alongside LDL, triglycerides and, if available, ApoB.",
  },
  {
    upTo: 219.99, name: "high", tone: "bad",
    description:
      "190 to 219 mg/dL (4.91 to 5.66 mmol/L) is high. The 2018 AHA/ACC cholesterol guideline lists non-HDL cholesterol in this range as a risk-enhancing factor, the equivalent of an LDL of 160 to 189 mg/dL. Worth discussing with your clinician.",
  },
  {
    upTo: Infinity, name: "very high", tone: "bad",
    description:
      "220 mg/dL (5.69 mmol/L) and above is very high in the NLA classification, and a level at which inherited forms of high cholesterol are often considered. Discuss this result with your clinician; it is not something to interpret alone.",
  },
];

const ZONES: Zone[] = [
  { from: 0, to: 130, tone: "ok" },
  { from: 130, to: 190, tone: "warn" },
  { from: 190, to: 280, tone: "bad" },
];

export default function NonHdlCalculator() {
  const [unit, setUnit] = useState<"mg" | "si">("mg");
  const [tc, setTc] = useState("");
  const [hdl, setHdl] = useState("");

  const result = useMemo(() => {
    const t = parseFloat(tc);
    const h = parseFloat(hdl);
    if (!Number.isFinite(t) || !Number.isFinite(h) || t <= 0 || h <= 0) return null;
    if (h >= t) return { error: true as const };
    const diff = t - h;
    const mg = unit === "mg" ? diff : diff * FACTOR;
    const band = BANDS.find((b) => mg <= b.upTo) ?? BANDS[BANDS.length - 1];
    return {
      error: false as const,
      main: unit === "mg" ? round(diff, 0) : round(diff, 2),
      other: unit === "mg" ? round(diff / FACTOR, 2) : round(mg, 0),
      mg,
      band,
    };
  }, [tc, hdl, unit]);

  const u = unit === "mg" ? "mg/dL" : "mmol/L";
  const otherU = unit === "mg" ? "mmol/L" : "mg/dL";

  return (
    <Shell labelledBy="nonhdl-title">
      <CalcHead>
        <Eyebrow>Free interactive tool</Eyebrow>
        <CalcTitle id="nonhdl-title">Non-HDL cholesterol from total cholesterol and HDL</CalcTitle>
      </CalcHead>

      <CalcInputs>
        <div>
          <Toggle
            legend="Your lab reports in"
            options={[{ key: "mg", label: "mg/dL" }, { key: "si", label: "mmol/L" }]}
            value={unit}
            onChange={(v) => { setUnit(v as typeof unit); setTc(""); setHdl(""); }}
          />
        </div>

        <Fields>
          <Field label="Total cholesterol" unit={u} placeholder={unit === "mg" ? "e.g. 210" : "e.g. 5.4"} value={tc} onChange={setTc} inputId="nonhdl-tc" step={unit === "mg" ? "1" : "0.01"} />
          <Field label="HDL cholesterol" unit={u} placeholder={unit === "mg" ? "e.g. 50" : "e.g. 1.3"} value={hdl} onChange={setHdl} inputId="nonhdl-hdl" step={unit === "mg" ? "1" : "0.01"} />
        </Fields>
      </CalcInputs>

      <CalcOutput>
        <ResultPanel active={!!result && !result.error}>
          {result && !result.error ? (
            <ResultBody>
              <ResultLabel>
                <span>Non-HDL cholesterol</span> — <Chip tone={result.band.tone}>{result.band.name}</Chip>
              </ResultLabel>
              <div className={s.bigNumber}>
                {result.main} <span className={s.unit}>{u}</span>
              </div>
              <div className={s.monoLine}>
                = {result.other} {otherU}
              </div>
              <RangeBar min={0} max={280} value={result.mg} tone={result.band.tone} zones={ZONES} />
              <p className={s.resultText}>{result.band.description}</p>
            </ResultBody>
          ) : result && result.error ? (
            <Empty>
              HDL cannot be equal to or larger than total cholesterol, because HDL is part of the total. Check that
              both values are in the same unit and copied from the same report.
            </Empty>
          ) : (
            <Empty>
              Enter total cholesterol and HDL from the same lipid panel, in the same unit. Non-HDL is simply the first
              minus the second, and it does not need a fasting sample.
            </Empty>
          )}
        </ResultPanel>

        <Refs>
          <RefRow label="Desirable" range="under 130 mg/dL" tone="ok" />
          <RefRow label="Above desirable" range="130–159 mg/dL" tone="warn" />
          <RefRow label="Borderline high" range="160–189 mg/dL" tone="warn" />
          <RefRow label="High" range="190–219 mg/dL" tone="bad" />
          <RefRow label="Very high" range="220 mg/dL and above" tone="bad" />
        </Refs>
      </CalcOutput>

      <CalcFoot>
        <Footnote>
          Educational tool, not a diagnosis. Categories are the adult classification of the National Lipid Association
          (2014). Your own goal depends on your overall cardiovascular risk, which is for your clinician to assess:
          people at very high risk are usually given a goal below 100 mg/dL. Non-HDL counts the cholesterol in all
          atherogenic particles, but not their number, which is what ApoB measures.
        </Footnote>
        <Cta />
      </CalcFoot>
    </Shell>
  );
}
