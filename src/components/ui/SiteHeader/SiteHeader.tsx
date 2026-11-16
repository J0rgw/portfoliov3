import { ui, messages } from '../../../config/ui';
import { useEffect, useRef, useState } from 'react';
import Monogram from '../../graphics/Monogram/Monogram';
import StaggeredMenu from '../StaggeredMenu/StaggeredMenu';
import { chapterHref, chapters, pages } from '../../../config/navigation';
import { site } from '../../../config/site';
import '../../../design/components/SiteHeader/SiteHeader.css';

/** What lies under the header. */
interface Behind {
  /** `data-ground` of the innermost ground under the strip's edge; none means the page ground. */
  ground?: string;
  /** An `.on-night` ground under the strip's edge: the navigation takes paper ink. */
  night: boolean;
  /** A `[data-header-clear]` zone (the hero's pinned run) on the middle line: full size, no strip. */
  clear: boolean;
}

const GROUNDS = '[data-ground], .on-night, [data-header-clear]';

/** The strip's ground: the innermost ground on its bottom edge. */
function readGround(crossing: Set<Element>): Pick<Behind, 'ground' | 'night'> {
  const list = [...crossing];
  // Grounds can nest (a paper insert inside a chapter): the innermost one shows.
  const inner = list.find((element) => !list.some((other) => other !== element && element.contains(other)));
  if (!(inner instanceof HTMLElement)) return { night: false };
  const night = inner.classList.contains('on-night');
  return { ground: night ? undefined : inner.dataset.ground, night };
}

/** Where the header is: over the hero's pinned run or not. */
function readPlace(crossing: Set<Element>): Pick<Behind, 'clear'> {
  return { clear: [...crossing].some((element) => element.hasAttribute('data-header-clear')) };
}

const sameBehind = (a: Behind, b: Behind) => a.ground === b.ground && a.night === b.night && a.clear === b.clear;

/** The page a path belongs to: a case study belongs to Proyectos. */
const pageOf = (path: string) =>
  pages.find((page) => (page.path === '/' ? path === '/' : path.startsWith(page.path)));

/**
 * Persistent header on every page: the JA monogram (home, back to the top), the
 * contact action and the menu. Keeps its own view-transition name so it stays
 * put while the page changes underneath (references.md #16).
 *
 * Over the hero's pinned run (`[data-header-clear]`) it is only type.
 * Everywhere else it is compact (`data-compact`, 2026-11-11) and lays a solid
 * strip of the ground behind it, cut straight at its bottom edge, so whatever
 * scrolls beneath goes under the strip. The ground is read on that edge, so
 * the strip always matches what shows right below it: an `.on-night` section
 * (back cover, footer) sets `data-tone="night"` (paper ink), any other
 * `[data-ground]` section names its ground in `data-nav-ground`. The hero's run
 * is read on the header's middle line. The menu lists the pages (ADR-003) and
 * marks the one being read; Proyectos and Servicios also stand beside Hablemos
 * as words (Jorge's pick, Q58), the one being read underlined. Two IntersectionObservers whose roots are those one-pixel lines; no
 * scroll listener, no layout reads while scrolling.
 */
export function SiteHeader({ path }: { path: string }) {
  const headerRef = useRef<HTMLElement>(null);
  // Server and first client render: full size, no strip and no chapter, the hero's (and the no-JS) header.
  const [behind, setBehind] = useState<Behind>({ night: false, clear: true });

  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const targets = new Set<HTMLElement>(document.querySelectorAll<HTMLElement>(GROUNDS));
    if (!targets.size) {
      setBehind({ night: false, clear: false });
      return;
    }

    const onMiddle = new Set<Element>();
    const onEdge = new Set<Element>();
    let observers: IntersectionObserver[] = [];
    let frame = 0;

    const update = () => {
      const next = { ...readGround(onEdge), ...readPlace(onMiddle) };
      setBehind((current) => (sameBehind(current, next) ? current : next));
    };

    // A one-pixel line across the viewport, `top` pixels down; `crossing` keeps the targets on it.
    const line = (top: number, crossing: Set<Element>) => {
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) crossing.add(entry.target);
            else crossing.delete(entry.target);
          }
          update();
        },
        { rootMargin: `-${top}px 0px -${Math.max(window.innerHeight - top - 1, 0)}px 0px` },
      );
      targets.forEach((target) => observer.observe(target));
      return observer;
    };

    const observe = () => {
      frame = 0;
      observers.forEach((observer) => observer.disconnect());
      onMiddle.clear();
      onEdge.clear();
      // The compact strip's height, registered in px (SiteHeader.css).
      const compact = getComputedStyle(header).getPropertyValue('--nav-compact').trim();
      const edge = compact.endsWith('px') ? parseFloat(compact) : header.offsetHeight;
      observers = [
        line(Math.round(header.offsetHeight / 2), onMiddle),
        line(Math.max(Math.round(edge) - 1, 0), onEdge),
      ];
    };

    // The lines' positions depend on the viewport height.
    const onResize = () => {
      if (!frame) frame = requestAnimationFrame(observe);
    };

    observe();
    window.addEventListener('resize', onResize);
    return () => {
      observers.forEach((observer) => observer.disconnect());
      window.removeEventListener('resize', onResize);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const contact = chapters.find((chapter) => chapter.id === 'contacto');
  const menuItems = [
    ...pages.map((page) => ({ label: page.label, href: page.path })),
    ...(contact ? [{ label: contact.label, href: chapterHref(contact.id) }] : []),
  ];
  const current = pageOf(path);
  // The words beside Hablemos: the pages after the home (the bonus stays in the menu and the footer).
  const words = pages.filter((page) => page.id === 'proyectos' || page.id === 'servicios');

  return (
    <header
      className="site-header"
      data-tone={behind.night ? 'night' : undefined}
      data-nav-ground={behind.ground}
      data-compact={behind.clear ? undefined : ''}
      ref={headerRef}
    >
      <div className="site-header__bar">
        <a className="site-header__logo" href="/" aria-label={messages.homeLabel(site.name)}>
          <Monogram className="site-header__mark" />
        </a>
        <div className="site-header__actions">
          {words.map((page) => (
            <a
              key={page.id}
              className="site-header__page"
              href={page.path}
              aria-current={page === current ? 'page' : undefined}
            >
              {page.label}
            </a>
          ))}
          <a className="site-header__cta" href={chapterHref('contacto')}>{ui.navigation.talk} </a>
          <a className="site-header__index" href="#tracklist">{ui.navigation.index} </a>
          <StaggeredMenu items={menuItems} currentHref={current?.path} />
        </div>
      </div>
    </header>
  );
}

export default SiteHeader;
