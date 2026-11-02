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
- Liner notes: the active step updates the sticky page counter.
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
package apart: the hand pulls the sleeve off the disc, the disc takes the centre, then it leaves.
A spatial change tied to scroll progress and reversible, not a scale or fade. **Priority: the
first frame and the disc's legibility over spectacle.**

**Disc turn.** One turn per `--dur-spin` (75 s, the brief allows 60–90 s), clockwise, starting
upright, linear, no motion blur. It lives on its own element (`.hero__disc-spin`), apart from
the scroll transforms on its parent. It eases to a stop (≈0.6 s, `playbackRate`, never a jump)
while a mouse or pen rests on the disc and eases back on leave; a tap or click on the disc holds
it still until the next one (touch has no hover); it pauses while off-screen. Keyboards get a
**Pausar / Reanudar giro del disco** button that stays out of sight until it has focus (the brief
asked for no permanent button; WCAG 2.2.2 still needs a mechanism, as the turn lasts more than
5 s beside other content). It only runs with JavaScript, because the pause needs it.

**Taking the package apart** (narrative fractions; `--scene-split`, `--scene-solo`,
`--scene-exit`, eased with smoothstep; split and solo overlap so the movement never stalls):

| Narrative | Phase | Disc | Sleeve, with the hand holding it |
|-----------|-------|------|----------------------------------|
| 0–6 % | Rest | 80 % visible behind the sleeve, print upright | In its film, tilted 3.5°, held by its right edge |
| 6–46 % | Split | Slides out of the sleeve, −6 % `--d` x, −3 % y (portrait: up only, it already touches the left edge) | Pulled along the forearm, +14 % / +16 % `--d`, turns to 6.5° |
| 36–80 % | Solo | To the centre of the frame (portrait: 12 % `--d` lower, clear of the credit), 106 %, still turning | On out of the frame the way the arm goes (+50 % / +80 % `--d` more), 10.5° |
| 80–100 % | Exit | Lifts 24 % `--d` faster than the page, down to 96 % | Already gone |

The sleeve only ever moves down and outwards, so the frame's bottom edge keeps hiding the end of
the forearm. The credit does not move; the disc's path stays clear of it at every measured size.

- **JavaScript, motion allowed and a viewport at least 34 rem tall:** the hero grows by
  `--scene-run` (100 svh; 80 svh below 768 px) and the whole frame is sticky at the top of the
  viewport, under the transparent header.
  The narrative runs 0 → 80 % while it is stuck and 80 → 100 % while it scrolls out, so it never
  ends on an empty viewport. Native scroll only: no wheel capture, no snapping, anchors and
  keyboard scrolling behave as usual.
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
- **Reduced motion**: drag still follows the pointer (direct manipulation); every other change
  is instant, no change-over on the credits, the arrow is simply there, and the hover loop
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
| Spin | `src/components/ui/motion/useSpin.ts` | Drives a CSS keyframe loop: pauses it off-screen, eases `playbackRate` to 0 on mouse/pen hover and back, holds it while a `paused` flag is set. Does nothing under reduced motion (the CSS declares no loop). |
| Disc carousel | `src/components/ui/motion/useDiscCarousel.ts` | Drag with inertia and snapping for a row of items (§2.2): one position, one selection, a stable controller (`goTo`, `step`, `index`), `render(position)` at most once per frame, `onIndex` / `onMotion` callbacks for React. No loop while idle; instant under reduced motion. |
| Scroll spy | `src/components/ui/motion/useScrollSpy.ts` | Returns the id of the section currently being read. |
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
- View-transition morphs: off (instant navigation).
- Menu: opens and closes instantly, focus behaviour unchanged. (The global backstop gives every
  element a 0.01 ms transition, so inherited `visibility` reaches the panel's links a few frames
  late; the menu retries `focus()` each frame until it lands.)
- Projects gallery: instant changes, no change-over, the arrow already drawn (§2.2).
- Logo loop: stopped, and its animation loop does not run.
- Smooth scrolling: off.

The global rule in `src/design/base.css` is a backstop, not the mechanism: each primitive
checks the preference itself so no JavaScript loop keeps running behind a frozen CSS rule.

---

## 6. Performance rules

- No Three.js or WebGL. The previous full-screen shader (`ColorBends`) rendered every frame, even
  off-screen; removing it with Three.js took the bundle from 228 kB to 124 kB gzip, and loading
  GSAP on demand brought the initial JavaScript to 96.7 kB gzip (measured 2026-10-26).
- No uncontrolled perpetual animation. Anything that loops (the logo loop) runs only while visible and in
  view; the Projects gallery runs a frame loop only while its row is moving. The hero disc's turn (§2.1) is a CSS `rotate` animation on its
  own compositor layer (`will-change: rotate`), so it costs no main-thread work; it still pauses
  off-screen and can be paused by the visitor.
- Animate `transform` and `opacity` only. Never animate `width`, `height`, `top`, `left`,
  `filter` or `box-shadow` on scroll.
- New animation libraries require a measured reason. GSAP is reserved for the menu and is never
  imported statically: use `loadGsap()`. Everything else is CSS or the primitives above (the
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
