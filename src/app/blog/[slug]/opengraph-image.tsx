import { renderOgCard, OG_SIZE } from "@/lib/og";
import { getAllSlugs, getPostBySlug } from "@/lib/blog";

/**
 * Per-article Open Graph image for /blog/[slug].
 *
 * File-convention metadata takes precedence over the config fallback, so
 * every article gets a branded, consistent card (title + category + read
 * time) instead of the generic /og-image.png — better social CTR and a
 * clean image-SERP presence. Statically generated at build for all slugs.
 */

export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  return renderOgCard({
    eyebrow: post?.tag ? `${post.tag} · The Journal` : "The Journal",
    title: post?.title ?? "Merios — Health Intelligence",
    meta: post?.readTime ?? undefined,
  });
}
