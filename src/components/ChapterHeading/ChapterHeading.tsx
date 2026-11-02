import type { CSSProperties, ReactNode } from 'react';
import './ChapterHeading.css';

interface ChapterHeadingProps {
  /** Id of the h2, referenced by the section's aria-labelledby. */
  id: string;
  kicker: string;
  title: ReactNode;
  /**
   * Decorative marker handwriting (Estrella). Letters only, no accents or
   * punctuation (ART_DIRECTION §3.3). Hidden from assistive technology.
   */
  handwriting?: string;
  lede?: ReactNode;
  className?: string;
}

/** Kicker → h2 → lede: the opening of every chapter. */
export function ChapterHeading({ id, kicker, title, handwriting, lede, className = '' }: ChapterHeadingProps) {
  return (
    <header className={`chapter-heading ${className}`.trim()}>
      <p className="chapter-heading__kicker label" data-reveal="fade">
        {kicker}
      </p>
      <div className="chapter-heading__title-wrap">
        <h2 id={id} className="chapter-heading__title" data-reveal="up">
          {title}
        </h2>
        {handwriting && (
          <span className="chapter-heading__hand handwriting" aria-hidden="true" data-reveal="fade">
            {handwriting}
          </span>
        )}
      </div>
      {lede && (
        <p className="chapter-heading__lede lede" data-reveal="up" style={{ '--reveal-index': 1 } as CSSProperties}>
          {lede}
        </p>
      )}
    </header>
  );
}

export default ChapterHeading;
