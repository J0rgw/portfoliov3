import { useRef, type ReactNode } from 'react';
import { useChapterHold } from './useChapterHold';

/**
 * The wrapper round every home chapter: the chapter's snap point (SmoothScroll)
 * and, when it `holds`, the stage that keeps it at the top for a stretch of
 * scroll (layout.css, MOTION_SYSTEM §2.5) and tells it how far through the
 * hold the reader is (`onHold`, useChapterHold). A holding chapter taller than
 * the window is let go instead of held (ADR-001).
 */
export function ChapterHold({ holds = false, children }: { holds?: boolean; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useChapterHold(ref, holds);
  return (
    <div className="chapter-hold" data-holds={holds || undefined} ref={ref}>
      {children}
    </div>
  );
}

export default ChapterHold;
