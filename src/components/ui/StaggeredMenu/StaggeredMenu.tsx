import { motion } from '../../../design/motion';
import { ui } from '../../../config/ui';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { socialIcons, type SocialIconName } from '../Icon/Icon';
import { loadGsap, prefetchGsap, type Gsap } from '../motion/gsap';
import { scrollToTarget } from '../motion/SmoothScroll';
import { prefersReducedMotion } from '../motion/useReducedMotion';
import '../../../design/components/StaggeredMenu/StaggeredMenu.css';

export interface StaggeredMenuItem {
  label: string;
  href: string;
  number: string;
}

export interface StaggeredMenuProject {
  label: string;
  href: string;
  number: string;
  detail: string;
}

export interface StaggeredMenuSocialItem {
  label: string;
  href: string;
  icon?: SocialIconName;
}

export interface StaggeredMenuProps {
  items: StaggeredMenuItem[];
  projects?: StaggeredMenuProject[];
  socialItems?: StaggeredMenuSocialItem[];
  availability?: string;
  /** Path of the current page, to mark the current project. */
  currentPath?: string;
  /** Href of the home chapter in view (`/#proceso`), to mark it like the current project. */
  currentHref?: string;
}

type Animation = { kill: () => void };

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * The menu panel ("tracklist"). Kept from the original StaggeredMenu: the
 * staggered prelayers, the panel slide, the rising item labels and the item
 * numbering (Kerimov-style rows). Restyled to the album identity and rebuilt
 * as a modal dialog: inert when closed, focus moves in, Tab is contained,
 * Escape closes and returns focus. See docs/INFORMATION_ARCHITECTURE.md §4.
 *
 * The closed state lives in CSS, so the panel is hidden from the first paint
 * and GSAP is only fetched (on idle, or on first use) to animate it.
 */
export const StaggeredMenu: React.FC<StaggeredMenuProps> = ({
  items,
  projects = [],
  socialItems = [],
  availability,
  currentPath = '/',
  currentHref,
}) => {
  const [open, setOpen] = useState(false);
  const openRef = useRef(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const preLayersRef = useRef<HTMLDivElement | null>(null);
  const iconRef = useRef<HTMLSpanElement | null>(null);
  const textInnerRef = useRef<HTMLSpanElement | null>(null);
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);
  const [textLines, setTextLines] = useState<string[]>([ui.navigation.menu, ui.navigation.close]);
  const animationsRef = useRef<{ open?: Animation; close?: Animation; spin?: Animation; text?: Animation }>({});

  const layers = () => Array.from(preLayersRef.current?.querySelectorAll<HTMLElement>('.sm-prelayer') ?? []);
  const itemLabels = () => Array.from(panelRef.current?.querySelectorAll<HTMLElement>('.sm-panel-itemLabel') ?? []);
  const numberEls = () => Array.from(panelRef.current?.querySelectorAll<HTMLElement>('.sm-panel-item') ?? []);
  const revealEls = () => Array.from(panelRef.current?.querySelectorAll<HTMLElement>('[data-menu-reveal]') ?? []);

  useEffect(() => prefetchGsap(), []);

  /** Closed resting state. `x: 0` neutralises the stylesheet's translateX(100%). */
  const setClosedState = useCallback((gsap: Gsap) => {
    const panel = panelRef.current;
    if (!panel) return;
    gsap.set([...layers(), panel], { x: 0, xPercent: 100 });
    gsap.set(itemLabels(), { y: 0, yPercent: 140, rotate: 10 });
    gsap.set(numberEls(), { '--sm-num-opacity': 0 });
    gsap.set(revealEls(), { y: 25, opacity: 0 });
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
        gsap.set(numberEls(), { '--sm-num-opacity': 1 });
        gsap.set(revealEls(), { y: 0, opacity: 1 });
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
      tl.to(numberEls(), { '--sm-num-opacity': 1, duration: motion.menu.number, ease: 'power2.out', stagger: motion.menu.numberStagger }, itemsAt + 0.1);
      tl.to(revealEls(), { y: 0, opacity: 1, duration: motion.menu.reveal, ease: 'power3.out', stagger: motion.menu.revealStagger }, panelAt + panelDuration * 0.4);
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
    const inner = textInnerRef.current;
    const instant = prefersReducedMotion();

    if (icon) {
      animationsRef.current.spin?.kill();
      animationsRef.current.spin = gsap.to(icon, {
        rotate: opening ? 225 : 0,
        duration: instant ? 0 : opening ? motion.menu.spinOpen : motion.menu.spinClose,
        ease: opening ? 'power4.out' : 'power3.inOut',
        overwrite: 'auto',
      });
    }

    if (!inner) return;
    animationsRef.current.text?.kill();
    const target = opening ? ui.navigation.close : ui.navigation.menu;
    if (instant) {
      setTextLines([target]);
      gsap.set(inner, { yPercent: 0 });
      return;
    }
    const from = opening ? ui.navigation.menu : ui.navigation.close;
    const sequence = [from, target, from, target];
    setTextLines(sequence);
    gsap.set(inner, { yPercent: 0 });
    const shift = ((sequence.length - 1) / sequence.length) * 100;
    animationsRef.current.text = gsap.to(inner, {
      yPercent: -shift,
      duration: motion.menu.layer + sequence.length * motion.menu.layerStagger,
      ease: 'power4.out',
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
        <span className="sm-toggle-textWrap" aria-hidden="true">
          <span ref={textInnerRef} className="sm-toggle-textInner">
            {textLines.map((line, i) => (
              <span className="sm-toggle-line" key={i}>
                {line}
              </span>
            ))}
          </span>
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
            {/* No label over the chapters: the rows say what they are. The projects
                below keep theirs, as a second list of a different kind. */}
            <nav aria-label={ui.navigation.chapters}>
              <ol className="sm-panel-list" role="list">
                {items.map((item) => (
                  <li className="sm-panel-itemWrap" key={item.href}>
                    <a
                      className="sm-panel-item"
                      href={item.href}
                      data-number={item.number}
                      aria-current={item.href === currentHref ? 'location' : undefined}
                      onClick={(event) => handleNavClick(event, item.href)}
                    >
                      <span className="sm-panel-itemLabel">{item.label}</span>
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            {projects.length > 0 && (
              <nav className="sm-projects" aria-label={ui.navigation.projects}>
                <p className="label" data-menu-reveal>{ui.navigation.projects} </p>
                <ul role="list">
                  {projects.map((project) => (
                    <li key={project.href} data-menu-reveal>
                      <a
                        className="sm-project"
                        href={project.href}
                        aria-current={project.href === currentPath ? 'page' : undefined}
                        onClick={(event) => handleNavClick(event, project.href)}
                      >
                        <span className="sm-project__number mono">{project.number}</span>
                        <span className="sm-project__title">{project.label}</span>
                        <span className="sm-project__detail">{project.detail}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}

            {(availability || socialItems.length > 0) && (
              <div className="sm-socials">
                {availability && (
                  <p className="sm-availability" data-menu-reveal>
                    <span className="sm-availability__dot" aria-hidden="true" />
                    {availability}
                  </p>
                )}
                <ul className="sm-socials-list" role="list">
                  {socialItems.map((social) => {
                    const SocialIcon = social.icon ? socialIcons[social.icon] : null;
                    const external = social.href.startsWith('http');
                    return (
                      <li key={social.label} data-menu-reveal>
                        <a
                          href={social.href}
                          className="sm-socials-link"
                          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                        >
                          {SocialIcon && <SocialIcon size={16} aria-hidden="true" />}
                          <span>{social.label}</span>
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default StaggeredMenu;
