import type { ReactNode } from 'react';
import HandCircle from '../../graphics/HandCircle/HandCircle';
import '../../../design/components/LinkCue/LinkCue.css';

/**
 * The words of a link that has nothing else to say it is one, in place of the
 * arrow that used to follow them (ADR-002, Jorge's pick, 2026-11-12). At rest
 * they are underlined like the header's "Hablemos"; while the link is pointed
 * at or focused, the gallery's pen loop (graphics/HandCircle, after A24's
 * hover scribble) is drawn round them, the way you circle a track on a printed
 * tracklist, and retraced when the pointer leaves.
 *
 * Put it inside the link, round the link's words only. The link keeps its own
 * colour and hover colour and must not draw an underline of its own (it would
 * double the line). The loop is decorative: `aria-hidden`, no pointer, no
 * layout. Motion and geometry: design/components/LinkCue/LinkCue.css.
 */
export function LinkCue({ children }: { children: ReactNode }) {
  return (
    <span className="link-cue">
      {children}
      <HandCircle className="link-cue__loop" stretch />
    </span>
  );
}

export default LinkCue;
