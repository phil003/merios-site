"use client";

import { useState } from "react";

export default function Waitlist() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setEmail("");
    // TODO: connect to your actual waitlist API (Supabase, Mailchimp, etc.)
  };

  return (
    <section id="waitlist" className="py-28 px-6 bg-green-deep text-center relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(58,122,82,0.12) 0%, transparent 70%)" }} />

      <div className="relative z-10 max-w-xl mx-auto fade-in">
        <h2 className="font-serif text-3xl md:text-4xl font-medium text-white leading-tight mb-4" style={{ letterSpacing: "-0.02em" }}>
          Sois parmi les premiers à comprendre.
        </h2>
        <p className="text-base leading-relaxed text-white/60 mb-10">
          Merios arrive bientôt sur iOS. Inscris-toi pour un accès anticipé et
          rejoins ceux qui prennent leur santé en main.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="ton@email.com"
            className="flex-1 px-6 py-4 border-[1.5px] border-white/12 rounded-full text-white text-sm font-sans outline-none focus:border-white/30 transition-colors"
            style={{ background: "rgba(255,255,255,0.06)" }}
          />
          <button
            type="submit"
            className="px-8 py-4 bg-white text-green-deep rounded-full text-sm font-semibold hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 whitespace-nowrap cursor-pointer"
          >
            {submitted ? "Inscrit ✓" : "S'inscrire"}
          </button>
        </form>

        <p className="text-xs text-white/35 mt-5">
          Gratuit. Pas de spam. Juste un signal quand c&apos;est prêt.
        </p>
      </div>
    </section>
  );
}
