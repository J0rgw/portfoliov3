import { ui, messages } from '../../../config/ui';
import { useEffect, useRef, useState } from 'react';
import Monogram from '../../graphics/Monogram/Monogram';
import StaggeredMenu from '../StaggeredMenu/StaggeredMenu';
import { chapters, chapterHref } from '../../../config/navigation';
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
  /** The home chapter on the middle line, marked in the menu. */
  chapter?: string;
}

const GROUNDS = '[data-ground], .on-night, [data-header-clear]';
const CHAPTER_IDS = new Set(chapters.map((chapter) => chapter.id));

/** The strip's ground: the innermost ground on its bottom edge. */
function readGround(crossing: Set<Element>): Pick<Behind, 'ground' | 'night'> {
  const list = [...crossing];
  // Grounds can nest (a paper insert inside a chapter): the innermost one shows.
  const inner = list.find((element) => !list.some((other) => other !== element && element.contains(other)));
  if (!(inner instanceof HTMLElement)) return { night: false };
  const night = inner.classList.contains('on-night');
  return { ground: night ? undefined : inner.dataset.ground, night };
}

/** Where the header is: over the hero's pinned run, in which chapter. */
function readPlace(crossing: Set<Element>): Pick<Behind, 'clear' | 'chapter'> {
  const list = [...crossing];
  return {
    clear: list.some((element) => element.hasAttribute('data-header-clear')),
    chapter: list.find((element) => CHAPTER_IDS.has(element.id))?.id,
  };
}

const sameBehind = (a: Behind, b: Behind) =>
  a.ground === b.ground && a.night === b.night && a.clear === b.clear && a.chapter === b.chapter;

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
 * and, on home, the chapter marked in the menu are read on the header's middle
 * line. Two IntersectionObservers whose roots are those one-pixel lines; no
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
    for (const chapter of chapters) {
      const section = document.getElementById(chapter.id);
      if (section) targets.add(section);
    }
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

  const menuItems = [
    { label: ui.navigation.home, href: '/#inicio' },
    ...chapters.map((chapter) => ({ label: chapter.label, href: chapterHref(chapter.id) })),
  ];

  const onHome = path === '/';
  const current = onHome ? chapters.find((chapter) => chapter.id === behind.chapter) : undefined;
  const currentChapterHref = !onHome ? undefined : behind.clear ? '/#inicio' : current ? chapterHref(current.id) : undefined;

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
          <a className="site-header__cta" href={chapterHref('contacto')}>{ui.navigation.talk} </a>
          <a className="site-header__index" href="#tracklist">{ui.navigation.index} </a>
          <StaggeredMenu items={menuItems} currentHref={currentChapterHref} />
        </div>
      </div>
    </header>
  );
}

export default SiteHeader;
