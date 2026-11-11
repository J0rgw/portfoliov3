import { useRef, type ReactNode } from 'react';
import { useChapterHold } from './useChapterHold';

/**
 * The wrapper that holds a home chapter at the top for a stretch of scroll
 * (layout.css, MOTION_SYSTEM §2.5) and tells it how far through the hold the
 * reader is (`--hold`, useChapterHold). A chapter taller than the window is
 * let go instead of held (ADR-001).
 */
export function ChapterHold({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useChapterHold(ref);
  return (
    <div className="chapter-hold" ref={ref}>
      {children}
    </div>
  );
}

export default ChapterHold;
