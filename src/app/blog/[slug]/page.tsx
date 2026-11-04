import Footer from "@/components/Footer";
import ReadingProgress from "@/components/ui/ReadingProgress";
import EditorialProse from "@/components/ui/EditorialProse";
import ArticleHero, { ArticleFigure } from "@/components/blog-article/ArticleHero";
import ArticleTOC from "@/components/blog-article/ArticleTOC";
import MobileTOC from "@/components/blog-article/MobileTOC";
import ShareButtons from "@/components/blog-article/ShareButtons";
import AuthorByline from "@/components/blog-article/AuthorByline";
import ArticleFAQ from "@/components/blog-article/ArticleFAQ";
import RelatedArticles from "@/components/blog-article/RelatedArticles";
import ArticleCTA from "@/components/blog-article/ArticleCTA";
import ArticleSources from "@/components/blog-article/ArticleSources";
import SubstackSubscribe from "@/components/SubstackSubscribe";
import ArticleNotFound from "@/components/blog-article/NotFound";
import { createMdxComponents } from "@/components/blog-article/mdxComponents";
import { extractHeadings } from "@/components/blog-article/toc";
import articleStyles from "@/components/blog-article/article.module.css";
import {
  ArticleSchema,
  BreadcrumbSchema,
  FAQPageSchema,
} from "@/components/StructuredData";
import { getAllSlugs, getAllPosts, getPostBySlug } from "@/lib/blog";
import { BLOG_CATEGORIES } from "@/lib/blog-categories";
import { getRelated } from "@/lib/related";
import { resolveSources } from "@/lib/sources";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import type { Metadata } from "next";

// Generate all blog slugs at build time for static export.
export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

// Every post is enumerated above, so any other slug is genuinely missing.
// Without this, Next renders unknown slugs on demand and the page's own
// "not found" branch returns HTTP 200 — a soft 404 across all of /blog/*.
// With it, an unknown slug 404s at the routing layer, with a real 404 status.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Article Not Found" };

  return {
    // No " | Merios" suffix on articles: Google shows the site name on its own
    // line (WebSite schema), and the suffix pushed most titles past 60 chars.
    title: { absolute: post.seoTitle ?? post.title },
    description: post.description,
    alternates: {
      canonical: `https://merios.life/blog/${post.slug}`,
    },
    ...(post.noindex ? { robots: { index: false, follow: true } } : {}),
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.dateModified || post.date,
      url: `https://merios.life/blog/${post.slug}`,
      // og:image intentionally omitted — the opengraph-image.tsx file
      // convention generates a branded per-article card and registers it.
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
    },
  };
}

function parseReadingMinutes(readTime: string): number {
  const match = readTime.match(/\d+/);
  return match ? parseInt(match[0], 10) : 5;
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

  const sources = resolveSources(post.content, post.sources);
  const mdxComponents = createMdxComponents(
    new Map(sources.map((s) => [s.id, s.number])),
  );
  const headings = extractHeadings(post.content);
  if (sources.length > 0) {
    headings.push({ id: "sources", text: "Sources", level: 2 });
  }
  const readingMinutes = parseReadingMinutes(post.readTime);
  const related = getRelated(post.slug, getAllPosts());
  // The topic hub the article belongs to: a crumb in the hero and in the
  // breadcrumb schema, so every article links up to its category page.
  const hub = BLOG_CATEGORIES.find((c) => c.tags.includes(post.tag));
  const hubCrumb = hub
    ? { title: hub.title, href: `/blog/category/${hub.slug}` }
    : undefined;

  return (
    <>
      <ArticleSchema
        title={post.title}
        description={post.description}
        datePublished={post.date}
        dateModified={post.dateModified}
        slug={post.slug}
        image={post.image}
        citations={sources}
      />
      <BreadcrumbSchema
        items={[
          { name: "Home", url: "https://merios.life" },
          { name: "Blog", url: "https://merios.life/blog" },
          ...(hubCrumb
            ? [{ name: hubCrumb.title, url: `https://merios.life${hubCrumb.href}` }]
            : []),
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
          hub={hubCrumb}
          slug={post.slug}
          image={post.image}
        />

        <MobileTOC headings={headings} />

        <section className={articleStyles.bodySection}>
          <div className={articleStyles.container}>
            <div className={articleStyles.bodyGrid}>
              {/* Desktop sticky TOC */}
              <div className="lg:pt-1">
                <ArticleTOC headings={headings} />
              </div>

              {/* Article body */}
              <div className="min-w-0">
                {post.image ? (
                  <ArticleFigure image={post.image} title={post.title} slug={post.slug} tag={post.tag} />
                ) : null}

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
                  <ArticleSources
                    sources={sources}
                    checkedOn={post.dateModified}
                  />
                  <AuthorByline />
                  <div className="mt-8">
                    <ShareButtons title={post.title} slug={post.slug} />
                  </div>
                  <SubstackSubscribe />
                </div>
              </div>
            </div>
          </div>
        </section>

        {post.faq && post.faq.length > 0 ? (
          <ArticleFAQ items={post.faq} />
        ) : null}

        <RelatedArticles posts={related.cards} more={related.more} />
        <ArticleCTA />
      </main>

      <Footer />
    </>
  );
}
