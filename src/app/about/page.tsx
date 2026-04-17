import type { Metadata } from "next";
import Footer from "@/components/Footer";
import ScrollAnimator from "@/components/ScrollAnimator";

export const metadata: Metadata = {
  title: "About Merios — Health Analytics Built for You",
  description:
    "Learn about Merios, the health analytics app that combines blood test analysis, Apple Health data, and daily check-ins into one actionable health score. Our mission: make health data understandable.",
  alternates: {
    canonical: "https://merios.life/about",
  },
  openGraph: {
    title: "About Merios — Health Analytics Built for You",
    description:
      "Learn about Merios, the health analytics app that combines blood test analysis, Apple Health data, and daily check-ins into one actionable health score.",
    url: "https://merios.life/about",
    type: "website",
  },
};

export default function AboutPage() {
  return (
    <>
      <ScrollAnimator />
      <main className="bg-cream text-text-primary">
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center px-6 py-20 fade-in pt-32 md:pt-40">
        <div className="max-w-2xl text-center">
          <h1 className="font-serif text-6xl font-bold text-green-deep mb-6">
            Our Mission
          </h1>
          <p className="font-sans text-xl text-text-secondary leading-relaxed">
            We believe everyone deserves to understand their health.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="max-w-4xl mx-auto px-6 py-24 border-t border-text-tertiary/20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-serif text-4xl font-bold text-green-deep mb-8">
              How Merios Started
            </h2>
            <p className="font-sans text-lg text-text-secondary leading-relaxed mb-6">
              Merios was founded by a health-conscious developer frustrated by the fragmentation of modern health data. Blood tests in one app, wearable data in another, heart rate variability somewhere else—no connection between them. No cohesive story about your health.
            </p>
            <p className="font-sans text-lg text-text-secondary leading-relaxed">
              That frustration became a mission: bridge the gap. Create a single place where all your health signals converge into clarity. Where you own your data, understand your trends, and make informed decisions about your life.
            </p>
          </div>
          <div className="bg-green-light/10 rounded-2xl p-8 border border-green-primary/20">
            <div className="space-y-4">
              <p className="font-serif text-sm uppercase tracking-widest text-green-primary">
                The Problem
              </p>
              <p className="font-sans text-base text-text-secondary">
                Health data lives in silos. Apps don't talk to each other. You're left piecing together fragments, never seeing the full picture of your health.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="max-w-5xl mx-auto px-6 py-24 border-t border-text-tertiary/20">
        <h2 className="font-serif text-4xl font-bold text-green-deep mb-16 text-center">
          Our Values
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Clarity */}
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-green-primary/10 rounded-full flex items-center justify-center mb-6">
              <span className="font-serif text-2xl text-green-primary">C</span>
            </div>
            <h3 className="font-serif text-xl font-bold text-green-deep mb-3">
              Clarity
            </h3>
            <p className="font-sans text-text-secondary leading-relaxed">
              Health data should be transparent and understandable, not overwhelming. We make complexity simple.
            </p>
          </div>

          {/* Privacy-First */}
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-green-primary/10 rounded-full flex items-center justify-center mb-6">
              <span className="font-serif text-2xl text-green-primary">P</span>
            </div>
            <h3 className="font-serif text-xl font-bold text-green-deep mb-3">
              Privacy-First
            </h3>
            <p className="font-sans text-text-secondary leading-relaxed">
              Your data is yours. We encrypt it, never sell it, and give you full control. Privacy isn't negotiable.
            </p>
          </div>

          {/* Evidence-Based */}
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-green-primary/10 rounded-full flex items-center justify-center mb-6">
              <span className="font-serif text-2xl text-green-primary">E</span>
            </div>
            <h3 className="font-serif text-xl font-bold text-green-deep mb-3">
              Evidence-Based
            </h3>
            <p className="font-sans text-text-secondary leading-relaxed">
              Our algorithms are grounded in scientific research. Every insight is backed by peer-reviewed data.
            </p>
          </div>

          {/* User-Centric */}
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-green-primary/10 rounded-full flex items-center justify-center mb-6">
              <span className="font-serif text-2xl text-green-primary">U</span>
            </div>
            <h3 className="font-serif text-xl font-bold text-green-deep mb-3">
              User-Centric
            </h3>
            <p className="font-sans text-text-secondary leading-relaxed">
              You drive our roadmap. We listen, iterate, and build features that truly matter to your health.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="max-w-4xl mx-auto px-6 py-24 border-t border-text-tertiary/20">
        <h2 className="font-serif text-4xl font-bold text-green-deep mb-16 text-center">
          Our Journey
        </h2>
        <div className="space-y-8">
          {/* 2025 */}
          <div className="flex gap-8 items-start">
            <div className="w-32 flex-shrink-0">
              <p className="font-serif text-lg font-bold text-green-primary">2025</p>
            </div>
            <div className="flex-grow pb-8 border-l-2 border-green-light pl-8">
              <h3 className="font-serif text-xl font-bold text-green-deep mb-2">
                Idea Born
              </h3>
              <p className="font-sans text-text-secondary">
                The vision crystallized: a unified platform to connect all your health signals and make sense of them.
              </p>
            </div>
          </div>

          {/* Q1 2026 */}
          <div className="flex gap-8 items-start">
            <div className="w-32 flex-shrink-0">
              <p className="font-serif text-lg font-bold text-green-primary">Q1 2026</p>
            </div>
            <div className="flex-grow pb-8 border-l-2 border-green-light pl-8">
              <h3 className="font-serif text-xl font-bold text-green-deep mb-2">
                Development Begins
              </h3>
              <p className="font-sans text-text-secondary">
                Engineering kicks off. We build the core engine, biomarker analysis, and privacy-first architecture.
              </p>
            </div>
          </div>

          {/* Q2 2026 */}
          <div className="flex gap-8 items-start">
            <div className="w-32 flex-shrink-0">
              <p className="font-serif text-lg font-bold text-green-primary">Q2 2026</p>
            </div>
            <div className="flex-grow pb-8 border-l-2 border-green-light pl-8">
              <h3 className="font-serif text-xl font-bold text-green-deep mb-2">
                Beta Launch
              </h3>
              <p className="font-sans text-text-secondary">
                Early access opens to a limited group. We gather feedback, iterate, and refine the experience.
              </p>
            </div>
          </div>

          {/* Q3 2026 */}
          <div className="flex gap-8 items-start">
            <div className="w-32 flex-shrink-0">
              <p className="font-serif text-lg font-bold text-green-primary">Q3 2026</p>
            </div>
            <div className="flex-grow border-l-2 border-green-light pl-8">
              <h3 className="font-serif text-xl font-bold text-green-deep mb-2">
                Public Launch (Planned)
              </h3>
              <p className="font-sans text-text-secondary">
                Merios opens to everyone. Help millions take control of their health data.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-3xl mx-auto px-6 py-24 text-center border-t border-text-tertiary/20">
        <h2 className="font-serif text-3xl font-bold text-green-deep mb-8">
          Be Part of the Story
        </h2>
        <p className="font-sans text-lg text-text-secondary mb-12">
          Join thousands getting early access to Merios. Be among the first to see your health clearly.
        </p>
        <a
          href="/early-access"
          className="inline-block bg-green-primary hover:bg-green-deep text-cream font-sans font-semibold px-8 py-4 rounded-lg transition-colors duration-300"
        >
          Get Early Access
        </a>
      </section>
      </main>
      <Footer />
    </>
  );
}
