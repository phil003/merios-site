'use client';

import Link from 'next/link';
import { useState } from 'react';

const categories = ['All', 'Health', 'Biomarkers', 'Wellness', 'Product'];

const articles = [
  {
    id: 1,
    slug: 'understanding-blood-test-results',
    title: 'Understanding Your Blood Test Results: A Complete Guide',
    excerpt: 'Learn how to interpret your blood work and understand what each biomarker tells you about your health.',
    category: 'Biomarkers',
    date: 'March 28, 2026',
    readTime: '8 min read',
  },
  {
    id: 2,
    slug: 'heart-rate-variability-stress',
    title: 'How Heart Rate Variability Reveals Your Stress Levels',
    excerpt: 'Discover why your heart rate patterns matter more than the number itself when assessing your stress and recovery.',
    category: 'Health',
    date: 'March 21, 2026',
    readTime: '6 min read',
  },
  {
    id: 3,
    slug: 'eleven-health-systems',
    title: 'The 11 Health Systems Your Body Runs On',
    excerpt: 'A foundational guide to understanding the interconnected systems that keep you functioning optimally.',
    category: 'Health',
    date: 'March 14, 2026',
    readTime: '10 min read',
  },
  {
    id: 4,
    slug: 'health-score-matters',
    title: 'Why Your Health Score Matters More Than Individual Numbers',
    excerpt: 'Understand how integrated health metrics provide better insights than looking at isolated biomarkers.',
    category: 'Wellness',
    date: 'March 7, 2026',
    readTime: '7 min read',
  },
  {
    id: 5,
    slug: 'sleep-quality-vs-quantity',
    title: 'Sleep Quality vs Sleep Quantity: What Your Data Shows',
    excerpt: 'Learn why tracking how well you sleep matters more than just counting hours.',
    category: 'Wellness',
    date: 'February 28, 2026',
    readTime: '6 min read',
  },
  {
    id: 6,
    slug: 'biomarkers-101',
    title: 'Biomarkers 101: What Your Blood Really Tells You',
    excerpt: 'A beginner\'s guide to understanding the science behind the numbers in your lab results.',
    category: 'Biomarkers',
    date: 'February 21, 2026',
    readTime: '9 min read',
  },
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredArticles =
    activeCategory === 'All'
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  return (
    <main className="fade-in">
      {/* Hero Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h1
            className="font-serif text-5xl sm:text-6xl font-bold mb-6"
            style={{ color: '#1A1A1A' }}
          >
            The Merios Journal
          </h1>
          <p
            className="text-lg sm:text-xl leading-relaxed"
            style={{ color: '#5C5650' }}
          >
            Health insights, guides, and product updates to help you understand
            your body better and make informed wellness decisions.
          </p>
        </div>
      </section>

      {/* Category Filters */}
      <section className="border-b border-gray-200 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto py-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full font-sans transition-all duration-300 ${
                  activeCategory === cat
                    ? 'text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                style={
                  activeCategory === cat
                    ? { backgroundColor: '#2D5A3D' }
                    : undefined
                }
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredArticles.map((article) => (
              <Link
                key={article.id}
                href={`/blog/${article.slug}`}
                className="group flex flex-col h-full rounded-lg overflow-hidden border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-lg"
              >
                <div className="flex-1 p-8 flex flex-col">
                  {/* Category Tag */}
                  <div className="mb-4">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wide text-white"
                      style={{ backgroundColor: '#3A7A52' }}
                    >
                      {article.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3
                    className="font-serif text-xl font-bold mb-3 leading-snug group-hover:opacity-80 transition-opacity"
                    style={{ color: '#1A1A1A' }}
                  >
                    {article.title}
                  </h3>

                  {/* Excerpt */}
                  <p
                    className="flex-1 text-base leading-relaxed mb-4"
                    style={{ color: '#5C5650' }}
                  >
                    {article.excerpt}
                  </p>

                  {/* Metadata Footer */}
                  <div
                    className="flex items-center justify-between text-sm"
                    style={{ color: '#9B9590' }}
                  >
                    <span>{article.date}</span>
                    <span>{article.readTime}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section
        className="py-20 px-4 sm:px-6 lg:px-8"
        style={{ backgroundColor: '#F8F6F1' }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <h2
            className="font-serif text-4xl font-bold mb-4"
            style={{ color: '#1A1A1A' }}
          >
            Get Health Insights in Your Inbox
          </h2>
          <p
            className="text-lg mb-8 leading-relaxed"
            style={{ color: '#5C5650' }}
          >
            Subscribe to our newsletter for the latest research, tips, and
            Merios updates delivered weekly.
          </p>

          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg border border-gray-300 font-sans focus:outline-none focus:ring-2 focus:ring-offset-2"
              style={{ '--tw-ring-color': '#2D5A3D' } as any}
              required
            />
            <button
              type="submit"
              className="px-8 py-3 rounded-lg font-sans font-semibold text-white transition-all duration-300 hover:opacity-90"
              style={{ backgroundColor: '#2D5A3D' }}
            >
              Subscribe
            </button>
          </form>

          <p
            className="text-sm mt-4"
            style={{ color: '#9B9590' }}
          >
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </section>
    </main>
  );
}
