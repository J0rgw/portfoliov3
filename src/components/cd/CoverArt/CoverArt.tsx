import { packaging } from '../../../config/packaging';
import { cutouts } from '../../../config/assets';
import type { ProjectAssets } from '../../../config/types';
import { site } from '../../../config/site';
import { useId, type ReactNode } from 'react';
import type { CoverMotif, ProjectCover } from '../../../design/themes/covers';
import '../../../design/components/CoverArt/CoverArt.css';

interface CoverArtProps {
  cover: ProjectCover;
  assets?: ProjectAssets;
  title: string;
  /** Printed at the sleeve's foot; a case study passes none (2026-11-11: no numbers on its page). */
  track?: string;
  catalog: string;
  /** `disc` keeps text clear of the hub and the cut corners. */
  shape?: 'sleeve' | 'disc';
  /** The disc carries rim credits: leave the rim band (the track number) clear. */
  rim?: boolean;
  /** How wide the art is shown, as a CSS length: the label cut-outs pick their files from it. */
  artSize?: string;
  /** Label cut-outs below the fold wait (default); a cover in the first viewport does not. */
  loading?: 'lazy' | 'eager';
  className?: string;
}

/*
 * Printed art, one per release (DESIGN.md "Composition"), drawn on a 400×400 grid.
 * A release with label cut-outs (config `assets.label`) is printed like the hero
 * disc: a field, the title, and Jorge's photographed cut-outs in the cover theme's
 * slots (design/themes/covers.ts), in front of the title. Otherwise a generated
 * motif stands in. On a disc the centre (r < 39) is the clear hub and the corners
 * are cut, so titles sit in the top band and the rest in the lower one.
 */

const PIXEL_GLYPHS: Record<string, string[]> = {
  '2': ['111', '001', '111', '100', '111'],
  '+': ['000', '010', '111', '010', '000'],
  '3': ['111', '001', '111', '001', '111'],
  '=': ['000', '111', '000', '111', '000'],
  '?': ['111', '001', '011', '000', '010'],
};

function PixelEquation({ color, x, y, size }: { color: string; x: number; y: number; size: number }) {
  const cells: ReactNode[] = [];
  '2+3=?'.split('').forEach((glyph, gi) => {
    PIXEL_GLYPHS[glyph].forEach((row, ry) => {
      row.split('').forEach((bit, rx) => {
        if (bit !== '1') return;
        cells.push(
          <rect
            key={`${gi}-${rx}-${ry}`}
            x={x + gi * size * 4 + rx * size}
            y={y + ry * size}
            width={size}
            height={size}
            style={{ fill: color }}
          />,
        );
      });
    });
  });
  return <g>{cells}</g>;
}

function Motif({ motif, ink, detail = ink, field, clipId }: { motif: CoverMotif; ink: string; detail?: string; field: string; clipId: string }) {
  switch (motif) {
    case 'ring': {
      // Donut chart from the app's panel. Its empty centre is the disc's hub.
      const r = 150;
      const circumference = 2 * Math.PI * r;
      return (
        <g>
          <circle cx="200" cy="200" r={r} fill="none" style={{ stroke: 'var(--print-shade)' }} strokeWidth="34" />
          <circle
            cx="200"
            cy="200"
            r={r}
            fill="none"
            style={{ stroke: detail }}
            strokeWidth="34"
            strokeLinecap="round"
            strokeDasharray={`${circumference * 0.45} ${circumference}`}
            transform="rotate(-90 200 200)"
          />
        </g>
      );
    }
    case 'pipeline': {
      const nodes = [
        { x: 92, y: 262, label: packaging.pipeline[0] },
        { x: 168, y: 300, label: packaging.pipeline[1] },
        { x: 244, y: 266, label: packaging.pipeline[2] },
        { x: 308, y: 312, label: packaging.pipeline[3] },
      ];
      // Dot grid as one pattern tile instead of 169 circles (lighter HTML).
      return (
        <g>
          <defs>
            <pattern id={`${clipId}-dots`} x="5" y="5" width="30" height="30" patternUnits="userSpaceOnUse">
              <circle cx="15" cy="15" r="1.8" style={{ fill: detail }} opacity="0.35" />
            </pattern>
          </defs>
          <rect width="400" height="400" fill={`url(#${clipId}-dots)`} />
          <polyline
            points={nodes.map((n) => `${n.x},${n.y}`).join(' ')}
            fill="none"
            style={{ stroke: detail }}
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {nodes.map((n, i) => (
            <g key={n.label}>
              {i === nodes.length - 1 ? (
                <rect x={n.x - 13} y={n.y - 13} width="26" height="26" style={{ fill: ink }} />
              ) : (
                <circle cx={n.x} cy={n.y} r="10" style={{ fill: field, stroke: ink }} strokeWidth="3" />
              )}
            </g>
          ))}
        </g>
      );
    }
    case 'pixel': {
      const tiles: ReactNode[] = [];
      for (let i = 0; i < 20; i++) {
        tiles.push(<rect key={i} x={i * 20} y="378" width="18" height="22" style={{ fill: detail }} opacity={i % 3 === 0 ? 0.22 : 0.12} />);
      }
      return (
        <g>
          {tiles}
          <PixelEquation color={ink} x={86} y={262} size={12} />
        </g>
      );
    }
    case 'disco': {
      // The shade function repeats every 5 facets, so one 5×5 tile covers the ball.
      const facets: ReactNode[] = [];
      for (let fx = 0; fx < 5; fx++) {
        for (let fy = 0; fy < 5; fy++) {
          const shade = (fx * 7 + fy * 13) % 5;
          facets.push(
            <rect
              key={`${fx}-${fy}`}
              x={fx * 13}
              y={fy * 13}
              width="12"
              height="12"
              style={{ fill: detail }}
              opacity={[0.95, 0.55, 0.75, 0.35, 0.85][shade]}
            />,
          );
        }
      }
      const bars = [34, 58, 44, 72, 52, 28];
      return (
        <g>
          <defs>
            <clipPath id={clipId}>
              <circle cx="300" cy="290" r="64" />
            </clipPath>
          </defs>
          <defs>
            <pattern id={`${clipId}-facets`} x="228" y="218" width="65" height="65" patternUnits="userSpaceOnUse">
              {facets}
            </pattern>
          </defs>
          <circle cx="300" cy="290" r="66" style={{ fill: ink }} />
          <rect x="228" y="218" width="143" height="143" fill={`url(#${clipId}-facets)`} clipPath={`url(#${clipId})`} />
          <line x1="300" y1="200" x2="300" y2="224" style={{ stroke: ink }} strokeWidth="3" />
          {bars.map((h, i) => (
            <rect key={i} x={74 + i * 18} y={334 - h} width="11" height={h} style={{ fill: ink }} />
          ))}
        </g>
      );
    }
    case 'terminal':
      return (
        <g>
          <rect x="80" y="262" width="240" height="82" rx="8" style={{ fill: 'var(--print-dark)', stroke: ink }} strokeOpacity="0.4" />
          <circle cx="96" cy="276" r="4" style={{ fill: 'var(--print-silver)' }} />
          <circle cx="110" cy="276" r="4" style={{ fill: 'var(--print-light)' }} />
          <circle cx="124" cy="276" r="4" style={{ fill: detail }} />
          <text x="94" y="306" className="cover__mono" style={{ fill: detail }} fontSize="14">
            $ gitchange trabajo
          </text>
          {/* On the window's dark ground, not the cover's ink. */}
          <text x="94" y="328" className="cover__mono" style={{ fill: 'var(--print-light)' }} fontSize="12" opacity="0.85">
            ✓ perfil aplicado
          </text>
        </g>
      );
    case 'screen':
      return (
        <g>
          <rect x="80" y="262" width="240" height="84" style={{ fill: 'var(--print-light)', stroke: ink }} strokeWidth="2" />
          <line x1="80" y1="276" x2="320" y2="276" style={{ stroke: ink }} strokeWidth="2" />
          <circle cx="90" cy="269" r="2.5" style={{ fill: ink }} />
          <circle cx="99" cy="269" r="2.5" style={{ fill: ink }} />
          <text x="200" y="312" textAnchor="middle" className="cover__title" style={{ fill: ink }} fontSize="22">
            Jorge Arcas
          </text>
          <rect x="160" y="321" width="80" height="14" rx="7" style={{ fill: ink }} />
          <rect x="166" y="326" width="68" height="4" rx="2" style={{ fill: 'var(--print-light)' }} opacity="0.7" />
          <path d="M 40 140 C 120 90, 280 190, 360 120" fill="none" style={{ stroke: detail }} strokeWidth="3" opacity="0.5" />
        </g>
      );
    case 'private':
      return (
        <g>
          {[0, 1, 2].map((i) => (
            <line key={i} x1="70" x2="330" y1={300 + i * 22} y2={300 + i * 22} style={{ stroke: ink }} strokeOpacity="0.28" strokeWidth="1.5" />
          ))}
        </g>
      );
    default:
      return null;
  }
}

export function CoverArt({
  cover,
  assets,
  title,
  track,
  catalog,
  shape = 'sleeve',
  rim = false,
  artSize = '26rem',
  loading = 'lazy',
  className = '',
}: CoverArtProps) {
  const clipId = `cover-clip-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const artwork = shape === 'disc' ? assets?.disc ?? assets?.sleeve : assets?.sleeve ?? assets?.disc;
  const words = title.toUpperCase().split(' ');
  const showTitle = cover.motif !== 'private';
  const titleSize = words.some((word) => word.length > 9) ? 28 : 32;
  // Two words stack on two lines in the top band; one word sits lower.
  const titleY = words.length > 1 ? 96 : 120;
  // Cut-outs the theme has a slot for; none means the generated motif.
  const label = (assets?.label ?? []).slice(0, cover.label?.length ?? 0);
  const slots = cover.label ?? [];
  const collage = label.length > 0;

  if (artwork) return <img className={`cover cover--${shape} ${className}`.trim()}
    src={artwork.src} width={artwork.width} height={artwork.height} alt="" aria-hidden="true" loading="lazy" decoding="async" />;

  const print = (
    <svg
      className={collage ? 'cover__print' : `cover cover--${shape} ${className}`.trim()}
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="400" height="400" style={{ fill: cover.field }} />
      {!collage && <Motif motif={cover.motif} ink={cover.ink} detail={cover.detail} field={cover.field} clipId={clipId} />}
      {showTitle && (
        <text className="cover__title" textAnchor="middle" style={{ fill: cover.ink }} fontSize={titleSize}>
          {words.map((word, i) => (
            <tspan key={word + i} x="200" y={titleY + i * titleSize * 0.98}>
              {word}
            </tspan>
          ))}
        </text>
      )}
      {/* A printed single carries no number on its disc: only the sleeve does. */}
      {track && !rim && !(collage && shape === 'disc') && (
        <text x="200" y="378" textAnchor="middle" className="cover__mono" style={{ fill: cover.ink }} fontSize="12" opacity="0.8">
          {track}
        </text>
      )}
      {shape === 'sleeve' && (
        <>
          <text x="376" y="34" textAnchor="end" className="cover__mono" style={{ fill: cover.ink }} fontSize="12" opacity="0.75">
            {catalog}
          </text>
          <text x="24" y="34" className="cover__mono" style={{ fill: cover.ink }} fontSize="12" opacity="0.75">
            {site.name.toUpperCase()}
          </text>
        </>
      )}
    </svg>
  );

  if (!collage) return print;

  return (
    <span className={`cover cover--${shape} cover--collage ${className}`.trim()} aria-hidden="true">
      {print}
      {label.map((id, i) => {
        const cut = cutouts[id];
        const slot = slots[i];
        return (
          <img
            key={id}
            className={`cover__cut${cut.pixel ? ' cover__cut--pixel' : ''}`}
            src={cut.src}
            srcSet={cut.srcSet}
            sizes={`calc(${(slot.w / 400).toFixed(3)} * ${artSize})`}
            width={cut.width}
            height={cut.height}
            alt=""
            loading={loading}
            decoding="async"
            draggable={false}
            style={{
              left: `${slot.x / 4}%`,
              top: `${slot.y / 4}%`,
              width: `${slot.w / 4}%`,
              rotate: `${slot.r ?? 0}deg`,
            }}
          />
        );
      })}
    </span>
  );
}

export default CoverArt;
