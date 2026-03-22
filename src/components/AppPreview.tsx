const features = [
  "Score global + 6 piliers détaillés (sang, cœur, sommeil, activité, nutrition, mental)",
  "Tendances sur 3, 6 et 12 mois — vois l'impact réel de tes changements",
  "Recommandations concrètes, pas de jargon",
  "Données hébergées en UE, conformes RGPD",
];

const phonePillars = [
  { name: "Sang", value: "82", trend: "↑ +3" },
  { name: "Sommeil", value: "71", trend: "↑ +6" },
  { name: "Cœur", value: "79", trend: "→ stable" },
  { name: "Activité", value: "68", trend: "↑ +2" },
];

export default function AppPreview() {
  return (
    <section className="py-28 px-6 bg-green-deep relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute -top-48 -right-48 w-[600px] h-[600px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(58,122,82,0.15) 0%, transparent 70%)" }} />
      <div className="absolute -bottom-72 -left-48 w-[700px] h-[700px] rounded-full pointer-events-none" style={{ background: "radial-gradient(circle, rgba(91,77,138,0.08) 0%, transparent 70%)" }} />

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center relative z-10">
        {/* Text side */}
        <div className="fade-in">
          <p className="text-xs uppercase tracking-[0.18em] font-semibold mb-5" style={{ color: "rgba(124,219,154,0.7)" }}>
            Un score. Pas un verdict.
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-medium text-white leading-tight mb-6" style={{ letterSpacing: "-0.02em" }}>
            Comprends ta santé en un coup d&apos;œil.
          </h2>
          <p className="text-base leading-relaxed text-white/65 mb-10 max-w-md">
            Merios calcule un score sur 100 qui reflète ta santé globale — pas
            juste tes pas ou ton sommeil. C&apos;est ta biologie, ton corps et ton
            vécu, condensés en une image claire.
          </p>
          <ul className="flex flex-col gap-5 mb-12">
            {features.map((f, i) => (
              <li key={i} className="flex items-start gap-3.5 text-sm text-white/80 leading-relaxed">
                <span className="w-5.5 h-5.5 rounded-full flex items-center justify-center shrink-0 mt-0.5 text-[0.7rem]" style={{ background: "rgba(58,122,82,0.3)", color: "#7CDB9A" }}>
                  ✓
                </span>
                {f}
              </li>
            ))}
          </ul>
          <a
            href="#waitlist"
            className="inline-flex items-center gap-3 px-9 py-4 bg-white text-green-deep rounded-full text-base font-semibold hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300"
          >
            Rejoindre la waitlist
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Phone mockup */}
        <div className="fade-in flex justify-center">
          <div className="w-[300px] h-[620px] bg-[#111] rounded-[44px] p-3 shadow-2xl relative" style={{ boxShadow: "0 40px 80px rgba(0,0,0,0.3), 0 0 0 1px rgba(255,255,255,0.08)" }}>
            <div className="w-full h-full bg-beige rounded-[34px] overflow-hidden flex flex-col">
              {/* Notch */}
              <div className="w-[120px] h-7 bg-[#111] rounded-b-[20px] mx-auto relative z-10" />
              {/* Content */}
              <div className="p-6 flex-1 flex flex-col gap-4">
                <div className="font-serif text-xl font-medium text-green-deep">Bonjour, Phil.</div>
                {/* Score card */}
                <div className="bg-white rounded-2xl p-6 text-center shadow-sm">
                  <div className="text-[0.65rem] uppercase tracking-[0.12em] text-text-tertiary mb-2">Ton score santé</div>
                  <div className="font-serif text-5xl font-semibold text-green-primary leading-none">76</div>
                  <div className="text-xs text-text-tertiary mt-1.5">+4 pts depuis février</div>
                  <div className="w-full h-1 bg-beige rounded-full mt-3.5 overflow-hidden">
                    <div className="w-[76%] h-full rounded-full" style={{ background: "linear-gradient(90deg, var(--color-green-primary), var(--color-green-light))" }} />
                  </div>
                </div>
                {/* Pillar cards */}
                <div className="grid grid-cols-2 gap-2">
                  {phonePillars.map((p, i) => (
                    <div key={i} className="bg-white rounded-xl p-3.5 shadow-sm">
                      <div className="text-[0.6rem] uppercase tracking-wider text-text-tertiary mb-1">{p.name}</div>
                      <div className="text-lg font-semibold text-green-deep">{p.value}</div>
                      <div className="text-[0.6rem] text-green-light mt-0.5">{p.trend}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
