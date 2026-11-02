import { useEffect } from 'react';
import { prefersReducedMotion } from './useReducedMotion';

/**
 * One IntersectionObserver for every [data-reveal] element on the page
 * (docs/MOTION_SYSTEM.md §4). Elements are marked [data-revealed] once and
 * never hidden again. Hidden states only exist under `.js`, which an inline
 * script sets before first paint, so no-JS visitors always see everything.
 */
export function RevealController({ routeKey }: { routeKey: string }) {
  useEffect(() => {
    const root = document.documentElement;
    const targets = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]:not([data-revealed])'));
    const reveal = (element: Element) => element.setAttribute('data-revealed', '');

    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      targets.forEach(reveal);
      root.classList.add('reveal-ready');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          reveal(entry.target);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.04 },
    );

    targets.forEach((element) => observer.observe(element));
    // Tells the CSS failsafe the controller is alive.
    root.classList.add('reveal-ready');

    return () => observer.disconnect();
  }, [routeKey]);

  return null;
}
