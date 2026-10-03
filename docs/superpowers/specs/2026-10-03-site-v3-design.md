# merios.life v3 — "Your health, finally readable." (design spec)

Status: approved by Phil on 2026-10-03 (mockup v3, "piste A — la ligne"). Mockup source:
`Desktop/Merios/design/site-v3_2026-10-03/` · live mockup: https://claude.ai/artifact/BBQLhZRi4PrgnvmED7jzGU

Branch: `redesign/v3-finally-readable`, cut from the production branch `seo/site-indexing-2026-06-04` (`c50962d`).

## 1. What changes, what never changes

**Phil's rule: we change the theme, not the content.** Every page, article, tool and comparison keeps
its URL, its text and everything Google reads.

Never change (every agent, every file):
- URLs, routes, redirects, `next.config.ts`, `middleware.ts`, `scripts/generate-sitemap.mjs`, `public/robots.txt`.
- `generateMetadata` / `metadata` exports: title, description, canonical, openGraph, twitter, robots.
- JSON-LD: `src/components/StructuredData.tsx` and every `<…Schema>` call site and its props.
- Visible text: headings (text **and** level), paragraphs, list items, FAQ questions/answers, table
  contents, button/link labels, alt text, aria labels. MDX files in `content/` are not touched.
- Link targets (`href`) and the set of internal links on a page. Do not remove a link; do not add
  links to new destinations.
- Behaviour: forms (contact, newsletter/Substack, early-access), calculators' maths and validation,
  geo variants of `/early-access`, analytics.

Allowed (presentation only): fonts, sizes, weights, colours, spacing, radii, borders, shadows,
backgrounds, layout/grid, decorative SVG (aria-hidden), CSS animation, wrapping elements for layout.

The only copy edits in this redesign are factual corrections approved by Phil on 2026-10-03, done
centrally (not by page agents): "Merios Pro" → "Merios Plus", the free tier exists, pricing facts.

Verification: `scratchpad/seo/snapshot.mjs` captures per URL status, title, description, canonical,
robots, OG/Twitter, H1/H2 text, JSON-LD, internal links and word count. Baseline = production build
before the redesign (145 URLs). The redesign must diff to zero except the intended homepage body and
the approved factual edits.

## 2. Art direction

Motion · Chrome × pop — the organic ads and App Store v2. Night graphite stages lit like chrome, lime
as the only signal colour, lilac / sky / peach as pop accents, fog as the reading surface.

### Tokens (globals.css `@theme`; legacy names kept so components re-theme)

| Token | Value | Use |
|---|---|---|
| `--color-night` / `-2` / `-3` | #090C0E / #12171B / #1A2126 | night stages (use the `.night` class) |
| `--color-ink` | #10231A | text on light (14.3:1 on fog) |
| `--color-ink-secondary` | #3E4C44 | body text (8.0:1, AAA) |
| `--color-ink-tertiary` | #5B6760 | labels, meta (5.2:1, AA) |
| `--color-canvas` (fog) | #EFF1EC | page background on reading pages |
| `--color-canvas-alt` | #FFFFFF | cards, paper |
| `--color-grid` | #D9DED4 | hairlines on fog |
| `--color-green-deep` (forest) | #24503A | text accents, icons, "in range" |
| `--color-pulse` / `--color-lime` | #D6F050 | dots, bars, highlights, primary CTA |
| `--color-lime-deep` | #5E7400 | lime-family text on light (rare) |
| `--color-lilac` / `--color-sky` / `--color-peach` | #C9B8FF / #A9D4FF / #FFB39A | pop accents, chips, covers |
| `--color-coral` | #FF5A3C | a lab's own H/L flags only |
| `--color-soft-alert` | #A45B3C | "outside your range" — never an alert red |
| `--color-accent-warm` / `--color-warm` | #B9762C | borderline / caution |
| `--color-on-night` / `-2` / `-3` | #F4F6F7 / 68% / 46% | text on night |
| `--color-line-night` | white 14% | hairlines on night |

Rules: lime is never body text on light backgrounds (use it as a fill, an underline, a dot). Coral is
only a lab's flag. "Outside your range" uses soft-alert. Night sections carry `data-nav="dark"` so the
floating nav turns dark over them.

### Typography

| Role | Family | Typical setting |
|---|---|---|
| Display (H1, section titles) | `var(--font-display)` Bricolage Grotesque | weight 740–760, `letter-spacing: -0.035em…-0.045em`, line-height 0.93–1.05, `text-wrap: balance` — or the `.display` class |
| UI + body copy | `var(--font-sans)` Bricolage Grotesque | 15–20px, weight 400–650 |
| Long reads, numerals, quotes, wordmark | `var(--font-serif)` Newsreader | article body 19px/1.66 (via `.editorial-prose`); big numbers weight 500, `letter-spacing: -0.02em` |
| Data, labels, eyebrows, lab values | `var(--font-mono)` IBM Plex Mono | 11–12px, 500–600, uppercase, `letter-spacing: 0.12–0.16em` |
| Rare hand annotations | `var(--font-hand)` Caveat | 700, 1.5–2rem, slight rotation |

Former usage `fontFamily: var(--font-serif)` with `fontWeight: 300/400` for headings must become
display: `fontFamily: "var(--font-display)", fontWeight: 740` (H2) / 760 (H1) with tight tracking.
Keep Newsreader for numbers/stat values and pull quotes.

### Primitives (globals.css)

- `.night` — night stage background + grain; text becomes `--color-on-night`. Add `data-nav="dark"`.
- `.display` — display headline setting. `.chrome-text` (gradient text on night), `.chrome-ink-text`.
- `.label` + `<span className="label-dot" />` — mono eyebrow with a lime dot (on light use
  `label-dot label-dot--ink`, violet, or keep lime with an ink ring).
- `.btn` + `.btn-lime` (primary, on night or light) / `.btn-ink` (primary on light) / `.btn-ghost`
  (secondary on light) / `.btn-ghost-night` (secondary on night). Arrow child: `.btn-arrow`.
- `.glass` (on night) / `.glass-light` (on light) — frosted cards.
- `.pulse-rule` — the logo heartbeat as a divider (160×28).
- `.editorial-prose` — long-read typography (Newsreader body, Bricolage headings, lime bullets, mono
  ordered counters, lab-report tables, heartbeat `<hr>`).
- `Logo` / `Mark` (`src/components/ui/Logo.tsx`) — the logo; never redraw it by hand.
- `PageHero` — night masthead (eyebrow, char-reveal H1, subline, heartbeat horizon). Server component.

### Patterns

- **Page skeleton**: night masthead (`PageHero` or an article hero) → fog body → night footer.
- **Cards**: white `#FFFFFF`, `border: 1px solid var(--color-grid)`, radius 20–28px, shadow only on
  hover (`0 26px 50px -24px rgb(16 35 26 / 0.4)`), lift 4px on hover. Pop variants: solid lilac / sky /
  peach / lime surfaces with ink text (used for covers, stickers, highlights) — sparingly.
- **Section heading**: `.label` eyebrow → display H2 (`clamp(2.1rem, 1.1rem + 3vw, 4rem)`, 740) →
  lead paragraph (`--text-body-l`, ink-secondary, max ~34em).
- **Stats**: value in Newsreader 500 (big), caption in mono uppercase.
- **Chips / pills**: mono 11–12px uppercase, `border: 1.5px solid currentColor` or filled, radius 999px.
- **CTA band**: `.night` section with display headline and `.btn-lime`.
- **Status**: in range = forest; borderline = warm; outside = soft-alert; never pure red.
- **Tables / lab values**: mono for values and units, tabular numbers.

### Motion

- CSS first. Above-the-fold elements animate with CSS keyframes that start at parse time (`.he`,
  `.ph-char`, `.rd-word`); never leave LCP text at `opacity: 0` waiting for JavaScript.
- Scroll reveals: `data-rv` / `<Reveal>` (inline IntersectionObserver, zero bundle JS).
- GSAP / ScrollTrigger / Lenis only where a scene needs scroll scrubbing (homepage), loaded with
  dynamic `import()`; Lenis stays desktop-only (LenisProvider).
- Easing: expo out `cubic-bezier(0.16,1,0.3,1)` / smooth `cubic-bezier(0.22,1,0.36,1)`; ≤ 1.2s; no
  bounce/elastic; stagger ≤ 100ms. `prefers-reduced-motion` honoured everywhere.

### Performance & accessibility budget (unchanged)

Lighthouse mobile ≥ 92, LCP < 2.0s, CLS < 0.05, initial JS < 180 kB gz. WCAG AA (AAA body text),
visible focus (`:focus-visible` 2px ink / lime on night), keyboard reachable, alt text kept.

## 3. Homepage

Ported from the approved mockup (piste A) into `src/components/home/*` (CSS in `home.css`, every
selector prefixed `hv3-`), composed by `src/app/page.tsx`:

| Section | Component | Ground | Notes |
|---|---|---|---|
| Hero "Your health, finally readable." | `Hero` (server) | night | H1 paints at parse (`.rd-word`); CTA → /early-access |
| Overture: the pulse line becomes the year | `Overture` (client) | night | fixed SVG, one rAF scroll handler, three H2 captions |
| Lab report translator | `Translator` (client) | lime | example report, keyboard + hover, autoplay while in view |
| 5 PDFs → one place, scan tour | `Scan` (client) | mist | sticky before/after, 4 steps, real app screens (next/image) |
| The year in 365 dots | `Year` (client) | night | canvas, redrawn on scroll only |
| Daily rings + Merios Score | `Daily` (server) | lilac | rings fill on reveal (CSS) |
| Then your blood joins in | `LinkSection` (server) | night | chart computed at build, wide/narrow variants |
| Free vs Plus | `Plans` (server) | fog | facts in §1 |
| Private by design | `Private` (server) | fog | 4 facts from privacy policy v2.0.0 |
| Journal + free tools | `Learn` (server) | fog | 3 latest posts (`getAllPosts`), 8 calculators |
| Finale + waitlist | `Finale` + `WaitlistForm` | night | App Store link, QR, the pre-redesign waitlist form (same Supabase table and messages) |

The colour stage (`HomeStage`) crossfades fixed layers when a section crosses the viewport's centre
line; content that would sit on the wrong ground fades out with the crossfade, so every scene
stays readable during hand-overs. No GSAP on the homepage. Reduced motion: line static, captions
fade only, no tilt, no autoplay.

Homepage metadata and JSON-LD stay as they are. Internal links: every pre-redesign link is kept;
8 calculator links are added.

### Factual corrections (approved 2026-10-03)

- "Merios Pro" → "Merios Plus" everywhere (JSON-LD Offer, FAQ, 7 comparison pages, 1 blog post).
- The free tier exists: FAQ "How much does Merios cost?" rewritten (free daily side, what Plus
  adds, $44.00/year with a 7-day trial, monthly and weekly options); "no free ad-supported tier"
  removed.
- `/compare/merios-vs-insidetracker` FAQ quoted "$14.99 per month (~$180 per year)": now $44/year.
- `/blog/best-blood-test-tracking-apps`: "free during early access" (×3), "Biological age:
  Planned", "Free tier: Early access" corrected.

## 4. Work split

- Foundation (globals.css, layout fonts, Logo, Navbar, Footer, PageHero, LegalPageLayout,
  EditorialProse) — done first, owned by the lead.
- Blog: index, category, article template, MDX components, covers, OG images (`src/lib/og.tsx`,
  `src/app/blog/[slug]/opengraph-image.tsx`, `src/app/compare/[slug]/opengraph-image.tsx`).
- Compare: index, cards, article template.
- Tools: index, 11 tool pages, `src/components/calculators/*`.
- Static pages: how-it-works, science, about, faq, contact, privacy/terms/security bodies,
  early-access variants, not-found.
- Homepage + factual corrections + QA (SEO diff, screenshots 1440/390, axe, Lighthouse) — lead.

## 5. QA gates before publishing

1. `npm run build` passes; `npx tsc --noEmit` clean.
2. SEO diff vs baseline: zero unintended changes (status, titles, descriptions, canonicals, robots,
   H1s, JSON-LD, internal links), sitemap unchanged.
3. Screenshots of every page family at 1440 and 390; no horizontal overflow; no console errors.
4. axe: no new serious/critical issues. Lighthouse mobile on home, one article, one tool.
5. Publish only after Phil's explicit "go" on the exact push commands (merios-site/CLAUDE.md).
