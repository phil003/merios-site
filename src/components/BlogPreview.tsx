const articles = [
  {
    emoji: "🧬",
    bg: "from-[#E8F0EB] to-[#D4E4DA]",
    tag: "Biomarqueurs",
    title: "CRP : le marqueur d'inflammation que tout le monde devrait connaître",
    desc: "Ton corps combat en silence. La CRP est le signal d'alarme que tes analyses captent — si tu sais le lire.",
    time: "6 min de lecture",
  },
  {
    emoji: "💤",
    bg: "from-[#EDE4F5] to-[#DDD2EC]",
    tag: "Sommeil",
    title: "VFC : ce que ta variabilité cardiaque dit de ton stress",
    desc: "Ta montre mesure déjà ta VFC. Voici pourquoi c'est le meilleur indicateur de récupération que tu ignores probablement.",
    time: "5 min de lecture",
  },
  {
    emoji: "☀️",
    bg: "from-[#FFF3E0] to-[#F5E6CC]",
    tag: "Nutrition",
    title: "Vitamine D : pourquoi 1 milliard de personnes sont carencées",
    desc: "La « vitamine du soleil » est en réalité une hormone. Et ses effets vont bien au-delà des os.",
    time: "7 min de lecture",
  },
];

export default function BlogPreview() {
  return (
    <section id="blog" className="py-32 px-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-14 gap-4 fade-in">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-green-primary font-semibold mb-5">
            Le journal Merios
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-green-deep" style={{ letterSpacing: "-0.02em" }}>
            Comprendre sa santé,
            <br />
            un sujet à la fois.
          </h2>
        </div>
        <a href="#" className="text-sm text-green-primary font-medium flex items-center gap-1.5 hover:gap-2.5 transition-all">
          Tous les articles →
        </a>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {articles.map((a, i) => (
          <article
            key={i}
            className="fade-in rounded-2xl overflow-hidden bg-white border border-green-primary/6 hover:-translate-y-1 hover:shadow-xl transition-all duration-400 cursor-pointer group"
          >
            <div className={`w-full h-48 flex items-center justify-center text-4xl bg-gradient-to-br ${a.bg}`}>
              {a.emoji}
            </div>
            <div className="p-7">
              <div className="text-[0.68rem] uppercase tracking-wider text-green-primary font-semibold mb-2.5">
                {a.tag}
              </div>
              <h3 className="font-serif text-lg font-semibold text-green-deep leading-snug mb-2.5">
                {a.title}
              </h3>
              <p className="text-sm leading-relaxed text-text-secondary">{a.desc}</p>
              <div className="text-xs text-text-tertiary mt-4">{a.time}</div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
