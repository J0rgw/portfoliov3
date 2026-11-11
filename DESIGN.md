# DESIGN.md — Musical packaging, 1995–2005

The artistic source of truth. Technical requirements live in [AGENTS.md](AGENTS.md).

## Concept

A personal software portfolio handled like a physical CD: front cover, releases, booklet,
credits, bonus track, back cover. Youthful, handmade and expressive. Reference culture:
alternative sleeves, music magazines, photocopied fanzines, CD-R labels, paper scraps,
manufacturer stamps and annotated tracklists from 1995–2005. Digital functionality,
physical personality. No retro operating-system simulation, SaaS template or corporate grid.

**Handcrafted is a property of the whole visual system, not decoration added at the end.**
Hierarchy, framing, paper contrast, imperfect alignment and relationships between layers
carry the identity even when no doodle is visible. Expressive but controlled; compositions
before cards; identity before trends. Every overlap has a purpose and leaves reading clear.

## Typography

Poppins 400/600/700/800 is primary for navigation, headings, copy, buttons, projects and detail.
Semantic roles in `design/typography.css`: body, heading, project, metadata, annotation.
Responsive scales use clamp; headings wrap naturally, not one forced word per line.
Mono is for track numbers, codes, technical metadata and manufacture labels. Small uppercase
mono (`.label`) is only what a real object prints: a disc's or a sleeve's print, catalog
numbers. Headings, categories and lead-ins speak in sentence case at
text size (2026-11-10: the home page went from 36 small-caps labels to 10; the same day ADR-001
took the pass, the booklet's running head and the back cover's spec rows off the page, and the
Projects pages' credit tables lost theirs).
**Separators** (2026-11-10, the deslop pass): no middot between pieces of data on the page, and
no slash or dash put in its place. First ask whether the pieces need separating at all; then let
hierarchy do it (a role in semibold over its place in muted type, each on its line), or write a
list the way Spanish writes one ("MoneyMan, Client Leads, Disco Download y gitchange"; credits
take commas, "TypeScript, React, Vite"). What an object prints on its own label is print, not
interface, and may keep its separator: the CD-R's "80 min · 700 MB", a disc's rim credits, the
social cards. Document titles keep theirs too. `npm run check:architecture` fails on a middot in
any copy outside those (the Projects pages lost their exemption with ADR-001, 2026-11-10).
Estrella is an occasional decorative handwritten voice; never the default heading. It lacks
proper accents/digits/punctuation, so retain real HTML text in Poppins. It writes on objects
(CD-R labels) and signs the About notes; it is never a word set beside a heading, which only
repeated the title (removed from Process, Services and Bonus on 2026-11-10). Its embedding licence
is still unconfirmed, as recorded in the implementation plan. Bodoni remains available for
an intentional contrasting editorial fragment, never automatically for every project title.

## Palette and material

Two themes of one portfolio. **Light**: cool white ground, blue protagonist. **Dark**: carbon
ground, orange protagonist; `#E88B40` is the HSL complement of `#409DE8` (hue + 180°). There is
no third accent: personality comes from composition, type, handmade marks and motion, while
neutrals carry hierarchy. The theme follows the visitor's system (`prefers-color-scheme`,
`color-scheme: light dark`), with or without JavaScript. There is no theme switch: the
header's sun/moon button was removed on 2026-11-10 (Jorge's decision; the component files are
left unused in `ui/ThemeToggle`). The forced-theme hooks stay dormant (`data-theme` on `<html>`,
the pre-paint restore, `ThemeImage`'s media rewrite), so a switch could return without
touching a token. Components never query the theme: what changes is a token.

**One source of truth: `src/design/tokens.css`.** Layer 1, palette (`--palette-*`): the only raw
colour values in the project. Layer 2, theme: the semantic roles below, mapped onto the
palette for light and for dark (the dark mapping has two triggers, system and forced, written
as two identical blocks that the build compares). Layer 3, scopes that remap the same roles.
Components and section CSS read roles only, never a hex value or a `--palette-*` primitive.

| Role | Light | Dark | Use |
|---|---|---|---|
| `--background` | `#F7F9FC` | `#111318` | Page ground |
| `--foreground` | `#111318` | `#F7F9FC` | Headings and body text |
| `--surface` | `#FCFDFF` | `#1B2027` | Raised paper: inserts, notes, pass, liner |
| `--surface-secondary` | `#F0F3F7` | `#222831` | Secondary grounds: gallery, sunken frames |
| `--accent` | `#409DE8` | `#E88B40` | CD identity, covers, arrow, pen loop, rules, grounds |
| `--accent-functional` | `#206DA5` | `#E88B40` | Links, focus, active/hover states, readable glyphs |
| `--muted-foreground` | `#475569` | `#A7ADB9` | Secondary text and metadata |
| `--border` | `#C1CAD3` | `#30353D` | Decorative separators and hairlines |
| `--control-border` | `#64748B` | `#677486` | Boundaries of controls and indicators |

Supporting roles: `--on-accent` (carbon text on an accent ground), `--print-dark/-light/-silver/
-shade` (inks on physical objects), `--highlight` (a lamp's reflection), `--shadow-ink`,
`--scrim`, `--gloss`, `--accent-surface` (the promo insert: accent mixed into the surface by day;
by night the plain raised stock, since any orange in carbon reads as brown and the 7 % that
avoided brown cancelled to a dead grey, 2026-11-10) and
`--success` (`#1F9D55`, the availability dot only, always next to its text).

**Scopes.** `.on-night` is the back cover (Contact, footer, case contact): a dark ground in
both themes, carbon in light and one step up (`#1B2027`) in dark. Inside it every role is
remapped, so components carry no night-specific rules; in light its functional accent is the
bright blue (6.4:1 on carbon). The fixed header follows with `data-tone` and `--night-*`.
`[data-surface='accent']` is a saturated accent ground with carbon ink; `[data-surface='paper']`
is raised paper over the grain.

**Photographed cut-outs keep their own colours** (Jorge's decision, 2026-11-09): the red map
pin, the yellow paper hash, the green address sticker, the orange phone are objects, not
palette, the way the broken disc keeps its rainbow. They are never text, a ground, a UI state
or a link colour, and they never stand in for the accent; everything people read or operate
stays blue by day, orange by night. Ink is the exception to the exception: the blue scribble
is handwriting, so, like the marker arrow, it has a generated orange file (it left the hero on
2026-11-10 and stays registered).

**Accent rules.** `--accent` is for marks and grounds, never for text or a sole indicator: in
light it measures 2.8:1 on the ground. Anything people read or operate takes
`--accent-functional`, including Estrella words and footnote glyphs. Links are underlined as
well as coloured. Text on an accent ground takes `--on-accent`. `--border` is decoration only;
a control or state indicator that must be seen uses `--control-border` (≥ 3:1) or ink.

**Measured contrast** (WCAG 2.2 AA; ratios on the role's ground, light / dark): foreground
17.6 / 17.6; muted 7.2 / 8.2 (6.8 / 6.6 on surface-secondary); accent-functional 5.3 / 7.3
(5.0 / 5.8 on surface-secondary, 6.4 / 6.4 on the night ground); control-border 4.5 / 3.9 (3.5
on the dark night ground); on-accent on accent 6.4 / 7.3; success dot 3.5 / 4.7.

**The CD and printed objects.** Print inks do not change with the theme; only the accent
does. Generated covers (`design/themes/covers.ts`) combine print dark, light and silver with
the accent; variety comes from which one takes the field. Blue raster art has generated dark
variants (`scripts/generate-theme-variants.mjs`, files `*-dark.webp`), served by
`graphics/ThemeImage` through `<picture>` media (a forced theme rewrites that media after
hydration, so a forced opposite theme may show the other image for a moment on load): the hero disc and cover and
the frog mark take the exact HSL complement (blue becomes the dark accent, neutrals and
grain stay); Jorge's arrow, a dark translucent ink, takes the accent's hue with its lightness
lifted; the arm photo that holds the sleeve (2026-11-10) is not blue and is defringed at the
source, so it has no dark file. Originals are never
modified, and `filter: invert()` or hue rotation is never applied to photographs, text or
artwork. The one filter exception is the grey technology marks in the Projects credits
(`--mark-filter`); a black mark (GitHub) swaps to a light file in dark. The header's mark is
the JA monogram (`graphics/Monogram`, Estrella's J and A as outlines in `currentColor`) since
2026-11-10: the "Jorgw" wordmark read as a typo of the name, and a vector mark needs no dark
file. Since 2026-11-11 it is in ink, taking the links' hover colour on hover and focus, so the
accent stays with the content. The scrolling logo strip under About's instruments was removed the same
day: the list names every tool in words.

**Materials.** Iridescence (`--irid-*`, `--material-disc`, `--material-foil`) is the data side
of a real disc and the pass's laminate: only blended over those objects at partial opacity,
never a flat fill, ground, text or identity colour. A printed label is glossy rather than
iridescent, so pressed discs keep only a trace of it. **Pressed discs are printed singles with a
photographic finish** (2026-11-09): their clear hub and rim are the real plastic of the hero
disc photo (`public/images/disc/shell.webp`), their label carries the stock's grain
(`--material-print-grain`, dark specks in both themes, as ink does not change with the room's
light) and real scratches and dust lifted from the broken-disc photo (`wear.webp`, turned per
disc by its name, so a disc wears the same scratches on every page). The print band matches
the hero disc's: 19.5 % to 96.5 % of the radius. The CD-R keeps the CSS hub and rim (neutral
alpha greys in `Disc.css`). Silver is the CD-R and the menu's first insert. Photocopy grain is
quiet and static: dark specks in light, light specks in dark. Shadows use `--shadow-ink`; in the
dark theme the soft object shadow (`--shadow-object-soft`) is black instead, or paper laid on
carbon casts carbon on carbon and floats flat (2026-11-10). Paper's edges follow the light too
(`--paper-border`, `--paper-lip`): a hairline by day; by night no outline, which made paper read
as a dark card, but a lip of light along the top edge. The booklet's staples sit in a hairline
spine crease. No
decorative gradients by default. Paper folds, cut edges, label borders and restrained object
shadows may establish depth. Flat backgrounds and one identical grid are not requirements.

**Adding a component.** Pick roles by job, not by look. Check it in light, in dark and inside
`.on-night`. If a new colour seems necessary, add it to the palette and a role in tokens.css,
measure it in both themes and record it here; never write a hex value in a component. New blue
raster art goes through the variants script and `ThemeImage`.

## Composition

Hero (the diagonal study Jorge chose, 2026-11-10): the name is the one large gesture, two
lines of Poppins 800 in the top-left corner ("Jorge Arcas" / "Verdejo") sized with the disc;
role and statement sit at the foot of the same column. The disc lies just under the name's
first line, clear of "Verdejo", his cover in its film to its lower right, held in his own
hand: a photo of Jorge holding a real case, the case (and the private photo in it) cut away
and the sleeve laid exactly where the case was, so the thumb on the film, the hand round the
edge and the forearm leaving the frame are his real grip, not a composite pose. On first paint
the album is handed to you (the name rises line by line, the disc lands spinning, the hand
brings the sleeve up, the sticker is slapped on); the film's and the disc's reflections follow
a fine pointer. The type stays unframed: no card, paper panel, coloured border, shadow or tilt. Round
the scene, three cut-outs, text-free: the headphones hung over the right edge under the
header's controls, the THIS IS NOT AI sticker on the film and the VOLUME knob on the bottom
edge past the role. The ink loop and "!!" left with the small credit; the tape and the train
were removed at Jorge's request. Each cut-out lies at its own depth: it leans under the
pointer, drifts off as the hand pulls, and leaves through its nearest edge so the disc ends
alone (MOTION_SYSTEM §2.1).
Projects: preserve the functional arc, original arrow and selection. Credits are printed straight
on the page, unboxed and unlabelled, in the bottom-left corner level with the keys: a strong Poppins title, the description tight under it and
the stack as grey marks (mono chips where no mark exists). The keys sit under the selected disc;
the arrow's label sits at its tail, so it reads label, loop, disc (2026-11-09). Every release
disc is a printed single (2026-11-09): a field, the title, and one of Jorge's cut-outs printed
over it, like the photo in front of "ARCAS" on the hero cover; no rim credits, middots or
track numbers on a disc. When the broken disc is selected, the phone hangs in beside it.
**One frame per chapter** (2026-11-10, [ADR-001](docs/adr/ADR-001-chapter-frames.md)). Every
chapter after Projects is composed like Projects: one viewport-high frame on wide landscape
screens (`clamp(40rem, 100svh, 64rem)`), the heading in the top-left corner at Projects'
heading size (Poppins 800, `--text-xl`) with at most a one-line lede, one dominant element, and
the copy at the foot, short and printed straight on the ground (Proceso's sits at eye level,
below). No paper, card, pass, sticker or
spec table; rules only between real rows. A chapter is held only when it fits (MOTION_SYSTEM §2.5).
Process: Jorge's iPod (a photographed cut-out) with the five steps as its playlist, live HTML on
its screen in the object's own inks and the accent's selection bar; the selected step's credits
(title, the step, one real decision linked to its evidence) at eye level in a column up to 40rem,
and the iPod centred in the room that column leaves, never nearer than 4rem (at the frame's
right edge where the room runs out), changing over like the gallery's (2026-11-11: Jorge moved
the iPod right so his longer copy fits where the eye is, and picked this place from two). Services: the four offers as a tracklist printed on the page, one row
each (number, title large, one line on what you get, where it was done, the enquiry); two by
two below 1280 px. About: Jorge's portrait (the pass's photo) as a cut-out standing on the
frame's lower edge, one paragraph signed "Jorge", and the credits on shared columns (the
timeline newest first, one line per milestone; the instruments and languages after it). Bonus:
the oversized "Avísame*" is the mailto link itself, its footnote and privacy line under it, the
talk as the one link out; it stays under "Hablemos" in size. Contact: the heading in the corner,
the oversized "Hablemos" with the CD-R between word and arrow as the email link (The Romans),
one line of details at the foot (the address with a copy button, LinkedIn, GitHub,
availability). The footer is rows of links with their name in the margin and one line of print.
The header stays type over the page; past the hero's pinned run it turns compact on a solid
56 px strip of the ground behind it, cut straight with no fade, rule, blur or shadow
(2026-11-11), so headings scrolling beneath (the hero's own name as it leaves included) go
under the strip instead of colliding with the logo or showing half-faded. Its links are words
in sentence case at body size, not small capitals (INFORMATION_ARCHITECTURE §4). The bonus's "Avísame*" is oversized against its card, not the
page: just under the chapter's heading (0.92 × `--text-2xl`), so the waitlist never outshouts
contact.
Case study: cover/sleeve above a readable booklet column, with a steady navigation rail. Since
ADR-001 the Projects pages speak like the gallery: sentence-case titles, credits as label and
value without small capitals or rules, the stack as grey marks (`editorial/StackMarks`) with the
rest named in words, one back link (the breadcrumb trail lives in the JSON-LD), links instead of
square buttons, numerals instead of circles, one rule per division, and the private work as the
broken disc in the index too.
Asymmetry must be intentional, limited by readable measure and safe interactive hit areas.
Mobile reassembles the layers in reading order; no essential content outside the viewport.

## Graphics and assets

Use `graphics/HandCircle`, `MarkerArrow`, `Barcode`, `Cutout`, `PenMark` and `ThemeImage` for distinct jobs.
`Paper` and `Sticker` (CSS treatments of live content) are no longer used on any page since
ADR-001; neither is the `ProfileCard` pass. Their files stay until Jorge commits (they carry
uncommitted edits).
HandCircle and Barcode are existing generated vectors; they are not scans of Jorge's drawing.
PenMark (2026-11-10) is one too: a fast marker underline under one phrase of a chapter's title
or lede (the phrase lives in config), in `--accent`, behind the glyphs, its weight following
the type (never under 2.4 px). The chapter hold draws it (Motion, below).
MarkerArrow renders the supplied raster stroke (and its generated dark-theme ink); HandCircle
draws in `currentColor`, the accent in the gallery. Paper and Sticker are CSS treatments of live
content, not claims of authentic scanned resources. Do not redraw supplied illustrations.

**Jorge's cut-out set** (supplied 2026-11-09; originals in `private/originals/assets/`, git-ignored): tape, a barcode
label, headphones, a VOLUME knob, a phone, a map pin, `https://`, `#`, `!!`, a blue scribble,
a train and a THIS IS NOT AI sticker (also a megaphone and paper arrows, not used yet). On
2026-11-10 he took the tape and the train out of the design (their recipes and registry
entries went with them; the originals stay) and added a photo of his hand holding a real case
(it replaced an earlier arm photo that was not gripping anything) and the cover at 1200 px
for the hero (`scripts/prepare-hero-art.py`: the arm defringed and trimmed, the cover resized,
and the same day the disc at 1200 px, cut out of its black ground with two measured circles),
plus a strip of media buttons, an iPod, a selection box, a torn paper hole and a blue toy
brick. The iPod is Process's object since ADR-001 (2026-11-10); his portrait, the pass's photo,
went through the same script (`key='alpha'`, its own matte) for About. The brick is not used: its
studs carry a toy maker's trademark and the object is about 240 px in the file.
`scripts/extract-cutouts.py` keys each one out of its ground (flat colour, painted
checkerboard or paper; nothing redrawn) into `public/images/cutouts/<id>-<width>.webp`;
photos cut by their own frame or without paper get a die-cut paper margin, rough like a
scissor cut, which also follows straight crops. `config/assets.ts` registers them,
`graphics/Cutout` lays one on the page: decorative, `alt=""`, its own colours, a paper
shadow (`--filter-cutout`, deeper in dark) or a flat sticker's contact (`--filter-sticker`);
the section places and moves it. A release names the cut-outs on its label in config
(`assets.label`); its cover theme in `design/themes/covers.ts` places them. Mathgeon prints
its own sprite. A project without a label falls back to the generated motif, so publishing
one still needs no theme edit. The THIS IS NOT AI sticker is Jorge's own statement, placed at
his request. Rights to the downloaded originals are an open question (IMPLEMENTATION_PLAN §4).

**The hidden track** (2026-11-10): like the unlisted song at the end of a 2000s CD, an ASCII
disc (generated, `config/hiddenTrack.ts`) and a short note are printed once in the browser
console on every page (`ui/HiddenTrack`), in the functional accent. Nothing on the page depends
on it.

## Motion

Reveal, float, drift, rotate, draw, slide, snap, hover and page-transition vocabulary is owned
by `design/motion.ts` and `design/motion.css`. Parameters are separate from interaction hooks.
Float/drift are short bounded gestures, not automatic infinite background decoration.
The hero turn and interactive gallery keep pause/reduced-motion/off-screen behavior. Layers
move like handled objects; no scroll blocking, abrupt layout shifts or animation-gated copy.
The chapter hold has a job (2026-11-10): while a chapter holds, the marker underlines what it
is about ("seleccionados", "producto real", "el problema que tienes", "mí", "en
preparación"), so scrolling through a hold always changes something on screen; at the snap
point the stroke is not there yet, at the end of the hold it is complete, and without the hold
(no JavaScript, reduced motion, short viewports, a chapter taller than the window) it is simply
drawn (MOTION_SYSTEM §2.5). Process's credits change over like the gallery's (the title rises,
the lines follow); the booklet's page turn left with the booklet (ADR-001). In Process the hold
is the iPod's wheel (2026-11-11): every song owns a share of it, so scrolling changes the song,
the selection bar slides to it and its credits change over; the marker is drawn in the hold's
first stretch, while the heading is read.

## Decisions

Good: a bold title next to a real CD; a mono number that also conveys order; an original marker
stroke pointing to the selected link; a chapter that reads whole in one frame; one photographed
object per chapter; the same composition in blue by day and orange by night.
Poor: six identical floating cards plus random stickers; serif headlines by default; recreating
an original illustration in CSS; fake awards, fake tape scans or unreadable photocopy noise;
a cut-out hiding type, a face or the hero disc's print; a collage that blocks the scroll;
a third accent colour, a pastel gradient panel, or the light blue used as body text; a
handwritten word beside a heading that only repeats it; a coloured stripe down one side of a
text block. Also poor (the deslop pass, 2026-11-10): a middot between pieces of data; a category
tag that repeats what its row already says; a bordered status chip restating the heading; a
number or an icon in a circle or tinted box whose only job is to hold it; a dot with a halo of its
own colour; a rule above a card's action, or two rules a few pixels apart for one division; an
accent underline under a title just for decoration; a label over a list that names itself.
Also poor (ADR-001, 2026-11-10): a chapter taller than its frame, so the hold freezes it
half-read; copy on a paper card, a pass or a tinted insert; a spec table of small capitals
between rules; a square uppercase button where the word itself can be the link; an
unattributed quote that reads like a testimonial.
Also poor (2026-11-11): a fade under a fixed header, which leaves whatever passes there
half-erased; the header's strip cuts straight.
Before adding a line, a box, a tag or a sentence, name what it tells the visitor that nothing
near it already does. Rules mark real divisions (rows of a table or a tracklist, an object's
edge); states (selection, the step being read, availability, focus) keep their markers.
Banned: eyebrow tags, a small uppercase label (with or without a marker stroke) set above a
heading, such as `PISTA 01 · SELECCIÓN`. Every chapter and page opens with its heading.
The reference matrix is historical research. Preserve its useful interaction ideas while
letting this portfolio's own musical identity determine the overall composition.
