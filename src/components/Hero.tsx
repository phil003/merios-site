export default function Hero() {
  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-36 pb-24 relative overflow-hidden">
      {/* Background gradient orb */}
      <div
        className="absolute -top-[30%] left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(45,90,61,0.04) 0%, transparent 70%)",
        }}
      />

      {/* Badge */}
      <div
        className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-green-primary/10 text-xs font-medium text-green-primary uppercase tracking-widest mb-10 animate-fadeUp"
        style={{ background: "rgba(45,90,61,0.06)", animationDelay: "0.2s" }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-green-light animate-pulse-dot" />
        Lancement bientôt
      </div>

      {/* Title */}
      <h1
        className="font-serif text-5xl md:text-7xl font-medium leading-[1.08] tracking-tight text-green-deep max-w-3xl mb-7 animate-fadeUp"
        style={{ animationDelay: "0.4s", letterSpacing: "-0.03em" }}
      >
        Ton corps parle.
        <br />
        Apprends à le lire.
      </h1>

      {/* Subtitle */}
      <p
        className="text-lg md:text-xl leading-relaxed text-text-secondary max-w-lg mb-12 animate-fadeUp"
        style={{ animationDelay: "0.6s" }}
      >
        Merios transforme tes analyses de sang, tes données Apple&nbsp;Health et
        ton ressenti quotidien en une vision claire de ta santé — avec un plan
        d&apos;action personnalisé.
      </p>

      {/* CTA buttons */}
      <div
        className="flex flex-col sm:flex-row gap-4 items-center animate-fadeUp"
        style={{ animationDelay: "0.8s" }}
      >
        <a
          href="#waitlist"
          className="inline-flex items-center gap-3 px-9 py-4 bg-green-deep text-white rounded-full text-base font-semibold hover:bg-green-primary hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 w-full sm:w-auto justify-center"
        >
          Rejoindre la liste d&apos;attente
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
        <a
          href="#concept"
          className="inline-flex items-center gap-2 px-7 py-4 border-[1.5px] border-green-primary/15 text-text-secondary rounded-full text-base font-medium hover:border-green-primary hover:text-green-primary transition-all w-full sm:w-auto justify-center"
        >
          Découvrir
        </a>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fadeUp"
        style={{ animationDelay: "1.2s" }}
      >
        <span className="text-[0.7rem] uppercase tracking-[0.15em] text-text-tertiary">
          Explorer
        </span>
        <div
          className="w-px h-10 animate-scroll-pulse"
          style={{
            background: "linear-gradient(to bottom, var(--color-text-tertiary), transparent)",
          }}
        />
      </div>
    </section>
  );
}
