import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

/** Synchronous check for effects and event handlers. Never call during render. */
export const prefersReducedMotion = (): boolean =>
  typeof window !== 'undefined' && window.matchMedia(QUERY).matches;

/**
 * Live reduced-motion preference for effects. Starts as `false` on the server
 * and on the first client render so hydration matches; never branch markup on it.
 */
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(QUERY);
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);

  return reduced;
}
