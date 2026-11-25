"use client";

import { useState, useMemo } from "react";
import {
  Shell, CalcHead, Eyebrow, CalcTitle, CalcInputs, Fields, Field, Toggle, CalcOutput, ResultPanel,
  ResultBody, Empty, ResultLabel, Chip, RangeBar, Refs, RefRow, CalcFoot, Footnote, Cta, round,
  styles as s, type Tone, type Zone,
} from "./_shared";

/**
 * AST/ALT ratio (De Ritis ratio) calculator.
 *
 *   AST/ALT ratio = AST (U/L) ÷ ALT (U/L)
 *   Both enzymes are reported in U/L (IU/L is the same number), so the unit
 *   cancels out. Named after Fernando De Ritis, who described it in 1957.
 *
 * Thresholds used for the bands (classic, widely cited cut-offs):
 *   - Below 1: ALT higher than AST, the usual pattern in many non-alcoholic
 *     causes of mild enzyme elevation (fatty liver / MASLD, viral hepatitis).
 *   - Above 1 in nonalcoholic chronic liver disease: associated with cirrhosis
 *     (Williams AL, Hoofnagle JH. Gastroenterology 1988;95:734-739).
 *   - Above 2: classically associated with alcohol-related liver disease
 *     (Cohen JA, Kaplan MM. Dig Dis Sci 1979;24:835-838). The ACG 2017 guideline
 *     (Kwo PY et al., Am J Gastroenterol 2017;112:18-35) flags AST above ALT in
 *     heavy drinkers but sets no diagnostic ratio cut-off.
 * AST is also found in muscle, heart and red blood cells, so exercise, muscle
 * injury and hemolysis can raise the ratio. The ratio is mostly informative
 * when at least one enzyme is elevated. The bands orient only; not a diagnosis.
 */
export default function AstAltRatioCalculator() {
  const [ast, setAst] = useState("");
  const [alt, setAlt] = useState("");
  const [range, setRange] = useState<"unsure" | "normal" | "high">("unsure");

  const result = useMemo(() => {
    const a = parseFloat(ast);
    const l = parseFloat(alt);
    if (!Number.isFinite(a) || !Number.isFinite(l) || a <= 0 || l <= 0) return null;
    if (a > 20000 || l > 20000) {
      return { error: "These values look unusually high for AST or ALT in U/L. Check the numbers and units on your report." };
    }
    const ratio = a / l;
    return { ratio: round(ratio, 2), raw: ratio, band: band(ratio) };
  }, [ast, alt]);

  const ok = result && !("error" in result) ? result : null;
  const error = result && "error" in result ? result.error : null;

  return (
    <Shell labelledBy="astalt-title">
      <CalcHead>
        <Eyebrow>Free interactive tool</Eyebrow>
        <CalcTitle id="astalt-title">AST/ALT ratio (De Ritis ratio) from your liver panel</CalcTitle>
      </CalcHead>

      <CalcInputs>
        <Fields>
          <Field
            label="AST (aspartate aminotransferase)"
            unit="U/L"
            placeholder="e.g. 28"
            value={ast}
            onChange={setAst}
            inputId="astalt-ast"
            step="1"
          />
          <Field
            label="ALT (alanine aminotransferase)"
            unit="U/L"
            placeholder="e.g. 35"
            value={alt}
            onChange={setAlt}
            inputId="astalt-alt"
            step="1"
          />
        </Fields>
        <div>
          <Toggle
            legend="Are AST and ALT inside your lab's reference range?"
            options={[
              { key: "normal", label: "Both in range" },
              { key: "high", label: "One or both high" },
              { key: "unsure", label: "Not sure" },
            ]}
            value={range}
            onChange={(v) => setRange(v as "unsure" | "normal" | "high")}
          />
        </div>
      </CalcInputs>

      <CalcOutput>
        <ResultPanel active={!!ok}>
          {ok ? (
            <ResultBody>
              <ResultLabel>
                <span>AST/ALT ratio</span>{" "}
                <Chip tone={range === "normal" ? "neutral" : ok.band.tone}>{ok.band.name}</Chip>
              </ResultLabel>
              <div className={s.bigNumber}>{ok.ratio.toFixed(2)}</div>
              <RangeBar min={0} max={4} value={ok.raw} tone={range === "normal" ? "neutral" : ok.band.tone} zones={ZONES} />
              {range === "normal" && (
                <p className={s.resultText}>
                  With both enzymes inside your lab&apos;s range, the ratio says little on its own: the classic
                  cut-offs were described in people with raised liver enzymes. A ratio away from 1 with normal
                  values is common and usually not a concern by itself.
                </p>
              )}
              <p className={s.resultText}>{ok.band.description}</p>
            </ResultBody>
          ) : (
            <Empty>
              {error ??
                "Enter AST and ALT from your liver panel or comprehensive metabolic panel (CMP). Both are reported in U/L (IU/L is the same number), so the ratio has no unit. Also called AST:ALT, SGOT/SGPT or the De Ritis ratio."}
            </Empty>
          )}
        </ResultPanel>

        <Refs>
          <RefRow label="AST lower than ALT" range="under 1" tone="ok" />
          <RefRow label="AST higher than ALT" range="1 to 2" tone="warn" />
          <RefRow label="AST more than twice ALT" range="above 2" tone="warn" />
        </Refs>
      </CalcOutput>

      <CalcFoot>
        <Footnote>
          Educational tool, not a diagnosis. The cut-offs of 1 and 2 come from studies of people with raised liver
          enzymes (Williams and Hoofnagle, Gastroenterology 1988; Cohen and Kaplan, Digestive Diseases and Sciences
          1979). AST also comes from
          muscle and red blood cells, so hard exercise, muscle injury or a hemolyzed sample can raise it. Reference
          ranges differ between labs. Talk to your clinician about any raised liver enzyme, whatever the ratio.
        </Footnote>
        <Cta />
      </CalcFoot>
    </Shell>
  );
}

/* Range bar scale (presentation only — mirrors the bands in band()). */
const ZONES: Zone[] = [
  { from: 0, to: 1, tone: "ok" },
  { from: 1, to: 2, tone: "warn" },
  { from: 2, to: 4, tone: "warn" },
];

function band(r: number): { name: string; tone: Tone; description: string } {
  if (r < 1) return {
    name: "AST lower than ALT", tone: "ok",
    description:
      "ALT is higher than AST. When liver enzymes are raised, this ALT-predominant pattern is the one usually seen in common non-alcoholic causes such as fatty liver disease (MASLD, formerly NAFLD) and viral hepatitis. A ratio below 1 does not rule out liver disease, and it does not tell you why an enzyme is high: that depends on how high the values are, how long they stay up and the rest of the panel.",
  };
  if (r <= 2) return {
    name: "AST at or above ALT", tone: "warn",
    description:
      "AST is equal to or higher than ALT. In people with nonalcoholic chronic liver disease, a ratio above 1 has been associated with cirrhosis (Williams and Hoofnagle, 1988). It is also common for reasons outside the liver: AST is found in muscle, heart and red blood cells, so a hard workout in the days before the draw, a muscle injury or a hemolyzed sample can push it up. If ALT is very low, a small AST can also produce a high ratio. Read it next to the absolute values and talk to your clinician if either enzyme is raised.",
  };
  return {
    name: "AST more than twice ALT", tone: "warn",
    description:
      "AST is more than twice ALT. With raised enzymes, a ratio above 2 is classically associated with alcohol-related liver disease (Cohen and Kaplan, 1979), and the American College of Gastroenterology's 2017 guideline lists AST higher than ALT as a clue to it. It is not specific: muscle injury, intense exercise and other conditions can produce the same pattern, and with a very low ALT the ratio can be high for purely arithmetic reasons. It is not a diagnosis. If one or both enzymes are raised, talk to your clinician, who can look at the full panel, your history and repeat testing.",
  };
}
