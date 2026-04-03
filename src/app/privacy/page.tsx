import { Metadata } from 'next';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollAnimator from "@/components/ScrollAnimator";

export const metadata: Metadata = {
  title: 'Privacy Policy | Merios',
  description: 'Learn how Merios collects, uses, and protects your health data.',
};

export default function PrivacyPage() {
  return (
    <>
      <ScrollAnimator />
      <Navbar />
      <main className="min-h-screen bg-gradient-to-b from-cream to-beige" style={{ backgroundColor: '#FDFCF9' }}>
        {/* Hero Section */}
        <div className="border-b" style={{ borderColor: '#E8E4DC' }}>
          <div className="mx-auto max-w-4xl px-6 pt-32 pb-16 sm:px-8 sm:py-24">
          <h1
            className="font-serif text-5xl font-bold tracking-tight"
            style={{ color: '#1A1A1A' }}
          >
            Privacy Policy
          </h1>
          <p
            className="mt-4 text-lg"
            style={{ color: '#5C5650' }}
          >
            Last updated: April 3, 2026
          </p>
          </div>
        </div>

      {/* Content */}
      <div className="mx-auto max-w-4xl px-6 py-16 sm:px-8 sm:py-24">
        <div className="prose prose-lg max-w-none space-y-12">
          {/* Intro */}
          <section>
            <p
              className="text-base leading-relaxed"
              style={{ color: '#5C5650' }}
            >
              At Merios ("we," "us," "our," or the "Company"), operated by Merios LLC, a US-based corporation, we are committed to protecting your privacy and ensuring transparency about how we collect, use, and safeguard your information. This Privacy Policy explains our practices regarding personal data and health information.
            </p>
            <p
              className="mt-4 text-base leading-relaxed"
              style={{ color: '#5C5650' }}
            >
              Please read this policy carefully. By using Merios, you consent to the practices described herein.
            </p>
          </section>

          {/* Section 1 */}
          <section>
            <h2
              className="font-serif text-3xl font-bold tracking-tight"
              style={{ color: '#1E3D2A' }}
            >
              1. Information We Collect
            </h2>
            <p
              className="mt-4 text-base leading-relaxed"
              style={{ color: '#5C5650' }}
            >
              We collect information you provide directly and automatically through your use of Merios:
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <h3
                  className="font-sans font-semibold text-lg"
                  style={{ color: '#2D5A3D' }}
                >
                  Personal Information
                </h3>
                <p
                  className="mt-2 text-base leading-relaxed"
                  style={{ color: '#5C5650' }}
                >
                  Email address, name, age, gender, and other profile information you provide when creating an account.
                </p>
              </div>

              <div>
                <h3
                  className="font-sans font-semibold text-lg"
                  style={{ color: '#2D5A3D' }}
                >
                  Health Data
                </h3>
                <p
                  className="mt-2 text-base leading-relaxed"
                  style={{ color: '#5C5650' }}
                >
                  Blood test results, biomarkers, Apple Health data (steps, heart rate, sleep), daily health check-ins, symptoms, medications, and other health metrics you choose to share. This health information is highly sensitive and is treated with the highest level of care.
                </p>
              </div>

              <div>
                <h3
                  className="font-sans font-semibold text-lg"
                  style={{ color: '#2D5A3D' }}
                >
                  Usage Data
                </h3>
                <p
                  className="mt-2 text-base leading-relaxed"
                  style={{ color: '#5C5650' }}
                >
                  Device information, browser type, IP address, pages visited, time spent on features, and interaction patterns. We use this to improve the app and understand user behavior.
                </p>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section>
            <h2
              className="font-serif text-3xl font-bold tracking-tight"
              style={{ color: '#1E3D2A' }}
            >
              2. How We Use Your Information
            </h2>
            <p
              className="mt-4 text-base leading-relaxed"
              style={{ color: '#5C5650' }}
            >
              We use the information we collect to:
            </p>
            <ul
              className="mt-4 space-y-2 list-disc list-inside text-base leading-relaxed"
              style={{ color: '#5C5650' }}
            >
              <li>Provide, maintain, and improve the Merios service</li>
              <li>Calculate your personalized health scores and insights</li>
              <li>Send you service-related announcements and account notifications</li>
              <li>Respond to your requests and support inquiries</li>
              <li>Improve our algorithms and analytics capabilities</li>
              <li>Detect and prevent fraud or misuse of the platform</li>
              <li>Comply with legal obligations and enforce our terms</li>
              <li>With your consent, send you wellness tips and marketing communications</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section>
            <h2
              className="font-serif text-3xl font-bold tracking-tight"
              style={{ color: '#1E3D2A' }}
            >
              3. Data Storage & Security
            </h2>
            <p
              className="mt-4 text-base leading-relaxed"
              style={{ color: '#5C5650' }}
            >
              We take the security of your data very seriously. Your information is:
            </p>
            <ul
              className="mt-4 space-y-2 list-disc list-inside text-base leading-relaxed"
              style={{ color: '#5C5650' }}
            >
              <li><strong>Encrypted at rest</strong> using industry-standard encryption (AES-256)</li>
              <li><strong>Encrypted in transit</strong> using TLS/SSL protocols</li>
              <li><strong>Stored on Supabase</strong>, a secure PostgreSQL platform with enterprise-grade infrastructure</li>
              <li><strong>Hosted in secure data centers</strong> located in the United States and European Union with redundancy and backup systems</li>
              <li><strong>Protected by access controls</strong> limiting who can view or modify your data</li>
            </ul>
            <p
              className="mt-4 text-base leading-relaxed"
              style={{ color: '#5C5650' }}
            >
              While we employ best practices, no system is perfectly secure. We encourage you to use strong passwords and protect your account credentials.
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2
              className="font-serif text-3xl font-bold tracking-tight"
              style={{ color: '#1E3D2A' }}
            >
              4. Third-Party Services
            </h2>
            <p
              className="mt-4 text-base leading-relaxed"
              style={{ color: '#5C5650' }}
            >
              We use third-party service providers to help us operate Merios:
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <h3
                  className="font-sans font-semibold text-lg"
                  style={{ color: '#2D5A3D' }}
                >
                  Supabase
                </h3>
                <p
                  className="mt-2 text-base leading-relaxed"
                  style={{ color: '#5C5650' }}
                >
                  Our database and backend infrastructure provider. Your data is encrypted and stored securely within their systems. See their privacy policy at supabase.com.
                </p>
              </div>

              <div>
                <h3
                  className="font-sans font-semibold text-lg"
                  style={{ color: '#2D5A3D' }}
                >
                  OpenAI
                </h3>
                <p
                  className="mt-2 text-base leading-relaxed"
                  style={{ color: '#5C5650' }}
                >
                  We use OpenAI's API for health data analysis and insight generation. OpenAI operates under a <strong>zero retention policy</strong>, meaning your data is not stored or used to train their models. Your health data is processed exclusively for your benefit within the Merios platform.
                </p>
              </div>

              <div>
                <h3
                  className="font-sans font-semibold text-lg"
                  style={{ color: '#2D5A3D' }}
                >
                  RevenueCat
                </h3>
                <p
                  className="mt-2 text-base leading-relaxed"
                  style={{ color: '#5C5650' }}
                >
                  We use RevenueCat for subscription management and billing. Payment data is handled securely and complies with PCI-DSS standards.
                </p>
              </div>

              <div>
                <h3
                  className="font-sans font-semibold text-lg"
                  style={{ color: '#2D5A3D' }}
                >
                  Apple HealthKit
                </h3>
                <p
                  className="mt-2 text-base leading-relaxed"
                  style={{ color: '#5C5650' }}
                >
                  If you choose to connect Apple Health, we access health metrics with your explicit permission. You can revoke access at any time through iOS Settings.
                </p>
              </div>
            </div>

            <p
              className="mt-4 text-base leading-relaxed"
              style={{ color: '#5C5650' }}
            >
              We do not share your health data with third parties except as necessary to provide the service and in compliance with your consent and applicable law.
            </p>
          </section>

          {/* Section 5 */}
          <section>
            <h2
              className="font-serif text-3xl font-bold tracking-tight"
              style={{ color: '#1E3D2A' }}
            >
              5. Your Rights
            </h2>
            <p
              className="mt-4 text-base leading-relaxed"
              style={{ color: '#5C5650' }}
            >
              Depending on your location, you have the following rights regarding your data:
            </p>
            <ul
              className="mt-4 space-y-2 list-disc list-inside text-base leading-relaxed"
              style={{ color: '#5C5650' }}
            >
              <li><strong>Right to Access:</strong> Request a copy of all personal data we hold about you</li>
              <li><strong>Right to Rectification:</strong> Correct inaccurate information</li>
              <li><strong>Right to Deletion:</strong> Request deletion of your data (subject to legal retention requirements)</li>
              <li><strong>Right to Data Portability:</strong> Receive your data in a portable format</li>
              <li><strong>Right to Withdraw Consent:</strong> Opt out of non-essential data processing</li>
              <li><strong>Right to Object:</strong> Object to processing of your data for marketing or analytics</li>
            </ul>
            <p
              className="mt-4 text-base leading-relaxed"
              style={{ color: '#5C5650' }}
            >
              To exercise any of these rights, contact us at <strong>privacy@merios.life</strong>.
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2
              className="font-serif text-3xl font-bold tracking-tight"
              style={{ color: '#1E3D2A' }}
            >
              6. GDPR Compliance
            </h2>
            <p
              className="mt-4 text-base leading-relaxed"
              style={{ color: '#5C5650' }}
            >
              For users in the European Union and those subject to GDPR:
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <h3
                  className="font-sans font-semibold text-lg"
                  style={{ color: '#2D5A3D' }}
                >
                  Legal Basis for Processing
                </h3>
                <p
                  className="mt-2 text-base leading-relaxed"
                  style={{ color: '#5C5650' }}
                >
                  We process your data on the basis of: (1) your explicit consent, (2) contract performance (providing the service), (3) legal compliance, and (4) legitimate interests (improving service quality and security).
                </p>
              </div>

              <div>
                <h3
                  className="font-sans font-semibold text-lg"
                  style={{ color: '#2D5A3D' }}
                >
                  Data Controller
                </h3>
                <p
                  className="mt-2 text-base leading-relaxed"
                  style={{ color: '#5C5650' }}
                >
                  Merios LLC, US. For GDPR inquiries, contact <strong>legal@merios.life</strong>.
                </p>
              </div>

              <div>
                <h3
                  className="font-sans font-semibold text-lg"
                  style={{ color: '#2D5A3D' }}
                >
                  Data Subject Rights
                </h3>
                <p
                  className="mt-2 text-base leading-relaxed"
                  style={{ color: '#5C5650' }}
                >
                  You have rights outlined in Section 5, plus the right to lodge a complaint with your local data protection authority.
                </p>
              </div>
            </div>
          </section>

          {/* Section 7 */}
          <section>
            <h2
              className="font-serif text-3xl font-bold tracking-tight"
              style={{ color: '#1E3D2A' }}
            >
              7. Data Retention
            </h2>
            <p
              className="mt-4 text-base leading-relaxed"
              style={{ color: '#5C5650' }}
            >
              We retain your personal and health data for as long as your account is active. If you request deletion of your account:
            </p>
            <ul
              className="mt-4 space-y-2 list-disc list-inside text-base leading-relaxed"
              style={{ color: '#5C5650' }}
            >
              <li>Your data will be deleted within 30 days of your request</li>
              <li>Backups may retain data for an additional 30 days for safety and recovery purposes</li>
              <li>Data required for legal compliance or to resolve disputes will be retained as needed</li>
            </ul>
          </section>

          {/* Section 8 */}
          <section>
            <h2
              className="font-serif text-3xl font-bold tracking-tight"
              style={{ color: '#1E3D2A' }}
            >
              8. Children's Privacy
            </h2>
            <p
              className="mt-4 text-base leading-relaxed"
              style={{ color: '#5C5650' }}
            >
              Merios is not intended for individuals under 18 years old. We do not knowingly collect information from minors. If we become aware that a user is under 18, we will delete their account and associated data. Parents or guardians who believe a child's information has been collected should contact us immediately at <strong>privacy@merios.life</strong>.
            </p>
          </section>

          {/* Section 9 */}
          <section>
            <h2
              className="font-serif text-3xl font-bold tracking-tight"
              style={{ color: '#1E3D2A' }}
            >
              9. Changes to This Policy
            </h2>
            <p
              className="mt-4 text-base leading-relaxed"
              style={{ color: '#5C5650' }}
            >
              We may update this Privacy Policy periodically. Material changes will be communicated via email or a prominent notice in the app. Your continued use of Merios after changes constitutes your acceptance of the updated policy. We encourage you to review this policy regularly.
            </p>
          </section>

          {/* Section 10 */}
          <section>
            <h2
              className="font-serif text-3xl font-bold tracking-tight"
              style={{ color: '#1E3D2A' }}
            >
              10. Contact Us
            </h2>
            <p
              className="mt-4 text-base leading-relaxed"
              style={{ color: '#5C5650' }}
            >
              If you have questions or concerns about this Privacy Policy or our privacy practices, please contact:
            </p>
            <div
              className="mt-6 p-6 rounded-lg"
              style={{ backgroundColor: '#F8F6F1' }}
            >
              <p
                className="font-sans font-semibold text-lg"
                style={{ color: '#1A1A1A' }}
              >
                Merios LLC
              </p>
              <p
                className="mt-2 text-base"
                style={{ color: '#5C5650' }}
              >
                Email: <strong>privacy@merios.life</strong>
              </p>
              <p
                className="mt-1 text-base"
                style={{ color: '#5C5650' }}
              >
                United States
              </p>
            </div>
          </section>
        </div>
      </div>
      </main>
      <Footer />
    </>
  );
}
