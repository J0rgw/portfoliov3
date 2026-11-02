import type { CSSProperties } from 'react';

/**
 * The path the discs travel (A24's arc, see ART_DIRECTION §5.2), as one
 * continuous function of `offset`: the disc's index minus the carousel
 * position. 0 is the selected disc, +1 the next, −1 the previous, and every
 * value in between while the row moves, so a drag interpolates the pose
 * instead of jumping between stops.
 *
 * Lengths are in the selected disc's diameter (`--d`, set by the stage in
 * CSS), so one path serves every screen; `--spread-x/-y` stretch it per
 * layout. The path is a curve on screen: the discs climb to the right and
 * the climb steepens at the right end (a gentle arc, not a straight
 * diagonal). Along it a disc shrinks as it leaves the selection and turns a
 * little further away; its gap to the next disc shrinks with it, so the row
 * packs together towards both ends, as in perspective.
 *
 * Every number that shapes the composition is here, named; nothing is set
 * per disc.
 */
export const TRACK = {
  /** Centre-to-centre distance next to the selection, in diameters (it then shrinks with the discs). */
  spacing: 0.92,
  /** Scale one step from the selection. Jorge's brief: both sides smaller (above 1, a side grows, as in A24). */
  scalePrev: 0.68,
  scaleNext: 0.68,
  /** Width of the scale's rounded peak, in steps: a disc passing the centre swells and eases off, never kinks. */
  peak: 0.55,
  /** The path's climb at the selection: diameters up per diameter right. */
  rise: 0.25,
  /** The arc: both ends lift by bend · x², so the right climbs faster and the left flattens. */
  bend: 0.07,
  /** How much of the path's change of direction a disc follows (0: none, 1: fully banked). */
  bank: 0.5,
  /** Extra turn away from the viewer, in degrees, approached far from the selection... */
  yaw: 17,
  /** ...reaching ~70 % of it this many steps away. */
  yawReach: 2,
  /** Rotation of the printed face per step travelled: the label turns as the disc rolls. */
  turn: 24,
  /** A disc further than the shown ones fades out over this many steps. */
  fade: 0.7,
} as const;

/**
 * How many discs stay fully shown on each side of the selection. A layout
 * decision, so CSS owns it (`--shown-prev`, `--shown-next` on the stage,
 * read by DiscGallery); this is the server's guess before any CSS is read.
 */
export interface Shown {
  prev: number;
  next: number;
}

export const SHOWN: Shown = { prev: 2, next: 2 };

export interface DiscPose {
  x: number;
  y: number;
  scale: number;
  /** Screen-plane rotation along the path (degrees). */
  bank: number;
  /** Extra turn about the vertical axis, on top of the shared lean (degrees). */
  yaw: number;
  /** Rotation of the printed face (degrees). */
  turn: number;
  opacity: number;
  z: number;
}

const DEG = 180 / Math.PI;

// scale(u) = (1 + a·u²)^(−c): smooth through the centre, 1 at the selection,
// TRACK.scale* one step away, then a slow, perspective-like falloff.
const a = 1 / TRACK.peak ** 2;
const exponent = (scaleAtOneStep: number) => -Math.log(scaleAtOneStep) / Math.log(1 + a);
const cPrev = exponent(TRACK.scalePrev);
const cNext = exponent(TRACK.scaleNext);

const scaleAt = (u: number) => (1 + a * u * u) ** -(u < 0 ? cPrev : cNext);

/** x(u) = spacing · ∫₀ᵘ scale: gaps shrink with the discs (Simpson, 16 slices). */
function along(u: number): number {
  if (u === 0) return 0;
  const slices = 16;
  const h = u / slices;
  let sum = scaleAt(0) + scaleAt(u);
  for (let k = 1; k < slices; k++) sum += scaleAt(k * h) * (k % 2 ? 4 : 2);
  return TRACK.spacing * (sum * h) / 3;
}

/** The path itself: height (down is positive) and direction at a given x. */
const heightAt = (x: number) => -TRACK.rise * x - TRACK.bend * x * x;
const angleAt = (x: number) => Math.atan(-TRACK.rise - 2 * TRACK.bend * x) * DEG;
const angleAtSelection = angleAt(0);

// Fully shown up to `shown` steps (plus a margin, so a disc mid-way is not
// already fading), gone `TRACK.fade` steps later.
const fade = (distance: number, shown: number) => {
  const from = shown + 0.2;
  return Math.min(1, Math.max(0, 1 - (distance - from) / TRACK.fade));
};

export function discPose(offset: number, shown: Shown = SHOWN): DiscPose {
  const x = along(offset);
  const distance = Math.abs(offset);
  return {
    x,
    y: heightAt(x),
    scale: scaleAt(offset),
    bank: TRACK.bank * (angleAt(x) - angleAtSelection),
    yaw: (-TRACK.yaw * offset) / Math.hypot(offset, TRACK.yawReach),
    turn: offset * TRACK.turn,
    opacity: fade(distance, offset < 0 ? shown.prev : shown.next),
    z: 100 - Math.round(distance * 10),
  };
}

const n = (value: number) => Number(value.toFixed(4));

// The bank turns the leaning disc on screen, so it comes before the lean;
// the shared lean then tips it back as if it lay on a tilted table.
export const discTransform = (pose: DiscPose): string =>
  `translate3d(calc(var(--d) * var(--spread-x) * ${n(pose.x)}), calc(var(--d) * var(--spread-y) * ${n(pose.y)}), 0) ` +
  `rotate(${n(pose.bank)}deg) rotateX(var(--tilt-x)) rotateY(calc(var(--tilt-y) + ${n(pose.yaw)}deg)) rotateZ(var(--tilt-z)) ` +
  `scale(${n(pose.scale)})`;

/** The resting style of a disc, as rendered on the server (no JavaScript yet). */
export const discStyle = (pose: DiscPose): CSSProperties => ({
  transform: discTransform(pose),
  opacity: n(pose.opacity),
  zIndex: pose.z,
  visibility: pose.opacity < 0.01 ? 'hidden' : undefined,
});
