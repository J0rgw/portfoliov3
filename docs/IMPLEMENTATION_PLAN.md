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

### Phase D4: the diagonal hero (2026-11-10) ✅
Jorge picked one of three layout studies (name across the top, name stacked left, diagonal),
supplied his arm photo and the cover at 1200 px, and asked for the tape and the train to go.
- [x] Name in two lines of Poppins 800 top left, sized with the disc (`--name`, measured line
      widths 5.716 em / 3.734 em); role and statement bottom left; the `h1` keeps both
- [x] Disc under the name's first line, sleeve to its lower right; the arm photo replaces the
      stock hand: thumb on the film, the sleeve's edge in the thumb's crotch (measured by
      `scripts/prepare-hero-art.py`), forearm out through the frame's edges, so the set no
      longer has to stand on the bottom edge; film creases regenerated for `--grip: 0.6`
- [x] Headphones hung over the right edge under the header's controls (the study's spot hit
      "Menú"); knob past the role; sticker on the film. Removed: tape, train (registry,
      recipes, `train` phase), ink loop, "!!". The stock hand files stay on disk, unused
- [x] Cover files rebuilt from the 1200 px original (+1200 w) with dark variants; landscape solo
      keeps the disc where it rests; credit exit parallax −0.15
- [x] Checked at 1024×768, 1280×800, 1440×900, 1512×734, 1920×1080, 768×1024, 390×844, both
      themes, reduced motion, no JS: no overflow, no console errors, disc ≥ 14 px from the
      name's glyphs through the run, sleeve out of the frame when solo ends

### Phase D5: the hand that grips, the sharp disc, the handed-in entrance (2026-11-10) ✅
Jorge confirmed the arm is his, flagged it as not adjusted (his palm stood off the sleeve with
a gap under the thumb), supplied the disc at 1200 px and asked for a creative pass.
- [x] Grip, after three rounds of Jorge's notes (palm standing off the sleeve; then a hand
      turned 22°, crooked; then a hand hidden behind the sleeve, cut off): his photo's hand
      hangs below the thumb, so it grips low. Final: `--grip: 0.74`, crotch 8 % inside the
      edge, the photo turned −6° to follow the sleeve, `--arm` 1.94 sleeves (thumb a third of
      the sleeve), one copy in front: thumb level across the lower cover, palm over the edge,
      wrist out through the bottom-right corner. Jorge called it almost and sent a photo of
      his hand holding a real case: the case and its private photo are cut away
      (`scripts/prepare-hero-art.py`, skin kept inside the case's fitted outline, the cut-out
      tool's white halo dropped), and the sleeve is laid where the case was (its top-right
      corner, its 4.9° turn, its 650 px insert as the cover), so the grip is real; film
      creases redrawn for it. The original photo lives in the git-ignored `private/` (not
      served, not committed): the case frames a private photo
- [x] Disc: `cdJorge_1200px.png` cut out of its black ground (centre, rim and hole measured on
      72 rays), disc-560/800/1190 in WebP and AVIF plus dark files; ThemeImage now passes
      `sizes` to its AVIF source. The old 512 px disc files stay on disk, unused
- [x] First paint: name lines rise, disc lands spinning, hand brings the sleeve up, cut-outs
      slapped after (MOTION_SYSTEM §2.1); film sheen and disc highlight follow the pointer
- [x] Hidden track: an ASCII disc and a note in the console (`config/hiddenTrack.ts`,
      `ui/HiddenTrack`, mounted in PageShell)

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
6. *The credits limit the composition*: their height is fixed in rem (h2, a two-line
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

### Phase F2: critique fixes (2026-11-10) ✅
`/impeccable critique` of the home page scored 29/40 (snapshot in `.impeccable/critique/`);
Jorge chose quick fixes first, all five issues, and a job for the hold rather than a shorter one.
- [x] About pass portrait sized by its window's height: 7 % of the photo (the cap's crown) is
  cropped at every width, against 38 % (the face) at 1024 px and below before.
- [x] Removed: the About narrative's 8 px accent stripe, the dead 3 px stripe on the notes, the
  Estrella words beside the Process, Services and Bonus headings, the second "Notas del libreto".
- [x] Header veil past the hero, matched to the ground behind it (`data-ground`, layout.css).
- [x] Middle chapters as objects: Process on the page ground with a saddle-stitched booklet whose
  page turns, notes as paper slips; Services printed as a tracklist insert; About notes signed.
  Paper's soft shadow made visible in dark (`--shadow-object-soft`).
- [x] The hold's job: the marker underlines each chapter's phrase as the hold is used up
  (`ChapterHold`, `useChapterHold`, `PenMark`; phrases in config, checked by `test:config`).
- [x] Polish: the dark promo insert is the plain raised stock (`--accent-tint: 0%`), light
  `--surface` is `#fcfdff` (not pure white), the gallery hint says "Toca" on touch screens,
  the home footer drops the contact column the back cover has just listed.

### Phase F3: second critique (2026-11-10) ✅
The re-run scored 30/40 with no P1 (run 1's snap overshoot was a measurement artifact of the
browser tool's single large wheel events; real 100 px notches snap only within ~280 px of a
chapter start). Jorge chose the labels first, printed metadata only, all four issues.
- [x] Small mono capitals only where an object prints them: 36 → 10 on home (the pass, the
  booklet's running head, the back cover's spec rows, two controls); "Nota técnica" kept for
  screen readers only; "Lo he hecho en:", the About credits, the bonus status, the gallery hint
  and the footer headings in sentence case.
- [x] "Avísame*" just under its heading (55 px against 60 px at 1512 px; it was 101 px).
- [x] The header stays clear over the hero's pinned run only (`.hero__clear`): the name now
  leaves under the veil, not under the logo.
- [x] Dark paper: no outline but a lip of light on the top edge (`--paper-border`,
  `--paper-lip`), and a hairline spine crease for the booklet's staples.

### Phase F4: third critique and the open questions (2026-11-10) ✅
The third run scored 30/40 with no P0–P2 issues; Jorge took two of its three P3s (the third,
naming the stack logos, sits in the Projects section he will rework) and answered Q39–43.
- [x] The header veil fades out by 88 px (solid to 54 px), so art passing under it fades
  instead of being sliced.
- [x] The track playing: "02 Proceso" beside the mark on home, from the header's observer,
  and the same chapter marked in the menu (`aria-current="location"`).
- [x] The JA monogram replaces the "Jorgw" wordmark; the theme switch is gone; About's logo
  strip is gone; the timeline runs newest first.

### Phase F5: deslop pass (2026-11-10) ✅
Jorge's brief `.impeccable/critique/desloping.md` (remove AI-template patterns without
redesigning); audit table and findings in `.impeccable/critique/2026-11-10T21-55-24Z__deslop-audit.md`.
Base components first, then sections; the Projects section, `/proyectos/` and the case studies
were audited but not touched (Q39: Jorge's own rework).
- [x] Middots between data: About's timeline (role, then place on its own line), the projects
  line ("MoneyMan, Client Leads, Disco Download y gitchange"), the instruments (comma lists),
  the languages ("Español nativo e inglés profesional", About and back cover), the pass badge,
  the footer's "··" before the full index (now a link with an arrow). `check:architecture`
  fails on a middot in copy, with an allowlist for object print, titles, social cards and the
  Projects pages.
- [x] Redundant text: the timeline's category column (Charla, Trabajo…), "Créditos" on the
  pass, the bonus's status badge (heading and body already say it), the menu's "Tracklist"
  label, the 404's sentence that restated its heading.
- [x] Badges and decoration: Process's circled step numbers are numerals on the thread (active:
  functional accent and bold; the ground behind them carries the page grain), the booklet's
  accent underline, the menu dot's halo.
- [x] Rules: inside a Services track (outcome/scope, evidence/action) and the action's card
  footer (now an inline sentence-case link), the doubled rule under the back cover's statement,
  the rule after About's signed notes, the rule before Process's closing question.
- [x] Prevention: DESIGN.md (separators, "Decisions"), AGENTS.md, IA §3–4, references status.
- [x] Checked: build and all checks pass (CSS 16.79 → 16.66 kB gzip); no horizontal overflow
  at 320, 360, 390, 768, 1024, 1280 and 1440 px on five routes in both themes; no console
  errors; without JavaScript the home page shows no middot; menu keyboard (focus in, Tab
  contained, Escape returns focus); the step being read measured as #206DA5/700 (light) and
  #E88B40/700 (dark), the others muted/400.
- [ ] For Jorge's Projects rework (not changed here): middots in credits and statuses
  (`projects.ts` "En desarrollo · sin desplegar", "Versión funcional · 2025", "Privado · NDA";
  stack and technology joins on the index and the case study; "Siguiente pista · 03"); the
  index's four mono-caps labels on every card (24 on the page); the case study's 2 px rule on
  top of every section plus a hairline under it, "Volver a proyectos" above breadcrumbs that
  lead to the same place, the "Contenido" label, circled decision numbers, and the evidence
  flow's boxed rows with mono-caps tags; the gallery's stack logos unnamed on touch (critique
  run 3). The social cards keep their printed middots (rim, catalog line) as object print.

### Phase F6: one frame per chapter (ADR-001, 2026-11-10) ✅

Jorge: bring every section after Projects, and the Projects pages, up to the hero's and
Projects' language; less text and fewer lines so each chapter fits the smooth-scroll hold and
stays in place; a decision record to follow the change. Record, status table, removed copy and
measurements: [`docs/adr/ADR-001-chapter-frames.md`](adr/ADR-001-chapter-frames.md).

- Chapters 02–06 are frames like Projects' (heading top left at Projects' size, copy at the
  foot): Proceso is a playlist on Jorge's iPod (a new cut-out) with the selected step's credits;
  Servicios a tracklist of rows; Sobre mí his portrait cut-out with one signed paragraph and the
  credits on shared columns; Bonus and Contacto make the oversized word the link ("Avísame*",
  "Hablemos"); the footer is rows of links. No paper, pass, sticker, spec table or square button
  on these pages.
- The hold only holds a chapter that fits the window (`useChapterHold`, `data-unheld`);
  Projects included since 2026-11-11 (Q49), so on phones and portrait tablets it flows.
- `/proyectos/` and the case studies: sentence-case titles, credits without small capitals or
  rules (`CreditsTable` restyled), stack marks (`editorial/StackMarks`), one back link, links
  for actions, numerals without circles, single rules; the middot exemption for the two pages
  is gone from `check:architecture`.
- Home: 12,975 → 8,365 px at 1512 × 734; 17,604 → 9,059 px at 390 × 844 (Projects flowing).

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
8. ~~**Deployment**~~ Answered 2026-11-11: Jorge approved the cut-over. Pages on `Portfoliov3`
   (Actions, `.github/workflows/deploy.yml`) serves `portfolio.jarcas.dev`; details in "Upload
   and deploy — 2026-11-11" at the end of this file.
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
20. ~~**Arrow source in `public/`**~~ Resolved 2026-11-11 (Jorge: "only upload the images we
    use"): the JPEG moved to `private/originals/gallery/` (git-ignored, never served) and `SRC`
    in `scripts/extract-marker-arrow.py` follows it.
21. **Counts**: the gallery shows `03 / 06` (six discs, each opens a case study); the footer
    counts seven tracks (the private row included). Keep both, or drop the private track from
    the numbering, or give it a disc that opens contact?
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
28. ~~**Theme toggle**~~ Answered 2026-11-02: Jorge asked for a sun/moon button left of
    «Hablemos», "even if only for debugging". Added (see "Colour system"). Decide later whether
    it stays public; removing `<ThemeToggle />` from SiteHeader is the only change needed.
29. **Arrow in the dark theme**: `marker-arrow-dark.webp` is a generated recolour of Jorge's
    stroke (accent hue, lightness lifted so it reads on carbon). Approve it, or supply an
    orange/light original.
30. **Iridescence**: the pastel data-side sheen on discs and the pass's holographic laminate stay
    as physical materials (never fills or text). Keep them, or switch both to neutral silver?
31. **Availability dot**: green `#1F9D55` is kept as a semantic state colour next to its text.
    Confirm, or move it to the accent.
32. **Rights to the cut-outs (2026-11-09)**: the files in `public/images/assets/` are downloads
    with hash names; the map pin carries a "2023 Rawpixel Ltd." copyright in its EXIF; the
    headphones, knob and phone are product-style photos; the train is a photo of a London
    Underground train; the THIS IS NOT AI sticker's author is unknown. The repo is public and
    the site will be. Confirm they may be published, or send replacements:
    `uv run scripts/extract-cutouts.py <id>` re-keys a replacement with the same recipe.
    The 2026-11-10 files (arm photo, media buttons, iPod, selection box, torn paper, a toy
    brick that may carry a trademark) need the same answer.
33. ~~**Originals in `public/`**~~ Resolved 2026-11-11 (same answer): the sources the scripts
    read moved to `private/originals/` (`assets/`, `hero/cdJorge_1200px.png`, `hero/disc.webp`,
    `gallery/`, `fonts/estrella-early.otf`) and every script path follows; images nothing reads
    (v2 leftovers, the retired tape, train, hand, wordmark, frog and monogram files, the empty
    canvas) moved to `private/unused/`. Both are git-ignored, so `public/` holds only what the
    built site requests, plus licence notices and `robots.txt`.
34. **Hero weight with the collage** (extends Q13): the first viewport's images are now
    197 kB at 1512 × 734 @1×, 322 kB @2× and 280 kB on a 390 × 844 @3× phone (78 / 128 /
    112 kB before). Accept, or trim: the train is only seen mid-scroll and could load later;
    phones could skip the headphones; WebP quality could drop from 84. After the diagonal
    hero (2026-11-10): 193 / 318 / 276 kB, measured the same way (the 61 kB arm replaces the
    hand, the tape, the train, the ink and "!!"). After Phase D5 (the 1190 px disc, AVIF):
    196 / 356 / 314 kB, the sharper disc costing ~38 kB on 2× and 3× screens.
35. **THIS IS NOT AI**: placed on the sleeve at Jorge's request (2026-11-09) as his own
    statement. Visitors may read it as a claim about the site; the commit history says its
    first prototype was made with AI. Keep it as is, or say what it should refer to.
36. **The knob turns in the plane**: the photo is a three-quarter view, so it can only turn as
    a paper cut-out (64° over the scene), not spin on its own axis. A top-down photo of a knob
    would allow a real turn up to eleven.
37. ~~Whose arm holds the sleeve~~: answered 2026-11-10, it is Jorge's.
38. ~~Disc resolution~~: answered 2026-11-10, Jorge supplied the disc at 1200 px (Phase D5).
39. ~~The marked phrases~~: answered 2026-11-10, keep them for now; Jorge will rework the
    Projects section and the projects page himself (so the Projects heading's mark, the gallery
    and its credits are his next pass).
40. ~~Trayectoria order~~: answered 2026-11-10, newest first (Phase F4).
41. ~~Logo loop and Instrumentos~~: answered 2026-11-10, the strip is dropped (Phase F4). Its
    files (`components/ui/LogoLoop`, `design/components/LogoLoop`) are left unused because they
    carry uncommitted edits git could not restore; delete them when committing.
42. ~~Theme toggle~~: answered 2026-11-10, removed (Phase F4). Its files (`ui/ThemeToggle`, never
    committed) are left unused for the same reason; the forced-theme hooks stay dormant.
43. ~~"Jorgw" in the header~~: answered 2026-11-10, the JA monogram (Phase F4).
44. **Portrait resolution (ADR-001)**: About's cut-out is the pass's photo, 457 px wide, shown
    up to 368 px wide, so a 2× screen upscales it about 1.6×. A portrait of 900 px or more
    (same framing, cut out or on a plain ground) would be sharp; `uv run
    scripts/extract-cutouts.py jorge` re-cuts it.
45. **The iPod (ADR-001)**: Proceso's object is the iPod from the cut-out set, so Q32 (rights)
    covers it too. Its front shows no logo. Keep it, or send a photo of your own iPod.
46. **Copy cut by ADR-001**, all quoted in the ADR's appendix: the services' quoted client
    problems and four-line scopes, About's second and third paragraphs, the three principles and
    the milestones' detail lines (including "de marzo a junio" at Grupo Fuertes), Proceso's
    closing question and button, the bonus's longer body and privacy note. Restore any that
    should come back; each has a place in the new layout only if the chapter still fits.
47. **The toy brick**: not used. Its studs carry a toy maker's trademark and the brick is about
    240 px in the file; a bonus-track object needs another photo if you want one.
48. **Unused files after ADR-001**: `editorial/ProfileCard`, `graphics/Paper`, `graphics/Sticker`
    and their CSS (plus LogoLoop and ThemeToggle from Q41–42). Left in place because they carry
    uncommitted edits; delete them when committing if they are not coming back.
49. ~~Projects on phones~~: answered 2026-11-11, the fit rule applies to Projects too. It is
    held wherever it fits (every laptop and desktop size measured) and flows on phones and
    portrait tablets, where it is 1.04 to 1.35 windows tall.

---

## 5. Backlog

- **Real waitlist** for the component library: needs a provider or endpoint (GitHub Pages is
  static), double opt-in, a privacy notice and an RGPD consent line. Until then the CTA is a
  `mailto:`.
- **English edition** under `/en/` with `hreflang`, written (not machine translated).
- ~~**Deploy**~~ Done 2026-11-11 (§4 Q8): GitHub Actions workflow building `dist/` and publishing to Pages on
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
`docs/evidence/` (local only, git-ignored since 2026-11-11): `2026-10-26-before-desktop.webp` vs `2026-10-26-after-desktop.webp`,
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


## TASK 02 — 2026-11-02

Migration diagnosis: TASK02_AUDIT.md. Artistic authority moved to ../DESIGN.md; technical
architecture to ../AGENTS.md. Config and design are independent; all existing sections and
routes retained. Previous measurements and aesthetic descriptions above are historical.
Updated validation and delivered-file inventory are in TASK02_REPORT.md.
Missing art remains explicit: original paper scans, brush/sticker collection and final
project cover art. Existing generated artwork is provisional. Estrella licence and factual
content review questions remain open; TASK 02 does not resolve or invent them.

## Colour system — 2026-11-02

Brief: one light/dark colour system (light: cool white + blue `#409DE8`; dark: carbon + orange
`#E88B40`, its HSL complement), no third accent, single source of truth, WCAG 2.2 AA. Layout,
typography, copy, animations and CD geometry unchanged. Rules: ../DESIGN.md "Palette and
material"; enforcement: `check:architecture` fails on hex/rgb/hsl or `--palette-*` outside
`design/tokens.css` (the disc's neutral material greys in `Disc.css` excepted).

- Tokens: palette primitives → semantic roles (light default, dark under
  `prefers-color-scheme`) → scopes (`.on-night`, `[data-surface]`). All legacy names
  (`--color-*`, `--rule*`, `--halo-*`, `--decorative`) were removed; ~250 usages migrated.
- Night scope remaps roles, so the `.on-night` overrides in base, layout, Button, ChapterHeading,
  CreditsTable, Contact and the footer were deleted. The header derives its halo from one
  `--nav-ground`. In dark the back cover is raised to `#1B2027` so it stays a distinct object.
- Removed from the identity: the pastel gradient of the Bonus insert (now `--accent-surface`),
  the iridescent fill of the menu's first insert (now silver), the multi-hue project covers
  (teal, brown, terracotta, navy, lime; now print inks + accent) and the terminal cover's
  red/amber dots.
- Rasters: dark variants by `scripts/generate-theme-variants.mjs` (hero disc and 4 cover sizes,
  logo, frog mark: HSL complement; arrow: ink recolour; hand: defringe of its white cut-out),
  served by `graphics/ThemeImage` (`<picture>` + media, no JS). Dark files are within ±3 % of
  the originals' weight (cover-720: 48.2 vs 47.7 kB); the dark disc has no AVIF (Chrome's
  encoder cannot write it), so dark visitors get its WebP (35.3 vs 20.7 kB). GitHub's mark has a light SVG for dark.
- Readable glyphs (Estrella words, the Bonus asterisk) moved to `--accent-functional`; the
  bright blue fails 3:1 on light grounds (2.76:1). The gallery's pen loop moved to `--accent`.
- `index.html`: `color-scheme` meta (first canvas already dark) and per-scheme `theme-color`.
  OG cards regenerated with the new cover inks; the generator now pins the light theme.

Validation (2026-11-02, local Chrome via playwright-core): build, typecheck, architecture,
config and asset checks pass; axe (WCAG 2.0/2.1/2.2 A+AA) on 9 routes × light/dark × 390/1440 px:
0 violations after the glyph fix (one before: «Proceso» at 2.91:1). axe could not compute
contrast for 9–157 nodes per page, ~85 % `bgGradient` (the grain veil and the paper material are
gradients), the rest overlaps, pseudo-content and images; those pairs are covered by the measured
role matrix in DESIGN.md. No horizontal overflow, no console
errors. Visual review of every home section, index, case study and menu in both themes at 1440
and 390 px. CSS 14.98 kB gzip (was 14.86), initial JS 105.61 kB gzip (was 105.29).
Not verified here: Safari/Firefox, real devices, a screen reader, a live OS theme switch.

Theme toggle (same day, Jorge's request "aunque sea solo para el debugging"): `ui/ThemeToggle`
(ReIcon `Moon`/`Sun`, both rendered, `--theme-dark` shows one; `aria-pressed`, label «Tema
oscuro», 44 × 44 px, hidden without JS) left of «Hablemos». `ui/theme/theme.ts` holds the
override: `data-theme` on `<html>`, sessionStorage, restored by the inline head script before
paint; `ThemeImage` sources and the per-scheme `theme-color` metas follow it. Tokens: dark
mapping under both triggers, `--mark-filter*` replaces LogoLoop's own media query;
`check:architecture` now also fails on `prefers-color-scheme` outside tokens.css and when the
two dark blocks differ (verified by breaking one). Tested in Chrome with the system in light
and in dark: force, navigate (kept), return (override dropped), Space key, images, metas,
`aria-pressed`, no console or hydration errors; axe clean at 360/390/1440 px, no overflow.
Initial JS 107.32 kB gzip (+1.7 kB: the two icons carry outline and filled paths, plus the store).
Known limit: a theme forced against the system shows the system's raster variant for a moment
on page load until hydration swaps the `<source>`; CSS is correct from the first paint.

## Cut-out collage — 2026-11-09

Brief: Jorge put realistic cut-outs in `public/images/assets/` and showed a flat generated
project disc next to the photographed broken one ("the CDs are really different"): make the
hero and Projects look like a cut-out 2000s CD cover, go extra, no new text. Decided with him:
cut-outs keep their natural colours; the hero scene stays and a collage is built round it;
release discs become printed singles; the THIS IS NOT AI sticker and the train go in the hero.
Rules and record: ../DESIGN.md ("Photographed cut-outs", "Materials", "Composition",
"Jorge's cut-out set"), INFORMATION_ARCHITECTURE §3, MOTION_SYSTEM §2.1–2.2, §4, §5,
references.md #18.

- Assets: `scripts/extract-cutouts.py` (uv, Pillow, NumPy, OpenCV) keys twelve originals by
  their ground: flat colour connected to the edge (white, black, the PNGs' opaque grey), the
  painted checkerboard rebuilt square by square (period and phase fitted on the edges), or
  colour-to-alpha for ink; a die-cut paper margin for photos; premultiplied resizes; 29 WebP
  files (two or three widths each, 4–50 kB, 664 kB in all). The train's background-removal outline (~4 px white, ~5 px dark) is choked
  away. `scripts/generate-disc-finish.py` cuts the hero disc's hub and rim (measured: hole
  < 0.11 r, clear hub to 0.195 r, print 0.20–0.96 r) into `disc/shell.webp` (24 kB) and lifts
  scratches from the broken-disc photo into `disc/wear.webp` (38 kB): high-pass, crack gaps
  masked, density evened per shard, three turned copies to fill the gaps. The scribble's
  orange ink comes from `generate-theme-variants.mjs` (`ink`), which now also takes paths.
- Code: `graphics/Cutout`, `ui/motion/usePointerDepth`, gestures `slap` / `hang` /
  `draw-loop` in `design/motion.css`, tokens `--filter-cutout(-lift)`, `--filter-sticker`,
  `--material-print-grain`; `CoverArt` prints a release's label cut-outs over field and title;
  `Disc` (pressed) wears the shell, wear and grain; rim credits removed from every project disc
  (gallery, index, case study, OG card), so the view-transition morph joins identical discs.
  The ink loop's box was solved numerically (credit measured at 7 viewports; every line's
  corners 8 px inside the loop; the loop inside the frame), which also raised the credit 0.75rem.
- Validation (local Chrome via playwright-core, dev and production builds): typecheck,
  architecture, config, asset and SEO checks and the build pass; no console errors and no
  horizontal overflow at 1024 × 768, 1280 × 800, 1440 × 900, 1512 × 734, 1920 × 1080,
  768 × 1024 and 390 × 844, light and dark; hero sampled at narrative 0, 0.3, 0.66, 0.72;
  every gallery disc selected; reduced motion and no JavaScript (prerendered) show the complete
  still composition. LCP stays on an existing hero image (the sleeve's film), 68–176 ms
  unthrottled. CSS 16.8 kB gzip, initial JS 110.7 kB gzip (both in budget). Images: Q34.
  Not verified: Safari/Firefox, real devices, a screen reader, a GPU trace of the pinned scene.

## Upload and deploy — 2026-11-11

Brief: Jorge asked to upload only the minimum necessary content to GitHub, with only the images
the site uses, and to move GitHub Pages to this version.

- Audit: the built site (HTML, CSS, JS, sitemap) and the literal references in `src/` request
  110 files in `public/`; the one runtime-built path is `/images/og/${slug}.jpg`, and its six
  cards exist. 59 images were never requested: 16 are sources the `scripts/` regenerators read
  (now `private/originals/`, script paths updated) and 43 nothing reads (now `private/unused/`);
  `fonts/estrella-early.otf`, the monogram's outline source, moved with the originals. All 17
  images carrying EXIF, device data, edit history or AI-generation credentials (C2PA) were among
  them; no served file carries any. `public/` went from 175 files (14 MB) to 115 (3.6 MB), the
  deployed site from 20 MB to 5.7 MB.
- `.gitignore`: the unanchored `private/` also hid `public/images/projects/private/`, so a clean
  checkout failed `check:assets` on `broken-disc.webp`; it is now `/private/`. `.impeccable/`,
  the TASK 02 reports and `docs/evidence/` stay on Jorge's disk (his answer).
- Deploy: `.github/workflows/deploy.yml` (checkout v7, setup-node v7 on Node 24,
  configure-pages v6, upload-pages-artifact v5, deploy-pages v5) runs `npm ci` and
  `npm run build` and publishes `dist/`. Pages on `Portfoliov3` builds from Actions;
  `portfolio.jarcas.dev` moved from `portfoliov2` (GitHub deleted its `CNAME` file, e0feedf;
  v2 now answers at `j0rgw.github.io/portfoliov2/`). The certificate carried over and HTTPS is
  enforced. Rollback: remove the domain here and set it back on `portfoliov2`.
- Validation: a fresh copy of exactly the committed files passes `npm ci` and `npm run build`;
  the first Actions run (827fc03) passed build and deploy. Live: the 110 requested files answer
  200; the home, `/proyectos/` and a case study answer 200; a case study without its trailing
  slash 301s to it; an unknown path serves the site's own 404; http 301s to https.
  `npm audit`: no vulnerability in runtime dependencies; 9 (7 high) in the build toolchain
  (vite, rollup, postcss and their dependencies), all with fixes available, not applied.
- Still open: Q32 (rights to the downloaded cut-outs) applies to the derived files that are
  served.
