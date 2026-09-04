"use client";

import { useState, useMemo } from "react";
import {
  Shell, ResultPanel, Field, RefRow, Toggle, Cta, round,
  eyebrowStyle, titleStyle, resultLabelStyle, bigNumberStyle, resultTextStyle, emptyStyle, footnoteStyle,
} from "./_shared";

/**
 * Transferrin saturation (TSAT) calculator.
 *
 *   TSAT (%) = serum iron / TIBC × 100        (both µg/dL)
 *   TIBC     = serum iron + UIBC              (µg/dL)
 *   TIBC     = transferrin (g/L) × 125        (µg/dL)
 *              (1 mg/dL of transferrin binds ~1.25 µg/dL of iron, and
 *               1 g/L = 100 mg/dL, so the g/L factor is 125 — not 25.2,
 *               which is a figure that circulates online and produces
 *               physiologically impossible saturations above 100%.)
 *
 * Source: StatPearls, "Iron-Binding Capacity", NCBI Bookshelf NBK559119.
 *
 * Real US panels report iron alongside *one* of TIBC, UIBC or transferrin
 * depending on the lab, so all three input paths are supported. Competing
 * calculators generally handle only the TIBC path, which is the reason a
 * reader with a UIBC-style report cannot use them.
 */
export default function TSATCalculator() {
  const [iron, setIron] = useState("");
  const [second, setSecond] = useState("");
  const [mode, setMode] = useState<"tibc" | "uibc" | "transferrin">("tibc");

  const result = useMemo(() => {
    const fe = parseFloat(iron);
    const x = parseFloat(second);
    if (!Number.isFinite(fe) || !Number.isFinite(x) || fe <= 0 || x <= 0) return null;
    let tibc: number;
    if (mode === "tibc") tibc = x;
    else if (mode === "uibc") tibc = fe + x;
    else tibc = x * 125; // transferrin g/L → TIBC µg/dL (1.25 µg per mg/dL)
    if (tibc <= 0) return null;
    const tsat = (fe / tibc) * 100;
    return { tsat: round(tsat, 1), tibc: round(tibc, 0), band: band(tsat) };
  }, [iron, second, mode]);

  const secondLabel =
    mode === "tibc" ? "TIBC" : mode === "uibc" ? "UIBC" : "Transferrin";
  const secondUnit = mode === "transferrin" ? "g/L" : "µg/dL";
  const secondPlaceholder = mode === "tibc" ? "e.g. 320" : mode === "uibc" ? "e.g. 230" : "e.g. 2.6";

  return (
    <Shell labelledBy="tsat-title">
      <div style={eyebrowStyle}>Free interactive tool</div>
      <h2 id="tsat-title" style={titleStyle}>Transferrin Saturation (TSAT) Calculator</h2>

      <div style={{ marginBottom: "1.1rem" }}>
        <Toggle
          legend="What your lab reported alongside iron"
          options={[
            { key: "tibc", label: "TIBC" },
            { key: "uibc", label: "UIBC" },
            { key: "transferrin", label: "Transferrin" },
          ]}
          value={mode}
          onChange={(v) => { setMode(v as typeof mode); setSecond(""); }}
        />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.25rem" }}>
        <Field label="Serum iron" unit="µg/dL" placeholder="e.g. 90" value={iron} onChange={setIron} inputId="tsat-iron" />
        <Field label={secondLabel} unit={secondUnit} placeholder={secondPlaceholder} value={second} onChange={setSecond} inputId="tsat-second" />
      </div>

      <ResultPanel active={!!result} bg={result?.band.bg} border={result?.band.border}>
        {result ? (
          <>
            <div style={{ ...resultLabelStyle, color: result.band.label }}>
              Transferrin saturation — {result.band.name}
            </div>
            <div style={bigNumberStyle}>{result.tsat}<span style={{ fontSize: "1.4rem" }}>%</span></div>
            {mode !== "tibc" && (
              <div style={{ ...resultTextStyle, fontFamily: "var(--font-mono)", fontSize: "0.85rem", marginTop: "0.5rem" }}>
                Derived TIBC: {result.tibc} µg/dL
              </div>
            )}
            <p style={resultTextStyle}>{result.band.description}</p>
          </>
        ) : (
          <p style={emptyStyle}>
            Enter serum iron plus whichever second value your panel reports. Labs differ: some print TIBC, some
            UIBC, some transferrin. Switch the toggle to match your report rather than converting by hand.
          </p>
        )}
      </ResultPanel>

      <div style={{ marginTop: "1.25rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
        <RefRow label="Low — iron deficiency range" range="under 20%" tone="bad" />
        <RefRow label="Borderline low" range="20–25%" tone="warn" />
        <RefRow label="Typical reference range" range="25–35%" tone="ok" />
        <RefRow label="High — iron overload range" range="above 45%" tone="warn" />
      </div>

      <p style={footnoteStyle}>
        Educational tool, not a diagnosis. TSAT is interpreted alongside ferritin, not instead of it — ferritin rises
        with inflammation and can look normal while iron stores are genuinely low, which is exactly when TSAT is most
        useful. A persistently high TSAT, particularly above 45%, is the standard trigger for investigating
        hemochromatosis. Reference intervals vary between laboratories; compare against the range printed on your report.
      </p>
      <Cta />
    </Shell>
  );
}

function band(t: number) {
  if (t < 20) return {
    name: "Low", label: "#A12C2C",
    bg: "color-mix(in srgb, #D24343 14%, var(--color-canvas))",
    border: "color-mix(in srgb, #D24343 32%, transparent)",
    description:
      "Below the usual reference range, which is the classic pattern of iron deficiency — and it can appear before hemoglobin falls, so it often precedes anemia. Worth reading together with ferritin and a full blood count.",
  };
  if (t < 25) return {
    name: "Borderline low", label: "#8E5F1A",
    bg: "color-mix(in srgb, var(--color-warm, #C4882F) 16%, var(--color-canvas))",
    border: "color-mix(in srgb, var(--color-warm, #C4882F) 32%, transparent)",
    description:
      "Just under the typical range. On its own this is not diagnostic, but combined with low-normal ferritin or symptoms of fatigue it is the pattern worth investigating rather than dismissing.",
  };
  if (t <= 45) return {
    name: "Within typical range", label: "var(--color-green-deep)",
    bg: "color-mix(in srgb, var(--color-pulse) 12%, var(--color-canvas))",
    border: "color-mix(in srgb, var(--color-pulse) 30%, transparent)",
    description:
      "Within the range most laboratories report. TSAT reflects how much of your iron-carrying capacity is actually in use, which is why it can reveal a problem that ferritin alone hides.",
  };
  return {
    name: "High", label: "#8E5F1A",
    bg: "color-mix(in srgb, var(--color-warm, #C4882F) 16%, var(--color-canvas))",
    border: "color-mix(in srgb, var(--color-warm, #C4882F) 32%, transparent)",
    description:
      "Above the usual range. A TSAT above roughly 45% that persists on a repeat fasting sample is the standard threshold for investigating iron overload, including hereditary hemochromatosis. Recent iron supplements or a non-fasting draw can also raise it, so a single reading is not enough.",
  };
}
