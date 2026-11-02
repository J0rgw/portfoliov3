/** Visual parameters only. Mechanics and lifecycle live in components/ui/motion. */
export const motion = {
  menu: { layer: 0.5, layerStagger: 0.07, panel: 0.65, label: 1, number: 0.6,
    reveal: 0.55, close: 0.32, spinOpen: 0.8, spinClose: 0.35,
    labelStagger: 0.1, numberStagger: 0.08, revealStagger: 0.05 },
  hero: { phases: { split: [0.06, 0.46], solo: [0.36, 0.8], exit: [0.8, 1] } },
  logoLoop: { speed: 60, height: 34, gap: 56 },
  heroImageSizes: '(orientation: portrait) 61vw, min(calc(52vh - 2.4rem), 31vw)',
  spinEaseMs: 160,
  reveal: { durationMs: 800, distance: '1.5rem' },
  float: { durationMs: 600, distance: '0.4rem' },
  drift: { durationMs: 800, distance: '0.75rem' },
  rotate: { durationMs: 600, angle: 4 },
  draw: { durationMs: 600 },
  slide: { durationMs: 320 },
  snap: { omega: 11 },
  hover: { durationMs: 180 },
  pageTransition: { durationMs: 1100 },
} as const;
