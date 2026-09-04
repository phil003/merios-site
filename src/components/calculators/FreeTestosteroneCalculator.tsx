"use client";

import { useState, useMemo } from "react";

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
    <section
      aria-labelledby="free-t-calculator-title"
      style={{
        background: "var(--color-canvas-alt, #ffffff)",
        border: "1px solid var(--color-grid)",
        borderRadius: "16px",
        padding: "1.75rem 1.5rem",
        margin: "2rem 0",
      }}
    >
      <div style={eyebrow}>Free interactive tool — Vermeulen 1999</div>
      <h2 id="free-t-calculator-title" style={h2}>
        Free Testosterone Calculator
      </h2>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "1.25rem", marginBottom: "1.1rem" }}>
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
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1rem", marginBottom: "1.25rem" }}>
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
      </div>

      <div
        aria-live="polite"
        style={{
          padding: "1.25rem",
          borderRadius: "10px",
          background: result?.band ? result.band.bg : "color-mix(in srgb, var(--color-grid) 30%, var(--color-canvas))",
          border: result?.band ? `1px solid ${result.band.border}` : "1px solid transparent",
          transition: "background 220ms ease, border-color 220ms ease",
        }}
      >
        {result ? (
          <>
            <div style={{ ...resLabel, color: result.band ? result.band.label : "var(--color-green-deep)" }}>
              Free testosterone{result.band ? ` — ${result.band.name}` : ""}
            </div>
            <div style={bigNum}>
              {result.freePgml} <span style={{ fontSize: "1.15rem", letterSpacing: 0 }}>pg/mL</span>
            </div>
            <div style={{ ...resText, marginTop: "0.5rem", fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}>
              {result.freeNgdl} ng/dL · {result.freeNmol} nmol/L · {result.freePct}% of total
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px,1fr))", gap: "0.75rem", marginTop: "1rem" }}>
              <Stat label="Bioavailable T" value={`${result.bioNgdl} ng/dL`} sub={`${result.bioNmol} nmol/L`} />
              <Stat label="Free androgen index" value={String(result.fai)} sub="total T ÷ SHBG × 100" />
            </div>
            {result.band && <p style={resText}>{result.band.description}</p>}
            {!result.band && (
              <p style={resText}>
                Female reference ranges for free testosterone are highly assay- and lab-specific, so no verdict band is
                shown. In women the <strong>free androgen index</strong> above is the more commonly used measure — an FAI
                above roughly 5 is often used as a marker of biochemical hyperandrogenism, but interpret it against your
                own lab&rsquo;s stated range.
              </p>
            )}
          </>
        ) : (
          <p style={empty}>
            Enter total testosterone, SHBG, and albumin from the same blood draw. If albumin was not measured, 4.3 g/dL
            (43 g/L) is the standard assumed value and is already filled in.
          </p>
        )}
      </div>

      {sex === "male" && (
        <div style={{ marginTop: "1.25rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
          <RefRow label="Low" range="under 50 pg/mL" tone="bad" />
          <RefRow label="Low-normal" range="50–90 pg/mL" tone="warn" />
          <RefRow label="Mid-normal" range="90–150 pg/mL" tone="ok" />
          <RefRow label="Upper-normal" range="150–210 pg/mL" tone="ok" />
        </div>
      )}

      <p style={footnote}>
        Educational tool, not a diagnosis. Calculated free testosterone by the Vermeulen equation is widely preferred to
        the direct analog immunoassay, which is known to be unreliable — but it is still an estimate, and reference
        ranges differ between laboratories and assays. Testosterone is also strongly diurnal: a morning draw is the
        standard. Interpret any result with the lab&rsquo;s own reference interval and with your physician.
      </p>

      <div style={{ marginTop: "1.25rem" }}>
        <a href="/early-access" style={cta}>
          Track this in Merios →
        </a>
      </div>
    </section>
  );
}

function round(v: number, d: number) {
  const f = Math.pow(10, d);
  return Math.round(v * f) / f;
}

function getMaleBand(pgml: number) {
  if (pgml < 50)
    return {
      name: "Below typical adult male range",
      label: "#A12C2C",
      bg: "color-mix(in srgb, #D24343 14%, var(--color-canvas))",
      border: "color-mix(in srgb, #D24343 32%, transparent)",
      description:
        "Below the range most labs report for adult men. Symptoms matter as much as the number here, and a single reading is not enough — testosterone varies by time of day and between draws. This is worth repeating on a morning sample and discussing with a physician.",
    };
  if (pgml < 90)
    return {
      name: "Low-normal",
      label: "#8E5F1A",
      bg: "color-mix(in srgb, var(--color-warm, #C4882F) 16%, var(--color-canvas))",
      border: "color-mix(in srgb, var(--color-warm, #C4882F) 32%, transparent)",
      description:
        "Inside most reference ranges but toward the bottom. If total testosterone looked normal while this sits low, high SHBG is usually the reason — which is exactly the situation calculated free testosterone exists to reveal.",
    };
  if (pgml <= 210)
    return {
      name: "Within typical adult male range",
      label: "var(--color-green-deep)",
      bg: "color-mix(in srgb, var(--color-pulse) 12%, var(--color-canvas))",
      border: "color-mix(in srgb, var(--color-pulse) 30%, transparent)",
      description:
        "Within the range most laboratories report for adult men. Free testosterone tracks the fraction actually available to tissue, so it often explains symptoms better than total testosterone alone.",
    };
  return {
    name: "Above typical adult male range",
    label: "#8E5F1A",
    bg: "color-mix(in srgb, var(--color-warm, #C4882F) 16%, var(--color-canvas))",
    border: "color-mix(in srgb, var(--color-warm, #C4882F) 32%, transparent)",
    description:
      "Above the usual reported range. Common explanations include exogenous testosterone, a very low SHBG, or a sampling or unit-entry issue — check that SHBG and albumin were entered in the units shown.",
  };
}

/* ── shared UI ───────────────────────────────────────────────────────────── */

const eyebrow: React.CSSProperties = {
  fontFamily: "var(--font-mono)", fontSize: "10.5px", letterSpacing: "0.2em", textTransform: "uppercase",
  color: "var(--color-green-deep)", fontWeight: 500, marginBottom: "0.5rem",
};
const h2: React.CSSProperties = {
  fontFamily: "var(--font-serif)", fontSize: "1.75rem", lineHeight: 1.15, letterSpacing: "-0.02em",
  color: "var(--color-ink)", marginBottom: "1.25rem", fontWeight: 400,
};
const resLabel: React.CSSProperties = {
  fontFamily: "var(--font-mono)", fontSize: "10.5px", letterSpacing: "0.18em", textTransform: "uppercase",
  fontWeight: 600, marginBottom: "0.4rem",
};
const bigNum: React.CSSProperties = {
  fontFamily: "var(--font-serif)", fontSize: "2.75rem", lineHeight: 1, letterSpacing: "-0.03em", color: "var(--color-ink)",
};
const resText: React.CSSProperties = {
  fontFamily: "var(--font-sans)", fontSize: "0.9375rem", lineHeight: 1.5, marginTop: "0.75rem", color: "var(--color-ink-secondary)",
};
const empty: React.CSSProperties = {
  fontFamily: "var(--font-sans)", fontSize: "0.9375rem", lineHeight: 1.5, color: "var(--color-ink-tertiary)", margin: 0,
};
const footnote: React.CSSProperties = {
  fontFamily: "var(--font-sans)", fontSize: "0.8125rem", color: "var(--color-ink-tertiary)", marginTop: "1rem", lineHeight: 1.5,
};
const cta: React.CSSProperties = {
  fontFamily: "var(--font-mono)", fontSize: "12.5px", letterSpacing: "0.16em", textTransform: "uppercase",
  background: "var(--color-green-deep)", color: "var(--color-canvas)", padding: "12px 18px", borderRadius: "8px",
  textDecoration: "none", display: "inline-block",
};

function Toggle({
  legend, options, value, onChange,
}: {
  legend: string;
  options: { key: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <fieldset style={{ border: 0, padding: 0, margin: 0 }}>
      <legend
        style={{
          fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase",
          color: "var(--color-ink-tertiary)", marginBottom: "0.4rem", padding: 0,
        }}
      >
        {legend}
      </legend>
      <div style={{ display: "flex", gap: "0.4rem" }}>
        {options.map((o) => {
          const active = o.key === value;
          return (
            <button
              key={o.key}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(o.key)}
              style={{
                fontFamily: "var(--font-mono)", fontSize: "11px", letterSpacing: "0.1em", textTransform: "uppercase",
                padding: "6px 11px", borderRadius: "7px", cursor: "pointer",
                border: `1px solid ${active ? "var(--color-green-deep)" : "var(--color-grid)"}`,
                background: active ? "var(--color-green-deep)" : "transparent",
                color: active ? "var(--color-canvas)" : "var(--color-ink-secondary)",
              }}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub: string }) {
  return (
    <div style={{ borderLeft: "2px solid var(--color-grid)", paddingLeft: "0.7rem" }}>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: "9.5px", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--color-ink-tertiary)" }}>
        {label}
      </div>
      <div style={{ fontFamily: "var(--font-mono)", fontSize: "1.05rem", fontWeight: 600, color: "var(--color-ink)", marginTop: "0.15rem" }}>
        {value}
      </div>
      <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", color: "var(--color-ink-tertiary)" }}>{sub}</div>
    </div>
  );
}

function Field({
  label, unit, placeholder, value, onChange, inputId,
}: {
  label: string; unit: string; placeholder: string; value: string; onChange: (v: string) => void; inputId: string;
}) {
  return (
    <label htmlFor={inputId} style={{ display: "block" }}>
      <span
        style={{
          fontFamily: "var(--font-mono)", fontSize: "10.5px", letterSpacing: "0.18em", textTransform: "uppercase",
          color: "var(--color-ink-tertiary)", fontWeight: 500, display: "block", marginBottom: "0.4rem",
        }}
      >
        {label} <span style={{ color: "var(--color-ink-tertiary)" }}>({unit})</span>
      </span>
      <input
        id={inputId}
        type="number"
        inputMode="decimal"
        min={0}
        step="0.1"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: "100%", padding: "0.75rem 0.85rem", fontFamily: "var(--font-mono)", fontSize: "1rem",
          color: "var(--color-ink)", background: "var(--color-canvas)", border: "1px solid var(--color-grid)",
          borderRadius: "8px", outline: "none",
        }}
      />
    </label>
  );
}

function RefRow({ label, range, tone }: { label: string; range: string; tone: "ok" | "warn" | "bad" }) {
  const dot = tone === "ok" ? "var(--color-pulse)" : tone === "warn" ? "var(--color-warm, #C4882F)" : "#D24343";
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: "0.5rem", fontFamily: "var(--font-sans)", fontSize: "0.875rem" }}>
      <span aria-hidden style={{ width: "8px", height: "8px", borderRadius: "50%", background: dot, flexShrink: 0, alignSelf: "center" }} />
      <span style={{ color: "var(--color-ink)" }}>{label}</span>
      <span style={{ color: "var(--color-ink-tertiary)", fontFamily: "var(--font-mono)", fontSize: "0.8125rem", marginLeft: "auto" }}>{range}</span>
    </div>
  );
}
