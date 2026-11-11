import { ThemeImage } from '../../graphics/ThemeImage/ThemeImage';
import { techLogo } from '../../../config/technologies';
import { ui } from '../../../config/ui';
import '../../../design/components/StackMarks/StackMarks.css';

/** "A, B y C", the way Spanish writes a list (DESIGN.md "Typography"). */
const listFormat = (items: string[]) =>
  items.length > 1 ? `${items.slice(0, -1).join(', ')} y ${items[items.length - 1]}` : items.join('');

/**
 * A release's stack on the Projects pages (ADR-001), as the gallery prints it:
 * the technologies that have a mark as grey marks, named on hover and for
 * assistive technology, and the rest in words after them, as a list. No chips:
 * a row of stamped names competed with the marks.
 */
export function StackMarks({ technologies, className = '' }: { technologies: string[]; className?: string }) {
  const marked = technologies.filter((tech) => techLogo(tech));
  const named = technologies.filter((tech) => !techLogo(tech));
  if (!technologies.length) return null;
  return (
    <div className={`stack-marks ${className}`.trim()}>
      {marked.length > 0 && (
        <ul className="stack-marks__marks" role="list" aria-label={ui.labels.stack}>
          {marked.map((tech) => {
            const logo = techLogo(tech)!;
            return (
              <li key={tech} className="stack-marks__mark" title={tech}>
                <ThemeImage
                  src={logo.src}
                  dark={logo.darkSrc ? { src: logo.darkSrc } : undefined}
                  alt={tech}
                  width={28}
                  height={28}
                  loading="lazy"
                  decoding="async"
                  draggable={false}
                />
              </li>
            );
          })}
        </ul>
      )}
      {named.length > 0 && <p className="stack-marks__names">{listFormat(named)}</p>}
    </div>
  );
}

export default StackMarks;
