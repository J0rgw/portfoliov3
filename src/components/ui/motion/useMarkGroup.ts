import { useEffect, type RefObject } from 'react';
import { prefersReducedMotion } from './useReducedMotion';

/** The hovered mark rises this far and grows this much; each step away keeps this share. */
const LIFT_PX = -4;
const SCALE = 1.05;
const FALLOFF = 0.45;

/**
 * A row of technology marks (docs/MOTION_SYSTEM.md §2.7), two transitions from
 * transitions.dev on one list (`data-mark-group`, design/components/MarkTip):
 *
 * - "Avatar group hover spring": the mark under the pointer rises and grows a
 *   little, its neighbours less the further they are; let go, they spring back
 *   past their place and settle.
 * - "Tooltip open/close": one name tag for the row (`MarkTip`, the list's last
 *   child) shows the mark's name after a beat, travels from mark to mark while
 *   the pointer stays on the row and goes at once when it leaves. The names come
 *   from the marks' `title`, held back while hovered so the browser's own
 *   tooltip does not show as well; without JavaScript the titles do the job.
 *
 * Mouse and pen only; reduced motion keeps the name tag and drops the lift.
 */
export function useMarkGroup(ref: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const list = ref.current;
    if (!list || !window.matchMedia('(hover: hover)').matches) return;
    const tip = list.querySelector<HTMLElement>('[data-mark-tip]');
    const tipText = tip?.firstElementChild ?? null;
    const still = prefersReducedMotion();
    // The mark whose title is held back while the pointer is on it.
    let held: HTMLElement | null = null;

    const marks = () =>
      Array.from(list.children).filter((el): el is HTMLElement => el instanceof HTMLElement && el !== tip);

    const lift = (active: number | null) => {
      if (still) return;
      // Clean on the way up, a spring on the way back.
      list.style.setProperty('--lift-ease', active === null ? 'var(--ease-spring-back)' : 'var(--ease-smooth-out)');
      marks().forEach((mark, index) => {
        const steps = active === null ? null : Math.abs(index - active);
        mark.style.setProperty('--lift-y', steps === null ? '0px' : `${(LIFT_PX * FALLOFF ** steps).toFixed(3)}px`);
        mark.style.setProperty('--lift-scale', steps === 0 ? String(SCALE) : '1');
      });
    };

    const release = () => {
      if (held?.dataset.title) held.title = held.dataset.title;
      held = null;
    };

    const hideTip = () => {
      tip?.removeAttribute('data-show');
      release();
    };

    const showTip = (mark: HTMLElement) => {
      if (!tip || !tipText) return;
      release();
      const name = mark.title || mark.dataset.title;
      if (!name) {
        tip.removeAttribute('data-show');
        return;
      }
      mark.dataset.title = name;
      mark.removeAttribute('title');
      held = mark;
      tipText.textContent = name;
      const x = `${mark.offsetLeft + mark.offsetWidth / 2}px`;
      if (tip.hasAttribute('data-show')) {
        tip.style.setProperty('--tip-x', x);
      } else {
        // Hidden: snap to the mark, so only the appear plays.
        tip.style.transition = 'none';
        tip.style.setProperty('--tip-x', x);
        void tip.offsetWidth;
        tip.style.transition = '';
        tip.setAttribute('data-show', '');
      }
    };

    const onOver = (event: PointerEvent) => {
      if (event.pointerType === 'touch' || !(event.target instanceof Element)) return;
      const mark = event.target.closest('li');
      if (!(mark instanceof HTMLElement) || mark === tip || mark.parentElement !== list) return;
      lift(marks().indexOf(mark));
      showTip(mark);
    };

    const onLeave = () => {
      lift(null);
      hideTip();
    };

    list.addEventListener('pointerover', onOver);
    list.addEventListener('pointerleave', onLeave);
    return () => {
      list.removeEventListener('pointerover', onOver);
      list.removeEventListener('pointerleave', onLeave);
      hideTip();
    };
  }, [ref]);
}
