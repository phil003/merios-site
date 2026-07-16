import { renderOgCard, OG_SIZE } from "@/lib/og";
import { getAllCompareSlugs, getComparePostBySlug } from "@/lib/compare";

/** Per-page Open Graph image for /compare/[slug] — same card system as blog. */

export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return getAllCompareSlugs().map((slug) => ({ slug }));
}

export default async function OgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getComparePostBySlug(slug);

  return renderOgCard({
    eyebrow: "Comparison",
    title: post?.title ?? "Merios — Compared",
  });
}
