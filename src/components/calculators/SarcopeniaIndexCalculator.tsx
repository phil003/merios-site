"use client";

import { useState, useMemo } from "react";
import {
  Shell, ResultPanel, Field, Cta, round,
  eyebrowStyle, titleStyle, resultLabelStyle, bigNumberStyle, resultTextStyle, emptyStyle, footnoteStyle,
} from "./_shared";

/**
 * Sarcopenia index — creatinine to cystatin C ratio.
 *
 *   SI = [ serum creatinine (mg/dL) / cystatin C (mg/L) ] × 100
 *
 * The logic: creatinine is produced by muscle, cystatin C is not. Their ratio
 * therefore carries a muscle-mass signal that either marker alone does not.
 *
 * Deliberately shows NO pass/fail verdict. Published cutoffs disagree by
 * population (77.3 in one T2DM cohort, 67.5 among those with eGFR ≥ 60), and
 * discrimination degrades with impaired renal function. Presenting a single
 * threshold here would be false precision on a YMYL page, so the tool gives
 * the number, the context, and the limits.
 */
export default function SarcopeniaIndexCalculator() {
  const [creat, setCreat] = useState("");
  const [cysc, setCysc] = useState("");

  const result = useMemo(() => {
    const c = parseFloat(creat);
    const y = parseFloat(cysc);
    if (!Number.isFinite(c) || !Number.isFinite(y) || c <= 0 || y <= 0) return null;
    return { si: round((c / y) * 100, 1) };
  }, [creat, cysc]);

  return (
    <Shell labelledBy="si-title">
      <div style={eyebrowStyle}>Free interactive tool</div>
      <h2 id="si-title" style={titleStyle}>Sarcopenia Index Calculator</h2>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.25rem" }}>
        <Field label="Creatinine" unit="mg/dL" placeholder="e.g. 0.95" value={creat} onChange={setCreat} inputId="si-creat" step="0.01" />
        <Field label="Cystatin C" unit="mg/L" placeholder="e.g. 0.85" value={cysc} onChange={setCysc} inputId="si-cysc" step="0.01" />
      </div>

      <ResultPanel
        active={!!result}
        bg="color-mix(in srgb, var(--color-pulse) 10%, var(--color-canvas))"
        border="color-mix(in srgb, var(--color-pulse) 26%, transparent)"
      >
        {result ? (
          <>
            <div style={{ ...resultLabelStyle, color: "var(--color-green-deep)" }}>Your sarcopenia index</div>
            <div style={bigNumberStyle}>{result.si}</div>
            <p style={resultTextStyle}>
              Deliberately shown without a pass or fail band. Published cutoffs disagree substantially between
              populations — values near 77 and near 67 have both been proposed in different cohorts — so a single
              threshold would give you false confidence. Read this as a personal baseline: the number to compare
              against is <strong>your own</strong> on the next panel, not someone else&rsquo;s cutoff.
            </p>
          </>
        ) : (
          <p style={emptyStyle}>
            Enter creatinine and cystatin C from the same blood draw. Both must come from one panel, since the whole
            point of the ratio is that the two markers respond differently to muscle mass.
          </p>
        )}
      </ResultPanel>

      <p style={footnoteStyle}>
        Educational tool, not a diagnosis. The idea is simple: creatinine comes from muscle, cystatin C does not, so
        their ratio carries a muscle signal neither marker shows alone. In 458,702 UK Biobank participants it
        discriminated sarcopenia with an area under the curve of roughly 0.72 — acceptable, not excellent. Two honest
        limits: it tracks grip strength better than it tracks muscle mass, and its performance degrades when kidney
        function is impaired. It has also never been validated specifically in people taking GLP-1 medications, which
        is the group most likely to be watching muscle loss. Treat it as a cheap trend line, not a test.
      </p>
      <Cta />
    </Shell>
  );
}
