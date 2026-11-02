# AGENTS.md

Canonical instructions for any coding agent working in this repository (Codex, Claude Code and
compatible tools). `CLAUDE.md` only adds Claude-specific workflow on top of this file.

## Mandatory before any visual change

> **Before implementing or modifying a visual section, read [`references.md`](references.md) and
> [`docs/ART_DIRECTION.md`](docs/ART_DIRECTION.md), identify that section's approved references
> and its contract in [`docs/INFORMATION_ARCHITECTURE.md`](docs/INFORMATION_ARCHITECTURE.md) §3,
> and apply the established design tokens and the motion language in
> [`docs/MOTION_SYSTEM.md`](docs/MOTION_SYSTEM.md).**
>
> No section may introduce a completely unrelated visual theme, font, palette or effect without
> documenting and justifying the decision in `docs/ART_DIRECTION.md` first.

## 1. Project

Personal portfolio of **Jorge Arcas**, a Spanish freelance full-stack developer.
Live domain: `https://portfolio.jarcas.dev` (GitHub Pages). Repo: `J0rgw/portfoliov3`.

Goals, in order: win freelance projects (custom websites, web apps, automation and CRM
integration, frontend engineering), prove engineering ability through real case studies, show
design sensitivity, and introduce an upcoming React component library without distracting from
the services.

Audiences: prospective clients first, then technical recruiters and collaborators, then
design-minded visitors.

## 2. Creative identity

**"The Digital Archive, 1998–2004": a portfolio experienced like an album.** Catalog number
`JRG-003` (his third portfolio). Compact discs, jewel cases, booklets, credits, burned CD-Rs
labelled with a marker. A cultural reference, not a retro OS simulator. Contemporary, editorial,
engineered. The visitor must understand the professional offer before the metaphor.
Full rules: `docs/ART_DIRECTION.md`.

## 3. Storytelling architecture

Home chapters, in order: 00 Cover (hero) → 01 Projects → 02 Liner notes (process) → 03 Services →
04 About (credits) → 05 Bonus track (component library) → 06 Back cover (contact).
Case studies live at `/proyectos/<slug>/`, the index at `/proyectos/`.
Each chapter has a contract (purpose, content, references, motion, responsive, SEO,
accessibility, conversion) in `docs/INFORMATION_ARCHITECTURE.md` §3. Keep it when you edit.

## 4. Stack

Vite 7 · React 19 · TypeScript 5 (strict) · plain CSS with custom properties · GSAP (menu
only) · reicon icons. Static prerendering (SSG) with `react-dom/server`,
multi-page navigation, cross-document View Transitions. No router, no CSS framework, no WebGL.

## 5. Repository map

```
src/
  entry-client.tsx     hydrate or render the page for the current path
  entry-server.tsx     render(url) → { html, head, status } for the prerenderer
  App.tsx              page switch
  routes.ts            route table + head metadata
  content/             ALL copy and data (Spanish), typed in content/types.ts
  styles/              design system: tokens, fonts, base, layout, motion, utilities
  motion/              RevealController, useScrollScene, useSpin, useScrollSpy, useReducedMotion,
                       useDiscCarousel (drag, inertia, snap),
                       gsap.ts (GSAP is loaded on demand, never imported statically)
  seo/                 head tags, JSON-LD builders, OgCard (social preview cards)
  components/          primitives and objects (Button, Disc, CoverArt, CreditsTable,
                       ChapterHeading, MarkerArrow, Monogram, SiteHeader, SiteFooter,
                       StaggeredMenu, LogoLoop, ProfileCard, Icon)
  sections/            home chapters (Hero, Projects, LinerNotes, Services, About,
                       BonusTrack, Contact)
  pages/               HomePage, ProjectsIndexPage, ProjectPage, NotFoundPage
scripts/
  check-assets.mjs     fail if a referenced /images or /fonts file is missing
  prerender.mjs        write dist/<route>/index.html, 404.html, sitemap.xml
  check-seo.mjs        fail if a page lacks title, description, canonical, OG, lang or one h1
  generate-og.mjs      `npm run og`: render the 1200×630 social cards (needs playwright-core)
  generate-hero-film.py  the hero's plastic film (Python + Pillow/NumPy, run by hand, not in the build)
public/                fonts (WOFF2 + licences), images, robots.txt
docs/                  ART_DIRECTION, INFORMATION_ARCHITECTURE, MOTION_SYSTEM,
                       IMPLEMENTATION_PLAN, history/
references.md          visual research matrix
```

## 6. Component design rules

- Copy and data come from `src/content/`; components receive data, they do not hard-code it.
- Reuse before creating: `Button`, `ChapterHeading`, `CreditsTable`, `Disc`, `CoverArt`,
  `Picture`. A new component must represent a stable visual or functional pattern, not just JSX.
- Styles use tokens from `src/styles/tokens.css`. No raw hex colours, ad hoc font sizes,
  shadows, durations or z-indexes in component CSS. If a token is missing, add it to
  `tokens.css` and document it in `docs/ART_DIRECTION.md`.
- One CSS file per component or section, BEM-like class names (`block__element--modifier`).
- Rendering must be deterministic for SSR: no `window`, `document`, `Date.now()` or
  `Math.random()` during render. Browser-only work goes in effects.
- Semantic HTML first: landmarks, one `h1` per page, real buttons and links, lists for lists.

## 7. Visual consistency rules

- Fonts: Estrella (handwriting, display only, letters without accents or punctuation, ≥ 40 px),
  Poppins 400/600/700/800 (everything structural), system mono (catalog numbers, credits, code),
  Bodoni Moda 400 (`--font-serif`: project titles in the Projects gallery only, ART_DIRECTION §3.2).
- Light paper ground; ink text; accent `#1B62AE` for links and focus; brand blue `#409FEA` is
  decorative only (2.5:1, never text). Night ground only for the back cover.
- Depth (shadows) belongs to physical objects only; interface stays flat with hairlines.
- Iridescence is a material on objects, never a page background and never self-animating.
- Music vocabulary only in kickers and microcopy; headings stay literal Spanish.

## 8. Motion architecture

Levels: 1 identity (hero, page morph), 2 narrative (reveals, scroll-spy), 3 interface (menu,
rows, buttons). Transform and opacity only. Nothing loops forever or while off-screen; the one
exception is the hero disc's slow turn, which pauses off-screen and has a pause control
(`docs/MOTION_SYSTEM.md` §2.1). Every primitive honours `prefers-reduced-motion` itself. Use the primitives in `src/motion/` and the
tokens; new libraries need a measured justification in `docs/MOTION_SYSTEM.md`. No scroll
hijacking, no mandatory intro, no content hidden until an animation finishes.

## 9. Accessibility (WCAG 2.2 AA)

Contrast ≥ 4.5:1 for text (≥ 3:1 for large text and UI). Visible focus everywhere. Keyboard and
touch equivalents for every hover. Targets ≥ 44 px where possible (24 px minimum). The menu is a
modal dialog (focus in, contained Tab, Escape, focus return, `inert` when closed). Decorative
objects are `aria-hidden`. Reduced motion and JavaScript-off give the same information.

## 10. SEO

Every page: unique title and description, canonical (`https://portfolio.jarcas.dev/...`, trailing
slash), Open Graph and Twitter tags, `lang="es"`, exactly one `h1`, crawlable text and links,
JSON-LD from verified facts only. New routes must be added to `src/routes.ts` so they are
prerendered and listed in the sitemap. `scripts/check-seo.mjs` enforces the basics.

## 11. Performance

Budget in `docs/IMPLEMENTATION_PLAN.md` §3. WOFF2 fonts only, preload the critical ones. Images
in WebP with explicit dimensions and lazy loading below the fold. No WebGL. Check the gzip sizes
printed by `npm run build` against the budget when you add dependencies or media.

## 12. Content authenticity (non-negotiable)

Never invent clients, results, metrics, quotes, awards, dates, roles or biography. Every claim
must trace to the register in `docs/INFORMATION_ARCHITECTURE.md` §6; add a row when you add a
claim. Distinguish product, internal tool, team, personal and academic work accurately. Unknowns
go to "Open questions" in `docs/IMPLEMENTATION_PLAN.md`, not onto the site. Mathgeon is a
two-person project; describe only Jorge's share.

## 13. Coding conventions

TypeScript strict, no `any` in new code. Functional components and hooks. Comments explain *why*,
not what. English for code and docs, Spanish (Spain) for site copy. Keep diffs focused; do not
reformat unrelated code. Do not commit, push or deploy unless asked.

## 14. Documentation maintenance

- One source of truth per topic: visuals → `docs/ART_DIRECTION.md`; references →
  `references.md`; structure, content and SEO → `docs/INFORMATION_ARCHITECTURE.md`; motion →
  `docs/MOTION_SYSTEM.md`; status, budget and open questions → `docs/IMPLEMENTATION_PLAN.md`.
- When you implement or change something a document describes, update that document in the same
  change (including the reference matrix status column).
- Do not create new top-level docs that duplicate these.

## 15. Quality checks before declaring work complete

1. `npm run typecheck`
2. `npm run build` (runs the asset check, type check, client and SSR builds, prerender and SEO
   check). It must pass.
3. `npm run preview` and inspect the changed pages at 390, 768, 1024 and 1440 px.
4. Check with JavaScript disabled and with reduced motion for any section you touched.
5. Keyboard pass: Tab order, visible focus, menu open/close with Escape.
6. No console errors; no horizontal overflow on mobile.
7. If a project's title, tagline or cover changed: `npm run og`, then rebuild.
8. Update the docs listed in §14.
