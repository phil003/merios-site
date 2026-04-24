// Tag → Tailwind gradient classes for editorial article hero / card panels.
// Keep tag keys exactly as emitted by the MDX frontmatter (src/lib/blog.ts).
export const BLOG_GRADIENTS: Record<string, string> = {
  Biomarkers: "from-[#E8F0EB] to-[#D4E4DA]",
  Sleep: "from-[#EDE4F5] to-[#DDD2EC]",
  Nutrition: "from-[#FFF3E0] to-[#F5E6CC]",
  Science: "from-[#E0F0FF] to-[#CCE4F5]",
  Lifestyle: "from-[#FDE8E8] to-[#F5CCCC]",
  default: "from-[#F0F0F0] to-[#E0E0E0]",
};

export function getBlogGradient(tag: string): string {
  return BLOG_GRADIENTS[tag] ?? BLOG_GRADIENTS.default;
}
