# Motion system

Motion is part of the design system, not decoration added per component. Before animating
anything, find its level below, use the existing primitive, and use the tokens. A new primitive
or a new library needs an entry in this file first.

---

## 1. Principles

| Principle | Meaning here |
|-----------|--------------|
| **Depth** | Layers move at slightly different rates while you scroll, so objects feel stacked: the disc, the sleeve, the type. |
| **Reveal** | Content arrives progressively, once, and never hides information that has not finished animating. |
| **Tactility** | Interaction feels like handling physical media: a disc that turns as you scroll, a button that sinks, a pass that tilts. |
| **Continuity** | Chapters and pages connect: the disc travels from the index to the case study; the header never moves during page changes. |
| **Restraint** | One identity moment per view. Most elements do not move at all. |

---

## 2. Hierarchy

**Level 1, identity** (hero and page transitions only)
- Hero: the disc turns slowly on its own centre and the scene plays an *editorial separation* with
  scroll (§2.1). CSS-only entrance on first paint.
- Index → case study: the cover disc morphs between pages (cross-document View Transitions);
  the pages themselves slide side by side (§2.7).

**Level 2, narrative** (chapter structure)
- Reveal on entering the viewport (fade and rise, or mask), staggered inside a group. Chapter
  headings and their ledes rise into focus (§2.7).
- Proceso (ADR-001, 2026-11-10): selecting a step on the iPod's playlist swaps the credits and
  the count on the iPod's screen, like the gallery's (the text swap, §2.6, since 2026-11-12; it
  replaced a title rising out of its clip with the lines fading up after it); not on first
  load. The booklet and its page turn were removed with the booklet.
  Since 2026-11-11 the scroll selects too: the chapter's hold is the iPod's wheel (§2.5), and
  the selection bar slides to the selected song (`--dur-ui`, `--ease-smooth-out`, a transform;
  transitions.dev's tabs since 2026-11-12, §2.7).
- Chapter hold: Proceso stays at the top while the scroll turns its playlist (§2.5). Since
  2026-11-12 no other chapter holds: their marker went, then their holds (ADR-002).
- Header compact (2026-11-11): when the hero's pinned run ends (`.hero__clear` leaves the
  header's middle line), the strip fades in and lifts to 56 px while the controls rise 8 px and
  the monogram scales to 28 px (320 ms, transform and opacity only), so the name exits under
  the strip; the reverse on the way back up. The strip is hidden while the menu is open
  (INFORMATION_ARCHITECTURE §4). Checked 2026-11-11 at 1440 × 900: compact from about 920 px.
- Case study: the table of contents marks the section in view.

**Level 3, interface**
- Menu panel open and close (GSAP stagger, kept from the original component).
- Projects disc gallery: drag with inertia and snapping along an arc, buttons and keys, a pen
  loop round the hovered disc (§2.2). Replaced the project-row marquee on 2026-10-30.
- Case study, next track (2026-11-11, Jorge's requests; it replaced a 45° tilt): when a mouse, a
  pen or keyboard focus arrives on the row, the disc spins up like a drive waking with nothing to
  read (his reference: the Wii's Disc Channel with no disc, references.md #19). Three turns
  clockwise from rest, faster and faster, then it eases to a stop, upright again
  (`case-disc-spin-up`, `--dur-spin-up` 2.5 s): constant acceleration for 1.5 s (quadratic
  ease-in, 750°), then a cubic ease-out for 1 s (330°); they meet at the same speed, 167 rpm,
  so nothing jolts at the handover. `useSpinOnce` (§4) lets a spin under way finish, so leaving
  halfway never snaps the disc back, and never restarts it; the next arrival plays it again.
  Measured at 1440 × 900, rpm per 100 ms: 6, 18, 30 … 151, 162 up to 1.5 s, then 144, 114, 88,
  66, 46, 30, 19, 9, 3, 0; the turns end at 1.03, 1.47 and 2.38 s. Three versions came before
  it the same night: one turn with the hero's landing curve (it read as a disc flicked), a disc
  that played at 45 rpm while pointed at (Jorge wanted it to stop), and this spin-up with a
  0.35 s brake ("too abrupt").
- Buttons sink 1 px on press; links thicken their underline; focus rings appear instantly.
- Link cue (2026-11-12, §2.8): a link whose words are its only cue (no arrow) is circled by the
  gallery's pen loop while it is pointed at or focused.
- Copy-email feedback: "Copiar email" swaps to "Email copiado" and back (§2.6), its icon turns
  into a check, and a copy the browser refuses shakes the button (§2.7).
- Technology marks (Projects' credits, the index, a case study's cover) lift under the pointer
  and show their names in a tag that travels between them (§2.7).
- The menu toggle's words swap between "Menú" and "Cerrar" (§2.6, 2026-11-12); they used to
  roll through both words twice, from the original StaggeredMenu.

The vocabulary also includes bounded float, drift and rotate gestures in design/motion.css.
They are opt-in, not perpetual background animation. Existing spin/hover/draw and page
transitions remain progressive enhancements. Parameters belong to design/motion.ts and
CSS tokens; lifecycle and interaction state belong to components/ui/motion. New expressions
are allowed when they carry the physical identity and preserve the technical contract.

### 2.1 Hero scene (owner's brief, 2026-10-29; recomposed the same day from his sketch)

The disc is a lead object from the first frame, not something scroll reveals. Scroll takes the
package apart round it: the hand pulls the sleeve off the disc and the cut-outs leave, so the disc
ends alone, then the frame leaves with the page. The disc itself holds still (2026-11-11, below).
A spatial change tied to scroll progress and reversible, not a scale or fade. **Priority: the
first frame and the disc's legibility over spectacle.**

**First paint** (2026-11-10): the album is handed to you, CSS only (it plays without
JavaScript; reduced motion skips it), nothing waits for it. The name's two lines rise out of
their own masks (`line-rise`, `--dur-identity`, 110 ms apart; A24's title rise); the disc lands
spinning (`disc-land`, 1.35 turns over 1.9 s, eased out, on the label image, so the lamp's
highlight stays still) and settles into its slow turn; the hand brings the sleeve up from
below the frame (`hand-in`, 0.72 `--d` and 6° over 1.2 s, from 160 ms); role and statement
follow the name; the headphones, the knob and, last, the sticker on the film are slapped down
from 850 ms. The text is in place by about 0.9 s.

**Reflections** (fine pointers): the film's sheen (`.hero__sheen`, its own layer outside the
sleeve's shadow filter) slides with `--px` / `--py` (background position, 45 % / 30 %), and
the disc's lamp highlight turns round it (16° / 6°), the way a reflection follows the eye. The
sticker lifts under the pointer like the other handled cut-outs.

**Disc turn.** One turn per `--dur-spin` (75 s, the brief allows 60–90 s), clockwise, starting
upright, linear, no motion blur. It lives on its own element (`.hero__disc-spin`), inside a
body that never moves. It eases to a stop (≈0.6 s, `playbackRate`, never a jump)
while a mouse or pen rests on the disc and eases back on leave; a tap or click on the disc holds
it still until the next one (touch has no hover); it pauses while off-screen. Keyboards get a
**Pausar / Reanudar giro del disco** button that stays out of sight until it has focus (the brief
asked for no permanent button; WCAG 2.2.2 still needs a mechanism, as the turn lasts more than
5 s beside other content). It only runs with JavaScript, because the pause needs it.

**Taking the package apart** (narrative fractions; `--scene-split`, `--scene-solo`,
`--scene-exit`, eased with smoothstep; split and solo overlap so the movement never stalls):

| Narrative | Phase | Disc | Sleeve, with the arm holding it |
|-----------|-------|------|----------------------------------|
| 0–6 % | Rest | 80 % visible behind the sleeve, print upright | In its film, tilted 3.5°, held by its right edge |
| 6–46 % | Split | Still: the sleeve slides off it | Pulled down by the hand, +8 % / +18 % `--d`, turns to 6.5° |
| 36–80 % | Solo | Still, where it rests, alone once the sleeve has gone. Still turning | On out of the frame the way the forearm runs (down, a little right: +22 % / +115 % `--d` more, sticker and all), 10.5° |
| 80–100 % | Exit | Leaves at the page's pace, no parallax of its own | Already gone |

**The disc holds still** (2026-11-11: Jorge asked to "remove the bounce from the scroll animation
so it's static when scrolling", keeping the rest of the stickers and assets moving). Until then it
slid out of the sleeve (−6 % `--d` x, −3 % y), came back while it grew to 106 % (in portrait it
went to the frame's centre instead), then lifted 24 % `--d` faster than the page while it shrank to
96 %: out and back, larger then smaller. Its body (`.hero__disc-body`) no longer reads
`--scene-*`. The sleeve, the hand and the cut-outs are unchanged (their positions measured
identical at every scroll step, at five sizes). Wheel input through Lenis and the snap at
1512 × 734: during the pinned run the disc used to move 26 px across, 13 px up and down and 27 px
in size, and 87 px against the frame while it left; now 0 px on each. Later that night he asked to
"remove the cd bouncing while following the mouse, just the cd": the body no longer reads
`--px` / `--py` either (it leaned 0.25 of the reach, ±5.6 px), so it never moves; the label turns
and its lamp highlight still follows the pointer (Reflections, above).

The sleeve only ever moves down and outwards, so the frame's edges keep hiding the end of the
forearm. Measured on 2026-11-10 at 1024 × 768, 1280 × 800, 1440 × 900, 1512 × 734 and
1920 × 1080: the sleeve has left the frame when solo ends. With the disc still, its distance from
the name's glyphs is the resting one through the whole pinned run (2026-11-11: 96, 71, 87, 31 and
129 px at those sizes; the pointer moves neither) and only grows while the credit runs ahead on
the exit. The split used to bring it down to 14 px at 1512 × 734.

- **JavaScript, motion allowed and a viewport at least 34 rem tall:** the hero grows by
  `--scene-run` (100 svh; 80 svh below 768 px) and the whole frame is sticky at the top of the
  viewport, under the transparent header.
  The narrative runs 0 → 80 % while it is stuck and 80 → 100 % while it scrolls out, so it never
  ends on an empty viewport. The document scrolls natively underneath; the wheel is eased
  and may settle on the start of the scene or the end of the stuck run (the disc alone),
  §2.3. Anchors and keyboard scrolling behave as usual.
- **Exit parallax** (2026-11-09): while the frame scrolls out (`--scene-exit`), the credit moves
  against the page by `--credit-depth` × the frame's height: −0.15 since 2026-11-10 (the name
  is on top now), in both orientations. It runs ahead (up), away from the disc under it, which
  leaves at the page's pace since 2026-11-11.
- **Shorter viewports** (landscape phones): no pin and no extra length; the same narrative plays
  as the frame leaves the viewport.
- **Bounds** (checked 2026-10-29 at 1440 and 390 px): the narrative starts at scroll 0 and ends
  (`--scene-exit` = 1) exactly when Projects reaches the top; the pin releases at the end of the
  run; scrolling back reproduces the same values; the menu's "Inicio" link returns to 0. The
  hero and its frame clip their content (`overflow: clip`, no scroll container, so sticky
  works), so the disc, the sleeve and the hand never paint over another section. No GSAP
  ScrollTrigger or other scroll library is involved.
- **Hand-off to Projects (prepared, not built):** `--scene-exit` (0 → 1) is written on `.hero`
  while the disc leaves. A future Projects opening can read it, or name the disc for a view
  transition, to continue the movement.

**The cut-out collage** (2026-11-09, Jorge's brief "make an impression, just visuals"). Every
cut-out (`graphics/Cutout`) has three boxes so no two motions share a property: the outer one
takes the scene and the pointer (`translate`, `rotate`), the middle one its shadow, the image
its mirror, entrance and hover lift. All of it is CSS reading the existing `--scene-*`, plus
`--px` / `--py`; the scene's JavaScript is unchanged. Since 2026-11-10 three cut-outs remain
(the tape and the train were removed at Jorge's request, the `train` phase with them; the ink
loop and "!!" left with the small credit).

| Narrative | Cut-outs in the frame (headphones, knob) | On the sleeve (sticker) |
|-----------|------------------------------------------|-------------------------|
| First paint | Slapped down one by one after the scene's entrance (`slap`, 110 ms apart from 520 ms) | Slapped down with them |
| Split | Drift off the set by their depth (a few % of `--d`) | Rides with the sleeve |
| Solo | Leave through their nearest edge (the headphones up and out to the right, the knob down and left), so the disc ends alone | Leaves with the sleeve |
| Whole run | The knob turns 64° with `--scene`: an in-plane turn, honest for a photo seen from the side | — |

- **Pointer depth** (`usePointerDepth`, fine pointers only): `--px` / `--py` ease towards the
  pointer's place in the viewport (8 % of the distance per frame, frames only until settled);
  layers lean by depth × 1.4 rem: sleeve 0.5, headphones 0.7, knob 1.
  The credit never moves with the pointer (reading comes first), nor, since 2026-11-11, the disc
  (it leaned 0.25; Jorge read it as a bounce).
- **Hover** (fine pointers): the headphones and the knob lift (`scale` 1.035, −1.2°, the
  shadow falls further, `--dur-base`).
- **Weight on the GPU**: the cut-outs get `will-change` only inside the pinned-scene media query,
  like the sleeve (the disc's body never moves, so it has none); their shadows are static filters on their own boxes, never
  animated on scroll.

### 2.2 Projects disc gallery (2026-10-30)

Composition: ART_DIRECTION §5.2 (its numbers predate TASK 01; the path below is current). One
primitive (`useDiscCarousel`) owns a fractional position and the selected index; drag, the
buttons, the arrow keys (`←` `→` `Inicio` `Fin` while focus is in the gallery) and clicks on
discs all go through it, so the selection, the credits and the discs can never disagree.

- **Path** (TASK 01, 2026-10-30; `TRACK` in `src/design/discPose.ts`, every value
  named there, nothing set per disc). One continuous function of a disc's offset `u` (its index
  minus the carousel position, fractional mid-drag) returns `x`, `y`, scale, bank, yaw, the
  printed face's turn, opacity and depth. Units are the selected disc's diameter `--d`.
  - Scale: `(1 + a·u²)^−c`, 1 at the selection and 0.68 one step away (both sides, Jorge's
    brief; `scaleNext > 1` would grow the next disc as A24 does). `a` rounds the peak (width
    0.55 step), so a disc crossing the centre swells and eases off without a kink.
  - `x = 0.92 · ∫₀ᵘ scale`: gaps shrink with the discs, so the row packs towards both ends as
    in perspective (0.78, 1.31, 1.72 `--d` at 1, 2, 3 steps; scale 0.68, 0.5, 0.41).
  - `y = −0.25·x − 0.07·x²`: a gentle arc, not a straight diagonal. The row climbs to the right
    and the climb steepens there (next discs leave through the top right of the frame); the left
    end flattens, so the previous discs stay low, clear of the credits.
  - Bank: half the path's change of direction (~3° one step out, ~5° two); yaw: up to 17° away,
    ~7.6° one step out; the printed face turns 24° per step (the label rolls); the reflection
    stays still. Depth: `z-index` by distance, the selection on top.
  - How many neighbours are fully shown is a layout decision in CSS (`--shown-prev`,
    `--shown-next`, read on mount and on resize): narrow screens 1 / 1 (the edges crop them);
    wide frames 1 / 2, and 2 / 2 from 940 px tall, the height from which the second previous disc
    clears the credits with two-line titles (measured at 7 widths × 8 heights). Further discs
    fade over 0.7 step.

- **Drag**: horizontal only (`touch-action: pan-y`: a vertical swipe scrolls the page; a mostly
  vertical mouse drag is ignored). A press becomes a drag after 6 px; from then on the row
  follows the pointer 1:1 (0.8 `--d` per disc) and a click is suppressed, so a drag never opens
  a project. Grabbing the row mid-flight catches it where it is. Past the first and last disc
  the pull meets a resistance that tops out at 0.32 of a disc.
- **Release**: the flick's velocity (last 100 ms) is projected 0.24 s forward, capped at one disc,
  and the nearest disc becomes the target. A critically damped spring (ω 11 rad/s, ~0.5 s,
  solved exactly per frame) carries the remaining velocity there; a velocity the spring could
  not absorb is capped, so the arrival never overshoots or bounces.
- **Click**: on the selected disc, a link to the case study (new-tab modifiers and keyboard or
  screen-reader activation always follow the link); a pointer click on another disc brings it
  forward first.
- **Credits**: the text swap (§2.6): the old project's credits leave before the new ones arrive,
  so two projects' texts are never on screen together, and the count between the keys swaps with
  them. Not on first load, nor for a disc restored on the way back from a case study. Until
  2026-11-12 the block was re-keyed and the new title rose line by line (`--dur-slow`).
- **Annotation**: hidden while the row moves; when it comes to rest Jorge's arrow (the original
  image) is laid at the new disc like a cut-out: it fades in from 4° off and 0.5 rem low and
  settles (`--dur-slow`, `--ease-out`). It is not redrawn, so it does not pretend to draw itself.
- **Hover** (pointers that hover only): a pen loop (`HandCircle`) appears round the disc under
  the pointer, selected or not, in the disc's own plane (it leans and shrinks with it). It is
  drawn in (`stroke-dashoffset`, `--dur-slow`, `--ease-out-soft`) while it turns round the disc
  (`--dur-orbit` per turn, linear). Leaving retraces and fades it (`--dur-base`). The turn is a
  paused animation that runs only during hover, so the next visit continues from where the last
  stopped instead of jumping. Hidden while the row moves; `pointer-events: none`; no layout.
- **The private disc's phone** (2026-11-09, wide frames): when the broken disc is selected and
  the row comes to rest, Jorge's cut-out handset drops in on its cord from under the header line
  (`hang`: falls into place in `--dur-slow`, then a damped swing of 2.6 s that stops) beside the
  disc, in the room the last disc leaves at its upper right. Remounted on each rest like the
  arrow; hidden while the row moves.
- **Printed singles**: the label (with its cut-outs, grain and wear) turns with the face; the
  hub, the rim and the lamp's streak stay still.
- **Reduced motion**: drag still follows the pointer (direct manipulation); every other change
  is instant except the credits and the count, which fade out and in without the shift and the
  blur (§2.6); the arrow is simply there, the phone simply hangs there, and the hover loop
  appears whole and still.
- **No JavaScript**: the first disc is selected and the rest stay where the server put them; the
  buttons (and the `01 / 06` count between them) are hidden and a text list links every case
  study.
- **Return**: the case-study page stores its slug in `sessionStorage`; "Volver a proyectos"
  (`/#proyectos`) reopens the gallery on that disc without motion.
- **Cost**: React re-renders only when the selection changes or motion starts or stops; poses
  are written imperatively once per frame (`transform` on each disc, `transform` on its printed
  face, `opacity`, `z-index` only when the order changes). The printed face keeps its own layer
  (`will-change: transform`): without it every frame repainted six discs (masks, SVG, blend),
  measured at ~20 frames of 58 ms per change in Chrome at 120 Hz; with it, every frame of six
  changes and a drag stayed under 10 ms. The discs themselves get a layer only while moving,
  so they rest sharp. After TASK 01 (arc, bank, six hover loops in the DOM; Chrome trace, five
  changes, a hover and a drag at 1440 px @2×): 350 paints of ≤ 0.8 ms, style recalculation
  p95 2.7 ms per frame, 17 layouts in the whole sequence. Not re-measured on the GPU at 120 Hz.

### 2.3 Smooth scroll and chapter snap (owner's request, 2026-11-09)

Jorge asked for smooth scroll and scroll "locked" between sections, and chose eased wheel
input with **proximity** snap over paging. This replaces the earlier "native scroll only, no
wheel capture, no snapping" rule (references.md, rule 1, amended the same day).

- **Smooth scroll** (`SmoothScroll`, every page): Lenis eases wheel and trackpad input
  (`lerp` 0.1). The document still scrolls natively (no wrapper, no transforms), so `sticky`,
  `useScrollScene`, `useParallax` and the reveal observer keep working unchanged. Touch,
  keyboard and the scrollbar are native. The menu panel is `data-lenis-prevent`.
- **In-page links**: same-page hash links (and the menu's chapter links) scroll through
  `scrollToTarget`, eased, honouring `scroll-padding-top` / `scroll-margin-top`; the hash is
  pushed and focus moves to the target. A held chapter opens at the start of its hold
  (2026-11-11): it is sticky, so from below its box sits at the end of the hold, and a link
  would have opened Proceso on its last song; the target is its hold wrapper's top instead.
- **Chapter snap** (home only): `main > section` and `[data-snap]` (the hero's end-of-run mark)
  are snap points aligned to the top edge. When the wheel comes to rest (400 ms) within 25 % of
  a viewport of one, the page settles on it in 0.8 s (Lenis' expo-out); anywhere else it stays
  where it stopped, so long chapters and the hero's scrub read freely. Parameters:
  `motion.smoothScroll` in `src/design/motion.ts`.
- **Limits**: snap follows the wheel only (Lenis snap ignores touch); phones scroll natively
  without snap. Keyboard, scrollbar and anchor scrolls never snap.
- **Cost**: Lenis and its snap are separate chunks (5.4 kB + 2.0 kB gzip) loaded after
  hydration. Frames are requested only while Lenis animates (its `autoRaf` would keep an idle
  page rendering); the loop wakes inside `lenis.scrollTo`, which the wheel, the snap and the
  links all go through. Pattern taken from atlaxia.es (2026-11-09).
- **Reduced motion and no JavaScript**: nothing loads; native scroll, no snap.

### 2.4 Parallax (2026-11-09)

Depth while chapters scroll past, never at rest. `useParallax` writes `--parallax` on a
section: −1 a viewport before its top meets the viewport's, 0 at that point (the snapped,
measured composition), 1 a viewport later. Layers multiply it by their own depth in CSS.

- **Hero**: the exit parallax on the credit (§2.1); the disc leaves at the page's pace (2026-11-11).
- **Projects**: the credits column trails the page (`6svh` per viewport); the gallery (discs,
  keys, arrow) runs ahead of it (`−14svh`). At rest both are exactly in place, so the credit /
  disc clearances measured in §2.2 hold.
- Reduced motion and no-JS: `--parallax` stays 0.

### 2.5 Chapter hold (owner's request, 2026-11-09, after atlaxia.es)

"When the top of a section reaches the top, it stays until you scroll again." atlaxia.es
(Jorge's other site, `J0rgw/AtlaxiaBussinessWeb`) does this with Lenis and CSS sticky stages: a
scene `length` viewports tall whose 100svh stage is `sticky; top: 0`; no snapping, no wheel
capture. Here, in CSS only (`layout.css`):

- `HomePage` wraps every chapter in `.chapter-hold`; since 2026-11-12 only a wrapper marked
  `data-holds` holds (`ChapterHold holds`), and only Proceso's is (ADR-002, below). A holding
  wrapper ends in a `::after` spacer of `--chapter-hold` (60svh by default, Proceso's 200svh; a
  spacer, because sticky travels inside the content box, so padding does not count) and the
  chapter is `sticky; top: 0; min-height: 100svh`. When its top meets the viewport's it stays
  for the spacer's length of scroll, then leaves with the page. Taller chapters then read on
  normally; shorter ones fill the viewport while held, so nothing empty shows under them. The
  other wrappers only mark their chapter's snap point.
- The last chapter (Contacto) runs into the footer and is not held. The hero keeps its own pin.
- The snap points are the wrappers (§2.3), so a wheel that stops near a chapter settles on the
  start of its hold. Projects' parallax (§2.4) reads 0 through the whole hold.
- Works with touch and keyboard (plain sticky). Off without JavaScript, with reduced motion and
  under 34rem of height, like the hero's pin: a plain flow.
- Checked 2026-11-09 at 1512 × 678 and 390 × 844: the chapter's top stays at 0 from the start to
  the end of the hold (Projects, Proceso, Librería, Servicios), a 3-tick wheel inside the hold
  leaves the chapter in place, the next gesture releases it; anchor links land under the header;
  no horizontal overflow.

**Only what fits is held** (2026-11-10, [ADR-001](adr/ADR-001-chapter-frames.md)). A chapter
taller than the window was frozen with its first screen showing while the rest waited below
(Proceso, Servicios and Sobre mí were 2.5 to 3 screens at 1512 × 734). Two changes: the chapters
were recomposed to fit one frame, and `useChapterHold` measures the chapter on mount, on resize
and whenever its height changes (a `ResizeObserver`): taller than `innerHeight`, its wrapper gets
`data-unheld` and layout.css drops the stick and the spacer, so it flows and its marker is
simply drawn. Projects follows the same rule since 2026-11-11 (Jorge's call): on phones and
portrait tablets it is 1.04 to 1.35 windows tall, so it flows there, and its foot (the
gallery's keys) is no longer kept under the fold through the hold; while it flows its parallax
(§2.4) runs as the page scrolls. Measured on the production build: every chapter is held at
1024 × 768, 1280 × 720, 1440 × 900, 1512 × 734 and 1920 × 1080, in both themes; at 390 × 844
Proceso and the bonus are held while Projects, Servicios and Sobre mí flow; at 768 × 1024 only
Projects flows; at 320 × 640 every chapter flows.

**The hold's job, and its removal** (2026-11-10 to 2026-11-12). After the critique ("scroll
that does nothing", five times per visit) Jorge chose to give the hold a job rather than shorten
it: while a chapter held, a marker stroke (`graphics/PenMark`, drawn by a `--hold` property from
0 to 1) underlined what it was about, "seleccionados", "producto real", "el problema que
tienes", "mí" and "en preparación". On 2026-11-12 he had it removed: drawn by the scroll, it
made scrolling feel cheap and broke the rest of the page's aesthetic
([ADR-002](adr/ADR-002-links-without-arrows.md)). `--hold` and the component went with it.
Without the stroke, the holds of Projects, Servicios, Sobre mí and Librería changed nothing on
screen again, so, from three rendered options (keep them, drop them, 20svh), he chose to drop
them: only Proceso holds, because its hold has its own job (below). The others scroll straight
on; a wheel that stops near a chapter's top still settles on it (§2.3).

- Measured 2026-11-12 on the production build: at 1512 × 734, 1920 × 1080 and 390 × 844 only
  Proceso's wrapper has a spacer (1,468, 2,160 and 1,688 px) and a sticky chapter; the home page
  is 1,761 px shorter at 1512 × 734 (four holds of 440 px); one wheel notch 120 px above
  Servicios settles exactly on its top; Proceso's songs still change every third notch. At
  1920 × 1080 a frame is 64rem (1,024 px), so the next chapter's empty top shows under it by
  55 px, where a held chapter used to fill the window.

- `ChapterHold` (`components/ui/motion`) is the wrapper; its hook `useChapterHold` follows the
  held chapter and sends it its place (`onHold`): 0 when its top meets the viewport's (the snap
  point), 1 when the hold is used up. The hold's length is the wrapper's spacer (wrapper height
  minus chapter height), so where layout.css holds nothing it is 0 and the chapter hears `null`.
- Cost: one passive scroll listener per held chapter, a frame at most per scroll event, only
  while the chapter is within a viewport of the screen (one read of the wrapper's box); an
  event to the chapter only when its place changes.

**Proceso's hold turns the playlist** (Jorge's request, 2026-11-11: "the scroll changes the
song and therefore the text"). The chapter's hold is 200svh (`.chapter-hold:has(> .process)` in
LinerNotes.css) instead of 60svh, and every song owns an equal share of it (40svh with five
songs; more songs would share the same length). Scrolling through it changes the song, the
selection bar slides to it and its credits swap (§2.6); scrolling back runs the songs back.
Before the hold the first song plays, after it the last.

- `useChapterHold` sends its state to the chapter (`onHold`: progress, the hold's start and
  length, or `null` once it is not held), only when it changes. LinerNotes maps the progress to
  a song (`floor(progress × songs)`), with no swap for the first state on load.
- Choosing a song (click, tap, arrows, Home, End) while held selects it at once and scrolls the
  page to the middle of its share (`scrollToOffset`), so the wheel and the playlist agree; the
  songs passed on the way are ignored until the page arrives, or for `motion.playlist.arriveMs`
  (1.5 s) if another scroll takes over, after which the scroll leads again. Focus on the
  playlist follows the song, so its one Tab stop is always the selected tab.
- Not held (taller than the window, reduced motion, under 34rem of height, no JavaScript): no
  event, the songs are chosen on the playlist only.
- Cost: no new listener (the hold's own), one custom event per changed frame near the chapter,
  one React render per song change; the bar is a transform.
- Checked 2026-11-11 on the production build at 1512 × 734 (wheel ticks of 100 px): the songs
  change at a hold progress of 0.2, 0.4, 0.6 and 0.8, about three ticks (294 px) a song, in
  both directions; a click on song 4 at the hold's start shows it at
  once and lands at 0.700 with no other song shown on the way; ↓, End, Home and a wrapping ↓
  move selection, focus and page together; a click followed at once by the wheel hands over to
  the scroll after 1.5 s; the menu's Proceso link lands on the first song from Contact and from
  the hero. On a 390 × 844 phone emulation the five songs follow native scroll (hold 1,688 px).
  Reduced motion: no hold, a click selects. Without JavaScript the five steps are listed. No
  horizontal overflow at 320, 390, 768, 1024, 1280, 1440 and 1512 px in both themes; no console
  errors.

### 2.6 Text that changes in place (owner's request, 2026-11-12)

Jorge brought a "text states swap" component (a library card where "Transaction processing…"
becomes "Transaction completed") and asked for its motion wherever text changes on the home page,
starting with Proceso's credits as the scroll turns the iPod. Kept from it: the timing, the curve,
the distances and the reduced-motion fallback.

- **The swap**: the text on screen leaves, rising 4 px (`--swap-shift`) as it blurs to 2 px
  (`--swap-blur`) and fades out; then the new text is set 4 px below, blurred and transparent,
  and eases up into place, sharp and opaque. Each half takes `--dur-swap` (150 ms) on CSS's own
  `ease-in-out` (`--ease-swap`, softer than `--ease-in-out`), 300 ms in all; the new text arrives
  once the old one has gone, so the two never overlap.
- **Mechanics**: `useTextSwap(value, instant)` returns the value to render and the phase to set
  as `data-swap` (`idle`, `out`, `in`); motion.css does the rest. A change sets `out`; after
  `--dur-swap` (read from the token, so CSS is its only source) the hook renders the new value
  under `in`, which has no transition, forces one layout and goes back to `idle`, so the new text
  transitions in. Changes that arrive while the old text is leaving are not queued: the latest
  is the one that arrives (a fast double press on the gallery goes from 03 to 05 without showing
  04), and a change back to the text still on screen cancels the swap. `instant` changes apply at
  once: the first song on load inside Proceso's hold, a disc restored on the way back from a case
  study. Inline text becomes `inline-block` (through `:where()`, so any component rule wins) so it
  can move.
- **Where**: Proceso's credits and the count on the iPod's screen, by scroll or playlist (§2.5);
  Projects' credits and the count between the keys (§2.2); the copy button ("Copiar email",
  "Email copiado"); the menu toggle ("Menú", "Cerrar", on every page); the hero's focus-revealed
  pause control, its icon and words together ("Pausar" and "Reanudar giro del disco"). Not the
  gallery's annotation, which is laid in again with the arrow when the row comes to rest (§2.2).
- **Not tied to the scroll**: the blur is a filter, which §6 keeps off scroll-linked motion. This
  one is a 150 ms transition that runs once after a change, whatever caused it, on one block of
  text at a time; scroll position never scrubs it, and at rest the element has no filter.
- **Reduced motion**: the fade alone, without the shift and the blur, as in the original
  component. It is the one transition spared base.css's backstop: cut to 0.01 ms, its fade would
  leave the text invisible for 150 ms instead.
- **No JavaScript**: nothing changes; `data-swap` stays `idle`.
- Checked 2026-11-12 on the production build in Chrome, every frame sampled. At 1512 × 734 the
  wheel turned the five songs down and back up: eight swaps of the credits and the count, each
  half 150 ms to within a frame (148–169 ms as sampled; a change made by the scroll waits one
  frame for React's effect), opacity down to 0, the blur up to 2 px, the text from −3.6 to +4 px
  (−4 falls between frames), one step on screen at a time. The gallery's next key, the copy
  button, the menu toggle and the pause control: 148–152 ms a half. Reduced motion: opacity only,
  shift and blur 0. At 390 × 844 in dark: the same, with Proceso held. Every element the swap
  touches has the same box as before at 1512 × 734, 1440 × 900, 1024 × 768, 768 × 1024, 390 × 844
  and 320 × 640, with and without JavaScript; no horizontal overflow, no console errors; long
  frames while the wheel turns the songs are the same as before the change.

### 2.7 Transitions from transitions.dev (owner's request, 2026-11-12)

After the text swap (§2.6), Jorge asked for every transition in the transitions.dev library that
this site can use. Of its 44 (8 of them paid, with no public code), seven fit something the site
already does; the rest belong to interfaces it does not have. Their values come from the
library's published motion scale (its duration, easing, distance, blur and scale tokens, each
annotated with the transitions that use it) and its React snippets. Its per-transition CSS (the
"CSS" tab) was not read, so a few values are inferred from those; they are marked *inferred*.

| transitions.dev | Here | Motion |
|-----------------|------|--------|
| Side-by-side page slide | Every page change (the root of the cross-document view transition) | The page you leave drifts 8 px back, blurring to 3 px as it fades; the next arrives from 8 px ahead into focus; both at once, 250 ms (`--dur-ui`) on `--ease-smooth-out`. Going back (to a shallower page, or the browser's back) runs the other way: the inline script in `index.html` names the transition `back` on `pagereveal` (Chromium; elsewhere it always slides forward). The header and the discs keep names of their own: the header stays put and the disc morphs (600 ms, unchanged). |
| Icon swap | The copy button (copy to a check while "Email copiado" shows) and the hero's pause control (pause and play) | The icon leaving shrinks to 0.5 (*inferred*) blurring 2 px and fading while the other grows in, together, 250 ms `ease-in-out` (`data-icon-swap`). The words still swap as text (§2.6). |
| Input shake on error | The copy button when the browser refuses the clipboard | 8 px each way in two 80 ms beats, then 6 px and back in two of 60 ms, 280 ms in all (the order of the beats is *inferred*). No words change on the button; the live region says why. |
| Avatar group hover spring | Rows of technology marks: Projects' credits, the index cards, a case study's cover (`MarkRow`) | The mark under the pointer rises 4 px and grows 5 %; each step away keeps 0.45 of the lift (1.8 px, then 0.81 px). Up on `--ease-smooth-out`; let go, on `--ease-spring-back`, which dips as far below rest as it rose before settling; 350 ms (`--dur-lift`, *inferred*). |
| Tooltip open/close | The same rows: each mark's name, which was the browser's own `title` tooltip | One tag per row, in the page's inverted ink, shows 80 ms after the pointer arrives and fades and scales in from 0.98 over 150 ms `ease-out`; it travels from mark to mark while the pointer stays on the row (150 ms, *inferred*) and goes at once when it leaves. Mouse and pen only. The mark's `title` is held back while hovered (so the browser's tooltip does not show too) and stays in the HTML for no-JS. |
| Tabs sliding | The iPod's selection bar (§2.5) | 250 ms on `--ease-smooth-out` (it was 180 ms on `--ease-out`). |
| Texts reveal | Every chapter's heading and lede (`ChapterHeading`) | Each line rises 12 px out of a 3 px blur as it fades in, 500 ms (`--dur-rise`) `ease-in-out`, the lede 40 ms after the heading (*inferred*: the library's stagger step). `data-reveal="rise"`; it replaces `up` (2 rem, 800 ms) there. |

Not used, with the reason: card resize, notification badge, toast and banner stacking (nothing
here resizes or notifies); menu dropdown, plus-to-menu morph, modal and panel reveal (no dropdowns
or dialogs besides the menu, which keeps its own choreography); success check (the copy button
has the icon swap, one effect per state); input clear, skeleton, checkbox and toggle (no inputs,
loading states or switches); like button; accordion (nothing collapses); thinking states,
reasoning stream, streaming text and the matrix loader (AI states); shimmer text ("en
preparación" already says so, and a loop would need a pause); learn-more hover (drawn for a
chevron; the arrows here already shift on hover); 3D tilt (the case study's cover is a disc half
out of its sleeve: tilting the sleeve breaks it, tilting both needs a glare that follows two
shapes); number pop-in, reel counter and subtle number change (the only numbers that change are
the two counts, which swap as text at Jorge's request, §2.6).

- **Blur**: the page slide and the rising headings blur by 3 px, the icon swap by 2 px, like the
  text swap: transitions of 150 to 500 ms that run once after a change or an arrival, never
  scrubbed by scroll position; nothing keeps a filter at rest.
- **Reduced motion**: the icon swap is a cross-fade (no scale, no blur; spared the backstop like
  the text swap); the marks do not lift and their tag appears without its scale; no shake; the
  headings are simply there; no page slide (view transitions are off).
- **No JavaScript**: the marks keep their `title` tooltips; headings are there; page changes are
  plain navigations.
- Checked 2026-11-12 on the production build in Chrome at 1512 × 734, every frame sampled. Page
  slide: index to a case study is `forward` (the new root from 8 px, blur 3 px, opacity 0, the old
  to −8 px, 250 ms on `cubic-bezier(0.22, 1, 0.36, 1)`); its back link to `/#proyectos` and the
  browser's back are `back` (`--page-dir` −1, from −8 px, to 8 px). Copy: sampled from just
  before the click, the check is whole at 322 ms, halfway at 0.44 opacity, 0.72 scale and 1.1 px
  of blur. A refused copy:
  one `shake` of 280 ms, −7.9 to +7.9 to −6 px, its class cleared at the end. Marks: −4 px at
  1.05, −1.8 px and −0.81 px beside it; let go, the hovered mark dips to +4.0 px about 130 ms later
  and is at rest by 330 ms; the tag shows 74 ms after the pointer, whole at 224 ms, travels in nine
  frames without fading, and is gone the next frame after the pointer leaves; titles held back and
  restored. The bar: `translate 0.25s cubic-bezier(0.22, 1, 0.36, 1)`. Servicios' heading: opacity
  0, 12 px and 3 px of blur when revealed, 0.5, 6 px and 1.5 px at 250 ms, at rest by 500 ms, the
  lede a step behind. Reduced motion: as above, measured. Element boxes identical to the build
  before at 1512 × 734, 1024 × 768 and 390 × 844 on home, the index and a case study, with and
  without JavaScript; no horizontal overflow; no console errors.

### 2.8 Link cue (Jorge's pick, 2026-11-12)

When the arrows went (ADR-002), a link with nothing else to say it is one needed a cue. Jorge
compared eight, rendered on the real build (words only, the header's "Hablemos" underline, the
line redrawn, the line tightening, a highlighter, the pen loop, the words rolling, a small
CD-R), and chose the pen loop: `ui/LinkCue` round the link's words.

- **At rest**: the header's "Hablemos" underline, in the words' colour, as heavy as the type
  (`--link-underline`, `max(2px, 0.1em)`: 2 px under the 17 px semibold links, whose stems are
  about as thick, 3.2 px under the Projects heading, 8.6 px under the next track's title at
  1512 px; `--link-underline-offset`, `min(0.3em, 0.06em + 0.25rem)`: 5 px under body text,
  closer in proportion under large type). It was a 1 px hairline 0.35em down until Jorge asked,
  the same day, for it bolder to fit the font, chosen from rendered weights. The header reads
  the same tokens. A phone sees only this.
- **Pointed at or focused**: the gallery's pen loop (`graphics/HandCircle`, stretched into an
  oval with `stretch`, a 1.7 px non-scaling stroke in `--accent`) is drawn round the words,
  `stroke-dashoffset` 1 → 0 over `--dur-slow` on `--ease-out-soft` while it fades in over
  `--dur-fast`; when the pointer leaves, it fades over `--dur-base` on `--ease-out` while it is
  retraced, so it is gone well before the retrace ends (as the gallery's loop is). The words take the link's hover colour (`--accent-functional`), and the line with them.
  Pointer hover only where the device can hover (`@media (hover: hover)`), so a tap leaves no
  loop; keyboard focus draws it as well, beside the focus ring.
- **Geometry**: the loop's box is set from the type, not from the line box (Poppins' baseline
  sits 0.5lh + 0.35em under a line's top, its capitals 0.7em over the baseline): it starts
  `--link-cue-head` (`min(0.95em, 1rem)`) over the first line's capitals and ends
  `--link-cue-foot` (`clamp(0.3rem, 0.5em, 0.45rem)`) under the last line's underline, and
  reaches `--link-cue-side` (`min(0.45em, 0.75rem)`) past the words. The margins stop growing
  with large type, so round the next track's title (86 px at 1512 px, 104 px at 1920 px) it
  passes 3 to 5 px under "Siguiente pista" and stays off the disc; since the line got bolder the
  tagline sits 8 px further down (`margin-top`), so the line ends 9 to 12 px above it and the loop
  clears it. The Projects heading sets "Proyectos" over
  "seleccionados" at every width (`width: min-content`) with a wider side (1.4em), so the oval
  clears the corners of the two lines.
- **Where**: the Projects heading, Proceso's evidence links, Servicios' enquiries, the footer's
  full index, and on a case study the next track's title and "Todos los proyectos". The link
  draws no underline of its own, which would double the line.
- **Reduced motion**: the loop is there at once, undrawn (as in the gallery). **No JavaScript**:
  the same; the cue is CSS.
- Cost: one SVG path per link, no script, no listener; the dash offset and the opacity are the
  only properties that move.
- Measured 2026-11-12 on the production build in Chrome at 1512 × 734, sampled every frame on a
  Servicios enquiry: the dash offset is 0.42 at 125 ms, 0.17 at 225 ms, 0.05 at 325 ms and 0 by
  526 ms, the opacity 0.99 by 125 ms; leaving, the opacity is 0.14 at 96 ms and 0 by 200 ms.
  Every loop (heading, Proceso, Servicios, footer, next track, "Todos los proyectos") ends at
  opacity 1, offset 0 and a 1.7 px stroke. Under reduced motion it is whole at 120 ms. At
  390 × 844 `(hover: hover)` does not match, so a tap draws nothing.

---

## 3. Tokens (`src/design/tokens.css`)

| Token | Value | Use |
|-------|-------|-----|
| `--dur-instant` | 100 ms | Colour and opacity feedback |
| `--dur-fast` | 180 ms | Hover, press |
| `--dur-base` | 320 ms | Small UI transitions |
| `--dur-slow` | 600 ms | Panel, marquee |
| `--dur-reveal` | 800 ms | Reveal on scroll |
| `--dur-identity` | 1100 ms | Hero entrance, page morph |
| `--dur-spin` | 75 s | One turn of the hero disc (§2.1) |
| `--dur-spin-up` | 2500 ms | The next track's spin-up: three turns, faster and faster, then an eased stop (§2) |
| `--dur-orbit` | 10 s | One turn of the pen loop round a hovered gallery disc (§2.2) |
| `--ease-out` | `cubic-bezier(0.19, 1, 0.22, 1)` | Default (expo out, already used by the rows) |
| `--ease-out-soft` | `cubic-bezier(0.25, 1, 0.5, 1)` | Reveals |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | Morphs |
| `--ease-press` | `cubic-bezier(0.2, 0, 0, 1)` | Button press |
| `--stagger` | 70 ms | Delay step inside a revealed group |
| `--dur-swap` | 150 ms | Each half of the text swap (§2.6); `useTextSwap` reads it |
| `--ease-swap` | `ease-in-out` | The text swap: CSS's own curve, softer than `--ease-in-out` |
| `--swap-shift`, `--swap-blur` | 4 px, 2 px | How far swapped text moves and how far out of focus it goes |
| `--dur-ui` | 250 ms | transitions.dev's UI step: page slide, icon swap, the iPod's bar (§2.7) |
| `--dur-lift` | 350 ms | A mark lifting and springing back (§2.7) |
| `--dur-rise` | 500 ms | A chapter heading rising in (§2.7) |
| `--dur-tip-delay` | 80 ms | Before a mark's name tag shows (§2.7) |
| `--ease-smooth-out` | `cubic-bezier(0.22, 1, 0.36, 1)` | transitions.dev's smooth decel: page slide, the bar, a mark lifting |
| `--ease-spring-back` | `cubic-bezier(0.34, 3.85, 0.64, 1)` | A mark let go: dips past rest, then settles |
| `--ease-tip` | `ease-out` | The name tag |

GSAP code uses the same values (`expo.out`, `power4.out`) and durations within ±20 %.

---

## 4. Primitives

| Primitive | File | What it does |
|-----------|------|--------------|
| Reveal controller | `src/components/ui/motion/RevealController.tsx` | One `IntersectionObserver` for every `[data-reveal]` element on the page. Marks them `data-revealed` once. |
| Reveal styles | `src/design/motion.css` | `data-reveal="up" \| "fade" \| "mask"`, delays via `--reveal-delay` or `data-reveal-index`. |
| Scroll scene | `src/components/ui/motion/useScrollScene.ts` | Writes `--scene` (0 → 1) and one eased `--scene-<phase>` per named phase on a root holding a `[data-scene-pin]`. Pin-aware: the narrative splits between the stuck run and the scroll-out when CSS makes the pin sticky, and plays over the scroll-out alone when it is static. Measures `[data-scene-anchor]` boxes on resize (`--scene-<name>-dx/dy` to the pin's centre). One passive listener, one frame at most per scroll, nothing off-screen or under reduced motion. |
| Smooth scroll | `src/components/ui/motion/SmoothScroll.tsx` | Lenis (eased wheel) on every page and proximity chapter snap on home (§2.3), loaded on demand; `scrollToTarget()` for in-page jumps (a held chapter opens at the start of its hold), `scrollToOffset()` for a document offset. Off under reduced motion. |
| Parallax | `src/components/ui/motion/useParallax.ts` | Writes `--parallax` (−1 → 0 → 1) on a section as it passes the top edge (§2.4). One passive listener, one frame per scroll, nothing off-screen or under reduced motion. |
| Pointer depth | `src/components/ui/motion/usePointerDepth.ts` | Writes `--px` / `--py` (−1 → 1, the pointer's place in the viewport, eased per frame by `motion.pointerDepth.ease`) on a root; CSS multiplies them by each layer's depth (§2.1). Mouse or pen on a hovering device only, only while the root is on screen, frames only until the values settle, no layout reads (the hero's frame is pinned to the viewport). Nothing under reduced motion. |
| Paper gestures | `src/design/motion.css` | Bounded, CSS-only, off under reduced motion: `data-gesture="slap"` (a cut-out slapped down: lands large and turned, squashes, settles; `--slap-index` staggers; `backwards` fill so hover can use `scale`/`rotate` after), `hang` (dropped in on a cord, damped swing that stops), `draw-loop` (ink revealed round its centre through a registered `--sweep` angle; fully shown where `@property` is unsupported), plus the older `float`, `drift`, `rotate`. |
| Spin | `src/components/ui/motion/useSpin.ts` | Drives a CSS keyframe loop: pauses it off-screen, eases `playbackRate` to 0 on mouse/pen hover and back, holds it while a `paused` flag is set. Does nothing under reduced motion (the CSS declares no loop). |
| Disc carousel | `src/components/ui/motion/useDiscCarousel.ts` | Drag with inertia and snapping for a row of items (§2.2): one position, one selection, a stable controller (`goTo`, `step`, `index`), `render(position)` at most once per frame, `onIndex` / `onMotion` callbacks for React. No loop while idle; instant under reduced motion. |
| Scroll spy | `src/components/ui/motion/useScrollSpy.ts` | Returns the id of the section currently being read. |
| Spin once | `src/components/ui/motion/useSpinOnce.ts` | Sets `data-spinning` on a target when a mouse or pen enters its trigger or keyboard focus arrives; the end of the CSS animation it names clears it. A spin under way finishes and is never restarted. Nothing on touch, under reduced motion or without JavaScript. |
| Chapter hold | `src/components/ui/motion/ChapterHold.tsx`, `useChapterHold.ts` | The wrapper round every home chapter (its snap point). When it `holds` (Proceso only), it sends the chapter its place in the hold, 0 → 1 (`onHold`, Proceso's playlist), and marks the wrapper `data-unheld` when the chapter is taller than the window (§2.5); otherwise the hook does nothing. One passive listener, one `ResizeObserver`, one frame per scroll, nothing beyond a viewport away or under reduced motion. |
| Text swap | `src/components/ui/motion/useTextSwap.ts`, `src/design/motion.css` (`[data-swap]`) | `useTextSwap(value, instant)` returns the value on screen and the phase for `data-swap`: the old text leaves (up, blurred, transparent), then the new one arrives from below (§2.6). The latest change wins, nothing is queued; `instant` skips it. Reduced motion keeps the fade. |
| Mark row | `src/components/ui/MarkRow/MarkRow.tsx`, `src/components/ui/motion/useMarkGroup.ts` | A list of technology marks that lift under the pointer, the nearest most, and share one name tag that travels between them (§2.7). Mouse and pen only; the marks' `title` stays for no-JS. |
| Icon swap | `src/design/motion.css` (`[data-icon-swap]`) | Two icons in one place, `a` or `b` showing: the other shrinks out of focus as this one grows in (§2.7). Reduced motion: a cross-fade. |
| Shake | `src/design/motion.css` (`.is-shaking`) | A refusal: 8 px each way, then 6 px, 280 ms (§2.7). Replay by removing and re-adding the class; none under reduced motion. |
| Rise | `src/design/motion.css` (`data-reveal="rise"`) | A reveal for a heading and its lede: 12 px out of a 3 px blur, 500 ms, 40 ms apart (§2.7). |
| Page slide | `src/design/motion.css` (`::view-transition-old/new(root)`), `index.html` | The root of every page change slides 8 px, forward or `back` (§2.7). |
| Reduced-motion hook | `src/components/ui/motion/useReducedMotion.ts` | Live `prefers-reduced-motion` value for effects (never for markup). |
| GSAP on demand | `src/components/ui/motion/gsap.ts` | `loadGsap()` / `prefetchGsap()`: GSAP is a separate chunk fetched on idle or first use. Closed and resting states live in CSS so nothing waits for it. |
| View transitions | `src/design/motion.css` | `@view-transition { navigation: auto }` and the named elements. |

### How reveal stays safe

1. An inline script in `<head>` adds `class="js"` to `<html>` before first paint. Without
   JavaScript the class never appears and nothing is ever hidden.
2. Hidden states only apply under `.js [data-reveal]:not([data-revealed])`.
3. **Hero content is never gated by JavaScript.** It uses a CSS keyframe entrance that starts on
   first paint.
4. Failsafe: if the controller has not started after 2.5 s (slow or failed bundle), a CSS
   animation reveals everything.
5. Elements already in the viewport when the controller starts are revealed immediately, in order.

### How scroll-linked motion stays cheap

- Only `transform` and `opacity` animate. No layout properties, no filters on scroll, no
  `background-position` loops. (The short blurs of the swaps, the rising headings and the page
  slide run once after a change or an arrival, never with the scroll position: §2.6, §2.7.)
- `--scene-*` values are written once per frame, only while the element intersects the viewport,
  from a passive listener. Geometry (anchors, pin run) is measured on resize, not on scroll.
- Components read them in CSS (`calc()` inside the individual `translate` / `rotate` / `scale`
  properties), so the entrance keyframes and the scroll transforms never overwrite each other.
- `will-change` is set only on the elements that actually move, and only while they are on screen.

---

## 5. Reduced motion

`prefers-reduced-motion: reduce` gives a complete, equally informative experience:

- Reveals: content is simply visible.
- Hero: the disc is still and upright, the composition stays at rest, the scene adds no scroll
  length and the pause control is hidden (there is nothing to pause). Same without JavaScript.
  Every cut-out is simply in place (no slap, no drawn ink, no pointer depth); the train, which
  only exists in the scene, does not appear.
- View-transition morphs: off (instant navigation).
- Menu: opens and closes instantly, focus behaviour unchanged. (The global backstop gives every
  element a 0.01 ms transition, so inherited `visibility` reaches the panel's links a few frames
  late; the menu retries `focus()` each frame until it lands.)
- Projects gallery: instant changes; the credits and the count fade out and in (§2.6); the
  arrow already drawn (§2.2).
- Case study: the next track's disc does not spin; its title still takes the hover colour.
- Header: turns compact at once, without the fade or the lift.
- Link cue: the pen loop is simply there while a link is pointed at or focused; nothing is drawn.
- Proceso: its credits and count fade out and in (§2.6), and its songs are chosen on the
  playlist only (there is no hold to turn them); the selection bar jumps.
- Text that changes in place (the copy button, the menu toggle): the fade alone, without the
  shift and the blur (§2.6). The hero's pause control is not there to swap (above).
- The transitions from transitions.dev (§2.7): icons cross-fade, marks do not lift and their tag
  appears without its scale, a refused copy does not shake, chapter headings are simply there,
  and pages change without a slide.
- Smooth scrolling, chapter snap, chapter hold and parallax: off (native scroll, plain flow,
  layers at rest).

The global rule in `src/design/base.css` is a backstop, not the mechanism: each primitive
checks the preference itself so no JavaScript loop keeps running behind a frozen CSS rule. The
text swap's fade is the one transition it spares (§2.6).

---

## 6. Performance rules

- No Three.js or WebGL. The previous full-screen shader (`ColorBends`) rendered every frame, even
  off-screen; removing it with Three.js took the bundle from 228 kB to 124 kB gzip, and loading
  GSAP on demand brought the initial JavaScript to 96.7 kB gzip (measured 2026-10-26).
- No uncontrolled perpetual animation. Anything that loops runs only while visible and in
  view; the Projects gallery runs a frame loop only while its row is moving (the logo loop, the
  page's other loop, was removed with About's logo strip on 2026-11-10). The hero disc's turn (§2.1) is a CSS `rotate` animation on its
  own compositor layer (`will-change: rotate`), so it costs no main-thread work; it still pauses
  off-screen and can be paused by the visitor.
- Animate `transform` and `opacity` only. Never animate `width`, `height`, `top`, `left`,
  `filter` or `box-shadow` on scroll. The filters that animate are the short blurs of the
  transitions.dev set (2 px on the text and icon swaps, 3 px on the rising headings and the page
  slide): 150 to 500 ms after a change or an arrival, never per scroll frame (§2.6, §2.7).
- New animation libraries require a measured reason. GSAP is reserved for the menu and is never
  imported statically: use `loadGsap()`. Lenis (2026-11-09, §2.3) is likewise a dynamic import
  (7.4 kB gzip with its snap), for eased wheel input and proximity snap that CSS scroll-snap
  cannot combine with an eased scroll. Everything else is CSS or the primitives above (the
  gallery's drag and spring are ~300 lines of our own, lighter than GSAP's Draggable and
  Inertia and in step with React's single selection).
- Touch and keyboard alternatives exist for every hover interaction.
- Interaction to Next Paint: handlers do no layout reads in loops; GSAP timelines are built once
  per interaction.

---

## 7. Checklist for any animated change

- [ ] Which level is it (1, 2 or 3)? Is there already a primitive for it?
- [ ] Uses tokens for duration and easing.
- [ ] Transform and opacity only.
- [ ] Content is readable before, during and without the animation (no-JS and reduced motion
      checked).
- [ ] Stops when off-screen; nothing loops forever without a pause control (hero disc: §2.1).
- [ ] Keyboard and touch equivalents exist.
