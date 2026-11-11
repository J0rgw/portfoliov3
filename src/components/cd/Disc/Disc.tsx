import { assets } from '../../../config/assets';
import { useId, type CSSProperties, type ReactNode } from 'react';
import '../../../design/components/Disc/Disc.css';

/** A turn from the disc's name: the same disc wears the same scratches on every page. */
const turnOf = (name: string) => [...name].reduce((hash, char) => (hash * 31 + char.charCodeAt(0)) >>> 0, 7) % 360;

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
 * The compact disc (DESIGN.md "Materials").
 *
 * Pressed discs are printed singles with a photographic finish: the clear hub and
 * the rim are the real plastic of Jorge's hero disc (public/images/disc/shell.webp),
 * so the print runs from 19.5 % to 96.5 % of the radius, as on that disc; real
 * scratches from the broken disc (wear.webp) and print grain lie on the label. The
 * label and its wear turn with `--disc-rotate`; the hub, the rim and the lamp's
 * reflection stay still, as they do under a lamp.
 *
 * The CD-R is drawn with CSS: hole 12.5 %, clear stacking ring to 28 %, silver face
 * to 97 %. Always decorative: the content a disc stands for is real text elsewhere.
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

  const pressed = variant === 'pressed';
  const finish = pressed ? ({ '--wear-turn': `${turnOf(transitionName ?? '')}deg` } as CSSProperties) : {};

  // Spans only: a disc may sit inside links and paragraphs (phrasing content).
  return (
    <span
      className={`disc disc--${variant} ${className}`.trim()}
      style={{ ...style, ...finish, ...(ink ? { color: ink } : {}), ...(transitionName ? { viewTransitionName: transitionName } : {}) }}
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
          {pressed && (
            <>
              <span className="disc__grain" />
              <img className="disc__wear" src={assets.disc.wear} width={640} height={640} alt="" loading="lazy" decoding="async" draggable={false} />
            </>
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
      {pressed ? (
        <img className="disc__shell" src={assets.disc.shell} width={512} height={512} alt="" loading="lazy" decoding="async" draggable={false} />
      ) : (
        <>
          <span className="disc__hub" />
          <span className="disc__edge" />
        </>
      )}
    </span>
  );
}

export default Disc;
