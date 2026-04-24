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
    title:
      "An epigenetic biomarker of aging for lifespan and healthspan (PhenoAge).",
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
    id: "ref-5",
    authors: "Taddei S. et al.",
    title:
      "Inflammation, oxidative stress, and endothelial dysfunction in cardiometabolic disease.",
    journal: "The Lancet",
    year: 2019,
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
    title:
      "Antiinflammatory therapy with canakinumab for atherosclerotic disease (CANTOS).",
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

export const ADVISORS: Advisor[] = [
  {
    name: "Dr. L. Marchetti",
    initials: "LM",
    credentials: "MD PhD",
    specialty: "Preventive cardiology",
    affiliation: "Clinical advisor · Merios",
    bio: "Twenty years in lipidology and early cardiovascular disease. Co-author of work on particle-number risk stratification and Apo-B-first screening.",
  },
  {
    name: "Dr. S. Ardent",
    initials: "SA",
    credentials: "MD PhD",
    specialty: "Endocrinology",
    affiliation: "Scientific advisor · Merios",
    bio: "Clinical endocrinologist with a research focus on insulin resistance, thyroid dynamics and longitudinal hormone reference intervals.",
  },
  {
    name: "Dr. E. Kohl",
    initials: "EK",
    credentials: "MD PhD",
    specialty: "Preventive medicine",
    affiliation: "Scientific advisor · Merios",
    bio: "Preventive medicine physician and biostatistician. Works on composite risk indices and the translation of trial data into consumer-grade scores.",
  },
];
