import { useState, type AnimationEvent, type FocusEvent, type PointerEvent } from 'react';
import { prefersReducedMotion } from './useReducedMotion';

/**
 * One spin on demand (docs/MOTION_SYSTEM.md §4): a mouse or pen arriving on the
 * trigger, or keyboard focus, sets `data-spinning` on the target, whose CSS
 * plays the spin; the end of the animation named here clears it. A spin under
 * way always finishes, so leaving halfway never snaps the object back, and it
 * is never restarted; the next arrival plays it again. Touch has no hover, and
 * reduced motion gets no spin.
 */
export function useSpinOnce(animationName: string) {
  const [spinning, setSpinning] = useState(false);
  const start = () => {
    if (!prefersReducedMotion()) setSpinning(true);
  };

  return {
    trigger: {
      onPointerEnter: (event: PointerEvent) => {
        if (event.pointerType !== 'touch') start();
      },
      onFocus: (event: FocusEvent<HTMLElement>) => {
        if (event.currentTarget.matches(':focus-visible')) start();
      },
    },
    target: {
      'data-spinning': spinning || undefined,
      onAnimationEnd: (event: AnimationEvent) => {
        if (event.animationName === animationName) setSpinning(false);
      },
    },
  };
}
