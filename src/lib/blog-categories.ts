import { getListedPosts, type BlogPost } from "@/lib/blog";

// Blog category hubs (/blog/category/[slug]). Single source for the category
// pages, their Open Graph cards and the topic navigation on /blog and on every
// category page — the navigation is what links each hub, so every category
// listed here is reachable by a crawler.
//
// Each category aggregates one or more frontmatter `tag` values. Slugs are
// kebab-case for SEO clarity; tag matching is case-sensitive against the
// values used in content/blog/*.mdx frontmatter. A new category also needs
// its URL in STATIC_ROUTES (scripts/generate-sitemap.mjs).

export type BlogCategory = {
  slug: string;
  title: string;
  description: string;
  metaDescription: string;
  tags: string[];
  hookKeyword: string;
};

export const BLOG_CATEGORIES: readonly BlogCategory[] = [
  {
    slug: "blood-tests",
    title: "Blood Tests",
    description:
      "Everything you need to interpret your blood work — from CBC and CMP to advanced lipid panels, ApoB, and Lp(a).",
    metaDescription:
      "Blood test guides, biomarker explanations, and lab result interpretation. Learn what your numbers mean and how to optimize them.",
    tags: ["Blood Tests"],
    hookKeyword: "blood test",
  },
  {
    slug: "biomarkers",
    title: "Biomarkers",
    description:
      "Decoded biomarkers across cardiovascular, metabolic, inflammatory, and organ-system clusters — with optimal ranges that go beyond lab reference intervals.",
    metaDescription:
      "Comprehensive guides on biomarkers — ApoB, hs-CRP, ALT, ferritin, and more. Optimal vs reference ranges for serious health optimizers.",
    tags: ["Biomarkers", "Lipids", "Inflammation", "Iron", "Liver", "Kidney", "Cardiovascular", "Heart Health"],
    hookKeyword: "biomarker",
  },
  {
    slug: "wearables",
    title: "Wearables & Lifestyle",
    description:
      "How to read what your Apple Watch, Oura, WHOOP, and Garmin actually measure — HRV, sleep, recovery, and zone-2 cardio interpretation.",
    metaDescription:
      "Wearable data decoded: Apple Watch HRV, Oura sleep scores, WHOOP recovery, zone-2 cardio. Turn daily metrics into actionable insights.",
    tags: ["Sleep", "HRV", "Heart Rate", "Fitness", "Wearables"],
    hookKeyword: "wearable",
  },
  {
    slug: "metabolic-health",
    title: "Metabolic Health",
    description:
      "Blood sugar, insulin resistance, and the metabolic markers that drift years before a diagnosis — HbA1c, fasting insulin, HOMA-IR, and what actually moves them.",
    metaDescription:
      "Metabolic health decoded: HbA1c, fasting glucose, insulin resistance, HOMA-IR, and prediabetes. What your numbers mean and how to reverse the drift.",
    tags: ["Metabolic Health"],
    hookKeyword: "metabolic health",
  },
  {
    slug: "longevity",
    title: "Longevity",
    description:
      "Biological age, lifespan biomarkers, and the evidence-based interventions that actually move the needle on healthspan.",
    metaDescription:
      "Biological age, PhenoAge, longevity biomarkers, and proven interventions to extend healthspan. Backed by peer-reviewed research.",
    tags: ["Longevity", "Pillar", "Tools"],
    hookKeyword: "longevity",
  },
  {
    slug: "hormones",
    title: "Hormones",
    description:
      "Thyroid, testosterone, cortisol, and the rest — what to test, what's optimal, and what to do when numbers drift.",
    metaDescription:
      "Hormone testing decoded: thyroid (TSH, T3, T4), testosterone, cortisol, IGF-1. Optimal ranges for men and women, and what to do about deficiencies.",
    tags: ["Hormones", "Thyroid"],
    hookKeyword: "hormone",
  },
  {
    slug: "nutrition",
    title: "Nutrition & Supplements",
    description:
      "Vitamin D, B12, magnesium, omega-3 — what your blood tests reveal about nutrient status and which supplements actually fix it.",
    metaDescription:
      "Nutrient deficiency decoded: vitamin D, B12, magnesium, omega-3, iron. What your blood work shows and how to supplement effectively.",
    tags: ["Vitamins", "Supplements", "Nutrition", "Mental Health"],
    hookKeyword: "supplement",
  },
];

export function getBlogCategory(slug: string): BlogCategory | undefined {
  return BLOG_CATEGORIES.find((c) => c.slug === slug);
}

/** Posts whose frontmatter tag belongs to the category, newest first. */
export function getPostsInCategory(
  category: BlogCategory,
  posts: BlogPost[] = getListedPosts(),
): BlogPost[] {
  return posts.filter((p) => category.tags.includes(p.tag));
}

/** Article count per category slug, for the topic navigation. */
export function getCategoryCounts(
  posts: Pick<BlogPost, "tag">[],
): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const category of BLOG_CATEGORIES) {
    counts[category.slug] = posts.filter((p) => category.tags.includes(p.tag)).length;
  }
  return counts;
}
