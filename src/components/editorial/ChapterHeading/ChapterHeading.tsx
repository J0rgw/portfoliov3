import type { CSSProperties, ReactNode } from 'react';
import '../../../design/components/ChapterHeading/ChapterHeading.css';

interface ChapterHeadingProps {
  /** Id of the h2, referenced by the section's aria-labelledby. */
  id: string;
  title: ReactNode;
  lede?: ReactNode;
  className?: string;
}

/**
 * h2 → lede: the opening of every chapter. No handwritten word beside the
 * heading (removed 2026-11-10): it only repeated the title. The marker now
 * underlines a phrase of the title or lede instead (graphics/PenMark). Both
 * lines rise into focus as the chapter arrives (`data-reveal="rise"`,
 * transitions.dev's "Texts reveal", MOTION_SYSTEM §2.7).
 */
export function ChapterHeading({ id, title, lede, className = '' }: ChapterHeadingProps) {
  return (
    <header className={`chapter-heading ${className}`.trim()}>
      <h2 id={id} className="chapter-heading__title" data-reveal="rise">
        {title}
      </h2>
      {lede && (
        <p className="chapter-heading__lede lede" data-reveal="rise" style={{ '--reveal-index': 1 } as CSSProperties}>
          {lede}
        </p>
      )}
    </header>
  );
}

export default ChapterHeading;
