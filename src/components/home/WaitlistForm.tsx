"use client";

import { useState } from "react";

// Same waitlist as before the redesign (Supabase `waitlist` table, public anon
// key, same statuses and messages): for visitors outside the US App Store.
const SUPABASE_URL = "https://ykcakhvmzebakodxmjpb.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrY2FraHZtemViYWtvZHhtanBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5NDEwODYsImV4cCI6MjA4NzUxNzA4Nn0.cpI9MFeTlr9p0d75R0jtiyCXu7HDiGB1fz2B8drkQ0A";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Status = "idle" | "invalid" | "loading" | "success" | "duplicate" | "error";

export default function WaitlistForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading" || status === "success" || status === "duplicate") return;

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
  const tone =
    status === "success" || status === "duplicate"
      ? "is-ok"
      : status === "error" || status === "invalid"
        ? "is-warn"
        : "";

  return (
    <div className="hv3-wait">
      <p className="hv3-wait__lead">
        Outside the US? We&rsquo;re rolling out worldwide — leave your email
        and we&rsquo;ll write once, when Merios reaches your country.
      </p>
      <form className="hv3-wait__form" onSubmit={handleSubmit} noValidate>
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
          aria-invalid={status === "invalid" || undefined}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "invalid" || status === "error") setStatus("idle");
          }}
        />
        <button className="btn btn-lime" type="submit" disabled={locked || status === "loading"}>
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
        className={`hv3-wait__msg ${tone}`}
        role={status === "error" || status === "invalid" ? "alert" : undefined}
        aria-live="polite"
      >
        {message}
      </p>
    </div>
  );
}
