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
Mono is for track numbers, codes, technical metadata and manufacture labels.
Estrella is an occasional decorative handwritten voice; never the default heading. It lacks
proper accents/digits/punctuation, so retain real HTML text in Poppins. Its embedding licence
is still unconfirmed, as recorded in the implementation plan. Bodoni remains available for
an intentional contrasting editorial fragment, never automatically for every project title.

## Palette and material

Retain original blue #409fea for expressive grounds/decoration, ink #141414 and warm paper
#f3f1ec. Use dark blue #1b62ae for readable links, paper on dark ink, muted ink for metadata.
Semantic background/foreground/accent/muted/surface/border/decorative tokens own these roles.
A blue paper variant pairs the saturated ground with dark ink, not low-contrast white copy.
Photocopy grain is quiet and static. Generated grain is explicitly synthetic, not a paper scan.
Original user art and the blue marker arrow remain unchanged. Foil is a disc/pass material.
Paper folds, cut edges, label borders and restrained object shadows may establish depth.
Flat backgrounds and one identical grid for every section are not requirements.

## Composition

Hero: preserve Jorge's approved hand-held sleeve and disc arrangement. Set the credit in bold
Poppins directly on the page background, secondary to the CD composition. Keep it unframed:
no card, paper panel, coloured border, shadow or tilt. Retain clear space and its existing scroll story.
Projects: preserve the functional arc, original arrow and selection. Credits read as a paper
insert with a strong Poppins title and manufacture metadata, not serif film credits.
Process: booklet and offset technical notes. Services: readable printed tracklist, with rhythmic
columns rather than a deck of interchangeable cards. About: portrait pass beside personal
notes and timeline. Bonus: promo insert. Contact: oversized Poppins and a dark back cover.
Case study: cover/sleeve above a readable booklet column, with a steady navigation rail.
Asymmetry must be intentional, limited by readable measure and safe interactive hit areas.
Mobile reassembles the layers in reading order; no essential content outside the viewport.

## Graphics and assets

Use `graphics/HandCircle`, `MarkerArrow`, `Barcode`, `Paper` and `Sticker` for distinct jobs.
HandCircle and Barcode are existing generated vectors; they are not scans of Jorge's drawing.
MarkerArrow renders the supplied raster stroke. Paper and Sticker are CSS treatments of live
content, not claims of authentic scanned resources. Do not redraw supplied illustrations.
No approved paper scans, brush collection or original sticker set has been supplied. The
architecture accepts real assets when available. Existing geometric project cover art remains
provisional; optional disc/sleeve assets can replace it through config without JSX edits.

## Motion

Reveal, float, drift, rotate, draw, slide, snap, hover and page-transition vocabulary is owned
by `design/motion.ts` and `design/motion.css`. Parameters are separate from interaction hooks.
Float/drift are short bounded gestures, not automatic infinite background decoration.
The hero turn and interactive gallery keep pause/reduced-motion/off-screen behavior. Layers
move like handled objects; no scroll blocking, abrupt layout shifts or animation-gated copy.

## Decisions

Good: a bold title on an offset paper insert next to a real CD; a mono number that also conveys
order; an original marker stroke pointing to the selected link; readable asymmetrical booklet.
Poor: six identical floating cards plus random stickers; serif headlines by default; recreating
an original illustration in CSS; fake awards, fake tape scans or unreadable photocopy noise.
Banned: eyebrow tags, a small uppercase label (with or without a marker stroke) set above a
heading, such as `PISTA 01 · SELECCIÓN`. Every chapter and page opens with its heading.
The reference matrix is historical research. Preserve its useful interaction ideas while
letting this portfolio's own musical identity determine the overall composition.
