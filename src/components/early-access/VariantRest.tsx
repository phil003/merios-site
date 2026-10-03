"use client";

import { useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import NewsletterForm from "./NewsletterForm";

// Supabase project — constants copied verbatim from src/components/Waitlist.tsx.
const SUPABASE_URL = "https://ykcakhvmzebakodxmjpb.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrY2FraHZtemViYWtvZHhtanBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5NDEwODYsImV4cCI6MjA4NzUxNzA4Nn0.cpI9MFeTlr9p0d75R0jtiyCXu7HDiGB1fz2B8drkQ0A";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status =
  | "idle"
  | "invalid"
  | "loading"
  | "success"
  | "duplicate"
  | "error";

/**
 * Waitlist form — inserts into `public.waitlist`. Night-stage variant of the
 * shared Waitlist component, scoped to this page (styles: .ea-rest .wl-*).
 */
function WaitlistForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading" || status === "success" || status === "duplicate")
      return;

    const clean = email.trim().toLowerCase();
    if (!EMAIL_RE.test(clean)) {
      setStatus("invalid");
      return;
    }
    setStatus("loading");

    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/waitlist`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify({ email: clean }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else if (res.status === 409) {
        setStatus("duplicate");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const locked = status === "success" || status === "duplicate";

  const message =
    status === "success"
      ? "You're in. Check your inbox."
      : status === "duplicate"
        ? "Already on the list. Thank you."
        : status === "error"
          ? "Something went wrong. Try again."
          : status === "invalid"
            ? "That email doesn't look right."
            : "We only write when it's your turn.";

  // Visual tone of the helper line: idle | error | success.
  const messageTone =
    status === "success" || status === "duplicate"
      ? "success"
      : status === "error" || status === "invalid"
        ? "error"
        : "idle";

  return (
    <form
      onSubmit={handleSubmit}
      className="wl-form"
      data-status={status}
      noValidate
    >
      <label className="sr-only" htmlFor="ea-waitlist-email">
        Email address
      </label>
      <input
        id="ea-waitlist-email"
        type="email"
        inputMode="email"
        autoComplete="email"
        placeholder="you@domain.com"
        value={email}
        disabled={locked}
        onChange={(e) => {
          setEmail(e.target.value);
          if (status === "invalid" || status === "error") setStatus("idle");
        }}
        className="wl-input"
      />
      <button
        type="submit"
        disabled={locked || status === "loading"}
        className="btn btn-lime wl-submit"
        data-state={locked ? "locked" : status}
      >
        <span
          aria-hidden
          className="animate-pulse-dot wl-submit-dot inline-block h-1.5 w-1.5 rounded-full"
        />
        {status === "loading"
          ? "Sending"
          : status === "success"
            ? "You're in"
            : status === "duplicate"
              ? "On the list"
              : "Join waitlist"}
      </button>

      <p
        role={status === "error" || status === "invalid" ? "alert" : undefined}
        aria-live="polite"
        className="wl-msg"
        data-tone={messageTone}
      >
        {message}
      </p>
    </form>
  );
}

// Headline words rise out of a mask (the PageHero .ph-word / .ph-char CSS
// keyframes — plays at parse time, no JS). Word-level so the H1 text stays
// exactly "Globally, almost here." in the server HTML.
function Rise({ d, children }: { d: number; children: ReactNode }) {
  return (
    <span className="ph-word">
      <span className="ph-char" style={{ "--ph-d": `${d}s` } as CSSProperties}>
        {children}
      </span>
    </span>
  );
}

// 3 benefits rendered below the newsletter form — data-rv scroll reveal with
// 80ms of stagger between each (within the 100ms cap).
const NEWSLETTER_BENEFITS = [
  "Monthly dispatch, no filler",
  "Early word on new regions & labs",
  "Unsubscribe in one click",
] as const;

const CARD_EYEBROW_STYLE: CSSProperties = {
  color: "var(--color-on-night-2)",
};

const CARD_TITLE_STYLE: CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: "clamp(1.75rem, 1.3rem + 1.25vw, 2.35rem)",
  fontWeight: 740,
  lineHeight: 1.02,
  letterSpacing: "-0.035em",
  color: "var(--color-on-night)",
  textWrap: "balance",
};

// Body copy on the glass cards is lifted above on-night-2 so it keeps AAA
// contrast over the frosted surface.
const CARD_BODY_STYLE: CSSProperties = {
  fontFamily: "var(--font-sans)",
  fontSize: "0.98rem",
  lineHeight: 1.55,
  color: "rgb(244 246 247 / 0.8)",
};

export default function VariantRest() {
  return (
    <main className="ea-rest">
      <section
        className="night relative overflow-hidden"
        data-nav="dark"
        aria-label="Join the Merios waitlist"
        style={{
          paddingTop: "clamp(136px, 15vw, 188px)",
          paddingBottom: "clamp(128px, 12vw, 176px)",
          // the night footer follows directly: a hairline marks the hand-off
          borderBottom: "1px solid var(--color-line-night)",
        }}
      >
        {/* Ambient light — slow 8s CSS loops, opacity capped low. Static
            fallbacks show under reduced-motion; the animated layers are
            hidden there (motion-reduce / motion-safe variants). */}
        <div
          aria-hidden
          className="pointer-events-none absolute top-0 right-0 h-[70%] w-[60%] motion-safe:hidden"
          style={{
            background:
              "radial-gradient(closest-side at 64% 36%, rgb(214 240 80 / 0.07), transparent)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 h-[70%] w-[60%] motion-safe:hidden"
          style={{
            background:
              "radial-gradient(closest-side at 36% 64%, rgb(169 212 255 / 0.07), transparent)",
          }}
        />
        <div
          aria-hidden
          className="ea-rest-drift-a pointer-events-none absolute top-0 right-0 h-[90%] w-[75%] motion-reduce:hidden"
          style={{
            background:
              "radial-gradient(closest-side at 64% 38%, rgb(214 240 80 / 0.1), transparent)",
            willChange: "transform, opacity",
          }}
        />
        <div
          aria-hidden
          className="ea-rest-drift-b pointer-events-none absolute bottom-0 left-0 h-[90%] w-[75%] motion-reduce:hidden"
          style={{
            background:
              "radial-gradient(closest-side at 36% 62%, rgb(169 212 255 / 0.09), transparent)",
            willChange: "transform, opacity",
          }}
        />

        <div className="relative z-[1] mx-auto max-w-[1180px] px-[var(--spacing-container)]">
          {/* Editorial header */}
          <div className="mx-auto max-w-[820px] text-center">
            <div
              className="he label"
              style={{ color: "var(--color-on-night-2)" }}
            >
              <span aria-hidden className="label-dot animate-pulse-dot" />
              <span>Coming to your country soon</span>
            </div>

            <h1
              className="display mt-7"
              style={{
                fontSize: "var(--text-display-l)",
                color: "var(--color-on-night)",
              }}
            >
              <Rise d={0.06}>Globally,</Rise>
              <br />
              <Rise d={0.16}>almost</Rise> <Rise d={0.24}>here.</Rise>
            </h1>

            <p
              className="he mx-auto mt-7 max-w-[560px]"
              style={
                {
                  "--he-d": "0.3s",
                  fontFamily: "var(--font-sans)",
                  fontSize: "var(--text-body-l)",
                  lineHeight: 1.5,
                  letterSpacing: "-0.01em",
                  color: "var(--color-on-night-2)",
                  textWrap: "pretty",
                } as CSSProperties
              }
            >
              Merios is rolling out beyond the US. Join the waitlist for
              priority access, or read our monthly dispatch on what we&rsquo;re
              building.
            </p>
          </div>

          {/* Two glass cards — side by side on desktop, stacked on mobile */}
          <div className="mx-auto mt-14 grid max-w-[980px] grid-cols-1 gap-4 md:mt-20 md:grid-cols-2 md:gap-5">
            {/* Waitlist card */}
            <div
              className="glass ea-card he"
              style={{ "--he-d": "0.4s" } as CSSProperties}
            >
              <p className="label" style={CARD_EYEBROW_STYLE}>
                <span aria-hidden className="label-dot" />
                Priority access
              </p>

              <h2 className="mt-5" style={CARD_TITLE_STYLE}>
                Get priority access
              </h2>

              <p className="mt-3" style={CARD_BODY_STYLE}>
                First in line when Merios opens in your region. We&rsquo;ll
                write once — when it&rsquo;s your turn.
              </p>

              <div className="mt-8">
                <WaitlistForm />
              </div>

              {/* Decorative: a lime signal spreading out, region by region
                  (fills the card's spare height on two-column layouts) */}
              <span aria-hidden className="ea-signal">
                <span />
                <span />
                <span />
              </span>
            </div>

            {/* Newsletter card */}
            <div
              className="glass ea-card he"
              style={{ "--he-d": "0.48s" } as CSSProperties}
            >
              <p className="label" style={CARD_EYEBROW_STYLE}>
                <span aria-hidden className="label-dot" />
                Newsletter
              </p>

              <h2 className="mt-5" style={CARD_TITLE_STYLE}>
                Read Merios monthly
              </h2>

              <p className="mt-3" style={CARD_BODY_STYLE}>
                A monthly dispatch on biomarkers, longevity science, and how
                the product is evolving.
              </p>

              <div className="mt-8">
                <NewsletterForm
                  source="early-access-rest"
                  tone="dark"
                  idleMessage="One email a month. Unsubscribe anytime."
                  submitLabel="Subscribe"
                />
                {/* Micro-copy under the CTA — tone-adapted for the night */}
                <p
                  className="mt-3"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.06em",
                    lineHeight: 1.5,
                    color: "var(--color-on-night-2)",
                  }}
                >
                  No spam. Unsubscribe in 1 click.
                </p>
              </div>

              {/* 3 benefits — data-rv scroll reveal, 80ms stagger. Content is
                  visible by default; globals.css + the layout observer drive
                  the animation (and skip it under reduced-motion). */}
              <ul
                className="mt-7 space-y-3 border-t pt-6"
                style={{ borderColor: "var(--color-line-night)" }}
              >
                {NEWSLETTER_BENEFITS.map((benefit, index) => (
                  <li
                    key={benefit}
                    data-rv=""
                    className="flex items-start gap-3"
                    style={
                      {
                        fontFamily: "var(--font-sans)",
                        fontSize: "0.9375rem",
                        lineHeight: 1.5,
                        color: "rgb(244 246 247 / 0.8)",
                        "--rv-delay": `${(0.05 + index * 0.08).toFixed(2)}s`,
                      } as CSSProperties
                    }
                  >
                    <span
                      aria-hidden
                      className="mt-[0.5em] inline-block h-1.5 w-1.5 flex-none rounded-full"
                      style={{
                        background: "var(--color-lime)",
                        boxShadow: "0 0 10px rgb(214 240 80 / 0.7)",
                      }}
                    />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* The logo's heartbeat as the stage's horizon */}
        <svg
          className="v3-hero__pulse"
          aria-hidden
          focusable="false"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id="ea-rest-pulse-fade" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="0.45" stopColor="#FFFFFF" stopOpacity="0.2" />
              <stop offset="1" stopColor="#FFFFFF" stopOpacity="0.45" />
            </linearGradient>
          </defs>
          <path
            d="M0 60 H1090 L1104 72 L1122 18 L1146 108 L1160 60 H1300"
            fill="none"
            stroke="url(#ea-rest-pulse-fade)"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <span className="v3-hero__dot" aria-hidden />
      </section>

      <style>{styles}</style>
    </main>
  );
}

// ─── Scoped styles ───────────────────────────────────────────────────────────
// Ambient drift keyframes (each timeline folds the original rotate / x /
// opacity tracks into one set; hidden under reduced-motion via
// motion-reduce:hidden), the glass cards and the waitlist form. Every
// selector is prefixed .ea-rest so nothing leaks to other routes.
const styles = `
@keyframes eaRestDriftA {
  0% { transform: translateX(0) rotate(0deg); opacity: 0.8; }
  25% { transform: translateX(-1.5%) rotate(6deg); opacity: 0.9; }
  50% { transform: translateX(0) rotate(0deg); opacity: 1; }
  75% { transform: translateX(1.5%) rotate(-6deg); opacity: 0.9; }
  100% { transform: translateX(0) rotate(0deg); opacity: 0.8; }
}
@keyframes eaRestDriftB {
  0% { transform: translateX(0) rotate(0deg); opacity: 0.85; }
  25% { transform: translateX(1.5%) rotate(-6deg); opacity: 0.925; }
  50% { transform: translateX(0) rotate(0deg); opacity: 1; }
  75% { transform: translateX(-1.5%) rotate(6deg); opacity: 0.925; }
  100% { transform: translateX(0) rotate(0deg); opacity: 0.85; }
}
.ea-rest .ea-rest-drift-a {
  animation: eaRestDriftA 8s linear infinite;
}
.ea-rest .ea-rest-drift-b {
  animation: eaRestDriftB 8s linear 1.2s infinite backwards;
}

.ea-rest .ea-card {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: clamp(26px, 3.2vw, 40px);
  border-radius: clamp(24px, 2.6vw, 30px);
}

.ea-rest .ea-signal {
  display: none;
}
@media (min-width: 768px) {
  .ea-rest .ea-signal {
    display: block;
    position: absolute;
    right: clamp(24px, 3vw, 38px);
    bottom: clamp(24px, 3vw, 38px);
    width: 128px;
    height: 128px;
    pointer-events: none;
  }
}
.ea-rest .ea-signal::before {
  content: "";
  position: absolute;
  left: 50%;
  top: 50%;
  width: 10px;
  height: 10px;
  margin: -5px 0 0 -5px;
  border-radius: 999px;
  background: var(--color-lime);
  box-shadow: 0 0 14px rgb(214 240 80 / 0.9);
}
.ea-rest .ea-signal > span {
  position: absolute;
  inset: 0;
  border-radius: 999px;
  border: 1.5px solid rgb(214 240 80 / 0.78);
  opacity: 0;
  animation: eaSignal 3.6s cubic-bezier(0.2, 0.6, 0.35, 1) infinite;
}
.ea-rest .ea-signal > span:nth-child(2) { animation-delay: 1.2s; }
.ea-rest .ea-signal > span:nth-child(3) { animation-delay: 2.4s; }
@keyframes eaSignal {
  0% { transform: scale(0.1); opacity: 0; }
  12% { opacity: 0.9; }
  70% { opacity: 0.3; }
  100% { transform: scale(1); opacity: 0; }
}
@media (prefers-reduced-motion: reduce) {
  .ea-rest .ea-signal > span { animation: none; }
  .ea-rest .ea-signal > span:nth-child(1) { transform: scale(0.36); opacity: 0.55; }
  .ea-rest .ea-signal > span:nth-child(2) { transform: scale(0.68); opacity: 0.32; }
  .ea-rest .ea-signal > span:nth-child(3) { transform: scale(1); opacity: 0.16; }
}

/* Waitlist form — same anatomy as the dark NewsletterForm */
.ea-rest .wl-form {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  width: 100%;
}
.ea-rest .wl-input {
  flex: 999 1 220px;
  min-width: 0;
  height: 52px;
  margin: 0;
  padding: 0 18px;
  border-radius: 14px;
  border: 1px solid var(--color-line-night);
  background: rgb(255 255 255 / 0.06);
  color: var(--color-on-night);
  font-family: var(--font-sans);
  font-size: 1rem;
  letter-spacing: -0.005em;
  -webkit-appearance: none;
  appearance: none;
  transition:
    border-color 300ms var(--ease-smooth),
    background-color 300ms var(--ease-smooth);
}
.ea-rest .wl-input::placeholder {
  color: rgb(244 246 247 / 0.55);
}
.ea-rest .wl-input:hover:not(:disabled):not(:focus) {
  border-color: rgb(255 255 255 / 0.3);
}
.ea-rest .wl-input:focus {
  outline: 2px solid var(--color-lime);
  outline-offset: 2px;
  border-color: rgb(255 255 255 / 0.4);
  background: rgb(255 255 255 / 0.09);
}
.ea-rest .wl-input:disabled {
  opacity: 0.6;
}
.ea-rest .wl-form[data-status="invalid"] .wl-input {
  border-color: color-mix(in srgb, var(--color-peach) 70%, var(--color-soft-alert));
}
.ea-rest .wl-submit {
  flex: 1 0 auto;
  cursor: pointer;
}
.ea-rest .wl-submit:disabled {
  cursor: default;
  transform: none;
}
.ea-rest .wl-submit[data-state="loading"] {
  opacity: 0.88;
}
.ea-rest .wl-submit[data-state="locked"] {
  background: rgb(214 240 80 / 0.14);
  color: var(--color-lime);
  box-shadow: inset 0 0 0 1.5px rgb(214 240 80 / 0.5);
}
.ea-rest .wl-submit-dot {
  background: var(--color-ink);
}
.ea-rest .wl-submit[data-state="locked"] .wl-submit-dot {
  background: var(--color-lime);
}
.ea-rest .wl-msg {
  flex: 1 1 100%;
  margin: 4px 0 0;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  line-height: 1.5;
}
.ea-rest .wl-msg[data-tone="idle"] { color: var(--color-on-night-2); }
.ea-rest .wl-msg[data-tone="error"] { color: color-mix(in srgb, var(--color-peach) 88%, var(--color-soft-alert)); }
.ea-rest .wl-msg[data-tone="success"] { color: var(--color-lime); }
`;
