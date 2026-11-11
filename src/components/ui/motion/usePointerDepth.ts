import { useEffect, type RefObject } from 'react';
import { motion } from '../../../design/motion';
import { useReducedMotion } from './useReducedMotion';

const clamp = (value: number) => Math.min(Math.max(value, -1), 1);

/**
 * Pointer depth (docs/MOTION_SYSTEM.md §4): writes `--px` and `--py` on the root, the
 * pointer's place in the viewport from −1 to 1, eased towards it frame by frame. CSS
 * multiplies them by each layer's depth, so near objects lean further than far ones,
 * as stacked cut-outs do under a moving eye.
 *
 * Only for a mouse or pen on a device that hovers, only while the root is on screen,
 * never under reduced motion. The viewport stands in for the root (the hero's frame is
 * pinned to it), so a move never reads layout. Frames run only until the values settle.
 */
export function usePointerDepth<T extends HTMLElement>(ref: RefObject<T | null>) {
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = ref.current;
    if (!root || reduced || !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let frame = 0;
    let visible = false;

    const tick = () => {
      frame = 0;
      current.x += (target.x - current.x) * motion.pointerDepth.ease;
      current.y += (target.y - current.y) * motion.pointerDepth.ease;
      const settled = Math.abs(target.x - current.x) < 0.001 && Math.abs(target.y - current.y) < 0.001;
      if (settled) {
        current.x = target.x;
        current.y = target.y;
      }
      root.style.setProperty('--px', current.x.toFixed(4));
      root.style.setProperty('--py', current.y.toFixed(4));
      if (!settled) frame = requestAnimationFrame(tick);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const move = (event: PointerEvent) => {
      if (!visible || event.pointerType === 'touch') return;
      target.x = clamp((event.clientX / window.innerWidth) * 2 - 1);
      target.y = clamp((event.clientY / window.innerHeight) * 2 - 1);
      schedule();
    };

    // Leaving the window: the layers drift back to rest.
    const leave = (event: PointerEvent) => {
      if (event.relatedTarget) return;
      target.x = 0;
      target.y = 0;
      schedule();
    };

    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });

    intersection.observe(root);
    window.addEventListener('pointermove', move, { passive: true });
    document.addEventListener('pointerout', leave, { passive: true });

    return () => {
      intersection.disconnect();
      window.removeEventListener('pointermove', move);
      document.removeEventListener('pointerout', leave);
      if (frame) cancelAnimationFrame(frame);
      root.style.removeProperty('--px');
      root.style.removeProperty('--py');
    };
  }, [ref, reduced]);
}
