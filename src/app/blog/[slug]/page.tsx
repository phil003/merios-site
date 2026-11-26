import Footer from "@/components/Footer";
import ReadingProgress from "@/components/ui/ReadingProgress";
import EditorialProse from "@/components/ui/EditorialProse";
import ArticleHero, { ArticleFigure } from "@/components/blog-article/ArticleHero";
import ArticleHeroCover from "@/components/blog-article/ArticleHeroCover";
import ArticleAppCard from "@/components/blog-article/ArticleAppCard";
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
import remarkMeriosBlock from "@/components/blog-article/remarkMeriosBlock";
import remarkCiteSeparators from "@/components/blog-article/remarkCiteSeparators";
import { estimateTocHeight, extractHeadings } from "@/components/blog-article/toc";
import articleStyles from "@/components/blog-article/article.module.css";
import {
  ArticleSchema,
  BreadcrumbSchema,
  FAQPageSchema,
} from "@/components/StructuredData";
import { getAllSlugs, getAllPosts, getPostBySlug } from "@/lib/blog";
import { getCategoryForTag, getTopicTitle } from "@/lib/blog-categories";
import { getRelated } from "@/lib/related";
import { resolveSources } from "@/lib/sources";
import { getDrawnCover } from "@/lib/covers";
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
  // The value an article is about (its drawn cover pins it on a range:
  // ferritin 30, HbA1c 5.6…), shown big in the short-answer card.
  const drawn = getDrawnCover({ slug: post.slug, title: post.title, tag: post.tag });
  const answerValue =
    drawn.main.kind === "one" &&
    drawn.band &&
    drawn.band.pins.length > 0 &&
    /\d/.test(drawn.main.big)
      ? { display: drawn.main.big, unit: drawn.main.unit }
      : undefined;
  const mdxComponents = createMdxComponents(
    new Map(sources.map((s) => [s.id, s.number])),
    { answerValue },
  );
  const headings = extractHeadings(post.content);
  if (post.faq && post.faq.length > 0) {
    headings.push({ id: "faq", text: "Frequently asked questions", level: 2 });
  }
  if (sources.length > 0) {
    headings.push({ id: "sources", text: "Sources", level: 2 });
  }
  const readingMinutes = parseReadingMinutes(post.readTime);
  const related = getRelated(post.slug, getAllPosts());
  // The topic hub the article belongs to: a crumb in the hero and in the
  // breadcrumb schema, so every article links up to its category page.
  const hub = getCategoryForTag(post.tag);
  const hubCrumb = hub
    ? { title: hub.title, href: `/blog/category/${hub.slug}` }
    : undefined;
  // The sticky aside holds the contents first. A short list leaves room for
  // the app card with its screen, a longer one for the compact card (line +
  // pill), and a long one takes the whole column (it scrolls, with a fade,
  // past what the screen allows).
  const tocHeight = estimateTocHeight(headings);
  const appCard = tocHeight <= 300 ? "full" : tocHeight <= 560 ? "compact" : null;

  // The drawn cover shows the subject; a genuine per-article image (none
  // today: every article carries the site share card) still shows as a photo.
  const cover =
    post.image && post.image !== "/og-image.png" ? (
      <ArticleFigure image={post.image} title={post.title} slug={post.slug} tag={post.tag} />
    ) : (
      <ArticleHeroCover post={{ slug: post.slug, title: post.title, tag: post.tag }} />
    );

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

      <main className={articleStyles.page}>
        <ArticleHero
          title={post.title}
          description={post.description}
          date={post.date}
          dateModified={post.dateModified}
          readingMinutes={readingMinutes}
          category={getTopicTitle(post.tag)}
          hub={hubCrumb}
          slug={post.slug}
          image={post.image}
          sourcesCount={sources.length}
          cover={cover}
        />

        <div className={articleStyles.body}>
          <div className={articleStyles.bodyRow}>
            {/* Reading column */}
            <div className={articleStyles.column}>
              <MobileTOC headings={headings} />

              <div data-article-body="" className={articleStyles.prose}>
                <EditorialProse>
                  <MDXRemote
                    source={post.content}
                    components={mdxComponents}
                    options={{
                      mdxOptions: {
                        remarkPlugins: [remarkGfm, remarkMeriosBlock, remarkCiteSeparators],
                      },
                    }}
                  />
                </EditorialProse>
              </div>

              {post.faq && post.faq.length > 0 ? (
                <ArticleFAQ items={post.faq} />
              ) : null}

              <ArticleSources sources={sources} checkedOn={post.dateModified} />

              <p className={articleStyles.disclaimer}>
                General information, not a diagnosis. Talk to your doctor about
                your own results before changing treatment.
              </p>

              <AuthorByline />
              <div className={articleStyles.shareRow}>
                <ShareButtons title={post.title} slug={post.slug} />
              </div>
              <SubstackSubscribe />
            </div>

            {/* Sticky aside (desktop): contents, then the app when the
                contents leave room for it */}
            <div className={articleStyles.aside} data-lenis-prevent="">
              <ArticleTOC headings={headings} />
              {appCard ? <ArticleAppCard compact={appCard === "compact"} /> : null}
            </div>
          </div>
        </div>

        <RelatedArticles posts={related.cards} more={related.more} />
        <ArticleCTA />
      </main>

      <Footer />
    </>
  );
}
