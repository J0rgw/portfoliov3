import Paper from '../../graphics/Paper/Paper';
import Sticker from '../../graphics/Sticker/Sticker';
import { ui } from '../../../config/ui';
import { type CSSProperties } from 'react';
import type { ProjectSummary } from '../../../config/types';

interface QuickResumeProps {
  project: ProjectSummary;
  total: number;
  /** Plays the change-over (only after the visitor changes the disc). */
  animate: boolean;
}

/**
 * The selected disc's credits, top left, set like A24's film credits:
 * printed metadata and a naturally wrapping Poppins title. Rendered with
 * `key={slug}` so a change swaps the whole block at once: the old project's
 * text is never on screen next to the new disc, only the new text rises in.
 */
export function QuickResume({ project, total, animate }: QuickResumeProps) {

  return (
    <Paper className="quick-resume"><div data-animate={animate || undefined}>
      <p className="quick-resume__label quick-resume__head">
        <span>{ui.labels.project}</span>
        <Sticker className="mono">
          {project.track} / {String(total).padStart(2, '0')}
        </Sticker>
      </p>
      <h3 className="quick-resume__title">
        <span className="quick-resume__line"><span>{project.title}</span></span>
      </h3>
      <dl className="quick-resume__credits">
        <div className="quick-resume__row" style={{ '--row': 0 } as CSSProperties}>
          <dt className="quick-resume__label">{ui.labels.description}</dt>
          <dd className="quick-resume__text">{project.shortDescription}</dd>
        </div>
        <div className="quick-resume__row" style={{ '--row': 1 } as CSSProperties}>
          <dt className="quick-resume__label">{ui.labels.stack}</dt>
          <dd className="quick-resume__stack">{project.stack.join(' / ')}</dd>
        </div>
      </dl>
    </div></Paper>
  );
}

export default QuickResume;
