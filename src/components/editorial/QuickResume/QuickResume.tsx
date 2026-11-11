import { ThemeImage } from '../../graphics/ThemeImage/ThemeImage';
import { ui } from '../../../config/ui';
import { techLogo } from '../../../config/technologies';
import { type CSSProperties } from 'react';
import type { ProjectSummary } from '../../../config/types';

interface QuickResumeProps {
  project: ProjectSummary;
  /** Plays the change-over (only after the visitor changes the disc). */
  animate: boolean;
}

/**
 * The selected disc's credits, top left, printed straight on the page like
 * a disc's back insert: the name, a tight line of description under it and
 * the stack as marks (a technology without a mark is set as a mono chip).
 * Rendered with `key={slug}` so a change swaps the whole block at once: the
 * old project's text is never on screen next to the new disc.
 */
export function QuickResume({ project, animate }: QuickResumeProps) {
  return (
    <div className="quick-resume" data-animate={animate || undefined}>
      <h3 className="quick-resume__title">
        <span className="quick-resume__line"><span>{project.title}</span></span>
      </h3>
      <p className="quick-resume__text" style={{ '--row': 0 } as CSSProperties}>{project.shortDescription}</p>
      {project.stack.length > 0 && <ul className="quick-resume__stack" aria-label={ui.labels.stack} style={{ '--row': 1 } as CSSProperties}>
        {project.stack.map((tech) => {
          const logo = techLogo(tech);
          return (
            <li key={tech} className={logo ? 'quick-resume__mark' : 'quick-resume__chip mono'} title={logo ? tech : undefined}>
              {logo ? (
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
              ) : (
                tech
              )}
            </li>
          );
        })}
      </ul>}
    </div>
  );
}

export default QuickResume;
