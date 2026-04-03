'use client';

import Link from 'next/link';
import { useState } from 'react';

const SUPABASE_URL = 'https://ykcakhvmzebakodxmjpb.supabase.co';
const SUPABASE_ANON_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlrY2FraHZtemViYWtvZHhtanBiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE5NDEwODYsImV4cCI6MjA4NzUxNzA4Nn0.cpI9MFeTlr9p0d75R0jtiyCXu7HDiGB1fz2B8drkQ0A';

export default function EarlyAccessPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch(
        `${SUPABASE_URL}/rest/v1/waitlist`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({
            email: email.toLowerCase(),
            created_at: new Date().toISOString(),
          }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to join waitlist');
      }

      setStatus('success');
      setMessage('Welcome to the waitlist! Check your email for next steps.');
      setEmail('');

      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    } catch (error) {
      console.error('Waitlist error:', error);
      setStatus('error');
      setMessage(
        'Something went wrong. Please try again or email us at hello@merios.app'
      );

      setTimeout(() => {
        setStatus('idle');
        setMessage('');
      }, 5000);
    }
  };

  const benefits = [
    {
      title: 'Priority Access',
      description:
        'Get early access to Merios before the public launch. Be among the first to experience personalized health insights.',
    },
    {
      title: 'Shape the Product',
      description:
        'Your feedback directly influences product development. Early adopters have a voice in building the future of health.',
    },
    {
      title: 'Founding Member Pricing',
      description:
        'Lock in lifetime discounted rates and exclusive benefits available only to our earliest community members.',
    },
  ];

  const faqs = [
    {
      question: 'When will I get access?',
      answer:
        'We\'re launching gradually to ensure quality. Most waitlist members will get access within 2-4 weeks. We\'ll email you as soon as your access is ready.',
    },
    {
      question: 'Is this free?',
      answer:
        'Early access is free for all founding members. When we launch the full product, founding members receive lifetime discounted rates.',
    },
    {
      question: 'What do I need to use Merios?',
      answer:
        'You\'ll need access to your health data—either from existing wearables, past lab results, or by ordering new tests. We integrate with popular health tracking devices and can help you get lab work done.',
    },
  ];

  return (
    <main className="fade-in">
      {/* Hero Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1
            className="font-serif text-6xl sm:text-7xl font-bold mb-6"
            style={{ color: '#1A1A1A' }}
          >
            Be Among the First
          </h1>
          <p
            className="text-xl sm:text-2xl leading-relaxed"
            style={{ color: '#5C5650' }}
          >
            Join our early access community and transform how you understand
            your health with personalized, science-backed insights.
          </p>
        </div>
      </section>

      {/* Signup Form */}
      <section
        className="py-16 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: '#F8F6F1' }}
      >
        <div className="max-w-2xl mx-auto">
          <div
            className="bg-white rounded-lg p-8 sm:p-12 border border-gray-200"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="block font-sans font-semibold mb-3"
                  style={{ color: '#1A1A1A' }}
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 font-sans focus:outline-none focus:ring-2 focus:ring-offset-2"
                  style={{ '--tw-ring-color': '#2D5A3D' } as any}
                  required
                  disabled={status === 'loading'}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'loading'}
                className="w-full px-8 py-4 rounded-lg font-sans font-semibold text-white transition-all duration-300 hover:opacity-90 disabled:opacity-50"
                style={{ backgroundColor: '#2D5A3D' }}
              >
                {status === 'loading' ? 'Joining...' : 'Join the Waitlist'}
              </button>

              {message && (
                <div
                  className={`p-4 rounded-lg text-sm font-sans ${
                    status === 'success'
                      ? 'bg-green-50 text-green-800'
                      : 'bg-red-50 text-red-800'
                  }`}
                >
                  {message}
                </div>
              )}

              <p
                className="text-sm text-center"
                style={{ color: '#9B9590' }}
              >
                We respect your privacy. No spam, ever.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 text-center">
        <p
          className="text-lg font-sans"
          style={{ color: '#5C5650' }}
        >
          <span
            className="font-semibold"
            style={{ color: '#1A1A1A' }}
          >
            500+
          </span>
          {' '}health-conscious individuals are already on the waitlist
        </p>
      </section>

      {/* Benefits Section */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: '#FDFCF9' }}
      >
        <div className="max-w-6xl mx-auto">
          <h2
            className="font-serif text-5xl font-bold mb-16 text-center"
            style={{ color: '#1A1A1A' }}
          >
            Early Access Benefits
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg p-8 border border-gray-200"
              >
                <div
                  className="w-12 h-12 rounded-full mb-6 flex items-center justify-center"
                  style={{ backgroundColor: '#3A7A52' }}
                >
                  <span className="text-white font-serif font-bold text-lg">
                    {idx + 1}
                  </span>
                </div>
                <h3
                  className="font-serif text-2xl font-bold mb-4"
                  style={{ color: '#1A1A1A' }}
                >
                  {benefit.title}
                </h3>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: '#5C5650' }}
                >
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h2
            className="font-serif text-5xl font-bold mb-16 text-center"
            style={{ color: '#1A1A1A' }}
          >
            Frequently Asked Questions
          </h2>

          <div className="space-y-8">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border-b border-gray-200 pb-8">
                <h3
                  className="font-serif text-xl font-bold mb-4"
                  style={{ color: '#1A1A1A' }}
                >
                  {faq.question}
                </h3>
                <p
                  className="text-base leading-relaxed"
                  style={{ color: '#5C5650' }}
                >
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>

          <div
            className="mt-16 p-8 rounded-lg"
            style={{ backgroundColor: '#F8F6F1' }}
          >
            <p
              className="text-center mb-4"
              style={{ color: '#5C5650' }}
            >
              Have another question?
            </p>
            <div className="text-center">
              <a
                href="mailto:hello@merios.app"
                className="font-sans font-semibold transition-opacity hover:opacity-80"
                style={{ color: '#2D5A3D' }}
              >
                Email us at hello@merios.app
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: '#F8F6F1' }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <h2
            className="font-serif text-4xl font-bold mb-6"
            style={{ color: '#1A1A1A' }}
          >
            Ready to transform your health?
          </h2>
          <p
            className="text-lg mb-8 leading-relaxed"
            style={{ color: '#5C5650' }}
          >
            Join thousands of people taking control of their wellness with
            Merios.
          </p>
          <Link
            href="#"
            className="inline-block px-10 py-4 rounded-lg font-sans font-semibold text-white transition-all duration-300 hover:opacity-90"
            style={{ backgroundColor: '#2D5A3D' }}
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('input[type="email"]')?.scrollIntoView({
                behavior: 'smooth',
              });
            }}
          >
            Join the Waitlist
          </Link>
        </div>
      </section>

      {/* Navigation Link */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 text-center">
        <Link
          href="/"
          className="inline-flex items-center gap-2 transition-all duration-300 hover:gap-3"
          style={{ color: '#2D5A3D' }}
        >
          ← Back to home
        </Link>
      </section>
    </main>
  );
}
