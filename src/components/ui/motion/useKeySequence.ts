import { useEffect, useRef } from 'react';

/**
 * Calls `onMatch` when the last keys pressed anywhere on the page are `sequence`
 * (`KeyboardEvent.key`, lower case). Keys typed into a field never count. For easter
 * eggs (the Konami code on /sobre-mi/, ADR-004): nothing essential may depend on it.
 */
export function useKeySequence(sequence: readonly string[], onMatch: () => void) {
  const latest = useRef(onMatch);

  useEffect(() => {
    latest.current = onMatch;
  });

  useEffect(() => {
    let typed: string[] = [];
    const onKey = (event: KeyboardEvent) => {
      if (event.target instanceof Element && event.target.closest('input, textarea, select, [contenteditable="true"]')) return;
      typed = [...typed, event.key.toLowerCase()].slice(-sequence.length);
      if (typed.length === sequence.length && typed.every((key, index) => key === sequence[index])) {
        typed = [];
        latest.current();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [sequence]);
}
