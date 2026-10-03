"use client";

import { useState, useMemo } from "react";
import {
  Shell, CalcHead, Eyebrow, CalcTitle, CalcInputs, Fields, Field, Toggle, CalcOutput, ResultPanel,
  ResultBody, Empty, ResultLabel, Chip, RangeBar, Refs, RefRow, CalcFoot, Footnote, Cta, round,
  styles as s, type Tone, type Zone,
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
      <CalcHead>
        <Eyebrow>Free interactive tool</Eyebrow>
        <CalcTitle id="tsat-title">Transferrin saturation from serum iron and TIBC</CalcTitle>
      </CalcHead>

      <CalcInputs>
        <div>
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

        <Fields>
          <Field label="Serum iron" unit="µg/dL" placeholder="e.g. 90" value={iron} onChange={setIron} inputId="tsat-iron" />
          <Field label={secondLabel} unit={secondUnit} placeholder={secondPlaceholder} value={second} onChange={setSecond} inputId="tsat-second" />
        </Fields>
      </CalcInputs>

      <CalcOutput>
        <ResultPanel active={!!result}>
          {result ? (
            <ResultBody>
              <ResultLabel>
                <span>Transferrin saturation</span> — <Chip tone={result.band.tone}>{result.band.name}</Chip>
              </ResultLabel>
              <div className={s.bigNumber}>{result.tsat}<span className={s.unitTight}>%</span></div>
              {mode !== "tibc" && (
                <div className={s.monoLine}>
                  Derived TIBC: {result.tibc} µg/dL
                </div>
              )}
              <RangeBar min={0} max={70} value={result.tsat} tone={result.band.tone} zones={ZONES} />
              <p className={s.resultText}>{result.band.description}</p>
            </ResultBody>
          ) : (
            <Empty>
              Enter serum iron plus whichever second value your panel reports. Labs differ: some print TIBC, some
              UIBC, some transferrin. Switch the toggle to match your report rather than converting by hand.
            </Empty>
          )}
        </ResultPanel>

        <Refs>
          <RefRow label="Low — iron deficiency pattern" range="under 20%" tone="bad" />
          <RefRow label="Borderline low" range="20–25%" tone="warn" />
          <RefRow label="Functional band — iron supply comfortable" range="25–35%" tone="ok" />
          <RefRow label="Overload screening trigger" range="above 45%" tone="warn" />
        </Refs>
      </CalcOutput>

      <CalcFoot>
        <Footnote>
          Educational tool, not a diagnosis. TSAT is interpreted alongside ferritin, not instead of it — ferritin rises
          with inflammation and can look normal while iron stores are genuinely low, which is exactly when TSAT is most
          useful. A persistently high TSAT, particularly above 45%, is the standard trigger for investigating
          hemochromatosis. Most US laboratories print a normal range of roughly 20 to 50 percent; the 25 to 35 percent
          band above is the tighter zone where iron supply is comfortable rather than merely inside the lab range.
          Reference intervals vary between laboratories; compare against the range printed on your report.
        </Footnote>
        <Cta />
      </CalcFoot>
    </Shell>
  );
}

/* Range bar scale (presentation only — mirrors the bands in band()). */
const ZONES: Zone[] = [
  { from: 0, to: 20, tone: "bad" },
  { from: 20, to: 25, tone: "warn" },
  { from: 25, to: 45, tone: "ok" },
  { from: 45, to: 70, tone: "warn" },
];

function band(t: number): { name: string; tone: Tone; description: string } {
  if (t < 20) return {
    name: "Low", tone: "bad",
    description:
      "Below the usual reference range, which is the classic pattern of iron deficiency — and it can appear before hemoglobin falls, so it often precedes anemia. Worth reading together with ferritin and a full blood count.",
  };
  if (t < 25) return {
    name: "Borderline low", tone: "warn",
    description:
      "Just under the typical range. On its own this is not diagnostic, but combined with low-normal ferritin or symptoms of fatigue it is the pattern worth investigating rather than dismissing.",
  };
  if (t <= 45) return {
    name: "Within typical range", tone: "ok",
    description:
      "Within the range most laboratories report. TSAT reflects how much of your iron-carrying capacity is actually in use, which is why it can reveal a problem that ferritin alone hides.",
  };
  return {
    name: "High", tone: "warn",
    description:
      "Above the usual range. A TSAT above roughly 45% that persists on a repeat fasting sample is the standard threshold for investigating iron overload, including hereditary hemochromatosis. Recent iron supplements or a non-fasting draw can also raise it, so a single reading is not enough.",
  };
}
