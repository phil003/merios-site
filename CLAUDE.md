# CLAUDE.md — merios-site

## Project

Marketing website for Merios (merios.life), a premium health intelligence platform.
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

## Design direction (site v3, October 2026)

"Your health, finally readable." Motion · Chrome × pop — the art direction of the
organic ads and App Store v2. Night graphite stages lit like chrome, lime as the only
signal colour, lilac / sky / peach as pop accents, fog as the reading surface.
Full spec: `docs/superpowers/specs/2026-10-03-site-v3-design.md`. Approved mockup:
`../design/site-v3_2026-10-03/` (Desktop/Merios).

Page skeleton: night masthead (`PageHero` or an article hero, `data-nav="dark"`) →
fog body → night footer. Primitives live in globals.css (`.night`, `.display`,
`.label` + `.label-dot`, `.btn-lime/-ink/-ghost/-ghost-night`, `.glass`,
`.glass-light`, `.pulse-rule`, `.editorial-prose`); the logo is `src/components/ui/Logo.tsx`
(never redraw it by hand).

## Typography

- Display + UI: Bricolage Grotesque (`--font-display` / `--font-sans`), 740–760 for
  headlines, tight tracking (-0.035em…-0.045em)
- Long reads, numerals, pull quotes, wordmark: Newsreader (`--font-serif`)
- Data, labels, eyebrows, lab values: IBM Plex Mono (`--font-mono`)
- Rare hand annotations: Caveat (`--font-hand`)

All via `next/font/google` in `src/app/layout.tsx`. OG images use the
`@fontsource/*` .woff files (satori cannot read woff2).

## Palette (tokens in globals.css)

- Night: #090C0E / #12171B / #1A2126 (night stages — use `.night`)
- Fog: #EFF1EC (reading surface, `--color-canvas`) · Paper/cards: #FFFFFF
- Ink: #10231A (text on light) · secondary #3E4C44 (AAA) · tertiary #5B6760
- Lime: #D6F050 (the only signal colour: dots, bars, highlights, primary CTA —
  never body text on light; use #5E7400 for lime-family text)
- Pop accents: lilac #C9B8FF · sky #A9D4FF · peach #FFB39A
- Forest: #24503A ("in range", icons) · soft alert: #A45B3C ("outside your range",
  never an alert red) · warm: #B9762C (borderline)
- Coral: #FF5A3C — only for a lab's own H/L flags
- Grid: #D9DED4 (hairlines on fog)

Legacy token names (`--color-green-deep`, `--color-pulse`, `--color-canvas`, …) are
remapped to the v3 values, so older components re-theme automatically.

## Motion

- CSS first: entrances above the fold use parse-time keyframes (`.he`, `.ph-char`,
  `.rd-word`) so LCP never waits for JavaScript; scroll reveals use `data-rv` /
  `<Reveal>` (inline IntersectionObserver, zero bundle JS).
- The homepage scenes (`src/components/home/*`) are scroll-driven with small
  rAF-throttled handlers — no GSAP. GSAP / ScrollTrigger only where a page really
  needs scrubbing, loaded with dynamic `import()`. Lenis stays desktop-only
  (LenisProvider).
- Canonical easings: expo out [0.16, 1, 0.3, 1], smooth [0.22, 1, 0.36, 1].
- Durations: quick 300ms, normal 600ms, slow 1100ms. Never exceed 1200ms.
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
- Full keyboard navigation, visible focus rings (green-deep 2px offset).
- Alt text 100% coverage.
- prefers-reduced-motion fully honored.

## Code conventions

- Components in `src/components/`, organized by type: `ui/`, `sections/`, `providers/`.
- Motion primitives in `src/lib/motion.ts`.
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
4. **Only Phil merges**, or a session acting on his explicit go for that PR. The
   merge is the production deploy. Automated tasks (the daily "Merios SEO" task)
   deliver a branch and a PR and never merge.

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

Master redesign brief: `../MERIOS_REDESIGN_BRIEF.md` (in Desktop/Merios folder)
Assets prompts: `../MERIOS_ASSETS_PROMPTS.md`
