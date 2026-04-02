const steps = [
  { num: "1", title: "Connect", desc: "Link your Apple Health and scan lab results with your camera." },
  { num: "2", title: "Centralize", desc: "All your health data lives in one organized, easy-to-understand place." },
  { num: "3", title: "Understand", desc: "Get your score, trends, and alerts—everything in plain language." },
  { num: "4", title: "Act", desc: "Personalized recommendations to improve what matters most." },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-32 px-6 max-w-6xl mx-auto">
      <div className="text-center mb-20 fade-in">
        <p className="text-xs uppercase tracking-[0.18em] text-green-primary font-semibold mb-5">
          Simple by Design
        </p>
        <h2 className="font-serif text-3xl md:text-5xl font-medium text-green-deep" style={{ letterSpacing: "-0.02em" }}>
          How It Works
        </h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 relative">
        {/* Connection line (desktop only) */}
        <div className="hidden md:block absolute top-9 left-[12%] right-[12%] h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(45,90,61,0.15), rgba(45,90,61,0.15), transparent)" }} />

        {steps.map((s, i) => (
          <div key={i} className="text-center relative fade-in group">
            <div className="w-[72px] h-[72px] rounded-full bg-white border-2 border-green-primary/12 flex items-center justify-center mx-auto mb-6 font-serif text-xl font-semibold text-green-primary relative z-10 group-hover:bg-green-deep group-hover:text-white group-hover:border-green-deep transition-all duration-300">
              {s.num}
            </div>
            <h3 className="text-base font-semibold text-green-deep mb-2.5">{s.title}</h3>
            <p className="text-sm leading-relaxed text-text-secondary">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
