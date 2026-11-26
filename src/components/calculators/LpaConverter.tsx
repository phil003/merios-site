"use client";

import { useState, useMemo, type ReactNode } from "react";
import {
  Shell, CalcHead, Eyebrow, CalcTitle, CalcInputs, Fields, Field, Toggle, CalcOutput, ResultPanel,
  ResultBody, Empty, ResultLabel, Chip, RangeBar, CalcFoot, Footnote, Cta,
  styles as s, type Tone, type Zone,
} from "./_shared";

/**
 * Lp(a) unit converter — nmol/L ↔ mg/dL.
 *
 * The honest position, and the reason this tool exists: there is NO valid
 * exact conversion. mg/dL measures the mass of the whole particle while
 * nmol/L counts particles, and apo(a) isoform size varies between people, so
 * the mass per particle is not constant. Commonly used approximations cluster
 * between ÷2.15 and ÷2.5.
 *
 * Every competing calculator returns a single number, implying a precision
 * that does not exist. This one returns the range and says why — which is
 * both more useful and more accurate.
 *
 * The band is read in the unit that was typed, against that unit's own
 * thresholds (the ones the page's tables use): nmol/L on 75 and 125, mg/dL on
 * 30 and 50. Converting first would move 50 mg/dL, the commonly cited
 * threshold, into the intermediate band.
 */
const LO = 2.15;
const HI = 2.5;

type From = "nmol" | "mgdl";

/* Thresholds per unit: start of the intermediate zone, commonly cited threshold */
const CUTS: Record<From, [number, number]> = { nmol: [75, 125], mgdl: [30, 50] };

/** Rounds halves up, as the tables on the page do (30 × 2.15 = 64.5 → 65, not 64). */
function fixed(x: number, digits: number): string {
  const f = 10 ** digits;
  return (Math.round(x * f + 1e-9) / f).toFixed(digits);
}

export default function LpaConverter() {
  const [value, setValue] = useState("");
  const [from, setFrom] = useState<From>("nmol");

  const result = useMemo(() => {
    const v = parseFloat(value);
    if (!Number.isFinite(v) || v <= 0) return null;
    const risk = riskOf(v, from);
    if (from === "nmol") {
      // mg/dL to one decimal on both ends: 50.0–58.1, never 50–58.1
      return { lo: fixed(v / HI, 1), hi: fixed(v / LO, 1), unit: "mg/dL", value: v, risk };
    }
    return { lo: fixed(v * LO, 0), hi: fixed(v * HI, 0), unit: "nmol/L", value: v, risk };
  }, [value, from]);

  // Range bar (decorative), in the unit typed: 0–250 nmol/L or 0–100 mg/dL.
  const [cut1, cut2] = CUTS[from];
  const barMax = from === "nmol" ? 250 : 100;
  const zones: Zone[] = [
    { from: 0, to: cut1, tone: "ok" },
    { from: cut1, to: cut2, tone: "warn" },
    { from: cut2, to: barMax, tone: "bad" },
  ];

  return (
    <Shell labelledBy="lpa-title">
      <CalcHead>
        <Eyebrow>Free interactive tool</Eyebrow>
        <CalcTitle id="lpa-title">Lp(a) Unit Converter</CalcTitle>
      </CalcHead>

      <CalcInputs>
        <div>
          <Toggle
            legend="Your result is in"
            options={[{ key: "nmol", label: "nmol/L" }, { key: "mgdl", label: "mg/dL" }]}
            value={from}
            onChange={(v) => setFrom(v === "mgdl" ? "mgdl" : "nmol")}
          />
        </div>

        <Fields cols="1">
          <Field
            label="Lp(a)"
            unit={from === "nmol" ? "nmol/L" : "mg/dL"}
            placeholder={from === "nmol" ? "e.g. 125" : "e.g. 50"}
            value={value}
            onChange={setValue}
            inputId="lpa-value"
          />
        </Fields>
      </CalcInputs>

      <CalcOutput>
        <ResultPanel active={!!result}>
          {result ? (
            <ResultBody>
              <ResultLabel>
                <span>Approximate equivalent</span> <Chip tone={result.risk.tone}>{result.risk.name}</Chip>
              </ResultLabel>
              <div className={s.bigNumber} data-fit="range">
                {result.lo}–{result.hi} <span className={s.unit}>{result.unit}</span>
              </div>
              <RangeBar min={0} max={barMax} value={result.value} tone={result.risk.tone} zones={zones} />
              <p className={s.resultText}>
                A <strong>range, not a number</strong>, because there is no exact conversion between these units. The
                two scales measure different things: mg/dL is the mass of the particle, nmol/L is how many particles
                there are. Since apo(a) particle size differs between people, the mass per particle is not a constant.
              </p>
              <p className={s.resultText}>{result.risk.description}</p>
            </ResultBody>
          ) : (
            <Empty>
              Enter your Lp(a) result in whichever unit your laboratory used. Large labs, including Quest and Labcorp
              in the US, report nmol/L; older reports and some labs still use mg/dL, which is why the same person can
              see two very different-looking numbers across two reports.
            </Empty>
          )}
        </ResultPanel>
      </CalcOutput>

      <CalcFoot>
        <Footnote>
          Educational tool, not a diagnosis. The practical advice matters more than the arithmetic here:{" "}
          <strong>stay on one unit and one assay when tracking Lp(a) over time</strong>, because a change in reported
          value between labs is more likely to be a units or method artifact than a real biological change. Lp(a) is
          also largely genetically determined and stable through life, so it is usually measured once rather than
          monitored — a rising result is more often a lab difference than a real trend. Thresholds vary between
          guidelines; interpret with the range printed on your own report and with your physician.
        </Footnote>
        <Cta />
      </CalcFoot>
    </Shell>
  );
}

function riskOf(v: number, from: From): { name: string; tone: Tone; description: ReactNode } {
  const [cut1, cut2] = CUTS[from];
  if (v < cut1) return {
    name: "below common risk thresholds", tone: "ok",
    description:
      "Below the levels most guidelines flag. Because Lp(a) is largely inherited and stable, a low result generally does not need repeating unless a clinician has a specific reason.",
  };
  if (v < cut2) return {
    name: "intermediate", tone: "warn",
    description:
      "In the grey zone between the commonly cited thresholds. At this level Lp(a) is usually weighed alongside the rest of your cardiovascular picture — ApoB, family history, blood pressure — rather than acted on alone.",
  };
  return {
    name: "at or above the commonly cited threshold", tone: "bad",
    description: (
      <>
        At or above the level frequently used to define elevated Lp(a) — roughly 125&nbsp;nmol/L or 50&nbsp;mg/dL. This is an
        independent, inherited cardiovascular risk factor, which is a reason to be more aggressive about the risks
        you <em>can</em> change rather than a verdict in itself. Worth discussing with a physician, including whether
        first-degree relatives should be tested.
      </>
    ),
  };
}
