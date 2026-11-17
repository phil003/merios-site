"use client";

import { useState, useMemo } from "react";
import {
  Shell, CalcHead, Eyebrow, CalcTitle, CalcInputs, Fields, Field, Toggle, CalcOutput, ResultPanel,
  ResultBody, Empty, ResultLabel, Chip, RangeBar, Refs, RefRow, CalcFoot, Footnote, Cta, round,
  styles as s, type Tone, type Zone,
} from "./_shared";

/**
 * Neutrophil-to-lymphocyte ratio (NLR) calculator.
 *
 *   NLR = absolute neutrophil count ÷ absolute lymphocyte count
 *       = neutrophil % ÷ lymphocyte %   (both are shares of the same total WBC,
 *                                        so the total cancels out)
 *   ×10^3/µL and ×10^9/L are the same number; any unit works as long as both
 *   counts use it.
 *
 * Reference data used for the bands:
 *   - Forget P et al., "What is the normal value of the neutrophil-to-lymphocyte
 *     ratio?" BMC Res Notes 2017;10:12 (doi:10.1186/s13104-016-2335-5): 413
 *     healthy working adults aged 21-66, mean NLR 1.65, normal range 0.78-3.53.
 *   - Zahorec R, "Neutrophil-to-lymphocyte ratio, past, present and future
 *     perspectives", Bratisl Lek Listy 2021;122(7):474-488
 *     (doi:10.4149/BLL_2021_078): grey zone 2.3-3.0 as a possible early warning.
 *   - Azab B et al., PLoS One 2014;9(11):e112361 (NHANES 2007-2010, 9,427
 *     adults): mean NLR 2.15; 1.76 in non-Hispanic Black adults.
 * The bands orient the reader only; NLR is non-specific and not a diagnosis.
 */
export default function NeutrophilLymphocyteRatioCalculator() {
  const [mode, setMode] = useState<"abs" | "pct">("abs");
  const [neu, setNeu] = useState("");
  const [lym, setLym] = useState("");
  const [wbc, setWbc] = useState("");

  const result = useMemo(() => {
    const n = parseFloat(neu);
    const l = parseFloat(lym);
    if (!Number.isFinite(n) || !Number.isFinite(l) || n <= 0 || l <= 0) return null;
    if (mode === "pct" && (n > 100 || l > 100 || n + l > 100)) {
      return { error: "Neutrophil % and lymphocyte % together cannot be more than 100%. Check the two values on your report." };
    }
    const ratio = n / l;
    let absN: number | null = null;
    let absL: number | null = null;
    if (mode === "pct") {
      const w = parseFloat(wbc);
      if (Number.isFinite(w) && w > 0) {
        absN = round((w * n) / 100, 2);
        absL = round((w * l) / 100, 2);
      }
    }
    return { ratio: round(ratio, 2), raw: ratio, absN, absL, band: band(ratio) };
  }, [neu, lym, wbc, mode]);

  const ok = result && !("error" in result) ? result : null;
  const error = result && "error" in result ? result.error : null;

  return (
    <Shell labelledBy="nlr-title">
      <CalcHead>
        <Eyebrow>Free interactive tool</Eyebrow>
        <CalcTitle id="nlr-title">Neutrophil-to-lymphocyte ratio from your CBC with differential</CalcTitle>
      </CalcHead>

      <CalcInputs>
        <div>
          <Toggle
            legend="What your report shows"
            options={[
              { key: "abs", label: "Absolute counts" },
              { key: "pct", label: "Percentages (%)" },
            ]}
            value={mode}
            onChange={(v) => { setMode(v as "abs" | "pct"); setNeu(""); setLym(""); setWbc(""); }}
          />
        </div>

        {mode === "abs" ? (
          <Fields>
            <Field
              label="Absolute neutrophils (ANC)"
              unit="×10³/µL"
              placeholder="e.g. 3.6"
              value={neu}
              onChange={setNeu}
              inputId="nlr-neu"
              step="0.01"
            />
            <Field
              label="Absolute lymphocytes (ALC)"
              unit="×10³/µL"
              placeholder="e.g. 2.0"
              value={lym}
              onChange={setLym}
              inputId="nlr-lym"
              step="0.01"
            />
          </Fields>
        ) : (
          <Fields cols="3">
            <Field
              label="Neutrophils"
              unit="%"
              placeholder="e.g. 58"
              value={neu}
              onChange={setNeu}
              inputId="nlr-neu-pct"
              step="0.1"
              max={100}
            />
            <Field
              label="Lymphocytes"
              unit="%"
              placeholder="e.g. 31"
              value={lym}
              onChange={setLym}
              inputId="nlr-lym-pct"
              step="0.1"
              max={100}
            />
            <Field
              label="Total WBC, optional"
              unit="×10³/µL"
              placeholder="e.g. 6.2"
              value={wbc}
              onChange={setWbc}
              inputId="nlr-wbc"
              step="0.01"
            />
          </Fields>
        )}
      </CalcInputs>

      <CalcOutput>
        <ResultPanel active={!!ok}>
          {ok ? (
            <ResultBody>
              <ResultLabel>
                <span>Neutrophil-to-lymphocyte ratio</span> — <Chip tone={ok.band.tone}>{ok.band.name}</Chip>
              </ResultLabel>
              <div className={s.bigNumber}>{ok.ratio.toFixed(2)}</div>
              {ok.absN !== null && ok.absL !== null && (
                <div className={s.monoLine}>
                  Neutrophils {ok.absN} · lymphocytes {ok.absL} ×10³/µL
                </div>
              )}
              <RangeBar min={0} max={8} value={ok.raw} tone={ok.band.tone} zones={ZONES} />
              <p className={s.resultText}>{ok.band.description}</p>
            </ResultBody>
          ) : (
            <Empty>
              {error ??
                (mode === "abs"
                  ? "Enter the absolute neutrophil and lymphocyte counts from your CBC with differential. ×10³/µL and ×10⁹/L are the same number; if your report prints cells/µL (such as 3,600), the ratio is identical as long as both counts use the same unit."
                  : "Enter neutrophil % and lymphocyte % from the differential. The total WBC is not needed for the ratio, because both percentages are shares of the same total; add it only if you also want the absolute counts.")}
            </Empty>
          )}
        </ResultPanel>

        <Refs>
          <RefRow label="Below typical range" range="under 0.78" tone="warn" />
          <RefRow label="Typical adult range" range="0.78–3.53" tone="ok" />
          <RefRow label="Above typical range" range="above 3.53" tone="warn" />
        </Refs>
      </CalcOutput>

      <CalcFoot>
        <Footnote>
          Educational tool, not a diagnosis. NLR is a non-specific marker: infection, recent stress or poor sleep,
          hard exercise and steroid medicines can all move it, so one result describes one blood draw. The typical
          range comes from 413 healthy working adults aged 21 to 66 (Forget et al., BMC Research Notes 2017) and may
          not fit older adults, children or pregnancy. A high value with fever or feeling unwell, or a value far
          above the range, is worth discussing with a clinician promptly.
        </Footnote>
        <Cta />
      </CalcFoot>
    </Shell>
  );
}

/* Range bar scale (presentation only — mirrors the bands in band()). */
const ZONES: Zone[] = [
  { from: 0, to: 0.78, tone: "warn" },
  { from: 0.78, to: 3.53, tone: "ok" },
  { from: 3.53, to: 8, tone: "warn" },
];

function band(r: number): { name: string; tone: Tone; description: string } {
  if (r < 0.78) return {
    name: "Below typical range", tone: "warn",
    description:
      "Below the 0.78 to 3.53 range seen in healthy adults (Forget et al., 2017). A low ratio means few neutrophils relative to lymphocytes. It can reflect a naturally lower neutrophil count, such as the common Duffy-null pattern, or a temporary rise in lymphocytes, for example during a viral illness. Read it next to the absolute counts: if both are inside your lab's ranges, a low ratio on its own is rarely meaningful.",
  };
  if (r < 2.3) return {
    name: "Typical adult range", tone: "ok",
    description:
      "Inside the 0.78 to 3.53 range reported in healthy working adults, close to the averages in large studies (mean 1.65 in Forget et al., 2017; 2.15 across US adults in NHANES, Azab et al., 2014). It does not rule anything out on its own, but it is the pattern usually seen without active inflammation.",
  };
  if (r <= 3.53) return {
    name: "Typical adult range", tone: "ok",
    description:
      "Inside the healthy-adult range (0.78 to 3.53, Forget et al., 2017), in its upper part. Zahorec's 2021 review describes 2.3 to 3.0 as a grey zone that may reflect low-grade inflammation or stress, which is often temporary. Worth comparing with a later CBC rather than reading into one result.",
  };
  return {
    name: "Above typical range", tone: "warn",
    description:
      "Above the 3.53 upper limit seen in healthy adults (Forget et al., 2017); Zahorec's 2021 review treats values above 3.0 as abnormal. A raised NLR is associated with infection, physical stress, recent hard exercise and steroid medicines, and in research with inflammation in many chronic conditions. It is non-specific and not a diagnosis. With fever or symptoms, or a value far above the range, talk to a clinician promptly; otherwise a repeat CBC when you are well gives a fairer reading.",
  };
}
