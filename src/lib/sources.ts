import fs from "fs";
import path from "path";

/**
 * Article sources.
 *
 * An article lists its sources in frontmatter (`sources:`) and cites them
 * inline with `<Cite id="…" />`. Journal articles carry only a PMID (or a DOI
 * when PubMed has no record); their title, authors, journal and year come from
 * content/references.json, which `scripts/fetch-references.mjs` fills from
 * PubMed and Crossref — so a reference can never be misquoted by hand. Web
 * sources (guidelines, fact sheets) carry their own url/title/publisher/year.
 *
 * Numbering follows the order of first citation in the text, the convention
 * of medical journals; sources listed but never cited come last.
 */

export interface SourceRef {
  id: string;
  pmid?: string | number;
  doi?: string;
  url?: string;
  title?: string;
  publisher?: string;
  year?: string | number;
}

interface ReferenceRecord {
  title: string;
  authors: string[];
  journal: string;
  year: string;
  doi?: string;
  pmid?: string;
}

export interface ResolvedSource {
  id: string;
  number: number;
  title: string;
  /** "Smith J, Lee K, Patel R, et al." — empty for web sources. */
  authors: string;
  /** Journal for papers, publisher for web sources. */
  container: string;
  year: string;
  url: string;
  pmid?: string;
  doi?: string;
  kind: "paper" | "web";
}

const CITE_RE = /<Cite\s+id="([^"]+)"\s*\/>/g;

let referenceCache: Record<string, ReferenceRecord> | null = null;

function references(): Record<string, ReferenceRecord> {
  if (!referenceCache) {
    const file = path.join(process.cwd(), "content/references.json");
    referenceCache = fs.existsSync(file)
      ? (JSON.parse(fs.readFileSync(file, "utf-8")) as Record<string, ReferenceRecord>)
      : {};
  }
  return referenceCache;
}

function authorLine(authors: string[]): string {
  if (authors.length === 0) return "";
  if (authors.length <= 3) return `${authors.join(", ")}.`;
  return `${authors.slice(0, 3).join(", ")}, et al.`;
}

function resolveOne(ref: SourceRef, number: number): ResolvedSource | null {
  const pmid = ref.pmid ? String(ref.pmid) : undefined;
  const doi = ref.doi ? String(ref.doi) : undefined;
  if (pmid || doi) {
    const record = references()[pmid ? `pmid:${pmid}` : `doi:${doi}`];
    if (!record) return null;
    return {
      id: ref.id,
      number,
      title: record.title,
      authors: authorLine(record.authors),
      container: record.journal,
      year: record.year,
      url: pmid ? `https://pubmed.ncbi.nlm.nih.gov/${pmid}/` : `https://doi.org/${doi}`,
      pmid,
      doi: record.doi ?? doi,
      kind: "paper",
    };
  }
  if (!ref.url || !ref.title) return null;
  return {
    id: ref.id,
    number,
    title: ref.title,
    authors: "",
    container: ref.publisher ?? "",
    year: ref.year ? String(ref.year) : "",
    url: ref.url,
    kind: "web",
  };
}

/** Sources in citation order, numbered from 1. */
export function resolveSources(content: string, refs: SourceRef[] | undefined): ResolvedSource[] {
  if (!refs?.length) return [];
  const byId = new Map(refs.map((r) => [r.id, r]));
  const order: string[] = [];
  for (const match of content.matchAll(CITE_RE)) {
    if (byId.has(match[1]) && !order.includes(match[1])) order.push(match[1]);
  }
  for (const ref of refs) if (!order.includes(ref.id)) order.push(ref.id);

  const resolved: ResolvedSource[] = [];
  for (const id of order) {
    const source = resolveOne(byId.get(id)!, resolved.length + 1);
    if (source) resolved.push(source);
  }
  return resolved;
}
