import { motion } from '../../../design/motion';
import { useEffect, useRef, useState, type RefObject } from 'react';
import { prefersReducedMotion } from './useReducedMotion';

/**
 * Drag, inertia and snapping for a row of items (MOTION_SYSTEM §2.2).
 *
 * The carousel owns one fractional `position` (0 … count − 1) and one
 * selected `index`. Drag, buttons, keys and clicks all go through the same
 * controller, so the selection can never drift from what is on screen. The
 * position is rendered imperatively, at most once per frame, through
 * `render`; React only hears about it when the selection changes
 * (`onIndex`) and when motion starts or stops (`onMotion`).
 *
 * Feel: the drag follows the pointer 1:1, a flick is projected forward
 * (iOS-style decay) to pick the item, and a critically damped spring carries
 * the remaining velocity to it, so it decelerates without overshooting.
 * Past the first and last item the drag meets a short resistance. Reduced
 * motion: the drag still follows the pointer (direct manipulation), every
 * other change is instant. No loop runs while nothing moves.
 */

export interface CarouselOptions {
  count: number;
  /** Writes the visual state for a fractional position. */
  render: (position: number) => void;
  /** Horizontal pixels of drag that move the row by one item. */
  stepPx: () => number;
  /** The selection changed (drag, release, buttons, keys, clicks). */
  onIndex: (index: number) => void;
  /** The row started (true) or stopped (false) moving. */
  onMotion?: (moving: boolean) => void;
}

export interface CarouselController {
  /** Moves to an item; instant under reduced motion or when asked. */
  goTo: (index: number, options?: { instant?: boolean }) => void;
  step: (delta: number) => void;
  /** The selected item (the one the row is at or heading to). */
  index: () => number;
  /** Renders the current position again (after a layout change). */
  redraw: () => void;
}

/** Spring stiffness: settles in ~0.5 s, never overshoots. */
const OMEGA = motion.snap.omega;
/** How far a flick is projected forward, in seconds of its velocity. */
const PROJECTION = 0.24;
/** A flick carries the row at most this many items past where it was let go. */
const MAX_FLICK = 1;
/** Pointer travel (px) before a press becomes a drag instead of a click. */
const DRAG_THRESHOLD = 6;
/** Furthest the row can be pulled past either end, in items. */
const EDGE_STRETCH = 0.32;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/** Resistance past the ends: 1:1 at first, approaching EDGE_STRETCH. */
const rubber = (overshoot: number) => (EDGE_STRETCH * overshoot) / (overshoot + EDGE_STRETCH * 2.2);

function createCarousel(options: RefObject<CarouselOptions>) {
  let position = 0;
  let velocity = 0;
  let target = 0;
  let index = 0;
  let frame = 0;
  let last = 0;
  let moving = false;

  const opts = () => options.current!;
  const maxIndex = () => opts().count - 1;

  const setMoving = (value: boolean) => {
    if (moving === value) return;
    moving = value;
    opts().onMotion?.(value);
  };

  const select = (next: number) => {
    if (next === index) return;
    index = next;
    opts().onIndex(next);
  };

  const stop = () => {
    cancelAnimationFrame(frame);
    frame = 0;
  };

  // Critically damped spring, solved exactly for each frame's dt so a slow
  // frame cannot make it unstable.
  const tick = (now: number) => {
    const dt = Math.min((now - last) / 1000, 1 / 20);
    last = now;
    const x0 = position - target;
    const decay = Math.exp(-OMEGA * dt);
    const c = velocity + OMEGA * x0;
    const x = (x0 + c * dt) * decay;
    velocity = (velocity - OMEGA * c * dt) * decay;
    position = target + x;
    // Within a pixel or so of the target: land on it.
    if (Math.abs(x) < 0.002 && Math.abs(velocity) < 0.02) {
      position = target;
      velocity = 0;
      opts().render(position);
      frame = 0;
      setMoving(false);
      return;
    }
    opts().render(position);
    frame = requestAnimationFrame(tick);
  };

  const settleTo = (next: number, initialVelocity: number) => {
    target = clamp(next, 0, maxIndex());
    select(target);
    if (prefersReducedMotion()) {
      stop();
      position = target;
      velocity = 0;
      opts().render(position);
      setMoving(false);
      return;
    }
    // A velocity faster than the spring could absorb would carry the row
    // past the target and back: cap it, so the arrival never bounces.
    const distance = target - position;
    velocity =
      Math.sign(initialVelocity) === Math.sign(distance)
        ? Math.sign(distance) * Math.min(Math.abs(initialVelocity), OMEGA * Math.abs(distance))
        : initialVelocity * 0.5;
    if (Math.abs(distance) < 0.0005 && Math.abs(velocity) < 0.005) {
      position = target;
      opts().render(position);
      setMoving(false);
      return;
    }
    setMoving(true);
    if (!frame) {
      last = performance.now();
      frame = requestAnimationFrame(tick);
    }
  };

  /* ---- Drag ------------------------------------------------------------- */

  let pointerId: number | null = null;
  let dragging = false;
  let startX = 0;
  let startY = 0;
  let startPosition = 0;
  let pendingRender = 0;
  let samples: { t: number; p: number }[] = [];
  let suppressClick = false;

  const scheduleRender = () => {
    if (pendingRender) return;
    pendingRender = requestAnimationFrame(() => {
      pendingRender = 0;
      opts().render(position);
    });
  };

  const onPointerDown = (event: PointerEvent) => {
    if (event.pointerType === 'mouse' && event.button !== 0) return;
    if (pointerId !== null) return;
    pointerId = event.pointerId;
    dragging = false;
    suppressClick = false;
    startX = event.clientX;
    startY = event.clientY;
  };

  const onPointerMove = (event: PointerEvent, surface: HTMLElement) => {
    if (event.pointerId !== pointerId) return;
    const dx = event.clientX - startX;
    if (!dragging) {
      const dy = event.clientY - startY;
      if (Math.abs(dx) < DRAG_THRESHOLD && Math.abs(dy) < DRAG_THRESHOLD) return;
      // Mostly vertical: a scroll (touch never gets here, the browser pans).
      if (Math.abs(dy) > Math.abs(dx)) {
        pointerId = null;
        return;
      }
      // Catch the row where it is, even mid-flight, and follow from there.
      dragging = true;
      suppressClick = true;
      stop();
      velocity = 0;
      startX = event.clientX;
      startPosition = position;
      samples = [];
      surface.setPointerCapture(event.pointerId);
      setMoving(true);
    }
    const raw = startPosition - (event.clientX - startX) / Math.max(1, opts().stepPx());
    const max = maxIndex();
    position = raw < 0 ? -rubber(-raw) : raw > max ? max + rubber(raw - max) : raw;
    const now = performance.now();
    samples.push({ t: now, p: position });
    while (samples.length > 2 && now - samples[0].t > 100) samples.shift();
    select(clamp(Math.round(position), 0, max));
    scheduleRender();
  };

  const release = (event: PointerEvent, withVelocity: boolean) => {
    if (event.pointerId !== pointerId) return;
    pointerId = null;
    if (!dragging) return;
    dragging = false;
    let flick = 0;
    if (withVelocity && samples.length > 1) {
      const first = samples[0];
      const latest = samples[samples.length - 1];
      const span = (latest.t - first.t) / 1000;
      // A pointer that stopped before letting go carries no flick.
      if (span > 0 && performance.now() - latest.t < 80) flick = (latest.p - first.p) / span;
    }
    settleTo(Math.round(position + clamp(flick * PROJECTION, -MAX_FLICK, MAX_FLICK)), flick);
  };

  return {
    controller: {
      goTo: (next: number, options?: { instant?: boolean }) => {
        if (options?.instant) {
          stop();
          target = clamp(next, 0, maxIndex());
          position = target;
          velocity = 0;
          select(target);
          opts().render(position);
          setMoving(false);
          return;
        }
        settleTo(next, velocity);
      },
      step: (delta: number) => settleTo(target + delta, velocity),
      index: () => index,
      redraw: () => opts().render(position),
    } satisfies CarouselController,

    /** Wires pointer handling to the drag surface; returns the cleanup. */
    attach(surface: HTMLElement) {
      const down = (event: PointerEvent) => onPointerDown(event);
      const move = (event: PointerEvent) => onPointerMove(event, surface);
      const up = (event: PointerEvent) => release(event, true);
      const cancel = (event: PointerEvent) => release(event, false);
      // Taking the capture from a touch's original target fires this on that
      // target too: only the surface losing its own capture ends the drag.
      const lost = (event: PointerEvent) => event.target === surface && release(event, false);
      // A drag must never end in a click on whatever lies under the pointer.
      const click = (event: MouseEvent) => {
        if (!suppressClick) return;
        suppressClick = false;
        event.preventDefault();
        event.stopPropagation();
      };
      // Links and images are natively draggable; that would cancel the drag.
      const dragStart = (event: DragEvent) => event.preventDefault();
      surface.addEventListener('pointerdown', down);
      surface.addEventListener('pointermove', move);
      surface.addEventListener('pointerup', up);
      surface.addEventListener('pointercancel', cancel);
      surface.addEventListener('lostpointercapture', lost);
      surface.addEventListener('click', click, true);
      surface.addEventListener('dragstart', dragStart);
      return () => {
        surface.removeEventListener('pointerdown', down);
        surface.removeEventListener('pointermove', move);
        surface.removeEventListener('pointerup', up);
        surface.removeEventListener('pointercancel', cancel);
        surface.removeEventListener('lostpointercapture', lost);
        surface.removeEventListener('click', click, true);
        surface.removeEventListener('dragstart', dragStart);
        stop();
        cancelAnimationFrame(pendingRender);
        pendingRender = 0;
      };
    },
  };
}

/**
 * Binds a carousel to a drag surface. The controller is stable across
 * renders; the options may change freely (they are read through a ref).
 */
export function useDiscCarousel(surfaceRef: RefObject<HTMLElement | null>, options: CarouselOptions): CarouselController {
  const optionsRef = useRef(options);
  const [carousel] = useState(() => createCarousel(optionsRef));

  // Handlers read the latest options; they only run after effects have.
  useEffect(() => {
    optionsRef.current = options;
  });

  useEffect(() => {
    const surface = surfaceRef.current;
    if (!surface) return;
    return carousel.attach(surface);
  }, [carousel, surfaceRef]);

  return carousel.controller;
}
