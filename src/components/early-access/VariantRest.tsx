"use client";

import { useState } from "react";
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
 * Waitlist form — inserts into `public.waitlist`. Dark-tone variant of the
 * shared Waitlist component, scoped to this page.
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

  const messageTone =
    status === "success" || status === "duplicate"
      ? "var(--color-pulse)"
      : status === "error" || status === "invalid"
        ? "var(--color-accent-warm)"
        : "rgba(247,245,239,0.5)";

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-full flex-col gap-3"
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
        className="w-full bg-transparent py-3 text-base outline-none transition-colors disabled:opacity-60"
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
        className="group mt-2 inline-flex items-center justify-center gap-2 self-start rounded-full px-6 py-3 transition-transform motion-reduce:transform-none hover:-translate-y-0.5 disabled:translate-y-0 disabled:opacity-80"
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
            ? "You're in"
            : status === "duplicate"
              ? "On the list"
              : "Join waitlist"}
      </button>

      <p
        role={status === "error" || status === "invalid" ? "alert" : undefined}
        aria-live="polite"
        className="mt-3"
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

export default function VariantRest() {
  return (
    <main>
      <section
        className="relative overflow-hidden py-28 md:py-36"
        style={{ background: "var(--color-ink)" }}
        aria-label="Join the Merios waitlist"
      >
        {/* Ambient radials — copied verbatim from Waitlist.tsx */}
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

        <div className="relative mx-auto max-w-[1080px] px-6 md:px-10">
          {/* Editorial header */}
          <div className="mx-auto max-w-[720px] text-center">
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
                Coming to your country soon
              </span>
            </div>

            <h1
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
              Globally,
              <br />
              almost here.
            </h1>

            <p
              className="mx-auto mt-7 max-w-[560px]"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(1rem, 1.15vw, 1.0625rem)",
                lineHeight: 1.6,
                color: "rgba(247,245,239,0.72)",
              }}
            >
              Merios is rolling out beyond the US. Join the waitlist for
              priority access, or read our monthly dispatch on what we&rsquo;re
              building.
            </p>
          </div>

          {/* Two cards — side by side on desktop, stacked on mobile */}
          <div className="mx-auto mt-16 grid max-w-[900px] grid-cols-1 gap-10 md:mt-20 md:grid-cols-2">
            {/* Waitlist card */}
            <div
              className="relative p-8 md:p-10"
              style={{
                borderLeft: "1px solid rgba(247,245,239,0.08)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10.5,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--color-ink-tertiary)",
                  fontWeight: 500,
                }}
              >
                Priority access
              </p>

              <h2
                className="mt-4"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--text-headline)",
                  fontWeight: 300,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  color: "var(--color-canvas)",
                }}
              >
                Get priority access
              </h2>

              <p
                className="mt-3"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.9375rem",
                  lineHeight: 1.55,
                  color: "rgba(247,245,239,0.62)",
                }}
              >
                First in line when Merios opens in your region. We&rsquo;ll
                write once — when it&rsquo;s your turn.
              </p>

              <div className="mt-8">
                <WaitlistForm />
              </div>
            </div>

            {/* Newsletter card */}
            <div
              className="relative p-8 md:p-10"
              style={{
                borderLeft: "1px solid rgba(247,245,239,0.08)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10.5,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--color-ink-tertiary)",
                  fontWeight: 500,
                }}
              >
                Newsletter
              </p>

              <h2
                className="mt-4"
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "var(--text-headline)",
                  fontWeight: 300,
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  color: "var(--color-canvas)",
                }}
              >
                Read Merios monthly
              </h2>

              <p
                className="mt-3"
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "0.9375rem",
                  lineHeight: 1.55,
                  color: "rgba(247,245,239,0.62)",
                }}
              >
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
