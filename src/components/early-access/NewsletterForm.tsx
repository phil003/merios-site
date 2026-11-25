"use client";

// NewsletterForm — Open Sky (v2). Tone "dark" sits on the ink block (glass
// field, white pill, white focus ring); tone "light" sits on a white card
// (haze-tinted field, ink pill, #3550A8 focus ring). The label is visible
// above the field. Invalid states use apricot / peach, never an alarm red;
// success is sky on ink, link blue on light. State swaps (label, icon,
// helper message) are keyed elements that remount with a CSS keyframe
// entrance, only after the first submit. Reduced motion is honoured by the
// global `@media (prefers-reduced-motion: reduce)` rule in globals.css.
// Styles: ./forms.module.css (shared with the waitlist form).

import { useState } from "react";
import styles from "./forms.module.css";

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
      className={`${styles.form} ${isDark ? styles.dark : styles.light}`}
      data-status={status}
      noValidate
    >
      <label className={styles.fieldLabel} htmlFor={inputId}>
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
        aria-invalid={status === "invalid" || undefined}
        onChange={(e) => {
          setEmail(e.target.value);
          if (status === "invalid" || status === "error") setStatus("idle");
        }}
        className={styles.input}
      />
      <button
        type="submit"
        disabled={locked || isLoading}
        aria-busy={isLoading || undefined}
        aria-live="polite"
        className={`btn ${isDark ? "btn-lime" : "btn-ink"} ${styles.submit}`}
        data-state={isSuccess ? "success" : isLoading ? "loading" : "idle"}
      >
        <span
          key={buttonLabel}
          className={hasSubmitted ? styles.in : undefined}
        >
          {buttonLabel}
        </span>
        {isLoading ? (
          <span key="loader" aria-hidden className={styles.spinner} />
        ) : isSuccess ? (
          <svg
            key="check"
            aria-hidden
            className={`${styles.icon} ${styles.pop}`}
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
          <span key="arrow" aria-hidden className="btn-arrow">
            →
          </span>
        )}
      </button>

      <p
        role={status === "error" || status === "invalid" ? "alert" : undefined}
        aria-live="polite"
        className="sr-only"
      >
        {message}
      </p>
      <div aria-hidden className={styles.msg}>
        <p
          key={`${status}-${message}`}
          className={hasSubmitted ? styles.in : undefined}
          data-tone={messageTone}
        >
          {message}
        </p>
      </div>
    </form>
  );
}
