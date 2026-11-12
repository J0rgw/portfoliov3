import { ThemeImage } from '../../graphics/ThemeImage/ThemeImage';
import { ui } from '../../../config/ui';
import { techLogo } from '../../../config/technologies';
import type { ProjectSummary } from '../../../config/types';
import MarkRow from '../../ui/MarkRow/MarkRow';
import type { SwapPhase } from '../../ui/motion/useTextSwap';

interface QuickResumeProps {
  project: ProjectSummary;
  /** The swap's phase when the project changes (useTextSwap, motion.css). */
  swap: SwapPhase;
}

/**
 * The selected disc's credits, top left, printed straight on the page like
 * a disc's back insert: the name, a tight line of description under it and
 * the stack as marks (a technology without a mark is set as a mono chip),
 * which lift under the pointer and show their names (MarkRow). A change of
 * project swaps the whole block: the old credits leave before the new ones
 * arrive, so two projects' texts are never on screen together.
 */
export function QuickResume({ project, swap }: QuickResumeProps) {
  return (
    <div className="quick-resume" data-swap={swap}>
      <h3 className="quick-resume__title">{project.title}</h3>
      <p className="quick-resume__text">{project.shortDescription}</p>
      {project.stack.length > 0 && <MarkRow className="quick-resume__stack" label={ui.labels.stack}>
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
      </MarkRow>}
    </div>
  );
}

export default QuickResume;
