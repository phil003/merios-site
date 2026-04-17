import { Metadata } from 'next';
import Footer from "@/components/Footer";
import ScrollAnimator from "@/components/ScrollAnimator";

export const metadata: Metadata = {
  title: "Support — Merios",
  description:
    "Get help with Merios. Find answers to common questions about blood test analysis, biomarker tracking, your health score, account management, and more.",
  alternates: {
    canonical: "https://merios.life/support",
  },
  openGraph: {
    title: "Support — Merios",
    description:
      "Get help with Merios. Find answers to common questions about blood test analysis, biomarker tracking, your health score, and account management.",
    url: "https://merios.life/support",
    type: "website",
  },
};

export default function SupportPage() {
  return (
    <>
      <ScrollAnimator />
      <main className="min-h-screen bg-gradient-to-b from-cream to-beige" style={{ backgroundColor: '#FDFCF9' }}>
        {/* Hero Section */}
        <div className="border-b" style={{ borderColor: '#E8E4DC' }}>
          <div className="mx-auto max-w-4xl px-6 pt-32 pb-16 sm:px-8 sm:py-24">
            <h1
              className="font-serif text-5xl font-bold tracking-tight"
              style={{ color: '#1A1A1A' }}
            >
              Support
            </h1>
            <p
              className="mt-4 text-lg"
              style={{ color: '#5C5650' }}
            >
              We&apos;re here to help. Find answers below or reach out directly.
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="mx-auto max-w-4xl px-6 py-16 sm:px-8 sm:py-24">
          <div className="prose prose-lg max-w-none space-y-12">

            {/* Contact */}
            <section>
              <h2
                className="font-serif text-3xl font-bold tracking-tight"
                style={{ color: '#1E3D2A' }}
              >
                Contact Us
              </h2>
              <p
                className="mt-4 text-base leading-relaxed"
                style={{ color: '#5C5650' }}
              >
                For any questions, issues, or feedback, you can reach our support team at{' '}
                <a
                  href="mailto:support@merios.life"
                  className="text-green-primary hover:text-green-deep transition-colors duration-300 font-semibold"
                >
                  support@merios.life
                </a>
                . We typically respond within 24 hours.
              </p>
            </section>

            {/* Getting Started */}
            <section>
              <h2
                className="font-serif text-3xl font-bold tracking-tight"
                style={{ color: '#1E3D2A' }}
              >
                Getting Started
              </h2>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="font-serif text-xl font-bold" style={{ color: '#1A1A1A' }}>
                    How do I create an account?
                  </h3>
                  <p className="mt-2 text-base leading-relaxed" style={{ color: '#5C5650' }}>
                    Download Merios from the App Store or Google Play, then follow the on-screen instructions. You can sign up with your email address or Apple ID.
                  </p>
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold" style={{ color: '#1A1A1A' }}>
                    How do I upload a blood test?
                  </h3>
                  <p className="mt-2 text-base leading-relaxed" style={{ color: '#5C5650' }}>
                    Tap the &quot;+&quot; button on your dashboard and select &quot;Scan blood test.&quot; You can take a photo of your lab report or upload a PDF — our OCR technology extracts your biomarker values automatically.
                  </p>
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold" style={{ color: '#1A1A1A' }}>
                    What biomarkers does Merios track?
                  </h3>
                  <p className="mt-2 text-base leading-relaxed" style={{ color: '#5C5650' }}>
                    Merios supports over 130 biomarkers across categories including metabolic health, cardiovascular markers, hormones, vitamins, inflammation markers, and more. New biomarkers are added regularly.
                  </p>
                </div>
              </div>
            </section>

            {/* Health Score */}
            <section>
              <h2
                className="font-serif text-3xl font-bold tracking-tight"
                style={{ color: '#1E3D2A' }}
              >
                Your Health Score
              </h2>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="font-serif text-xl font-bold" style={{ color: '#1A1A1A' }}>
                    How is my health score calculated?
                  </h3>
                  <p className="mt-2 text-base leading-relaxed" style={{ color: '#5C5650' }}>
                    Your Merios Health Score (0–100) is calculated from six pillars: blood biomarkers, heart health, sleep quality, physical activity, nutrition, and mental well-being. Each pillar is weighted based on the latest scientific research and your personal data.
                  </p>
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold" style={{ color: '#1A1A1A' }}>
                    What is biological age?
                  </h3>
                  <p className="mt-2 text-base leading-relaxed" style={{ color: '#5C5650' }}>
                    Biological age estimates how old your body is based on your biomarkers and health data, independent of your chronological age. Merios uses peer-reviewed algorithms to compute this metric and help you track your longevity trajectory.
                  </p>
                </div>
              </div>
            </section>

            {/* Apple Health */}
            <section>
              <h2
                className="font-serif text-3xl font-bold tracking-tight"
                style={{ color: '#1E3D2A' }}
              >
                Apple Health Integration
              </h2>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="font-serif text-xl font-bold" style={{ color: '#1A1A1A' }}>
                    How do I connect Apple Health?
                  </h3>
                  <p className="mt-2 text-base leading-relaxed" style={{ color: '#5C5650' }}>
                    Go to Settings &gt; Integrations &gt; Apple Health and grant the requested permissions. Merios will sync your heart rate, HRV, sleep, and activity data to enrich your health score.
                  </p>
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold" style={{ color: '#1A1A1A' }}>
                    What data does Merios read from Apple Health?
                  </h3>
                  <p className="mt-2 text-base leading-relaxed" style={{ color: '#5C5650' }}>
                    Merios reads heart rate, heart rate variability (HRV), sleep analysis, step count, active energy, and workout data. We never write to your Apple Health data and only request read-only access.
                  </p>
                </div>
              </div>
            </section>

            {/* Account & Data */}
            <section>
              <h2
                className="font-serif text-3xl font-bold tracking-tight"
                style={{ color: '#1E3D2A' }}
              >
                Account &amp; Data
              </h2>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="font-serif text-xl font-bold" style={{ color: '#1A1A1A' }}>
                    How is my data protected?
                  </h3>
                  <p className="mt-2 text-base leading-relaxed" style={{ color: '#5C5650' }}>
                    All data is encrypted with AES-256 in transit and at rest. We host our infrastructure in the EU (GDPR-compliant) and never sell your personal or health data to third parties. See our{' '}
                    <a href="/privacy" className="text-green-primary hover:text-green-deep transition-colors duration-300 font-semibold">
                      Privacy Policy
                    </a>{' '}
                    for full details.
                  </p>
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold" style={{ color: '#1A1A1A' }}>
                    How do I delete my account?
                  </h3>
                  <p className="mt-2 text-base leading-relaxed" style={{ color: '#5C5650' }}>
                    Go to Settings &gt; Account &gt; Delete Account. This permanently removes all your data from our servers. You can also request deletion by emailing{' '}
                    <a
                      href="mailto:support@merios.life"
                      className="text-green-primary hover:text-green-deep transition-colors duration-300 font-semibold"
                    >
                      support@merios.life
                    </a>.
                  </p>
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold" style={{ color: '#1A1A1A' }}>
                    Can I export my data?
                  </h3>
                  <p className="mt-2 text-base leading-relaxed" style={{ color: '#5C5650' }}>
                    Yes. Go to Settings &gt; Account &gt; Export Data to download a copy of all your biomarker history, health scores, and personal data in a portable format.
                  </p>
                </div>
              </div>
            </section>

            {/* Subscriptions */}
            <section>
              <h2
                className="font-serif text-3xl font-bold tracking-tight"
                style={{ color: '#1E3D2A' }}
              >
                Subscriptions &amp; Billing
              </h2>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="font-serif text-xl font-bold" style={{ color: '#1A1A1A' }}>
                    How do I manage my subscription?
                  </h3>
                  <p className="mt-2 text-base leading-relaxed" style={{ color: '#5C5650' }}>
                    Subscriptions are managed through the App Store (iOS) or Google Play (Android). Go to your device&apos;s subscription settings to change or cancel your plan.
                  </p>
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold" style={{ color: '#1A1A1A' }}>
                    How do I request a refund?
                  </h3>
                  <p className="mt-2 text-base leading-relaxed" style={{ color: '#5C5650' }}>
                    Refunds are processed by Apple or Google depending on your platform. You can request a refund through the App Store or Google Play, or contact us at{' '}
                    <a
                      href="mailto:support@merios.life"
                      className="text-green-primary hover:text-green-deep transition-colors duration-300 font-semibold"
                    >
                      support@merios.life
                    </a>{' '}
                    and we&apos;ll help guide you through the process.
                  </p>
                </div>
              </div>
            </section>

            {/* Troubleshooting */}
            <section>
              <h2
                className="font-serif text-3xl font-bold tracking-tight"
                style={{ color: '#1E3D2A' }}
              >
                Troubleshooting
              </h2>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="font-serif text-xl font-bold" style={{ color: '#1A1A1A' }}>
                    My blood test scan didn&apos;t work
                  </h3>
                  <p className="mt-2 text-base leading-relaxed" style={{ color: '#5C5650' }}>
                    Make sure the photo is well-lit and the text is clearly visible. For best results, use a PDF upload. If the issue persists, email us with a copy of your lab report and we&apos;ll manually process it.
                  </p>
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold" style={{ color: '#1A1A1A' }}>
                    My health score seems inaccurate
                  </h3>
                  <p className="mt-2 text-base leading-relaxed" style={{ color: '#5C5650' }}>
                    Your health score improves in accuracy as you add more data. Connect Apple Health, upload blood tests regularly, and complete daily check-ins to get the most precise score. If something still looks off, reach out to us.
                  </p>
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold" style={{ color: '#1A1A1A' }}>
                    The app is crashing or not loading
                  </h3>
                  <p className="mt-2 text-base leading-relaxed" style={{ color: '#5C5650' }}>
                    Try closing and reopening the app, or updating to the latest version from the App Store or Google Play. If the issue continues, please email{' '}
                    <a
                      href="mailto:support@merios.life"
                      className="text-green-primary hover:text-green-deep transition-colors duration-300 font-semibold"
                    >
                      support@merios.life
                    </a>{' '}
                    with your device model and OS version so we can investigate.
                  </p>
                </div>
              </div>
            </section>

            {/* System Requirements */}
            <section>
              <h2
                className="font-serif text-3xl font-bold tracking-tight"
                style={{ color: '#1E3D2A' }}
              >
                System Requirements
              </h2>
              <p
                className="mt-4 text-base leading-relaxed"
                style={{ color: '#5C5650' }}
              >
                Merios requires iOS 16.0 or later (iPhone) and Android 12 or later. An internet connection is required for syncing data and generating your health score.
              </p>
            </section>

            {/* Still Need Help */}
            <section className="mt-16 pt-12 border-t" style={{ borderColor: '#E8E4DC' }}>
              <div className="text-center">
                <h2
                  className="font-serif text-3xl font-bold tracking-tight"
                  style={{ color: '#1E3D2A' }}
                >
                  Still need help?
                </h2>
                <p
                  className="mt-4 text-base leading-relaxed"
                  style={{ color: '#5C5650' }}
                >
                  Our team is happy to assist. Email us at{' '}
                  <a
                    href="mailto:support@merios.life"
                    className="text-green-primary hover:text-green-deep transition-colors duration-300 font-semibold"
                  >
                    support@merios.life
                  </a>{' '}
                  and we&apos;ll get back to you within 24 hours.
                </p>
                <div className="mt-8 flex justify-center gap-6">
                  <a
                    href="/faq"
                    className="inline-block text-green-primary hover:text-green-deep font-sans font-semibold transition-colors duration-300"
                  >
                    Browse FAQ →
                  </a>
                  <a
                    href="/contact"
                    className="inline-block text-green-primary hover:text-green-deep font-sans font-semibold transition-colors duration-300"
                  >
                    Contact Us →
                  </a>
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
