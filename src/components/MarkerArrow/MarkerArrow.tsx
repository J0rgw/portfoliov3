import './MarkerArrow.css';

interface MarkerArrowProps {
  /** Where the head points. The original points up and to the right; up-left mirrors it. */
  direction?: 'up-right' | 'up-left';
  className?: string;
}

/** Jorge's arrow, keyed out of its checkerboard by scripts/extract-marker-arrow.py. */
const SRC = '/images/gallery/marker-arrow.webp';

/**
 * Jorge's blue marker arrow: the original image, not a redrawing. A sweep,
 * one loop and the head, translucent ink that deepens where the stroke
 * crosses itself, so it belongs on bare paper, never over an object. Part of
 * the handwriting layer (ART_DIRECTION §5): always decorative (`alt=""`).
 *
 * It behaves like a cut-out laid on the page: it settles into place when it
 * mounts (remount it with a new `key` to place it again). Reduced motion: it
 * is simply there. No border, shadow or filter touches the stroke; mirroring
 * is the only change to the artwork.
 */
export function MarkerArrow({ direction = 'up-right', className = '' }: MarkerArrowProps) {
  return (
    <img
      className={`marker-arrow marker-arrow--${direction} ${className}`.trim()}
      src={SRC}
      width={370}
      height={236}
      alt=""
      loading="lazy"
      decoding="async"
      draggable={false}
    />
  );
}

export default MarkerArrow;
