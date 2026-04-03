import Link from 'next/link';

export const metadata = {
  title: 'Pricing | Merios Premium Health Analytics',
  description: 'Simple, transparent pricing for Merios. Choose between our Free plan or Pro subscription with 130+ biomarkers and AI recommendations.',
};

export default function PricingPage() {
  const faqItems = [
    {
      question: 'Can I start with the Free plan and upgrade later?',
      answer: 'Yes, absolutely. You can start with our Free plan and upgrade to Pro at any time. Your health data and history will carry over seamlessly, and you\'ll immediately get access to the full 130+ biomarkers and all 11 health systems.'
    },
    {
      question: 'What biomarkers are included in the Free plan?',
      answer: 'The Free plan includes 20 core biomarkers covering cardiovascular health, metabolic function, basic organ function, and nutrient levels. These give you a solid foundation for understanding your health, though the Pro plan provides a much more comprehensive picture.'
    },
    {
      question: 'Is there a commitment required for the Pro plan?',
      answer: 'No. Both monthly and annual Pro subscriptions can be cancelled anytime with no penalty. We believe in earning your trust continuously, not locking you in. If you cancel, you retain read-only access to your historical data.'
    },
    {
      question: 'How often should I check my health score?',
      answer: 'We recommend monthly check-ins to track meaningful changes. However, you can review your score anytime. With wearable integration, your health data updates continuously, providing real-time insights into trends like sleep quality, activity, and recovery.'
    },
    {
      question: 'Do you offer team or family plans?',
      answer: 'Currently, each person needs their own account to maintain data privacy and personalized recommendations. We\'re exploring family options for a future release. Reach out if this is important to you.'
    }
  ];

  return (
    <main className="bg-cream">
      {/* Hero Section */}
      <section className="fade-in min-h-screen flex items-center justify-center px-6 pt-32 pb-20 md:pt-40 md:pb-32">
        <div className="max-w-3xl text-center">
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-text-primary mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="font-sans text-lg md:text-xl text-text-secondary mb-8 leading-relaxed">
            Start free and gain insights into your health. Upgrade to Pro for comprehensive biomarker analysis and AI-powered recommendations.
          </p>
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section className="fade-in py-20 md:py-32 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Free Plan */}
            <div className="relative border border-green-light/20 rounded-xl p-8 md:p-10 bg-gradient-to-br from-white to-green-light/3">
              <div className="mb-8">
                <h3 className="font-serif text-3xl font-bold text-text-primary mb-2">
                  Free
                </h3>
                <p className="text-text-tertiary text-sm">
                  Perfect for getting started
                </p>
              </div>

              <div className="mb-8">
                <div className="font-sans text-4xl font-bold text-text-primary">
                  $0
                </div>
                <p className="text-text-tertiary text-sm mt-1">
                  Forever free, no credit card required
                </p>
              </div>

              <Link
                href="/early-access"
                className="w-full block text-center bg-green-primary hover:bg-green-light text-cream font-sans font-semibold px-6 py-3 rounded-lg transition-colors mb-10"
              >
                Get Started
              </Link>

              <div className="space-y-4">
                <h4 className="font-serif text-sm font-bold text-text-primary uppercase tracking-wide">
                  What's Included
                </h4>
                <ul className="space-y-3">
                  <li className="flex gap-3 items-start">
                    <span className="text-green-primary font-bold mt-1 flex-shrink-0">✓</span>
                    <span className="text-text-secondary text-sm">Basic health score calculation</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="text-green-primary font-bold mt-1 flex-shrink-0">✓</span>
                    <span className="text-text-secondary text-sm">20 core biomarkers tracked</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="text-green-primary font-bold mt-1 flex-shrink-0">✓</span>
                    <span className="text-text-secondary text-sm">Apple Health sync</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="text-green-primary font-bold mt-1 flex-shrink-0">✓</span>
                    <span className="text-text-secondary text-sm">Monthly check-in summary</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="text-green-primary font-bold mt-1 flex-shrink-0">✓</span>
                    <span className="text-text-secondary text-sm">Community support access</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="relative border-2 border-green-primary rounded-xl p-8 md:p-10 bg-gradient-to-br from-green-primary/5 to-transparent shadow-lg md:scale-105 md:origin-center">
              <div className="absolute -top-4 left-6 bg-green-primary text-cream px-4 py-1 rounded-full text-xs font-semibold uppercase">
                Recommended
              </div>

              <div className="mb-8">
                <h3 className="font-serif text-3xl font-bold text-text-primary mb-2">
                  Pro
                </h3>
                <p className="text-text-tertiary text-sm">
                  For serious health tracking
                </p>
              </div>

              <div className="mb-8">
                <div className="space-y-2">
                  <div className="font-sans text-4xl font-bold text-text-primary">
                    $9.99<span className="text-lg text-text-secondary">/month</span>
                  </div>
                  <div className="text-text-tertiary text-sm">
                    or <span className="font-semibold text-text-secondary">$79.99/year</span> (save 33%)
                  </div>
                </div>
              </div>

              <Link
                href="/early-access"
                className="w-full block text-center bg-green-primary hover:bg-green-light text-cream font-sans font-semibold px-6 py-3 rounded-lg transition-colors mb-10"
              >
                Start Pro Trial
              </Link>

              <div className="space-y-4">
                <h4 className="font-serif text-sm font-bold text-text-primary uppercase tracking-wide">
                  Everything in Free, Plus
                </h4>
                <ul className="space-y-3">
                  <li className="flex gap-3 items-start">
                    <span className="text-green-primary font-bold mt-1 flex-shrink-0">✓</span>
                    <span className="text-text-secondary text-sm">130+ biomarkers analyzed</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="text-green-primary font-bold mt-1 flex-shrink-0">✓</span>
                    <span className="text-text-secondary text-sm">All 11 health systems</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="text-green-primary font-bold mt-1 flex-shrink-0">✓</span>
                    <span className="text-text-secondary text-sm">AI-powered recommendations</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="text-green-primary font-bold mt-1 flex-shrink-0">✓</span>
                    <span className="text-text-secondary text-sm">Unlimited check-ins</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="text-green-primary font-bold mt-1 flex-shrink-0">✓</span>
                    <span className="text-text-secondary text-sm">Priority email support</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <span className="text-green-primary font-bold mt-1 flex-shrink-0">✓</span>
                    <span className="text-text-secondary text-sm">Early access to new features</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <p className="text-center text-text-tertiary text-sm mt-8">
            All prices in USD. Your subscription renews automatically. Cancel anytime.
          </p>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="fade-in py-20 md:py-32 px-6 bg-cream">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-text-primary mb-4 text-center">
            Frequently Asked Questions
          </h2>
          <p className="text-center text-text-secondary mb-16 text-lg">
            Everything you need to know about Merios pricing and plans
          </p>

          <div className="space-y-6">
            {faqItems.map((item, index) => (
              <div
                key={index}
                className="bg-white border border-green-light/15 rounded-lg p-6 md:p-8"
              >
                <h3 className="font-serif text-lg font-bold text-text-primary mb-3">
                  {item.question}
                </h3>
                <p className="text-text-secondary leading-relaxed text-sm md:text-base">
                  {item.answer}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-12 bg-green-primary/10 border border-green-primary/20 rounded-lg p-8 text-center">
            <p className="text-text-secondary mb-4">
              Have a question we didn't answer?
            </p>
            <a
              href="mailto:hello@merios.com"
              className="inline-block text-green-primary hover:text-green-light font-semibold transition-colors"
            >
              Get in touch with our team
            </a>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="fade-in py-20 md:py-32 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-serif text-3xl font-bold text-text-primary mb-12 text-center">
            Feature Comparison
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-green-light/20">
                  <th className="text-left py-4 px-4 font-serif text-text-primary font-bold">
                    Feature
                  </th>
                  <th className="text-center py-4 px-4 font-sans text-text-primary font-semibold">
                    Free
                  </th>
                  <th className="text-center py-4 px-4 font-sans text-text-primary font-semibold">
                    Pro
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-green-light/10">
                  <td className="py-4 px-4 text-text-secondary text-sm">Biomarkers</td>
                  <td className="text-center py-4 px-4 text-text-primary font-semibold">20</td>
                  <td className="text-center py-4 px-4 text-text-primary font-semibold">130+</td>
                </tr>
                <tr className="border-b border-green-light/10">
                  <td className="py-4 px-4 text-text-secondary text-sm">Health Systems</td>
                  <td className="text-center py-4 px-4 text-text-primary">Limited</td>
                  <td className="text-center py-4 px-4 text-text-primary font-semibold">All 11</td>
                </tr>
                <tr className="border-b border-green-light/10">
                  <td className="py-4 px-4 text-text-secondary text-sm">Apple Health Sync</td>
                  <td className="text-center py-4 px-4">
                    <span className="text-green-primary font-bold">✓</span>
                  </td>
                  <td className="text-center py-4 px-4">
                    <span className="text-green-primary font-bold">✓</span>
                  </td>
                </tr>
                <tr className="border-b border-green-light/10">
                  <td className="py-4 px-4 text-text-secondary text-sm">Check-in Frequency</td>
                  <td className="text-center py-4 px-4 text-text-primary">Monthly</td>
                  <td className="text-center py-4 px-4 text-text-primary font-semibold">Unlimited</td>
                </tr>
                <tr className="border-b border-green-light/10">
                  <td className="py-4 px-4 text-text-secondary text-sm">AI Recommendations</td>
                  <td className="text-center py-4 px-4 text-text-tertiary">—</td>
                  <td className="text-center py-4 px-4">
                    <span className="text-green-primary font-bold">✓</span>
                  </td>
                </tr>
                <tr className="border-b border-green-light/10">
                  <td className="py-4 px-4 text-text-secondary text-sm">Advanced Analytics</td>
                  <td className="text-center py-4 px-4 text-text-tertiary">—</td>
                  <td className="text-center py-4 px-4">
                    <span className="text-green-primary font-bold">✓</span>
                  </td>
                </tr>
                <tr className="border-b border-green-light/10">
                  <td className="py-4 px-4 text-text-secondary text-sm">Priority Support</td>
                  <td className="text-center py-4 px-4 text-text-tertiary">—</td>
                  <td className="text-center py-4 px-4">
                    <span className="text-green-primary font-bold">✓</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 text-text-secondary text-sm">Early Feature Access</td>
                  <td className="text-center py-4 px-4 text-text-tertiary">—</td>
                  <td className="text-center py-4 px-4">
                    <span className="text-green-primary font-bold">✓</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="fade-in py-20 md:py-32 px-6 bg-green-deep">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-cream mb-6">
            Start Your Health Journey Today
          </h2>
          <p className="text-green-light text-lg mb-10 leading-relaxed">
            Join our early access program. Start free, upgrade anytime.
          </p>
          <Link
            href="/early-access"
            className="inline-block bg-green-primary hover:bg-green-light text-cream font-sans font-semibold px-8 py-4 rounded-lg transition-colors"
          >
            Get Early Access
          </Link>
          <p className="text-green-light text-sm mt-6">
            No credit card required
          </p>
        </div>
      </section>
    </main>
  );
}
