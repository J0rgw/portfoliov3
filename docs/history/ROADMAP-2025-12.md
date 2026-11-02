# Portfolio V3, Completion Roadmap

> **Superseded on 2026-10-26 by [`docs/IMPLEMENTATION_PLAN.md`](../IMPLEMENTATION_PLAN.md).**
> Kept unchanged below as the historical defect register. Two decisions recorded here were
> explicitly overturned, with reasons, in the new plan: *"Projects, rows plus a detail modal"*
> became dedicated, prerendered case-study pages (indexable and shareable URLs), and the
> separate *Experience* section was folded into the About chapter's milestones. The light
> ground decision was kept.

Status of this document: written against the working tree at commit `6bcf04c`, after a full
audit of `src/`, `public/`, build output and git state. Every defect listed below was verified,
not assumed, each carries a `file:line` reference you can click.

**Goal:** go from "impressive shell with placeholder content" to a curated, deployable repo
where nothing is fake, nothing is missing, and both Projects and Experience actually sell the work.

---

## Where the project actually stands

**Working and worth keeping:**

- `tsc --noEmit` passes clean, `npm run build` succeeds in ~1.1s
- Config-driven architecture (`src/config/*.ts`) is a genuinely good pattern, keep extending it
- `StaggeredMenu`, `ColorBends`, `LogoLoop`, `ShinyText`, `ProfileCard`, `ProjectsSection` all render
- `ProjectsSection` marquee-on-hover with edge detection is the strongest piece of the site

**The honest gaps:**

- The About copy is literal Lorem ipsum, live on the page
- All five project images are 500-byte placeholder SVGs generated as stand-ins
- Every nav link is dead, they point at routes that do not exist
- Experience and Contact are linked in the menu but have never been built
- `readme.md` describes a file structure that no longer exists
- Nothing is deployed; there is no CI, no `base` path, no LICENSE

---

## Defect register

These are confirmed bugs and broken references, not style opinions. Fix them before adding features.

| # | Severity | Location | Problem |
|---|----------|----------|---------|
| D1 | High | `src/config/aboutSection.ts:20` | About paragraph is Lorem ipsum, rendering live on the page |
| D2 | High | `src/config/navigation.ts:1-7` | Nav links `/about` `/projects` `/experience` `/contact` are hard `<a href>` navigations; there is no router, so every one is a 404 |
| D3 | High | `public/images/projects/*.svg` | All 5 project images are ~500-byte generated gradient placeholders with the project name in monospace |
| D4 | High | `src/config/navigation.ts:10` | `Mail` social item has `link: ''`, renders an anchor with an empty href |
| D5 | Medium | `src/components/ProfileCard/ProfileCard.tsx:43` | Default `iconUrl = '/public/images/miniLogo.png'`, the `/public/` prefix is invalid in a Vite build and 404s whenever the prop is omitted |
| D6 | Medium | `src/components/ProfileCard/ProfileCard.tsx:44` | Default `grainUrl = '<Placeholder for grain URL>'` emits `background: url(<Placeholder for grain URL>)` into the DOM |
| D7 | Medium | `src/components/StaggeredMenu/StaggeredMenu.tsx:43,415` | Default `logoUrl = '/images/LogobgB.png'`, that file does not exist; only `LogobgB2.png` does. Masked today only because `menuConfig` overrides it |
| D8 | Medium | `index.html:5` | Favicon declared `type="image/svg+xml"` but the file is a `.ico` |
| D9 | Medium | `index.html:7` | Title is literally "Portfolio"; no meta description, no canonical, no OG or Twitter card tags |
| D10 | Medium | `src/App.css:41-49` | Leftover CRA boilerplate, bare `h1` and `p` global selectors, including `p { color: #61dafb }`, which leaks React-default blue onto every paragraph in the site |
| D11 | Medium | `src/App.css:8-11` | Dead `.App` class with `#282c34` background, nothing uses it |
| D12 | ~~Low~~ **High** | `src/config/logoLoop.ts:10` | **Corrected after running the site.** The page had no background at all, so it rendered *white*, not dark. `#f0f0f0` was therefore roughly right; the real fault was that `ProjectsSection` was styled for dark while sitting on white. The ground is now explicitly `#ffffff` and the mask matches it |
| D13 | Low | `src/components/AboutSection/AboutSection.tsx:35` | Section has no `id`, so anchor navigation cannot reach it. Only `ProjectsSection` has one |
| D14 | Low | `.gitignore:3` | `package-lock.json` is gitignored, it should be committed so installs and CI are reproducible |
| D15 | Low | `package.json:4-13` | Empty `description`, `author`, `keywords`; `"main": "index.js"` points at a file that does not exist; license is default ISC |
| D16 | Low | repo root | Untracked junk: `flowingMenu.tsx`, `flowingMenu.css` (orphan component, and it imports `./FlowingMenu.css` with mismatched casing, would break on a case-sensitive filesystem), `image.png` (808 KB), `Captura de pantalla 2026-02-11 a las 13.55.54.png` (1.6 MB) |
| D17 | Low | `vite.config.ts` | No `base` set. The README advertises a GitHub Pages URL; Pages under `/Portfoliov3/` requires `base: '/Portfoliov3/'` |
| D18 | Low | build output | 828 KB JS / 242 KB gzip in a single chunk, `three` dominates, no code splitting |
| D19 | Low | `public/images/` | Unoptimized rasters: `avatar4.png` 280 KB, `LogobgB2.png` 80 KB, `miniLogo.png` 68 KB, `favicon.ico` 47 KB. No WebP/AVIF variants |
| D20 | Low | `src/` | Only `LogoLoop.css:182` respects `prefers-reduced-motion`. The GSAP scroll reveals, the marquee, the tilt card and the WebGL background all ignore it |
| D21 | Critical | `src/index.css` | `body` declared no `background`, so the page fell through to browser white while `ProjectsSection.css` was written for a dark backdrop. Measured on the running site |
| D22 | Critical | `ProjectsSection.css:88` | Consequence of D21: project names at `#c0c0c0` on white measured **1.82:1** contrast (WCAG AA needs 3.0 for large text). Effectively unreadable |
| D23 | Medium | `ProfileCard.tsx:42` | Default `avatarUrl = '<Placeholder for avatar URL>'`, a third placeholder string alongside D5 and D6, missed on the first pass |
| D24 | Medium | `src/index.css` | No `:focus-visible` styling anywhere, keyboard users had no visible focus indicator on any control |
| D25 | Medium | `StaggeredMenu.css:8` | `.fixed-wrapper` spans the full viewport with default `pointer-events`, so enabling `isFixed` would have swallowed every click on the page beneath it |

---

## Progress log

**Session 1, Phases 0, 2 (partial) and 3 complete.** Verified in a real browser at each step,
not just by reading code.

Decisions taken: **light theme** (`#ffffff`), **rows + detail modal** for projects,
**hover-row list** for experience, **author-supplied screenshots**.

> The theme was briefly taken dark, then reverted on request. What mattered was never the
> colour, it was that the ground had been *unset*, so the page rendered white while the
> Projects section was styled for dark. The ground is now explicitly `#ffffff` and the
> section is toned to match it, which is what fixed the contrast.

| Done | Note |
|------|------|
| Phase 0 (all items) | Root junk removed, `package-lock.json` un-ignored, CRA boilerplate stripped |
| D5, D6, D7, D23 (broken asset defaults) | All four placeholder/invalid paths corrected |
| D8, D9 (favicon type and page metadata) | Real title, description, OG and Twitter cards |
| D14, D15 (repo metadata) | `package.json` identity, scripts, and license filled in |
| D21, D22 (the theme fault) | Explicit light ground (`#ffffff`) with the Projects section re-toned for it; names went **1.82:1** to **17.33:1**, tech and index sit at **5.41:1** |
| D24 (focus visibility) | Global `:focus-visible` ring added |
| D25 (fixed menu click-through) | `pointer-events` scoped so the fixed menu no longer blocks the page |
| D20 (reduced motion) | Global `prefers-reduced-motion` block added; per-component GSAP guards still outstanding |
| Phase 2 (asset guardrail) | `scripts/check-assets.mjs`, wired into `npm run build`. Verified it **fails** on a broken path, not just passes |
| Phase 3 (navigation) | Hash anchors, click interception with smooth scroll, focus move, Escape-to-close, fixed menu |
| Icons | [reicon](https://reicon.dev) wired in, replacing the hand-rolled arrow SVG and adding social icons |
| Projects content | Six real GitHub social cards wired in with repo-accurate names, taglines and languages; the asset guard caught all five stale SVG references the moment the placeholders were replaced |
| Hover redesign | The overlay was a dark slab on a light page with a 150px, illegible thumbnail. Rebuilt as an opaque light surface with a per-project accent wash, dark text, and the card at 300x104 so it is actually readable. The plate is fully opaque because at 97% the resting row name ghosted through |
| Row 07 | "Private and NDA work" is a row rather than a separate block, with `feel free to ask` in place of a tech stack and a hover carousel carrying the LinkedIn mark and link |
| Accent palette | Re-picked for the light ground: `#00ffd1` and friends were invisible on white as index/arrow colours |

**Deliberately not done, and why:**

- **Scroll-spy** (Phase 3). The menu is a hidden panel, not a persistent bar, so an active-section
  marker is only visible once the panel is already open. Low value for the complexity; revisit if
  the nav ever becomes a visible bar.
- **Experience and Contact nav links.** Rather than ship links to sections that do not exist, the
  config now carries a `ready` flag and the menu renders only ready items. Flip the flag in
  `src/config/navigation.ts` when Phase 5 and 6 land.
- **Everything content-shaped.** About copy, project write-ups, experience entries and real
  screenshots are all still Phase 1, still blocked on you.

**Note on reicon:** it ships ~2,676 UI icons but **no brand marks**. GitHub and LinkedIn are
therefore inline paths in `src/components/Icon/Icon.tsx` so they inherit `currentColor`. Icons are
deep-imported (`reicon-react/icons/ArrowRight`) rather than from the package root, which keeps the
dev server from walking all 2,676 modules. Total bundle cost for 5 icons: **8 kB**.

---

## Decisions locked in

Three architectural choices are settled, so the phases below assume them:

1. **Projects, rows plus a detail modal.** The marquee rows stay as the index. Clicking a row opens
   an in-page modal with screenshots, the problem, the approach, the outcome and links. No router,
   so the single-page feel survives, but each project gets real substance.
2. **Experience, hover-row list, sharing the Projects visual language.** Extract the row mechanics
   into one reusable component so both sections are literally the same code with different data.
3. **Screenshots, supplied by you.** You drop real captures into `public/images/projects/`;
   the pipeline for naming, WebP conversion and sizing is specified in Phase 2.

---

## Phase 0, Clean slate

Small, mechanical, unblocks everything. Do it first so later diffs stay readable.

- [x] Delete `image.png` and `Captura de pantalla 2026-02-11 a las 13.55.54.png` from the repo root (2.4 MB of untracked screenshots)
- [x] Decide on `flowingMenu.tsx` / `flowingMenu.css`: either move them into `src/components/FlowingMenu/` with consistent casing, or delete them. They are currently orphaned at the root and the CSS import casing is wrong (D16)
- [x] Add `.DS_Store` cleanup: `find . -name .DS_Store -not -path './node_modules/*' -delete`
- [x] Un-ignore `package-lock.json` in `.gitignore` and commit it (D14)
- [x] Strip CRA boilerplate from `src/App.css`, remove `.App`, bare `h1`, bare `p` (D10, D11)
- [x] Fix `fadeOutColor` in `src/config/logoLoop.ts` to match the actual dark backdrop (D12)

**Done when:** `git status` shows only intentional changes, and no global element selectors remain in `App.css`.

---

## Phase 1, Content truth

Nothing ships with placeholder copy. This phase is mostly you writing, me wiring.

### Content you need to supply

This is the blocking list, I cannot invent your history.

- [ ] **About:** 2-3 real paragraphs replacing the Lorem ipsum (D1). Who you are, what you build, what you are looking for. Spanish or English, pick one and set `<html lang>` to match
- [ ] **Per project** (x5, plus any you want to add):
  - [ ] Year built
  - [ ] Your role (solo / team size / what you specifically owned)
  - [ ] The problem it solves, one sentence, plain language
  - [ ] The approach, 2-3 sentences on the interesting technical decision
  - [ ] The outcome, shipped? graded? used by anyone? what you learned
  - [ ] Live URL if one exists (no project currently has `liveUrl` set)
- [ ] **Experience entries:** for each role, internship, talk or qualification, org, title, start/end dates, 2-3 outcome bullets. Include the NTT DATA work and the CDD talk that the existing projects hint at
- [ ] **Contact:** the email address for the currently-empty Mail link (D4)

### Wiring work

- [ ] Replace the Lorem ipsum in `src/config/aboutSection.ts` (D1)
- [ ] Fill the Mail link in `src/config/navigation.ts` (D4)
- [ ] Extend the `ProjectItem` interface in `src/components/ProjectsSection/ProjectsSection.tsx:9-18`:

```ts
export interface ProjectItem {
  slug: string;
  name: string;
  tagline: string;
  techStack: string[];
  accentColor: string;
  githubUrl: string;
  liveUrl?: string;
  image: string;          // marquee thumb
  // new, for the detail modal:
  year: string;
  role: string;
  summary: string;        // the problem, one sentence
  approach: string[];     // 2-3 bullets on technical decisions
  outcome: string;
  gallery: string[];      // 1-3 full screenshots
}
```

- [ ] Create `src/config/experience.ts` mirroring the projects config shape

**Done when:** `grep -ri "lorem\|placeholder\|coming soon\|TODO" src/ index.html readme.md` returns nothing.

---

## Phase 2, Imagery, with nothing missing

### Fix broken references first

- [x] `ProfileCard.tsx:43`, change default to `/images/miniLogo.png` (D5)
- [x] `ProfileCard.tsx:44`, default `grainUrl` to `undefined`, not a placeholder string, so the `url()` is never emitted (D6)
- [x] `StaggeredMenu.tsx:43,415`, point the default at `/images/LogobgB2.png`, the file that exists (D7)
- [x] `index.html:5`, correct the favicon MIME type, or replace the 47 KB `.ico` with a proper SVG favicon plus a small `apple-touch-icon.png` (D8, D19)

### Screenshot pipeline

Naming convention, the code will expect exactly this:

```
public/images/projects/<slug>/
  thumb.webp      1200x675 (16:9)  - marquee + modal header
  01.webp         1600x1000        - gallery
  02.webp         1600x1000        - optional
  03.webp         1600x1000        - optional
```

- [ ] Capture real screenshots for: `mathgeon`, `ponenciacdd`, `consejonippon`, `crudnttdata`, `webscraping` (D3)
- [ ] Convert to WebP at quality 82 and strip EXIF
- [ ] Delete the five placeholder SVGs once real captures land
- [ ] Add explicit `width`/`height` attributes everywhere images render, to stop layout shift
- [ ] Add `loading="lazy"` to gallery images inside the modal
- [ ] Optimize `avatar4.png` (280 KB) to WebP with a PNG fallback (D19)

### Guardrail against this regressing

- [x] Add `scripts/check-assets.mjs`, walks every `/images/...` string in `src/` and `index.html`, asserts the file exists under `public/`, exits non-zero otherwise
- [x] Wire it as `"prebuild": "node scripts/check-assets.mjs"` in `package.json`

**Done when:** `npm run build` fails loudly if any referenced image is missing, and passes today.

---

## Phase 3, Navigation that works

Currently the single most visible bug: clicking any menu item leaves the site.

- [x] Give every section a stable `id`: `#home`, `#about`, `#projects`, `#experience`, `#contact` (D13, `AboutSection` has none)
- [x] Change `menuItems` links to hash anchors (`#about` rather than `/about`) (D2)
- [x] In `StaggeredMenu.tsx:454`, intercept the click: `preventDefault`, close the panel, then smooth-scroll to the target
- [x] Add `scroll-behavior: smooth` in `index.css`, guarded by `prefers-reduced-motion`
- [~] Add a scroll-spy so the active section is marked in the menu: **skipped**, see Progress log
- [x] Verify keyboard navigation: Tab reaches the menu button, Enter opens, Escape closes, focus returns to the trigger

**Done when:** every menu item scrolls to a real section, and nothing triggers a page load.

---

## Phase 4, Projects showcase

Architecture: keep `ProjectsSection` as the index, add a modal layer.

- [ ] Extract the row internals from `ProjectsSection.tsx:142-399` into a shared `components/HoverRow/`, the marquee, edge detection and touch fallback are all reusable by Experience in Phase 5
- [ ] Build `components/ProjectModal/`:
  - [ ] Opens on row click; the GitHub link becomes a button *inside* the modal rather than the row's destination
  - [ ] Header screenshot, name, year, role, tech stack
  - [ ] Problem / Approach / Outcome sections from the Phase 1 data
  - [ ] Gallery with 1-3 screenshots
  - [ ] GitHub and Live buttons
  - [ ] Focus trap, Escape to close, background scroll lock, `aria-modal` and a labelled dialog
  - [ ] Restore focus to the originating row on close
- [ ] Preserve the touch fallback path (`ProjectsSection.css` `@media (hover: none)`), on touch, the row should open the modal directly rather than relying on hover
- [ ] Check contrast on `.project-row__name` at `#c0c0c0` and `.project-row__tech` at `#6a6a6a` against the animated backdrop; `#6a6a6a` on dark is likely below 4.5:1

**Done when:** every project opens a modal with a real screenshot, real copy, and working links; keyboard-only users can open and close it.

---

## Phase 5, Experience section

- [ ] Create `components/ExperienceSection/` consuming the shared `HoverRow` from Phase 4
- [ ] Data shape in `src/config/experience.ts`:

```ts
export interface ExperienceItem {
  slug: string;
  org: string;
  role: string;
  period: string;        // "2025" or "2024 - 2025"
  type: 'work' | 'education' | 'talk';
  accentColor: string;
  bullets: string[];     // 2-3 outcomes
  url?: string;
  logo?: string;
}
```

- [ ] Rows show org, role, period and index, same rhythm as Projects, so the two sections read as one system
- [ ] Marquee on hover carries the role and the headline outcome
- [ ] Click opens the same modal component with the bullets
- [ ] Mount in `App.tsx` between About and Projects, or after Projects, whichever ordering you prefer for the narrative
- [ ] Add corresponding logos to `public/images/logo/` if you want org marks in the rows

**Done when:** the `#experience` menu link lands on a populated section.

---

## Phase 6, Contact and footer

- [ ] Build `components/ContactSection/` with `id="contact"`
- [ ] Email as a real `mailto:` link, GitHub, LinkedIn, reuse `socialItems`
- [ ] Optional: a CV download button, if you want `public/cv.pdf` in the repo
- [ ] Footer with the year, a "built with" line, and a link back to this repo
- [ ] Remove the ProfileCard's `contactText: "Contact"` dead-end, wire `onContactClick` to scroll to `#contact`

**Done when:** every menu entry has a destination and the page has a real ending.

---

## Phase 7, Repo curation

This is the half of "well curated repo" that lives outside `src/`.

### README rewrite

The current `readme.md` is actively misleading: it says "only a staggered menu and a revamped
version of my logo has been developed", documents an `src/images/` folder that no longer exists,
lists `logo.png` / `Logo2.png` / `LogobgB.png` which are not in the repo, and links a live demo
that does not exist.

- [ ] Hero: project name, one-line description, live URL, a screenshot of the actual site
- [ ] Badges: build status, license, tech stack
- [ ] Features section describing what is genuinely built
- [ ] Quickstart: clone, `npm install`, `npm run dev`
- [ ] Accurate project structure tree (regenerate it, do not hand-write it)
- [ ] Config system table, this part of the current README is good, just extend it to cover `projects.ts`, `experience.ts`, `aboutSection.ts`, `colorBends.ts`, `logoLoop.ts`
- [ ] Credits for third-party components and the Estrella font, confirm the font license permits redistribution in a public repo, since `public/fonts/estrella-early.otf` is committed
- [ ] License section

### Metadata and housekeeping

- [x] `package.json` (D15): real `description`, `author`, `keywords`, `repository`, `homepage`; drop the bogus `"main": "index.js"`; choose a real license
- [ ] Add `LICENSE` (MIT is the usual choice for a portfolio)
- [ ] Add `.nvmrc` pinning the Node version
- [ ] Add `CHANGELOG.md` or rely on tagged releases, either is fine, pick one
- [ ] Set the repo's GitHub description, topics and social preview image
- [ ] Consider renaming the default branch's advertised URL: the remote is `Portfoliov3` but the README says `portfoliov3`, GitHub Pages paths are case-sensitive

### Deploy

- [ ] Set `base: '/Portfoliov3/'` in `vite.config.ts` if deploying to project Pages, or leave it default for a custom domain / Vercel (D17)
- [ ] Add `.github/workflows/deploy.yml`, install, typecheck, build, publish to Pages
- [ ] Add `.github/workflows/ci.yml`, typecheck and build on every PR
- [ ] Verify the deployed site loads every asset (the `prebuild` check from Phase 2 catches most of this before it ships)

**Done when:** a stranger can land on the repo, understand what it is, run it locally, and click through to the live site.

---

## Phase 8, Performance, SEO, accessibility

### Performance

- [ ] Code-split `three` / `ColorBends` behind `React.lazy` + `Suspense`, it is the bulk of the 828 KB bundle (D18)
- [ ] Add `manualChunks` in `vite.config.ts` to separate vendor from app code
- [ ] Pause the WebGL render loop when the background is scrolled out of view or the tab is hidden
- [ ] Target: under 200 KB gzip for the initial chunk, Lighthouse performance above 90

### SEO

- [ ] Real `<title>` and meta description (D9)
- [ ] OG and Twitter card tags with a 1200x630 preview image
- [ ] `<html lang>` matching the content language
- [ ] JSON-LD `Person` schema
- [ ] `public/robots.txt` and `public/sitemap.xml`

### Accessibility

- [ ] Honour `prefers-reduced-motion` across GSAP reveals, the marquee, the tilt card and the WebGL backdrop, only `LogoLoop.css:182` does today (D20)
- [ ] Run an axe pass; fix contrast failures found in Phase 4
- [ ] Verify full keyboard traversal: menu, rows, modal, contact
- [ ] Confirm every image has a meaningful `alt`, and decorative ones have `alt=""`

---

## Phase 9, Ship

- [ ] Cross-browser check: Safari, Chrome, Firefox, the WebGL backdrop and `backdrop-filter` in `ProjectsSection.css:183` are the likely divergence points
- [ ] Real-device check on iOS and Android, not just devtools emulation
- [ ] Lighthouse on the deployed URL, all four categories
- [ ] Tag `v3.0.0`
- [ ] Update the GitHub profile README to point here

---

## Definition of done

The portfolio is finished when all of these hold:

1. `grep -ri "lorem\|placeholder\|coming soon" src/ index.html readme.md` returns nothing
2. `npm run build` passes, including the asset-existence prebuild check
3. Every menu item scrolls to a populated section, no dead links, no 404s
4. Every project has a real screenshot, a year, a role, and a written outcome
5. Experience is populated with real roles
6. The README accurately describes the repo as it exists
7. The site is deployed and the README links to it
8. Lighthouse: performance above 90, accessibility above 95
9. `git status` is clean, with no stray screenshots or orphaned components

---

## Suggested execution order

Phases 0 through 3 are pure cleanup and bug-fixing, they need nothing from you and can run
immediately. Phase 1's *content* is the critical path for everything after: Projects, Experience
and Contact are all blocked on copy only you can write.

The most efficient split: I execute Phases 0, 2 (the broken-reference fixes and the guardrail
script) and 3 now, while you gather screenshots and write the content listed in Phase 1. Then
Phases 4 through 9 run straight through once the content lands.
