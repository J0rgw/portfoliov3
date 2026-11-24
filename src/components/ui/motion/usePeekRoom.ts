import { useEffect, type RefObject } from 'react';

/**
 * Room for things picked up in place (/sobre-mi/, ADR-004, MOTION_SYSTEM §2.9). Each
 * `[data-peek]` inside `ref` grows by its `--peek-scale` round its centre, with its tag
 * (`--peek-tag` px) under it; this writes `--peek-dx` / `--peek-dy`, the shift that keeps
 * the grown box inside the frame's content box (its padding clears the fixed header).
 * Layout is read only on mount, when the frame changes size and when `version` changes
 * (something else moved the words), never while scrolling.
 */
export function usePeekRoom(ref: RefObject<HTMLElement | null>, version?: unknown) {
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    let frame = 0;

    const place = () => {
      frame = 0;
      const box = root.getBoundingClientRect();
      const style = getComputedStyle(root);
      const left = box.left + parseFloat(style.paddingLeft);
      const right = box.right - parseFloat(style.paddingRight);
      const top = box.top + parseFloat(style.paddingTop);
      const bottom = box.bottom;

      for (const thing of root.querySelectorAll<HTMLElement>('[data-peek]')) {
        const own = getComputedStyle(thing);
        const scale = parseFloat(own.getPropertyValue('--peek-scale')) || 1;
        const tag = parseFloat(own.getPropertyValue('--peek-tag')) || 0;
        const rest = thing.getBoundingClientRect();
        const width = rest.width * scale;
        const height = rest.height * scale;
        const x = rest.left + rest.width / 2;
        const y = rest.top + rest.height / 2;

        let dx = 0;
        if (x - width / 2 < left) dx = left - (x - width / 2);
        else if (x + width / 2 > right) dx = right - (x + width / 2);
        let dy = 0;
        if (y - height / 2 < top) dy = top - (y - height / 2);
        else if (y + height / 2 + tag > bottom) dy = bottom - (y + height / 2 + tag);

        thing.style.setProperty('--peek-dx', `${Math.round(dx)}px`);
        thing.style.setProperty('--peek-dy', `${Math.round(dy)}px`);
      }
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(place);
    };

    const observer = new ResizeObserver(schedule);
    observer.observe(root);
    // Fonts change the sentence's wrapping once they arrive.
    document.fonts?.ready.then(schedule);
    return () => {
      observer.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [ref, version]);
}
