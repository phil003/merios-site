"use client";

// NewsletterForm — v3 art direction, motion/react-free. Tone "dark" sits on a
// night stage (glass input, lime button, lime focus ring); tone "light" sits
// on white / fog (white input with a grid hairline, ink button, ink focus
// ring). Invalid states use soft-alert, never an alarm red; success is lime on
// night, forest on light. State swaps (label, icon, helper message) are keyed
// elements that remount with a CSS keyframe entrance. Reduced motion is
// honored by the global `@media (prefers-reduced-motion: reduce)` rule in
// globals.css. Every selector in the scoped styles is prefixed .nf-form.

import { useState } from "react";

// Supabase project — constants copied verbatim from src/components/Waitlist.tsx
// (same project, same anon key). Do not diverge.
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

type Tone = "dark" | "light";

type NewsletterFormProps = {
  /**
   * Analytics / attribution tag persisted alongside the signup row.
   * e.g. "early-access-us" or "early-access-rest".
   */
  source: string;
  /**
   * Color context. `dark` = ink background (canvas text),
   * `light` = canvas background (ink text). Defaults to `dark`.
   */
  tone?: Tone;
  /** Optional id override so both forms on the same page stay unique. */
  inputId?: string;
  /** CTA label override. Defaults to "Subscribe". */
  submitLabel?: string;
  /** Helper text shown when status is idle. */
  idleMessage?: string;
};

export default function NewsletterForm({
  source,
  tone = "dark",
  inputId = `newsletter-email-${source}`,
  submitLabel = "Subscribe",
  idleMessage = "One email a month. Signal over noise.",
}: NewsletterFormProps) {
  const [status, setStatus] = useState<Status>("idle");
  const [email, setEmail] = useState("");
  // Entrance animations only play after the first submit attempt so the
  // initial static content renders with zero animation (visible by default).
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading" || status === "success" || status === "duplicate")
      return;

    setHasSubmitted(true);

    const clean = email.trim().toLowerCase();
    if (!EMAIL_RE.test(clean)) {
      setStatus("invalid");
      return;
    }
    setStatus("loading");

    try {
      const res = await fetch(`${SUPABASE_URL}/rest/v1/newsletter_signups`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: SUPABASE_ANON_KEY,
          Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          Prefer: "return=minimal",
        },
        body: JSON.stringify({ email: clean, source }),
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
  const isLoading = status === "loading";
  const isSuccess = status === "success" || status === "duplicate";

  const message =
    status === "success"
      ? "Subscribed. We'll write when it matters."
      : status === "duplicate"
        ? "Already on the list. Thank you."
        : status === "error"
          ? "Something went wrong. Try again."
          : status === "invalid"
            ? "That email doesn't look right."
            : idleMessage;

  const isDark = tone === "dark";

  // Visual tone of the helper line: idle | error | success.
  const messageTone = isSuccess
    ? "success"
    : status === "error" || status === "invalid"
      ? "error"
      : "idle";

  const buttonLabel = isLoading
    ? "Sending"
    : status === "success"
      ? "Subscribed"
      : status === "duplicate"
        ? "On the list"
        : submitLabel;

  return (
    <form
      onSubmit={handleSubmit}
      className={`nf-form nf-form--${tone}`}
      data-status={status}
      noValidate
    >
      <label className="sr-only" htmlFor={inputId}>
        Email address
      </label>
      <input
        id={inputId}
        type="email"
        inputMode="email"
        autoComplete="email"
        placeholder="you@domain.com"
        value={email}
        disabled={locked || isLoading}
        onChange={(e) => {
          setEmail(e.target.value);
          if (status === "invalid" || status === "error") setStatus("idle");
        }}
        className="nf-input"
      />
      <button
        type="submit"
        disabled={locked || isLoading}
        aria-busy={isLoading || undefined}
        aria-live="polite"
        className={`btn ${isDark ? "btn-lime" : "btn-ink"} nf-submit`}
        data-state={isSuccess ? "success" : isLoading ? "loading" : "idle"}
      >
        {isLoading ? (
          <span
            key="loader"
            aria-hidden
            className="nf-spinner inline-block h-3.5 w-3.5 rounded-full border-2"
            style={{
              borderColor: "currentColor",
              borderRightColor: "transparent",
            }}
          />
        ) : isSuccess ? (
          <svg
            key="check"
            aria-hidden
            className="nf-pop"
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M20 6L9 17l-5-5" />
          </svg>
        ) : (
          <span
            key="dot"
            aria-hidden
            className="animate-pulse-dot nf-submit-dot inline-block h-1.5 w-1.5 rounded-full"
          />
        )}
        <span
          key={buttonLabel}
          className={hasSubmitted ? "nf-in" : undefined}
        >
          {buttonLabel}
        </span>
      </button>

      <p
        role={status === "error" || status === "invalid" ? "alert" : undefined}
        aria-live="polite"
        className="sr-only"
      >
        {message}
      </p>
      <div aria-hidden className="nf-msg">
        <p
          key={`${status}-${message}`}
          className={hasSubmitted ? "nf-in" : undefined}
          data-tone={messageTone}
        >
          {message}
        </p>
      </div>

      <style>{styles}</style>
    </form>
  );
}

// ─── Scoped styles ───────────────────────────────────────────────────────────
// Field look + keyframe entrances (replacing the previous AnimatePresence
// crossfades). The global prefers-reduced-motion rule in globals.css collapses
// the animations to 0.01ms / a single iteration.
const styles = `
.nf-form {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
  width: 100%;
}
/* input takes the row; the button wraps under it (full width) when the
   column is too narrow for both */
.nf-form .nf-input {
  flex: 999 1 220px;
  min-width: 0;
  height: 52px;
  margin: 0;
  padding: 0 18px;
  border-radius: 14px;
  font-family: var(--font-sans);
  font-size: 1rem;
  letter-spacing: -0.005em;
  -webkit-appearance: none;
  appearance: none;
  transition:
    border-color 300ms var(--ease-smooth),
    background-color 300ms var(--ease-smooth),
    box-shadow 300ms var(--ease-smooth);
}
.nf-form .nf-input:disabled {
  opacity: 0.6;
}
.nf-form .nf-submit {
  flex: 1 0 auto;
  cursor: pointer;
}
.nf-form .nf-submit:disabled {
  cursor: default;
  transform: none;
}
.nf-form .nf-submit[data-state="loading"] {
  opacity: 0.88;
}
.nf-form .nf-msg {
  flex: 1 1 100%;
  margin-top: 4px;
  overflow: hidden;
  font-family: var(--font-mono);
  font-size: 11px;
  letter-spacing: 0.08em;
  line-height: 1.5;
}
.nf-form .nf-msg p {
  margin: 0;
}

/* dark — on a night stage */
.nf-form--dark .nf-input {
  background: rgb(255 255 255 / 0.06);
  border: 1px solid var(--color-line-night);
  color: var(--color-on-night);
}
.nf-form--dark .nf-input::placeholder {
  color: rgb(244 246 247 / 0.55);
}
.nf-form--dark .nf-input:hover:not(:disabled):not(:focus) {
  border-color: rgb(255 255 255 / 0.3);
}
.nf-form--dark .nf-input:focus {
  outline: 2px solid var(--color-lime);
  outline-offset: 2px;
  border-color: rgb(255 255 255 / 0.4);
  background: rgb(255 255 255 / 0.09);
}
.nf-form--dark[data-status="invalid"] .nf-input {
  border-color: color-mix(in srgb, var(--color-peach) 70%, var(--color-soft-alert));
}
.nf-form--dark .nf-submit-dot {
  background: var(--color-ink);
}
.nf-form--dark .nf-submit[data-state="success"] {
  background: rgb(214 240 80 / 0.14);
  color: var(--color-lime);
  box-shadow: inset 0 0 0 1.5px rgb(214 240 80 / 0.5);
}
.nf-form--dark .nf-msg [data-tone="idle"] { color: var(--color-on-night-2); }
.nf-form--dark .nf-msg [data-tone="error"] { color: color-mix(in srgb, var(--color-peach) 88%, var(--color-soft-alert)); }
.nf-form--dark .nf-msg [data-tone="success"] { color: var(--color-lime); }

/* light — on white / fog */
.nf-form--light .nf-input {
  background: #FFFFFF;
  border: 1px solid var(--color-grid);
  color: var(--color-ink);
  box-shadow: 0 1px 2px rgb(16 35 26 / 0.04);
}
.nf-form--light .nf-input::placeholder {
  color: var(--color-ink-tertiary);
}
.nf-form--light .nf-input:hover:not(:disabled):not(:focus) {
  border-color: color-mix(in srgb, var(--color-ink) 28%, var(--color-grid));
}
.nf-form--light .nf-input:focus {
  outline: 2px solid var(--color-ink);
  outline-offset: 2px;
  border-color: var(--color-ink);
}
.nf-form--light[data-status="invalid"] .nf-input {
  border-color: var(--color-soft-alert);
  background: color-mix(in srgb, var(--color-soft-alert) 5%, #FFFFFF);
}
.nf-form--light .nf-submit-dot {
  background: var(--color-lime);
}
.nf-form--light .nf-submit[data-state="success"] {
  background: var(--color-green-deep);
  color: #FFFFFF;
  box-shadow: none;
}
.nf-form--light .nf-msg [data-tone="idle"] { color: var(--color-ink-tertiary); }
.nf-form--light .nf-msg [data-tone="error"] { color: var(--color-soft-alert); }
.nf-form--light .nf-msg [data-tone="success"] { color: var(--color-green-deep); }

@keyframes nf-in {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes nf-pop {
  from { opacity: 0; transform: scale(0.6); }
  to { opacity: 1; transform: scale(1); }
}
@keyframes nf-spin {
  to { transform: rotate(360deg); }
}
.nf-form .nf-in { animation: nf-in 300ms var(--ease-smooth) both; }
.nf-form .nf-pop { animation: nf-pop 300ms var(--ease-smooth) both; }
.nf-form .nf-spinner {
  animation: nf-pop 300ms var(--ease-smooth) both,
    nf-spin 0.9s linear infinite;
}
`;
