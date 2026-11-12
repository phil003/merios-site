"use client";

import { useState, useMemo } from "react";
import {
  Shell, CalcHead, Eyebrow, CalcTitle, CalcInputs, Fields, Field, Toggle, CalcOutput, ResultPanel,
  ResultBody, Empty, ResultLabel, Chip, RangeBar, Refs, RefRow, CalcFoot, Footnote, Cta, round,
  styles as s, type Tone, type Zone,
} from "./_shared";

/**
 * Corrected (albumin-adjusted) calcium calculator.
 *
 * The widely used albumin adjustment, usually attributed to Payne et al.
 * (BMJ 1973;4:643-646):
 *
 *   US: corrected Ca (mg/dL)  = measured Ca + 0.8  × (4.0 − albumin g/dL)
 *   SI: corrected Ca (mmol/L) = measured Ca + 0.02 × (40 − albumin g/L)
 *
 * Each unit system is calculated with its own formula, then converted for the
 * other line: 1 mmol/L calcium = 4.008 mg/dL (molar mass 40.08 g/mol),
 * albumin 1 g/dL = 10 g/L.
 *
 * Bands use a common adult reference range for total calcium of about
 * 8.5–10.2 mg/dL (2.12–2.55 mmol/L). Ranges vary by lab. The formula is an
 * estimate: measured ionized calcium is preferred when accuracy matters
 * (critical illness, kidney disease, very low or high albumin).
 */
const CA_FACTOR = 4.008; // mg/dL per mmol/L

const LOW_MG = 8.5;
const HIGH_MG = 10.2;

type System = "us" | "si";

/* Plausibility bounds for a serum result, per unit (inclusive). */
const BOUNDS = {
  us: { ca: [4, 16] as const, alb: [1, 6.5] as const },
  si: { ca: [1, 4] as const, alb: [10, 65] as const },
};

function parse(v: string) {
  return parseFloat(v.replace(",", "."));
}

export default function CorrectedCalciumCalculator() {
  const [system, setSystem] = useState<System>("us");
  const [ca, setCa] = useState("");
  const [alb, setAlb] = useState("");

  const state = useMemo(() => {
    const c = parse(ca);
    const a = parse(alb);
    if (!Number.isFinite(c) || !Number.isFinite(a) || c <= 0 || a <= 0) return { kind: "empty" as const };
    const b = BOUNDS[system];
    const caUnit = system === "us" ? "mg/dL" : "mmol/L";
    const albUnit = system === "us" ? "g/dL" : "g/L";
    if (c < b.ca[0] || c > b.ca[1]) {
      return {
        kind: "invalid" as const,
        message: `A total calcium of ${c} ${caUnit} is outside the range this tool accepts (${b.ca[0]} to ${b.ca[1]} ${caUnit}). Check the unit: ${
          system === "us" ? "a value around 2 to 3 is probably mmol/L" : "a value around 8 to 11 is probably mg/dL"
        }, so switch the toggle above.`,
      };
    }
    if (a < b.alb[0] || a > b.alb[1]) {
      return {
        kind: "invalid" as const,
        message: `An albumin of ${a} ${albUnit} is outside the range this tool accepts (${b.alb[0]} to ${b.alb[1]} ${albUnit}). Check the unit: ${
          system === "us" ? "a value around 30 to 50 is probably g/L" : "a value around 3 to 5 is probably g/dL"
        }, so switch the toggle above.`,
      };
    }
    let mg: number;
    let mmol: number;
    let albGdl: number;
    let adjustMg: number;
    if (system === "us") {
      albGdl = a;
      mg = c + 0.8 * (4.0 - a);
      mmol = mg / CA_FACTOR;
      adjustMg = mg - c;
    } else {
      albGdl = a / 10;
      mmol = c + 0.02 * (40 - a);
      mg = mmol * CA_FACTOR;
      adjustMg = (mmol - c) * CA_FACTOR;
    }
    if (!Number.isFinite(mg) || !Number.isFinite(mmol)) return { kind: "empty" as const };
    return {
      kind: "ok" as const,
      mg: round(mg, 1),
      mmol: round(mmol, 2),
      mgRaw: mg,
      measured: c,
      albGdl,
      adjustMg,
      band: band(mg),
    };
  }, [ca, alb, system]);

  const primary =
    state.kind === "ok"
      ? system === "us"
        ? { value: state.mg.toFixed(1), unit: "mg/dL", other: `${state.mmol.toFixed(2)} mmol/L` }
        : { value: state.mmol.toFixed(2), unit: "mmol/L", other: `${state.mg.toFixed(1)} mg/dL` }
      : null;

  return (
    <Shell labelledBy="cca-title">
      <CalcHead>
        <Eyebrow>Free interactive tool</Eyebrow>
        <CalcTitle id="cca-title">Corrected calcium from total calcium and albumin</CalcTitle>
      </CalcHead>

      <CalcInputs>
        <div>
          <Toggle
            legend="Units on your report"
            options={[
              { key: "us", label: "mg/dL + g/dL" },
              { key: "si", label: "mmol/L + g/L" },
            ]}
            value={system}
            onChange={(v) => { setSystem(v as System); setCa(""); setAlb(""); }}
          />
        </div>

        <Fields>
          <Field
            label="Total calcium"
            unit={system === "us" ? "mg/dL" : "mmol/L"}
            placeholder={system === "us" ? "e.g. 8.0" : "e.g. 2.10"}
            step={system === "us" ? "0.1" : "0.01"}
            value={ca}
            onChange={setCa}
            inputId="cca-calcium"
          />
          <Field
            label="Albumin"
            unit={system === "us" ? "g/dL" : "g/L"}
            placeholder={system === "us" ? "e.g. 3.0" : "e.g. 30"}
            step={system === "us" ? "0.1" : "1"}
            value={alb}
            onChange={setAlb}
            inputId="cca-albumin"
          />
        </Fields>
      </CalcInputs>

      <CalcOutput>
        <ResultPanel active={state.kind === "ok"}>
          {state.kind === "ok" && primary ? (
            <ResultBody>
              <ResultLabel>
                <span>Corrected calcium</span> — <Chip tone={state.band.tone}>{state.band.name}</Chip>
              </ResultLabel>
              <div className={s.bigNumber}>
                {primary.value} <span className={s.unit}>{primary.unit}</span>
              </div>
              <div className={s.monoLine}>Same result: {primary.other}</div>
              <RangeBar min={6} max={13} value={state.mgRaw} tone={state.band.tone} zones={ZONES} />
              <p className={s.resultText}>
                {state.albGdl < 4
                  ? `Albumin is below 4.0 g/dL (40 g/L), so the formula adds ${round(state.adjustMg, 1).toFixed(1)} mg/dL to the measured value to estimate what total calcium would be at a normal albumin.`
                  : state.albGdl === 4
                    ? "Albumin is exactly 4.0 g/dL (40 g/L), so there is nothing to correct: corrected calcium equals measured calcium."
                    : `Albumin is above 4.0 g/dL (40 g/L), so the formula subtracts ${round(Math.abs(state.adjustMg), 1).toFixed(1)} mg/dL. With a normal or high albumin the correction adds little, and many labs and clinicians simply read the measured total calcium.`}
              </p>
              <p className={s.resultText}>{state.band.description}</p>
            </ResultBody>
          ) : state.kind === "invalid" ? (
            <Empty>{state.message}</Empty>
          ) : (
            <Empty>
              Enter total serum calcium and serum albumin from the same blood draw. Pick the units printed on your
              report: US labs use mg/dL and g/dL, labs in the UK, Europe and Australia use mmol/L and g/L.
            </Empty>
          )}
        </ResultPanel>

        <Refs>
          <RefRow label="Below the usual adult range" range="under 8.5 mg/dL (2.12 mmol/L)" tone="warn" />
          <RefRow label="Usual adult range" range="8.5–10.2 mg/dL (2.12–2.55 mmol/L)" tone="ok" />
          <RefRow label="Above the usual adult range" range="over 10.2 mg/dL (2.55 mmol/L)" tone="warn" />
        </Refs>
      </CalcOutput>

      <CalcFoot>
        <Footnote>
          Educational tool, not a diagnosis. Corrected calcium is an estimate of what total calcium would be if albumin
          were normal. It is less reliable in critical illness, kidney disease and at very low or very high albumin,
          and many labs and newer guidance prefer a measured <strong>ionized calcium</strong> when accuracy matters.
          Reference ranges vary by lab; read your result against the range printed on your own report and discuss it
          with your clinician.
        </Footnote>
        <Cta />
      </CalcFoot>
    </Shell>
  );
}

/* Range bar scale in mg/dL (presentation only — mirrors band()). */
const ZONES: Zone[] = [
  { from: 6, to: LOW_MG, tone: "warn" },
  { from: LOW_MG, to: HIGH_MG, tone: "ok" },
  { from: HIGH_MG, to: 13, tone: "warn" },
];

function band(mg: number): { name: string; tone: Tone; description: string } {
  const r = round(mg, 1);
  if (r < LOW_MG) return {
    name: "below the usual range", tone: "warn",
    description:
      "Below about 8.5 mg/dL (2.12 mmol/L) after correction is under the usual adult range. Low calcium can be associated with low vitamin D, low magnesium, kidney disease or low parathyroid hormone, among other causes. It is worth reviewing with your clinician, who may check ionized calcium, vitamin D, magnesium and PTH.",
  };
  if (r <= HIGH_MG) return {
    name: "within the usual adult range", tone: "ok",
    description:
      "About 8.5 to 10.2 mg/dL (2.12 to 2.55 mmol/L) is a common adult reference range for total calcium. Exact limits vary between labs, so check the range printed on your own report.",
  };
  return {
    name: "above the usual range", tone: "warn",
    description:
      "Above about 10.2 mg/dL (2.55 mmol/L) after correction is over the usual adult range. High calcium is often parathyroid-related, and it can also be associated with certain medications or with too much vitamin D or calcium from supplements. It is worth reviewing with your clinician, who may repeat the test or measure ionized calcium and PTH.",
  };
}
