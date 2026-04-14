import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollAnimator from '@/components/ScrollAnimator';
import { BreadcrumbSchema } from '@/components/StructuredData';
import { getAllComparePosts } from '@/lib/compare';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Compare Merios vs Other Health Apps | Merios',
  description:
    'Side-by-side comparisons of Merios against Function Health, InsideTracker, WHOOP Advanced Labs, SiPhox Health and more. Find the blood biomarker platform that fits your health goals.',
  alternates: {
    canonical: 'https://merios.life/compare',
  },
  openGraph: {
    title: 'Compare Merios vs Other Health Apps',
    description:
      'Side-by-side comparisons of Merios against Function Health, InsideTracker, WHOOP Advanced Labs, SiPhox Health and more.',
    url: 'https://merios.life/compare',
    type: 'website',
    images: [{ url: '/og-image.png' }],
  },
};

export default function CompareIndexPage() {
  const posts = getAllComparePosts();

  return (
    <>
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://merios.life' },
          { name: 'Compare', url: 'https://merios.life/compare' },
        ]}
      />
      <ScrollAnimator />
      <Navbar />
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-[0.68rem] uppercase tracking-wider text-green-primary font-semibold mb-4">
            Comparisons
          </div>
          <h1
            className="font-serif text-4xl md:text-5xl font-bold text-green-deep mb-6 leading-tight"
            style={{ letterSpacing: '-0.02em' }}
          >
            How Merios compares
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed mb-12">
            Detailed, honest comparisons of Merios against the health platforms
            people most often evaluate alongside us. No marketing fluff — just
            what each product actually does, where it wins, and who it's for.
          </p>

          {posts.length === 0 ? (
            <p className="text-text-tertiary">Comparisons coming soon.</p>
          ) : (
            <div className="space-y-6">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/compare/${post.slug}`}
                  className="block bg-white rounded-xl p-6 border border-green-primary/10 hover:shadow-md hover:-translate-y-0.5 transition-all"
                >
                  <div className="text-[0.65rem] uppercase tracking-wider text-green-primary font-semibold mb-2">
                    vs {post.competitor}
                  </div>
                  <h2 className="font-serif text-2xl font-semibold text-green-deep mb-2">
                    {post.title}
                  </h2>
                  <p className="text-text-secondary">{post.description}</p>
                  <div className="mt-4 text-sm text-text-tertiary">
                    {post.readTime}
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
