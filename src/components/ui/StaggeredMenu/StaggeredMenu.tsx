import { motion } from '../../../design/motion';
import { ui } from '../../../config/ui';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { loadGsap, prefetchGsap, type Gsap } from '../motion/gsap';
import { scrollToTarget } from '../motion/SmoothScroll';
import { prefersReducedMotion } from '../motion/useReducedMotion';
import { useTextSwap } from '../motion/useTextSwap';
import '../../../design/components/StaggeredMenu/StaggeredMenu.css';

export interface StaggeredMenuItem {
  label: string;
  href: string;
}

export interface StaggeredMenuProps {
  items: StaggeredMenuItem[];
  /** Href of the home chapter in view (`/#proceso`), to mark it. */
  currentHref?: string;
}

type Animation = { kill: () => void };

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * The menu panel: the chapters only, as Kerimov-style hairline rows, without
 * numbers (2026-11-11: the project list, the availability line and the social
 * links left the panel). Kept from the original StaggeredMenu: the staggered
 * prelayers, the panel slide and the rising item labels; the toggle's words
 * swap like the site's other changing text (useTextSwap). Restyled to the album
 * identity and rebuilt as a modal dialog: inert when closed, focus moves in,
 * Tab is contained, Escape closes and returns focus. See
 * docs/INFORMATION_ARCHITECTURE.md §4.
 *
 * The closed state lives in CSS, so the panel is hidden from the first paint
 * and GSAP is only fetched (on idle, or on first use) to animate it.
 */
export const StaggeredMenu: React.FC<StaggeredMenuProps> = ({ items, currentHref }) => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const preLayersRef = useRef<HTMLDivElement | null>(null);
  const iconRef = useRef<HTMLSpanElement | null>(null);
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const [label, labelSwap] = useTextSwap(open ? ui.navigation.close : ui.navigation.menu);
  const animationsRef = useRef<{ open?: Animation; close?: Animation; spin?: Animation }>({});

  const layers = () => Array.from(preLayersRef.current?.querySelectorAll<HTMLElement>('.sm-prelayer') ?? []);
  const itemLabels = () => Array.from(panelRef.current?.querySelectorAll<HTMLElement>('.sm-panel-itemLabel') ?? []);

  useEffect(() => prefetchGsap(), []);

  /** Closed resting state. `x: 0` neutralises the stylesheet's translateX(100%). */
  const setClosedState = useCallback((gsap: Gsap) => {
    const panel = panelRef.current;
    if (!panel) return;
    gsap.set([...layers(), panel], { x: 0, xPercent: 100 });
    gsap.set(itemLabels(), { y: 0, yPercent: 140, rotate: 10 });
  }, []);

  const playOpen = useCallback(
    (gsap: Gsap) => {
      const panel = panelRef.current;
      if (!panel) return;
      animationsRef.current.open?.kill();
      animationsRef.current.close?.kill();

      if (prefersReducedMotion()) {
        gsap.set([...layers(), panel], { x: 0, xPercent: 0 });
        gsap.set(itemLabels(), { y: 0, yPercent: 0, rotate: 0 });
        return;
      }

      setClosedState(gsap);
      const layerEls = layers();
      const tl = gsap.timeline();
      layerEls.forEach((el, i) => {
        tl.to(el, { xPercent: 0, duration: motion.menu.layer, ease: 'power4.out' }, i * motion.menu.layerStagger);
      });
      const panelAt = layerEls.length ? (layerEls.length - 1) * 0.07 + 0.08 : 0;
      const panelDuration = motion.menu.panel;
      tl.to(panel, { xPercent: 0, duration: panelDuration, ease: 'power4.out' }, panelAt);

      const itemsAt = panelAt + panelDuration * 0.15;
      tl.to(itemLabels(), { yPercent: 0, rotate: 0, duration: motion.menu.label, ease: 'power4.out', stagger: motion.menu.labelStagger }, itemsAt);
      animationsRef.current.open = tl;
    },
    [setClosedState],
  );

  const playClose = useCallback(
    (gsap: Gsap) => {
      const panel = panelRef.current;
      if (!panel) return;
      animationsRef.current.open?.kill();
      animationsRef.current.close?.kill();

      if (prefersReducedMotion()) {
        setClosedState(gsap);
        return;
      }

      animationsRef.current.close = gsap.to([...layers(), panel], {
        xPercent: 100,
        duration: motion.menu.close,
        ease: 'power3.in',
        overwrite: 'auto',
        onComplete: () => setClosedState(gsap),
      });
    },
    [setClosedState],
  );

  const animateToggle = useCallback((gsap: Gsap, opening: boolean) => {
    const icon = iconRef.current;
    if (!icon) return;
    animationsRef.current.spin?.kill();
    animationsRef.current.spin = gsap.to(icon, {
      rotate: opening ? 225 : 0,
      duration: prefersReducedMotion() ? 0 : opening ? motion.menu.spinOpen : motion.menu.spinClose,
      ease: opening ? 'power4.out' : 'power3.inOut',
      overwrite: 'auto',
    });
  }, []);

  const setMenuOpen = useCallback(
    (next: boolean) => {
      if (openRef.current === next) return;
      openRef.current = next;
      setOpen(next);
      document.documentElement.classList.toggle('menu-open', next);
      void loadGsap().then((gsap) => {
        // A quick double toggle may resolve out of order: honour the latest state.
        if (openRef.current !== next) return;
        if (next) playOpen(gsap);
        else playClose(gsap);
        animateToggle(gsap, next);
      });
    },
    [playOpen, playClose, animateToggle],
  );

  const closeMenu = useCallback(() => setMenuOpen(false), [setMenuOpen]);

  /** Focus moves into the dialog on open. */
  useEffect(() => {
    if (!open) return;
    // focus() is silently ignored until the panel's (inherited) visibility has
    // flipped, which can take a few frames: retry each frame until it sticks.
    let frame = 0;
    let tries = 0;
    const tryFocus = () => {
      const first = panelRef.current?.querySelector<HTMLElement>(FOCUSABLE);
      if (!first) return;
      first.focus({ preventScroll: true });
      if (document.activeElement !== first && tries++ < 40) frame = requestAnimationFrame(tryFocus);
    };
    const id = window.setTimeout(tryFocus, prefersReducedMotion() ? 0 : 180);
    return () => {
      window.clearTimeout(id);
      cancelAnimationFrame(frame);
    };
  }, [open]);

  /** Escape closes; Tab stays inside the toggle and the panel. */
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeMenu();
        toggleBtnRef.current?.focus();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusables = [
        toggleBtnRef.current,
        ...Array.from(panelRef.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []),
      ].filter((el): el is HTMLElement => el !== null);
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement as HTMLElement | null;
      const inside = active ? focusables.includes(active) : false;
      if (event.shiftKey && (active === first || !inside)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !inside)) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open, closeMenu]);

  /** Coming back through the back/forward cache must not restore an open menu. */
  useEffect(() => {
    const onPageShow = (event: PageTransitionEvent) => {
      if (!event.persisted || !openRef.current) return;
      openRef.current = false;
      setOpen(false);
      document.documentElement.classList.remove('menu-open');
      void loadGsap().then((gsap) => {
        setClosedState(gsap);
        animateToggle(gsap, false);
      });
    };
    window.addEventListener('pageshow', onPageShow);
    return () => window.removeEventListener('pageshow', onPageShow);
  }, [setClosedState, animateToggle]);

  useEffect(() => {
    const animations = animationsRef.current;
    return () => {
      Object.values(animations).forEach((animation) => animation?.kill());
      document.documentElement.classList.remove('menu-open');
    };
  }, []);

  /**
   * Links to home chapters are absolute ("/#proyectos") so they work from any
   * page. On the home page, close the panel and scroll ourselves: a raw hash
   * jump would fight the close animation.
   */
  const handleNavClick = useCallback(
    (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
      const url = new URL(href, window.location.href);
      const samePage = url.pathname === window.location.pathname && url.hash.length > 1;
      if (!samePage) {
        closeMenu();
        return;
      }
      const target = document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (!target) return;
      event.preventDefault();
      closeMenu();
      scrollToTarget(target);
      if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    },
    [closeMenu],
  );

  return (
    <>
      <button
        ref={toggleBtnRef}
        className="sm-toggle"
        aria-label={open ? ui.navigation.closeMenu : ui.navigation.openMenu}
        aria-expanded={open}
        aria-controls="site-menu"
        onClick={() => setMenuOpen(!openRef.current)}
        type="button"
      >
        <span className="sm-toggle-text" aria-hidden="true" data-swap={labelSwap}>
          {label}
        </span>
        <span ref={iconRef} className="sm-icon" aria-hidden="true">
          <span className="sm-icon-line" />
          <span className="sm-icon-line sm-icon-line-v" />
        </span>
      </button>

      <div className="sm-layer" data-open={open || undefined}>
        <div className="sm-backdrop" onClick={closeMenu} aria-hidden="true" />
        <div ref={preLayersRef} className="sm-prelayers" aria-hidden="true">
          <div className="sm-prelayer sm-prelayer--foil" />
          <div className="sm-prelayer sm-prelayer--brand" />
        </div>

        <div
          id="site-menu"
          ref={panelRef}
          className="sm-panel"
          role="dialog"
          aria-modal="true"
          aria-label={ui.navigation.menu}
          inert={!open}
          data-lenis-prevent
        >
          <div className="sm-panel-inner">
            {/* No label over the chapters: the rows say what they are. */}
            <nav aria-label={ui.navigation.chapters}>
              <ol className="sm-panel-list" role="list">
                {items.map((item) => (
                  <li className="sm-panel-itemWrap" key={item.href}>
                    <a
                      className="sm-panel-item"
                      href={item.href}
                      aria-current={item.href === currentHref ? 'location' : undefined}
                      onClick={(event) => handleNavClick(event, item.href)}
                    >
                      <span className="sm-panel-itemLabel">{item.label}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
};

export default StaggeredMenu;
