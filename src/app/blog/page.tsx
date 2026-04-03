import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollAnimator from '@/components/ScrollAnimator';
import { getAllPosts } from '@/lib/blog';

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog — Health, Biomarkers & Longevity Insights",
  description:
    "Expert articles on blood biomarkers, biological age, health optimization, and longevity. Learn how to understand your blood test results and improve your health score.",
  alternates: {
    canonical: "https://merios.life/blog",
  },
  openGraph: {
    title: "Blog — Health, Biomarkers & Longevity Insights",
    description:
      "Expert articles on blood biomarkers, biological age, health optimization, and longevity. Learn how to understand your blood test results and improve your health score.",
    url: "https://merios.life/blog",
    type: "website",
  },
};

const gradients: Record<string, string> = {
  Biomarkers: 'from-[#E8F0EB] to-[#D4E4DA]',
  Sleep: 'from-[#EDE4F5] to-[#DDD2EC]',
  Nutrition: 'from-[#FFF3E0] to-[#F5E6CC]',
  Science: 'from-[#E0F0FF] to-[#CCE4F5]',
  Lifestyle: 'from-[#FDE8E8] to-[#F5CCCC]',
  default: 'from-[#F0F0F0] to-[#E0E0E0]',
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <ScrollAnimator />
      <Navbar />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 px-6 text-center">
          <p className="text-xs uppercase tracking-[0.18em] text-green-primary font-semibold mb-5">
            The Merios Blog
          </p>
          <h1
            className="font-serif text-5xl md:text-6xl font-medium text-green-deep mb-6"
            style={{ letterSpacing: '-0.02em' }}
          >
            Health, Explained.
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Biomarker deep-dives, wellness guides, and the science behind your
            health score.
          </p>
        </section>

        {/* Articles Grid */}
        <section className="py-16 px-6 max-w-6xl mx-auto">
          {posts.length === 0 ? (
            <p className="text-center text-text-tertiary text-lg py-20">
              Articles coming soon.
            </p>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="fade-in rounded-2xl overflow-hidden bg-white border border-green-primary/6 hover:-translate-y-1 hover:shadow-xl transition-all duration-400 group"
                >
                  <div
                    className={`w-full h-48 flex items-center justify-center text-4xl bg-gradient-to-br ${
                      gradients[post.tag] || gradients.default
                    }`}
                  >
                    {post.emoji}
                  </div>
                  <div className="p-7">
                    <div className="text-[0.68rem] uppercase tracking-wider text-green-primary font-semibold mb-2.5">
                      {post.tag}
                    </div>
                    <h2 className="font-serif text-lg font-semibold text-green-deep leading-snug mb-2.5">
                      {post.title}
                    </h2>
                    <p className="text-sm leading-relaxed text-text-secondary">
                      {post.description}
                    </p>
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-xs text-text-tertiary">
                        {post.readTime}
                      </span>
                      <span className="text-xs text-text-tertiary">
                        {new Date(post.date).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Newsletter CTA */}
        <section className="py-20 px-6 bg-beige">
          <div className="max-w-2xl mx-auto text-center">
            <h2
              className="font-serif text-3xl font-medium text-green-deep mb-4"
              style={{ letterSpacing: '-0.01em' }}
            >
              Want health insights in your inbox?
            </h2>
            <p className="text-text-secondary mb-8">
              Join the waitlist and be the first to read new articles.
            </p>
            <Link
              href="/early-access"
              className="inline-flex items-center gap-3 px-10 py-4 bg-green-deep text-white rounded-full text-base font-semibold hover:bg-green-primary hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300"
            >
              Join the Waitlist
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
