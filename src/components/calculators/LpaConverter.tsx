"use client";

import { useState, useMemo } from "react";
import {
  Shell, CalcHead, Eyebrow, CalcTitle, CalcInputs, Fields, Field, Toggle, CalcOutput, ResultPanel,
  ResultBody, Empty, ResultLabel, Chip, RangeBar, CalcFoot, Footnote, Cta, round,
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
 */
const LO = 2.15;
const HI = 2.5;

export default function LpaConverter() {
  const [value, setValue] = useState("");
  const [from, setFrom] = useState<"nmol" | "mgdl">("nmol");

  const result = useMemo(() => {
    const v = parseFloat(value);
    if (!Number.isFinite(v) || v <= 0) return null;
    if (from === "nmol") {
      return { lo: round(v / HI, 1), hi: round(v / LO, 1), unit: "mg/dL", risk: riskFromNmol(v) };
    }
    return { lo: round(v * LO, 0), hi: round(v * HI, 0), unit: "nmol/L", risk: riskFromNmol(v * ((LO + HI) / 2)) };
  }, [value, from]);

  // Range bar position only (decorative): the same nmol/L figure the risk band reads.
  const barNmol = from === "nmol" ? parseFloat(value) : parseFloat(value) * ((LO + HI) / 2);

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
            onChange={(v) => setFrom(v as typeof from)}
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
                <span>Approximate equivalent</span> — <Chip tone={result.risk.tone}>{result.risk.name}</Chip>
              </ResultLabel>
              <div className={s.bigNumber}>
                {result.lo}–{result.hi} <span className={s.unit}>{result.unit}</span>
              </div>
              <RangeBar min={0} max={250} value={barNmol} tone={result.risk.tone} zones={ZONES} />
              <p className={s.resultText}>
                A <strong>range, not a number</strong>, because there is no exact conversion between these units. The
                two scales measure different things: mg/dL is the mass of the particle, nmol/L is how many particles
                there are. Since apo(a) particle size differs between people, the mass per particle is not a constant.
              </p>
              <p className={s.resultText}>{result.risk.description}</p>
            </ResultBody>
          ) : (
            <Empty>
              Enter your Lp(a) result in whichever unit your laboratory used. US labs often report mg/dL, European and
              newer assays usually report nmol/L, which is why the same person can see two very different-looking
              numbers across two reports.
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

/* Range bar scale in nmol/L (presentation only — mirrors riskFromNmol). */
const ZONES: Zone[] = [
  { from: 0, to: 75, tone: "ok" },
  { from: 75, to: 125, tone: "warn" },
  { from: 125, to: 250, tone: "bad" },
];

function riskFromNmol(nmol: number): { name: string; tone: Tone; description: string } {
  if (nmol < 75) return {
    name: "below common risk thresholds", tone: "ok",
    description:
      "Below the levels most guidelines flag. Because Lp(a) is largely inherited and stable, a low result generally does not need repeating unless a clinician has a specific reason.",
  };
  if (nmol < 125) return {
    name: "intermediate", tone: "warn",
    description:
      "In the grey zone between the commonly cited thresholds. At this level Lp(a) is usually weighed alongside the rest of your cardiovascular picture — ApoB, family history, blood pressure — rather than acted on alone.",
  };
  return {
    name: "above the commonly cited threshold", tone: "bad",
    description:
      "Above the level frequently used to define elevated Lp(a) — roughly 125 nmol/L or 50 mg/dL. This is an independent, inherited cardiovascular risk factor, which is a reason to be more aggressive about the risks you *can* change rather than a verdict in itself. Worth discussing with a physician, including whether first-degree relatives should be tested.",
  };
}
