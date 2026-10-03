"use client";

import { useState, useMemo } from "react";
import {
  Shell, CalcHead, Eyebrow, CalcTitle, CalcInputs, Controls, Fields, Field, Toggle, CalcOutput,
  ResultPanel, ResultBody, Empty, ResultLabel, Chip, RangeBar, Refs, RefRow, CalcFoot, Footnote, Cta,
  round, styles as s, type Tone, type Zone,
} from "./_shared";

/**
 * Free testosterone calculator — Vermeulen method.
 *
 * Vermeulen A, Verdonck L, Kaufman JM. "A critical evaluation of simple
 * methods for the estimation of free testosterone in serum."
 * J Clin Endocrinol Metab 1999;84(10):3666-3672.
 *
 * Law of mass action, solved as a quadratic:
 *   N  = 1 + Ka·[Albumin]
 *   a  = N · Kt
 *   b  = N + Kt·([SHBG] − [T])
 *   c  = −[T]
 *   FreeT = (−b + √(b² − 4ac)) / (2a)          (all concentrations in mol/L)
 *   BioavailableT = N · FreeT
 *
 * Two unit traps this implementation is written to avoid, because they are the
 * two things competing calculators get wrong:
 *   1. Albumin in g/dL vs g/L — a silent 10× error that still produces a
 *      plausible-looking result.
 *   2. Output units — pg/mL is what most US labs report for free T, and it is
 *      10× the ng/dL figure.
 */

const Kt = 1.0e9; // SHBG association constant, L/mol
const Ka = 3.6e4; // albumin association constant, L/mol
const MW_T = 288.4; // testosterone molar mass, g/mol
const MW_ALB = 66500; // albumin molar mass, g/mol
const NGDL_TO_NMOLL = 10 / MW_T; // ≈ 0.03467

export default function FreeTestosteroneCalculator() {
  const [totalT, setTotalT] = useState<string>("");
  const [shbg, setShbg] = useState<string>("");
  const [albumin, setAlbumin] = useState<string>("4.3");
  const [tUnit, setTUnit] = useState<"ngdl" | "nmoll">("ngdl");
  const [albUnit, setAlbUnit] = useState<"gdl" | "gl">("gdl");
  const [sex, setSex] = useState<"male" | "female">("male");

  const result = useMemo(() => {
    const tRaw = parseFloat(totalT);
    const sRaw = parseFloat(shbg);
    const aRaw = parseFloat(albumin);
    if (![tRaw, sRaw, aRaw].every((v) => Number.isFinite(v) && v > 0)) return null;

    const totalNmol = tUnit === "ngdl" ? tRaw * NGDL_TO_NMOLL : tRaw;
    const albGL = albUnit === "gdl" ? aRaw * 10 : aRaw;

    const T = totalNmol * 1e-9; // mol/L
    const S = sRaw * 1e-9; // mol/L
    const A = albGL / MW_ALB; // mol/L

    const N = 1 + Ka * A;
    const a = N * Kt;
    const b = N + Kt * (S - T);
    const c = -T;

    const disc = b * b - 4 * a * c;
    if (disc < 0) return null;
    const freeMol = (-b + Math.sqrt(disc)) / (2 * a);
    if (!Number.isFinite(freeMol) || freeMol <= 0) return null;

    const freeNmol = freeMol * 1e9;
    const freeNgdl = freeNmol / NGDL_TO_NMOLL;
    const freePgml = freeNgdl * 10;
    const bioNmol = N * freeNmol;
    const bioNgdl = bioNmol / NGDL_TO_NMOLL;
    const freePct = (freeNmol / totalNmol) * 100;
    const fai = (totalNmol / sRaw) * 100;

    return {
      freePgml: round(freePgml, 1),
      freeNgdl: round(freeNgdl, 2),
      freeNmol: round(freeNmol, 3),
      bioNgdl: round(bioNgdl, 0),
      bioNmol: round(bioNmol, 2),
      freePct: round(freePct, 2),
      fai: round(fai, 1),
      band: sex === "male" ? getMaleBand(freePgml) : null,
    };
  }, [totalT, shbg, albumin, tUnit, albUnit, sex]);

  return (
    <Shell labelledBy="free-t-calculator-title">
      <CalcHead>
        <Eyebrow>Free interactive tool — Vermeulen 1999</Eyebrow>
        <CalcTitle id="free-t-calculator-title">Free Testosterone Calculator</CalcTitle>
      </CalcHead>

      <CalcInputs>
        <Controls>
          <Toggle
            legend="Total T units"
            options={[
              { key: "ngdl", label: "ng/dL" },
              { key: "nmoll", label: "nmol/L" },
            ]}
            value={tUnit}
            onChange={(v) => setTUnit(v as "ngdl" | "nmoll")}
          />
          <Toggle
            legend="Albumin units"
            options={[
              { key: "gdl", label: "g/dL" },
              { key: "gl", label: "g/L" },
            ]}
            value={albUnit}
            onChange={(v) => {
              const next = v as "gdl" | "gl";
              setAlbUnit(next);
              setAlbumin((prev) => (prev === "4.3" && next === "gl" ? "43" : prev === "43" && next === "gdl" ? "4.3" : prev));
            }}
          />
          <Toggle
            legend="Reference range"
            options={[
              { key: "male", label: "Male" },
              { key: "female", label: "Female" },
            ]}
            value={sex}
            onChange={(v) => setSex(v as "male" | "female")}
          />
        </Controls>

        <Fields cols="3">
          <Field
            label="Total testosterone"
            unit={tUnit === "ngdl" ? "ng/dL" : "nmol/L"}
            placeholder={tUnit === "ngdl" ? "e.g. 550" : "e.g. 19"}
            value={totalT}
            onChange={setTotalT}
            inputId="ft-total"
          />
          <Field label="SHBG" unit="nmol/L" placeholder="e.g. 35" value={shbg} onChange={setShbg} inputId="ft-shbg" />
          <Field
            label="Albumin"
            unit={albUnit === "gdl" ? "g/dL" : "g/L"}
            placeholder={albUnit === "gdl" ? "4.3" : "43"}
            value={albumin}
            onChange={setAlbumin}
            inputId="ft-alb"
          />
        </Fields>
      </CalcInputs>

      <CalcOutput>
        <ResultPanel active={!!result}>
          {result ? (
            <ResultBody>
              <ResultLabel>
                <span>Free testosterone</span>
                {result.band ? (
                  <>
                    {" "}— <Chip tone={result.band.tone}>{result.band.name}</Chip>
                  </>
                ) : null}
              </ResultLabel>
              <div className={s.bigNumber}>
                {result.freePgml} <span className={s.unit}>pg/mL</span>
              </div>
              <div className={s.monoLine}>
                {result.freeNgdl} ng/dL · {result.freeNmol} nmol/L · {result.freePct}% of total
              </div>
              {result.band && (
                <RangeBar min={0} max={300} value={result.freePgml} tone={result.band.tone} zones={MALE_ZONES} />
              )}
              <div className={s.stats}>
                <Stat label="Bioavailable T" value={`${result.bioNgdl} ng/dL`} sub={`${result.bioNmol} nmol/L`} />
                <Stat label="Free androgen index" value={String(result.fai)} sub="total T ÷ SHBG × 100" />
              </div>
              {result.band && <p className={s.resultText}>{result.band.description}</p>}
              {!result.band && (
                <p className={s.resultText}>
                  Female reference ranges for free testosterone are highly assay- and lab-specific, so no verdict band is
                  shown. In women the <strong>free androgen index</strong>{" "}above is the more commonly used measure — an FAI
                  above roughly 5 is often used as a marker of biochemical hyperandrogenism, but interpret it against your
                  own lab&rsquo;s stated range.
                </p>
              )}
            </ResultBody>
          ) : (
            <Empty>
              Enter total testosterone, SHBG, and albumin from the same blood draw. If albumin was not measured, 4.3 g/dL
              (43 g/L) is the standard assumed value and is already filled in.
            </Empty>
          )}
        </ResultPanel>

        {sex === "male" && (
          <Refs>
            <RefRow label="Low" range="under 50 pg/mL" tone="bad" />
            <RefRow label="Low-normal" range="50–90 pg/mL" tone="warn" />
            <RefRow label="Mid-normal" range="90–150 pg/mL" tone="ok" />
            <RefRow label="Upper-normal" range="150–210 pg/mL" tone="ok" />
          </Refs>
        )}
      </CalcOutput>

      <CalcFoot>
        <Footnote>
          Educational tool, not a diagnosis. Calculated free testosterone by the Vermeulen equation is widely preferred to
          the direct analog immunoassay, which is known to be unreliable — but it is still an estimate, and reference
          ranges differ between laboratories and assays. Testosterone is also strongly diurnal: a morning draw is the
          standard. Interpret any result with the lab&rsquo;s own reference interval and with your physician.
        </Footnote>
        <Cta />
      </CalcFoot>
    </Shell>
  );
}

/* Range bar scale for the male bands, pg/mL (presentation only — mirrors getMaleBand). */
const MALE_ZONES: Zone[] = [
  { from: 0, to: 50, tone: "bad" },
  { from: 50, to: 90, tone: "warn" },
  { from: 90, to: 210, tone: "ok" },
  { from: 210, to: 300, tone: "warn" },
];

function getMaleBand(pgml: number): { name: string; tone: Tone; description: string } {
  if (pgml < 50)
    return {
      name: "Below typical adult male range",
      tone: "bad",
      description:
        "Below the range most labs report for adult men. Symptoms matter as much as the number here, and a single reading is not enough — testosterone varies by time of day and between draws. This is worth repeating on a morning sample and discussing with a physician.",
    };
  if (pgml < 90)
    return {
      name: "Low-normal",
      tone: "warn",
      description:
        "Inside most reference ranges but toward the bottom. If total testosterone looked normal while this sits low, high SHBG is usually the reason — which is exactly the situation calculated free testosterone exists to reveal.",
    };
  if (pgml <= 210)
    return {
      name: "Within typical adult male range",
      tone: "ok",
      description:
        "Within the range most laboratories report for adult men. Free testosterone tracks the fraction actually available to tissue, so it often explains symptoms better than total testosterone alone.",
    };
  return {
    name: "Above typical adult male range",
    tone: "warn",
    description:
      "Above the usual reported range. Common explanations include exogenous testosterone, a very low SHBG, or a sampling or unit-entry issue — check that SHBG and albumin were entered in the units shown.",
  };
}

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div className={s.stat}>
      <div className={s.statLabel}>{label}</div>
      <div className={s.statValue}>{value}</div>
      <div className={s.statSub}>{sub}</div>
    </div>
  );
}
