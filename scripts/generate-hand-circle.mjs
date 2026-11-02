#!/usr/bin/env node
/**
 * Prints the path of HandCircle (src/components/HandCircle): one pen loop
 * round a disc in a 200-unit box centred on 100,100, where the disc's rim is
 * at radius 83.3 (the box is 1.2 discs).
 *
 * About one and a half turns; the radius wobbles at low frequencies (a hand,
 * not noise), drifts outward so the second pass runs outside the first, hooks
 * in where the pen lands and flicks out at the tail; the loop is a little oval
 * and tipped. No randomness: the same path on every run.
 *
 * Not part of the build. Paste the output into LOOP in HandCircle.tsx:
 *     node scripts/generate-hand-circle.mjs
 */
const TURNS = 1.5;
const START = 118; // degrees, clockwise on screen (y down)
const RIM = 1000 / 12; // the disc's radius in the box

const points = [];
const steps = Math.round(TURNS * 24);
for (let i = 0; i <= steps; i++) {
  const t = i / steps;
  const angle = ((START + t * TURNS * 360) * Math.PI) / 180;
  let r = 96 + 8 * t + 2.6 * Math.sin(2 * angle + 0.7) + 1.6 * Math.sin(3 * angle + 2.1) + 0.6 * Math.sin(5 * angle + 0.3);
  if (t < 0.07) r -= 3.5 * (1 - t / 0.07) ** 2; // the pen lands
  if (t > 0.88) r += 7 * ((t - 0.88) / 0.12) ** 2; // the tail flicks out
  let x = r * Math.cos(angle) * 1.01;
  let y = r * Math.sin(angle) * 0.955;
  const tip = (-14 * Math.PI) / 180;
  [x, y] = [x * Math.cos(tip) - y * Math.sin(tip), x * Math.sin(tip) + y * Math.cos(tip)];
  points.push([100 + x, 100 + y]);
}

// Catmull-Rom through the points, as cubic Béziers.
const f = (v) => (Math.round(v * 10) / 10).toString();
let d = `M${f(points[0][0])} ${f(points[0][1])}`;
for (let i = 0; i < points.length - 1; i++) {
  const p0 = points[Math.max(0, i - 1)];
  const [p1, p2] = [points[i], points[i + 1]];
  const p3 = points[Math.min(points.length - 1, i + 2)];
  const c1 = [p1[0] + (p2[0] - p0[0]) / 6, p1[1] + (p2[1] - p0[1]) / 6];
  const c2 = [p2[0] - (p3[0] - p1[0]) / 6, p2[1] - (p3[1] - p1[1]) / 6];
  d += `C${f(c1[0])} ${f(c1[1])} ${f(c2[0])} ${f(c2[1])} ${f(p2[0])} ${f(p2[1])}`;
}

const radii = points.map(([x, y]) => Math.hypot(x - 100, y - 100));
console.log(d);
console.error(
  `clearance from the rim: ${((Math.min(...radii) / RIM - 1) * 100).toFixed(1)}–${((Math.max(...radii) / RIM - 1) * 100).toFixed(1)} % of the radius`,
);
