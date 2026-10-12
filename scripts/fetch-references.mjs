// Fills content/references.json with bibliographic records for every PMID and
// DOI cited in content/blog/*.mdx, straight from PubMed (E-utilities) and
// Crossref. Run after adding sources; the build never touches the network.
//
//   node scripts/fetch-references.mjs
//
// Fails without writing when a PMID or DOI does not exist or a paper is
// retracted, so a bad reference cannot reach the site.
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = process.cwd();
const BLOG_DIR = path.join(ROOT, "content/blog");
const OUT = path.join(ROOT, "content/references.json");
const EUTILS = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const clean = (text) =>
  String(text ?? "")
    .replace(/<[^>]+>/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\.$/, "");

async function getJson(url) {
  for (let attempt = 0; attempt < 6; attempt++) {
    const response = await fetch(url, { headers: { "User-Agent": "merios-site references (merios.life)" } });
    if (response.ok) return response.json();
    if (response.status === 404) return null;
    await sleep(1500 * (attempt + 1));
  }
  throw new Error(`failed: ${url}`);
}

const pmids = new Set();
const dois = new Set();
for (const file of fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".mdx"))) {
  const { data } = matter(fs.readFileSync(path.join(BLOG_DIR, file), "utf-8"));
  for (const source of data.sources ?? []) {
    if (source.pmid) pmids.add(String(source.pmid));
    else if (source.doi) dois.add(String(source.doi));
  }
}

const records = {};
const problems = [];

const ids = [...pmids].sort();
for (let i = 0; i < ids.length; i += 150) {
  const batch = ids.slice(i, i + 150);
  const json = await getJson(`${EUTILS}/esummary.fcgi?db=pubmed&retmode=json&id=${batch.join(",")}`);
  await sleep(400);
  for (const pmid of batch) {
    const item = json?.result?.[pmid];
    if (!item || item.error) {
      problems.push(`PMID ${pmid} not found`);
      continue;
    }
    // A retracted paper can never back a claim. A retraction *notice* can: it
    // is the source for "this trial was retracted".
    if ((item.pubtype ?? []).includes("Retracted Publication")) problems.push(`PMID ${pmid} is a retracted paper`);
    records[`pmid:${pmid}`] = {
      title: clean(item.title),
      // Four names are enough to print "A, B, C, et al.".
      authors: (item.authors ?? []).filter((a) => a.authtype === "Author").map((a) => a.name).slice(0, 4),
      journal: clean(item.source),
      year: String(item.pubdate || item.epubdate || "").slice(0, 4),
      doi: (item.articleids ?? []).find((a) => a.idtype === "doi")?.value,
      pmid,
    };
  }
}

for (const doi of [...dois].sort()) {
  const json = await getJson(`https://api.crossref.org/works/${encodeURIComponent(doi)}`);
  if (!json) {
    problems.push(`DOI ${doi} not found`);
    continue;
  }
  const m = json.message;
  records[`doi:${doi}`] = {
    title: clean(m.title?.[0]),
    authors: (m.author ?? []).filter((a) => a.family).slice(0, 4).map((a) => `${a.family} ${(a.given ?? "").split(/[\s-]+/).map((n) => n[0] ?? "").join("")}`.trim()),
    journal: clean(m["container-title"]?.[0] || m.publisher),
    year: String(m.issued?.["date-parts"]?.[0]?.[0] ?? ""),
    doi,
  };
}

if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}
// Only records still cited are kept.
const sorted = Object.fromEntries(Object.entries(records).sort(([a], [b]) => a.localeCompare(b)));
fs.writeFileSync(OUT, `${JSON.stringify(sorted, null, 1)}\n`);
console.log(`references.json: ${Object.keys(records).length} records (${ids.length} PMIDs, ${dois.size} DOIs)`);
