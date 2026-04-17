import type { Metadata } from "next";
import Footer from "@/components/Footer";
import ScrollAnimator from "@/components/ScrollAnimator";

export const metadata: Metadata = {
  title: "Contact Merios — Get in Touch",
  description:
    "Have questions about Merios? Contact our team for support with blood test analysis, biomarker tracking, health score questions, or partnership inquiries.",
  alternates: {
    canonical: "https://merios.life/contact",
  },
  openGraph: {
    title: "Contact Merios — Get in Touch",
    description:
      "Have questions about Merios? Contact our team for support with blood test analysis, biomarker tracking, and health score questions.",
    url: "https://merios.life/contact",
    type: "website",
  },
};

export default function ContactPage() {
  return (
    <>
      <ScrollAnimator />
      <div className="bg-cream text-text-primary">
        {/* Hero Section */}
        <section className="min-h-[50vh] flex items-center justify-center px-6 pt-32 pb-20 fade-in">
        <div className="max-w-2xl text-center">
          <h1 className="font-serif text-6xl font-bold text-green-deep mb-6">
            Get in Touch
          </h1>
          <p className="font-sans text-lg text-text-secondary">
            We'd love to hear from you. Questions, feedback, or partnership opportunities—reach out.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-24">
          {/* Email */}
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-green-primary/10 rounded-full flex items-center justify-center mb-6">
              <span className="text-2xl">✉</span>
            </div>
            <h3 className="font-serif text-xl font-bold text-green-deep mb-3">
              Email
            </h3>
            <a
              href="mailto:hello@merios.life"
              className="font-sans text-green-primary hover:text-green-deep transition-colors duration-300 font-semibold"
            >
              hello@merios.life
            </a>
            <p className="font-sans text-sm text-text-secondary mt-3">
              We typically respond within 24 hours.
            </p>
          </div>

          {/* Instagram */}
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-green-primary/10 rounded-full flex items-center justify-center mb-6">
              <span className="text-2xl">📷</span>
            </div>
            <h3 className="font-serif text-xl font-bold text-green-deep mb-3">
              Instagram
            </h3>
            <a
              href="https://instagram.com/merioshealth"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-green-primary hover:text-green-deep transition-colors duration-300 font-semibold"
            >
              @merioshealth
            </a>
            <p className="font-sans text-sm text-text-secondary mt-3">
              Daily health insights and updates.
            </p>
          </div>

          {/* X (Twitter) */}
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-green-primary/10 rounded-full flex items-center justify-center mb-6">
              <span className="text-2xl">𝕏</span>
            </div>
            <h3 className="font-serif text-xl font-bold text-green-deep mb-3">
              X
            </h3>
            <a
              href="https://x.com/merioshealth"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-green-primary hover:text-green-deep transition-colors duration-300 font-semibold"
            >
              @merioshealth
            </a>
            <p className="font-sans text-sm text-text-secondary mt-3">
              Latest product news and features.
            </p>
          </div>
        </div>

        {/* LinkedIn */}
        <div className="text-center mb-24 pb-24 border-b border-text-tertiary/20">
          <div className="w-16 h-16 mx-auto bg-green-primary/10 rounded-full flex items-center justify-center mb-6">
            <span className="text-2xl">💼</span>
          </div>
          <h3 className="font-serif text-xl font-bold text-green-deep mb-3">
            LinkedIn
          </h3>
          <a
            href="https://linkedin.com/company/merios"
            target="_blank"
            rel="noopener noreferrer"
            className="font-sans text-green-primary hover:text-green-deep transition-colors duration-300 font-semibold"
          >
            Merios
          </a>
          <p className="font-sans text-sm text-text-secondary mt-3">
            Company updates and industry insights.
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="max-w-2xl mx-auto px-6 py-24">
        <h2 className="font-serif text-4xl font-bold text-green-deep mb-12 text-center">
          Send us a Message
        </h2>

        <div className="bg-green-light/5 border border-green-light/30 rounded-xl p-8 mb-8">
          <form className="space-y-6">
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block font-sans font-semibold text-text-primary mb-2"
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Jane Doe"
                className="w-full px-4 py-3 bg-cream border border-text-tertiary/20 rounded-lg font-sans text-text-primary placeholder-text-tertiary/60 focus:outline-none focus:ring-2 focus:ring-green-primary transition-all duration-300"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block font-sans font-semibold text-text-primary mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="jane@example.com"
                className="w-full px-4 py-3 bg-cream border border-text-tertiary/20 rounded-lg font-sans text-text-primary placeholder-text-tertiary/60 focus:outline-none focus:ring-2 focus:ring-green-primary transition-all duration-300"
              />
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block font-sans font-semibold text-text-primary mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                placeholder="Tell us what's on your mind..."
                rows={6}
                className="w-full px-4 py-3 bg-cream border border-text-tertiary/20 rounded-lg font-sans text-text-primary placeholder-text-tertiary/60 focus:outline-none focus:ring-2 focus:ring-green-primary transition-all duration-300 resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled
              className="w-full bg-green-primary hover:bg-green-deep text-cream font-sans font-semibold py-4 rounded-lg transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              Send Message
            </button>
          </form>

          {/* Coming Soon Notice */}
          <div className="mt-6 pt-6 border-t border-green-primary/20">
            <p className="font-sans text-sm text-text-secondary text-center">
              <span className="text-green-primary font-semibold">Coming soon:</span> This form will be fully functional shortly. In the meantime, please email us at hello@merios.life.
            </p>
          </div>
        </div>

        {/* Response Time */}
        <div className="bg-beige/40 border border-text-tertiary/10 rounded-lg p-6 text-center">
          <p className="font-sans text-text-secondary">
            <span className="text-green-primary font-semibold">Response time:</span> We typically respond within 24 hours.
          </p>
        </div>
      </section>

      {/* Help Link */}
      <section className="max-w-2xl mx-auto px-6 py-24 text-center border-t border-text-tertiary/20">
        <p className="font-sans text-text-secondary mb-6">
          Most questions answered in our FAQ.
        </p>
        <a
          href="/faq"
          className="inline-block text-green-primary hover:text-green-deep font-sans font-semibold transition-colors duration-300"
        >
          Browse FAQ →
        </a>
      </section>
      </div>
      <Footer />
    </>
  );
}
