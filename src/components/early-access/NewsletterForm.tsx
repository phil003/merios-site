"use client";

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

  // Tone-aware color tokens. Copied logic pattern from Waitlist.tsx.
  const isDark = tone === "dark";
  const baseTextMuted = isDark
    ? "rgba(247,245,239,0.5)"
    : "var(--color-ink-tertiary)";
  const baseBorder = isDark
    ? "rgba(247,245,239,0.35)"
    : "rgba(14,20,18,0.22)";
  const inputColor = isDark ? "var(--color-canvas)" : "var(--color-ink)";
  const placeholderColor = isDark
    ? "rgba(247,245,239,0.45)"
    : "rgba(14,20,18,0.4)";

  const messageTone =
    status === "success" || status === "duplicate"
      ? "var(--color-pulse)"
      : status === "error" || status === "invalid"
        ? "var(--color-accent-warm)"
        : baseTextMuted;

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
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
        disabled={locked}
        onChange={(e) => {
          setEmail(e.target.value);
          if (status === "invalid" || status === "error") setStatus("idle");
        }}
        className="flex-1 bg-transparent py-3 text-base outline-none transition-colors disabled:opacity-60"
        style={
          {
            fontFamily: "var(--font-sans)",
            color: inputColor,
            borderBottom:
              status === "invalid"
                ? "1px solid var(--color-accent-warm)"
                : `1px solid ${baseBorder}`,
            "--placeholder-color": placeholderColor,
          } as React.CSSProperties
        }
        onFocus={(e) => {
          if (status !== "invalid")
            e.currentTarget.style.borderBottom =
              "1px solid var(--color-pulse)";
        }}
        onBlur={(e) => {
          if (status !== "invalid")
            e.currentTarget.style.borderBottom = `1px solid ${baseBorder}`;
        }}
      />
      <button
        type="submit"
        disabled={locked || status === "loading"}
        className="group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 transition-transform motion-reduce:transform-none hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-80"
        style={{
          background: locked ? "rgba(159,191,0,0.35)" : "var(--color-pulse)",
          color: "var(--color-ink)",
          fontFamily: "var(--font-sans)",
          fontSize: 13.5,
          fontWeight: 600,
          letterSpacing: "0.01em",
          boxShadow: locked
            ? "none"
            : "0 10px 28px -12px rgba(159,191,0,0.55)",
          cursor: locked ? "default" : "pointer",
        }}
      >
        <span
          aria-hidden
          className="animate-pulse-dot inline-block h-1.5 w-1.5 rounded-full"
          style={{ background: "var(--color-ink)" }}
        />
        {status === "loading"
          ? "Sending"
          : status === "success"
            ? "Subscribed"
            : status === "duplicate"
              ? "On the list"
              : submitLabel}
      </button>

      <p
        role={status === "error" || status === "invalid" ? "alert" : undefined}
        aria-live="polite"
        className="sr-only"
      >
        {message}
      </p>
      <p
        aria-hidden
        className="mt-1 basis-full"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.08em",
          color: messageTone,
        }}
      >
        {message}
      </p>
    </form>
  );
}
