import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollAnimator from "@/components/ScrollAnimator";

export const metadata: Metadata = {
  metadataBase: new URL("https://merios.life"),
  title: "How Merios Works — 4-Step Health Intelligence",
  description:
    "Discover how Merios turns your health data into clear insights. Connect your sources, centralize everything, understand your patterns, and act on what matters.",
  keywords: [
    "how merios works",
    "health analytics",
    "health score",
    "Apple Health integration",
    "blood test analysis",
    "health insights",
  ],
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://merios.life/how-it-works",
  },
  openGraph: {
    title: "How Merios Works — 4-Step Health Intelligence",
    description:
      "Discover how Merios turns your health data into clear insights. Connect, centralize, understand, and act.",
    url: "https://merios.life/how-it-works",
    siteName: "Merios",
    type: "website",
    locale: "en_US",
  },
};

export default function HowItWorksPage() {
  const steps = [
    {
      number: "1",
      title: "Connect",
      subtitle: "Gather all your health data in one place",
      description:
        "Merios integrates seamlessly with Apple Health, letting you pull in years of activity, heart rate, sleep, and wellness data with a single tap. You can also scan lab results using your camera—our advanced OCR extracts biomarkers automatically, no manual data entry needed. Whether you're syncing wearables, importing historic results, or adding new blood work, Merios meets your data where it lives.",
    },
    {
      number: "2",
      title: "Centralize",
      subtitle: "Organize everything into one unified dashboard",
      description:
        "Instead of juggling multiple apps, PDFs, and doctor's notes, your complete health history lives in one organized place. All your data—from blood tests to daily activity to check-ins—is organized chronologically, searchable, and ready for analysis. No more hunting through emails for old results or trying to remember what your cholesterol was six months ago. Your data is yours, secure, and always accessible.",
    },
    {
      number: "3",
      title: "Understand",
      subtitle: "Get clear insights powered by AI",
      description:
        "This is where the intelligence happens. Merios analyzes your data across 11 health systems—cardiovascular, metabolic, immune, endocrine, and more—creating a unified health score that goes beyond any single metric. You get trend analysis that reveals patterns over time, plain-language explanations of what your biomarkers mean, and context about what's improving or needs attention. No medical degree required. Powered by AI, grounded in science.",
    },
    {
      number: "4",
      title: "Act",
      subtitle: "Turn insights into meaningful change",
      description:
        "Understanding is just the beginning. Merios generates personalized recommendations tailored to your specific biomarkers, health goals, and lifestyle. Track progress with intelligent metrics that update as your data changes. Celebrate improvements and catch issues early. Get nudges when meaningful patterns emerge. Merios turns knowledge into action.",
    },
  ];

  const dataSources = [
    {
      icon: "🏥",
      name: "Apple Health",
      description:
        "Sync activity, heart rate, sleep, steps, and more directly from your iPhone.",
    },
    {
      icon: "🧪",
      name: "Blood Tests",
      description:
        "Scan lab results with your camera. OCR extracts biomarkers automatically.",
    },
    {
      icon: "📝",
      name: "Daily Check-ins",
      description:
        "Log symptoms, mood, energy, and other health markers throughout your day.",
    },
  ];

  return (
    <>
      <ScrollAnimator />
      <Navbar />
      <main>
        {/* Hero Section */}
        <section className="min-h-[60vh] flex flex-col justify-center items-center text-center px-6 pt-40 pb-24 relative overflow-hidden">
          {/* Background gradient orb */}
          <div
            className="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[900px] h-[900px] rounded-full pointer-events-none"
            style={{
              background:
                "radial-gradient(circle, rgba(45,90,61,0.04) 0%, transparent 70%)",
            }}
          />

          <div className="relative z-10 max-w-3xl fade-in">
            <p className="text-xs uppercase tracking-[0.18em] text-green-primary font-semibold mb-6">
              The Journey to Health Intelligence
            </p>
            <h1
              className="font-serif text-6xl md:text-7xl font-medium leading-[1.08] tracking-tight text-green-deep mb-6"
              style={{ letterSpacing: "-0.02em" }}
            >
              How Merios Works
            </h1>
            <p className="text-lg md:text-xl leading-relaxed text-text-secondary font-light max-w-2xl mx-auto">
              From connecting your health data to acting on personalized insights, here's the 4-step journey that transforms raw numbers into clarity and confidence.
            </p>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-24 px-6 bg-cream">
          <div className="max-w-4xl mx-auto">
            {steps.map((step, index) => (
              <div
                key={index}
                className="mb-20 fade-in last:mb-0"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                {/* Step Header with Number */}
                <div className="flex items-start gap-6 md:gap-10 mb-8">
                  {/* Number Circle */}
                  <div className="flex-shrink-0">
                    <div
                      className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-green-primary to-green-light flex items-center justify-center font-serif text-2xl md:text-3xl font-bold text-white shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, rgba(45,90,61,0.9) 0%, rgba(58,122,82,0.8) 100%)`,
                      }}
                    >
                      {step.number}
                    </div>
                  </div>

                  {/* Step Title and Subtitle */}
                  <div className="flex-1 pt-1">
                    <h2
                      className="font-serif text-3xl md:text-4xl font-medium text-green-deep mb-2"
                      style={{ letterSpacing: "-0.01em" }}
                    >
                      {step.title}
                    </h2>
                    <p className="text-base md:text-lg text-green-muted font-medium">
                      {step.subtitle}
                    </p>
                  </div>
                </div>

                {/* Step Description */}
                <div className="ml-20 md:ml-32">
                  <p className="text-base md:text-lg leading-relaxed text-text-secondary">
                    {step.description}
                  </p>
                </div>

                {/* Divider */}
                {index < steps.length - 1 && (
                  <div className="mt-16 h-px bg-gradient-to-r from-green-primary/20 via-green-primary/10 to-transparent" />
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Data Sources Section */}
        <section className="py-32 px-6 bg-beige">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16 fade-in">
              <p className="text-xs uppercase tracking-[0.18em] text-green-primary font-semibold mb-5">
                Flexible Integration
              </p>
              <h2
                className="font-serif text-4xl md:text-5xl font-medium text-green-deep mb-6"
                style={{ letterSpacing: "-0.02em" }}
              >
                Data Sources Merios Connects To
              </h2>
              <p className="text-base md:text-lg text-text-secondary max-w-2xl mx-auto">
                Connect whatever health data you have. Whether it's from your phone, your doctor, or your daily habits, Merios brings it together.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {dataSources.map((source, index) => (
                <div
                  key={index}
                  className="p-8 bg-cream rounded-2xl border border-green-primary/10 hover:border-green-primary/30 hover:shadow-md transition-all duration-300 fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="text-4xl mb-4">{source.icon}</div>
                  <h3 className="font-serif text-xl font-semibold text-green-deep mb-3">
                    {source.name}
                  </h3>
                  <p className="text-sm leading-relaxed text-text-secondary">
                    {source.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-32 px-6">
          <div className="max-w-3xl mx-auto text-center fade-in">
            <h2
              className="font-serif text-4xl md:text-5xl font-medium text-green-deep mb-6"
              style={{ letterSpacing: "-0.02em" }}
            >
              Ready to understand your body?
            </h2>
            <p className="text-lg text-text-secondary mb-10 leading-relaxed">
              Join the waitlist for early access to Merios. Be among the first to experience health intelligence that actually makes sense.
            </p>
            <a
              href="/early-access"
              className="inline-flex items-center gap-3 px-10 py-4 bg-green-deep text-white rounded-full text-base font-semibold hover:bg-green-primary hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300"
            >
              Get Early Access
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
