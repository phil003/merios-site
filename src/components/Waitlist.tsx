"use client";

import { useState } from "react";

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

export default function Waitlist() {
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
            : "We only email when there's something worth saying.";

  const messageTone =
    status === "success" || status === "duplicate"
      ? "var(--color-pulse)"
      : status === "error" || status === "invalid"
        ? "var(--color-accent-warm)"
        : "rgba(247,245,239,0.5)";

  return (
    <section
      id="waitlist"
      className="relative overflow-hidden py-28 md:py-36"
      style={{ background: "var(--color-ink)" }}
      aria-label="Join the Merios waitlist"
    >
      {/* ambient radials — echo AppPreview */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 right-0 h-[70%] w-[60%]"
        style={{
          background:
            "radial-gradient(55% 60% at 80% 20%, rgba(159,191,0,0.10), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 h-[70%] w-[60%]"
        style={{
          background:
            "radial-gradient(55% 60% at 20% 80%, rgba(30,61,42,0.45), transparent 70%)",
        }}
      />

      <div className="relative mx-auto max-w-[720px] px-6 text-center md:px-10">
        <div
          className="inline-flex items-center gap-2.5"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          <span
            aria-hidden
            className="animate-pulse-dot inline-block h-1.5 w-1.5 rounded-full"
            style={{ background: "var(--color-pulse)" }}
          />
          <span
            className="text-[10.5px] uppercase"
            style={{
              color: "var(--color-pulse)",
              letterSpacing: "0.22em",
              fontWeight: 500,
            }}
          >
            Limited access
          </span>
        </div>

        <h2
          className="mt-8"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "var(--text-display-l)",
            fontWeight: 300,
            lineHeight: 1.02,
            letterSpacing: "-0.03em",
            color: "var(--color-canvas)",
          }}
        >
          Your blood.
          <br />
          Finally legible.
        </h2>

        <p
          className="mx-auto mt-7 max-w-[520px]"
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: "clamp(1rem, 1.15vw, 1.0625rem)",
            lineHeight: 1.6,
            color: "rgba(247,245,239,0.72)",
          }}
        >
          Merios opens to a small first cohort. Leave your email and we&rsquo;ll
          write once — when it&rsquo;s your turn.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-12 flex w-full max-w-[520px] flex-col gap-3 sm:flex-row sm:items-center sm:gap-4"
          noValidate
        >
          <label className="sr-only" htmlFor="waitlist-email">
            Email address
          </label>
          <input
            id="waitlist-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@domain.com"
            value={email}
            disabled={locked}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "invalid" || status === "error")
                setStatus("idle");
            }}
            className="flex-1 bg-transparent py-3 text-base outline-none transition-colors placeholder:text-[rgba(247,245,239,0.45)] disabled:opacity-60"
            style={{
              fontFamily: "var(--font-sans)",
              color: "var(--color-canvas)",
              borderBottom:
                status === "invalid"
                  ? "1px solid var(--color-accent-warm)"
                  : "1px solid rgba(247,245,239,0.35)",
            }}
            onFocus={(e) => {
              if (status !== "invalid")
                e.currentTarget.style.borderBottom =
                  "1px solid var(--color-pulse)";
            }}
            onBlur={(e) => {
              if (status !== "invalid")
                e.currentTarget.style.borderBottom =
                  "1px solid rgba(247,245,239,0.35)";
            }}
          />
          <button
            type="submit"
            disabled={locked || status === "loading"}
            className="group inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 transition-transform motion-reduce:transform-none hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-80"
            style={{
              background: locked
                ? "rgba(159,191,0,0.35)"
                : "var(--color-pulse)",
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
                ? "You're in"
                : status === "duplicate"
                  ? "On the list"
                  : "Join"}
          </button>
        </form>

        <p
          role={
            status === "error" || status === "invalid" ? "alert" : undefined
          }
          aria-live="polite"
          className="mt-5"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: 11,
            letterSpacing: "0.08em",
            color: messageTone,
          }}
        >
          {message}
        </p>
      </div>
    </section>
  );
}
