import { renderOgCard, OG_SIZE } from "@/lib/og";
import {
  BLOG_CATEGORIES,
  getBlogCategory,
  getPostsInCategory,
} from "@/lib/blog-categories";

/**
 * Per-category Open Graph card for /blog/category/[slug] — same card system
 * as the articles (src/lib/og.tsx). Statically generated at build for every
 * category; the Twitter card picks it up from og:image.
 */

export const size = OG_SIZE;
export const contentType = "image/png";
export const alt = "A topic hub of the Merios Journal: articles and guides on one area of health.";

export function generateStaticParams() {
  return BLOG_CATEGORIES.map((c) => ({ slug: c.slug }));
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const category = getBlogCategory(slug);
  const count = category ? getPostsInCategory(category).length : 0;

  return renderOgCard({
    eyebrow: "Topic · The Journal",
    title: category ? `${category.title}: articles & guides` : "The Journal",
    meta: category ? `${count} ${count === 1 ? "article" : "articles"}` : undefined,
  });
}
