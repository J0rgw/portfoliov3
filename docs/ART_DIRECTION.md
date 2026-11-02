# Art direction: The Digital Archive, 1998–2004

Canonical visual language for the site. Every section, component and future addition follows
it. If a change needs to break a rule here, document the exception and the reason in this file
first. Visual research and the reason behind each borrowed quality live in
[`references.md`](../references.md); motion rules live in [`MOTION_SYSTEM.md`](MOTION_SYSTEM.md).

---

## 1. Concept

**A software engineer's portfolio experienced like an album.**

The site is the third release by Jorge Arcas: catalog number **JRG-003** (this is literally his
third portfolio; v1 and v2 exist on GitHub). The home page is the record, each chapter a track,
each project a release with its own cover, credits and liner notes.

The visual world borrows from the years when digital things still felt physical: compact discs
and CD-ROMs, jewel cases, printed booklets and credits, catalog numbers, tray cards with barcodes,
**burned CD-Rs labelled by hand with a marker**, promo stickers on the shrink-wrap, and the
"Enhanced CD" (an audio disc that also carried software).

It is a **cultural and narrative reference, not a simulation**. No fake operating systems, no
terminal cosplay, no neon cyberpunk, no skeuomorphic media player chrome. The result must look
contemporary, editorial and engineered.

**The visitor understands the professional offer before the metaphor.** The metaphor lives in
objects, kickers and small details. Headings, buttons and body copy stay plain Spanish.

### What the metaphor maps to

| Album | Site |
|-------|------|
| Cover | Hero (chapter 00) |
| Tracklist | Chapter navigation (hero), menu panel, case-study table of contents |
| Tracks | Projects (chapter 01), numbered `01 / 07` |
| Liner notes, booklet | Engineering process (chapter 02) |
| Formats on offer | Services (chapter 03) |
| Credits, "the artist" | About (chapter 04), with a laminated backstage pass |
| Bonus track | Component library teaser (chapter 05) |
| Back cover, tray card | Contact and footer (chapter 06): statement, barcode, catalog number, full tracklist |
| Data session of an Enhanced CD | Case-study pages: the technical "data track" of each release |

---

## 2. Personality and voice

Nostalgic but contemporary · experimental but disciplined · artistic but technically credible ·
personal but commercially professional · tactile and editorial.

**Copy rules (Spanish from Spain is the primary language):**

- Lead with the outcome for the client, then the how. Short sentences. No buzzwords.
- Every claim is specific and verifiable from a source listed in
  `docs/INFORMATION_ARCHITECTURE.md` §6. No invented clients, metrics, quotes, awards or dates.
- Forbidden phrases: "apasionado por…", "soluciones innovadoras", "llevo tu negocio al siguiente
  nivel", "pixel perfect", any stack-ranking percentages ("React 90%").
- Music vocabulary appears **only** in kickers, object labels and microcopy ("Pista 01",
  "Bonus track", "Contraportada"). Headings stay literal ("Proyectos seleccionados").
- English terms are allowed where they are the trade term (*full-stack*, *frontend*, *landing
  page*, *bonus track*).

---

## 3. Typography

### 3.1 Verified font facts (inspected 2026-10-26 with fontTools)

**`public/fonts/estrella-early.otf`** (served as `estrella-early.woff2`, 45.5 KB)
- Family *Estrella*, style *Early*, version 1.009, built with Fontself Maker. Designer field:
  **Uncarving**. No licence or vendor URL is embedded (nameID 13/14 absent; `fsType` 0).
  **The licence for web embedding and public redistribution must be confirmed by Jorge.**
- 86 glyphs: `A–Z`, `a–z`, space, no-break space, soft hyphen and 26 contextual ligatures
  (`th`, `tt`, `ll`, `kt`, …). **No digits, no punctuation.**
- Accented letters (`á é í ó ú ñ ü`) are mapped **to the plain base glyph**: "carácter"
  renders as *caracter*, "Sobre mí" as *Sobre mi*. In Spanish that is a spelling error.
- The space is only 0.121 em wide; some capitals have big swashes (`A` overhangs **0.32 em to the
  left**); descenders reach −0.27 em, below the font's declared descent of −0.141 em.
- Character: a fluid marker / graffiti-tag hand. It reads as **handwriting on a CD-R label**.

**Poppins** (OFL 1.1, added in this refactor from `google/fonts`, licence in `public/fonts/OFL.txt`)
- The brief assumed Poppins files already existed; they did not. Poppins was the owner's stated
  intention, its geometric construction belongs to the Futura/Avant Garde lineage that dominated
  late-90s sleeves, and it is legally redistributable, so it was added.
- Subset to Latin + Latin-1 + general punctuation + euro, WOFF2, ~7.8 KB per weight.
  Weights shipped: **400, 600, 700, 800**. Poppins has no arrow or geometric-shape glyphs: arrows
  are always SVG icons.

**Monospace**: the system stack (`ui-monospace, SFMono-Regular, Menlo, Consolas`). Zero bytes.
Used for catalog numbers, track numbers, technical labels and code.

**Bodoni Moda** (OFL 1.1, *The Bodoni Moda Project Authors*, from `google/fonts`, licence in
`public/fonts/BodoniModa-OFL.txt`), added 2026-10-30.
- Why: Jorge's Projects brief asks for A24's serif titles "preferably with the families already
  in the project", and the project had no serif. A24 sets its titles in PP Eiko (commercial),
  a high-contrast serif with hairline serifs; five OFL candidates were compared side by side
  (Bodoni Moda, Playfair Display, Instrument Serif, Gloock, DM Serif Display) and Bodoni Moda's
  capitals were the closest in contrast and width.
- File: the variable font instanced at **wght 400, opsz 32** (hairlines sturdy enough at
  32–60 px), subset like Poppins (Latin, Latin-1, general punctuation, euro; Spanish accents
  checked), WOFF2, **12.6 kB**, `font-display: swap`, not preloaded (first used below the fold).
- Scope: **only the project title in the Projects gallery** (`--font-serif`). Headings, case
  studies and the rest of the site keep Poppins. Widening its use is a new decision.

### 3.2 Roles

| Role | Family | Use | Never |
|------|--------|-----|-------|
| Handwriting / expressive display | Estrella | The hero name (real text in the `h1`), the JA monogram (outlines), marker labels on discs, one handwritten annotation per chapter, the back-cover sign-off | Body, nav, buttons, labels, numbers, any text with accents or punctuation, anything below 40 px |
| Structural headings | Poppins 700 / 800 | H1 support lines, H2, H3, statements, project titles | Faked condensed widths (no `scaleX`, no `font-stretch` hacks) |
| Body and UI | Poppins 400 / 600 | Paragraphs, buttons, nav, form text | Light weights (none shipped) |
| Technical voice | System mono | `JRG-003`, `01 / 07`, years, stacks, credits labels, code | Long paragraphs |
| Film-credit title | Bodoni Moda 400, capitals | The selected project's title in the Projects gallery, one word per line | Anything else: body, labels, other headings |

There is no separate script accent face: Estrella *is* the script accent, and it is used
sparingly. Sloop or similar commercial scripts are not licensed here.

### 3.3 Estrella usage contract

1. Only words written without diacritics or punctuation: `Jorge Arcas`, `Proyectos`, `Proceso`,
   `Servicios`, `Bonus`, `Hablemos`, `Gracias`, `Jarcas`.
2. If the handwriting is decorative, it is `aria-hidden="true"` and the real heading exists in
   Poppins. Exception, the hero (2026-10-29, Jorge's sketch): the name in the `h1` is real text set
   in Estrella ("Jorge Arcas Verdejo" has no accents), shown with only its first capital because
   Estrella's capitals A and V open with a flat stroke that reads as a hyphen (`text-transform`,
   so the text stays as written); the role follows in Poppins.
3. Always set `word-spacing: var(--estrella-word-space)` (the native space is too narrow) and give
   the block inline padding of at least `0.35em` so swashes are not clipped.
4. Line height for stacked words is `--leading-display` (1.0) and the second line is indented.
   The swash overlap between lines is intended; it must never cover another element's text.
5. Minimum size 40 px (2.5 rem). It is a picture of handwriting, not a reading face.

### 3.4 Scale (fluid, defined in `src/styles/tokens.css`)

| Token | Size | Use |
|-------|------|-----|
| `--text-2xs` | 0.6875 rem | Micro labels in credits (mono, uppercase, tracked) |
| `--text-xs` | 0.75 rem | Kickers, meta |
| `--text-sm` | 0.875 rem | Secondary UI, captions |
| `--text-base` | 1 → 1.0625 rem | Body |
| `--text-lg` | 1.125 → 1.375 rem | Lede, intro paragraphs |
| `--text-xl` | 1.375 → 2 rem | H3, statements |
| `--text-2xl` | 2 → 3.75 rem | H2 |
| `--text-3xl` | 2.75 → 6.5 rem | Oversized statements (back cover, case-study titles) |
| `--text-display` | 4.5 → 13 rem | Estrella hero name |

Line heights: display 1.0, headings 1.05–1.15, body 1.6. Measure: 40–68 characters
(`--measure`). Headings use `text-wrap: balance`, paragraphs `text-wrap: pretty`.
Tracking: big Poppins headings −0.02 to −0.035 em; uppercase labels +0.12 em.

---

## 4. Colour and materials

Light ground, kept from the previous decision (the ROADMAP recorded that a dark theme was tried and
reverted at Jorge's request). The paper tone shifts the plain white towards printed stock.

| Token | Value | Role | Contrast on paper |
|-------|-------|------|-------------------|
| `--color-paper` | `#F3F1EC` | Page ground, printed paper | — |
| `--color-paper-raised` | `#FBFAF7` | Inserts, cards | — |
| `--color-paper-sunken` | `#E8E5DE` | Wells, code, tray | — |
| `--color-ink` | `#141414` | Text, primary buttons | 16.3:1 |
| `--color-ink-soft` | `#3B3B40` | Secondary text | 9.9:1 |
| `--color-ink-muted` | `#5F5F66` | Labels, meta (5.0:1 on sunken) | 5.6:1 |
| `--color-accent` | `#1B62AE` | Links, focus ring | 5.5:1 |
| `--color-brand` | `#409FEA` | The frog mark, decorative tints only | 2.5:1, **never text** |
| `--color-signal` | `#1F9D55` | "Available" status dot, always next to its text | non-text |
| `--color-night` | `#121213` | Back cover ground | paper on night 16.6:1 |
| `--color-night-muted` | `#A3A3A8` | Secondary text on night | 7.5:1 on night |
| `--color-accent-on-night` | `#7CC0F5` | Links on night | 9.6:1 on night |

**Iridescence** (the data side of a disc) keeps the colour DNA of the old `ColorBends` shader
(`#ff5c7a`, `#8a5cff`, `#00ffd1`) but as a **CSS material**, mixed into silver at low strength:
`--material-disc`. It appears only on objects (discs, the pass foil, the bonus sticker). It is
never a page background and never animates on its own: it moves with scroll or pointer, or not at
all.

**Paper grain**: an SVG noise texture at very low opacity on the page ground (`--material-grain`)
and, pre-mixed with raised paper, on inserts and booklet pages (`--material-paper`).

**Depth**: shadows (`--shadow-object`) belong only to physical objects (disc, sleeve, pass,
sticker). Interface elements are flat, with hairlines. That contrast keeps the UI
calm and the objects tactile. The hero's packaging uses filter chains instead of box shadows,
because they follow the alpha of the film and the hand: `--filter-sleeve` (a 1–1.5 px edge for
the sleeve's thickness, a tight contact shadow, a soft cast shadow) and `--filter-hand` (contact
on the plastic, softer cast shadow). Both are lit from the top left, like the disc's highlight.

---

## 5. Objects

| Object | Component | Anatomy | Where |
|--------|-----------|---------|-------|
| Disc | `components/Disc` | Printed label with a centre hole (12.5 % of diameter), a clear stacking ring, an iridescent data rim, and credits set along the rim (SVG `textPath`). Label art rotates; the reflection stays fixed, as it does physically under a lamp. A disc with rim credits prints no track number on its cover art (`CoverArt rim`), which would collide with them. | Projects gallery (§5.2), case-study cover, index, bonus |
| CD-R label | `Disc` variant `cdr` | Silver label, printed writing lines, small print (`CD-R 80 min · 700 MB`), marker handwriting in Estrella | Back cover, home social card |
| Hero disc | Hero composition | Jorge's own printed CD art (`/images/hero/disc.avif` / `.webp`): blue label, `JORGE ARCAS`, `FREELANCE SOFTWARE ENGINEER`, `VOL. 01 / 2026`, the JA mark, silver hub. Clear outside the rim and in the hole. The object shadow and a still lamp highlight sit on a body that does not turn; only the label layer turns. | Hero |
| Cover art | `components/CoverArt` | Square sleeve per project: accent field, track number, title, one motif drawn from the real project, catalog number | Rows, discs, index, social images |
| Sleeve and hand | Hero composition | Jorge's own printed cover (`/images/hero/cover-*.webp`) inside a clear film 2.2 % larger than the print (`film-*.webp`, generated: wavy folded edges, two corner ears, rim and refraction line, heat seal, streaks, corner wrinkles, pressure creases round the thumb), the lamp's sheen as a CSS gradient, and `--filter-sleeve` for thickness and shadows. A hand grips the right edge: thumb on the film, fingers behind the sleeve, forearm leaving through the frame's bottom edge. (A jewel case from a stock photo replaced the film for a few hours on 2026-10-29 and was reverted at Jorge's request.) | Hero |
| Booklet | Liner notes chapter | Numbered pages, hairlines, technical notes in mono | Chapter 02 |
| Backstage pass | `components/ProfileCard` (restyled) | Laminated card, foil, lanyard slot, name, role, status | Chapter 04 |
| Promo sticker | `BonusTrack` | Round sticker, ink on brand blue | Chapter 05 |
| Tray card | Back cover | Statement, full tracklist, barcode, catalog number, credits | Chapter 06, footer |
| Marker arrow | `components/MarkerArrow` | A blue marker stroke drawn by hand: a sweep, one loop, an arrowhead (after Jorge's reference image, never its checkerboard). Brand blue, `multiply`, so the colour deepens where strokes overlap. Decorative, `aria-hidden`; it draws itself on mount. Part of the handwriting layer, like Estrella. | Projects annotation |

Objects are drawn with CSS and inline SVG, except the hero's disc, cover and hand, which are
Jorge's raster artwork (§5.1). No WebGL, no Three.js (removed, see the implementation plan for
the measured reason).

### 5.1 Hero composition (Jorge's sketch and brief, 2026-10-29)

Jorge's hand-drawn sketch (`public/images/Imagen de ChatGPT 29 oct 2026, 20_38_52.png`, photographed
sideways): frog mark top left, "contact · Menú" top right, a tilted square holding "Jarcas / DEV /
Full stack dev freelance", a large disc behind it ("caja enfrente": the box is in front), and
"Software con carácter" small at the bottom right. The brief asked for an editorial composition
around the physical object, not a landing page: no headline, lede, CTAs, spec strip or visible
pause button, and no two-column "copy left, objects right".

- **A frame, not a grid.** The cover is one full viewport (`.hero__frame`, a size container,
  clipped); the transparent header sits over it (§9). Inside: the set, a small credit in the
  bottom-left corner, negative space. Nothing in the hero paints outside the hero section. Navigation stays in the header (Hablemos, Menú),
  as in the sketch.
- **Credit**, collapsed into the bottom-left corner (Jorge's correction, same day): the `h1`
  with "Jorge arcas verdejo" in Estrella (see §3.3.2) and "Freelance Software Developer" in
  Poppins 600 at `--text-sm`, then "Software con carácter." in Poppins 400, ink-soft. No "DEV"
  tag and no JA signature. In portrait the bottom belongs to the set (the forearm leaves through
  it), so the credit sits at the top.
- **The set**, measured in the disc's diameter `--d` (landscape `min(68cqh, 40cqw)`, centred at
  45 % of the frame; portrait `min(86cqw, (100cqh − header − 12rem) / 1.41)`): the disc behind,
  the sleeve in front and to the side (landscape: right and lower, 0.8 `--d`; portrait: lower,
  0.74 `--d`), tilted 3.5°, and the hand. **Mirrored from the sketch** (box on the right, not the left) for two
  reasons: the disc prints its name and role on the left half of its label, which a sleeve on
  that side would cover; and the hand photo grips a right-hand edge.
- **The disc**: 80 % visible at rest on landscape screens (measured 80.2–80.5 % from 1024 to
  1920 px), 76–78 % in portrait (the left edge may crop a little on phones, where the label is
  plain blue). `JORGE ARCAS`, the role and `VOL. 01 / 2026` are never covered (measured 100 %).
- **The hand**: the photo's straight cut beside the palm is where the stock photo's card ran.
  It is laid on the sleeve's right edge (pivot at photo px 112, 88; turned 7.1° so the cut runs
  along the edge), so the thumb lies on the film and the fingers are behind the sleeve. The thumb
  is ~0.36 of the sleeve. The grip sits at 62 % of the edge (`--grip`) because the forearm in the
  photo is short: the set stands on the frame's bottom edge, which must cross the forearm above
  the photo's own cut (≤ 1.12 sleeves below its top) and below the sleeve's lowest corner (1.03);
  the set's height is 1.08 sleeves. Consequence: the palm covers the right half of the cover's
  printed JA, and the thumb tip rests on the knee in the photo. Name, face, `VOL. 01` and barcode
  stay clear.
- **One physical set**: the sleeve's contact shadow darkens the disc along its edge, the thumb
  and palm shadow the film, everything is lit from the top left; the disc's highlight stays put
  while its label turns.
- Motion and scroll behaviour: `docs/MOTION_SYSTEM.md` §2.1.

### 5.2 Projects gallery (A24, Jorge's brief, 2026-10-30)

Chapter 01 is a collection of discs, after A24 by Ravi Klaassens (references.md #2, observed
again the same day). No cards, rows or grid: the generated discs (`Disc` + `CoverArt`) are the
mock-up releases until final art exists.

- **One frame** on wide landscape screens (≥ 1024 px, landscape): `clamp(40rem, 100svh, 64rem)`
  tall, the fixed transparent header over its top. Anchor jumps land on the frame's top edge.
- **Credits, top left**, on the hero's left edge: the kicker and the chapter `h2` small, then
  the selected project like A24's film credits: `Proyecto` + `03 / 06` on a strong hairline,
  the title in Bodoni Moda capitals (`--text-2xl`, one word per line), then `Descripción` (the
  tagline) and `Stack` (the first three technologies), each under a hairline with a mono label.
  Width `min(22rem, 28vw)`.
- **The discs** sit on a diagonal around one anchor (`--cx`, `--cy`), measured in the selected
  disc's diameter `--d` (`min(58cqh, 36cqw, room right of the credits / 2.05)`). Offsets 1, 2, 3
  from the selection: `x` 0.8, 1.38, 1.84 `--d`; `y` 0.25, 0.44, 0.58 (next discs climb to the
  right, previous ones drop to the left); scale 0.68, 0.5, 0.38 (Jorge's brief: the selected
  disc is the largest, secondaries shrink on both sides; A24 grows the next disc instead); an
  extra 7–14° turn away. All share one lean (`rotateX 24°`, `rotateY −18°`, perspective 3.4
  `--d`), as if they lay on a tilted table. One previous disc stays visible, two next ones
  (the frame crops them). The anchor keeps the previous disc entirely right of the credits
  (`--cx ≥ credits edge + 1.16 --d`), so nothing ever passes under the text.
- **The printed face turns** with travel (24° per step) while the reflection stays still;
  reaching for the selected disc turns it 16° more.
- **Annotation**: "Haz clic para saber más" in mono capitals, ink, right-aligned under the tail
  of the marker arrow, whose tip lands just outside the selected disc's rim, below right (never
  on the print or the hole). It repeats the selected disc's link for pointers only.
- **Controls** (Jorge's brief, 2026-10-30, second pass): two keys side by side, ReIcon's
  `SquareArrowsLeft` / `SquareArrowsRight` (a double chevron in a rounded square, outline
  weight, 1.5 stroke on the 24 grid, drawn 40 px in a 44 px target), in `currentColor`. The
  icon's square **is** the key: no border, ground or second frame. Fixed spot: the frame's
  bottom-left corner, the square aligned with the credits' left edge (the previous disc always
  passes right of that column); under the stage, at the left margin, on narrow screens. Hover
  turns the key to the accent blue, a press sinks it 1 px, focus draws the ring around its
  rounded square; at either end the key stays focusable (`aria-disabled`) and its icon greys
  out (ink-muted at 40 %; the ring keeps full contrast). No visible count here: `03 / 06` is in
  the credits.
- **Portrait and narrow screens**: the credits on top, the discs below at `min(76cqw, 24rem,
  60svh)`, the neighbours cropped by the screen's edges, the annotation below right of the
  disc, the controls under the stage.
- **Foot**: the private/NDA line with a link to contact, and the full index (`/proyectos/`).
- Differences from A24, by decision: no press quotes or stars (we have none), no WebGL (CSS 3D
  on the real `Disc`), no wheel capture, smaller (not larger) next discs, a marker arrow
  instead of the scribble, and visible previous/next buttons.

---

## 6. Composition and grid

- 12-column grid, outer margin `clamp(16px, 4vw, 56px)`, gutter `clamp(16px, 2vw, 28px)`,
  content max-width 1440 px with full-bleed objects allowed to break out.
- Spacing scale on a 4 px base (`--space-1` … `--space-12`). Sections breathe:
  `--section-pad: clamp(5rem, 11vw, 10rem)`.
- **Hairline rules** (`--rule`) organise information as credits do: label left, value right.
- **Numerals are structure**: every chapter and track carries a mono number. Totals are shown
  (`01 / 07`).
- Kicker → heading → lede is the order of every chapter opening (`ChapterHeading`).
- Asymmetry is welcome (stacked and indented display words, objects breaking the grid), but the
  reading column stays straight and left-aligned.
- Mobile is composed, not shrunk: objects crop off the edge, CTAs go full width, credits become
  two-column rows.

---

## 7. Imagery

- **Covers** are generated (`CoverArt`) so the set stays coherent and costs no image bytes. On a
  pressed disc the rim credits take the cover's `ink` colour.
- **Social cards** (1200×630) are rendered from the same components (`src/seo/OgCard.tsx`) with
  `npm run og`; regenerate them when a title, tagline or cover changes.
- **Evidence** images are real: MoneyMan dashboard captures from its repo, Mathgeon sprites and
  scene art from its repo, captures of the live v2 portfolio. Captions say exactly what each
  image is (for example "asset del repositorio", not "captura del juego" when it is not).
- No stock photography, no AI-generated imagery presented as real work. **Exception (hero,
  2026-10-29):** Jorge supplied the hero's hand (a stock JPEG with a fake transparency checkerboard
  baked in). It is a prop, not evidence; its source and licence are an open question
  (implementation plan §4). The plastic film is generated (below), so the stock shrink-wrap photo
  is no longer used; the stock jewel-case photo (`2b8b2753….jpg`) was tried and reverted.
- **Hero artwork recipe** (sources in `public/images/brand/`, outputs in `public/images/hero/`):
  `cdJorge.png` (512 px) → circular alpha outside r 254 px and inside the 27.8 px hole, WebP q86
  and AVIF q72 (served first, 21 kB); `jorgeCDsleeve.png` (1024 px) → WebP q78/q80 at 480, 720,
  880 and 1024 px; the hand → keyed out by saturation (the checkerboard is neutral grey and
  white), eroded 1 px, edge colour un-mixed from the grey, cropped to 289×296 (its straight
  cut runs from px 122, 8 to 112, 88; Hero.css aligns it with the sleeve's edge). The film is
  drawn by `scripts/generate-hero-film.py` (Python, Pillow + NumPy, seeded, not part of the build)
  at 2048 px and saved as WebP q72 with alpha q70 at 1024 and 640 px (23 and 14 kB): smooth ramps
  posterise in lossy alpha, so the broad sheen is CSS. Its pressure creases are drawn for
  `--grip: 0.62`; re-run it if the grip moves. Re-run the rest if Jorge sends larger exports: the
  512 px disc is soft on high-density screens and the 360 px hand is soft at every size.
- The portrait (`avatar.webp`, 457×546 cut-out) is low resolution: it is always printed small and
  treated (duotone, paper multiply), never enlarged full-bleed (today: the backstage pass). The
  hero cover carries Jorge's own 1024 px cover art instead.
- Every image has explicit `width`/`height`, `loading="lazy"` below the fold and meaningful `alt`;
  decorative images use `alt=""`.

---

## 8. Iconography and marks

- UI icons: **reicon** (`src/components/Icon/Icon.tsx`), imported per icon, `currentColor`.
- Brand marks (GitHub, LinkedIn): inline paths in the same file.
- Technology logos: `public/images/logo/*.svg` (SVGL), monochrome by default.
- The frog mark and the `Jorgw` logotype are the brand. Keep them; do not redraw them.
- **JA monogram** (`components/Monogram`): Estrella's `J` and `A` outlines merged into one path, so
  no font loads for it. Recipe: the A is shifted 300 font units right and 300 down so it sits
  under the J's hook, and a 22-unit gap is cut from the A around the J (boolean ops with
  skia-pathops, J in front). Always `aria-hidden`, drawn in `currentColor`, never below 48 px
  wide, never animated. **Not used anywhere since 2026-10-29**: Jorge removed it from the hero
  (first the 15 rem mark above the name, then the signature beside the statement); the disc and
  the cover still print the JA. The component is kept for a future use.
  Rejected: the side-by-side lockups (A in front, offsets 600/40, 620/30, 640/10): they read as a
  wide wordmark that competes with the statement.

---

## 9. Interface rules

- **Buttons**: square corners, 1 px border, uppercase Poppins 600 at `--text-sm` with +0.06 em
  tracking, an arrow icon. Primary: ink ground, paper text. Secondary: transparent, ink border.
  Pressing sinks 1 px (tactile, like a hardware key). Minimum target 44×44 px.
- **Links in text**: accent colour, underline offset 0.18 em, thickness 1 px → 2 px on hover.
- **Header** (Jorge's brief, 2026-10-29): type over the page, not a bar. No ground, no rules, no
  blur, no plates: the logo on the left, `Hablemos` and `Menú` on the right, fixed. Legibility is
  per element: (1) the navigation takes the ink of the ground behind it, `data-tone="night"`
  while an `.on-night` section (back cover, footer) crosses the header's middle line (paper
  text, `--color-accent-on-night` hover and focus ring); (2) a halo of that ground around the
  letters (`--halo-paper` / `--halo-night`, text-shadow) and around the logo and the menu icon
  (`--halo-*-filter`), invisible on the plain ground and readable over whatever scrolls beneath.
  The open menu panel forces the paper tone. Without JavaScript the tone does not switch (the
  paper halo still separates the letters on the night sections). Replaced the same day a
  segmented header (two paper plates and an interrupted rule) whose plates and rules, fixed
  above every section, overlapped their content.
- **Focus**: 2 px solid `--color-accent` with 3 px offset everywhere (light ring on night
  sections). Never removed.
- **Selection**: ink on brand blue.
- Hover never carries the only path to information: every hover reveal has a focus equivalent
  and a touch fallback.

---

## 10. Do not

- Build a music website. This is a software engineer's portfolio with a music-object language.
- Introduce a new theme, palette, font or effect in one section without updating this file.
- Use the brand blue for text, or opacity alone to signal state.
- Put essential information only inside images, canvas, video or animated overlays.
- Fabricate press, clients, metrics, awards, dates or biography.
- Stretch fonts to imitate condensed faces, or set Estrella on text with accents.
