# Implementation plan

Living plan for Portfolio V3. Supersedes `docs/history/ROADMAP-2025-12.md` (kept as history).
Status legend: ✅ done · 🟡 partial · ⬜ not started · ⛔ blocked on Jorge.

---

## 1. Phase A: discovery and audit (2026-10-26)

Measured on the working tree at `6bcf04c` + uncommitted changes, with a production build served
locally and inspected in headless Chrome at 1440×900 and 390×844.

### 1.1 What the architecture did well
- Vite + React 19 + TypeScript strict; `tsc` clean; build ~1 s.
- **Config-driven content** (`src/config/*.ts`): copy and data already lived outside components.
- `scripts/check-assets.mjs` fails the build when a referenced public asset is missing.
- The **project rows** (`ProjectsSection`): marquee entering from the nearest edge, a touch
  fallback, and an IntersectionObserver reveal that never strands content at opacity 0.
- `StaggeredMenu`: numbered items, Escape to close, focus return, smooth scroll to anchors.
- Global `:focus-visible` ring and a reduced-motion backstop already existed.

### 1.2 What to preserve
The light ground, the Estrella hand as the signature, the frog mark and `Jorgw` logotype, the
numbered staggered menu, the project row + marquee mechanic, the config-driven content pattern, the
asset guard, the reicon icon surface, and the ColorBends colour DNA (as a CSS material).

### 1.3 Why the story did not hold together
- The hero said only `JARCAS DEV` (no role, no offer, no action) in grey Estrella over a WebGL
  wash. A visitor could not tell what Jorge sells.
- Sections were independent demos: a full-screen shader, a logo marquee, a holographic ID card, a
  list of rows. Each had its own palette (blue gradients, pastel shader, grey text) and none
  referred to the others.
- About was Lorem ipsum; Experience and Contact did not exist; projects linked straight out to
  GitHub, so the site had no proof of its own.

### 1.4 Inconsistencies and duplication (measured)
- **No `h1` or `h2` anywhere.** The only headings were two `h3` (`Socials`, the card name).
  Section titles were `<div>`s rendered by `ShinyText`, whose shine effect had been removed.
- `lang="en"` on content meant to be Spanish-first.
- Hard-coded colours in every CSS file (`#c0c0c0`, `#6a6a6a`, `#929292`, `#b5b5b5`, three different
  blues); no tokens beyond seven variables in `index.css`.
- Three animation approaches side by side: GSAP timelines, a bespoke rAF loop (LogoLoop), CSS
  transitions, plus a perpetual WebGL loop.
- Body copy colour `#b5b5b5` on white (About): 2.0:1, unreadable.
- Closed menu: links inside `aria-hidden` were still focusable; nav items overrode their visible
  label with different `aria-label`s (WCAG 2.5.3).
- `ProfileCard` set `touch-action: none` (a finger on the card could not scroll the page) and its
  Contact button did nothing.
- The body was 3,482 px wide on a 390 px phone (the off-screen menu panel); `overflow-x: hidden`
  on both `html` and `body` hid it, which also **breaks `position: sticky`** everywhere.
- JS bundle: one 793 kB chunk (228 kB gzip), dominated by Three.js for a background wash.
- Logo loop and shader kept animating off-screen.

### 1.5 What blocked the references from being applied consistently
No shared tokens, no shared type roles (Estrella was used for long words at body-adjacent sizes),
no object vocabulary, no motion primitives, and no page model for projects (only outbound links).
Every borrowed idea would have become another one-off.

### 1.6 Architectural vs presentational changes
- **Architectural**: static prerendering per route; real case-study pages; typed content model in
  `src/content`; design tokens and type roles; motion primitives; SEO head and JSON-LD generation;
  removal of Three.js; header/menu semantics; overflow fix; build-time SEO check.
- **Presentational**: hero composition, disc and cover art, liner notes, services, about, bonus,
  back cover, menu restyle, row restyle.

### 1.7 What had to be refactored before any new motion
Overflow (sticky), tokens, the reveal mechanism (generalised), reduced-motion handling inside the
JS loops, and server rendering compatibility (no `window` during render).

### 1.8 Conflicts found and how they were resolved

| Conflict | Resolution |
|----------|------------|
| ROADMAP chose "rows + detail modal" for projects | **Overturned.** The brief requires individually accessible, shareable, indexable project URLs that do not depend on JavaScript overlays. Case studies are prerendered pages. The rows stay as the index. |
| ROADMAP planned a separate Experience section | Folded into About as verified milestones (one place for the person). |
| ROADMAP: light theme (`#ffffff`) | Kept as a light ground, shifted to printed paper `#F3F1EC`. |
| Brief: "existing bold Poppins variants" | No Poppins files existed. Poppins (OFL) was added because it was the owner's stated intention. Documented in ART_DIRECTION §3. |
| Brief: Estrella as the expressive display | Kept, with a usage contract: it cannot render digits, punctuation or Spanish accents. |
| `README` advertised GitHub Pages at `j0rgw.github.io/portfoliov3` | The live domain is `portfolio.jarcas.dev` (GitHub Pages, currently serving v2). Canonical URLs use it. |
| Local `main` is one commit behind `origin/main` | The remote commit only edits `readme.md`; not pulled (uncommitted work in the tree). `readme.md` is rewritten here anyway. |
| ColorBends (WebGL) is the current visual signature | Replaced by a CSS iridescent material on objects: same colour DNA, no Three.js, no perpetual loop. |

---

## 2. Phases

### Phase B: narrative and design specification ✅
- [x] `references.md` with verified observations
- [x] `docs/ART_DIRECTION.md`, `docs/INFORMATION_ARCHITECTURE.md`, `docs/MOTION_SYSTEM.md`
- [x] `AGENTS.md` (canonical) and `CLAUDE.md` (Claude-specific)

### Phase C: architectural foundations ✅
- [x] Fonts: Estrella → WOFF2 (108 → 45.5 kB); Poppins 400/600/700/800 Latin subset (~7.8 kB each) + OFL licence
- [x] `src/styles/`: tokens, fonts, base, layout, motion (no raw values in component CSS)
- [x] `src/content/`: typed content, migrated from `src/config/` (removed)
- [x] Prerendering: `entry-server.tsx`, `entry-client.tsx`, `scripts/prerender.mjs`, sitemap, CSS inlined per page
- [x] Hydration guard: each page stamps `#root[data-route]`; the client only hydrates matching HTML
- [x] SEO: per-route head, canonical, OG/Twitter, JSON-LD; `scripts/check-seo.mjs` gates the build
- [x] Motion primitives: reveal controller, scroll progress, scroll spy, reduced motion, on-demand GSAP
- [x] Header and menu refactor (dialog semantics, `inert`, focus trap, absolute links, logo link, Spanish)
- [x] Removed ColorBends + `three` + `@types/three`, ShinyText, `App.css`, `index.css`, `main.tsx`, `src/config`
- [x] Horizontal overflow fixed at its sources (LogoLoop, bonus headline, pass note, next-project title);
      `body { overflow-x: clip }` as a safety net that keeps `position: sticky` working
- [x] Images: WebP with explicit dimensions; favicon set; social cards via `npm run og`

### Phase D: hero ✅
- [x] `Disc` component (`cdr` and `pressed` variants), spans only (valid inside links and paragraphs)
- [x] Hero composition (catalog strip, h1, statement, lede, CTAs, tracklist, disc + case + insert)
- [x] Scroll-linked depth; CSS entrance; reduced-motion and no-JS parity
- [x] Mobile composition (disc beside the name in the same grid row)

### Phase D2: hero scene from Jorge's artwork (2026-10-29) ✅
Brief sections 5 (shared lead of the disc and the cover) and 6 (rotation and scroll narrative).
- [x] Artwork processed into `public/images/hero/` (recipe in ART_DIRECTION §7): disc with alpha
      (AVIF + WebP), cover at four widths, shrink-wrap film, hand keyed out of its checkerboard
- [x] Composition: disc ~83 % visible behind the sleeve, print on the open side, hand from below
- [x] Slow turn (75 s) on its own layer: eased hover stop, off-screen pause, "Pausar giro" control
- [x] Editorial separation with scroll (rest → split → solo → exit), pinned on ≥ 1024 px, in the
      flow below; `--scene-exit` left for a future hand-off to Projects
- [x] `useScrollScene` replaces `useScrollProgress`; new `useSpin`; `--dur-spin` token
- [x] Reduced motion and no-JS: still composition, no extra scroll, no control
- [x] Responsive: monogram hidden below 1024 px, one-row spec strip and icon control on phones

### Phase D3: hero recomposed from Jorge's sketch (2026-10-29, same day) ✅
Full brief received with the sketch (`public/images/Imagen de ChatGPT 29 oct 2026, 20_38_52.png`).
- [x] Removed from the hero: giant monogram, statement headline, lede, CTAs, spec strip,
      tracklist, permanent pause button (copy moved: lede → `site.summary` for the JSON-LD)
- [x] One frame per viewport: the set measured in the disc's diameter and, after Jorge's
      correction, one credit in the bottom-left corner (full name in Estrella, "Freelance
      Software Developer", "Software con carácter."); "DEV" tag and JA signature removed
- [x] Hand re-placed so it really grips the cover: the photo's straight cut on its right
      edge, thumb on top, forearm cut by the frame's bottom edge (no fade)
- [x] Plastic film regenerated (`scripts/generate-hero-film.py`): folded edges, ears, seal,
      streaks, corner wrinkles, pressure creases at the grip; sheen in CSS; `--filter-sleeve`,
      `--filter-hand` tokens; the stock shrink-wrap texture is no longer used. A jewel case from
      Jorge's stock photo replaced it the same day and was reverted at his request
- [x] Header: first two plates with an open middle and an interrupted rule; replaced the same
      day (Jorge's correction) by a transparent header, type only, with a localized tone switch
      over `.on-night` sections and a ground-coloured halo. The hero frame spans the full
      viewport under it; the solo disc is centred again
- [x] Scroll takes the package apart (rest → split → solo → exit), pinned at every width with a
      viewport ≥ 34 rem tall; tap to hold the disc; focus-revealed pause button
- [x] Checked at 1920, 1440, 1366×650, 1280, 1024, 768, 390 and 360 px, reduced motion, no JS,
      keyboard (results in §7.2)

### Phase E: project experience ✅
- [x] `CoverArt` motifs for the six releases + the private row
- [x] Rows: case-study links, cover discs, marquee rendered on first hover only, focus state, touch fallback
- [x] Case-study template with optional sections, sticky TOC with scroll-spy, credits, evidence, next release
- [x] Six case studies written from the repos (see the authenticity register)
- [x] `/proyectos/` index
- [x] Index → detail disc morph (cross-document View Transitions, progressive enhancement)

### Phase E2: Projects as A24's disc gallery (2026-10-30) ✅
Jorge's brief "Interactive CD Gallery" (A24 by Ravi Klaassens as the primary reference, plus his
marker-arrow image). Composition: ART_DIRECTION §5.2; motion: MOTION_SYSTEM §2.2; contract: IA §3.
- [x] Reference re-observed live (composition, type sizes, interactions, detail page)
- [x] Rows and marquee removed (`TrackRow.tsx`); GSAP now serves the menu only
- [x] `ProjectSummary` derived from `Project` (one source for gallery and case study)
- [x] `useDiscCarousel` primitive: drag, flick projection capped at one disc, critically damped
      snap, edge resistance, shared selection for drag, buttons, keys and clicks
- [x] `DiscGallery` (discs on a diagonal in CSS 3D, poses in `discPose.ts`), `QuickResume`
      (A24 credits, serif title change-over), `MarkerArrow` + "Haz clic para saber más"
- [x] Bodoni Moda 400 (OFL, 12.6 kB) as `--font-serif`, scoped to the gallery title
- [x] `CoverArt rim`: discs with rim credits no longer print the track number under them
      (gallery, case-study cover, index). The social cards still do (§4, question 22)
- [x] Case study: "Volver a proyectos" (reopens the gallery on that disc) and "Pendiente de
      documentar" placeholders for missing core sections
- [x] Checked at 390, 768, 1024, 1366, 1440 and 1920 px, reduced motion, no JavaScript,
      keyboard, touch, axe-core and frame pacing (results in §7.3)
- [x] Second pass (Jorge's brief "Controles físicos — ReIcon"): the text buttons and count
      became two icon keys, ReIcon `SquareArrowsLeft` / `SquareArrowsRight` (same library, so
      no mirroring), bottom-left corner of the frame, `currentColor`, discreet hover, focus
      and disabled states. The exact SVG the brief mentions was not attached; this is the
      library's double chevron in a rounded square (§4, question 24)

### Phase E3: TASK 01, visual and functional corrections to the gallery (2026-10-30) ✅
Jorge's brief "TASK 01 — Corrección visual y funcional de Projects CD Gallery": a correction of
the existing gallery, not a rebuild. A24 re-observed live (references.md #2, TASK 01 notes);
motion: MOTION_SYSTEM §2.2; contract: IA §3. Results in §7.4.
- [x] **Path**: the stops table became one continuous function of the offset (`TRACK` in
      `discPose.ts`): `x` integrates the scale, `y` is a gentle arc (`−0.25·x − 0.07·x²`), plus
      bank, yaw, the label's turn, opacity and depth. Drag interpolates it, release snaps (the
      carousel itself is unchanged). How many neighbours are shown is CSS (`--shown-prev`,
      `--shown-next`); the second previous disc appears on frames ≥ 940 px tall
- [x] **Arrow**: Jorge's original image, keyed out of its painted checkerboard by
      `scripts/extract-marker-arrow.py` (colour-to-alpha against the known squares, ink kept
      translucent, JPEG fringe and noise dropped; `marker-arrow.webp`, 370×236, 27.8 kB, lazy).
      Shown as is (mirrored to point back at the disc), laid in place at rest. The SVG redrawing
      is gone. Its tip clears the selected disc's rim by 16–23 px on every size measured
- [x] **Hover**: `HandCircle` (new decorative component: geometry only, path generated by
      `scripts/generate-hand-circle.mjs`), in the disc's plane, drawn in and turning
      (`--dur-orbit`, new token), retraced on leave; static under reduced motion; none on touch
- [x] **Controls**: the ReIcon keys from the second pass stay (they are the agreed double
      chevrons); the `01 / 06` count is back between them
- [x] **Stability**: the title area is two lines tall on narrow screens, so the discs below the
      credits no longer jump 30–40 px when a two-word title is selected
- [x] Not edited, as the brief asked: `AGENTS.md`, and `docs/ART_DIRECTION.md` (there is no
      `DESIGN.md`; ART_DIRECTION is the design guide it refers to). What they now get wrong is
      listed below for TASK 02

**Constraints and stale rules found, for TASK 02**
1. *ART_DIRECTION §5 (objects)*: "Objects are drawn with CSS and inline SVG, except the hero's
   disc, cover and hand" and the Marker arrow row ("drawn by hand… after Jorge's reference
   image, never its checkerboard… `multiply`… draws itself on mount") no longer hold: the arrow
   is now Jorge's raster artwork. Needs the same kind of exception the hero has, and a row for
   `HandCircle` (pen loop, ink, decorative, motion only on hover).
2. *ART_DIRECTION §5.2*: the diagonal and its stops (`x` 0.8 / 1.38 / 1.84, `y` 0.25 / 0.44 /
   0.58, one previous disc), "the arrow draws itself" and "No visible count here" describe the
   pre-TASK 01 gallery. MOTION_SYSTEM §2.2 has the current path.
3. *AGENTS §6 / ART_DIRECTION*: a new token must be documented in ART_DIRECTION; `--dur-orbit`
   is documented only in MOTION_SYSTEM §3 for now.
4. *AGENTS §5 (repository map)*: misses `HandCircle`, `scripts/extract-marker-arrow.py` and
   `scripts/generate-hand-circle.mjs`.
5. *AGENTS §8 / MOTION_SYSTEM §2*: "nothing loops forever" had one exception (the hero disc);
   the hover loop's turn is a second, bounded by the hover. Worth stating in AGENTS too.
6. *The credits limit the composition*: their height is fixed in rem (kicker, h2, a two-line
   serif title, two rows), so on wide screens under ~940 px tall only one previous disc fits
   beside them. A typographic pass in TASK 02 changes that budget; `--shown-prev` is the knob.
7. *The base reset* (`img, svg, video, canvas { max-width: 100% }`, base.css) clips any
   decorative SVG meant to overhang its box (the loop needed `max-width: none`).
8. *The arrow is translucent ink*: correct on paper, but it must never sit over a disc (it would
   show through). The layout guarantees it today (§7.4); a redesign must keep that.
9. *Brand colour*: the arrow's blue is the artwork's own (median ink #0049A2 at ~60 % opacity,
   ≈ #6893CA on white), not `--color-brand` (#409FEA). ART_DIRECTION calls the arrow "brand
   blue".

### Phase F: supporting chapters ✅
- [x] Liner notes, Services, About (pass, milestones, instruments), Bonus track, Back cover, Footer, 404

### Phase G: validation ✅ (results in §7)
- [x] `npm run build` (assets, types, client + SSR builds, prerender, SEO checks)
- [x] Headless checks: console errors, hydration (dev build, all routes), overflow, no-JS, reduced motion, keyboard menu
- [x] axe-core scan; Lighthouse (mobile and desktop) on the production build
- [x] Visual review at 1440, 1366, 1280, 1024, 768, 390 and 360 px

---

## 3. Performance budget (production build, per page, first load)

| Item | Budget | Measured (2026-10-26) |
|------|--------|-----------------------|
| JavaScript (gzip) | ≤ 120 kB | **103.6 kB** initial after TASK 01 (2026-10-30; 102.6 kB before it); 101.4 kB with the first disc gallery (100.6 kB on 2026-10-29, 98.8 kB just before the hero scene, 96.7 kB on 2026-10-26; GSAP, 27.5 kB, loads on idle or first use). Before: 228 kB |
| CSS (gzip) | ≤ 20 kB | 14.2 kB after TASK 01, 14.1 kB before (2026-10-30; 13.1 kB on 2026-10-29, 12.7 kB on 2026-10-26), inlined into each page |
| Fonts | ≤ 80 kB | 61 kB preloaded (Estrella + Poppins 400/800); 28.6 kB more on demand (Poppins 600/700, Bodoni Moda 12.6 kB since 2026-10-30) |
| Hero images | ≤ 60 kB | **Over budget since 2026-10-29**: 78 kB desktop, 128 kB on 2× screens, 112 kB on a 3× phone, logo included (disc 21 kB AVIF, cover 22–63 kB, film 14–23 kB, hand 11 kB, logo 10 kB; measured after the recomposition, when the cover grew to ~430 px wide). Jorge's photographic scene replaced 36 kB of CSS objects; see §4, question 13 |
| LCP (Lighthouse mobile, simulated) | ≤ 2.5 s | 2.8 s home (2026-10-29, LCP element now the hero disc image; was 2.7 s on the rim text), 2.6 s case study, 2.1 s index. Observed (unthrottled) LCP ≈ 0.1 s |
| CLS | ≤ 0.05 | 0.001 |
| Long tasks during load | none > 200 ms | TBT 0 ms |

The simulated mobile LCP misses the budget by 0.1–0.2 s on two pages. The LCP element is the
hero disc's rim text, painted on the first frame; the simulator adds the preloaded fonts to its
dependency chain. Removing the Poppins preloads made FCP worse (tested), so they stay.

---

## 4. Open questions for Jorge ⛔

These are kept **off the site** until confirmed:

1. **Estrella licence**: the font embeds no licence. Is web embedding and redistribution in a public
   repo allowed? (Designer field: "Uncarving".)
2. **Atlaxia**: several public repos (corporate site, SCADA dashboard demo) and `client-leads`
   modules reference ATLAXIA. Should it appear, and what is the relationship (client, employer,
   co-founder)? `client-leads` is described without naming the company until then.
3. **Mathgeon context**: was it academic (course, hackathon)? It is described as a two-person
   project with Jorge's own share, from the commit history.
4. **Services not evidenced yet**: WordPress / WooCommerce, booking systems. Not advertised.
5. **Location**: only "España" is stated. A city would help local search.
6. **About narrative and principles** are drafted from public facts; Jorge should review the voice.
7. **Component library**: name, scope and whether a real waitlist is wanted (see §5).
8. **Deployment**: replacing v2 on GitHub Pages is an owner decision (see §5).
10. **Availability** (`site.availability` in `src/content/site.ts`) says "Disponible para nuevos
    proyectos", carried over from the previous config. Flip it when that changes.
11. ~~Hero brief, sections 1–4~~: answered by the full brief and the sketch (2026-10-29, Phase D3).
    One deliberate departure: the sketch puts the box left of the disc; the build mirrors it
    (box right) because the disc prints its name on its left half and the hand photo grips a
    right edge (ART_DIRECTION §5.1). Say if you want the sketch's side anyway: it needs a disc
    with its print on the right, or a hand that grips a left edge.
12. **Hand image**: source and licence unknown (hash-named download, stock photography, an
    exception to ART_DIRECTION §7 made because the brief asks for it). The shrink-wrap and
    jewel-case photos are not used. Confirm the hand may be published, or send a replacement.
13. **Hero weight**: the scene costs 78–128 kB of images against a 60 kB budget (LCP measured at
    2.8 s simulated before the recomposition, not re-measured). Accept the new budget, or trim
    (a smaller cover file on 2× screens).
16. **The hand photo limits the composition**: it is 360 px wide, so it is soft at the size it is
    shown (≈ 1.4× at 1×, 2.8× on 2× screens), and its forearm is short, which fixes the grip at
    62 % of the edge (the frame's edge has to cut the arm above the photo's own cut). Result: the
    palm covers the right half of the cover's printed JA and the thumb rests on the knee in the
    photo. A ≥ 1200 px photo of a hand holding a square object by its edge, with the forearm
    leaving the frame (any side), would fix all three.
17. **The sketch is in `public/`**: `public/images/Imagen de ChatGPT 29 oct 2026, 20_38_52.png`
    (1 MB) is copied into `dist/` and would be published. Move it out of `public/` (for example to
    `docs/`) or delete it.
18. **Name styling**: the hero shows "Jorge arcas verdejo" (lowercase, as in the sketch's
    "Jarcas") because Estrella's capitals A and V start with a stroke that reads as a hyphen; the
    text itself is "Jorge Arcas Verdejo". Role written "Freelance Software Developer" (asked as
    "freelancer software developer"). Confirm both. The `Monogram` component is now unused.
14. **Artwork resolution and copy**: the disc art is 512 px, so its small print is soft on 2×
    screens and illegible on phones; a 1024–1536 px export would fix it. The disc says
    "FREELANCE SOFTWARE ENGINEER" and "VOL. 01" while the site says "Desarrollador full-stack
    freelance" and catalog `JRG-003` (third portfolio): intended?
15. **Source files**: the four originals in `public/images/brand/` (`cdJorge.png`,
    `jorgeCDsleeve.png` and the two hash-named JPEGs, ~800 kB) are not referenced but are copied
    into `dist/`. Move them out of `public/` (or delete them) once the exports are final.
9. The six GitHub social-card PNGs in `public/images/projects/*.png` are no longer referenced. They
   were never committed, so they are left in place for Jorge to keep or delete.
19. **Serif (2026-10-30)**: the brief asks for A24's serif titles with the project's families
    "preferably"; there was no serif, so Bodoni Moda (OFL) was added for the gallery title only
    (ART_DIRECTION §3.1). Keep it, swap it (one token, `--font-serif`), or drop it for Poppins?
    Should the case-study title use it too, for continuity with the disc?
20. **Arrow source in `public/`**: since TASK 01 the site shows `marker-arrow.webp`, extracted
    from `public/images/gallery/cd7e159e….jpg` (17 kB). The JPEG itself is not referenced but is
    copied into `dist/` and would be published. Move it out of `public/` (and update `SRC` in
    `scripts/extract-marker-arrow.py`) or delete it once the WebP is approved.
21. **Counts**: the gallery shows `03 / 06` (six discs, each opens a case study); case studies
    and the footer count seven tracks (`Pista 03 / 07`, the private row included). Keep both, or
    drop the private track from the numbering, or give it a disc that opens contact?
22. **Social cards**: `OgCard` still prints the track number under the rim credits (fixed in the
    site with `CoverArt rim`). Changing it needs `npm run og` (Playwright), not run here.
23. **Copy to confirm**: "Haz clic para saber más" stays on touch screens (as written in the
    brief); the gallery's `Descripción` is each project's tagline and `Stack` its first three
    technologies (e.g. Client Leads shows "Python 3.11 / SQLite / httpx", not Twenty CRM). Say if
    any project should show a curated stack.
24. **Control icon**: the brief says to use "exactly the double-chevron SVG provided", but no
    SVG came with it; the build uses ReIcon's `SquareArrowsLeft` / `SquareArrowsRight`, which
    match the description (double chevron, rounded square, same weight). Send the SVG if it
    differs and it will replace them in `Icon.tsx`. TASK 01 calls them "the agreed ReIcon double
    chevrons", so they stay; still no separate SVG file.
25. **Two counts (TASK 01)**: the brief asks to keep `01 / 06` with the keys, and the credits
    already show it (`Proyecto · 03 / 06`). Both are on screen now. Keep both, or drop the one in
    the credits?
26. **Arrow resolution**: the original is 450×300 (the stroke 353 px wide). It is shown 130–250
    CSS px wide, so on 2× screens it is upscaled up to 1.35× (1920 px) and a little soft. A
    larger export (≥ 800 px wide, ideally a real transparent PNG) would be sharp everywhere; the
    script handles a checkerboard or a clean alpha.
27. **Neighbour scale**: A24 grows the next disc; the gallery keeps Jorge's earlier rule (both
    neighbours smaller). `TRACK.scaleNext` above 1 gives A24's version if wanted.

---

## 5. Backlog

- **Real waitlist** for the component library: needs a provider or endpoint (GitHub Pages is
  static), double opt-in, a privacy notice and an RGPD consent line. Until then the CTA is a
  `mailto:`.
- **English edition** under `/en/` with `hreflang`, written (not machine translated).
- **Deploy**: GitHub Actions workflow building `dist/` and publishing to Pages on
  `portfolio.jarcas.dev`; set `og:image` URLs absolute (already absolute in the head builder).
- Case-study screenshots for `client-leads`, `gitchange` and `Disco Download` (today they use
  diagrams and real command excerpts).
- Tests: unit tests for the head builder and route table; Playwright smoke test in CI.
- **Hero → Projects hand-off**: read `--scene-exit` (or name the disc for a view transition) in
  the Projects opening so the disc's exit continues into the chapter (MOTION_SYSTEM §2.1). Still
  open after the gallery (2026-10-30).
- **Final disc art** per project: the gallery shows generated covers until Jorge's artwork
  exists; `ProjectSummary.disc` is where real art would plug in.
- Trackpad horizontal swipes over the gallery are not handled (only drag, buttons and keys), to
  stay clear of the browser's back/forward gesture and of wheel capture.
- **Home social card**: `OgCard` still draws the CSS CD-R; redraw it with the hero artwork and
  re-run `npm run og`.
- **Obi strip** (references.md #8): rotated catalog metadata on the hero's edge, desktop only.
- **No-animation reading path** link, as Boccia offers, if long animated sequences are ever added.
- Regenerate social cards (`npm run og`) whenever a title, tagline or cover changes.

---

## 6. Carried over from the 2025-12 defect register

| ID | Defect | Status |
|----|--------|--------|
| D1 | Lorem ipsum in About | Resolved by the new About copy |
| D2, D13 | Dead nav links, missing section ids | Resolved; anchors are absolute and every chapter has an id |
| D3 | Placeholder project images | Resolved by generated covers and real evidence images |
| D9 | No metadata | Resolved per route |
| D17 | No `base` for Pages | Not needed: custom domain at the root |
| D18 | 828 kB single chunk | Resolved: 793 kB / 228 kB gzip → 304 kB / 96.7 kB gzip initial (Three.js removed, GSAP on demand) |
| D19 | Unoptimised rasters | Resolved for every image the site references |
| D20 | Reduced motion ignored by JS loops | Resolved in each primitive |
| D24, D25 | Focus, fixed-menu click-through | Kept fixed; menu semantics improved |

---

## 7. Validation results (2026-10-26)

Local production build served with `vite preview`; Chrome headless; Lighthouse 12.8.2 with
simulated throttling; axe-core 4.14. Real hosting adds compression and HTTP/2, so field numbers
should be equal or better, but these are the numbers that were measured.

| Page | Mobile perf / a11y / best practices / SEO | Mobile LCP · CLS · TBT | Desktop |
|------|------------------------------------------|------------------------|---------|
| `/` | 95 / 100 / 100 / 100 | 2.7 s · 0.001 · 0 ms | 100 / 100 / 100 / 100, LCP 0.6 s |
| `/proyectos/moneyman/` | 96 / 100 / 100 / 100 | 2.6 s · 0 · 0 ms | 100 / 100 / 100 / 100, LCP 0.6 s |
| `/proyectos/` | 99 / 100 / 100 / 100 | 2.1 s · 0 · 0 ms | 100 / 100 / 100 / 100, LCP 0.5 s |

- **axe-core** (WCAG 2.0/2.1/2.2 A and AA + best practices): 0 violations on all 9 routes at
  1440 and 390 px.
- **Build gates**: asset check (33 references), `tsc`, client + SSR builds, prerender (9 pages),
  SEO check (9 pages) all pass.
- **Hydration**: development build, all 9 routes, no warnings; DOM nodes preserved (true hydration).
- **JavaScript disabled**: full content, one `h1`, 52/52 reveal elements visible, "Índice" link
  replaces the menu toggle.
- **Keyboard menu** (normal and reduced motion): focus moves into the dialog, 30 Tab presses never
  leave it, Escape closes and returns focus, chapter links scroll and move focus.
- **Horizontal overflow**: none on 5 routes at 360, 390, 768, 1024 and 1440 px.
- **Hero actions above the fold**: yes at 1440×900, 1366×768 and 390×844; 2–10 px below at
  1280×720 and 1024×768, where the header "Hablemos" action stays visible.
- **Navigation**: index → case study → next release → back → index → case study and an unknown URL
  (404) with no console errors; cross-document view transitions active in Chrome.

### 7.1 Hero scene (2026-10-29)

Same setup (production build, `vite preview`, Chrome headless, Lighthouse 12.8.2).

- **Lighthouse `/`**: mobile 95 / 100 / 100 / 100, LCP 2.8 s (three runs), CLS 0, TBT 0 ms;
  desktop 100 / 100 / 100 / 100, LCP 0.6 s. LCP element: the hero disc image.
- **Disc visible at rest** (sampled with `elementFromPoint` over the disc, hole and rim excluded):
  83.4–83.7 % at 1024, 1280, 1440 and 1920 px wide and 768 px tablet; 80.9 % at 390 px.
- **Turn**: running at load; eases to `playbackRate` 0 within ~0.6 s under a hovering mouse and
  back on leave; the control toggles it ("Pausar giro" ↔ "Reanudar giro") and is the first focus
  stop in the hero with a visible ring; paused while the hero is off-screen, resumes on return.
- **Reduced motion**: no animation on the disc, control hidden, hero height 900 px at 1440×900
  (no extra scroll), `--scene-*` never written. **No JavaScript**: same still composition,
  control hidden, full copy.
- **Overflow**: none at 360, 390, 768, 1024, 1280, 1366, 1440 and 1920 px. No console errors or
  hydration warnings.
- **Hero actions above the fold**: both at 1440×900, 1366×768 and 390×844; primary only at
  1024×768 and 768×1024; 4 px below at 1280×720; 29 px below at 360×740 ("Hablemos" stays in the
  header).

Comparison captures (first viewport, before and after this refactor) live in
[`docs/evidence/`](evidence/): `2026-10-26-before-desktop.webp` vs `2026-10-26-after-desktop.webp`,
`2026-10-26-before-mobile.webp` vs `2026-10-26-after-mobile.webp`, and
`2026-10-26-after-case-mobile.webp`. Hero scene: `2026-10-29-hero-desktop.webp` (rest),
`2026-10-29-hero-desktop-solo.webp` (disc centred), `2026-10-29-hero-mobile.webp`.

### 7.2 Hero recomposed from the sketch (2026-10-29)

Same setup; Lighthouse not re-run.

- **Disc visible at rest** (`elementFromPoint` grid over the disc, sleeve and hand made
  hit-testable, off-screen counted as hidden), last measured after the header change
  (full-viewport frame): 80.2–80.5 % at 1024×768, 1280×800, 1366×650, 1440×900 and 1920×1080;
  77.8 % at 768×1024, 75.9 % at 390×844, 76 % at 360×740. The disc's printed name, role and
  `VOL. 01 / 2026` are 100 % visible at every size; the credit never touches the disc.
- **Transparent header and scroll bounds** (1440×900 and 390×844, eight states: start, middle,
  end of pin, hero → projects, projects entering, projects, back cover, back to the middle; then
  "Inicio" from the menu): 0 of 288 sampled points over other sections hit a hero element in any
  state; no horizontal overflow; the pin releases at the end of the run; `--scene-exit` reaches 1
  when Projects is at the top; scrolling back gives the same values; "Inicio" returns to 0 with
  the scene at 0; the header tone is night only over the back cover; focus ring visible on both
  tones; no console errors.
- **Scroll**: rest → split → solo → exit checked at 1440, 1024, 768 and 390 px; the disc never
  crosses the copy, the case leaves along the forearm, the end of the arm is never visible.
- **Pause**: a tap or click on the disc sets `playbackRate` 0 and the next one restores 1 (mouse
  and touch); the focus-revealed button appears under the header actions with the accent ring,
  and Enter toggles it ("Pausar giro del disco" ↔ "Reanudar giro del disco").
- **Reduced motion**: still composition, no pin, normal scrolling. **No JavaScript**: the same
  still composition, no hidden content.
- **Overflow**: none at any size above. No console errors.
- **Weight**: hero images 78 kB (1440 @1×), 128 kB (1440 @2×), 112 kB (390 @3×); CSS 13.0 kB
  gzip, JS 100.4 kB gzip.

Captures: `2026-10-29-hero-sketch-desktop.webp` (rest), `-desktop-split.webp`,
`-desktop-solo.webp`, `2026-10-29-hero-sketch-mobile.webp`.

### 7.3 Projects disc gallery (2026-10-30)

Production build served with `vite preview`; Chrome headless through Playwright (scripts kept
out of the repo) and the real Chrome window (GPU, 120 Hz) for frame pacing. Lighthouse not run.

- **Overlap and bounds** (8 sizes × 3 selections: 360×740, 390×844, 768×1024, 1024×768,
  1280×800, 1366×650, 1440×900, 1920×1080; first, third and last disc): no disc under any
  credit text, control or annotation text (`elementsFromPoint` grid); the marker arrow never on
  the selected disc's print (61 points along its stroke); annotation (box and text) and controls
  inside the frame; no horizontal overflow. Same with reduced motion (1440, 390) and without
  JavaScript (1440, 390).
- **Interaction**: a pointer click on a secondary disc selects it without navigating; a click on
  the selected disc opens its case study; a slow 240 px mouse drag released over the selected
  disc moves one disc and opens nothing; a 300 px flick in 8 ms moves two (one dragged, one of
  inertia, the cap); `→` and `Inicio` move the selection and keep focus on the selected disc;
  `←` at the start does nothing; Tab goes selected disc → "Proyecto anterior" → "Siguiente
  proyecto" → foot; the wheel over the gallery scrolls the page (300 px); touch: a horizontal
  swipe changes disc, a vertical one scrolls the page, a tap opens the case study.
- **Return**: "Volver a proyectos" lands on `/#proyectos` with the frame's top at the viewport's
  top and the gallery on the same disc (Portfolio v2 → Portfolio v2).
- **Frame pacing** (real Chrome, 1512 px, 2× screen, 120 Hz): six button changes and one drag,
  every frame ≤ 9.5 ms (median 8.3 ms). Before giving the printed face its own layer: about
  20 frames of ~58 ms per change.
- **axe-core 4.10** (WCAG 2.0–2.2 A/AA + best practices): 0 violations on `/`,
  `/proyectos/portfolio-v2/` and `/proyectos/moneyman/` at 1440 and 390 px.
- **Build gates**: asset check (39 references), `tsc`, client + SSR builds, prerender (9 pages),
  SEO check pass. No console errors in production (development shows a view-transition abort
  because Vite injects the CSS after the page is revealed).
- **Weight**: JS 101.4 kB gzip initial (+0.8 kB), CSS 14.1 kB (+1 kB), Bodoni Moda 12.6 kB on
  demand. After the ReIcon keys: JS 102.6 kB (each icon module ships its outline and filled
  drawings), CSS 14.0 kB.
- **Keys** (second pass, same setup): the 24 overlap states above still clean (no disc ever
  under a key); three clicks within ~60 ms move exactly three discs; Enter on "Siguiente
  proyecto" to the last disc keeps focus on the key, which turns `aria-disabled`, and one more
  Enter does nothing; hover gives the accent blue; the focus ring keeps full contrast on a
  disabled key; axe-core still 0 violations on `/` at 1440 and 390 px.

Captures: `2026-10-30-projects-gallery-desktop.webp` (1440×900, third disc selected),
`2026-10-30-projects-gallery-mobile.webp` (390×844, first disc).

### 7.4 TASK 01: arc, arrow, hover loop, keys (2026-10-30)

Production build with `vite preview`; Chrome headless through Playwright (scripts kept out of
the repo). Not checked in Safari or Firefox, and not on the GPU at 120 Hz.

- **Overlap and bounds** (8 sizes × 3 selections, as in §7.3): no disc under any credit text,
  control, count or annotation text; arrow ink (sampled from its alpha) on no disc and no
  credit; annotation and controls inside the frame; no horizontal overflow. Same with reduced
  motion (1440, 390, two selections) and without JavaScript (1440, 390).
- **Credits clearance matrix** (7 widths × 8 heights, 1024–1920 × 650–1080, the four
  selections that show a second previous disc, text boxes padded by 8 px): 0 hits once the
  second previous disc is limited to frames ≥ 940 px tall (before that limit: up to 93 hits at
  650 px, 1–4 at 900 px).
- **Arrow gap** to the selected disc's visible rim: 16 px (360), 18 (390), 23 (768), 10 (1024×768),
  16 (1440), 21 (1920). Extraction: mean error 2.3 levels against the source on its white squares;
  no checkerboard, halo or noise left (checked on a contrasting checkerboard).
- **Drag** (1440, 520 px slow drag then release): every disc moves continuously along the arc
  (largest step between frames 23 px, during the snap; size changes ≤ 10 px per frame, with a
  smooth peak at the centre); released at 3.39 it settles on disc 4; nothing opens.
- **Hover**: the loop is centred and in the disc's plane on the selected and on a secondary disc;
  drawn in, turning (rotation 108° after 2.6 s), `pointer-events: none`, no overflow; on leave
  it fades and its turn pauses where it was; reduced motion: whole, still, no animation; touch
  (`hover: none`): never shown.
- **Interaction** (§7.3 script re-run): secondary click selects, selected click opens the case
  study, 240 px drag moves one disc and opens nothing, `→` / `Inicio` / `←` at the start, Tab
  order disc → keys → foot (the count is not focusable), wheel scrolls the page, touch swipe
  and tap. Keys: Enter on the disabled previous key does nothing and keeps focus; Enter on the
  next one moves one disc and the live region says "Proyecto 2 de 6: Client Leads".
- **Stability** (390 and 768): the stage's top no longer moves between projects (it moved
  30–40 px with two-word titles).
- **axe-core 4.14** (WCAG 2.0–2.2 A/AA + best practices): 0 violations on `/` at 1440 and 390.
- **Cost** (Chrome trace, 1440 @2×, five changes, a hover and a drag): paints ≤ 0.8 ms, style
  recalculation p95 2.7 ms per frame, 17 layouts in total.
- **Build gates**: asset check (40 references), `tsc`, client + SSR builds, prerender (9 pages),
  SEO check pass.

Captures: `2026-10-30-task01-before-desktop.webp` / `-after-desktop.webp` (1440×900, third disc),
`-before-mobile.webp` / `-after-mobile.webp` (390×844), `-after-desktop-1920.webp` (two previous
discs), `-hover-ring.webp`.
