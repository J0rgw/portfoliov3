import { useEffect, type RefObject } from 'react';
import { useReducedMotion } from './useReducedMotion';

/** Where a held chapter is in its hold, as the chapter hears it (`onHold`). */
export interface HoldState {
  /** 0 when the chapter's top meets the viewport's, 1 when the hold is used up. */
  progress: number;
  /** The scroll offset where the hold starts, and its length, in px. */
  start: number;
  length: number;
}

const HOLD_EVENT = 'chapterhold';

/**
 * Lets a chapter follow its own hold: `listener` hears the hold's state on
 * every update, and `null` once the chapter is no longer held (it does not
 * fit, or the viewport holds nothing). A chapter that is never held hears
 * nothing. Returns the unsubscribe.
 */
export function onHold(chapter: HTMLElement, listener: (hold: HoldState | null) => void) {
  const handle = (event: Event) => listener((event as CustomEvent<HoldState | null>).detail);
  chapter.addEventListener(HOLD_EVENT, handle);
  return () => chapter.removeEventListener(HOLD_EVENT, handle);
}

/**
 * The chapter hold's job (docs/MOTION_SYSTEM.md §2.5). Writes `--hold` on the
 * held chapter: 0 when its top meets the viewport's (the snap point, where
 * the hold starts) and 1 when the hold is used up and the chapter moves on.
 * CSS draws with it (graphics/PenMark), so scrolling through a hold always
 * changes something on screen. The same state is sent to the chapter
 * (`onHold`): Proceso turns its playlist with it.
 *
 * A chapter is held only when it fits the viewport (ADR-001): one taller than
 * the window would be frozen half-read, so its wrapper is marked
 * `data-unheld` and layout.css lets it flow. Checked on mount, on resize and
 * whenever the chapter's own height changes. Projects included (Jorge,
 * 2026-11-11): on phones and portrait tablets it is taller than the window.
 *
 * The hold's length is the wrapper's spacer, the wrapper's height minus the
 * chapter's. Where layout.css holds nothing (no JavaScript, reduced motion,
 * short viewports, the last chapter, an unheld chapter) it is 0 and nothing is
 * written, so the CSS default (drawn) stays.
 *
 * One passive listener, at most one frame per scroll event, nothing while the
 * chapter is more than a viewport away, nothing at all under reduced motion.
 */
export function useChapterHold<T extends HTMLElement>(ref: RefObject<T | null>) {
  const reduced = useReducedMotion();

  useEffect(() => {
    const hold = ref.current;
    const chapter = hold?.firstElementChild;
    if (!hold || !(chapter instanceof HTMLElement) || reduced) return;
    let frame = 0;
    let near = false;
    let sent: HoldState | null = null;

    // Held, the chapter is at least a viewport tall (min-height), so it fits
    // only when its content does; unheld, its height is the content's own.
    const measure = () => {
      const unheld = chapter.offsetHeight > window.innerHeight + 1;
      if (unheld !== hold.hasAttribute('data-unheld')) hold.toggleAttribute('data-unheld', unheld);
    };

    // Only changes are sent, and the release once.
    const send = (state: HoldState | null) => {
      if (state === sent || (state && sent && state.progress === sent.progress && state.start === sent.start && state.length === sent.length)) return;
      sent = state;
      chapter.dispatchEvent(new CustomEvent(HOLD_EVENT, { detail: state }));
    };

    const update = () => {
      frame = 0;
      const length = hold.offsetHeight - chapter.offsetHeight;
      if (length < 1) {
        chapter.style.removeProperty('--hold');
        send(null);
        return;
      }
      const top = hold.getBoundingClientRect().top;
      const progress = Math.min(Math.max(-top / length, 0), 1);
      chapter.style.setProperty('--hold', progress.toFixed(3));
      send({ progress, start: top + window.scrollY, length });
    };

    const schedule = () => {
      if (near && !frame) frame = requestAnimationFrame(update);
    };

    const refit = () => {
      measure();
      schedule();
    };

    // Watch from a viewport away, so a mark is never seen drawn as its chapter arrives.
    const intersection = new IntersectionObserver(
      ([entry]) => {
        near = entry.isIntersecting;
        if (near) schedule();
      },
      { rootMargin: '100% 0px' },
    );
    const resize = new ResizeObserver(refit);

    intersection.observe(hold);
    resize.observe(chapter);
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', refit, { passive: true });
    measure();
    update();

    return () => {
      intersection.disconnect();
      resize.disconnect();
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', refit);
      if (frame) cancelAnimationFrame(frame);
      chapter.style.removeProperty('--hold');
      hold.removeAttribute('data-unheld');
      send(null);
    };
  }, [ref, reduced]);
}
