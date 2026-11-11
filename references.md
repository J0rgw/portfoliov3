> TASK 02 update · 2026-11-02: [DESIGN.md](DESIGN.md) now owns the artistic language.
> Keep A24's disc interaction, Jorge's original hero composition and marker arrow, Kyoosang's
> physical narrative, the booklet and back-cover references. The old serif title, forced
> word breaks, uniform hairlines and decoration-only handwriting are superseded by Poppins,
> printed inserts and the composition rules of TASK 02. Detailed observations below remain
> a dated research record, not instructions to reproduce those interfaces.

# references.md — Visual research and reference matrix

The single source of truth for visual inspiration. Every reference below is mapped to
specific decisions. Read this file, plus [`docs/ART_DIRECTION.md`](docs/ART_DIRECTION.md)
and [`docs/MOTION_SYSTEM.md`](docs/MOTION_SYSTEM.md), **before** touching any visual section.

- **Owner intention**: what Jorge asked each reference to contribute (from the V3 brief).
- **Observed**: what was actually seen on the live page. Every reference was opened in a real
  Chromium (1440×900 desktop, 390×844 mobile, several scroll positions) on **2026-10-26**.
  Transfer sizes, fonts, canvas count and scroll behaviour were measured, not guessed.
- **Proposed**: how the quality is translated into this site. These are design decisions, not
  observations.

Borrow the *quality*, never the assets, layouts or branding. Nothing here is copied wholesale.

---

## Quick matrix

| # | Reference | Primary target | Borrowed quality (one line) | Priority | Status |
|---|-----------|----------------|------------------------------|----------|--------|
| 1 | [Cool Interaction](https://coolinteraction.framer.website/) | Projects, header | Index numeral with total (`01 /06`), credits columns, persistent inquiry link | High | Implemented (tracklist numerals, credits) |
| 2 | [A24 by Ravi Klaassens](https://www.awwwards.com/sites/a24) | Projects, case studies, hero object | The disc as cover object, credits table, rim text, index ↔ detail morph, **the disc gallery** | **Highest (projects)** | Implemented (Disc, credits, view transition; hero disc is Jorge's printed CD since 2026-10-29; chapter 01 rebuilt as A24's disc gallery on 2026-10-30; arc path and hover pen loop in TASK 01 the same day; 2026-11-09: credits unboxed and moved to the bottom left, stack as marks, keys under the selected disc, one previous disc only; the same day the discs became photographic printed singles with Jorge's cut-outs, #18) |
| 3 | [Matt Jinn](https://www.awwwards.com/sites/matt-jinn) | Hero, bonus teaser | Type laid over the image, one clear action at the foot of the hero | High (hero) | Superseded in the hero (2026-10-29: Jorge's sketch has no headline or CTA; type sits beside the object, not over it). Promo-card idea kept for the bonus |
| 4 | [Kyoosang Choi](https://www.awwwards.com/sites/kyoosang-choi) | About, contact, voice | Personal material culture as narrative objects; handwriting as voice | **Highest (concept)** | Implemented (handwriting layer, back cover, hero hand gripping the sleeve; since ADR-001, 2026-11-10, Jorge's portrait as a cut-out in About instead of the pass) |
| 5 | [Gianluca Boccia, Still Drawing](https://www.awwwards.com/sites/gianluca-boccia-still-drawing) | About, liner notes | One continuous thread through the story; accessible no-animation path | Medium | Partial (reduced-motion parity; the thread left with the booklet, ADR-001) |
| 6 | [Emma Portner, Islands](https://www.awwwards.com/sites/emma-portner-islands) | About, bonus atmosphere | Delicate, airy composition on a light ground | Low | Partial (negative space only) |
| 7 | [The Romans](https://www.awwwards.com/sites/the-romans) | Contact, nav panel, headings | Oversized editorial type, inline image in a headline, square CTAs | High (contact) | Implemented (back cover; since ADR-001 the oversized "Hablemos", with the CD-R between word and arrow, is the email link; no square CTAs on the home chapters or the Projects pages) |
| 8 | [Huy Phan Vol.2](https://www.awwwards.com/sites/huy-phan-vol-2) | Header, about, contact | Positioning next to the name, inquiry always reachable, vertical spine | High | Implemented (role under the name in the hero, header CTA); obi-strip spine not built yet |
| 9 | [Kerimov Designs](https://www.awwwards.com/sites/kerimov-designs) | Navigation | Label / value spec rows, numbered hairline menu rows, "open for work" status | High (nav) | Implemented (menu rows; the hero spec strip was removed 2026-10-29, the back cover's spec rows by ADR-001 on 2026-11-10) |
| 10 | [CollectUI, Branding](https://collectui.com/designs/branding-ui-design-inspiration/2371740b-4137-44b8-acd9-de254f5392e1) | Brand details | Simple silhouette filled with tactile collage | Medium | Partial (paper grain, handwritten scraps); since 2026-11-09 real collage material in the hero and on the discs (#18) |
| 11 | [CollectUI, Subscribe](https://collectui.com/designs/subscribe-ui-design-inspiration/00947ffb-a6fd-4933-a025-3ea35fa4aef3) | Bonus track | Oversized headline with asterisk on a tinted card, single action | Medium | Implemented (the oversized "Avísame*" is the mailto link itself, no card, no fake form; ADR-001) |
| 12 | [CollectUI, Navigation 9f343652](https://collectui.com/designs/navigation-ui-design-inspiration/9f343652-7a1e-487e-b5ff-278ef0da84b6) | Case studies | Sticky case-study chapter list with a moving active marker | High (case studies) | Implemented (sticky tracklist TOC) |
| 13 | [CollectUI, Navigation c00d3685](https://collectui.com/designs/navigation-ui-design-inspiration/c00d3685-8461-4712-902b-e4547da18729) | Case studies | TOC that compresses into a dash rail | Medium | Implemented (dash markers) |
| 14 | [CollectUI, Navigation 21793fa2](https://collectui.com/designs/navigation-ui-design-inspiration/21793fa2-4d46-4191-ada2-5386883d89a1) | Navigation panel | Media-device UI nostalgia; selected item reveals a one-line description | Medium | Implemented 2026-11-10 (ADR-001): Proceso's five steps are the playlist on Jorge's iPod, the selected step's line in the credits; also the menu panel's project list with taglines |
| 15 | [CollectUI, Header 1859d1a8](https://collectui.com/designs/header-navigation-ui-design-inspiration/1859d1a8-7cda-4d8b-9755-fcd8a605dceb) | Navigation | Active indicator that travels between items | Low | Not implemented (by design, see notes) |
| 16 | [CollectUI, Header 733e9ab8](https://collectui.com/designs/header-navigation-ui-design-inspiration/733e9ab8-c15c-415c-8003-f4b194c85fef) | Page transitions | Navigation stays put while the page changes underneath | Medium | Implemented (persistent header across view transitions) |
| 17 | Jorge's marker arrow (`private/originals/gallery/cd7e159e….jpg`, supplied 2026-10-30) | Projects annotation | A blue marker stroke: a sweep, one loop, an arrowhead | High (projects) | Implemented (`MarkerArrow`). Since TASK 01 (2026-10-30) the original image itself, keyed out of its painted checkerboard into `marker-arrow.webp` by `scripts/extract-marker-arrow.py` (the SVG redrawing is gone). Dark theme: generated orange ink `marker-arrow-dark.webp` (2026-11-02, Q29). Label moved to the tail's free end (2026-11-09) |
| 18 | Jorge's cut-out set (`private/originals/assets/`, supplied 2026-11-09) and his broken-disc screenshot ("the CDs are really different") | Hero, Projects | Realistic photographed objects cut out like a 2000s CD-cover collage; discs that read as photographs | **Highest (hero, projects)** | Implemented 2026-11-09: keyed by `scripts/extract-cutouts.py` into `graphics/Cutout`; a collage round the hero scene (headphones, knob, "!!", sticker and tape on the sleeve, ink loop, train); release discs reprinted as printed singles (a cut-out on each label, the hero disc's real hub and rim, real wear from the broken disc, no rim text); the phone beside the private disc. Megaphone and paper arrows not used yet. 2026-11-10: the hero recomposed as the diagonal study Jorge chose (large name top left, his arm photo holding the sleeve); the tape and the train removed at his request, the ink loop and "!!" with the small credit; then his own arm re-gripped, the disc at 1200 px and the handed-in entrance. With ADR-001 (same day) the iPod became Proceso's object and his portrait (the pass's photo) About's |

Status reflects the build verified on 2026-10-26, the hero verified on 2026-10-29 after its
recomposition from Jorge's hand-drawn sketch, which is now the hero's primary reference
(see `docs/IMPLEMENTATION_PLAN.md` §7, §7.1 and §7.2, and ART_DIRECTION §5.1), and the Projects
disc gallery verified on 2026-10-30 (§7.3, ART_DIRECTION §5.2). The light/dark colour system
(blue by day, orange by night) was verified on 2026-11-02; it changes colour only, never a
reference's layout (plan, "Colour system"). Smooth scroll, proximity chapter snap and the hero /
Projects parallax were added and checked at 1512 × 734 and 390 × 844 on 2026-11-09
(MOTION_SYSTEM §2.3–2.4), and the chapter hold modelled on atlaxia.es (§2.5); they move layers
only, never a reference's resting layout. The cut-out collage (#18) was checked the same day at
1024 × 768, 1280 × 800, 1440 × 900, 1512 × 734, 1920 × 1080, 768 × 1024 and 390 × 844, in both
themes, with reduced motion and without JavaScript. The hero's diagonal recomposition
(2026-11-10, from the layout study Jorge chose) was checked at 1024 × 768, 1280 × 800,
1440 × 900, 1512 × 734, 1920 × 1080, 768 × 1024 and 390 × 844. The same day's critique fixes
(`/impeccable critique`, 29/40; snapshot in `.impeccable/critique/`) carry the booklet and
printed-insert references (#2, #4, #5) into the middle chapters: Process's saddle-stitched
booklet and paper-slip notes, Services printed as a tracklist insert, the About notes signed,
the handwritten words beside headings removed, the chapter hold's marker, the header's veil and
the About portrait's face at every width. Checked at 1512 × 734 in both themes, at 320, 360,
390, 768, 1024 and 1280 px wide (no horizontal overflow), and without JavaScript. The second
critique (30/40, no P1) led the same evening to small mono capitals only where an object prints
them (36 → 10 on home), a quieter bonus headline, the hero's name leaving under the header's
veil, and paper edges in the dark (a lip of light, a spine crease for the staples); checked the
same way. After the third run (30/40, no P0–P2), the header took the JA monogram, a CD
player's track readout and a softer veil, lost its theme switch, and About lost its logo strip;
checked at 1512 × 734 in both themes, at 320 and 390 px, and without JavaScript. The same
day's deslop pass (brief in `.impeccable/critique/desloping.md`) kept every reference's object
and removed what only decorated it: middots between data, the timeline's category column, the
bonus's status badge, circled step numbers, card-footer and doubled rules, a dot's halo, the
menu's self-naming label; checked at 320 to 1440 px in both themes, with reduced motion and
without JavaScript. Later the same day, [ADR-001](docs/adr/ADR-001-chapter-frames.md) at Jorge's
request: every chapter after Projects became one frame in the hero's and Projects' language (the
iPod's playlist, the services tracklist, the portrait cut-out, "Avísame*" and "Hablemos" as the
links themselves), the hold only holds what fits, and the Projects pages follow the gallery's
credits; checked at 1024 × 768, 1280 × 720, 1440 × 900, 1512 × 734, 1920 × 1080, 768 × 1024,
390 × 844 and 320 × 640, in both themes, with reduced motion and without JavaScript.

Supporting resources: [SVGL](https://svgl.app/) (technology logos; the files in
`public/images/logo/` follow that source), [Fontpair](https://fontpair.co/) (not needed, the
pairing is fixed by the files we can legally ship, see ART_DIRECTION §3), and the
[local fonts folder](https://github.com/J0rgw/portfoliov3/tree/main/public/fonts) (verified:
it contains **only** `estrella-early.otf`; no Poppins files existed before this refactor).

---

## Detailed records

### 1. Cool Interaction
- **URL**: https://coolinteraction.framer.website/
- **Owner intention**: project presentation, interaction patterns, portfolio showcases.
- **Observed**:
  - A Framer template ("Studio©", credited *Replicate by Ali kashif*). Its structure is the same
    as Huy Phan Vol.2 (#8): vertical rotated wordmark with location and copyright on the left
    edge, a top row with `Menu`, `Working globally —` and `For inquiries` plus an email.
  - Work index: a right-hand list of projects (category label, uppercase title, em dash, one-line
    description). The active item is full contrast; the rest fade out. A centred image shows the
    active project. Left columns hold metadata (`Team / Role`, `Launch`, `Recognition`). A giant
    numeral `01` sits next to the total `/06`.
  - Mouse wheel advances the active project; the document never scrolls (`scrollY` stayed 0).
  - No `<h1>`. 54 images. Inter only. Light grey ground (~#EEEEEE).
- **Proposed**:
  - Track numerals with a total (`01 / 07`) in tabular mono on every project row and case study.
  - A credits table per project (role, year, type, stack, status), the same component as A24's.
  - The inquiry link stays reachable from the header on every page.
- **Do not replicate**: wheel hijacking; fading inactive items to low contrast (fails WCAG 1.4.3,
  dim with size or weight instead); missing headings.
- **Accessibility / performance**: native scroll only; emphasis must not rely on opacity alone.
- **Targets**: Chapter 01 Projects, `/proyectos/` index, case-study cover, header.

### 2. A24 (by Ravi Klaassens)
- **URL**: https://www.awwwards.com/sites/a24 (site: https://a24.raviklaassens.com/)
- **Owner intention**: project catalogs, detailed information, hierarchy, immersive
  presentation, case-study structure. **Primary reference for project pages.**
- **Observed**:
  - Awwwards Site of the Day, 26 Oct 2026 (7.65). Described by its author as *"an experimental,
    non-commercial project reimagining A24's filmography through a 3D disc-based experience"*.
    Tools listed: GSAP, Three.js, Barba.js. Palette `#000` / `#F2F2F2`.
  - Every film is a **compact disc** with the poster printed on it, a clear plastic centre hub,
    and credits set along the rim. Discs sit on a diagonal carousel that the wheel drives
    (Lenis, one `<canvas>`, document height equals the viewport).
  - Top-left: the title in high-contrast serif capitals, then a **credits table**
    (`DIRECTED BY`, `YEAR`, `STARRING`) with hairline rules, letterspaced micro labels on the
    left and values right-aligned.
  - Centred top nav: logo, `Films` (active dot), `Television`, `Index ▾`.
  - Press quotes with star ratings and letterspaced source names along the bottom.
  - A **hand-drawn marker scribble** circles one disc.
  - Paper-grain off-white ground. Fonts: PP Neue Montreal, PP Museum, PP Eiko. ~2 MB transferred.
    A `prefers-reduced-motion` rule exists. Titles, credits and `alt="… disc artwork"` text are
    present in the DOM despite the WebGL scene.
  - Awwwards lists dedicated transitions for *Films → Detail page* and *Films → Television*, and a
    designed 404.
- **Proposed**:
  - The **disc is the cover object** of every project (`components/Disc`), printed with generated
    cover art (`components/CoverArt`) and rim text carrying the credits.
  - The A24 credits table becomes `components/CreditsTable` (case-study cover, projects index).
  - The marker scribble becomes the Estrella handwriting layer (annotations, never content).
  - *Index → detail* morph: cross-document View Transitions name the disc on the row and on the
    case-study cover, so it travels between pages. Pure progressive enhancement.
  - A designed 404 ("pista no encontrada").
- **Observed again on 2026-10-30** (1512×734, Chrome): the selected disc sits near the centre;
  the previous one lower left and smaller, the next ones upper right, larger and cropped by the
  frame, all sharing one 3D lean (a diagonal row, no fading). Top left: the title in PP Eiko
  capitals (31.5 px at 1512 px, −0.04 em), then the credits table (PP Museum labels at 7.9 px,
  +0.2 em; PP Neue Montreal 500 values at 14 px, right-aligned) with hairlines; the title swaps
  with a line-by-line rise. The wheel moves the row one film at a time; a drag spins the disc
  in 3D; hovering the selected disc circles it with a marker scribble; a click opens the film
  page (`/production/<slug>`: centred serif title, inline credits, hairline spec rows).
- **Implemented 2026-10-30 (chapter 01)**: the diagonal row of discs with a shared lean, the
  selected one largest (Jorge's brief: secondaries smaller on both sides, unlike A24's growing
  next disc), credits top left with a serif title (Bodoni Moda, ART_DIRECTION §3.2), the title's
  line-by-line rise, a blue marker annotation instead of the scribble (reference #17).
  Navigation is drag (with inertia and snap), previous/next buttons and arrow keys.
- **Observed for TASK 01 (2026-10-30, 1512×734, Chrome)**: disc centres relative to the selected
  one, in its diameter: previous −0.9, +0.22 (scale ~0.8) and −1.56, +0.30 (~0.7); next +1.13,
  −0.32 (~1.15, cropped). A rising curve that steepens to the right (fits
  `y ≈ −0.26·x − 0.05·x²`), not a straight diagonal; the previous discs overlap one another. The
  hover scribble is a black pen line of ~2 px, about two loose turns round the disc, that keeps
  turning while the pointer stays and is retraced within ~300 ms when it leaves.
- **Implemented in TASK 01**: the discs travel one continuous arc (`discPose.ts`, `TRACK`;
  MOTION_SYSTEM §2.2), two previous discs on frames tall enough to clear the credits; a pen loop
  (`HandCircle`, generated, not traced) drawn in and turning round the hovered disc; Jorge's
  arrow is now his original image, keyed out of its checkerboard. Still different by decision:
  both neighbours smaller (A24 grows the next one), one loop instead of A24's two, no wheel.
- **Do not replicate**: the wheel-driven carousel (scroll hijacking: the wheel keeps scrolling
  the page here); dependence on WebGL; review quotes and star ratings, **we have no press and
  must never invent any**.
- **Accessibility / performance**: CSS-only disc (gradients, masks, SVG `textPath`) under CSS 3D
  transforms, no canvas. All text real and selectable. Morph disabled under reduced motion.
- **Targets**: Chapter 01, `/proyectos/`, `/proyectos/<slug>/`, hero object, 404.

### 3. Matt Jinn
- **URL**: https://www.awwwards.com/sites/matt-jinn (site: https://mattjinn.com/)
- **Owner intention**: immersive storytelling, full-screen imagery, parallax.
- **Observed**:
  - Honorable Mention, 14 Sep 2026. NYC singer-songwriter. Palette `#FFF` / `#000`.
  - Full-bleed portrait with a **huge lowercase italic serif name** (Big Caslon italic) laid over
    the face; tiny wordmark top-left, `Menu ≡` top-right.
  - One action at the foot of the hero: *Listen on Spotify / Apple Music / YouTube*.
  - A small **release promo card** bottom-left (artwork thumbnail, "merch drops soon",
    *Get Updates*).
  - Home is a single full-screen scene (Lenis; document height equals the viewport). ~7 MB.
    No reduced-motion CSS. Mobile menu: black, large italic serif links, social icons.
- **Proposed**:
  - Hero (until 2026-10-29): the name set over the visual layer and one primary action plus one
    secondary at the foot. Dropped when the hero was recomposed from Jorge's sketch: no CTA in the
    hero, the identity beside the object.
  - The promo card pattern informs the Bonus Track teaser.
  - Constraint we must respect: the only portrait is a 457×546 cut-out, so a full-bleed photo
    would be blurry. "Cinematic" is translated into a layered print-scale composition instead of
    one giant photograph: since 2026-10-29, Jorge's printed disc behind his cover in a clear
    film, held by a hand (ART_DIRECTION §5.1). The identity sits beside it, not over it, so the
    disc's own print stays legible.
- **Do not replicate**: a hero that is the whole site; heavy photographic payloads; text over busy
  photos without a contrast plate.
- **Targets**: Chapter 00 hero, Chapter 05 bonus.

### 4. Kyoosang Choi
- **URL**: https://www.awwwards.com/sites/kyoosang-choi (site: https://kyoosangchoi.com/)
- **Owner intention**: **highest-priority conceptual reference** for culture-based personal
  storytelling.
- **Observed**:
  - Nominee, 9 Oct 2026: *"Personal portfolio—blending art direction, motion, 3D, and
    storytelling."* Black ground.
  - A **handwritten signature** (Homemade Apple) is the wordmark. The hero mixes an outlined
    italic `K`, a bold italic `yoosang`, letterspaced light italic phrases, and ends on *action.*
    written by hand. Roles are set vertically. His name appears again **handwritten in Hangul**.
  - A sticker-bombed notebook (*Click to open*, streetwear and New York stickers, *Our
    history* / *Our future*) lies on a cutting mat next to a fountain pen. Contact is **a hand
    holding a business card**: *Let's work together! CONTACT Kyoosang Choi*. Footer links styled
    `/mail/ /CV/ /in/ /@/`.
  - Native scroll (~5,200 px), 2 videos, 23 images, **~29 MB transferred**, no `<h1>`, no
    reduced-motion rule.
- **Why it feels personal**: every object is his own material culture (his handwriting, his
  languages, his stickers), not a generic prop. The design is a frame around real artefacts.
- **Proposed** (Jorge's authentic equivalents, all verifiable):
  - The CD-R with a **marker-written label** is the core object; Estrella plays the role of the
    handwriting. It is a design choice, never presented as a childhood memory.
  - The About chapter is built from his real artefacts: the frog mark, his DevFest 2025 talk,
    his studies and roles, his own tools (Disco Download is literally a music tool).
  - Contact is a tangible object: the **back cover / tray card** of the album.
  - His "hand holding a business card" returns in the hero: a hand grips the album's sleeve by
    its edge, thumb on the plastic, while the disc turns behind it (2026-10-29). His handwriting
    returns as the hero name, set in Estrella in the credit.
  - The ProfileCard becomes a laminated **backstage pass** with foil.
- **Do not replicate**: his cultural identity (Hangul, streetwear, New York); weight; missing
  headings; letterspaced light italic paragraphs.
- **Targets**: Chapter 04 About, Chapter 06 Contact, the voice of the whole site.

### 5. Gianluca Boccia, Still Drawing
- **URL**: https://www.awwwards.com/sites/gianluca-boccia-still-drawing (site: https://www.gianlucaboccia.me/)
- **Owner intention**: storytelling and expressive composition.
- **Observed**:
  - Nominee, 25 Oct 2026: *"A life and a design practice, told in one continuous line"*, a
    tribute to Cavandoli's *La Linea*. White ground, Helvetica Neue.
  - One continuous SVG line draws the story as you scroll (native scroll, ~52,000 px).
  - A large plain sentence (*I started with what I had.*). Nav: `Story`, `Work 09` (superscript count), `CV ↗`, `Contact`. Chapter
    indicator bottom-left: `00 The beginning +`.
  - A **"Read the story without animation"** link at the very top. An analytics consent dialog
    drawn with the same line. A reduced-motion rule exists.
- **Proposed**:
  - A single continuous thread: the hairline "timeline rule" that runs through the milestones
    and the liner-notes steps, so chapters read as one story.
  - Counts in navigation (`Proyectos 06`).
  - Reduced-motion parity: every animated story beat is fully readable without animation.
  - Consent and privacy copy designed as part of the identity (Bonus Track waitlist).
- **Do not replicate**: putting essential information at the end of a very long scroll.
- **Targets**: Chapter 02 Liner notes, Chapter 04 About.

### 6. Emma Portner, Islands
- **URL**: https://www.awwwards.com/sites/emma-portner-islands (site: https://emmaportner.com/)
- **Owner intention**: artistic atmosphere, delicate compositions, ethereal treatment.
- **Observed**:
  - Nominee, 13 Oct 2026. Dancer and choreographer. Organic blob-shaped "islands" holding playable
    video and pencil sketches, scattered across a light grey ground. Century serif. Name left,
    *Physical Narratives* centre, `Menu` right.
  - `overflow: hidden` on the document (custom scrolling), 6 videos, **~269 MB transferred**
    during a one-minute capture. Three.js.
- **Proposed**: generosity of negative space and a light, airy ground around the objects in About
  and the Bonus card. Nothing more.
- **Do not replicate**: autoplaying video grids, custom scrolling, blob masks on essential
  content.
- **Targets**: atmosphere only.

### 7. The Romans
- **URL**: https://www.awwwards.com/sites/the-romans (site: https://www.wearetheromans.com/)
- **Owner intention**: oversized typography, bold editorial storytelling, navigation.
- **Observed**:
  - Honorable Mention, 30 Sep 2026. PR agency. `#0A0A0A` / `#F5F5F5`.
  - Hero headline in RocGrotesk 700 condensed capitals at ~219 px, mixing upright and *italic*
    within one statement, with a slanted image set **inline between words**.
  - Nav: condensed caps links and a world clock (`AMS 21:19`) in a bordered box. Square bordered
    scroll button. Rectangular `LEARN MORE →` buttons.
  - Mobile menu: light ground, huge condensed capitals, **current item in italic**, social tiles,
    office list.
  - Lenis and an intro animation; the wheel did not scroll during the intro. ~17 MB.
    Reduced-motion rule present.
- **Proposed**:
  - Back cover: an oversized statement with an inline object (the disc) set between words.
  - Square, bordered, uppercase CTAs with an arrow (`components/Button`).
  - Menu active state by style (weight / marker), not colour alone.
- **Do not replicate**: intro animations that block scrolling; faking a condensed face by
  stretching Poppins (explicitly forbidden).
- **Targets**: Chapter 06 Contact, chapter headings, navigation panel.

### 8. Huy Phan Vol.2
- **URL**: https://www.awwwards.com/sites/huy-phan-vol-2 (site: https://huyml.co/)
- **Owner intention**: personal positioning, about and contact.
- **Observed**:
  - Site of the Day, 14 Oct 2026 (7.67). Independent designer and art director, Ho Chi Minh City.
  - Vertical `HUYML©` wordmark with rotated phone, city and copyright on the left edge. Stacked
    caps menu `→ WORK / ABOUT / PLAYGROUND / CONTACT`, an `Audio Off —` toggle,
    `Working globally HCMC 03:19`, and **`For inquiries hello@huyml.co` always top-right**.
  - Work index identical in structure to Cool Interaction (metadata, `Selected work 19 /19`),
    wheel-driven. About and contact are modals (per Awwwards element list). ~1 MB. No `<h1>`.
- **Proposed**:
  - Positioning sits **right next to the name** in the hero (role, offer, availability).
  - An inquiry action is reachable from the header on every page (`Hablemos`).
  - The vertical spine becomes the CD **obi strip** idea: rotated catalog metadata on the edge
    of the hero composition (desktop only). **Not built yet** (backlog in the implementation plan).
- **Do not replicate**: modal-only About and Contact (not indexable), audio, wheel hijack.
- **Targets**: header, hero, Chapter 04, Chapter 06.

### 9. Kerimov Designs
- **URL**: https://www.awwwards.com/sites/kerimov-designs (site: https://www.kerimovdesigns.com/)
- **Owner intention**: navigation, project interactions, hover states, responsive menu.
- **Observed**:
  - Nominee, 13 Oct 2026. Graphic designer, Oslo. Dark olive-black ground, cream text,
    Satoshi 400/900.
  - Header as a **spec sheet**: `NAME / RUSTAM KERIMOV`, `OCCUPATION / GRAPHIC DESIGNER`,
    `LOCATION / OSLO, NORWAY`, plus `HOME MY WORK CONTACT`. Footer row: `PORTFOLIO / 2026`,
    `LATEST PROJECT / …`, `STATUS / OPEN FOR WORK`, `LOCAL TIME / 21:20 CET`.
  - Nav labels are duplicated letter by letter in the DOM for a letter-roll hover (a screen reader
    hazard unless the copy is hidden).
  - Mobile menu: `NAVIGATION` label, hairline rows, label with a right-aligned number
    `01 / 02 / 03`, the current item brighter and indented.
  - WebGL poster gallery with label chips, Lenis, ~8 MB.
- **Proposed**:
  - Label / value spec rows: the back cover (`Estado / Disponible`). The hero catalog strip was
    removed on 2026-10-29 at Jorge's request.
  - Numbered hairline menu rows. The existing `StaggeredMenu` already numbers its items, so it is
    **kept and restyled** rather than replaced.
- **Do not replicate**: duplicated-letter DOM; infinite WebGL galleries.
- **Targets**: navigation panel, back cover.

### 10. CollectUI, Branding (Sam Stoof)
- **URL**: https://collectui.com/designs/branding-ui-design-inspiration/2371740b-4137-44b8-acd9-de254f5392e1
- **Observed**: a simple running-figure silhouette filled with collaged torn paper, handwriting,
  photo fragments and orange paint, on white.
- **Proposed**: tactile material inside simple shapes: paper grain on the ground, handwritten
  scraps (Estrella) and printed textures inside the disc label and the pass foil.
- **Do not replicate**: the figure or its collage.
- **Targets**: brand details, 404, social preview images.

### 11. CollectUI, Subscribe (Oğuz B)
- **URL**: https://collectui.com/designs/subscribe-ui-design-inspiration/00947ffb-a6fd-4933-a025-3ea35fa4aef3
- **Observed**: *"Join the \*waitlist"* in a heavy grotesk that bleeds out of a soft lilac card,
  with ghosted overlapping letters; one email field with an inset black `JOIN` button.
- **Proposed**: the Bonus Track card uses an oversized headline with an asterisk and a single
  action. **There is no waitlist backend**, so the action is an honest `mailto:` ("Avísame") with
  a privacy note; the requirements for a real waitlist are documented in the implementation plan.
- **Do not replicate**: a form that looks like it subscribes when nothing is stored.
- **Targets**: Chapter 05 Bonus Track.

### 12. CollectUI, Navigation 9f343652 (Jerry, "Navbar indicator on a Bézier curve")
- **URL**: https://collectui.com/designs/navigation-ui-design-inspiration/9f343652-7a1e-487e-b5ff-278ef0da84b6
- **Observed**: a case-study page with a sticky left chapter list (*Overview, The Problem,
  Extraction Model, Rebate Extraction, The Visuals, Conclusion ■*); the active marker moves along
  a curve as you scroll.
- **Proposed**: case studies get a sticky "tracklist" table of contents with scroll-spy and a
  small active marker. Straight line, no curve maths.
- **Targets**: `/proyectos/<slug>/`.

### 13. CollectUI, Navigation c00d3685 (Noe)
- **URL**: https://collectui.com/designs/navigation-ui-design-inspiration/c00d3685-8461-4712-902b-e4547da18729
- **Observed**: in a long article, *"the table of contents collapses into a line of dashes while
  you scroll and only spells itself back out once you stop"*.
- **Proposed**: the case-study TOC shows a dash per section (the dash *is* the track marker);
  labels stay visible on wide screens. The collapse-while-scrolling behaviour was rejected
  because it hides navigation during motion.
- **Targets**: `/proyectos/<slug>/`.

### 14. CollectUI, Navigation 21793fa2 (ozzy, "navbars are boring so i made mine a playstation")
- **URL**: https://collectui.com/designs/navigation-ui-design-inspiration/21793fa2-4d46-4191-ada2-5386883d89a1
- **Observed**: a console-style cross-media bar: horizontal category icons, a vertical submenu, the
  selected item showing a one-line description (*Blog: Design notes, weekly*).
- **Proposed**: nostalgia for media-device UI in the menu panel: projects listed like tracks, each
  with its one-line tagline.
- **Do not replicate**: icon-only categories (unclear destinations).
- **Targets**: navigation panel.

### 15. CollectUI, Header 1859d1a8 (Swami, "gooey navbar")
- **URL**: https://collectui.com/designs/header-navigation-ui-design-inspiration/1859d1a8-7cda-4d8b-9755-fcd8a605dceb
- **Observed**: dark pill tabs; the active `Home` tab splits away in orange with a gooey morph.
- **Proposed**: **not implemented**. A travelling indicator would compete with the disc as the
  identity moment, and SVG goo filters repaint every frame. Recorded so nobody adds it ad hoc.

### 16. CollectUI, Header 733e9ab8 (Eduard Bodak)
- **URL**: https://collectui.com/designs/header-navigation-ui-design-inspiration/733e9ab8-c15c-415c-8003-f4b194c85fef
- **Observed**: big text nav `Service Work Connect` with a hover pill; during Swup page transitions
  the navigation stays in place and a small loading circle appears next to it.
- **Proposed**: across cross-document view transitions the header keeps its own
  `view-transition-name`, so it stays put while the page changes underneath.
- **Targets**: global page transitions.

---

## Rules derived from this research

1. **No scroll hijacking.** Six of the nine Awwwards/Framer sites capture the wheel. We do not page
   or block it. Amended 2026-11-09 at Jorge's request: the wheel is eased (Lenis) and settles on
   a nearby chapter start (proximity snap, home only); see MOTION_SYSTEM §2.3.
2. **Weight budget.** References ranged from ~1 MB to ~269 MB. Our budget is in
   `docs/IMPLEMENTATION_PLAN.md` §Performance; every new media asset must fit it.
3. **Headings and real text.** Several references ship no `<h1>`. Every page here has exactly one,
   and every essential sentence is real HTML text.
4. **Reduced motion is a first-class path** (A24, Boccia and The Romans ship it; the rest do not).
5. **Never fabricate social proof.** No quotes, stars, awards or client logos unless they exist.
