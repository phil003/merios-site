const pillars = [
  {
    icon: "🩸",
    title: "Blood Test Results",
    desc: "Scan lab results with your phone. 130+ biomarkers translated into clear insights, with trends and smart alerts.",
  },
  {
    icon: "⌚",
    title: "Apple Health Data",
    desc: "Sleep, heart rate, HRV, activity — synced in real-time and cross-referenced with your biology to reveal hidden patterns.",
  },
  {
    icon: "📓",
    title: "Daily Check-Ins",
    desc: "30 seconds a day to log how you feel. Combined with your data, your journal reveals what numbers alone can't.",
  },
];

export default function Pillars() {
  return (
    <section id="features" className="py-32 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-20 fade-in">
        <p className="text-xs uppercase tracking-[0.18em] text-green-primary font-semibold mb-5">
          Three Sources. One Picture.
        </p>
        <h2 className="font-serif text-3xl md:text-5xl font-medium text-green-deep max-w-2xl mx-auto leading-tight" style={{ letterSpacing: "-0.02em" }}>
          Your biology, your habits, your wellbeing—finally connected.
        </h2>
      </div>

      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {pillars.map((p, i) => (
          <div
            key={i}
            className="fade-in bg-white border border-green-primary/6 rounded-2xl p-10 relative overflow-hidden group hover:-translate-y-1 hover:shadow-xl transition-all duration-400"
          >
            {/* Top accent line on hover */}
            <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-green-primary to-green-light opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
            <div className="w-13 h-13 rounded-[14px] flex items-center justify-center mb-7 text-2xl" style={{ background: "rgba(45,90,61,0.06)" }}>
              {p.icon}
            </div>
            <h3 className="font-serif text-xl font-semibold text-green-deep mb-3">
              {p.title}
            </h3>
            <p className="text-sm leading-relaxed text-text-secondary">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
