# ADR-002: No scroll-drawn marker, no numbers, no arrows

| | |
|---|---|
| Status | Accepted and implemented 2026-11-12, **uncommitted**. Jorge chose from renders: link cue E, scope S2, hold H2 (Q54–Q56) |
| Asked by | Jorge, 2026-11-12: delete the moving underlines ("the scroll animation and the entire scroll sensation feel cheap… kinda crunky and break the entire aesthetic"), every one of Servicios' numbers, and the arrows; find another way to show that words are a link ("maybe the same underscore as Hablemos"), think of many options from the references and render them with Playwright so he can decide |
| Scope | Home chapters 01–05 (the marker, the hold), Servicios (numbers), every → that was a link's only cue (home, footer, case studies) |
| Untouched | Hero, Contacto, the header and the menu; the gallery's keys and count; ↗, ← and ↑ arrows; the oversized "Hablemos", "Avísame*" and "Escríbeme" with their arrows |
| Owners of the topic | DESIGN.md "Palette and material", "Graphics and assets", "Composition", "Motion" and "Decisions"; MOTION_SYSTEM §2, §2.5 and §2.8; INFORMATION_ARCHITECTURE §3, §4 and §5; plan Q39 and Q54–Q56 |

## Context

On 2026-11-10 the critique found "scroll that does nothing" five times per visit: each chapter
after the hero holds at the top for 60svh of scroll (MOTION_SYSTEM §2.5). Jorge chose to give the
hold a job rather than shorten it: a marker stroke (`graphics/PenMark`) that the scroll drew
under one phrase of each chapter. Two days later he found it cheap: a line that grows notch by
notch with the wheel, under a heading, five times.

Servicios printed its four offers as a tracklist with a mono number before each title and an
arrow after each enquiry. The arrow (→) was also the only sign of a link after "Proyectos
seleccionados", after Proceso's evidence links, after the footer's "Índice completo" and, on a
case study, after the next track and "Todos los proyectos".

## Decision, implemented

1. **No marker.** `PenMark` (component and CSS), the five phrases in config (`processIntro.mark`,
   `servicesIntro.mark`, `aboutIntro.mark`, `library.mark`, `ui.projects.headingMark`), their
   check in `test:config`, Proceso's `--pen` and the `--hold` property `useChapterHold` wrote
   for it are gone. The hook still tells a chapter where it is in its hold (`onHold`), which
   Proceso's playlist needs.
2. **No numbers in Servicios.** The track number column is gone at every width; the title takes
   its place (one column on phones, two by two from 768 px, title, outcome and enquiry from
   1280 px).
3. **The pen circles the link (Q54: E).** Where an arrow was a link's only cue, the words wear
   `ui/LinkCue`: the header's "Hablemos" underline at rest (tokens `--link-underline` and
   `--link-underline-offset`, which the header now reads too; made bolder the same day at
   Jorge's request, `max(2px, 0.1em)`, so the line is as heavy as the type), and the gallery's pen loop
   (`graphics/HandCircle`, new `stretch` option) drawn round them while the link is pointed at
   (hovering devices only) or focused. Geometry and motion: MOTION_SYSTEM §2.8.
4. **Everywhere an arrow was the only cue (Q55: S2).** The Projects heading ("Proyectos" over
   "seleccionados" at every width), Proceso's evidence links, Servicios' enquiries, the footer's
   full index, a case study's next track and "Todos los proyectos". Kept: ↗ on links that leave
   the site, ← back, ↑ to the top, the gallery's keys, the arrows inside the oversized
   "Hablemos", "Avísame*" and "Escríbeme".
5. **Only Proceso holds (Q56: H2).** `ChapterHold` takes `holds`; `HomePage` passes it for
   Proceso alone, whose hold turns the iPod's songs. layout.css holds only `[data-holds]`
   wrappers and `useChapterHold` does nothing for the others. Every wrapper is still a snap
   point.

## The choices, as rendered

Jorge chose from renders of every option over the real build (a video and side-by-side stills
per option; the tooling stayed in the session scratchpad, not in the repo).

**Q54, what replaces the arrow: E.** Every option keeps the same line at rest, which is all a
phone shows, and differs in how the link answers a pointer or the keyboard:

| Code | Option | From |
|---|---|---|
| 0 | Words only (no cue at rest) | the footer's tracklist rows |
| A | The header's "Hablemos" underline; words and line turn to the accent | Jorge, the header |
| B | A, then a line twice as thick drawn over it from the left (250 ms) | transitions.dev's timing |
| C | A, the line thickens and rises to the words (180 ms) | MOTION_SYSTEM's "links thicken their underline" |
| D | A, a translucent band of the accent swept behind the words, a highlighter | annotated tracklists, DESIGN's concept |
| E | A, the gallery's pen loop drawn round the words | A24's hover scribble (`HandCircle`) |
| F | A, the words rise out of focus and come back up once | the site's text swap (§2.6), Kerimov's roll without doubled letters |
| G | No line, a small CD-R where the arrow was, turning on hover | The Romans, the back cover's CD-R |

Considered and left out: links between slashes (Kyoosang Choi; DESIGN bans a slash in place of
a separator), square bordered buttons (The Romans; banned by ADR-001), the letter roll with
doubled letters (Kerimov; read twice by screen readers), dimming the other rows (Cool
Interaction; fails contrast), a travelling indicator (CollectUI; not implemented by design),
transitions.dev's "learn more" hover (drawn for a chevron, which is the arrow).

**Q55, where it applies: S2.** S1, Servicios only; S2, every → that is the only sign of a link (the
Projects heading, Proceso's evidence links, Servicios, the footer's "Índice completo", a case
study's next track and "Todos los proyectos"). S2 keeps ↗ (a link that leaves the site), ← and
↑, the gallery's keys and the arrows inside the oversized "Hablemos", "Avísame*" and "Escríbeme".

**Q56, the hold without its marker: H2.** H1 keeps the 60svh hold, where nothing changes; H2 holds
only Proceso, whose hold turns the iPod's songs, and lets the rest scroll on (the snap stays);
H3 shortens the others to 20svh.

## Section status

| Section | Before | Now |
|---|---|---|
| 01 Projects | marker under "seleccionados" through a 60svh hold; heading → | no marker, no hold; the heading's words are the link cue |
| 02 Proceso | marker under "producto real" (first 40svh of its hold); evidence links → | no marker; still held (the iPod's wheel); evidence links wear the cue |
| 03 Servicios | marker under "el problema que tienes" through a 60svh hold; 01–04; enquiry → | no marker, no hold, no numbers; enquiries wear the cue |
| 04 Sobre mí | marker under "mí" through a 60svh hold | no marker, no hold |
| 05 Librería | marker under "en preparación" through a 60svh hold | no marker, no hold |
| Footer | "Índice completo →" | the full index wears the cue |
| Case study | next track →, "Todos los proyectos →" | both wear the cue; "Escríbeme →" and "Ver el código ↗" keep theirs |

## Where the removed work lives

Git: the marker is in `src/components/graphics/PenMark/PenMark.tsx` and
`src/design/components/PenMark/PenMark.css` at f9dc053, the phrases in `src/config/*.ts` there,
the numbers and arrows in `src/sections/Services/Services.tsx` and its CSS there.

## Validation

Measured 2026-11-12 on the production build in Chrome (details in the plan, "No marker, no
numbers, no arrows — 2026-11-12", and MOTION_SYSTEM §2.5 and §2.8):

- `npm run build` passes (architecture, config, assets, types, client + SSR, prerender, SEO).
- Home, the index and a case study at 1512 × 734, 1440 × 900, 1280 × 720, 1024 × 768,
  768 × 1024, 390 × 844 and 320 × 640, with and without JavaScript: no arrow left on those
  links, no horizontal overflow, no console errors; every heading and lede has the box it had
  before, except the Projects heading from about 640 to 900 px wide, which keeps two lines
  where it used to fit one (+30 px at 768 × 1024).
- Holds: only Proceso's wrapper holds (1512 × 734, 1920 × 1080, 390 × 844); the home page is
  1,761 px shorter at 1512 × 734; the snap settles on Servicios' top from a notch 120 px above;
  Proceso's songs change every third notch. At 1920 × 1080 the 64rem frames leave the next
  chapter's empty top 55 px into the window, where a held chapter used to fill it.
- Link cue: drawn in 0.5 s, faded in 0.2 s on leaving; whole and undrawn under reduced motion;
  never drawn by a tap; with keyboard focus, beside the focus ring. Light, dark and the night
  ground checked.

Not done: the numbers elsewhere (the iPod's playlist and count, the gallery's "01 / 07", the
index's cards) were not part of the request and stay.
