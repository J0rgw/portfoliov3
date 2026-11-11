import type { CSSProperties } from 'react';
import { cutouts } from '../../../config/assets';
import type { CutoutId } from '../../../config/types';
import { ThemeImage } from '../ThemeImage/ThemeImage';
import '../../../design/components/Cutout/Cutout.css';

interface CutoutProps {
  id: CutoutId;
  /** The width it is shown at, as an <img> `sizes` value: picks the 1× or 2× file. */
  sizes: string;
  className?: string;
  /** How it lies: on the page (`paper`, contact and cast shadow), stuck flat on a
   *  surface (`sticker`, contact only) or drawn on it (`ink`, no shadow). */
  lay?: 'paper' | 'sticker' | 'ink';
  /** Entrance (design/motion.css): slapped down, drawn in (ink), or dropped in on a cord. */
  gesture?: 'slap' | 'draw-loop' | 'hang';
  /** Place in a staggered set of entrances. */
  index?: number;
  /** Seen from the back of the page: the photo flipped left to right. */
  mirror?: boolean;
  /** Lifts a little under a fine pointer, as if picked at by a fingernail. */
  handled?: boolean;
  loading?: 'lazy' | 'eager';
  fetchPriority?: 'high' | 'low' | 'auto';
  style?: CSSProperties;
}

/**
 * One of Jorge's photographed cut-outs (DESIGN.md "Graphics and assets"): the keyed
 * original, never redrawn, in its own colours; only the scribble, which is ink, has a
 * dark-theme file. Always decorative (`alt=""`, `aria-hidden`).
 *
 * Three boxes, so no two motions fight over one transform: the outer one is placed and
 * moved by its section (scroll scene, pointer depth), the middle one casts the shadow
 * (lit from the top left even when the photo is mirrored), the image takes the mirror,
 * the entrance and the hover lift.
 */
export function Cutout({
  id,
  sizes,
  className = '',
  lay = 'paper',
  gesture,
  index = 0,
  mirror = false,
  handled = false,
  loading = 'lazy',
  fetchPriority,
  style,
}: CutoutProps) {
  const cut = cutouts[id];
  const imageClass = ['cutout__img', mirror && 'cutout__img--mirror', cut.pixel && 'cutout__img--pixel'].filter(Boolean).join(' ');

  return (
    <span
      className={`cutout cutout--${lay}${handled ? ' cutout--handled' : ''} ${className}`.trim()}
      style={style}
      aria-hidden="true"
    >
      <span className="cutout__lay">
        <ThemeImage
          className={imageClass}
          data-gesture={gesture}
          style={{ '--slap-index': index } as CSSProperties}
          dark={cut.dark}
          src={cut.src}
          srcSet={cut.srcSet}
          sizes={sizes}
          width={cut.width}
          height={cut.height}
          alt=""
          loading={loading}
          fetchPriority={fetchPriority}
          decoding="async"
          draggable={false}
        />
      </span>
    </span>
  );
}

export default Cutout;
