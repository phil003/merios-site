import Footer from "@/components/Footer";
import ReadingProgress from "@/components/ui/ReadingProgress";
import EditorialProse from "@/components/ui/EditorialProse";
import ArticleHero from "@/components/blog-article/ArticleHero";
import ArticleTOC from "@/components/blog-article/ArticleTOC";
import MobileTOC from "@/components/blog-article/MobileTOC";
import ShareButtons from "@/components/blog-article/ShareButtons";
import AuthorByline from "@/components/blog-article/AuthorByline";
import ArticleFAQ from "@/components/blog-article/ArticleFAQ";
import RelatedArticles from "@/components/blog-article/RelatedArticles";
import ArticleCTA from "@/components/blog-article/ArticleCTA";
import ArticleNotFound from "@/components/blog-article/NotFound";
import { createMdxComponents } from "@/components/blog-article/mdxComponents";
import { extractHeadings } from "@/components/blog-article/toc";
import {
  ArticleSchema,
  BreadcrumbSchema,
  FAQPageSchema,
} from "@/components/StructuredData";
import {
  getAllSlugs,
  getAllPosts,
  getPostBySlug,
  type BlogPost,
} from "@/lib/blog";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import type { Metadata } from "next";

// Generate all blog slugs at build time for static export.
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Article Not Found | Merios" };

  return {
    title: `${post.title} | Merios Blog`,
    description: post.description,
    alternates: {
      canonical: `https://merios.life/blog/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.dateModified || post.date,
      url: `https://merios.life/blog/${post.slug}`,
      images: post.image ? [{ url: post.image }] : [{ url: "/og-image.png" }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : ["/og-image.png"],
    },
  };
}

function parseReadingMinutes(readTime: string): number {
  const match = readTime.match(/\d+/);
  return match ? parseInt(match[0], 10) : 5;
}

function buildRelated(current: BlogPost, all: BlogPost[]): BlogPost[] {
  const sameTag = all.filter(
    (p) => p.slug !== current.slug && p.tag === current.tag,
  );
  if (sameTag.length >= 3) return sameTag.slice(0, 3);
  const filler = all
    .filter(
      (p) =>
        p.slug !== current.slug &&
        !sameTag.some((s) => s.slug === p.slug),
    )
    .slice(0, 3 - sameTag.length);
  return [...sameTag, ...filler];
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <>
        <ArticleNotFound />
        <Footer />
      </>
    );
  }

  const mdxComponents = createMdxComponents();
  const headings = extractHeadings(post.content);
  const readingMinutes = parseReadingMinutes(post.readTime);
  const related = buildRelated(post, getAllPosts());

  return (
    <>
      <ArticleSchema
        title={post.title}
        description={post.description}
        datePublished={post.date}
        dateModified={post.dateModified}
        slug={post.slug}
        image={post.image}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://merios.life" },
          { name: "Blog", url: "https://merios.life/blog" },
          {
            name: post.title,
            url: `https://merios.life/blog/${post.slug}`,
          },
        ]}
      />
      {post.faq && post.faq.length > 0 ? (
        <FAQPageSchema questions={post.faq} />
      ) : null}

      <ReadingProgress />

      <main style={{ background: "var(--color-canvas)" }}>
        <ArticleHero
          title={post.title}
          description={post.description}
          date={post.date}
          dateModified={post.dateModified}
          readingMinutes={readingMinutes}
          category={post.tag}
          slug={post.slug}
          image={post.image}
        />

        <MobileTOC headings={headings} />

        <section className="pb-12 md:pb-20">
          <div className="mx-auto max-w-[1200px] px-6 pt-12 md:px-10 md:pt-16">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[240px_1fr] lg:gap-16">
              {/* Desktop sticky TOC */}
              <div className="lg:pt-2">
                <ArticleTOC headings={headings} />
              </div>

              {/* Article body */}
              <div className="min-w-0">
                <div data-article-body="">
                  <EditorialProse>
                    <MDXRemote
                      source={post.content}
                      components={mdxComponents}
                      options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
                    />
                  </EditorialProse>
                </div>

                <div className="mx-auto max-w-[680px]">
                  <AuthorByline />
                  <div className="mt-10">
                    <ShareButtons title={post.title} slug={post.slug} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {post.faq && post.faq.length > 0 ? (
          <ArticleFAQ items={post.faq} />
        ) : null}

        <div className="mt-16 md:mt-20" />

        <RelatedArticles posts={related} />
        <ArticleCTA />
      </main>

      <Footer />
    </>
  );
}
