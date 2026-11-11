import { useEffect } from 'react';
import type Lenis from 'lenis';
import { motion } from '../../../design/motion';
import { prefersReducedMotion, useReducedMotion } from './useReducedMotion';

let instance: Lenis | null = null;
const FRAME_MS = 1000 / 60;

/**
 * Scrolls to an in-page target the way the rest of the page scrolls: eased by
 * the smooth scroller when it runs, natively otherwise (reduced motion, before
 * it loads). Both honour `scroll-padding-top` and `scroll-margin-top`.
 */
export function scrollToTarget(target: HTMLElement) {
  if (instance) instance.scrollTo(target);
  else target.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
}

/** Same-page hash links scroll through `scrollToTarget` and move focus. */
function onDocumentClick(event: MouseEvent) {
  if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
  const link = (event.target as Element | null)?.closest?.('a[href*="#"]');
  if (!(link instanceof HTMLAnchorElement) || link.target) return;
  const url = new URL(link.href);
  if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || url.hash.length < 2) return;
  const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
  if (!target) return;
  event.preventDefault();
  if (url.hash !== window.location.hash) history.pushState(null, '', url.hash);
  scrollToTarget(target);
  if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
  target.focus({ preventScroll: true });
}

/**
 * Smooth scroll (docs/MOTION_SYSTEM.md §2.3): Lenis eases wheel and trackpad
 * input; touch, keyboard and the scrollbar stay native. With `snap`, the
 * chapters (the hero, each `.chapter-hold` and any `[data-snap]` marker) are
 * proximity snap points: a wheel that comes to rest near one settles on it,
 * anywhere else the page stays where it stopped. Both libraries are a
 * separate chunk loaded after hydration; nothing runs under reduced motion.
 *
 * Frames are requested only while Lenis animates (as on atlaxia.es): its own
 * `autoRaf` asks for one forever, so an idle page kept rendering.
 */
export function SmoothScroll({ snap }: { snap: boolean }) {
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced || prefersReducedMotion()) return;
    let cancelled = false;
    let teardown = () => {};

    void Promise.all([import('lenis'), snap ? import('lenis/snap') : null]).then(([{ default: LenisClass }, snapModule]) => {
      if (cancelled) return;
      const lenis = new LenisClass({ lerp: motion.smoothScroll.lerp, stopInertiaOnNavigate: true });
      instance = lenis;

      let frame = 0;
      const loop = (time: number) => {
        // After a pause, count one frame instead of the whole pause.
        if (!lenis.time) lenis.time = time - FRAME_MS;
        lenis.raf(time);
        if (lenis.isScrolling === 'smooth') {
          frame = requestAnimationFrame(loop);
        } else {
          frame = 0;
          lenis.time = 0;
        }
      };
      // Every animation starts in scrollTo (wheel, snap, links): wake the loop there.
      const scrollTo = lenis.scrollTo.bind(lenis);
      lenis.scrollTo = (target, options) => {
        scrollTo(target, options);
        if (!options?.immediate && !frame) frame = requestAnimationFrame(loop);
      };

      let snapper: InstanceType<NonNullable<typeof snapModule>['default']> | null = null;
      if (snapModule) {
        const { threshold, debounceMs, duration } = motion.smoothScroll.snap;
        snapper = new snapModule.default(lenis, { type: 'proximity', distanceThreshold: threshold, debounce: debounceMs, duration });
        snapper.addElements(Array.from(document.querySelectorAll<HTMLElement>('main > section, main > .chapter-hold, [data-snap]')), { align: ['start'] });
      }

      teardown = () => {
        cancelAnimationFrame(frame);
        snapper?.destroy();
        lenis.destroy();
        if (instance === lenis) instance = null;
      };
    });

    document.addEventListener('click', onDocumentClick);
    return () => {
      cancelled = true;
      document.removeEventListener('click', onDocumentClick);
      teardown();
    };
  }, [reduced, snap]);

  return null;
}

export default SmoothScroll;
