"use client";

import { useState, useMemo } from "react";
import {
  Shell, ResultPanel, Field, Toggle, Cta, round,
  eyebrowStyle, titleStyle, resultLabelStyle, bigNumberStyle, resultTextStyle, emptyStyle, footnoteStyle,
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

  return (
    <Shell labelledBy="lpa-title">
      <div style={eyebrowStyle}>Free interactive tool</div>
      <h2 id="lpa-title" style={titleStyle}>Lp(a) Unit Converter</h2>

      <div style={{ marginBottom: "1.1rem" }}>
        <Toggle
          legend="Your result is in"
          options={[{ key: "nmol", label: "nmol/L" }, { key: "mgdl", label: "mg/dL" }]}
          value={from}
          onChange={(v) => setFrom(v as typeof from)}
        />
      </div>

      <div style={{ marginBottom: "1.25rem", maxWidth: "260px" }}>
        <Field
          label="Lp(a)"
          unit={from === "nmol" ? "nmol/L" : "mg/dL"}
          placeholder={from === "nmol" ? "e.g. 125" : "e.g. 50"}
          value={value}
          onChange={setValue}
          inputId="lpa-value"
        />
      </div>

      <ResultPanel active={!!result} bg={result?.risk.bg} border={result?.risk.border}>
        {result ? (
          <>
            <div style={{ ...resultLabelStyle, color: result.risk.label }}>
              Approximate equivalent — {result.risk.name}
            </div>
            <div style={bigNumberStyle}>
              {result.lo}–{result.hi} <span style={{ fontSize: "1.15rem", letterSpacing: 0 }}>{result.unit}</span>
            </div>
            <p style={resultTextStyle}>
              A <strong>range, not a number</strong>, because there is no exact conversion between these units. The
              two scales measure different things: mg/dL is the mass of the particle, nmol/L is how many particles
              there are. Since apo(a) particle size differs between people, the mass per particle is not a constant.
            </p>
            <p style={{ ...resultTextStyle, marginTop: "0.6rem" }}>{result.risk.description}</p>
          </>
        ) : (
          <p style={emptyStyle}>
            Enter your Lp(a) result in whichever unit your laboratory used. US labs often report mg/dL, European and
            newer assays usually report nmol/L, which is why the same person can see two very different-looking
            numbers across two reports.
          </p>
        )}
      </ResultPanel>

      <p style={footnoteStyle}>
        Educational tool, not a diagnosis. The practical advice matters more than the arithmetic here:{" "}
        <strong>stay on one unit and one assay when tracking Lp(a) over time</strong>, because a change in reported
        value between labs is more likely to be a units or method artifact than a real biological change. Lp(a) is
        also largely genetically determined and stable through life, so it is usually measured once rather than
        monitored — a rising result is more often a lab difference than a real trend. Thresholds vary between
        guidelines; interpret with the range printed on your own report and with your physician.
      </p>
      <Cta />
    </Shell>
  );
}

function riskFromNmol(nmol: number) {
  if (nmol < 75) return {
    name: "below common risk thresholds", label: "var(--color-green-deep)",
    bg: "color-mix(in srgb, var(--color-pulse) 12%, var(--color-canvas))",
    border: "color-mix(in srgb, var(--color-pulse) 30%, transparent)",
    description:
      "Below the levels most guidelines flag. Because Lp(a) is largely inherited and stable, a low result generally does not need repeating unless a clinician has a specific reason.",
  };
  if (nmol < 125) return {
    name: "intermediate", label: "#8E5F1A",
    bg: "color-mix(in srgb, var(--color-warm, #C4882F) 16%, var(--color-canvas))",
    border: "color-mix(in srgb, var(--color-warm, #C4882F) 32%, transparent)",
    description:
      "In the grey zone between the commonly cited thresholds. At this level Lp(a) is usually weighed alongside the rest of your cardiovascular picture — ApoB, family history, blood pressure — rather than acted on alone.",
  };
  return {
    name: "above the commonly cited threshold", label: "#A12C2C",
    bg: "color-mix(in srgb, #D24343 14%, var(--color-canvas))",
    border: "color-mix(in srgb, #D24343 32%, transparent)",
    description:
      "Above the level frequently used to define elevated Lp(a) — roughly 125 nmol/L or 50 mg/dL. This is an independent, inherited cardiovascular risk factor, which is a reason to be more aggressive about the risks you *can* change rather than a verdict in itself. Worth discussing with a physician, including whether first-degree relatives should be tested.",
  };
}
