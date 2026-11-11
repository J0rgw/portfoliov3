/** Visual parameters only. Mechanics and lifecycle live in components/ui/motion. */
export const motion = {
  menu: { layer: 0.5, layerStagger: 0.07, panel: 0.65, label: 1,
    close: 0.32, spinOpen: 0.8, spinClose: 0.35, labelStagger: 0.1 },
  /** Hero scene (MOTION_SYSTEM §2.1): split and solo overlap so the movement never stalls. */
  hero: { phases: { split: [0.06, 0.46], solo: [0.36, 0.8], exit: [0.8, 1] } },
  /** Cut-outs lean towards a fine pointer by their depth (usePointerDepth, §4):
   *  share of the remaining distance eased per frame. */
  pointerDepth: { ease: 0.08 },
  /** The sleeve's width (Hero.css --w) and the arm's (--arm, 1.853 sleeves), for `sizes`. */
  heroImageSizes: '(orientation: portrait) 64vw, min(50vh, 29vw)',
  heroArmSizes: '(orientation: portrait) 118vw, min(92vh, 54vw)',
  /** The disc's diameter (Hero.css --d). */
  heroDiscSizes: '(orientation: portrait) 86vw, min(62vh, 34vw)',
  spinEaseMs: 160,
  reveal: { durationMs: 800, distance: '1.5rem' },
  float: { durationMs: 600, distance: '0.4rem' },
  drift: { durationMs: 800, distance: '0.75rem' },
  rotate: { durationMs: 600, angle: 4 },
  draw: { durationMs: 600 },
  slide: { durationMs: 320 },
  snap: { omega: 11 },
  /** Page scroll (MOTION_SYSTEM §2.3): Lenis easing, chapter snap on the home page. */
  smoothScroll: { lerp: 0.1, snap: { threshold: '25%', debounceMs: 400, duration: 0.8 } },
  /** Proceso's playlist (MOTION_SYSTEM §2.5): how long a song chosen on the iPod
   *  keeps the selection while the page scrolls to it, if it never arrives. */
  playlist: { arriveMs: 1500 },
  hover: { durationMs: 180 },
  pageTransition: { durationMs: 1100 },
} as const;
