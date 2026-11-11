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
- Index → case study: the cover disc morphs between pages (cross-document View Transitions).

**Level 2, narrative** (chapter structure)
- Reveal on entering the viewport (fade and rise, or mask), staggered inside a group.
- Proceso (ADR-001, 2026-11-10): selecting a step on the iPod's playlist changes the credits
  over like the gallery's: the title rises out of its clip (`--dur-slow`, `--ease-out`), the
  line and the decision fade up after it (`--stagger`); keyed by the selection, not on first
  load, none under reduced motion. The booklet and its page turn were removed with the booklet.
  Since 2026-11-11 the scroll selects too: the chapter's hold is the iPod's wheel (§2.5), and
  the selection bar slides to the selected song (`--dur-fast`, `--ease-out`, a transform).
- Chapter hold: the marker underlines the chapter's phrase as the hold is used up (§2.5).
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
- Buttons sink 1 px on press; links thicken their underline; focus rings appear instantly.
- Copy-email feedback.

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
upright, linear, no motion blur. It lives on its own element (`.hero__disc-spin`), apart from
the pointer's lean on its parent. It eases to a stop (≈0.6 s, `playbackRate`, never a jump)
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
`--scene-*`; only the pointer leans it. The sleeve, the hand and the cut-outs are unchanged
(their positions measured identical at every scroll step, at five sizes). Wheel input through
Lenis and the snap at 1512 × 734: during the pinned run the disc used to move 26 px across,
13 px up and down and 27 px in size, and 87 px against the frame while it left; now 0 px on each.

The sleeve only ever moves down and outwards, so the frame's edges keep hiding the end of the
forearm. Measured on 2026-11-10 at 1024 × 768, 1280 × 800, 1440 × 900, 1512 × 734 and
1920 × 1080: the sleeve has left the frame when solo ends. With the disc still, its distance from
the name's glyphs is the resting one through the whole pinned run (2026-11-11: 96, 71, 87, 31 and
129 px at those sizes; a fine pointer can bring it 5.6 px closer) and only grows while the credit
runs ahead on the exit. The split used to bring it down to 14 px at 1512 × 734.

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
  layers lean by depth × 1.4 rem: disc 0.25, sleeve 0.5, headphones 0.7, knob 1.
  The credit never moves with the pointer (reading comes first).
- **Hover** (fine pointers): the headphones and the knob lift (`scale` 1.035, −1.2°, the
  shadow falls further, `--dur-base`).
- **Weight on the GPU**: the cut-outs get `will-change` only inside the pinned-scene media query,
  like the disc and the sleeve; their shadows are static filters on their own boxes, never
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
- **Credits**: re-keyed per project, so the old text disappears at once and the new title rises
  line by line (`--dur-slow`, `--stagger`) with the rows fading up after it. Not on first load.
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
  is instant, no change-over on the credits, the arrow is simply there, the phone simply hangs
  there, and the hover loop appears whole and still.
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

- `HomePage` wraps every chapter in `.chapter-hold`. The wrapper ends in a `::after` spacer of
  `--chapter-hold` (60svh; a spacer, because sticky travels inside the content box, so padding
  does not count) and the chapter is `sticky; top: 0; min-height: 100svh`. When its top meets
  the viewport's it stays for 60svh of scroll, then leaves with the page. Taller chapters then
  read on normally; shorter ones fill the viewport while held, so nothing empty shows under them.
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

**The hold's job** (2026-11-10, after the critique: "scroll that does nothing", five times per
visit; Jorge chose to give it a job rather than shorten it). While a chapter holds, Jorge's
marker underlines what it is about: "seleccionados" (Projects), "producto real" (Proceso; "decisiones reales" until 2026-11-11),
"el problema que tienes" (Servicios), "mí" (Sobre mí), "en preparación" (Librería). So every
scroll inside a hold visibly does something, and the stroke is complete when the page moves on.

- `ChapterHold` (`components/ui/motion`) is the wrapper; its hook `useChapterHold` writes
  `--hold` on the held chapter: 0 when its top meets the viewport's (the snap point), 1 when the
  hold is used up. The hold's length is the wrapper's spacer (wrapper height minus chapter
  height), so where layout.css holds nothing it is 0 and nothing is written.
- `graphics/PenMark` draws with it: `stroke-dashoffset` from `--hold` (pathLength 1), a 320 ms
  ease-out smoothing keyboard and scrollbar jumps. At the snap point the stroke is not there
  yet, which leaves the snapped composition complete; unset (no JavaScript, reduced motion,
  short viewports, the hook not run yet) it is drawn.
- Cost: one passive scroll listener per held chapter, a frame at most per scroll event, only
  while the chapter is within a viewport of the screen (one read of the wrapper's box, then one
  custom-property write); a bounded decorative SVG stroke (AGENTS.md allows stroke drawing).
- Checked 2026-11-10 at 1512 × 734: `--hold` 0.000 at the snap point, 0.455 and 0.909 after two
  and four wheel ticks inside the Projects hold, 1 at its end, the stroke growing to match;
  every chapter's stroke complete at the end of its hold; drawn statically without JavaScript.

**Proceso's hold turns the playlist** (Jorge's request, 2026-11-11: "the scroll changes the
song and therefore the text"). The chapter's hold is 200svh (`.chapter-hold:has(> .process)` in
LinerNotes.css) instead of 60svh, and every song owns an equal share of it (40svh with five
songs; more songs would share the same length). Scrolling through it changes the song, the
selection bar slides to it and its credits change over; scrolling back runs the songs back.
Before the hold the first song plays, after it the last.

- `useChapterHold` sends its state to the chapter (`onHold`: progress, the hold's start and
  length, or `null` once it is not held), only when it changes. LinerNotes maps the progress to
  a song (`floor(progress × songs)`), with no change-over for the first state on load.
- Choosing a song (click, tap, arrows, Home, End) while held selects it at once and scrolls the
  page to the middle of its share (`scrollToOffset`), so the wheel and the playlist agree; the
  songs passed on the way are ignored until the page arrives, or for `motion.playlist.arriveMs`
  (1.5 s) if another scroll takes over, after which the scroll leads again. Focus on the
  playlist follows the song, so its one Tab stop is always the selected tab.
- The marker under "producto real" reads `--pen` (`min(1, --hold × 5)`, PenMark.css falls
  back to `--hold`): it is drawn in the first 40svh, while the heading is read.
- Not held (taller than the window, reduced motion, under 34rem of height, no JavaScript): no
  event, the songs are chosen on the playlist only.
- Cost: no new listener (the hold's own), one custom event per changed frame near the chapter,
  one React render per song change; the bar is a transform.
- Checked 2026-11-11 on the production build at 1512 × 734 (wheel ticks of 100 px): the songs
  change at `--hold` 0.2, 0.4, 0.6 and 0.8, about three ticks (294 px) a song, in both
  directions; the marker complete by 0.2; a click on song 4 at the hold's start shows it at
  once and lands at 0.700 with no other song shown on the way; ↓, End, Home and a wrapping ↓
  move selection, focus and page together; a click followed at once by the wheel hands over to
  the scroll after 1.5 s; the menu's Proceso link lands on the first song from Contact and from
  the hero. On a 390 × 844 phone emulation the five songs follow native scroll (hold 1,688 px).
  Reduced motion: no hold, a click selects. Without JavaScript the five steps are listed. No
  horizontal overflow at 320, 390, 768, 1024, 1280, 1440 and 1512 px in both themes; no console
  errors.

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
| `--dur-orbit` | 10 s | One turn of the pen loop round a hovered gallery disc (§2.2) |
| `--ease-out` | `cubic-bezier(0.19, 1, 0.22, 1)` | Default (expo out, already used by the rows) |
| `--ease-out-soft` | `cubic-bezier(0.25, 1, 0.5, 1)` | Reveals |
| `--ease-in-out` | `cubic-bezier(0.65, 0, 0.35, 1)` | Morphs |
| `--ease-press` | `cubic-bezier(0.2, 0, 0, 1)` | Button press |
| `--stagger` | 70 ms | Delay step inside a revealed group |

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
| Chapter hold | `src/components/ui/motion/ChapterHold.tsx`, `useChapterHold.ts` | The home chapter's hold wrapper; writes `--hold` (0 → 1 through the hold) on the chapter, sends the same state to it (`onHold`, Proceso's playlist) and marks the wrapper `data-unheld` when the chapter is taller than the window (§2.5). One passive listener, one `ResizeObserver`, one frame per scroll, nothing beyond a viewport away or under reduced motion. |
| Pen mark | `src/components/graphics/PenMark/PenMark.tsx` | A marker underline under one phrase, drawn by `--hold`; drawn outright where nothing sets it (§2.5). |
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
  `background-position` loops.
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
- Projects gallery: instant changes, no change-over, the arrow already drawn (§2.2).
- Header: turns compact at once, without the fade or the lift.
- Chapter marks: drawn and still (`--hold` is never written); Process's credits change without
  the change-over, and its songs are chosen on the playlist only (there is no hold to turn
  them); the selection bar jumps.
- Smooth scrolling, chapter snap, chapter hold and parallax: off (native scroll, plain flow,
  layers at rest).

The global rule in `src/design/base.css` is a backstop, not the mechanism: each primitive
checks the preference itself so no JavaScript loop keeps running behind a frozen CSS rule.

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
  `filter` or `box-shadow` on scroll.
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
