const articles = [
  {
    emoji: "🧬",
    bg: "from-[#E8F0EB] to-[#D4E4DA]",
    tag: "Biomarkers",
    title: "CRP: The Inflammation Marker Everyone Should Understand",
    desc: "Your body is fighting inflammation you can't see. CRP is the alarm bell in your blood—if you know how to read it.",
    time: "6 min read",
  },
  {
    emoji: "💤",
    bg: "from-[#EDE4F5] to-[#DDD2EC]",
    tag: "Sleep & Recovery",
    title: "HRV: What Your Heart Rate Variability Actually Tells You",
    desc: "Your Apple Watch tracks HRV already. Here's why it's the best recovery indicator most people ignore.",
    time: "5 min read",
  },
  {
    emoji: "☀️",
    bg: "from-[#FFF3E0] to-[#F5E6CC]",
    tag: "Nutrition",
    title: "Vitamin D: Why a Billion People Are Deficient",
    desc: "It's called the 'sunshine vitamin,' but it's actually a hormone. And its effects go far beyond bone health.",
    time: "7 min read",
  },
];

export default function BlogPreview() {
  return (
    <section id="blog" className="py-32 px-6 max-w-6xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-14 gap-4 fade-in">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-green-primary font-semibold mb-5">
            The Merios Blog
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-green-deep" style={{ letterSpacing: "-0.02em" }}>
            Understand your health,
            <br />
            one topic at a time.
          </h2>
        </div>
        <a href="/blog" className="text-sm text-green-primary font-medium flex items-center gap-1.5 hover:gap-2.5 transition-all">
          Read all articles →
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
