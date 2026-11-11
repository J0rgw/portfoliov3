import type { ReactNode } from 'react';
import '../../../design/components/PenMark/PenMark.css';

/**
 * A marker stroke under one phrase of a text: part of the handwriting layer
 * (ART_DIRECTION §5), always decorative. The text is left as it is; the
 * stroke is an `aria-hidden` SVG behind the glyphs.
 *
 * The stroke is drawn by `--hold` (0 → 1), which a home chapter's hold writes
 * while it holds (useChapterHold, MOTION_SYSTEM §2.5): the hold's job is to
 * mark what the chapter is about. Without it (no JavaScript, reduced motion,
 * no hold on this viewport) the stroke is simply there.
 *
 * Drawn by hand as a generated vector (one fast pass, slightly bowed, lifting
 * at the end), not traced from Jorge's writing. If `mark` is not part of
 * `text`, the text renders unmarked (scripts/test-config.ts checks the copy).
 */
const STROKE = 'M1 7.4C13 6.6 25 7.8 38 7.1C51 6.4 63 7.3 76 6.5C85 6 92 5.3 99 4.2';

export function PenMark({ text, mark }: { text: string; mark?: string }): ReactNode {
  const at = mark ? text.indexOf(mark) : -1;
  if (!mark || at < 0) return text;
  return (
    <>
      {text.slice(0, at)}
      <span className="pen-mark">
        {mark}
        <svg className="pen-mark__stroke" viewBox="0 0 100 10" preserveAspectRatio="none" aria-hidden="true" focusable="false">
          <path pathLength={1} d={STROKE} />
        </svg>
      </span>
      {text.slice(at + mark.length)}
    </>
  );
}

export default PenMark;
