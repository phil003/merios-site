/**
 * Science — shared data for /science.
 *
 * Kept in a plain (non-"use client") module so that both client components
 * (Citations.tsx, AdvisoryBoard.tsx) and the server page (page.tsx JSON-LD)
 * can import the arrays directly. A "use client" module would otherwise
 * turn these named exports into opaque client references, breaking the
 * server-side JSON-LD generation.
 */

export type Citation = {
  id: string;
  authors: string;
  title: string;
  journal: string;
  year: number;
  doi?: string;
};

// Numbered in the order the page first cites them (Thesis, then Biological
// age), and every entry is cited at least once: ref-N is the Nth entry, and
// the superscripts in Thesis.tsx and BioAge.tsx point to these ids. Checked
// against PubMed / Europe PMC on Nov 26, 2026. Removed then: Lauer &
// D'Agostino 2013 (registry trials, unrelated to biomarkers) and Ridker 2017
// (CANTOS; the page makes no claim about inflammation it could support).
export const CITATIONS: Citation[] = [
  {
    // "A normal LDL with a high Apo-B is not normal" (Thesis).
    id: "ref-1",
    authors: "Sniderman A. D. et al.",
    title:
      "Apolipoprotein B particles and cardiovascular disease: a narrative review.",
    journal: "JAMA Cardiology",
    year: 2019,
    doi: "10.1001/jamacardio.2019.3780",
  },
  {
    // Reference intervals drawn from a population that is itself unwell.
    id: "ref-2",
    authors: "Rose G.",
    title: "Sick individuals and sick populations.",
    journal: "International Journal of Epidemiology",
    year: 1985,
    doi: "10.1093/ije/14.1.32",
  },
  {
    // Biological age from a composite: 353 CpG sites, one clock.
    id: "ref-3",
    authors: "Horvath S.",
    title: "DNA methylation age of human tissues and cell types.",
    journal: "Genome Biology",
    year: 2013,
    doi: "10.1186/gb-2013-14-10-r115",
  },
  {
    // Phenotypic age, a composite of clinical markers (Thesis, Biological age).
    id: "ref-4",
    authors: "Levine M. E. et al.",
    title: "An epigenetic biomarker of aging for lifespan and healthspan.",
    journal: "Aging",
    year: 2018,
    doi: "10.18632/aging.101414",
  },
  {
    // The phenotypic-age formula behind the Merios PhenoAge estimate
    // (PubMed 30596641): age plus 9 multi-system clinical markers. It
    // replaced a "Taddei S. et al., The Lancet, 2019" entry that could not
    // be found on PubMed or Crossref.
    id: "ref-5",
    authors: "Liu Z. et al.",
    title:
      "A new aging measure captures morbidity and mortality risk across diverse subpopulations from NHANES IV: a cohort study.",
    journal: "PLOS Medicine",
    year: 2018,
    doi: "10.1371/journal.pmed.1002718",
  },
  {
    // Cardiometabolic risk refined beyond one number (BMI) by body fat
    // distribution (Thesis, "cardiometabolic risk stratification").
    id: "ref-6",
    authors: "Després J.-P.",
    title:
      "Body fat distribution and risk of cardiovascular disease: an update.",
    journal: "Circulation",
    year: 2012,
    doi: "10.1161/CIRCULATIONAHA.111.067264",
  },
];

export type Advisor = {
  name: string;
  initials: string;
  credentials: string;
  specialty: string;
  /** A reviewer's institution, once one is named. */
  affiliation?: string;
  bio: string;
};

// No clinician has reviewed Merios yet. Rather than listing fictional
// advisors, one honest card describes the open seats; the section lead says
// where the review stands. Replace it with named reviewers only once a review
// is actually done.
export const ADVISORS: Advisor[] = [
  {
    name: "Clinical reviewers",
    initials: "CR",
    credentials: "seats open",
    specialty: "Recruiting",
    bio: "We're looking for practicing clinicians and researchers to review Merios's scoring rules, reference intervals and methodology. Each reviewer's name and the date of the review will be published here.",
  },
];
