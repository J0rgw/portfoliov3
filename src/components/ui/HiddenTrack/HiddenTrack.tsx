import { useEffect } from 'react';
import { hiddenTrack } from '../../../config/hiddenTrack';

let played = false;

/**
 * Prints the hidden track in the browser console once per page load: an ASCII disc
 * in the page's functional accent, then the note. Renders nothing.
 */
export function HiddenTrack() {
  useEffect(() => {
    if (played) return;
    played = true;
    const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent-functional').trim();
    console.log(`%c${hiddenTrack.art}`, `font-family: ui-monospace, monospace; font-weight: 700; color: ${accent}`);
    console.log(hiddenTrack.lines.join('\n'));
  }, []);
  return null;
}

export default HiddenTrack;
