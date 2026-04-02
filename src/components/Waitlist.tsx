"use client";

import { useState } from "react";

const SUPABASE_URL = "https://ykcakhvmzebakodxmjpb.supabase.co";
const SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrY2FraHZtemViYWtvZHhtanBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5NDEwODYsImV4cCI6MjA4NzUxNzA4Nn0.cpI9MFeTlr9p0d75R0jtiyCXu7HDiGB1fz2B8drkQ0A";

export default function Waitlist() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "duplicate" | "error">("idle");
  const [email, setEmail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || status === "loading") return;

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
        body: JSON.stringify({ email: email.toLowerCase().trim() }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else if (res.status === 409) {
        // Unique constraint violation — already on the list
        setStatus("duplicate");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const buttonText = {
    idle: "Join",
    loading: "Joining...",
    success: "You're in ✓",
    duplicate: "Already joined ✓",
    error: "Try again",
  }[status];

  return (
    <section id="waitlist" className="py-32 px-6 bg-green-deep text-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(58,122,82,0.12) 0%, transparent 70%)" }} />

      <div className="relative z-10 max-w-xl mx-auto fade-in">
        <h2 className="font-serif text-4xl md:text-5xl font-medium text-white leading-tight mb-6" style={{ letterSpacing: "-0.02em" }}>
          Be first to understand.
        </h2>
        <p className="text-lg leading-relaxed text-white/70 mb-12">
          Merios launches on iOS soon. Join thousands taking control of their health with clarity and confidence.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (status === "error") setStatus("idle");
            }}
            placeholder="you@example.com"
            disabled={status === "success" || status === "duplicate"}
            className="flex-1 px-6 py-4 border-[1.5px] border-white/12 rounded-full text-white text-sm font-sans outline-none focus:border-white/30 transition-colors placeholder:text-white/40 disabled:opacity-50"
            style={{ background: "rgba(255,255,255,0.06)" }}
          />
          <button
            type="submit"
            disabled={status === "loading" || status === "success" || status === "duplicate"}
            className="px-8 py-4 bg-white text-green-deep rounded-full text-sm font-semibold hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 whitespace-nowrap cursor-pointer disabled:opacity-80 disabled:cursor-default disabled:hover:translate-y-0 disabled:hover:shadow-none"
          >
            {buttonText}
          </button>
        </form>

        <p className="text-xs text-white/40 mt-5">
          {status === "error"
            ? "Something went wrong. Please try again."
            : "No spam. Just a message when we launch."}
        </p>
      </div>
    </section>
  );
}
