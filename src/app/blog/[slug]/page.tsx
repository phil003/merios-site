import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ScrollAnimator from '@/components/ScrollAnimator';
import { getAllSlugs, getPostBySlug, getAllPosts } from '@/lib/blog';
import { MDXRemote } from 'next-mdx-remote/rsc';
import type { Metadata } from 'next';

// Generate all blog slugs at build time for static export
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) return { title: 'Article Not Found | Merios' };

  return {
    title: `${post.title} | Merios Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

// Custom MDX components for styling
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
    <ul className="list-disc pl-6 mb-6 space-y-2 text-text-secondary" {...props} />
  ),
  ol: (props: React.ComponentProps<'ol'>) => (
    <ol className="list-decimal pl-6 mb-6 space-y-2 text-text-secondary" {...props} />
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
    <a className="text-green-primary underline hover:text-green-deep" {...props} />
  ),
  strong: (props: React.ComponentProps<'strong'>) => (
    <strong className="font-semibold text-text-primary" {...props} />
  ),
  hr: () => <hr className="border-t border-beige-dark my-10" />,
};

export default function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    return (
      <>
        <ScrollAnimator />
        <Navbar />
        <main className="pt-40 pb-20 px-6 text-center min-h-screen">
          <h1 className="font-serif text-4xl text-green-deep mb-4">
            Article not found
          </h1>
          <Link href="/blog" className="text-green-primary underline">
            Back to blog
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  // Get related posts (same tag, exclude current)
  const related = getAllPosts()
    .filter((p) => p.slug !== post.slug && p.tag === post.tag)
    .slice(0, 2);

  return (
    <>
      <ScrollAnimator />
      <Navbar />
      <main>
        {/* Article Header */}
        <article className="max-w-3xl mx-auto px-6 pt-32 pb-16">
          <div className="mb-8">
            <Link
              href="/blog"
              className="text-sm text-green-primary hover:underline"
            >
              &larr; Back to blog
            </Link>
          </div>

          <div className="text-[0.68rem] uppercase tracking-wider text-green-primary font-semibold mb-4">
            {post.tag}
          </div>

          <h1
            className="font-serif text-4xl md:text-5xl font-bold text-green-deep mb-6 leading-tight"
            style={{ letterSpacing: '-0.02em' }}
          >
            {post.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-text-tertiary mb-12">
            <time>
              {new Date(post.date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </time>
            <span>&middot;</span>
            <span>{post.readTime}</span>
          </div>

          {/* MDX Content */}
          <div className="prose-merios">
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>
        </article>

        {/* Related Articles */}
        {related.length > 0 && (
          <section className="py-16 px-6 bg-beige">
            <div className="max-w-3xl mx-auto">
              <h2 className="font-serif text-2xl font-medium text-green-deep mb-8">
                Related articles
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {related.map((r) => (
                  <Link
                    key={r.slug}
                    href={`/blog/${r.slug}`}
                    className="bg-white rounded-xl p-6 border border-green-primary/6 hover:shadow-md transition-all"
                  >
                    <div className="text-[0.65rem] uppercase tracking-wider text-green-primary font-semibold mb-2">
                      {r.tag}
                    </div>
                    <h3 className="font-serif text-lg font-semibold text-green-deep mb-2">
                      {r.title}
                    </h3>
                    <p className="text-sm text-text-secondary">{r.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* CTA */}
        <section className="py-16 px-6 text-center">
          <h2 className="font-serif text-3xl font-medium text-green-deep mb-4">
            Ready to understand your health?
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
