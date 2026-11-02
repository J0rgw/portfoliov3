import { Fragment, type CSSProperties } from 'react';
import type { ProjectSummary } from '../../content/types';

interface QuickResumeProps {
  project: ProjectSummary;
  total: number;
  /** Plays the change-over (only after the visitor changes the disc). */
  animate: boolean;
}

/**
 * The selected disc's credits, top left, set like A24's film credits:
 * letterspaced labels, hairlines, the title in the serif. Rendered with
 * `key={slug}` so a change swaps the whole block at once: the old project's
 * text is never on screen next to the new disc, only the new text rises in.
 */
export function QuickResume({ project, total, animate }: QuickResumeProps) {
  // One word per line: the title's breaks are chosen, not left to the measure.
  const words = project.title.split(' ');

  return (
    <div className="quick-resume" data-animate={animate || undefined}>
      <p className="quick-resume__label quick-resume__head">
        <span>Proyecto</span>
        <span className="mono" aria-hidden="true">
          {project.track} / {String(total).padStart(2, '0')}
        </span>
      </p>
      <h3 className="quick-resume__title">
        {words.map((word, i) => (
          <Fragment key={word + i}>
            {i > 0 && ' '}
            <span className="quick-resume__line">
              <span style={{ '--line': i } as CSSProperties}>{word}</span>
            </span>
          </Fragment>
        ))}
      </h3>
      <dl className="quick-resume__credits">
        <div className="quick-resume__row" style={{ '--row': 0 } as CSSProperties}>
          <dt className="quick-resume__label">Descripción</dt>
          <dd className="quick-resume__text">{project.shortDescription}</dd>
        </div>
        <div className="quick-resume__row" style={{ '--row': 1 } as CSSProperties}>
          <dt className="quick-resume__label">Stack</dt>
          <dd className="quick-resume__stack">{project.stack.join(' / ')}</dd>
        </div>
      </dl>
    </div>
  );
}

export default QuickResume;
