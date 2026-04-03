import Link from 'next/link';

const FeatureCard = ({
  emoji,
  title,
  description,
  details,
}: {
  emoji: string;
  title: string;
  description: string;
  details: string[];
}) => (
  <div className="fade-in">
    <div className="flex gap-6 items-start">
      <div className="flex-shrink-0 w-14 h-14 rounded-2xl bg-green-primary/8 flex items-center justify-center text-2xl">
        {emoji}
      </div>
      <div className="flex-1">
        <h3 className="font-serif text-2xl font-bold text-text-primary mb-3">{title}</h3>
        <p className="text-text-secondary mb-4 leading-relaxed">{description}</p>
        <ul className="space-y-2">
          {details.map((detail, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <span className="text-accent-warm mt-1 font-bold">&bull;</span>
              <span className="text-text-secondary text-sm">{detail}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

const HealthSystem = ({ name }: { name: string }) => (
  <div className="p-4 bg-white border border-beige-dark rounded-lg text-center hover:border-green-primary transition-colors">
    <p className="font-sans text-sm font-medium text-text-primary">{name}</p>
  </div>
);

export const metadata = {
  title: 'Features | Merios',
  description: 'Discover how Merios revolutionizes health analytics with AI-driven insights across 130+ biomarkers and 11 health systems.',
};

export default function FeaturesPage() {
  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="bg-white py-16 md:py-24 px-4 md:px-0">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-text-primary mb-6 leading-tight">
            Everything You Need to Know About Your Health
          </h1>
          <p className="text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            Merios transforms raw health data into actionable insights. Track biomarkers, understand patterns, and take control of your wellness journey.
          </p>
        </div>
      </section>

      {/* Feature 1: Blood Test Analysis */}
      <section className="bg-cream py-16 md:py-24 px-4 md:px-0">
        <div className="max-w-4xl mx-auto">
          <FeatureCard
            emoji="🩸"
            title="Blood Test Analysis"
            description="Upload any lab result and let AI do the analysis. Merios instantly processes 130+ biomarkers, automatically reads your lab reports via OCR, and contextualizes every value against reference ranges."
            details={[
              'Scan 130+ biomarkers from any lab',
              'OCR technology reads lab reports automatically',
              'Instant reference range comparisons',
              'Historical trend tracking and alerts',
              'Personalized interpretation for each marker',
              'Multi-lab format support',
            ]}
          />
        </div>
      </section>

      {/* Feature 2: Apple Health Integration */}
      <section className="bg-beige py-16 md:py-24 px-4 md:px-0">
        <div className="max-w-4xl mx-auto">
          <FeatureCard
            emoji="⌚"
            title="Apple Health Integration"
            description="Connect your Apple Health to automatically sync sleep, heart rate, HRV, steps, and activity data. Real-time synchronization ensures your health score is always up-to-date."
            details={[
              'Sleep quality and duration tracking',
              'Heart rate and Heart Rate Variability (HRV)',
              'Daily steps and distance metrics',
              'Workout and activity data',
              'Real-time sync every hour',
              'Privacy-first integration with local processing',
            ]}
          />
        </div>
      </section>

      {/* Feature 3: Daily Check-Ins */}
      <section className="bg-white py-16 md:py-24 px-4 md:px-0">
        <div className="max-w-4xl mx-auto">
          <FeatureCard
            emoji="🧠"
            title="Daily Check-Ins"
            description="Spend 30 seconds each morning logging how you feel. Track mood, energy, symptoms, and subjective wellness. Merios identifies patterns no traditional app can detect."
            details={[
              '30-second daily log interface',
              'Mood and energy level tracking',
              'Symptom reporting with smart suggestions',
              'Sleep quality self-assessment',
              'Stress and recovery metrics',
              'Pattern recognition across months of data',
            ]}
          />
        </div>
      </section>

      {/* Feature 4: Health Score */}
      <section className="bg-beige-dark py-16 md:py-24 px-4 md:px-0">
        <div className="max-w-4xl mx-auto">
          <FeatureCard
            emoji="⚡"
            title="Unified Health Score"
            description="Get a single, actionable number that reflects your overall health across 11 interconnected systems. Your score updates in real-time as new data arrives."
            details={[
              'Proprietary algorithm balancing 11 health systems',
              'Real-time score updates',
              'Weighted by your health priorities',
              'Week-over-week progress tracking',
              'Predictive trend analysis',
              'System-specific breakdowns and insights',
            ]}
          />
        </div>
      </section>

      {/* Feature 5: 11 Health Systems */}
      <section className="bg-cream py-16 md:py-24 px-4 md:px-0">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl font-bold text-text-primary mb-4 text-center">11 Health Systems</h2>
          <p className="text-text-secondary text-center mb-12 max-w-2xl mx-auto">
            Merios analyzes your health holistically across these interconnected systems:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <HealthSystem name="Cardiovascular Health" />
            <HealthSystem name="Metabolic Health" />
            <HealthSystem name="Immune Function" />
            <HealthSystem name="Hormonal Balance" />
            <HealthSystem name="Liver Health" />
            <HealthSystem name="Kidney Function" />
            <HealthSystem name="Thyroid Health" />
            <HealthSystem name="Inflammation Status" />
            <HealthSystem name="Blood Health" />
            <HealthSystem name="Nutrient Status" />
            <HealthSystem name="Bone & Mineral Health" />
          </div>
        </div>
      </section>

      {/* Feature 6: Personalized Recommendations */}
      <section className="bg-white py-16 md:py-24 px-4 md:px-0">
        <div className="max-w-4xl mx-auto">
          <FeatureCard
            emoji="📈"
            title="Personalized Recommendations"
            description="AI-driven recommendations prioritized by impact. Merios doesn't overwhelm you with generic advice—it suggests specific, evidence-based actions tailored to your unique biomarkers and patterns."
            details={[
              'AI generates recommendations from your data',
              'Priority ranking by health impact',
              'Lifestyle, nutrition, and supplement suggestions',
              'Evidence-based interventions',
              'Progress tracking for each recommendation',
              'Adjusts as your health evolves',
            ]}
          />
        </div>
      </section>

      {/* Numbers Section */}
      <section className="bg-beige py-16 md:py-24 px-4 md:px-0">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-4xl font-bold text-text-primary mb-12 text-center">By The Numbers</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center fade-in">
              <p className="font-serif text-5xl font-bold text-green-primary mb-2">130+</p>
              <p className="text-text-secondary font-sans">Biomarkers Analyzed</p>
            </div>
            <div className="text-center fade-in">
              <p className="font-serif text-5xl font-bold text-green-primary mb-2">11</p>
              <p className="text-text-secondary font-sans">Health Systems</p>
            </div>
            <div className="text-center fade-in">
              <p className="font-serif text-5xl font-bold text-green-primary mb-2">4</p>
              <p className="text-text-secondary font-sans">Health Pillars</p>
            </div>
            <div className="text-center fade-in">
              <p className="font-serif text-5xl font-bold text-green-primary mb-2">100%</p>
              <p className="text-text-secondary font-sans">GDPR Compliant</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-b from-white to-cream py-16 md:py-24 px-4 md:px-0">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-4xl font-bold text-text-primary mb-6">Ready to Know Your Health?</h2>
          <p className="text-text-secondary mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
            Join early access to Merios and be among the first to experience health analytics reimagined.
          </p>
          <Link
            href="/early-access"
            className="inline-block px-8 py-4 bg-green-primary text-white font-sans font-semibold rounded-lg hover:bg-green-deep transition-colors shadow-md hover:shadow-lg"
          >
            Get Early Access
          </Link>
        </div>
      </section>
    </main>
  );
}
