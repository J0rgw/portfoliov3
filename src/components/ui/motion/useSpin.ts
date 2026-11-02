import { motion } from '../../../design/motion';
import { useEffect, useRef, type RefObject } from 'react';
import { useReducedMotion } from './useReducedMotion';

interface SpinOptions {
  /** Resting a mouse or pen on this element eases the loop to a stop. */
  hoverRef?: RefObject<HTMLElement | null>;
  /** Held still by the visitor (an explicit pause control). */
  paused?: boolean;
}

/** Time constant of the ease towards the target speed: settles in ~0.6 s. */
const EASE_MS = motion.spinEaseMs;

/**
 * Drives a CSS keyframe loop declared on `ref` (docs/MOTION_SYSTEM.md §4): the
 * loop runs only while the element is on screen, eases to a stop while the
 * pointer rests on `hoverRef`, and stays stopped while `paused`. Speed changes
 * go through `playbackRate`, so the loop never jumps to another angle.
 *
 * Under reduced motion the CSS declares no animation, so there is nothing to
 * drive and the hook does nothing.
 */
export function useSpin<T extends HTMLElement>(ref: RefObject<T | null>, { hoverRef, paused = false }: SpinOptions = {}) {
  const reduced = useReducedMotion();
  const held = useRef(paused);
  const retarget = useRef<() => void>(() => {});

  useEffect(() => {
    held.current = paused;
    retarget.current();
  }, [paused]);

  useEffect(() => {
    const element = ref.current;
    const animation = element?.getAnimations().find((item) => item instanceof CSSAnimation);
    if (!element || !animation || reduced) return;

    const hoverTarget = hoverRef?.current;
    let hovering = false;
    let rate = held.current ? 0 : 1;
    let frame = 0;
    let last = 0;

    animation.playbackRate = rate;

    const goal = () => (hovering || held.current ? 0 : 1);

    const step = (now: number) => {
      const target = goal();
      const elapsed = last ? now - last : 16;
      last = now;
      rate += (target - rate) * (1 - Math.exp(-elapsed / EASE_MS));
      if (Math.abs(target - rate) < 0.004) rate = target;
      animation.playbackRate = rate;
      frame = rate === target ? 0 : requestAnimationFrame(step);
      if (!frame) last = 0;
    };

    retarget.current = () => {
      if (!frame && rate !== goal()) frame = requestAnimationFrame(step);
    };

    const onEnter = (event: PointerEvent) => {
      if (event.pointerType === 'touch') return;
      hovering = true;
      retarget.current();
    };
    const onLeave = () => {
      hovering = false;
      retarget.current();
    };

    // Nothing loops while off-screen.
    const intersection = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) animation.play();
      else animation.pause();
    });

    intersection.observe(element);
    hoverTarget?.addEventListener('pointerenter', onEnter);
    hoverTarget?.addEventListener('pointerleave', onLeave);

    return () => {
      intersection.disconnect();
      hoverTarget?.removeEventListener('pointerenter', onEnter);
      hoverTarget?.removeEventListener('pointerleave', onLeave);
      if (frame) cancelAnimationFrame(frame);
      retarget.current = () => {};
      animation.playbackRate = 1;
    };
  }, [ref, hoverRef, reduced]);
}
