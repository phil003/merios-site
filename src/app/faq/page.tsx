import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollAnimator from "@/components/ScrollAnimator";
import { FAQPageSchema } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "FAQ — Merios Health Score App | Biomarker Tracking Questions",
  description:
    "Get answers about Merios: how the health score works, biomarker tracking, blood test OCR, Apple Health integration, data privacy, pricing, and supported devices.",
  alternates: {
    canonical: "https://merios.life/faq",
  },
};

export default function FAQPage() {
  const faqCategories = [
    {
      category: "Product",
      questions: [
        {
          q: "What is Merios?",
          a: "Merios is a premium health analytics app that connects all your health data—blood tests, wearables, fitness trackers, sleep monitors—into one unified dashboard. We analyze your biomarkers, track trends over time, and give you actionable insights to optimize your health.",
        },
        {
          q: "How does the health score work?",
          a: "Your Merios Health Score synthesizes data across 50+ biomarkers and wellness signals. We weight factors like cardiovascular health, metabolic markers, sleep quality, and activity levels using evidence-based algorithms. The score updates dynamically as new data arrives, helping you see how your lifestyle changes impact your overall health.",
        },
        {
          q: "What biomarkers does Merios track?",
          a: "We track comprehensive health markers: lipid panels (cholesterol, triglycerides), glucose control (fasting glucose, HbA1c), liver and kidney function, inflammatory markers (CRP, ESR), immunity (white blood cells), and micronutrient levels (iron, vitamin D, B12). We also integrate wearable data like heart rate variability, sleep architecture, and daily activity.",
        },
        {
          q: "Is Merios a replacement for my doctor?",
          a: "No. Merios is a complementary tool for personal health tracking and education. Always consult your doctor for diagnosis, treatment decisions, and medical concerns. We help you understand your data and ask better questions during appointments—not replace professional medical advice.",
        },
      ],
    },
    {
      category: "Data & Privacy",
      questions: [
        {
          q: "How is my data stored?",
          a: "Your data is encrypted at rest using industry-standard AES-256 encryption and in transit with TLS 1.3. We store everything on secure, HIPAA-compliant servers in regional data centers. You maintain full ownership and can export or delete your data anytime.",
        },
        {
          q: "Do you sell my data?",
          a: "Never. We never sell, share, or monetize your personal health data. Our revenue comes from subscriptions and premium features—not data brokerage. Your health information is yours alone.",
        },
        {
          q: "Can I delete my data?",
          a: "Yes, absolutely. You can delete individual data points, entire categories (like all your blood tests), or your complete account with one click. Once deleted, it's permanently removed from our servers within 30 days.",
        },
        {
          q: "Is Merios GDPR compliant?",
          a: "Yes. We comply with GDPR, HIPAA, and CCPA regulations. You have the right to access, correct, port, and delete your data. Our privacy policy details all data processing, and we maintain Data Processing Agreements with all third-party vendors.",
        },
      ],
    },
    {
      category: "Pricing",
      questions: [
        {
          q: "Is there a free plan?",
          a: "Merios offers a free Basic plan with limited biomarker tracking, quarterly insights, and basic trend analysis. Our Pro plan ($14.99/month) includes unlimited biomarkers, real-time sync with 100+ devices, advanced analytics, and personalized recommendations.",
        },
        {
          q: "How much does Pro cost?",
          a: "Merios Pro is $14.99/month (billed monthly) or $149/year (billed annually for a 17% discount). You get unlimited biomarker tracking, real-time wearable integration, advanced analytics, priority support, and early access to new features.",
        },
        {
          q: "Can I cancel anytime?",
          a: "Yes, with no penalties or hidden fees. Cancel your subscription anytime from account settings. Your data remains yours—you can still access it in your Basic account or export it before canceling.",
        },
      ],
    },
    {
      category: "Technical",
      questions: [
        {
          q: "Which devices are supported?",
          a: "We integrate with Apple Health, Oura Ring, Whoop, Fitbit, Garmin, Withings, and others. You can also manually upload blood test PDFs, import HL7 records from your health provider, or sync via CSV. New integrations are added regularly.",
        },
        {
          q: "Does it work with Android?",
          a: "Merios launched on iOS, with Android coming Q3 2026. Android users can currently access our web app at merios.life and manage most features through desktop. We're building a native Android app now.",
        },
        {
          q: "How do I scan blood tests?",
          a: "Upload your blood test PDF or take a photo of your lab results. Our OCR engine automatically extracts biomarker values, dates, and reference ranges. You can review and correct any values before they're added to your timeline.",
        },
      ],
    },
  ];

  // Flatten all questions for schema markup
  const allQuestions = faqCategories.flatMap((cat) => cat.questions);

  return (
    <>
      <FAQPageSchema questions={allQuestions} />
      <ScrollAnimator />
      <Navbar />
      <main className="bg-cream text-text-primary">
        {/* Hero Section */}
        <section className="min-h-[50vh] flex items-center justify-center px-6 py-20 fade-in pt-32 md:pt-40">
        <div className="max-w-2xl text-center">
          <h1 className="font-serif text-6xl font-bold text-green-deep mb-6">
            Frequently Asked Questions
          </h1>
          <p className="font-sans text-lg text-text-secondary">
            Everything you need to know about Merios, how it works, and how we protect your data.
          </p>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="max-w-4xl mx-auto px-6 py-24">
        {faqCategories.map((category, idx) => (
          <div key={idx} className="mb-20">
            <h2 className="font-serif text-3xl font-bold text-green-deep mb-12">
              {category.category}
            </h2>
            <div className="space-y-6">
              {category.questions.map((item, qIdx) => (
                <details
                  key={qIdx}
                  className="group border border-text-tertiary/20 rounded-lg hover:border-green-light/40 transition-colors duration-300"
                >
                  <summary className="cursor-pointer font-sans font-semibold text-lg p-6 hover:bg-green-light/5 transition-colors duration-300">
                    <span className="flex items-center justify-between">
                      <span className="text-text-primary">{item.q}</span>
                      <span className="text-green-primary group-open:rotate-180 transition-transform duration-300">
                        ▼
                      </span>
                    </span>
                  </summary>
                  <div className="px-6 pb-6 pt-0 border-t border-text-tertiary/10 bg-green-light/5">
                    <p className="font-sans text-text-secondary leading-relaxed">
                      {item.a}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        ))}
      </section>

      {/* CTA Section */}
      <section className="max-w-3xl mx-auto px-6 py-24 border-t border-text-tertiary/20 text-center">
        <h2 className="font-serif text-3xl font-bold text-green-deep mb-6">
          Didn't find what you're looking for?
        </h2>
        <p className="font-sans text-lg text-text-secondary mb-8">
          We're here to help. Reach out with any questions.
        </p>
        <a
          href="/contact"
          className="inline-block bg-green-primary hover:bg-green-deep text-cream font-sans font-semibold px-8 py-4 rounded-lg transition-colors duration-300"
        >
          Get in Touch
        </a>
      </section>
      </main>
      <Footer />
    </>
  );
}
