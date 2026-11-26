import ArticleCover from "@/components/blog/ArticleCover";
import { formatPostDate } from "@/components/blog/format";
import { getListedPosts, type BlogPost } from "@/lib/blog";
import { BLOG_CATEGORIES, getTopicTitle } from "@/lib/blog-categories";
import { Arrow } from "./icons";
import { keepHyphens } from "./text";

/* From the Journal (Home2 "09"): the latest post of three different Journal
   topics (updates itself with every publish, and never shows three takes on
   one subject), each with the Journal's own drawn cover (the subject, never a
   photo), in Home2's glass card; then the free tools with their formulas. */

const TOOLS: [string, string, string][] = [
  ["TyG index", "ln(TG × glucose ÷ 2)", "/tools/tyg-index-calculator"],
  ["Lp(a) converter", "mg/dL ↔ nmol/L", "/tools/lpa-unit-converter"],
  ["PhenoAge", "9 markers + age", "/tools/phenoage-calculator"],
  ["A1C ↔ glucose", "eAG = 28.7 × A1C − 46.7", "/tools/a1c-calculator"],
  ["HOMA-IR", "glucose × insulin ÷ 405", "/tools/homa-ir-calculator"],
  ["Transferrin saturation", "iron ÷ TIBC × 100", "/tools/transferrin-saturation-calculator"],
  ["TG / HDL ratio", "triglycerides ÷ HDL", "/blog/triglyceride-hdl-ratio-calculator"],
  ["Zone 2", "heart rate range", "/tools/zone-2-calculator"],
];

/** The Journal topic a post belongs to (its category hub, else its own tag). */
function topicOf(post: BlogPost): string {
  return BLOG_CATEGORIES.find((c) => c.tags.includes(post.tag))?.slug ?? post.tag;
}

/** Newest first, at most one post per topic. */
function latestAcrossTopics(posts: BlogPost[], count: number): BlogPost[] {
  const seen = new Set<string>();
  const picked: BlogPost[] = [];
  for (const post of posts) {
    const topic = topicOf(post);
    if (seen.has(topic)) continue;
    seen.add(topic);
    picked.push(post);
    if (picked.length === count) break;
  }
  return picked;
}

export default function Learn() {
  const latest = latestAcrossTopics(getListedPosts(), 3);

  return (
    <section id="learn" className="hv2-sec hv2-learn" aria-labelledby="learn-title">
      <div className="hv2-wrap">
        <p className="hv2-eyebrow">09 · Learn</p>
        <div className="hv2-learn__head">
          <h2 className="hv2-h2" id="learn-title">
            From the <em>Journal</em>
          </h2>
          <a className="hv2-textlink" href="/blog">
            All articles <Arrow width={16} />
          </a>
        </div>

        <div className="hv2-posts" data-rv="">
          {latest.map((p) => (
            <a key={p.slug} className="hv2-post" href={`/blog/${p.slug}`}>
              <span className="hv2-post__cover">
                <ArticleCover post={p} className="hv2-post__art" />
              </span>
              <span className="hv2-post__meta">
                {`${getTopicTitle(p.tag)} · `}
                <time dateTime={p.date}>{formatPostDate(p.date)}</time> · {p.readTime}
              </span>
              <h3 className="hv2-post__title">{keepHyphens(p.title)}</h3>
            </a>
          ))}
        </div>

        <div className="hv2-tools__head">
          <h3>Free tools</h3>
          <p>No account. The formula is on every page.</p>
        </div>
        <ul className="hv2-tools">
          {TOOLS.map(([name, formula, href]) => (
            <li key={href}>
              <a className="hv2-tool" href={href}>
                <span>
                  <b>{keepHyphens(name)}</b>
                  <code>{formula}</code>
                </span>
                <Arrow width={16} />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
