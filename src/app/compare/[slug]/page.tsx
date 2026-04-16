import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollAnimator from '@/components/ScrollAnimator';
import {
  ArticleSchema,
  BreadcrumbSchema,
  FAQPageSchema,
} from '@/components/StructuredData';
import {
  getAllCompareSlugs,
  getComparePostBySlug,
} from '@/lib/compare';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import type { Metadata } from 'next';

export function generateStaticParams() {
  return getAllCompareSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getComparePostBySlug(slug);
  if (!post) return { title: 'Comparison Not Found | Merios' };

  return {
    title: `${post.title} | Merios`,
    description: post.description,
    alternates: {
      canonical: `https://merios.life/compare/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      modifiedTime: post.dateModified || post.date,
      url: `https://merios.life/compare/${post.slug}`,
      images: post.image ? [{ url: post.image }] : [{ url: '/og-image.png' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : ['/og-image.png'],
    },
  };
}

// Reuse the same prose styling as the blog
const mdxComponents = {
  h1: (props: React.ComponentProps<'h1'>) => (
    <h1
      className="font-serif text-4xl font-bold text-text-primary mt-12 mb-6"
      {...props}
    />
  ),
  h2: (props: React.ComponentProps<'h2'>) => (
    <h2
      className="font-serif text-2xl font-bold text-text-primary mt-10 mb-4"
      {...props}
    />
  ),
  h3: (props: React.ComponentProps<'h3'>) => (
    <h3
      className="font-serif text-xl font-semibold text-text-primary mt-8 mb-3"
      {...props}
    />
  ),
  p: (props: React.ComponentProps<'p'>) => (
    <p className="text-text-secondary leading-relaxed mb-6" {...props} />
  ),
  ul: (props: React.ComponentProps<'ul'>) => (
    <ul
      className="list-disc pl-6 mb-6 space-y-2 text-text-secondary"
      {...props}
    />
  ),
  ol: (props: React.ComponentProps<'ol'>) => (
    <ol
      className="list-decimal pl-6 mb-6 space-y-2 text-text-secondary"
      {...props}
    />
  ),
  li: (props: React.ComponentProps<'li'>) => (
    <li className="leading-relaxed" {...props} />
  ),
  blockquote: (props: React.ComponentProps<'blockquote'>) => (
    <blockquote
      className="border-l-4 border-green-primary/30 pl-6 italic text-text-secondary my-8"
      {...props}
    />
  ),
  a: (props: React.ComponentProps<'a'>) => (
    <a
      className="text-green-primary underline hover:text-green-deep"
      {...props}
    />
  ),
  strong: (props: React.ComponentProps<'strong'>) => (
    <strong className="font-semibold text-text-primary" {...props} />
  ),
  hr: () => <hr className="border-t border-beige-dark my-10" />,
  table: (props: React.ComponentProps<'table'>) => (
    <div className="overflow-x-auto my-8">
      <table
        className="w-full border border-beige-dark text-sm"
        {...props}
      />
    </div>
  ),
  th: (props: React.ComponentProps<'th'>) => (
    <th
      className="bg-beige text-left px-4 py-3 font-semibold text-green-deep border-b border-beige-dark"
      {...props}
    />
  ),
  td: (props: React.ComponentProps<'td'>) => (
    <td
      className="px-4 py-3 border-b border-beige-dark text-text-secondary align-top"
      {...props}
    />
  ),
};

export default async function ComparePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getComparePostBySlug(slug);

  if (!post) {
    return (
      <>
        <ScrollAnimator />
        <Navbar />
        <main className="pt-40 pb-20 px-6 text-center min-h-screen">
          <h1 className="font-serif text-4xl text-green-deep mb-4">
            Comparison not found
          </h1>
          <Link href="/blog" className="text-green-primary underline">
            Back to blog
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <ArticleSchema
        title={post.title}
        description={post.description}
        datePublished={post.date}
        dateModified={post.dateModified}
        slug={post.slug}
        urlPath={`/compare/${post.slug}`}
        image={post.image}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://merios.life' },
          { name: 'Compare', url: 'https://merios.life/compare' },
          {
            name: post.title,
            url: `https://merios.life/compare/${post.slug}`,
          },
        ]}
      />
      {post.faq && post.faq.length > 0 && (
        <FAQPageSchema questions={post.faq} />
      )}
      <ScrollAnimator />
      <Navbar />
      <main>
        <article className="max-w-3xl mx-auto px-6 pt-32 pb-16">
          <div className="mb-8">
            <Link
              href="/early-access"
              className="text-sm text-green-primary hover:underline"
            >
              &larr; Back to Merios
            </Link>
          </div>

          <div className="text-[0.68rem] uppercase tracking-wider text-green-primary font-semibold mb-4">
            Comparison · vs {post.competitor}
          </div>

          <h1
            className="font-serif text-4xl md:text-5xl font-bold text-green-deep mb-6 leading-tight"
            style={{ letterSpacing: '-0.02em' }}
          >
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-4 text-sm text-text-tertiary mb-12">
            <time dateTime={post.date}>
              Published{' '}
              {new Date(post.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </time>
            {post.dateModified && post.dateModified !== post.date && (
              <>
                <span>&middot;</span>
                <time dateTime={post.dateModified}>
                  Last updated{' '}
                  {new Date(post.dateModified).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </time>
              </>
            )}
            <span>&middot;</span>
            <span>{post.readTime}</span>
          </div>

          <div className="prose-merios">
            <MDXRemote
              source={post.content}
              components={mdxComponents}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
            />
          </div>

          {post.faq && post.faq.length > 0 && (
            <section className="mt-16 pt-12 border-t border-beige-dark">
              <h2 className="font-serif text-3xl font-bold text-green-deep mb-8">
                Frequently asked questions
              </h2>
              <div className="space-y-6">
                {post.faq.map((item, idx) => (
                  <details
                    key={idx}
                    className="group border border-beige-dark rounded-xl p-6 open:bg-beige/40 transition-colors"
                  >
                    <summary className="font-serif text-lg font-semibold text-green-deep cursor-pointer list-none flex justify-between items-center gap-4">
                      <span>{item.q}</span>
                      <span className="text-green-primary text-2xl leading-none transition-transform group-open:rotate-45">
                        +
                      </span>
                    </summary>
                    <p className="mt-4 text-text-secondary leading-relaxed">
                      {item.a}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          )}
        </article>

        <section className="py-16 px-6 text-center">
          <h2 className="font-serif text-3xl font-medium text-green-deep mb-4">
            Ready to try Merios for yourself?
          </h2>
          <Link
            href="/early-access"
            className="inline-flex items-center gap-3 px-10 py-4 bg-green-deep text-white rounded-full text-base font-semibold hover:bg-green-primary hover:-translate-y-0.5 hover:shadow-xl transition-all duration-300"
          >
            Get Early Access
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}
