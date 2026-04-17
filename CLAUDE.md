# CLAUDE.md — merios-site

## Project

Marketing website for Merios (merios.life), a premium health intelligence platform.
Stack: Next.js 16 (SSG + Edge Middleware on Vercel) + React 19 + Tailwind v4 + TypeScript strict.
All marketing routes are statically generated at build time; `src/middleware.ts`
handles geo-aware rewrites for `/early-access` (US vs. rest-of-world variants).
Deployed on Vercel.

## Design direction

Premium editorial biotech. Intersection of hundred.com (polish, minimalism) and
Oura/Whoop (data-forward, clinical precision). Calm authority, not warm wellness.

## Typography

- Display: Fraunces (variable, opsz+soft axes) via Google Fonts
- Sans: Inter Tight via Google Fonts
- Mono: JetBrains Mono via Google Fonts

Never use Inter, Roboto, Arial, Space Grotesk alone for display — they're banned
by the frontend-design skill rules and are overused.

## Palette (tokens in globals.css)

- Ink: #0E1412 (primary text, dominant)
- Canvas: #F7F5EF (dominant background)
- Green deep: #1E3D2A (CTA, accents)
- Pulse: #9FBF00 (data indicators, sparks)
- Warm: #C4882F (alerts)
- Grid: #E8E3D6 (dividers)

## Motion

- Use GSAP + ScrollTrigger for scroll-driven cinematic effects (pinning, scrub,
  stagger reveals).
- Use Lenis for smooth scroll globally (wrap in LenisProvider, sync with GSAP).
- Use Motion (motion.dev) for React component micro-interactions.
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

- NEVER push to `main` during this redesign — the production site merios.life
  is served from `main` and must remain untouched until the user validates
  the full refresh.
- NEVER run `vercel --prod` or any production deployment command.
- NEVER modify Vercel production settings (env vars, domains, git integration).
- ALWAYS work on the branch `redesign/premium-v2`.
- ALWAYS test via `npm run dev` on http://localhost:3000 and show Playwright
  screenshots of localhost to the user.
- Preview deploys on Vercel are allowed ONLY when the user explicitly asks
  ("deploy a preview so I can test on my phone"). Use `vercel deploy` without
  `--prod` — this creates a unique non-indexed preview URL.
- If a git push to `origin redesign/premium-v2` is needed (e.g. to share the
  branch), confirm with the user first. By default, keep the work 100% local
  until the user asks to push.
- Before any deploy or push action, output a clear confirmation request like:
  "⚠️ About to run `<command>`. This will <effect>. Confirm?" and wait for
  explicit approval.

## Brief reference

Master redesign brief: `../MERIOS_REDESIGN_BRIEF.md` (in Desktop/Merios folder)
Assets prompts: `../MERIOS_ASSETS_PROMPTS.md`
