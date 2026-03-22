const pillars = [
  {
    icon: "🩸",
    title: "Tes analyses de sang",
    desc: "Scanne tes résultats avec ton téléphone. 130+ biomarqueurs reconnus, traduits en français clair, avec tendances et alertes intelligentes.",
  },
  {
    icon: "⌚",
    title: "Tes données Apple\u00A0Health",
    desc: "Sommeil, fréquence cardiaque, VFC, activité — synchronisées en temps réel et croisées avec ta biologie pour révéler des corrélations invisibles.",
  },
  {
    icon: "📓",
    title: "Ton ressenti quotidien",
    desc: "30 secondes par jour pour noter comment tu te sens. Croisé avec tes données, ton journal révèle ce que les chiffres seuls ne disent pas.",
  },
];

export default function Pillars() {
  return (
    <section id="concept" className="py-32 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-20 fade-in">
        <p className="text-xs uppercase tracking-[0.18em] text-green-primary font-semibold mb-5">
          Trois sources. Une vision.
        </p>
        <h2 className="font-serif text-3xl md:text-5xl font-medium text-green-deep max-w-xl mx-auto leading-tight" style={{ letterSpacing: "-0.02em" }}>
          Ta biologie, ton corps et ton vécu, enfin reliés.
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
