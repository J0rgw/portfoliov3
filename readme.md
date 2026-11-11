# Portfolio V3 JRG-003

Portfolio of **Jorge Arcas**, freelance full-stack developer, designed as an album: each chapter a
track, each project a release with its own cover, credits and liner notes.

- Domain: [portfolio.jarcas.dev](https://portfolio.jarcas.dev), deployed from this repository by
  `.github/workflows/deploy.yml` since 2026-11-11 (v2 remains at `j0rgw.github.io/portfoliov2`).
- Language: Spanish (Spain).

## Stack

Vite 7 · React 19 · TypeScript (strict) · plain CSS with design tokens · GSAP (loaded on demand)
· [reicon](https://reicon.dev) icons. Every route is **prerendered to static HTML** at build time
and hydrated in the browser: the content is readable without JavaScript and every project has its
own indexable URL.

## Scripts

```bash
npm install
npm run dev          # development server (client-side render)
npm run build        # asset check → types → client + SSR builds → prerender → SEO check
npm run preview      # serve dist/ locally
npm run og           # regenerate social cards (needs: npm i --no-save playwright-core)
node scripts/generate-theme-variants.mjs   # dark-theme variants of the blue raster art (same need)
uv run scripts/extract-cutouts.py          # key Jorge's cut-outs (private/originals/assets/) into public/images/cutouts/
uv run scripts/generate-disc-finish.py     # the printed discs' real hub, rim and wear (public/images/disc/)
```

`npm run build` fails if a referenced image or font is missing, or if any page lacks a title,
description, canonical URL, Open Graph image, `lang` or exactly one `h1`.

`public/` holds only what the built site requests, plus licence notices. The originals the
regeneration scripts read live in `private/originals/`, retired images in `private/unused/`;
both are git-ignored and never served.

## Deploy

`.github/workflows/deploy.yml` runs `npm ci` and `npm run build` on every push to `main` and
publishes `dist/` to GitHub Pages. The custom domain is set in the repository's Pages settings.

## Where things live

```text
src/
  config/        site, hero, contact, navigation, projects, about, process, services,
                 library, seo, assets, packaging, ui, types
  design/        tokens.css, typography.css, base/layout/motion.css, motion.ts,
                 discPose.ts, themes/, components/, sections/, pages/, seo/
  components/
    ui/          Button, Icon, SiteHeader, SiteFooter, StaggeredMenu, motion/
    editorial/   ChapterHeading, CreditsTable, Evidence, ProfileCard, QuickResume
    graphics/    HandCircle, MarkerArrow, Monogram, Barcode, Paper, Sticker
    cd/          Disc, CoverArt, DiscGallery (including selection persistence)
  sections/      Hero, Projects, LinerNotes, Services, About, BonusTrack, Contact
  pages/         HomePage, ProjectsIndexPage, ProjectPage, NotFoundPage, PageShell
  seo/           metadata and structured-data builders, social card rendering
public/images/   original/reusable artwork and separate project-specific assets
```

`config + design → components → sections → pages`. Neither base layer imports the other.
CSS is owned by design and imported by its consumer; no new styling framework or runtime dependency.

## Change text

- Identity and availability: `src/config/site.ts`.
- Hero and email subject/body: `hero.ts`, `contact.ts`.
- Section prose: `about.ts`, `process.ts`, `services.ts`, `library.ts`.
- Navigation labels, order and section visibility: `navigation.ts` (`allChapters`, `ready`).
- Shared labels, headings, CTA text, functional states and translated-message templates: `ui.ts`.
- Default/index/404 metadata: `seo.ts`; per-project metadata stays with each project.
- Reusable images: `assets.ts`; project screenshots and artwork: that project's config entry.

Update the config and rebuild. Do not edit JSX to change copy. Keep factual claims traceable
to `docs/INFORMATION_ARCHITECTURE.md` §6. Numeric counters, URLs and track positions are derived;
interaction thresholds are technical implementation, not editorial settings.

## Add, hide or reorder a project

1. Add one `Project` entry to `projectCatalog` in `src/config/projects.ts`, following an existing
   entry. Supply immutable unique `id`, URL-safe unique `slug`, numeric `order`, `visible: true`,
   title/tagline/summary/overview, technologies, role/type/year/status, links and SEO.
2. Add verified case content in the optional context, challenge, goals, responsibilities,
   architecture, decisions, outcome and evidence fields. Optional fields may be omitted.
3. Put original images under `public/images/projects/<slug>/`. For custom packaging add
   `assets: { disc: { src, width, height }, sleeve: { src, width, height } }`; either artwork
   falls back to the other. Without either, a neutral generated theme renders automatically.
4. Add a 1200×630 social image at `public/images/og/<slug>.jpg` (or set `assets.social`).
   To generate it using existing tooling, run the client/SSR builds, `npm run og`, then the
   full build. `npm run og` needs playwright-core and local Chrome; no runtime dependency.
5. Run `npm run build`. Gallery, index, menu, next release, detail route, sitemap and JSON-LD
   follow the same data. No second hand-maintained gallery entry or route is needed.

Change `order` to reorder, `visible` to hide, or remove the entry. Track numbers recalculate.
Hiding removes its detail route from publication. Existing references to a removed/hidden
release via projectHref land on the index. This is publication visibility, not access control.
For an intentionally distinct generated theme, the optional adapter is
`components/cd/CoverArt/projectTheme.ts`; neutral palette/motif definitions stay in design.

## Checks and documentation

`npm run typecheck`, `npm run check:architecture`, `npm run test:config`, `npm run build`.
Build checks imports/layer boundaries/cycles, banned patterns (eyebrow labels, raw colours,
middots between data), catalogue integrity, assets (including srcset), strict types, prerender
and SEO. Browser QA also covers responsive widths, keyboard, reduced
motion and no JavaScript; see the TASK 02 report for actual results.

- `AGENTS.md`: technical reference.
- `DESIGN.md`: artistic reference (1995–2005 musical packaging).
- `docs/TASK02_AUDIT.md`: diagnosis before migration (local only, git-ignored).
- `docs/INFORMATION_ARCHITECTURE.md`: section contracts, routes, authentic facts.
- `docs/MOTION_SYSTEM.md`: interactions and motion contract.
- `docs/IMPLEMENTATION_PLAN.md`: historical measurements and remaining content questions.
- `docs/adr/`: decision records for changes that span several sections, each with its status
  table (ADR-001: every chapter after Projects as one frame, and the Projects pages).
- `references.md`: research; earlier aesthetic choices are historical, not new restrictions.

## Credits

- Fonts: **Estrella Early** (designer field: Uncarving; licence to be confirmed, see the open
  questions in the implementation plan) and **Poppins** (SIL Open Font License 1.1,
  `public/fonts/Poppins-OFL.txt`).
- Technology logos in `public/images/logo/` follow [SVGL](https://svgl.app/).
- `package.json` declares the code as MIT; a `LICENSE` file has not been added yet.
