import Footer from "@/components/Footer";
import ReadingProgress from "@/components/ui/ReadingProgress";
import EditorialProse from "@/components/ui/EditorialProse";
import ArticleHero from "@/components/compare-article/ArticleHero";
import ArticleTOC from "@/components/compare-article/ArticleTOC";
import ArticleFAQ from "@/components/compare-article/ArticleFAQ";
import ArticleVerdict from "@/components/compare-article/ArticleVerdict";
import RelatedComparisons from "@/components/compare-article/RelatedComparisons";
import ArticleCTA from "@/components/compare-article/ArticleCTA";
import ArticleNotFound from "@/components/compare-article/NotFound";
import { createMdxComponents } from "@/components/compare-article/mdxComponents";
import {
  ArticleSchema,
  BreadcrumbSchema,
  FAQPageSchema,
} from "@/components/StructuredData";
import {
  getAllCompareSlugs,
  getAllComparePosts,
  getComparePostBySlug,
} from "@/lib/compare";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import type { Metadata } from "next";

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
  if (!post) return { title: "Comparison Not Found | Merios" };

  return {
    title: `${post.title} | Merios`,
    description: post.description,
    alternates: {
      canonical: `https://merios.life/compare/${post.slug}`,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      modifiedTime: post.dateModified || post.date,
      url: `https://merios.life/compare/${post.slug}`,
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
        <ArticleNotFound />
        <Footer />
      </>
    );
  }

  const mdxComponents = createMdxComponents();

  const related = getAllComparePosts()
    .filter((p) => p.slug !== post.slug)
    .slice(0, 3);

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
          { name: "Home", url: "https://merios.life" },
          { name: "Compare", url: "https://merios.life/compare" },
          {
            name: post.title,
            url: `https://merios.life/compare/${post.slug}`,
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
          datePublished={post.date}
          dateModified={post.dateModified}
          readTime={post.readTime}
          competitor={post.competitor}
        />

        <section className="pb-24">
          <div className="mx-auto max-w-[1200px] px-6 md:px-10">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-[220px_1fr]">
              {/* Sticky TOC — desktop only */}
              <aside className="lg:pt-2">
                <ArticleTOC />
              </aside>

              {/* Article body */}
              <div>
                <div data-article-body="">
                  <EditorialProse>
                    <MDXRemote
                      source={post.content}
                      components={mdxComponents}
                      options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
                    />
                  </EditorialProse>
                </div>

                {post.faq && post.faq.length > 0 ? (
                  <div className="mx-auto max-w-[680px]">
                    <ArticleFAQ items={post.faq} />
                  </div>
                ) : null}

                <div className="mx-auto max-w-[680px]">
                  <ArticleVerdict text={post.description} />
                </div>
              </div>
            </div>
          </div>
        </section>

        <RelatedComparisons posts={related} />
        <ArticleCTA />
      </main>

      <Footer />
    </>
  );
}
