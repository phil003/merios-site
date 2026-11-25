# CLAUDE.md — merios-site

## Project

Marketing website for Merios (merios.life), a preventive health platform.
Stack: Next.js 16 (SSG + Edge Middleware on Vercel) + React 19 + Tailwind v4 + TypeScript strict.
All marketing routes are statically generated at build time; `src/middleware.ts`
handles geo-aware rewrites for `/early-access` (US vs. rest-of-world variants).
Deployed on Vercel.

## Product model (canonical — never conflate pillar and system)

**4 pillars** (composite health score):

1. Blood
2. Movement
3. Sleep
4. Stress

**11 blood biomarker systems** — sub-structure of the Blood pillar only,
card-level surface, no detail route:

1. Heart & Cardiovascular
2. Metabolism & Glucose
3. Inflammation & Immunity
4. Hematology
5. Liver
6. Kidney & Electrolytes
7. Hormonal
8. Thyroid
9. Vitamins & Minerals
10. Performance & Recovery
11. Autoimmune & Systemic

Code source of truth: `src/content/biomarkers.ts` (exports `PILLARS` +
`BLOOD_SYSTEMS`).

## Design direction (site v2 "Open Sky", live since 25 Nov 2026)

"Your health, finally readable." The art direction is a sunrise: haze reading
surfaces, dawn gradients, glass, ink. Approved mockup:
`../design/site-open-sky_2026-11-17/` (Desktop/Merios; its README explains every
page) and the canvas https://claude.ai/artifact/44jM6HErvUXqB1GXVStWrm. Brand art
direction: `../design/DA_MERIOS_v1.md`.

Page skeleton: dawn masthead (`var(--dawn)`) with the glass nav pill floating over
it → haze body (`--color-canvas`) → light lavender footer (`.v3-footer`).
`PageHero` keeps its `.v3-hero.night` classes, re-pointed in globals.css to the dawn
with ink text; the nav ignores `data-nav="dark"` on `.v3-hero` and only turns dark
over a real ink section.

- One ink block per screen at most (`.night`, #18213F, white text, lavender links);
  never stack ink sections.
- Apricot #FFA472 on one element per screen at most. No red anywhere: caution uses
  warm #A65A2C, peach or apricot.
- Headlines: Figtree 600, tight, the last words set in `<em>` / `.chrome-text`
  (Newsreader italic 300): "Your health, *finally readable.*" Every H2 has an
  eyebrow (`.label` + `.label-dot`) and its own italic human word.
- Cards: glass (white at 55%, 1.5px white border, radius 28px) or white (radius
  32px, soft navy shadow); inner plates radius 20px on soft dawn gradients.
- Visuals show the subject (Phil's rule): articles carry drawn covers
  (`src/lib/covers.ts`, `SPECS`), tools show their formula or factor
  (`src/components/calculators/tool-page/registry.ts`, `plate`). No mood photo on
  an article or a tool; photos and videos of real people are for the home page
  only. Illustrative visuals say so ("Example data", "Illustration"). App screens
  (example data): `public/images/v2/screens/`.

Primitives live in globals.css: `.night`, `.display`, `.chrome-text`, `.label` +
`.label-dot`, `.glass`, `.glass-light`, `.btn` with `.btn-ink` (ink pill),
`.btn-lime` (white pill on ink, ink pill inside a dawn hero), `.btn-ghost`,
`.btn-ghost-night`, `.pulse-rule`, `.editorial-prose`. The logo is
`src/components/ui/Logo.tsx` (never redraw it by hand).

## Typography

- Display, UI and labels: Figtree (`--font-display` / `--font-sans`). Headlines
  600 with tight tracking (-0.04em to -0.05em, `.display`). Labels and eyebrows:
  700, uppercase, 0.14em tracking (`.label`). `--font-mono` points to Figtree too.
- Newsreader (`--font-serif`): the italic human word that ends a headline (300,
  `.chrome-text`), numbers and big values (300–400), long reads.

Both via `next/font/google` in `src/app/layout.tsx`, both preloaded: the italic
word and the big numbers are often the LCP element. OG images (`src/lib/og.tsx`)
use the `@fontsource/figtree` .woff files, weights 600 and 700 (satori cannot read
woff2).

## Palette (tokens in globals.css)

- Ink #18213F (`--color-ink`, text on light; the ink block `.night`) · secondary
  #434B69 (AAA body text) · tertiary #5B627A (AA labels)
- Haze #EEF0FB (reading surface, `--color-canvas` / `--color-haze`) · cards #FFFFFF
  (`--color-canvas-alt`) · hairlines #DCDFEC (`--color-grid`)
- Zenith #6E8FE8 (data dots and bars, `--color-zenith` / `--color-pulse`) · sky
  #A8C2F4 (`--color-sky`; `--color-lime` is this sky, the signal on ink) · lavender
  #C9C0F6 (`--color-lavender`) · peach #FCD6C2 · apricot #FFA472
  (`--color-apricot`, once per screen)
- Link #3550A8 (`--color-link` / `--color-green-deep`): links, text accents, icons,
  the focus ring
- Caution: warm #A65A2C (`--color-warm`), for borderline values. Never red, never
  an alert.
- Pillar colours from the app: `--color-activity` #FFA472, `--color-recovery`
  #6E8FE8, `--color-zen` #9A8BEA.

The v3 token names (`--color-night`, `--color-fog`, `--color-lime`,
`--color-coral`, `--color-green-deep`, `--color-pulse`, …) are kept and remapped
to Open Sky values, so older components re-theme automatically. New code uses the
Open Sky names (`--color-haze`, `--color-zenith`, `--color-apricot`,
`--color-lavender`, `--color-link`).

## Motion

- CSS first: entrances above the fold use parse-time keyframes (`.he`, `.ph-char`,
  `.rd-word`) so LCP never waits for JavaScript; scroll reveals use `data-rv` /
  `<Reveal>` (inline IntersectionObserver in layout.tsx, zero bundle JS).
- The home page (`src/components/home/*`) has no scroll-driven scene: CSS plus
  small client components (`CountUp` is its only rAF handler). GSAP /
  ScrollTrigger only where a page really needs scrubbing (today the Science
  biomarker coverage, `src/components/science/BiomarkerCoverage.tsx`).
  `LenisProvider` loads Lenis, GSAP and ScrollTrigger with dynamic `import()`,
  desktop only (fine pointer, 768px and wider, no reduced motion). Motion
  (motion.dev) and framer-motion are not installed.
- Canonical easings: expo out [0.16, 1, 0.3, 1], smooth [0.22, 1, 0.36, 1]
  (`--ease-expo`, `--ease-smooth`).
- Durations: quick 300ms, normal 600ms, slow 1100ms (`--duration-*`). Never exceed
  1200ms.
- Always respect prefers-reduced-motion — disable Lenis, fade opacity only.

## Animation don'ts

- No bouncy easings (no `back.out`, `elastic.out`, `bounce.*`).
- No stagger > 100ms per element.
- No auto-playing video > 20 seconds.
- No parallax with intensity > 0.4.
- No cursor follower that tracks pixel-perfect (distracting).

## Performance budget

- Lighthouse mobile Performance >= 92
- LCP < 2.0s
- CLS < 0.05
- Initial JS < 180kb gzipped
- Images: AVIF primary, WebP fallback, JPEG last
- Videos: H.265 or AV1, max 1.5Mo each

## Accessibility

- WCAG AA minimum, AAA on body text contrast.
- Full keyboard navigation, visible focus rings (`--color-link` #3550A8, 2px,
  offset 3px; sky on ink blocks).
- Alt text 100% coverage.
- prefers-reduced-motion fully honored.

## Code conventions

- Components in `src/components/`, by area (`home/`, `blog/`, `blog-article/`,
  `calculators/` with the v2 tool template in `calculators/tool-page/`, `science/`,
  `legal/`, …) plus `ui/` and `providers/`.
- Easing and duration tokens live in globals.css (`--ease-*`, `--duration-*`).
- Lenis in `src/components/providers/LenisProvider.tsx`.
- Every section component receives its copy as props (no hardcoded text in components
  except headline primitives).
- TypeScript strict, no `any`, prefer discriminated unions for variants.

## Testing

- After each section redesign, run `npm run build` to ensure static export works.
- Playwright visual review: take desktop (1440px) + mobile (390px) screenshots
  of the section and confirm spacing/typography/contrast with the user before moving on.

## ⛔ Deploy rules (CRITICAL — do not break)

How production actually works (verified 23 Oct 2026):

- **Production is the branch `seo/site-indexing-2026-06-04`**, not `main`. The
  Vercel project `merios-site` (team `phil003s-projects`) deploys merios.life from
  it: every merge or push to that branch goes live within minutes.
- **`main` is frozen** (last commit 15 June 2026). Never branch from it, never open
  a PR against it, never push to it. Its copy of this file was out of date.
- Every other branch gets a Vercel **preview** deployment on push (GitHub status
  "Vercel – merios-site"). Previews are behind Vercel Authentication and are the
  place to check a change before it ships.

The workflow:

1. Branch from `origin/seo/site-indexing-2026-06-04`.
2. Run `npm ci && npm run build`. `prebuild` regenerates `public/sitemap.xml`
   (git-ignored) and runs `scripts/check-sources.mjs`, which fails the build on an
   unresolved citation. If the local build cannot run (the Cowork sandbox fails on
   `@next/swc`, scheduled tasks hit their shell time limit), the gate is the
   Vercel preview build plus its GitHub checks.
3. Push the branch and open a PR **into `seo/site-indexing-2026-06-04`**. Check
   the preview on the pages you changed.
4. **Who merges (Phil's decision, 4 Nov 2026).** The merge is the production deploy.
   - **SEO content publishes itself.** The daily "Merios SEO" task merges its own
     PR with `seo-autopilot/bin/github.py merge <n>`, which refuses unless the PR
     targets the production branch, is not a draft, is mergeable, its Vercel
     checks are green, and every file is inside the auto zone listed in
     `seo-autopilot/config.json` → `auto_merge.allowed` (articles, comparisons,
     references, calculators/tools, covers, sitemap generator) with none in
     `auto_merge.denied`. An independent fact-check must pass first.
   - **Everything else needs Phil's explicit go for that PR**: site code outside
     the tools, `next.config.ts`, packages, workflows, the home page, pricing,
     privacy/terms, this file. A PR waiting for Phil never blocks the SEO task:
     it keeps publishing from the production branch.

Never:

- push directly to `seo/site-indexing-2026-06-04`;
- run `vercel`, `vercel deploy` or `vercel --prod` from the command line — previews
  come from git pushes, production from the merge;
- change Vercel project settings (production branch, env vars, domains, git
  integration) without Phil.

Side effects to know about:

- A push to the production branch that touches `content/blog/**` or
  `content/compare/**` pings IndexNow (`.github/workflows/indexnow.yml`). If the
  production branch ever changes, update `branches` in that workflow at the same
  time, and this section.
- Retired URLs are 308s in `next.config.ts`. A redirected compare slug must also be
  listed in `REDIRECTED_SLUGS` (`src/lib/compare.ts`) and `REDIRECTED_COMPARE`
  (`scripts/generate-sitemap.mjs`), and nothing on the site may link to it.
- SEO cooldown: on a page whose title, meta or content changed in the last 21 days,
  fix broken rendering or a wrong fact only; leave the title, meta description and
  heading structure alone until the change has been measured.

## Brief reference

- Open Sky mockup (layout and look, page by page):
  `../design/site-open-sky_2026-11-17/` and its README, plus the canvas
  https://claude.ai/artifact/44jM6HErvUXqB1GXVStWrm.
- Brand art direction: `../design/DA_MERIOS_v1.md` (Desktop/Merios).
