import type { ReactNode } from 'react';
import LinkCue from '../../ui/LinkCue/LinkCue';
import { useSpinOnce } from '../../ui/motion/useSpinOnce';
import '../../../design/components/NextTrack/NextTrack.css';

interface NextTrackProps {
  href: string;
  /** Names the navigation landmark ("Siguiente proyecto"). */
  label: string;
  /** The line over the title ("Siguiente pista"). */
  note: string;
  title: string;
  tagline: string;
  /** The disc beside the title: decorative, it spins up when the row is pointed at. */
  disc: ReactNode;
}

/**
 * The next track: the row that closes a case study and, since ADR-003, the
 * home page. The disc beside the title spins up like a drive waking with
 * nothing to read (useSpinOnce, MOTION_SYSTEM §2, references.md #19); the
 * title's words are the link cue (LinkCue, ADR-002).
 */
export function NextTrack({ href, label, note, title, tagline, disc }: NextTrackProps) {
  const spin = useSpinOnce('case-disc-spin-up');

  return (
    <nav className="next-track" aria-label={label}>
      <a className="container next-track__link" href={href} {...spin.trigger}>
        <span className="next-track__disc" aria-hidden="true" {...spin.target}>
          {disc}
        </span>
        <span className="next-track__text">
          <span className="next-track__label">{note}</span>
          <span className="next-track__title">
            <LinkCue>{title}</LinkCue>
          </span>
          <span className="next-track__tagline">{tagline}</span>
        </span>
      </a>
    </nav>
  );
}

export default NextTrack;
