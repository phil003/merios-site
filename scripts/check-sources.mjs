// Build guard (runs in prebuild, no network): every <Cite id="…"/> in an
// article must match a `sources:` entry, every PMID/DOI must have its record in
// content/references.json (run scripts/fetch-references.mjs after adding
// sources), and web sources must carry url, title, publisher and year.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const BLOG_DIR = path.join(process.cwd(), "content/blog");
const refsFile = path.join(process.cwd(), "content/references.json");
const references = fs.existsSync(refsFile) ? JSON.parse(fs.readFileSync(refsFile, "utf-8")) : {};
const errors = [];
let articles = 0;
let citations = 0;

for (const file of fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"))) {
  const { data, content } = matter(fs.readFileSync(path.join(BLOG_DIR, file), "utf-8"));
  const sources = data.sources ?? [];
  const ids = new Set();
  for (const s of sources) {
    if (!s?.id || ids.has(s.id)) errors.push(`${file}: missing or duplicate source id "${s?.id}"`);
    ids.add(s?.id);
    if (s.pmid) {
      if (!references[`pmid:${s.pmid}`]) errors.push(`${file}: PMID ${s.pmid} (${s.id}) not in references.json`);
    } else if (s.doi) {
      if (!references[`doi:${s.doi}`]) errors.push(`${file}: DOI ${s.doi} (${s.id}) not in references.json`);
    } else if (!s.url || !s.title || !s.publisher || !s.year) {
      errors.push(`${file}: web source ${s.id} needs url, title, publisher and year`);
    }
  }
  const cited = [...content.matchAll(/<Cite\s+id="([^"]+)"\s*\/>/g)].map((m) => m[1]);
  for (const id of cited) if (!ids.has(id)) errors.push(`${file}: <Cite id="${id}"/> has no source`);
  if (sources.length) articles++;
  citations += cited.length;
}

if (errors.length) {
  console.error(`check-sources: ${errors.length} problem(s)\n${errors.join("\n")}`);
  process.exit(1);
}
console.log(`check-sources: ${articles} sourced articles, ${citations} inline citations, all resolved`);
