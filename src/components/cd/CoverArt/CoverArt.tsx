import { packaging } from '../../../config/packaging';
import type { ProjectAssets } from '../../../config/types';
import { site } from '../../../config/site';
import { useId, type ReactNode } from 'react';
import type { CoverMotif, ProjectCover } from '../../../design/themes/covers';
import '../../../design/components/CoverArt/CoverArt.css';

interface CoverArtProps {
  cover: ProjectCover;
  assets?: ProjectAssets;
  title: string;
  track: string;
  catalog: string;
  /** `disc` keeps text clear of the hub and the cut corners. */
  shape?: 'sleeve' | 'disc';
  /** The disc carries rim credits: leave the rim band (the track number) clear. */
  rim?: boolean;
  className?: string;
}

/*
 * Generated sleeve art, one motif per release (ART_DIRECTION §5, §7).
 * Drawn on a 400×400 grid. On a disc the centre (r < 56) is the hub and the
 * corners are cut, so titles sit in the top band and motifs in the lower one.
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
            fill={color}
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
          <circle cx="200" cy="200" r={r} fill="none" stroke="var(--material-ring-shadow)" strokeWidth="34" />
          <circle
            cx="200"
            cy="200"
            r={r}
            fill="none"
            stroke={detail}
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
              <circle cx="15" cy="15" r="1.8" fill={detail} opacity="0.35" />
            </pattern>
          </defs>
          <rect width="400" height="400" fill={`url(#${clipId}-dots)`} />
          <polyline
            points={nodes.map((n) => `${n.x},${n.y}`).join(' ')}
            fill="none"
            stroke={detail}
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {nodes.map((n, i) => (
            <g key={n.label}>
              {i === nodes.length - 1 ? (
                <rect x={n.x - 13} y={n.y - 13} width="26" height="26" fill={ink} />
              ) : (
                <circle cx={n.x} cy={n.y} r="10" fill={field} stroke={ink} strokeWidth="3" />
              )}
            </g>
          ))}
        </g>
      );
    }
    case 'pixel': {
      const tiles: ReactNode[] = [];
      for (let i = 0; i < 20; i++) {
        tiles.push(<rect key={i} x={i * 20} y="378" width="18" height="22" fill={detail} opacity={i % 3 === 0 ? 0.22 : 0.12} />);
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
              fill={detail}
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
          <circle cx="300" cy="290" r="66" fill={ink} />
          <rect x="228" y="218" width="143" height="143" fill={`url(#${clipId}-facets)`} clipPath={`url(#${clipId})`} />
          <line x1="300" y1="200" x2="300" y2="224" stroke={ink} strokeWidth="3" />
          {bars.map((h, i) => (
            <rect key={i} x={74 + i * 18} y={334 - h} width="11" height={h} fill={ink} />
          ))}
        </g>
      );
    }
    case 'terminal':
      return (
        <g>
          <rect x="80" y="262" width="240" height="82" rx="8" fill="var(--material-terminal)" stroke={ink} strokeOpacity="0.4" />
          <circle cx="96" cy="276" r="4" fill="var(--material-stop)" />
          <circle cx="110" cy="276" r="4" fill="var(--material-wait)" />
          <circle cx="124" cy="276" r="4" fill={detail} />
        </g>
      );
    case 'screen':
      return (
        <g>
          <rect x="80" y="262" width="240" height="84" fill="var(--color-paper-raised)" stroke={ink} strokeWidth="2" />
          <line x1="80" y1="276" x2="320" y2="276" stroke={ink} strokeWidth="2" />
          <circle cx="90" cy="269" r="2.5" fill={ink} />
          <circle cx="99" cy="269" r="2.5" fill={ink} />
          <rect x="160" y="321" width="80" height="14" rx="7" fill={ink} />
          <rect x="166" y="326" width="68" height="4" rx="2" fill="var(--color-paper-raised)" opacity="0.7" />
          <path d="M 40 140 C 120 90, 280 190, 360 120" fill="none" stroke={detail} strokeWidth="3" opacity="0.5" />
        </g>
      );
    case 'private':
      return (
        <g>
          {[0, 1, 2].map((i) => (
            <line key={i} x1="70" x2="330" y1={300 + i * 22} y2={300 + i * 22} stroke={ink} strokeOpacity="0.28" strokeWidth="1.5" />
          ))}
        </g>
      );
    default:
      return null;
  }
}

export function CoverArt({ cover, assets, title, track, catalog, shape = 'sleeve', rim = false, className = '' }: CoverArtProps) {
  const clipId = `cover-clip-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`;
  const artwork = shape === 'disc' ? assets?.disc ?? assets?.sleeve : assets?.sleeve ?? assets?.disc;
  const words = title.toUpperCase().split(' ');
  const showTitle = cover.motif !== 'private';
  const titleSize = words.some((word) => word.length > 9) ? 28 : 32;
  // Two words stack on two lines in the top band; one word sits lower.
  const titleY = words.length > 1 ? 96 : 120;

  if (artwork) return <img className={`cover cover--${shape} ${className}`.trim()}
    src={artwork.src} width={artwork.width} height={artwork.height} alt="" aria-hidden="true" loading="lazy" decoding="async" />;

  return (
    <svg
      className={`cover cover--${shape} ${className}`.trim()}
      viewBox="0 0 400 400"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      focusable="false"
    >
      <rect width="400" height="400" fill={cover.field} />
      <Motif motif={cover.motif} ink={cover.ink} detail={cover.detail} field={cover.field} clipId={clipId} />
      {showTitle && (
        <text className="cover__title" textAnchor="middle" fill={cover.ink} fontSize={titleSize}>
          {words.map((word, i) => (
            <tspan key={word + i} x="200" y={titleY + i * titleSize * 0.98}>
              {word}
            </tspan>
          ))}
        </text>
      )}
      {!rim && (
        <text x="200" y="378" textAnchor="middle" className="cover__mono" fill={cover.ink} fontSize="12" opacity="0.8">
          {track}
        </text>
      )}
      {shape === 'sleeve' && (
        <>
          <text x="376" y="34" textAnchor="end" className="cover__mono" fill={cover.ink} fontSize="12" opacity="0.75">
            {catalog}
          </text>
          <text x="24" y="34" className="cover__mono" fill={cover.ink} fontSize="12" opacity="0.75">
            {site.name.toUpperCase()}
          </text>
        </>
      )}
    </svg>
  );
}

export default CoverArt;
