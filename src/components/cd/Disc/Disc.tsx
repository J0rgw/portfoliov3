import { useId, type CSSProperties, type ReactNode } from 'react';
import '../../../design/components/Disc/Disc.css';

interface DiscProps {
  /** `cdr`: silver CD-R with a marker label. `pressed`: printed cover art. */
  variant?: 'cdr' | 'pressed';
  /** Printed art on the label side (pressed discs). */
  children?: ReactNode;
  /** Credits set along the rim. Repeated to fill the circle. */
  rimText?: string;
  /** Marker handwriting across a CD-R label. Estrella: letters only. */
  handwriting?: string;
  /** Small print on a CD-R label. */
  print?: { brand: string; spec: string; catalog: string };
  /** Colour of the rim credits; pressed discs pass their cover's ink. */
  ink?: string;
  /** Cross-document view-transition name (index → detail morph). */
  transitionName?: string;
  className?: string;
  style?: CSSProperties;
}

/**
 * The compact disc, drawn with CSS and SVG (ART_DIRECTION §5).
 *
 * Anatomy, as fractions of the radius: centre hole 12.5 %, clear stacking ring
 * to 28 %, printed face to 97 %, clear outer rim. The face and the rim text
 * turn with `--disc-rotate`; the iridescent reflection stays still, as it does
 * under a lamp. Always decorative: the content it stands for is real text
 * elsewhere on the page.
 */
export function Disc({
  variant = 'pressed',
  children,
  rimText,
  handwriting,
  print,
  ink,
  transitionName,
  className = '',
  style,
}: DiscProps) {
  const pathId = `disc-rim-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  // ~124 mono characters fill the 2720-unit circumference at the rim font
  // size; repeat the credits to roughly that, textLength absorbs the rest.
  // Drawn on a 1000-unit grid so the computed font size stays legible-sized.
  const unit = rimText ? `${rimText} · ` : '';
  const rim = unit ? unit.repeat(Math.max(1, Math.round(124 / unit.length))) : '';

  // Spans only: a disc may sit inside links and paragraphs (phrasing content).
  return (
    <span
      className={`disc disc--${variant} ${className}`.trim()}
      style={{ ...style, ...(ink ? { color: ink } : {}), ...(transitionName ? { viewTransitionName: transitionName } : {}) }}
      aria-hidden="true"
    >
      <span className="disc__shadow" />
      <span className="disc__spin">
        <span className="disc__face">
          {variant === 'cdr' ? (
            <span className="disc__cdr">
              {print && (
                <>
                  <span className="disc__cdr-brand">{print.brand}</span>
                  <span className="disc__cdr-spec">{print.spec}</span>
                </>
              )}
              <span className="disc__cdr-lines" />
              {handwriting && <span className="disc__cdr-hand">{handwriting}</span>}
              {print && <span className="disc__cdr-catalog">{print.catalog}</span>}
            </span>
          ) : (
            children
          )}
        </span>
        {rim && (
          <svg className="disc__rim" viewBox="0 0 1000 1000" focusable="false">
            <defs>
              <path id={pathId} d="M 500,500 m -435,0 a 435,435 0 1,1 870,0 a 435,435 0 1,1 -870,0" />
            </defs>
            <text>
              <textPath href={`#${pathId}`} textLength="2720" lengthAdjust="spacing">
                {rim}
              </textPath>
            </text>
          </svg>
        )}
      </span>
      <span className="disc__sheen" />
      <span className="disc__hub" />
      <span className="disc__edge" />
    </span>
  );
}

export default Disc;
