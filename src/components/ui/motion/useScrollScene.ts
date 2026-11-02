import { useEffect, type RefObject } from 'react';
import { useReducedMotion } from './useReducedMotion';

/** Named stretches of the narrative, as [start, end] fractions of it (0 → 1). */
export type ScenePhases = Readonly<Record<string, readonly [number, number]>>;

interface SceneOptions {
  phases: ScenePhases;
  /**
   * Share of the narrative played while the pin is stuck. The rest plays while
   * the released pin scrolls out of view, so the scene never ends on an empty
   * viewport.
   */
  pinShare?: number;
}

const clamp01 = (value: number) => Math.min(Math.max(value, 0), 1);
const smoothstep = (t: number) => t * t * (3 - 2 * t);

/** Layout offset of `element` inside `ancestor`, ignoring transforms. */
function offsetWithin(element: HTMLElement, ancestor: HTMLElement) {
  let x = 0;
  let y = 0;
  let node: HTMLElement | null = element;
  while (node && node !== ancestor) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return { x, y };
}

/**
 * Scroll-linked scene (docs/MOTION_SYSTEM.md §4). The root contains a pin
 * (`[data-scene-pin]`, which must be positioned). When CSS makes the pin
 * sticky, the narrative runs 0 → `pinShare` while it is stuck and
 * `pinShare` → 1 while it scrolls away; when the pin is static (small screens),
 * the whole narrative plays as the pin leaves the viewport.
 *
 * Writes on the root `--scene` (0 → 1) and one `--scene-<phase>` per phase
 * (0 → 1, eased). Each `[data-scene-anchor="name"]` gets `--scene-<name>-dx`
 * and `--scene-<name>-dy`: the distance from its resting centre to the pin's
 * centre, measured on resize, so CSS can bring it to the middle.
 *
 * One passive listener, at most one frame per scroll event, nothing while
 * off-screen, nothing at all under reduced motion.
 */
export function useScrollScene<T extends HTMLElement>(
  ref: RefObject<T | null>,
  { phases, pinShare = 0.8 }: SceneOptions,
) {
  const reduced = useReducedMotion();

  useEffect(() => {
    const root = ref.current;
    const pin = root?.querySelector<HTMLElement>('[data-scene-pin]');
    const track = pin?.parentElement;
    if (!root || !pin || !track || reduced) return;

    const entries = Object.entries(phases);
    let frame = 0;
    let visible = true;
    let sticky = false;
    let stickyTop = 0;
    let run = 0;

    const measure = () => {
      const style = getComputedStyle(pin);
      sticky = style.position === 'sticky';
      stickyTop = parseFloat(style.top) || 0;
      run = Math.max(track.offsetHeight - pin.offsetHeight, 0);

      const centreX = pin.clientWidth / 2;
      const centreY = pin.clientHeight / 2;
      root.querySelectorAll<HTMLElement>('[data-scene-anchor]').forEach((anchor) => {
        const { x, y } = offsetWithin(anchor, pin);
        const name = anchor.dataset.sceneAnchor;
        root.style.setProperty(`--scene-${name}-dx`, `${(centreX - x - anchor.offsetWidth / 2).toFixed(1)}px`);
        root.style.setProperty(`--scene-${name}-dy`, `${(centreY - y - anchor.offsetHeight / 2).toFixed(1)}px`);
      });
    };

    const narrative = () => {
      if (sticky && run > 0) {
        const stuck = stickyTop - track.getBoundingClientRect().top;
        if (stuck <= run) return pinShare * clamp01(stuck / run);
        return pinShare + (1 - pinShare) * clamp01((stuck - run) / (stickyTop + pin.offsetHeight));
      }
      // Static pin: from its resting place to fully scrolled out of view.
      const bottom = pin.getBoundingClientRect().bottom;
      const start = Math.min(bottom + window.scrollY, window.innerHeight);
      return clamp01((start - bottom) / Math.max(start, 1));
    };

    const update = () => {
      frame = 0;
      const progress = narrative();
      root.style.setProperty('--scene', progress.toFixed(4));
      for (const [name, [start, end]] of entries) {
        const local = smoothstep(clamp01((progress - start) / (end - start)));
        root.style.setProperty(`--scene-${name}`, local.toFixed(4));
      }
    };

    const schedule = () => {
      if (visible && !frame) frame = requestAnimationFrame(update);
    };

    const intersection = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) schedule();
    });

    // Fonts, images and breakpoints change the geometry: re-measure with them.
    const resize = new ResizeObserver(() => {
      measure();
      schedule();
    });

    intersection.observe(root);
    resize.observe(root);
    resize.observe(pin);
    window.addEventListener('scroll', schedule, { passive: true });
    measure();
    update();

    return () => {
      intersection.disconnect();
      resize.disconnect();
      window.removeEventListener('scroll', schedule);
      if (frame) cancelAnimationFrame(frame);
      for (const property of Array.from(root.style)) {
        if (property.startsWith('--scene')) root.style.removeProperty(property);
      }
    };
  }, [ref, reduced, phases, pinShare]);
}
