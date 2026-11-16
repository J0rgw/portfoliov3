import type { CSSProperties, ReactNode } from 'react';
import '../../../design/components/ChapterHeading/ChapterHeading.css';

interface ChapterHeadingProps {
  /** Id of the heading, referenced by the section's aria-labelledby. */
  id: string;
  /** 1 when the chapter opens its page (ADR-003): its heading is the page's h1. */
  level?: 1 | 2;
  title: ReactNode;
  lede?: ReactNode;
  className?: string;
}

/**
 * h2 (h1 when the chapter opens its page) → lede: the opening of every chapter. No handwritten word beside the
 * heading (removed 2026-11-10): it only repeated the title; nor the marker
 * that underlined a phrase of it while the chapter held (removed 2026-11-12,
 * Jorge: it made the scroll feel cheap). Both lines rise into focus as the
 * chapter arrives (`data-reveal="rise"`, transitions.dev's "Texts reveal",
 * MOTION_SYSTEM §2.7).
 */
export function ChapterHeading({ id, title, lede, level = 2, className = '' }: ChapterHeadingProps) {
  const Heading = level === 1 ? 'h1' : 'h2';
  return (
    <header className={`chapter-heading ${className}`.trim()}>
      <Heading id={id} className="chapter-heading__title" data-reveal="rise">
        {title}
      </Heading>
      {lede && (
        <p className="chapter-heading__lede lede" data-reveal="rise" style={{ '--reveal-index': 1 } as CSSProperties}>
          {lede}
        </p>
      )}
    </header>
  );
}

export default ChapterHeading;
