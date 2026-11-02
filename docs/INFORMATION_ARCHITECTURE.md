# Information architecture

How the site is organised, what each chapter must do, where content lives, and how pages are
rendered and indexed. Visual rules: [`ART_DIRECTION.md`](ART_DIRECTION.md). Motion rules:
[`MOTION_SYSTEM.md`](MOTION_SYSTEM.md).

---

## 1. Audiences, in priority order

1. **Prospective clients**: understand the offer, see evidence, make contact.
2. **Technical recruiters and collaborators**: judge real engineering through case studies.
3. **Design-oriented visitors**: discover a distinctive, crafted experience.

The commercial audience comes first. Every chapter ends with a path towards contact.

---

## 2. Routes and rendering

| Route | Page | Indexable | Notes |
|-------|------|-----------|-------|
| `/` | Home (the album, chapters 00–06) | Yes | Primary landing page |
| `/proyectos/` | Project index ("Índice") | Yes | A24-style catalog with credits |
| `/proyectos/<slug>/` | Case study | Yes | One per release, see §5 |
| `/404.html` | Not found ("Pista no encontrada") | No (`noindex`) | Served by GitHub Pages |
| `/sitemap.xml`, `/robots.txt` | Generated at build | — | |

Slugs: `moneyman`, `client-leads`, `mathgeon`, `disco-download`, `gitchange`, `portfolio-v2`.

**Rendering model: static prerendering of a React app (SSG), multi-page navigation.**

- `vite build` produces the client bundle; `vite build --ssr src/entry-server.tsx` produces a
  renderer; `scripts/prerender.mjs` renders every route to `dist/<route>/index.html` with its own
  `<head>` (title, description, canonical, Open Graph, JSON-LD), then writes `sitemap.xml`.
- The browser receives complete HTML: the hero, the projects and every case study are readable with
  JavaScript disabled. React then hydrates (`hydrateRoot`) to add interaction.
- Navigation between pages is ordinary links (no client router). Cross-document View Transitions
  make page changes feel continuous where supported, and degrade to a normal navigation elsewhere.
- In `npm run dev` the page renders client-side (empty root, `createRoot`) and the title is set
  from the same route metadata, so development needs no server.
- The stylesheet (~13 kB gzip) is inlined into every page by the prerenderer to remove a
  render-blocking request.
- Each page stamps `#root[data-route]` with the route it was rendered for. The client hydrates only
  when it matches the current URL; a host that answers an unknown URL with another page's HTML (an
  SPA fallback) gets a clean client render instead of a hydration mismatch.
- Social cards: `npm run og` renders `src/seo/OgCard.tsx` per page to `public/images/og/*.jpg`.
- Why not migrate to a framework: the requirements (crawlable per-route HTML, no-JS hero,
  per-page metadata) are met with ~150 lines on the existing Vite + React stack and no new runtime
  dependency.
- Hosting: the domain `portfolio.jarcas.dev` points to GitHub Pages (verified 2026-10-26; it
  currently serves the v2 site). Folder-style `index.html` output and `404.html` match how Pages
  serves files. Deploying V3 there is a separate, owner-approved step.

---

## 3. Home page: the narrative sequence

Each chapter adds something new. Order is intentional: identity → proof → method → offer →
person → extra → action.

| # | Chapter (`id`) | Visible H2 | Purpose |
|---|----------------|-----------|---------|
| 00 | Cover (`inicio`) | (H1) Jorge Arcas Verdejo, Freelance Software Developer | Who, and the identity as an object |
| 01 | Projects (`proyectos`) | Proyectos seleccionados | Prove capability |
| 02 | Liner notes (`proceso`) | Cómo trabajo | Earn trust in the method |
| 03 | Services (`servicios`) | Qué puedo construir para ti | Turn skills into offers |
| 04 | About (`sobre-mi`) | Sobre mí | Human connection, credibility |
| 05 | Bonus track (`libreria`) | Una librería de componentes, en preparación | Introduce the library, honestly |
| 06 | Back cover (`contacto`) | ¿Tienes un proyecto en mente? | Convert |

The chapter list lives in `src/config/navigation.ts` and drives the menu panel
and the footer tracklist. Array order also controls the rendered chapters; `ready: false` removes the section and its navigation entries. Calls to chapterHref for a hidden chapter safely return to the cover.

### Section contracts

Every chapter below must keep its contract when edited.

**00 · Cover / hero** (`src/sections/Hero`)
- Narrative purpose: introduce the person and the identity through one physical object, in one
  viewport; the offer is told by the chapters that follow.
- Content (Jorge's sketch and corrections, 2026-10-29): a credit collapsed into the bottom-left
  corner, `h1` with the full name (Poppins) and the role "Freelance Software Developer", then
  "Software con carácter.". Render this credit as plain text directly on the background, without
  a card, coloured border, shadow or tilt. The scene: Jorge's printed disc behind his cover in a clear plastic film, a
  hand holding the sleeve by its edge (ART_DIRECTION §5.1). No headline, lede, CTAs, spec strip
  or tracklist: contact and chapters are in the header (Hablemos, Índice, Menú).
- References: Jorge's sketch (primary), Kyoosang Choi (a hand holding the object), A24 (the disc
  as the cover object), Huy Phan (role right under the name).
- Components: the scene (raster artwork in `public/images/hero/`), `useScrollScene`,
  `useSpin`.
- Motion: Level 1. CSS-only entrance on first paint (no JavaScript dependency); the disc turns
  slowly (75 s a turn; eased stop on hover, held by a tap, paused off-screen, and a pause button
  revealed on keyboard focus); scroll takes the package apart (rest → split → solo → exit) in a
  pinned frame (MOTION_SYSTEM §2.1). Reduced motion and no-JS: a still, complete composition
  with no extra scroll length.
- Responsive: the frame is one full viewport, under the transparent header (ART_DIRECTION §9). Landscape: the credit bottom left, the
  disc centred at 45 % with the sleeve to its right and lower, the forearm leaving through the
  bottom edge. Portrait: the credit on top (the bottom belongs to the set), the sleeve lower and
  the hand mostly beyond the right edge.
- SEO: the only `h1`, containing the name and the role. The service phrases live in Services and
  in the meta description; the Person JSON-LD description is `site.summary`. The artwork is
  decorative and adds no claims.
- Accessibility: all text is real HTML, visible without JavaScript; the name is typeset in its original case. The disc, the sleeve and the hand are `aria-hidden` (the name and role
  printed on them are the `h1`). The turn can be paused by keyboard (focus-revealed button),
  mouse and touch (WCAG 2.2.2).
- Conversion: the header's "Hablemos" (always visible) and the menu; the hero itself has no CTA,
  by the owner's brief.

**01 · Projects** (`src/sections/Projects`), rebuilt 2026-10-30 from Jorge's brief
- Purpose: prove capability through selected releases, handled like a collection of discs.
- Content: one disc per release (six; the private work is a line in the foot, not a disc, since
  every disc opens a case study). The selected disc's credits, top left: title, short description
  (the tagline), stack (first three technologies), position `03 / 06` (repeated between the
  previous/next keys since TASK 01, 2026-10-30). Foot: the private/NDA
  line with a link to contact, and the full index. Without JavaScript, a text list of every
  case study.
- References: A24 by Ravi Klaassens (primary: composition, credits, the arc of discs, the pen loop
  on hover, title change-over), Jorge's marker arrow, the original image (references.md #17),
  Cool Interaction (numeral with total).
- Components: `DiscGallery`, `QuickResume`, `discPose` (section: the path, `TRACK`), `Disc`,
  `CoverArt`, `MarkerArrow`, `HandCircle`, `useDiscCarousel`. Data: `projectSummaries` (§5).
- Motion: Level 3 (MOTION_SYSTEM §2.2): drag with inertia and snapping along an arc,
  previous/next buttons, arrow keys; the credits change over; the arrow is laid again at rest; a
  pen loop turns round the hovered disc. No wheel capture: the wheel scrolls the page everywhere.
- Responsive: one viewport-high frame on wide landscape screens (credits top left, discs on an
  arc, a second previous disc only on frames ≥ 940 px tall); credits above the discs on portrait
  and narrow screens, the title wraps naturally within the paper insert so the discs never jump (ART_DIRECTION
  §5.2, MOTION_SYSTEM §2.2). No horizontal overflow: the section clips its discs.
- SEO: every disc is a real link to `/proyectos/<slug>/` with descriptive text ("MoneyMan,
  proyecto 1 de 6. Ver el caso de estudio"); the selected title is an `h3` under the chapter
  `h2`; the no-JS list carries every title and tagline in the HTML.
- Accessibility: only the selected disc is in the Tab order (it follows the selection); the
  two icon keys are real buttons named by `aria-label` ("Proyecto anterior", "Siguiente
  proyecto") with `aria-controls`; each press moves exactly one disc; a polite live region announces "Proyecto 2 de 6: Client Leads" on change;
  at the ends the buttons stay focusable (`aria-disabled`); the annotation is a pointer-only
  duplicate (`aria-hidden`, `tabindex=-1`); keyboard, touch and pointer users can do the same
  things, and dragging is never required.
- Conversion: the case studies, and the private-work line to contact.

**02 · Liner notes / process** (`src/sections/LinerNotes`)
- Purpose: show how Jorge works and why the process is trustworthy.
- Content: five steps (entender, definir, construir, publicar, mantener), each with a description
  and a *technical note* drawn from a real project decision (see §6).
- References: A24 credits, Boccia (one continuous thread), booklet object.
- Motion: Level 2. The step in view is marked on a sticky page counter; reveal per step.
- SEO: real text; links from each note to the relevant case study.
- Conversion: closes with a link to contact.

**03 · Services** (`src/sections/Services`)
- Purpose: translate skills into understandable offers, organised by client problem.
- Content: four offers, each with the client problem in their words, the outcome, practical scope,
  evidence (links to projects) and an enquiry link with a prefilled subject.
- Motion: reveal only. This chapter stays the calmest and most readable.
- SEO: the commercial phrases live here as real headings and copy, not stuffed elsewhere.
- Conversion: one enquiry link per service.

**04 · About / credits** (`src/sections/About`)
- Purpose: personal connection and credibility.
- Content: the backstage pass (portrait, name, role, status), a short narrative, verified
  milestones, principles drawn from his public work, languages, tools ("instrumentos").
- References: Kyoosang Choi (personal artefacts), Boccia (thread), Huy Phan (positioning).
- Motion: pass tilt on fine pointers only; reveal; logo loop paused off-screen and under reduced
  motion.
- Conversion: link to contact and to LinkedIn and GitHub.

**05 · Bonus track** (`src/sections/BonusTrack`)
- Purpose: introduce the upcoming React component library without competing with services.
- Content: what it is, who it is for, real status ("en preparación, sin fecha"), its origin (the
  DevFest 2025 talk), a `mailto:` "Avísame" action and a privacy note. **No fake subscription
  form.**
- References: CollectUI Subscribe, Matt Jinn promo card.
- Conversion: secondary; the primary action stays contact.

**06 · Back cover / contact + footer** (`src/sections/Contact`, `components/SiteFooter`)
- Purpose: convert interest into an enquiry and close the narrative.
- Content: statement, primary email action, copy-email, LinkedIn, GitHub, availability, full
  tracklist (site map), catalog number, barcode, credits, copyright.
- References: The Romans (oversized type), Kerimov (spec rows), Kyoosang (contact as object),
  Huy Phan.
- Motion: reveal only; the barcode and disc are static.
- Conversion: the email action is the primary action of the whole site.

---

## 4. Navigation model

One coherent system: **a conventional information architecture dressed as a tracklist.**

- **Header** (every page, `components/SiteHeader`): logo (link home), `Hablemos` (contact
  action) and the **Menú** toggle, as type over the page with no bar (ART_DIRECTION §9); it
  switches to light ink over the back cover and the footer. It stays fixed and keeps its own
  view-transition name, so it does not move during page changes.
- **Menu panel** (`components/StaggeredMenu`, kept and restyled): numbered chapter links (Kerimov
  rows), the project list with taglines, contact and social links. Behaves as a modal dialog:
  focus moves in, Tab is contained, Escape closes and returns focus, the panel is `inert` when
  closed. Works with reduced motion.
- **Case-study table of contents**: sticky on wide screens, with scroll-spy and a dash marker per
  section.
- **Footer**: the full tracklist (site map) with every case study.
- Links to home chapters are absolute (`/#proyectos`) so they work from every page; on the home
  page they are intercepted and scrolled smoothly (instant under reduced motion), and focus moves
  to the target.

---

## 5. Content model

All content is typed TypeScript in `src/config/` (types in `src/config/types.ts`). Components
never hard-code copy that a content editor would change.

| File | Holds |
|------|-------|
| `site.ts` | Identity, contact, socials, catalog number, availability, base URL, default SEO |
| `navigation.ts` | Home chapters (id, number, label, readiness) |
| `projects.ts` | Releases and case-study content |
| `services.ts` | Offers |
| `process.ts` | Liner-notes steps |
| `about.ts` | Narrative, milestones, principles, languages, tools |
| `library.ts` | Bonus track copy and status |

**Project schema** (`Project` in `types.ts`, abridged):

```ts
id, slug, order, visible, title, tagline, summary,
projectType, typeLabel, role, team?, status: { kind, label }, year,
technologies[], services[], assets?: { disc?, sleeve?, social? },
overview[], context?[], challenge?[], goals?[], responsibilities?[],
architecture?: { summary[], stack[] }, decisions?: { title, body }[],
outcome?[], evidence?: Evidence[], links: { repo?, live? }, seo: { title, description }
```

`projectCatalog` is editable; `selectProjects` filters/sorts without mutation and derives track
numbers. `projects`, `projectSummaries`, routes, menu, index, schema and OG keys share this selection.
Hidden/removed releases have no public detail route. References through projectHref fall back to
the index, so old process/service evidence links do not become dead local URLs. Private work
has its own `visible` flag. Zero projects renders an empty state; a single release has no self-link
as “next”. Assets are optional; missing custom art uses the existing generated cover theme.
Graphic themes live in design; their project assignment is a rendering adapter in CoverArt.

Sections are optional. A case study renders only the parts that have content, in this order:
cover and credits → resumen → contexto → el problema → objetivos y restricciones → mi papel →
arquitectura → decisiones técnicas → resultado → evidencias → siguiente proyecto → contacto.
Since 2026-10-30 the template's core always appears (Jorge's brief: placeholders, never
guesses): "Contexto y problema" when neither `context` nor `challenge` exists, "Mi papel"
without `responsibilities`, "Solución" without `architecture` and `decisions`, each saying
"Pendiente de documentar." Today only Portfolio v2's "Mi papel" is pending. Every case study
opens with "Volver a proyectos" (`/#proyectos`, the gallery reopens on that disc).

**Gallery view** (`ProjectSummary`): derived id, slug, track, title,
shortDescription (tagline), stack (first three technologies), year, href and optional assets.
No colour, geometry, motif or React type belongs in the editorial model.
Shared labels and functional messages are in `ui.ts`; identity, hero, contact and SEO have
named config files. `assets.ts` contains reusable original/derived asset references.

---

## 6. Content authenticity register

Every factual claim on the site must trace to one of these sources. Add a row when you add a
claim. Anything unverified goes to "Open questions" in the implementation plan, not on the site.

| Claim | Source (checked 2026-10-26) |
|-------|------------------------------|
| Full-stack Developer, Grupo Fuertes, Mar–Jun 2025 | Jorge's live v2 site (portfolio.jarcas.dev) |
| Google Developer Group organiser since Nov 2022 | Live v2 site |
| Google Developer Student Clubs lead, Jun 2023 – Jun 2024 | Live v2 site |
| Studies: Computer Engineering, UCAM, 2021–2023; Web Development, UCAM, 2023–2025 | Live v2 site. **No degree completion is claimed.** |
| Spanish native, English professional | Live v2 site |
| Talk "Deja de copiar y pegar componentes" (CDD with React + TypeScript), DevFest 2025 Santiago de Compostela | `J0rgw/PonenciaCDD` repo description and README |
| Freelance full-stack developer, Spain | Owner's V3 brief |
| Available for projects | `status: "Available"` in the previous config, `#OpenForWork` on v2. Editable in `site.ts` |
| Project facts (features, stack, decisions, limitations) | Each project's public README and commit history, linked in `projects.ts` |
| Mathgeon is a two-person project; Jorge's share | Repo contributors (A31Nesta 48 commits, J0rgw 12) and the files his commits touched |
| Hero artwork: printed name, "Freelance Software Engineer", "Vol. 01 / 2026", barcode | Artwork supplied by Jorge, 2026-10-29 (`public/images/brand/cdJorge.png`, `jorgeCDsleeve.png`). Decorative (`aria-hidden`); the barcode is a graphic, not a product code. The site's role text stays the `h1`. |
| Hero credit: "Jorge Arcas Verdejo", "Freelance Software Developer", "Software con carácter." | Jorge's correction to the hero, 2026-10-29 (full name as on his LinkedIn; the role in English as he wrote it, "freelancer" read as "Freelance") |
| Third portfolio (catalog JRG-003) | `J0rgw/portfolio` (v1), `J0rgw/portfoliov2` (v2), this repo |

---

## 7. SEO map

- `lang="es"` everywhere. English is not published yet; the content model keeps copy in
  `src/config` so an `/en/` tree with `hreflang` can be added without duplicating components.
  No machine-translated pages.
- Unique `<title>` and meta description per route (`seo` fields), canonical with trailing slash on
  `https://portfolio.jarcas.dev`, Open Graph and Twitter cards with a 1200×630 image per page.
- Exactly one `h1` per page; H2 per chapter; H3 per item. Checked at build by
  `scripts/check-seo.mjs`.
- Structured data (only verified facts): home → `Person` (+ `makesOffer` with `Service` items) and
  `WebSite`; projects index → `CollectionPage` + `ItemList` + `BreadcrumbList`; case study →
  `CreativeWork` + `BreadcrumbList`. No `LocalBusiness` (no public address), no `alumniOf`
  (implies graduation), no ratings.
- Search intent is matched by real content: *desarrollo web a medida*, *desarrollador full-stack
  freelance*, *desarrollo de aplicaciones web*, *integración de CRM*, *automatización de
  procesos*, *landing pages*. Each phrase appears where the matching evidence is.
- Dedicated service pages were evaluated and **rejected for now**: with today's evidence they would
  be thin. Revisit when each service has two or more case studies.
- `robots.txt` allows everything and points to the sitemap; `404.html` is `noindex`.
