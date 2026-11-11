import { useEffect, type RefObject } from 'react';
import { useReducedMotion } from './useReducedMotion';

/**
 * Scroll depth for a section (docs/MOTION_SYSTEM.md §2.4). Writes `--parallax`
 * on the root: −1 while its top is a viewport below the top edge, 0 when its
 * top meets the top edge (the resting, snapped composition), 1 a viewport
 * later. CSS multiplies it by each layer's depth, so every layer lines up at 0.
 *
 * One passive listener, at most one frame per scroll event, nothing while
 * off-screen, nothing at all under reduced motion (the CSS default is 0).
 */
export function useParallax<T extends HTMLElement>(ref: RefObject<T | null>) {
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = ref.current;
    if (!root || reduced) return;
    let frame = 0;
    let visible = false;

    const update = () => {
      frame = 0;
      const progress = Math.min(Math.max(-root.getBoundingClientRect().top / window.innerHeight, -1), 1);
      root.style.setProperty('--parallax', progress.toFixed(4));
    };

    const schedule = () => {
      if (visible && !frame) frame = requestAnimationFrame(update);
    };

    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) schedule();
    });

    intersection.observe(root);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule, { passive: true });
    update();

    return () => {
      intersection.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      if (frame) cancelAnimationFrame(frame);
      root.style.removeProperty('--parallax');
    };
  }, [ref, reduced]);
}
