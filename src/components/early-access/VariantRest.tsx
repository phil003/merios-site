"use client";

import { useState } from "react";
import type { CSSProperties } from "react";
import NewsletterForm from "./NewsletterForm";
import styles from "./earlyAccess.module.css";
import form from "./forms.module.css";

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
 * Waitlist form — inserts into `public.waitlist`. Open Sky: it sits on the
 * white card, in the light tone of the shared form styles (./forms.module.css).
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
      className={`${form.form} ${form.light}`}
      data-status={status}
      noValidate
    >
      <label className={form.fieldLabel} htmlFor="ea-waitlist-email">
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
        aria-invalid={status === "invalid" || undefined}
        onChange={(e) => {
          setEmail(e.target.value);
          if (status === "invalid" || status === "error") setStatus("idle");
        }}
        className={form.input}
      />
      <button
        type="submit"
        disabled={locked || status === "loading"}
        className={`btn btn-ink ${form.submit}`}
        data-state={locked ? "success" : status === "loading" ? "loading" : "idle"}
      >
        {status === "loading"
          ? "Sending"
          : status === "success"
            ? "You're in"
            : status === "duplicate"
              ? "On the list"
              : "Join waitlist"}
        {status === "loading" ? (
          <span aria-hidden className={form.spinner} />
        ) : locked ? null : (
          <span aria-hidden className="btn-arrow">
            →
          </span>
        )}
      </button>

      <div className={form.msg}>
        <p
          role={status === "error" || status === "invalid" ? "alert" : undefined}
          aria-live="polite"
          data-tone={messageTone}
        >
          {message}
        </p>
      </div>
    </form>
  );
}

// CSS-only entrance delay for the .he keyframe (globals.css): plays at parse
// time, never waits for JavaScript, and is skipped under reduced motion.
const delay = (sec: string) => ({ "--he-d": sec }) as CSSProperties;

// 3 benefits rendered below the newsletter form — data-rv scroll reveal with
// 80ms of stagger between each (within the 100ms cap).
const NEWSLETTER_BENEFITS = [
  "Monthly dispatch, no filler",
  "Early word on new regions & labs",
  "Unsubscribe in one click",
] as const;

/**
 * Open Sky: a dawn masthead, then the two ways in side by side: the waitlist
 * on a white card and the newsletter on the page's one ink block.
 */
export default function VariantRest() {
  return (
    <main className={styles.page}>
      <section
        className={`${styles.hero} ${styles.restHero}`}
        aria-label="Join the Merios waitlist"
      >
        <div className={styles.container}>
          {/* Editorial header */}
          <p className={`he ${styles.eyebrow}`}>Coming to your country soon</p>

          <h1 className={styles.title}>
            Globally, <em>almost here.</em>
          </h1>

          <p className={`he ${styles.lead}`} style={delay("0.12s")}>
            Merios is rolling out beyond the US. Join the waitlist for
            priority access, or read our monthly dispatch on what we&rsquo;re
            building.
          </p>

          {/* Two cards — side by side from 820px, stacked below */}
          <div className={styles.cards}>
            {/* Waitlist card */}
            <div
              className={`he ${styles.card} ${styles.cardWhite}`}
              style={delay("0.2s")}
            >
              <p className={`${styles.eyebrow} ${styles.cardEyebrow}`}>
                Priority access
              </p>

              <h2 className={styles.cardTitle}>Get priority access</h2>

              <p className={styles.cardBody}>
                First in line when Merios opens in your region. We&rsquo;ll
                write once — when it&rsquo;s your turn.
              </p>

              <div className={styles.cardForm}>
                <WaitlistForm />
              </div>

              {/* Decorative: the signal spreading out, region by region
                  (fills the card's spare height on two-column layouts) */}
              <span aria-hidden className={styles.signal}>
                <span />
                <span />
                <span />
              </span>
            </div>

            {/* Newsletter card — the page's one ink block */}
            <div
              className={`he night ${styles.card} ${styles.cardInk}`}
              style={delay("0.26s")}
              data-nav="dark"
            >
              <p
                className={`${styles.eyebrow} ${styles.inkEyebrow} ${styles.cardEyebrow}`}
              >
                Newsletter
              </p>

              <h2 className={styles.cardTitle}>Read Merios monthly</h2>

              <p className={styles.cardBody}>
                A monthly dispatch on biomarkers, longevity science, and how
                the product is evolving.
              </p>

              <div className={styles.cardForm}>
                <NewsletterForm
                  source="early-access-rest"
                  tone="dark"
                  idleMessage="One email a month. Unsubscribe anytime."
                  submitLabel="Subscribe"
                />
                <p className={styles.micro}>No spam. Unsubscribe in 1 click.</p>
              </div>

              {/* 3 benefits — data-rv scroll reveal, 80ms stagger. Content is
                  visible by default; globals.css + the layout observer drive
                  the animation (and skip it under reduced motion). */}
              <ul className={styles.benefits}>
                {NEWSLETTER_BENEFITS.map((benefit, index) => (
                  <li
                    key={benefit}
                    data-rv=""
                    className={styles.benefit}
                    style={
                      {
                        "--rv-delay": `${(0.05 + index * 0.08).toFixed(2)}s`,
                      } as CSSProperties
                    }
                  >
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
