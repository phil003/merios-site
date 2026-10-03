import ArticleCover from "@/components/blog/ArticleCover";
import { getAllPosts } from "@/lib/blog";
import { Arrow } from "./icons";

/* From the Journal: the three latest posts (updates itself with every
   publish), then the free calculators with their formulas. */

const TOOLS: [string, string, string][] = [
  ["TyG index", "ln(TG × glucose ÷ 2)", "/tools/tyg-index-calculator"],
  ["Lp(a) converter", "mg/dL ↔ nmol/L", "/tools/lpa-unit-converter"],
  ["PhenoAge", "9 markers + age", "/tools/phenoage-calculator"],
  ["A1C ↔ glucose", "eAG = 28.7 × A1C − 46.7", "/tools/a1c-calculator"],
  ["HOMA-IR", "glucose × insulin ÷ 405", "/tools/homa-ir-calculator"],
  ["Transferrin saturation", "iron ÷ TIBC × 100", "/tools/transferrin-saturation-calculator"],
  ["TG / HDL ratio", "triglycerides ÷ HDL", "/tools/triglyceride-hdl-ratio"],
  ["Zone 2", "heart rate range", "/tools/zone-2-calculator"],
];

function formatMonth(date: string): string {
  const d = new Date(date);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-US", { month: "short", year: "numeric" }).toUpperCase();
}

export default function Learn() {
  const latest = getAllPosts().slice(0, 3);

  return (
    <section id="learn" className="hv3-learn" data-stage="fog" aria-labelledby="learn-title">
      <div className="hv3-wrap">
        <div className="hv3-learn__head" data-rv="">
          <h2 id="learn-title">From the Journal</h2>
          <a className="hv3-learn__all" href="/blog">
            All articles <Arrow width={16} />
          </a>
        </div>
        <div className="hv3-posts" data-rv="">
          {latest.map((p) => (
            <a key={p.slug} className="hv3-post" href={`/blog/${p.slug}`}>
              <div className="hv3-post__cover">
                <ArticleCover post={p} className="block h-full w-full" />
              </div>
              <h3>{p.title}</h3>
              <span className="hv3-fine">
                {formatMonth(p.date)} · {p.readTime.replace(/\s*read\s*$/i, "").toUpperCase()}
              </span>
            </a>
          ))}
        </div>
        <div className="hv3-tools" data-rv="">
          <div className="hv3-tools__head">
            <h3>Free tools</h3>
            <span className="hv3-fine">No account. The formula is on every page.</span>
          </div>
          <div className="hv3-tools__grid">
            {TOOLS.map(([name, formula, href]) => (
              <a key={href} className="hv3-tool" href={href}>
                <b>{name}</b>
                <code>{formula}</code>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
