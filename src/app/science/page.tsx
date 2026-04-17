import Link from 'next/link';
import Footer from "@/components/Footer";
import ScrollAnimator from "@/components/ScrollAnimator";

export const metadata = {
  title: "The Science Behind Merios — PhenoAge, Biomarkers & Health Scoring",
  description:
    "Discover the evidence-based science behind Merios: PhenoAge biological age algorithm, biomarker optimal ranges, 4-pillar health scoring methodology, and peer-reviewed research foundations.",
  alternates: {
    canonical: "https://merios.life/science",
  },
  openGraph: {
    title: "The Science Behind Merios — PhenoAge, Biomarkers & Health Scoring",
    description:
      "Discover the evidence-based science behind Merios: PhenoAge biological age algorithm, biomarker optimal ranges, and 4-pillar health scoring methodology.",
    url: "https://merios.life/science",
    type: "website",
  },
};

export default function SciencePage() {
  const healthSystems = [
    {
      name: 'Cardiovascular',
      description: 'Heart function, blood pressure, and circulatory health through key biomarkers and wearable metrics.'
    },
    {
      name: 'Metabolic',
      description: 'Energy production, glucose metabolism, and nutrient utilization patterns.'
    },
    {
      name: 'Immune',
      description: 'Immune cell counts, inflammatory markers, and infection response capacity.'
    },
    {
      name: 'Hormonal',
      description: 'Endocrine system balance, including cortisol, testosterone, and thyroid hormones.'
    },
    {
      name: 'Liver',
      description: 'Hepatic function, detoxification capacity, and enzyme production.'
    },
    {
      name: 'Kidney',
      description: 'Renal function, electrolyte balance, and waste filtration efficiency.'
    },
    {
      name: 'Thyroid',
      description: 'Thyroid hormone levels and metabolic regulation.'
    },
    {
      name: 'Inflammation',
      description: 'Systemic and localized inflammatory markers and inflammatory load.'
    },
    {
      name: 'Blood Health',
      description: 'Red blood cell count, hemoglobin, hematocrit, and oxygen-carrying capacity.'
    },
    {
      name: 'Nutrients',
      description: 'Vitamin and mineral levels including D, B12, iron, magnesium, and zinc.'
    },
    {
      name: 'Bone & Mineral',
      description: 'Bone density markers, calcium metabolism, and skeletal system health.'
    }
  ];

  return (
    <>
      <ScrollAnimator />
      <main className="bg-cream">
        {/* Hero Section */}
        <section className="fade-in min-h-screen flex items-center justify-center px-6 pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="max-w-3xl text-center">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-text-primary mb-6">
            The Science Behind Merios
          </h1>
          <p className="font-sans text-lg md:text-xl text-text-secondary mb-8 leading-relaxed">
            Merios is built on evidence-based methodology, translating complex biomarker data into actionable health insights. Our scoring system integrates clinical science, wearable technology, and personalized wellness data to give you a comprehensive understanding of your health.
          </p>
          <p className="font-sans text-base text-text-tertiary leading-relaxed">
            Every metric matters. Every insight is backed by scientific research.
          </p>
        </div>
      </section>

      {/* Merios Score — 4 Pillars */}
      <section className="fade-in py-20 md:py-32 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-text-primary mb-4 text-center">
            The Merios Score
          </h2>
          <p className="text-center text-text-secondary mb-6 text-lg max-w-2xl mx-auto">
            Your Merios Score (0&ndash;100) is built on four equally-weighted pillars, each contributing 25% to your overall score. This balanced approach ensures no single dimension dominates your health picture.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="p-8 border border-green-light/20 rounded-2xl bg-gradient-to-br from-green-light/5 to-transparent">
              <div className="text-3xl mb-4">😴</div>
              <h3 className="font-serif text-2xl font-bold text-text-primary mb-3">Sleep</h3>
              <p className="text-text-secondary leading-relaxed mb-4">
                Sleep quality, duration, consistency, and deep sleep ratios tracked via Apple Health. Your sleep pillar reflects how well your body recovers each night.
              </p>
              <div className="text-sm text-green-primary font-semibold">25% of your score</div>
            </div>

            <div className="p-8 border border-green-light/20 rounded-2xl bg-gradient-to-br from-green-light/5 to-transparent">
              <div className="text-3xl mb-4">🧘</div>
              <h3 className="font-serif text-2xl font-bold text-text-primary mb-3">Stress</h3>
              <p className="text-text-secondary leading-relaxed mb-4">
                Heart rate variability (HRV), resting heart rate, and self-reported stress levels from daily check-ins. This pillar captures your nervous system balance and recovery capacity.
              </p>
              <div className="text-sm text-green-primary font-semibold">25% of your score</div>
            </div>

            <div className="p-8 border border-green-light/20 rounded-2xl bg-gradient-to-br from-green-light/5 to-transparent">
              <div className="text-3xl mb-4">🏃</div>
              <h3 className="font-serif text-2xl font-bold text-text-primary mb-3">Activity</h3>
              <p className="text-text-secondary leading-relaxed mb-4">
                Daily steps, workout frequency, active energy burned, and movement consistency from Apple Health. Your activity pillar rewards consistency over intensity.
              </p>
              <div className="text-sm text-green-primary font-semibold">25% of your score</div>
            </div>

            <div className="p-8 border border-green-light/20 rounded-2xl bg-gradient-to-br from-green-light/5 to-transparent">
              <div className="text-3xl mb-4">🧬</div>
              <h3 className="font-serif text-2xl font-bold text-text-primary mb-3">Biomarkers</h3>
              <p className="text-text-secondary leading-relaxed mb-4">
                130+ blood biomarkers analyzed across 11 health systems. Each marker is scored against clinical reference ranges and weighted by medical significance for your profile.
              </p>
              <div className="text-sm text-green-primary font-semibold">25% of your score</div>
            </div>
          </div>

          {/* Biological Age */}
          <div className="bg-green-deep rounded-2xl p-10 text-center">
            <p className="text-xs uppercase tracking-[0.18em] font-semibold mb-4" style={{ color: "rgba(124,219,154,0.7)" }}>
              Beyond the Score
            </p>
            <h3 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
              Your Biological Age
            </h3>
            <p className="text-white/70 leading-relaxed max-w-2xl mx-auto mb-6">
              Merios calculates your biological age using the PhenoAge algorithm, a clinically validated model based on 9 key blood biomarkers. Your biological age reflects how fast your body is actually aging&mdash;independent of your calendar age&mdash;and is further refined by HealthKit lifestyle data and supplementary biomarkers.
            </p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              <span className="px-4 py-2 rounded-full bg-white/10 text-white/80">Albumin</span>
              <span className="px-4 py-2 rounded-full bg-white/10 text-white/80">Creatinine</span>
              <span className="px-4 py-2 rounded-full bg-white/10 text-white/80">Glucose</span>
              <span className="px-4 py-2 rounded-full bg-white/10 text-white/80">C-Reactive Protein</span>
              <span className="px-4 py-2 rounded-full bg-white/10 text-white/80">Lymphocyte %</span>
              <span className="px-4 py-2 rounded-full bg-white/10 text-white/80">Mean Cell Volume</span>
              <span className="px-4 py-2 rounded-full bg-white/10 text-white/80">Red Cell Dist. Width</span>
              <span className="px-4 py-2 rounded-full bg-white/10 text-white/80">Alkaline Phosphatase</span>
              <span className="px-4 py-2 rounded-full bg-white/10 text-white/80">White Blood Cells</span>
            </div>
          </div>
        </div>
      </section>

      {/* 11 Health Systems Section */}
      <section className="fade-in py-20 md:py-32 px-6 bg-cream">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-text-primary mb-4 text-center">
            The 11 Health Systems
          </h2>
          <p className="text-center text-text-secondary mb-16 text-lg">
            Your body operates as an integrated system. We monitor all 11 key health systems that determine your overall wellbeing.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            {healthSystems.map((system, index) => (
              <div
                key={index}
                className="p-6 bg-white rounded-lg border border-green-light/15 hover:border-green-light/40 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-green-primary/10 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-green-primary font-semibold text-sm">{index + 1}</span>
                  </div>
                  <div>
                    <h3 className="font-serif text-lg font-bold text-text-primary mb-2">
                      {system.name}
                    </h3>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {system.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Data Privacy & Security Section */}
      <section className="fade-in py-20 md:py-32 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-text-primary mb-4 text-center">
            Data Privacy & Security
          </h2>
          <p className="text-center text-text-secondary mb-12 text-lg">
            Your health data is your most sensitive personal information. We protect it with the highest standards.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="font-serif text-2xl font-bold text-text-primary mb-4">
                Your Data, Your Ownership
              </h3>
              <p className="text-text-secondary leading-relaxed mb-4">
                You own your health data. We're custodians, not owners. You have complete control over what data you share with Merios, and you can export or delete your data at any time.
              </p>
              <ul className="space-y-3 text-text-secondary">
                <li className="flex gap-3">
                  <span className="text-green-primary font-bold">✓</span>
                  <span>Complete data portability</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-primary font-bold">✓</span>
                  <span>Right to be forgotten</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-primary font-bold">✓</span>
                  <span>No data selling, ever</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-serif text-2xl font-bold text-text-primary mb-4">
                Bank-Level Security
              </h3>
              <p className="text-text-secondary leading-relaxed mb-4">
                All data is encrypted in transit and at rest using AES-256 encryption. We comply with GDPR standards to ensure your health information remains confidential.
              </p>
              <ul className="space-y-3 text-text-secondary">
                <li className="flex gap-3">
                  <span className="text-green-primary font-bold">✓</span>
                  <span>AES-256 encryption</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-primary font-bold">✓</span>
                  <span>GDPR compliant</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-green-primary font-bold">✓</span>
                  <span>Regular security audits</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="bg-green-light/5 border border-green-light/20 rounded-lg p-8">
            <p className="text-text-secondary leading-relaxed">
              <span className="font-semibold text-text-primary">Our commitment:</span> We never sell your data. We never share your data with third parties without explicit consent. We never use your data for marketing or advertising purposes. Your health information is treated as the sensitive personal data it truly is.
            </p>
          </div>
        </div>
      </section>

      {/* Medical Disclaimer */}
      <section className="py-16 px-6 bg-cream border-t border-green-light/10">
        <div className="max-w-4xl mx-auto">
          <h3 className="font-serif text-2xl font-bold text-text-primary mb-4">
            Medical Disclaimer
          </h3>
          <p className="text-sm text-text-tertiary leading-relaxed">
            Merios provides health analytics and insights for informational purposes only. It is not a medical device, diagnostic tool, or medical treatment. The information provided by Merios should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always consult with a qualified healthcare provider before making any health-related decisions. Merios does not diagnose, treat, cure, or prevent any disease or health condition.
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="fade-in py-20 md:py-32 px-6 bg-green-deep">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-cream mb-6">
            Ready to Understand Your Health Better?
          </h2>
          <p className="text-green-light text-lg mb-10 leading-relaxed">
            Join our early access program and get your personalized health analysis powered by science.
          </p>
          <Link
            href="/early-access"
            className="inline-block bg-green-primary hover:bg-green-light text-cream font-sans font-semibold px-8 py-4 rounded-lg transition-colors"
          >
            Get Early Access
          </Link>
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
}
