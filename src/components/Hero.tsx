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
        Coming Soon
      </div>

      {/* Title */}
      <h1
        className="font-serif text-6xl md:text-8xl font-medium leading-[1.05] tracking-tight text-green-deep max-w-4xl mb-7 animate-fadeUp"
        style={{ animationDelay: "0.4s", letterSpacing: "-0.03em" }}
      >
        Understand
        <br />
        Your Body
      </h1>

      {/* Subtitle */}
      <p
        className="text-xl md:text-2xl leading-relaxed text-text-secondary max-w-2xl mb-12 animate-fadeUp font-light"
        style={{ animationDelay: "0.6s" }}
      >
        Your blood tests, Apple Health data, and daily check-ins finally make sense. Get one clear health score and actionable recommendations.
      </p>

      {/* CTA buttons */}
      <div
        className="flex flex-col sm:flex-row gap-4 items-center animate-fadeUp"
        style={{ animationDelay: "0.8s" }}
      >
        <a
          href="#waitlist"
          className="inline-flex items-center gap-3 px-10 py-4 bg-green-deep text-white rounded-full text-base font-semibold hover:bg-green-primary hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300 w-full sm:w-auto justify-center"
        >
          Join Waitlist
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
        <a
          href="#how-it-works"
          className="inline-flex items-center gap-2 px-7 py-4 border-[1.5px] border-green-primary/15 text-text-secondary rounded-full text-base font-medium hover:border-green-primary hover:text-green-primary transition-all w-full sm:w-auto justify-center"
        >
          Learn More
        </a>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fadeUp"
        style={{ animationDelay: "1.2s" }}
      >
        <span className="text-[0.7rem] uppercase tracking-[0.15em] text-text-tertiary">
          Scroll
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
