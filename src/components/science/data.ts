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

export const CITATIONS: Citation[] = [
  {
    id: "ref-1",
    authors: "Rose G.",
    title: "Sick individuals and sick populations.",
    journal: "International Journal of Epidemiology",
    year: 1985,
  },
  {
    id: "ref-2",
    authors: "Sniderman A. D. et al.",
    title:
      "Apolipoprotein B particles and cardiovascular disease: a narrative review.",
    journal: "JAMA Cardiology",
    year: 2019,
  },
  {
    id: "ref-3",
    authors: "Levine M. E. et al.",
    title: "An epigenetic biomarker of aging for lifespan and healthspan.",
    journal: "Aging",
    year: 2018,
  },
  {
    id: "ref-4",
    authors: "Lauer M. S., D'Agostino R. B.",
    title:
      "The randomized registry trial — the next disruptive technology in clinical research?",
    journal: "New England Journal of Medicine",
    year: 2013,
  },
  {
    // The phenotypic-age formula behind the Merios PhenoAge estimate
    // (PubMed 30596641). It replaces a "Taddei S. et al., The Lancet, 2019"
    // entry that could not be found on PubMed or Crossref.
    id: "ref-5",
    authors: "Liu Z. et al.",
    title:
      "A new aging measure captures morbidity and mortality risk across diverse subpopulations from NHANES IV: a cohort study.",
    journal: "PLOS Medicine",
    year: 2018,
  },
  {
    id: "ref-6",
    authors: "Després J.-P.",
    title:
      "Body fat distribution and risk of cardiovascular disease: an update.",
    journal: "Circulation",
    year: 2012,
  },
  {
    id: "ref-7",
    authors: "Horvath S.",
    title: "DNA methylation age of human tissues and cell types.",
    journal: "Genome Biology",
    year: 2013,
  },
  {
    id: "ref-8",
    authors: "Ridker P. M. et al.",
    title: "Antiinflammatory therapy with canakinumab for atherosclerotic disease.",
    journal: "New England Journal of Medicine",
    year: 2017,
  },
];

export type Advisor = {
  name: string;
  initials: string;
  credentials: string;
  specialty: string;
  affiliation: string;
  bio: string;
};

// Clinical advisory engagement is open pre-launch. Rather than listing
// fictional advisors, we surface one honest card describing the open
// engagement. Replace this with named advisors as they are signed in.
export const ADVISORS: Advisor[] = [
  {
    name: "Clinical reviewers",
    initials: "CR",
    credentials: "seats open",
    specialty: "Recruiting — 2026",
    affiliation: "Merios",
    bio: "We're looking for practising clinicians and researchers to review Merios's scoring rules, reference intervals and methodology. Their names and the date of each review will be published here once a review is done.",
  },
];
