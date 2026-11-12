import { useEffect, useLayoutEffect, useRef, useState } from 'react';

/** Set as `data-swap` on the element whose text changes (design/motion.css). */
export type SwapPhase = 'idle' | 'out' | 'in';

/** One half of the swap, read from the token so CSS stays its only source. */
const swapMs = (): number => {
  const raw = getComputedStyle(document.documentElement).getPropertyValue('--dur-swap').trim();
  const value = parseFloat(raw);
  if (!Number.isFinite(value)) return 150;
  return raw.endsWith('ms') || !raw.endsWith('s') ? value : value * 1000;
};

/**
 * Text that changes in place (docs/MOTION_SYSTEM.md §4): when `value` changes,
 * the text showing it leaves, rising out of focus as it fades, and the new one
 * arrives from below the same way, one `--dur-swap` each. Render the returned
 * value instead of `value`, and the phase as `data-swap` on the element that
 * changes; motion.css plays it, and reduced motion keeps the fade alone.
 *
 * Changes that arrive while the old text is leaving are not queued: the latest
 * is the one that arrives, and a change back to the text still on screen keeps
 * it. `instant` changes apply at once (a state restored on load).
 */
export function useTextSwap<T>(value: T, instant = false): readonly [T, SwapPhase] {
  const [shown, setShown] = useState(value);
  const [phase, setPhase] = useState<SwapPhase>('idle');
  const latest = useRef(value);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    latest.current = value;
    const leaving = timer.current !== undefined;
    if (instant || (leaving && Object.is(value, shown))) {
      window.clearTimeout(timer.current);
      timer.current = undefined;
      setShown(value);
      setPhase('idle');
      return;
    }
    if (leaving || Object.is(value, shown)) return;
    setPhase('out');
    timer.current = window.setTimeout(() => {
      timer.current = undefined;
      setShown(latest.current);
      setPhase('in');
    }, swapMs());
  }, [value, instant, shown]);

  // The new text is set below and out of focus with no transition; once that
  // style is applied (the forced layout), going back to idle eases it in.
  useLayoutEffect(() => {
    if (phase !== 'in') return;
    void document.body.offsetHeight;
    setPhase('idle');
  }, [phase]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  return [shown, phase] as const;
}
