# Portfolio V3 · JRG-003

Portfolio of **Jorge Arcas**, freelance full-stack developer, designed as an album: each chapter a
track, each project a release with its own cover, credits and liner notes.

- Domain: [portfolio.jarcas.dev](https://portfolio.jarcas.dev) (currently serves v2; this
  version is not deployed yet).
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
```

`npm run build` fails if a referenced image or font is missing, or if any page lacks a title,
description, canonical URL, Open Graph image, `lang` or exactly one `h1`.

## Where things live

```
src/content/      all copy and data (projects, services, process, about, site identity)
src/styles/       design tokens and base styles
src/components/   primitives and objects (Disc, CoverArt, CreditsTable, Button, menu, header…)
src/sections/     home chapters: Hero, Projects, LinerNotes, Services, About, BonusTrack, Contact
src/pages/        Home, project index, case study, 404
src/motion/       reveal, scroll scene, disc spin, scroll spy, reduced motion, on-demand GSAP
src/seo/          head tags, JSON-LD, social cards
scripts/          prerender, asset and SEO checks, social-card generator
```

To change copy or add a project, edit `src/content/`. Every factual claim must trace to a source
listed in `docs/INFORMATION_ARCHITECTURE.md` §6.

## Documentation

| File | Purpose |
|------|---------|
| [`AGENTS.md`](AGENTS.md) | Canonical guide for anyone (or any agent) changing the code |
| [`references.md`](references.md) | Visual research and how each reference is used |
| [`docs/ART_DIRECTION.md`](docs/ART_DIRECTION.md) | Concept, typography, colour, objects, composition |
| [`docs/INFORMATION_ARCHITECTURE.md`](docs/INFORMATION_ARCHITECTURE.md) | Chapters, routes, content model, SEO |
| [`docs/MOTION_SYSTEM.md`](docs/MOTION_SYSTEM.md) | Motion principles, primitives, reduced motion |
| [`docs/IMPLEMENTATION_PLAN.md`](docs/IMPLEMENTATION_PLAN.md) | Audit, status, budgets, measurements, open questions |

## Credits

- Fonts: **Estrella Early** (designer field: Uncarving; licence to be confirmed, see the open
  questions in the implementation plan) and **Poppins** (SIL Open Font License 1.1,
  `public/fonts/Poppins-OFL.txt`).
- Technology logos in `public/images/logo/` follow [SVGL](https://svgl.app/).
- `package.json` declares the code as MIT; a `LICENSE` file has not been added yet.
