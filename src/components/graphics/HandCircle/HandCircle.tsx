import '../../../design/components/HandCircle/HandCircle.css';

/**
 * One pen loop drawn round a round object: about one and a half turns,
 * slightly oval and tipped, uneven, the second pass drifting outside the
 * first and the tail flicking out (A24's hover scribble, references.md #2).
 * Part of the handwriting layer (ART_DIRECTION §5): always decorative.
 *
 * Geometry only. Lay it over the object with the object's centre at the
 * box's centre and the box 1.2 times the object's diameter: the loop then
 * clears the rim by 5–27 % of the radius. The path has `pathLength="1"`, so
 * the consumer draws it with `stroke-dashoffset` (1 → 0) and turns it with
 * `rotate`; this component sets no motion of its own. The stroke is
 * `currentColor`.
 *
 * Drawn by a seeded generator (low-frequency wobble on a spiral, landing
 * hook, tail flick), not traced from A24's artwork.
 */
const LOOP =
  'M76.7 184.7C72.9 183.7 60.9 181.6 53.5 178.6C46.2 175.5 38.9 171.3 32.7 166.3C26.5 161.3 21 155 16.5 148.4C12 141.9 8.5 134.4 5.9 126.8C3.3 119.2 1.6 111 1 102.9C0.4 94.8 0.6 86.2 2.3 78C4 69.8 6.9 61.3 11.1 53.9C15.4 46.6 21.4 39.5 27.9 33.9C34.4 28.2 42.4 23.7 50.2 20.1C58 16.5 66.5 14.2 74.7 12.4C82.9 10.7 91.3 9.7 99.6 9.5C107.8 9.3 116.3 9.7 124.4 11.2C132.5 12.7 140.7 15.1 148.2 18.4C155.8 21.8 163.2 26.2 169.7 31.3C176.2 36.5 182.4 42.5 187.4 49.3C192.4 56 196.9 63.7 199.7 71.6C202.4 79.6 204.1 88.5 204 96.9C204 105.4 202.2 114.3 199.5 122.4C196.8 130.5 192.4 138.3 187.7 145.5C183 152.6 177.4 159.3 171.2 165.3C165.1 171.4 158.2 177 150.8 181.5C143.3 186 135.1 189.9 126.7 192.3C118.3 194.7 109.2 196 100.5 196.1C91.8 196.2 82.9 195 74.5 193C66.1 191 57.8 187.9 50.2 184.1C42.6 180.3 35.2 175.6 28.8 170.1C22.4 164.6 16.6 158.1 11.9 151.1C7.2 144.2 3.4 136.3 0.7 128.3C-2 120.3 -3.8 111.6 -4.4 103.1C-5 94.5 -4.7 85.4 -2.9 76.8C-1.1 68.2 2 59.3 6.5 51.5C11 43.8 17.3 36.4 24.1 30.3C30.9 24.3 39.1 19.3 47.2 15.2C55.3 11.1 64 8.2 72.8 5.7C81.5 3.2 90.4 1.4 99.5 0.4C108.6 -0.6 122.9 -0.2 127.5 -0.3';

interface HandCircleProps {
  className?: string;
}

export function HandCircle({ className = '' }: HandCircleProps) {
  return (
    <svg className={`hand-circle ${className}`.trim()} viewBox="0 0 200 200" aria-hidden="true" focusable="false">
      <path className="hand-circle__stroke" pathLength={1} d={LOOP} />
    </svg>
  );
}

export default HandCircle;
