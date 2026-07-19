"use client";

// NewsletterForm — motion/react-free. State swaps (label, icon, helper
// message) are keyed elements that remount with a CSS keyframe entrance;
// border / background / shadow changes ride plain CSS transitions, and the
// hover lift is a Tailwind `motion-safe:` utility. Reduced motion is honored
// by the global `@media (prefers-reduced-motion: reduce)` rule in globals.css.

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
  const [isFocused, setIsFocused] = useState(false);
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

  // Derived border color by visual state (idle | focus | loading | success | invalid).
  const borderColor =
    status === "invalid"
      ? "var(--color-accent-warm)"
      : isSuccess
        ? "var(--color-pulse)"
        : isFocused || isLoading
          ? "var(--color-pulse)"
          : baseBorder;

  const messageTone =
    isSuccess
      ? "var(--color-pulse)"
      : status === "error" || status === "invalid"
        ? "var(--color-accent-warm)"
        : baseTextMuted;

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
        disabled={locked || isLoading}
        onChange={(e) => {
          setEmail(e.target.value);
          if (status === "invalid" || status === "error") setStatus("idle");
        }}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="flex-1 bg-transparent py-3 text-base outline-none disabled:opacity-60"
        style={
          {
            fontFamily: "var(--font-sans)",
            color: inputColor,
            "--placeholder-color": placeholderColor,
            borderBottom: `1px solid ${borderColor}`,
            transition: "border-color 300ms cubic-bezier(0.22, 1, 0.36, 1)",
          } as React.CSSProperties
        }
      />
      <button
        type="submit"
        disabled={locked || isLoading}
        aria-busy={isLoading || undefined}
        aria-live="polite"
        className={`group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3 transition-[background-color,box-shadow,translate] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] disabled:cursor-default disabled:opacity-90 ${
          isSuccess
            ? "shadow-none"
            : "shadow-[0_10px_28px_-12px_rgba(159,191,0,0.55)] motion-safe:enabled:hover:-translate-y-0.5 motion-safe:enabled:hover:shadow-[0_14px_34px_-12px_rgba(159,191,0,0.65)] motion-safe:enabled:active:-translate-y-px"
        }`}
        style={{
          color: "var(--color-ink)",
          fontFamily: "var(--font-sans)",
          fontSize: 13.5,
          fontWeight: 600,
          letterSpacing: "0.01em",
          cursor: locked || isLoading ? "default" : "pointer",
          background: isSuccess
            ? "rgba(159,191,0,0.35)"
            : "var(--color-pulse)",
        }}
      >
        {isLoading ? (
          <span
            key="loader"
            aria-hidden
            className="nf-spinner inline-block h-3.5 w-3.5 rounded-full border-2"
            style={{
              borderColor: "var(--color-ink)",
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
            className="animate-pulse-dot inline-block h-1.5 w-1.5 rounded-full"
            style={{ background: "var(--color-ink)" }}
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
      <div
        aria-hidden
        className="mt-1 basis-full overflow-hidden"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          letterSpacing: "0.08em",
        }}
      >
        <p
          key={`${status}-${message}`}
          className={hasSubmitted ? "nf-in" : undefined}
          style={{ color: messageTone }}
        >
          {message}
        </p>
      </div>

      <style>{styles}</style>
    </form>
  );
}

// ─── Scoped animation styles ─────────────────────────────────────────────────
// Keyframe entrances replacing the previous AnimatePresence crossfades.
// The global prefers-reduced-motion rule in globals.css collapses these
// to 0.01ms / a single iteration.
const styles = `
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
.nf-in { animation: nf-in 300ms var(--ease-smooth) both; }
.nf-pop { animation: nf-pop 300ms var(--ease-smooth) both; }
.nf-spinner {
  animation: nf-pop 300ms var(--ease-smooth) both,
    nf-spin 0.9s linear infinite;
}
`;
