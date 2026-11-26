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
| `/` | Home ("Inicio": the cover, Sobre mí, the next track) | Yes | Primary landing page |
| `/proyectos/` | Projects: the disc gallery of the featured releases, then the others as the index's cards | Yes | ADR-003; the gallery was the home's chapter 01 until 2026-11-12 |
| `/proyectos/<slug>/` | Case study | Yes | One per release, see §5 |
| `/servicios/` | Servicios, then Proceso | Yes | ADR-003 |
| `/libreria/` | The bonus track | Yes | ADR-003; in the menu and the footer, not the header |
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
  make page changes feel continuous where supported, and degrade to a normal navigation elsewhere:
  the pages slide 8 px side by side, a shallower page (or the browser's back) from the other side
  (MOTION_SYSTEM §2.7, 2026-11-12).
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

## 3. The album in pages

Since 2026-11-12 ([ADR-003](adr/ADR-003-pages.md), Jorge's brief: "reduce the amount of scroll
anyone needs to do so they actually read the page") the album is split into short pages, each
ending on the back cover. The home is the cover and the person; the work, the offer and the
bonus are pages of their own, reached from the header, the menu, the footer and the home's next
track. Since ADR-004 (2026-11-19) the person is told whole on the home, at first glance: Sobre mí
(his sentence and his things), then his credits. The old narrative order survives across pages: the menu and the footer list them in
album order (identity and person → proof → offer and method → extra), and every page ends on
the action.

| Page | Chapter (`id`) | Heading | Purpose |
|------|----------------|---------|---------|
| `/` | Cover (`inicio`) | (H1) Jorge Arcas Verdejo, Freelance Software Developer | Who, and the identity as an object |
| `/` | About (`sobre-mi`) | (H2) Sobre mí | The person, remembered: one sentence and his things (ADR-004) |
| `/` | Next track | "Siguiente pista", Proyectos | Hand the visitor on to the work |
| `/` | Credits (`creditos`) | (H2) Créditos | The timeline, the instruments, the languages (ADR-004) |
| `/proyectos/` | Projects (`proyectos`) | (H1) Proyectos seleccionados; (H2) Otros lanzamientos | Prove capability |
| `/servicios/` | Services (`servicios`) | (H1) Qué puedo construir para ti | Turn skills into offers |
| `/servicios/` | Liner notes (`proceso`) | (H2) Cómo trabajo | Earn trust in the method |
| `/libreria/` | Bonus track (`libreria`) | (H1) Una librería de componentes React, en preparación | Introduce the library, honestly |
| every page | Back cover (`contacto`) | (H2) ¿Tienes un proyecto en mente? | Convert |

The pages and the chapters live in `src/config/navigation.ts` (each chapter names its page;
the back cover's page is empty: it closes every page) and drive the menu panel, the header's
words and the footer tracklist. `ready: false` removes a chapter and its navigation entries;
`chapterHref` leads to a chapter's page (a chapter that opens its page) or to its anchor there,
to `#contacto` on the page being read for the back cover, and home for a hidden chapter. A
chapter that opens its page carries the page's h1 (`ChapterHeading` level).

### Section contracts

Every chapter below must keep its contract when edited.

**00 · Cover / hero** (`src/sections/Hero`)
- Narrative purpose: introduce the person and the identity through one physical object, in one
  viewport; the offer is told by the chapters that follow.
- Content (the diagonal study Jorge chose, 2026-11-10; copy from his 2026-10-29 corrections):
  the `h1` holds the full name (Poppins 800, two large lines in the top-left corner) and the
  role "Freelance Software Developer", which sits at the foot of the same column with
  "Software con carácter." under it. Plain text directly on the background, without a card,
  coloured border, shadow or tilt. The scene: Jorge's printed disc just under the name's first
  line, his cover in a clear plastic film to its lower right, held in Jorge's real grip (his
  photo holding a case; the case and the photo in it are cut away, never shown). No lede, CTAs, spec strip or tracklist: contact and
  chapters are in the header (Hablemos, Índice, Menú). Round the scene, three of Jorge's
  cut-outs (DESIGN.md): headphones hung over the right edge, THIS IS NOT AI on the film, the
  VOLUME knob on the bottom edge. No text is added: the sticker's words are part of his image.
- References: the diagonal layout study (primary, 2026-11-10) after Jorge's sketch, Kyoosang
  Choi (a hand holding the object), A24 (the disc as the cover object), Jorge's cut-out set (#18).
- Components: the scene (raster artwork in `public/images/hero/`, the arm and cover prepared by
  `scripts/prepare-hero-art.py`), `Cutout`, `useScrollScene`, `useSpin`, `usePointerDepth`.
- Motion: Level 1. CSS-only entrance on first paint (no JavaScript dependency): the name rises
  line by line, the disc lands spinning, the hand brings the sleeve up from below; the disc turns
  slowly (75 s a turn; eased stop on hover, held by a tap, paused off-screen, and a pause button
  revealed on keyboard focus); scroll takes the package apart round the disc, which holds still
  (rest → split → solo → exit; since 2026-11-11 neither the scroll nor the pointer moves the
  disc), in a pinned frame (MOTION_SYSTEM §2.1); the credit parallaxes as the frame leaves, and
  the end of the pinned run is a snap point (§2.3). The cut-outs slap down after the scene's entrance,
  lean by their depth under a fine pointer, drift apart as the hand pulls and leave through
  their nearest edge, so the disc ends alone; the knob turns up with the scroll. Reduced
  motion and no-JS: a still, complete composition with no extra scroll length.
- Responsive: the frame is one full viewport, under the transparent header. Landscape: the name
  top left, role and statement bottom left, the disc under the name's first line, the sleeve to
  its lower right, the forearm leaving through the bottom and right edges. Portrait: name, role
  and statement on top (the bottom belongs to the set), the sleeve lower and the hand mostly
  beyond the right edge.
- SEO: the only `h1`, containing the name and the role. The service phrases live in Services and
  in the meta description; the Person JSON-LD description is `site.summary`. The artwork is
  decorative and adds no claims.
- Accessibility: all text is real HTML, visible without JavaScript; the name is typeset in its original case. The disc, the sleeve, the arm and every cut-out are `aria-hidden` (the name and role
  printed on them are the `h1`); nothing covers the credit's type. The turn can be paused by keyboard (focus-revealed button,
  whose icon and words swap between "Pausar" and "Reanudar giro del disco", MOTION_SYSTEM §2.6),
  mouse and touch (WCAG 2.2.2).
- Conversion: the header's "Hablemos" (always visible) and the menu; the hero itself has no CTA,
  by the owner's brief.

**01 · Projects** (`src/sections/Projects`), rebuilt 2026-10-30 from Jorge's brief; since
ADR-003 (2026-11-12) it opens `/proyectos/`, its heading the page's h1
- Purpose: prove capability through selected releases, handled like a collection of discs.
- Content: one disc per featured release (three; Jorge chooses them with the `featured` flag,
  Q61–Q62), the lead single first (`lead`, 2026-11-25: ATLAXIA, his main project, printed as the
  hero disc reprinted in black and white with ATLAXIA's marks), then the private work as the last disc
  (2026-11-09, Jorge's brief): a photographed broken disc cut out on a transparent ground
  (`public/images/projects/private/broken-disc.webp`, from `private/originals/assets/f098…jpg`), no
  print, rim or stack; it opens the back cover, and its annotation reads "pregúntame"; on wide frames,
  once selected, Jorge's cut-out phone hangs in beside it (a pointer-only duplicate of its link).
  Every release disc is a printed single (2026-11-09): field, title and the release's cut-out
  (config `assets.label`), with the hero disc's real hub and rim and real wear; no rim credits.
  The selected disc's credits, unboxed (2026-11-09), in the bottom-left corner on wide screens, their last line level with the keys: title,
  short description (the tagline) tight under it, stack (first three technologies) as logo marks
  from `config/technologies.ts`, a mono chip where no mark exists; the marks lift under the
  pointer and their names show on a tag that travels between them (MOTION_SYSTEM §2.7). Position `02 / 04` between the
  previous/next keys, which sit centred under the selected disc. The arrow's label sits at the
  free end of its tail. No foot (removed 2026-11-09). The heading, "Proyectos" over
  "seleccionados" at every width, is the page's h1 and no longer a link: it was the way to the
  full index, which is now the page itself (ADR-003). The other releases follow on the page under
  "Otros lanzamientos" (h2) as the index's cards (ADR-001: the disc and its credits; Q59), each
  card's id its slug, so a case study's "Volver a proyectos" lands on it. Without JavaScript, the
  gallery's releases as a text list, then the cards.
- References: A24 by Ravi Klaassens (primary: composition, credits, the arc of discs, the pen loop
  on hover; its title change-over until 2026-11-12), Jorge's marker arrow, the original image
  (references.md #17), Cool Interaction (numeral with total).
- Components: `DiscGallery`, `QuickResume`, `discPose` (section: the path, `TRACK`), `Disc`,
  `CoverArt`, `Cutout`, `MarkerArrow`, `HandCircle`, `useDiscCarousel`. Data: `projectSummaries`
  (the gallery) and `earlierProjects` (the cards), §5.
- Motion: Level 3 (MOTION_SYSTEM §2.2): drag with inertia and snapping along an arc,
  previous/next buttons, arrow keys; the credits and the count swap their text (MOTION_SYSTEM
  §2.6, 2026-11-12); the arrow is laid again at rest; a
  pen loop turns round the hovered disc. No wheel capture: the wheel scrolls the page everywhere.
  Scroll parallax (§2.4): credits trail the page, the gallery runs ahead, both at rest when the
  chapter's top meets the viewport's (its snap point). Since 2026-11-12 it is not held (ADR-002:
  the marker that underlined "seleccionados" through its 60svh hold went, then the hold); since
  ADR-003 it opens its page, so it is at rest when the page loads (§2.4; no snap off the home). On
  phones and portrait tablets it is taller than the window and
  flows instead (ADR-001, applied to Projects on 2026-11-11), so its keys are never kept under
  the fold.
- Responsive: one viewport-high frame on wide landscape screens (chapter heading top left,
  credits bottom left at eye level with the keys, discs on an arc, one previous disc at every height:
  a second one would run into the credits); credits above the discs on portrait
  and narrow screens, the title (two lines) and description (three) hold their height so the discs never jump (ART_DIRECTION
  §5.2, MOTION_SYSTEM §2.2). No horizontal overflow: the section clips its discs.
- SEO: every disc is a real link to `/proyectos/<slug>/` with descriptive text ("MoneyMan,
  proyecto 1 de 4. Ver el caso de estudio"; the private disc says "Escríbeme para hablarlo"); the selected title is an `h3` under the page's
  `h1`; the no-JS list carries every featured title and tagline in the HTML, the cards the rest.
- Accessibility: only the selected disc is in the Tab order (it follows the selection); the
  two icon keys are real buttons named by `aria-label` ("Proyecto anterior", "Siguiente
  proyecto") with `aria-controls`; each press moves exactly one disc; a polite live region announces "Proyecto 2 de 4: Client Leads" on change;
  at the ends the buttons stay focusable (`aria-disabled`); the annotation (sentence case since
  2026-11-10; "Toca para saber más" on touch screens, `ui.projects.hintTouch`) is a pointer-only
  duplicate (`aria-hidden`, `tabindex=-1`); keyboard, touch and pointer users can do the same
  things, and dragging is never required.
- Conversion: the case studies, and the private-work disc to contact.

**Chapters 02–06 share one frame** (2026-11-10, [ADR-001](adr/ADR-001-chapter-frames.md); since
ADR-003 on their pages: Sobre mí on the home, Servicios and Proceso on `/servicios/`, the bonus
on `/libreria/`, the back cover at the end of every page). On
wide landscape screens each is one viewport high (`clamp(40rem, 100svh, 64rem)`, `.frame` in
layout.css), with the heading in the top-left corner where Projects' heading sits and its copy
at the foot (Proceso's at eye level since 2026-11-11), so a chapter reads whole when its top
settles at the top. Measured on the production build at 1512 × 734, 1280 × 720, 1024 × 768,
1440 × 900 and 1920 × 1080: every chapter fits. Since 2026-11-12 only Proceso is held (ADR-002);
on phones it flows instead when it does not fit (`data-unheld`, MOTION_SYSTEM §2.5). Copy was distilled
from the earlier contracts' own text: no new facts. Each chapter's heading and lede rise into
focus as it arrives (`ChapterHeading`, MOTION_SYSTEM §2.7, 2026-11-12).

**02 · Proceso** (`src/sections/LinerNotes`)
- Purpose: show how Jorge works and why the process is trustworthy.
- Content: heading "Cómo trabajo" and a one-line lede, "Así es como materializo una
  conversación en un producto real."; five steps (entendiendo,
  definiendo, construyendo, probando y publicando, manteniendo y mejorando), each a title, a
  text on the step and one real decision with a link to its evidence (see §6), its words the
  link cue (`ui/LinkCue`; no arrow since 2026-11-12). The copy is
  Jorge's (2026-11-11; only spelling and punctuation were touched). The steps are the playlist
  on Jorge's iPod (a photographed cut-out, `cutouts.ipod`): live HTML on its screen, "Proceso"
  and the count in the title bar, the selected step on the accent bar. The selected step's
  credits sit at eye level beside the iPod. Removed by ADR-001: the booklet and its running
  head, the torn slips, the closing question and its button.
- References: A24 (credits that change with the selection), CollectUI navigation 21793fa2
  (media-device UI, the selected item's description), Boccia (one story, readable without
  animation).
- Interaction: while the chapter holds, the scroll is the iPod's wheel (Jorge's request,
  2026-11-11): its hold is 200svh and every step owns an equal share of it (40svh with five),
  so scrolling changes the song and its credits, in both directions. The playlist stays a
  tablist (one Tab stop; arrows, Home and End move and select; click or tap selects); while
  held, choosing a song also scrolls the page to the middle of its share, so the wheel and the
  playlist always agree (the selection changes at once; the songs passed on the way do not
  flash). Focus on the playlist follows the song. Not held (the chapter taller than the window,
  reduced motion, short viewports), choosing is the only way. A link to the chapter opens it on
  its first song from above or below. Each step's credits are its tabpanel. Without JavaScript
  every step's credits are listed under the heading.
- Motion: Level 2. The selection bar slides to the selected song; the credits and the count on
  the iPod's screen swap their text like the gallery's (Jorge's request, 2026-11-12, MOTION_SYSTEM
  §2.6: the old text rises out of focus, then the new one comes up into place; not on first
  load; a fade under reduced motion).
- Responsive: wide landscape, the credits in a column up to 40rem at body size, centred under
  the heading (eye level); the cell keeps the longest step's height and every step starts at
  its top, so the title never moves. The iPod whole, turned 3°, centred in the room the column
  leaves and never nearer than 4rem to it, so where the room runs out (1024 and 1920 px wide) it
  stands at the frame's right edge (Jorge's pick of two, 2026-11-11). Below that, the iPod under
  the heading, cropped by its own clip under the top of the wheel, the credits under it, and a
  2rem foot instead of other frames' 4rem, so the longest step fits a 390 × 844 window.
- Copy budget (measured 2026-11-11 with test text; words of step text and decision together,
  per step, with the chapter still held): 160 at 1512 × 734, 150 at 1280 × 720, 120 at
  1024 × 768, 110 at 768 × 1024. Jorge's copy runs 35 to 59 words a step: the chapter is held at
  every size from 1024 × 768 to 1920 × 1080, at 768 × 1024, 414 × 896 and 390 × 844 (51 px to
  spare), and flows at 375 × 667, 360 × 780 and 320 × 640, where the songs are chosen by tap.
  Titles up to 28 characters fit one row of the iPod's screen.
- SEO: every step's title (h3) and text are in the HTML; links from each decision to its case
  study.
- Conversion: the decisions link the case studies; contact is the header's "Hablemos" and the
  back cover that closes the page.

**03 · Servicios** (`src/sections/Services`); since ADR-003 it opens `/servicios/`, its heading
the page's h1, with Proceso after it
- Purpose: translate skills into understandable offers, organised by client problem.
- Content: heading "Qué puedo construir para ti" and the lede; four offers as a tracklist
  printed on the page, one row each: the title (h3, large), one line on what the client gets
  (also the offer's JSON-LD description), "Lo he hecho en:" with links to the evidence, and an
  enquiry link with a prefilled subject, its words the link cue (`ui/LinkCue`: the header's
  "Hablemos" underline, circled by the pen when pointed at). Rows are parted by a hairline,
  nothing inside a row. Removed on 2026-11-12 at Jorge's request (ADR-002): the track numbers
  and the enquiries' arrows. Removed by ADR-001: the
  paper insert, the quoted client problem (an unattributed quote read like a testimonial) and
  the four-line scope (its key terms went into the one line).
- Responsive: four columns per row from 1280 px; two by two from 768 to 1279 px; one column
  below.
- Motion: reveal only. This chapter stays the calmest and most readable.
- SEO: the commercial phrases live here as real headings and copy, not stuffed elsewhere; the
  offers' JSON-LD lives on this page (§7).
- Conversion: one enquiry link per service.

**04 · Sobre mí** (`src/sections/About`, then `src/sections/AboutCredits`; rebuilt by ADR-004,
2026-11-19)
- Purpose: the person, at first glance and remembered. Jorge's brief: "telling more without
  writing more", from his photos (what he did this year, his interests), every photo audited (the
  ADR's table), easter eggs for whoever plays, and everything about him on the home, no teaser.
- Content: heading "Sobre mí" (h2), visually hidden since 2026-11-19 at Jorge's request ("remove
  the about me title"), so the sentence opens the chapter while the outline and the section's name
  keep it; one sentence in his words, signed "Jorge" in Estrella
  (`aria-hidden`), set at `--text-2xl`: "¡Hola! Soy Jorge, programo desde Murcia, estoy en el
  equipo fundador de ATLAXIA y el resto del tiempo lo reparto entre eventos, viajes, Gundam y el
  campo." Each thing stands right after its word, a line high (`config/about.ts`,
  `aboutChapter.statement`): the Santander X cheque, the DIATIC26 badge in his hand (the VDS hall
  hidden behind it), Godzilla's head over Shinjuku for "viajes" (Jorge on Odaiba hidden at its
  jaws), his Gundam in Valencia (its photo with the building hidden behind it), the bucket of
  peppers. Each is a button named by its caption (what, where, when), so nothing it shows is only
  seen. Jorge sits beside the sentence as on the album's cover (the same photo, in colour, right
  after the cover itself); on wide landscape screens the words wrap round his outline
  (`shape-outside`), elsewhere he sits beside the heading. No card, paper or rule. Removed by
  ADR-004: the pass's portrait and the paragraph (quoted in the ADR). Removed by ADR-001: the
  backstage pass, the second and third paragraphs, the three principles and the milestones'
  detail lines.
- Then **Créditos** (`sections/AboutCredits`, h2): the timeline newest first, one line per
  milestone (period, role, place; `kind` stays in the data), then "Instrumentos" (every tool, as a
  list) and "Idiomas", on shared columns; A24's credits, no rules or small capitals. From his CV as
  updated on 2026-11-19 (§6).
- Interaction: a thing pointed at (fine pointers), focused or tapped is picked up (MOTION_SYSTEM
  §2.9): it grows three times where it lies (3.2 on narrow screens), kept inside the frame by
  `usePeekRoom`, its caption comes up under it in inverted ink, what it hides comes out. A tap or
  click keeps it up (`aria-expanded`) until another thing, a tap elsewhere or Escape. Jorge is a
  button too: each tap brings another take of the cover's afternoon, its caption swapping
  (`useTextSwap`); pointed at or focused, the photo he was cut from comes out behind him.
- Easter eggs (nothing depends on them): the takes, the photo behind the cover, Godzilla's roar
  (the shake) when picked up by hand, the Konami code (`useKeySequence`: his face, tongue out, popping
  out of the window's bottom-right corner for 2.8 s), and the console's "Cara B de Sobre mí" after the
  site's hidden track (his four favourite films, a hint for the code).
- References: The Romans (type with an object inside the statement), Kyoosang Choi (his own
  artefacts, a hand holding one), Gianluca Boccia (one plain sentence, whole without animation),
  A24 (credits), Jorge's cut-out set (#18), transitions.dev (the tag, the text swap).
- Motion: the sentence rises into focus (`data-reveal="rise"`); Jorge and the things wait out of
  sight until the chapter arrives, then are slapped down one by one (the hero's gesture);
  picking up is Level 3. Reduced motion: no slap, no shake, no travel; the Konami face fades.
- Responsive: one frame on wide landscape screens, the sentence and Jorge centred in it; below
  1024 px or in portrait, Jorge at the right and the sentence under him. Measured from 320 × 640
  to 1920 × 1080 (ADR-004).
- Performance: lazy under the hero; each thing loads a line-sized file; the peek's larger files,
  the other takes and the hidden photos load once someone plays with the frame (a pointer over
  it, focus in it, a touch).
- Conversion: the header's "Hablemos"; then the home's next track ("Siguiente pista", Proyectos,
  with the gallery's first disc, `editorial/NextTrack`; "Lo que he construido, empezando por
  ATLAXIA, MoneyMan y Client Leads.", from the featured titles), then the back cover with LinkedIn
  and GitHub.

**05 · Bonus track** (`src/sections/BonusTrack`); since ADR-003 the page `/libreria/` (Q60), its
heading the page's h1, listed in the menu and the footer, never in the header
- Purpose: introduce the upcoming React component library without competing with services.
- Content: the heading with its status ("en preparación"); one line: no name
  or date yet, and who it is for; the oversized "Avísame*" as the mailto link itself (named
  "Avísame por email"), its footnote and a one-line privacy note; the DevFest 2025 talk it grew
  from as the one link out. **No fake subscription form.** Removed by ADR-001: the tinted card,
  the "Bonus track" sticker and the two buttons. "Avísame*" stays smaller than the back cover's
  "Hablemos", so the waitlist never outshouts contact.
- References: CollectUI Subscribe (the oversized word with an asterisk), Matt Jinn's promo card.
- Conversion: secondary; the primary action stays contact.

**06 · Back cover / contact + footer** (`src/sections/Contact`, `components/SiteFooter`)
- Purpose: convert interest into an enquiry and close every page (ADR-003: `PageShell` renders it
  at the end of every page's `main`, so the header's "Hablemos", `#contacto`, stays on the page
  being read). A case study keeps its own contact band ("¿Necesitas algo parecido?"), which takes
  the same anchor.
- Content: heading "¿Tienes un proyecto en mente?" and its lede; the oversized "Hablemos" with
  the CD-R set between the word and an arrow, as the primary email link of the whole site
  (named "Hablemos por email"); one line of details: the address with a copy button (its words
  swap to "Email copiado" and back and its icon turns into a check, MOTION_SYSTEM §2.6–2.7; a copy
  the browser refuses shakes it; feedback in a polite live region), LinkedIn and GitHub. Removed
  by ADR-001: the two square buttons and the spec table (Estado, Base, Idiomas, LinkedIn, GitHub
  in small capitals between rules); the languages are in About. Removed on 2026-11-16 (Jorge: "deslop
  the footer, remove the live dot and everything"): the availability line and its green dot, and
  "Te respondo personalmente." from the lede.
- Footer (every page), deslopped 2026-11-16: rows of links that name themselves, with no name in
  the margin and no rule over them (the back cover above is the same night ground; space parts
  them): the pages as the menu names them (Inicio, Proyectos, Servicios, Bonus), every case
  study, and, on a case study only, the address and the two profiles (elsewhere the back cover
  right above lists them); then one line of print: barcode and catalog number, "© 2026 Jorge
  Arcas", "Código fuente ↗". Removed that day: the margin names (Tracklist, Proyectos,
  Contacto; the lists keep them as accessible names), the rule, "Índice completo" (the Proyectos
  page, already in the row above), the in-page entries (Sobre mí, Proceso, Contacto, whose block
  sits right above), the case-study row's labels and handles, the credits line (the font credits
  live in the repository's readme, which "Código fuente" opens), "España" and "Volver arriba"
  (the header's monogram is the way up).
- References: The Romans (oversized type, an object between words), Kyoosang (contact as an
  object), Huy Phan.
- Motion: reveal only; the CD-R turns a little under the pointer. The last chapter is not held.
- Conversion: the email link is the primary action of the whole site.

---

## 4. Navigation model

One coherent system: **a conventional information architecture dressed as a tracklist.**

- **Header** (every page, `components/SiteHeader`): the JA monogram (link home, named "Jorge
  Arcas…" for assistive technology, and the way back to the top; it replaced the "Jorgw"
  wordmark on 2026-11-10, and since 2026-11-11 it is in ink, taking the links' hover colour on
  hover and focus), the pages **Proyectos** and **Servicios** as words (from 768 px; ADR-003,
  Jorge's pick of two rendered headers, Q58: the page being read, a case study counting as
  Proyectos, is underlined and `aria-current="page"`; phones keep them in the menu),
  `Hablemos` (contact action: `#contacto`, the back cover of the page being read) and the
  **Menú** toggle (its word swaps to
  "Cerrar" while the menu is open, MOTION_SYSTEM §2.6), words in sentence case at body size
  (2026-11-11), as type over the page with no rule, blur or shadow
  (ART_DIRECTION §9); no theme switch since 2026-11-10, and no track readout beside the
  monogram since 2026-11-11 (Jorge's call). It switches to light ink over the back cover and
  the footer. It stays fixed and keeps its own view-transition name, so it does not move during
  page changes. Over the hero's pinned run it is only type, at full size (`.hero__clear`,
  `data-header-clear`, the run plus half the header). Everywhere else it is **compact**
  (2026-11-11, chosen by Jorge from rendered versions; it replaces a veil that faded out from
  54 to 88 px and left whatever passed there half-erased): a solid 56 px strip of the ground
  behind it, cut straight at its bottom edge, with no fade, rule, blur or shadow, so over its
  own ground it cannot be seen and whatever scrolls beneath goes under it; the controls rise to
  its middle and the monogram shrinks to 28 px, by transforms only. Pages without a hero are
  compact from the start. The strip's ground is read on its bottom edge, so it always matches
  what shows right below it: `data-ground="secondary"` (Projects), `"paper"` (case-study cover),
  `.on-night` (back cover, footer), otherwise the page ground with its grain (layout.css). The
  header mirrors it as `data-nav-ground`, because `data-ground` itself would paint the header's
  box (it did, over Projects, until 2026-11-11). The strip takes the pointer; below it the page
  keeps it. Two IntersectionObservers: the strip's bottom edge for the ground and the ink, the
  header's middle line for the hero's run.
- **Menu panel** (`components/StaggeredMenu`, kept and restyled): the pages (Inicio, Proyectos,
  Servicios, Bonus) and Contacto (ADR-003, 2026-11-12; the chapters until then), as Kerimov's
  hairline rows, with no label over them (2026-11-10: the rows name themselves) and no numbers
  (2026-11-11). On 2026-11-11, at Jorge's request, the project list with taglines, the
  availability line and the contact and social links left the panel; the projects stay on
  `/proyectos/` and in the footer, contact on the back cover and in the footer (the availability
  line left the site on 2026-11-16). Behaves as a modal dialog: focus moves in, Tab is contained, Escape closes and returns
  focus, the panel is `inert` when closed. Works with reduced motion. The page being read is
  marked (`aria-current="page"`; until ADR-003 the home's chapter under the header): the accent
  and a small `▸` at the row's end, so the state does not rest on colour alone.
- **Case-study table of contents**: sticky on wide screens, with scroll-spy; the section in view
  is set in ink and semibold. No dash or number beside the entries (2026-11-11, Jorge's request).
- **Footer**: the pages and every case study, as rows of links (ADR-001) that name themselves
  (deslopped 2026-11-16: no margin names, no "Índice completo", no back-to-top link), without
  track numbers since 2026-11-11 (on every page, the footer being one component). The pages' row
  is `#tracklist`, where the header's no-JavaScript "Índice" link lands.
- **Next track**: the home ends on "Siguiente pista", Proyectos, the gallery's first disc beside
  it (`editorial/NextTrack`, the case studies' row); a case study ends on the next release.
- Links to chapters are absolute (`/#sobre-mi`, `/servicios/#proceso`; a chapter that opens its
  page is linked as the page) so they work from every page; the back cover is `#contacto` on the
  page being read. On the page that holds the target they are intercepted and scrolled smoothly
  (instant under reduced motion), and focus moves to the target.

---

## 5. Content model

All content is typed TypeScript in `src/config/` (types in `src/config/types.ts`). Components
never hard-code copy that a content editor would change.

| File | Holds |
|------|-------|
| `site.ts` | Identity, contact, socials, catalog number, base URL, default SEO |
| `navigation.ts` | Pages (id, label, path) and chapters (id, number, label, readiness, page) |
| `projects.ts` | Releases and case-study content |
| `services.ts` | Offers |
| `process.ts` | Liner-notes steps |
| `about.ts` | Bio (one paragraph), milestones, tools (ADR-001: the principles went); Sobre mí's sentence and its things, Jorge's takes, the console note and the Konami code (ADR-004) |
| `library.ts` | Bonus track copy and status |

**Project schema** (`Project` in `types.ts`, abridged):

```ts
id, slug, order, visible, featured, lead?, title, tagline, summary,
projectType, typeLabel, role, team?, status: { kind, label }, year, date,
technologies[], services[], assets?: { disc?, sleeve?, social? },
overview[], context?[], challenge?[], goals?[], responsibilities?[],
architecture?[], decisions?[],
outcome?[], evidence?: Evidence[], links: { repo?, live? }, seo: { title, description }
```

`projectCatalog` is editable; `selectProjects` filters/sorts without mutation and derives track
numbers: the lead single first (`lead`, one featured release, Jorge's main project: ATLAXIA
since 2026-11-25), then the featured releases (`featured`, Jorge's choice: the gallery that opens
`/proyectos/`, three of them; the newest three if none is featured), then the rest, newest
first within each by `date` (when the release went public, §6), `order` breaking ties (ADR-003).
`projects`, `galleryProjects`, `earlierProjects`, `projectSummaries` (the gallery's discs and
the private one), routes, menu, index, schema and OG keys share this selection.
Hidden/removed releases have no public detail route. References through projectHref fall back to
the index, so old process/service evidence links do not become dead local URLs. Private work
has its own `visible` flag; when visible it is appended to `projectSummaries` as a
`kind: 'private'` summary (the gallery's last disc). Zero projects renders an empty state; a single release has no self-link
as “next”. Assets are optional; missing custom art uses the existing generated cover theme.
Graphic themes live in design; their project assignment is a rendering adapter in CoverArt.

Sections are optional. A case study renders only the parts that have content, in this order:
cover and credits → resumen → contexto → el problema → objetivos y restricciones → mi papel →
arquitectura → decisiones técnicas → resultado → evidencias → siguiente proyecto → contacto.
Since ADR-001 (2026-11-10) the cover prints the credits as label and value (no small capitals or
rules), the stack as marks with the rest named in words (`editorial/StackMarks`; the marks lift
and name themselves on hover, MOTION_SYSTEM §2.7), one back link
and no visible breadcrumb trail (it stays in the JSON-LD). Since 2026-11-11 (Jorge's request)
the page carries **no numbers and no lists**: no number on a section, a decision, a step of the
flow diagram, the next track or the sleeve's print, and no dash in the table of contents. Since
2026-11-12 (ADR-002) the next track's title is the link cue (`ui/LinkCue`) instead of being
followed by an arrow ("Todos los proyectos" beside "Escríbeme" went on 2026-11-16: the footer's
Proyectos sits right under it); "Escríbeme" keeps its arrow, like the
back cover's "Hablemos", and "Ver el código" its ↗. Every
section is prose in Castilian Spanish, one paragraph per string, joined with commas and
semicolons the way Spanish writes rather than set as bullets; the stack is named inside the
architecture's sentences (the cover's marks still show it at a glance), and each technical
decision is a paragraph with no title of its own. Evidence keeps its figures (screenshots, code,
the flow diagram, the state table). Copy must not read as translated from English: no "X, not
Y" taglines, no label-and-colon fragments ("Pendiente:", "Siguiente:"), no calques ("mobile-first"
becomes "pensada primero para el móvil").
Since 2026-10-30 the template's core always appears (Jorge's brief: placeholders, never
guesses): "Contexto y problema" when neither `context` nor `challenge` exists, "Mi papel"
without `responsibilities`, "Solución" without `architecture` and `decisions`, each saying
"Pendiente de documentar." Today only Portfolio v2's "Mi papel" is pending. Every case study
opens with "Volver a proyectos": `/proyectos/`, the gallery reopening on that disc, or, for a
release that is not in the gallery, `/proyectos/#<slug>`, its card (ADR-003); its ← stays and,
since 2026-11-25, its words are the link cue (`ui/LinkCue`) like every other link's.

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
| Full-stack Developer, Grupo Fuertes, Mar–Jun 2025 | Jorge's live v2 site (portfolio.jarcas.dev); an internship (his CV and his answer, 2026-11-19) |
| Google Developer Group organiser since Nov 2022 | Live v2 site; until Nov 2025 (his CV, 2026-11-19) |
| Google Developer Student Clubs lead, Jun 2023 – Jun 2024 | Live v2 site |
| Studies: Computer Engineering, UCAM, 2021–2023; Web Development, UCAM, 2023–2025 | Live v2 site. Superseded on 2026-11-19 by his updated CV (below): the credits show the degree in progress and the DAW as completed; 2021–2023 is not in the CV and left the site |
| Spanish native, English professional | Live v2 site |
| Talk "Deja de copiar y pegar componentes" (CDD with React + TypeScript), DevFest 2025 Santiago de Compostela | `J0rgw/PonenciaCDD` repo description and README |
| Freelance full-stack developer, Spain | Owner's V3 brief |
| Available for projects | `status: "Available"` in the previous config, `#OpenForWork` on v2. Editable in `site.ts` |
| Project facts (features, stack, decisions, limitations) | Each project's public README and commit history, linked in `projects.ts` |
| Mathgeon is a two-person project; Jorge's share | Repo contributors (A31Nesta 48 commits, J0rgw 12) and the files his commits touched |
| Hero artwork: printed name, "Freelance Software Engineer", "Vol. 01 / 2026", barcode | Artwork supplied by Jorge, 2026-10-29 (`private/unused/brand/cdJorge.png`, `jorgeCDsleeve.png`, git-ignored); the cover again at 1200 px, the disc at 1200 px and a photo of his hand holding a real case on 2026-11-10 (kept in the git-ignored `private/`, never published: the case frames a private photo; only the hand is shown). Decorative (`aria-hidden`); the barcode is a graphic, not a product code. The site's role text stays the `h1`. |
| Hero credit: "Jorge Arcas Verdejo", "Freelance Software Developer", "Software con carácter." | Jorge's correction to the hero, 2026-10-29 (full name as on his LinkedIn; the role in English as he wrote it, "freelancer" read as "Freelance") |
| Third portfolio (catalog JRG-003) | `J0rgw/portfolio` (v1), `J0rgw/portfoliov2` (v2), this repo |
| Proceso 01: Client Leads came from a startup that needed a CRM from scratch, where filling it by hand was too costly | Jorge's Proceso copy, 2026-11-11; consistent with the project's tagline (Google Maps to Twenty CRM). The startup is not named (open question 2) |
| Proceso 02: MoneyMan started as a personal project to research fintech; the people around Jorge use it now | Jorge's Proceso copy, 2026-11-11. The case study's status and the repo's README still say it is not deployed (open question 53) |
| Proceso 04: none of Jorge's websites is published without every image, a title, a description and one h1 per page | Jorge's Proceso copy, 2026-11-11; for this site, `scripts/check-assets.mjs` and `scripts/check-seo.mjs` in the build |
| Proceso 05: handover with training; documentation in Spanish and English, organised for people and LLMs | Jorge's Proceso copy, 2026-11-11; MoneyMan's repo has `README.md` and `readmeESP.md`, `DESIGN.md`, `PRODUCT.md` and `docs/` |
| Programs from Murcia; Software Engineer (freelance) in ATLAXIA's founding team (2026 – today); Software Analyst & Developer at Digital4tech (Dec 2025 – Sep 2026); full-stack developer intern at Altaico Seguridad (Jul – Oct 2025) and at Grupo Fuertes' Lab19 (Mar – Jun 2025); BSc in Computer Engineering at UCAM, in progress (2026 – 2029); Higher Technician in Web Application Development (DAW) at UCAM, completed (2023 – 2025); certification "Secure Coding: Building Cyber Resilience" (INFO and CAETRA, 50 hours, 2026); Google Developer Group Murcia y Cartagena co-organiser (Nov 2022 – Nov 2025); GDSC lead (Jul 2023 – Jul 2024); the core skills in the instruments | Jorge's CV as updated on 2026-11-19 (`~/Desktop/docs importantes/Jorge_Arcas_CV.docx.pdf`), read the same day (ADR-004). It supersedes the v2 site's rows above on his roles, studies and community (the earlier CV called him ATLAXIA's co-founder); Grupo Fuertes as an internship is also his answer to Q65 |
| ATLAXIA won the Santander X Award, Proyecto Emprendedor 2026 (2.000 €) | The cheque in Jorge's photo at UCAM HiTech, 2026-06-25 (`private/originals/me/`, ADR-004) |
| Attended DIATIC26 (Murcia, 2026-05-14) and VDS 2026 (Valencia, October 2026) | His badge with his name (photo, GPS Murcia) and his photos of the VDS hall and backdrop (GPS Valencia, 2026-10-21 and -22); his brief ("asisting the vds") |
| Travels ("viajes"): Japan in November 2025, Godzilla in Shinjuku, Odaiba | His photos, 2025-11-10 to -17 (GPS Osaka and Tokyo); the brief names travelling, Gundam and Japan as interests; the sentence is his (2026-11-19) |
| His Gundam in Valencia, September 2026 | His photos `IMG_6418` and `IMG_6420` (iPhone, 2026-09-05, GPS at the Ciudad de las Artes y las Ciencias) |
| Peppers and cucumbers in August; "el campo" | His photos, 2026-08-11 (a private place, not named); the brief names agriculture |
| The album's cover photo was taken at Gordale Scar, Yorkshire | `IMG_6984.HEIC` is the same photo as the cover (compared 2026-11-19), GPS 54.072, -2.132, 2026-10-03 |
| His four favourite films (Retrato de una mujer en llamas, La vida de Brian, Todo a la vez en todas partes, Nicky, la aprendiz de bruja), in the console | His Letterboxd favourites, screenshot 2026-07-27 |
| When each release went public (the catalogue's order within the featured releases and the rest) | Each repository's first commit, GitHub API, checked 2026-11-12: AtlaxiaBussinessWeb 2026-05-05 (checked 2026-11-25), myFinancesApp 2026-09-16, clientScrapper 2026-09-15, gitchangeUserCommand 2026-08-03, DiscoDescargas 2026-05-07, mathgeon 2025-05-03; Portfolio v2 by its stated 2023–2024 (its repository is a 2025-06-23 upload). ADR-003, proposed |
| ATLAXIA: a UCAM spin-off whose technology comes from TRUEDATA (INCIBE's pre-commercial public procurement, tried in three real water installations), now commercialising; software to see what happens in a plant, understand why and decide in time; it starts with water, runs on equipment installed in the plant and the data never leave it; a graph neural network; Jorge in its founding team, developing the platform and handling marketing, commercial strategy and client relations | atlaxia.es, read 2026-11-25 (h1, hero, Quiénes somos, Equipo fundador). The site titles him "CMO y desarrollo full-stack"; the case study gives what he does, not the title (Q69) |
| ATLAXIA's web: version 1 (2026-05-05 to 2026-06-30) by Jorge alone, a Next.js landing on GitHub Pages with the company's domain; version 2: its base (initial commit, 2026-10-08), the isometric illustrations with their generator, player and tests, the first performance fix (`--scene-progress: initial` and `@property --parallax-t`, 2026-10-13), the narrative moved to Qué hacemos, the team gallery and navigation adjusted, and the deploy that replaced version 1 (2026-10-21) are Jorge's commits; the choreographed scenes engine, chapter covers, Quiénes somos, Equipo, El producto hoy, the 2026-10-17 fluidity review and the responsive audit with its seventeen fixes are David Palazón's (CTO) | `J0rgw/AtlaxiaBussinessWeb` history, checked 2026-11-25: J0rgw 39 commits, dpalazon-dev 52; the README and docs/DECISIONES.md for the principles (claim plus visual proof, motion with a purpose, ES/EN, Storybook for a future library) |
| ATLAXIA's web, figures: Lighthouse 13.6 (PageSpeed Insights, 2026-11-17) 99 performance on mobile and 100 for accessibility, best practices and SEO, 100 in all four on desktop, LCP 1,4 s and 0,3 s; frames over 50 ms 27 → 0 and long tasks 22 → 0 (mobile 390 × 844, CPU 4× slower, median of three runs, 2026-10-13); five causes; 3.275 elements restyled per frame; style recalculation 1.426 → 588 ms; masks only while a line draws; illustrations requested at idle (frames of 104–127 ms before); about 600 KB in 22 requests, all to atlaxia.es, no cookies or local storage; deploy by GitHub Actions over SSH, a build container and Caddy with zstd; 169 tests (Vitest, Testing Library); a Playwright audit of about 650 screenshots from 320 × 568 to 2560 × 1440, both languages, reduced motion and keyboard only, seventeen issues (2026-10-20); about 33 ms per frame left with the CPU 4× slower | Jorge's LinkedIn post of 2026-11-18 ("La nueva web de atlaxia.es alcanza 99 puntos…") and its twelve-image breakdown, read 2026-11-25 |
| ATLAXIA's disc and sleeve: ATLAXIA's symbol and wordmark in the print white on the print black, the small print "Tecnología para entender / sistemas industriales" (atlaxia.es's h1, shortened), "Vol. 02 / 2026" (the web's second version, the case study's) | Jorge's brief, 2026-11-25 ("use the atlaxia logo and name to modify the burned cd and make the cd black and the logo white"); the marks are ATLAXIA's own SVGs (`J0rgw/AtlaxiaBussinessWeb`, `src/assets/brand/svg`), set by `scripts/generate-atlaxia-print.py` in the hero disc's layout |
| Evidence: atlaxia.es's home on desktop and on a phone, and the "Empezamos por el agua" scene | Captured from the published site, 2026-11-25 (Playwright, Chrome, 1440 × 900 and 390 × 844 at 2×) |

---

## 7. SEO map

- `lang="es"` everywhere. English is not published yet; the content model keeps copy in
  `src/config` so an `/en/` tree with `hreflang` can be added without duplicating components.
  No machine-translated pages.
- Unique `<title>` and meta description per route (`seo` fields), canonical with trailing slash on
  `https://portfolio.jarcas.dev`, Open Graph and Twitter cards with a 1200×630 image per page.
- Exactly one `h1` per page; H2 per chapter; H3 per item. Checked at build by
  `scripts/check-seo.mjs`.
- Structured data (only verified facts): home → `Person` and `WebSite`; projects →
  `CollectionPage` + `ItemList` + `BreadcrumbList`; services → `WebPage` with an `ItemList` of
  `Service` items, their provider the Person (the offers moved there with their content,
  ADR-003) + `BreadcrumbList`; the bonus → `WebPage` + `BreadcrumbList`; case study →
  `CreativeWork` + `BreadcrumbList`. No `LocalBusiness` (no public address), no `alumniOf`
  (implies graduation), no ratings.
- Search intent is matched by real content: *desarrollo web a medida*, *desarrollador full-stack
  freelance*, *desarrollo de aplicaciones web*, *integración de CRM*, *automatización de
  procesos*, *landing pages*. Each phrase appears where the matching evidence is.
- Dedicated service pages (one per service) were evaluated and **rejected for now**: with
  today's evidence they would be thin. Revisit when each service has two or more case studies.
  `/servicios/` (ADR-003) is one page for the four offers and the process, not one per service.
  `/servicios/` and `/libreria/` share the home's social card, as `/proyectos/` does.
- `robots.txt` allows everything and points to the sitemap; `404.html` is `noindex`.
