import { ui, messages } from '../../../config/ui';
import { useEffect, useRef, useState } from 'react';
import Monogram from '../../graphics/Monogram/Monogram';
import StaggeredMenu from '../StaggeredMenu/StaggeredMenu';
import { chapters, chapterHref } from '../../../config/navigation';
import { formatTrack, projectHref, projects } from '../../../config/projects';
import { site, socials } from '../../../config/site';
import '../../../design/components/SiteHeader/SiteHeader.css';

/** What lies under the header's middle line. */
interface Behind {
  /** `data-ground` of the innermost ground there; none means the page ground. */
  ground?: string;
  /** An `.on-night` ground: the navigation takes paper ink. */
  night: boolean;
  /** A `[data-header-clear]` zone (the hero's pinned run): no veil. */
  clear: boolean;
  /** The home chapter there, for the track readout and the menu. */
  chapter?: string;
}

const GROUNDS = '[data-ground], .on-night, [data-header-clear]';
const CHAPTER_IDS = new Set(chapters.map((chapter) => chapter.id));

function readBehind(crossing: Set<Element>): Behind {
  const list = [...crossing];
  // Grounds can nest (a paper insert inside a chapter): the innermost one shows.
  const inner = list.find((element) => !list.some((other) => other !== element && element.contains(other)));
  const clear = list.some((element) => element.hasAttribute('data-header-clear'));
  const chapter = list.find((element) => CHAPTER_IDS.has(element.id))?.id;
  if (!(inner instanceof HTMLElement)) return { night: false, clear, chapter };
  const night = inner.classList.contains('on-night');
  return { ground: night ? undefined : inner.dataset.ground, night, clear, chapter };
}

const sameBehind = (a: Behind, b: Behind) =>
  a.ground === b.ground && a.night === b.night && a.clear === b.clear && a.chapter === b.chapter;

/**
 * Persistent header on every page: the JA monogram (home), the track playing,
 * the contact action and the menu. Keeps its own view-transition name so it
 * stays put while the page changes underneath (references.md #16).
 *
 * It has no ground of its own (ART_DIRECTION §9), so it follows the ground
 * behind it. While an `.on-night` section (back cover, footer) crosses the
 * header's middle line, `data-tone="night"` switches the navigation to paper
 * ink; any other `[data-ground]` section names its ground in `data-ground`.
 * Past the hero's pinned run (`[data-header-clear]`), `data-veil` lays a strip
 * of that ground under the type, so text scrolling beneath never collides
 * with the mark or the links. On home, the chapter crossing the line is shown
 * as the track playing, like a CD player's display, and marked in the menu
 * (2026-11-10). One IntersectionObserver whose root is that one-pixel line; no
 * scroll listener, no layout reads while scrolling.
 */
export function SiteHeader({ path }: { path: string }) {
  const headerRef = useRef<HTMLElement>(null);
  // Server and first client render: no veil and no track, the hero's (and the no-JS) header.
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

    const crossing = new Set<Element>();
    let observer: IntersectionObserver | undefined;
    let frame = 0;

    const observe = () => {
      frame = 0;
      observer?.disconnect();
      crossing.clear();
      const middle = Math.round(header.offsetHeight / 2);
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) crossing.add(entry.target);
            else crossing.delete(entry.target);
          }
          const next = readBehind(crossing);
          setBehind((current) => (sameBehind(current, next) ? current : next));
        },
        { rootMargin: `-${middle}px 0px -${Math.max(window.innerHeight - middle - 1, 0)}px 0px` },
      );
      targets.forEach((target) => observer?.observe(target));
    };

    // The line's position depends on the viewport height.
    const onResize = () => {
      if (!frame) frame = requestAnimationFrame(observe);
    };

    observe();
    window.addEventListener('resize', onResize);
    return () => {
      observer?.disconnect();
      window.removeEventListener('resize', onResize);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const menuItems = [
    { label: ui.navigation.home, href: '/#inicio', number: '00' },
    ...chapters.map((chapter) => ({ label: chapter.label, href: chapterHref(chapter.id), number: chapter.number })),
  ];

  const menuProjects = projects.map((project) => ({
    label: project.title,
    href: projectHref(project.slug),
    number: formatTrack(project.track),
    detail: project.tagline,
  }));

  const onHome = path === '/';
  const track = onHome ? chapters.find((chapter) => chapter.id === behind.chapter) : undefined;
  const currentChapterHref = !onHome ? undefined : behind.clear ? '/#inicio' : track ? chapterHref(track.id) : undefined;

  return (
    <header
      className="site-header"
      data-tone={behind.night ? 'night' : undefined}
      data-ground={behind.ground}
      data-veil={behind.clear ? undefined : ''}
      ref={headerRef}
    >
      <div className="site-header__bar">
        <div className="site-header__start">
          <a className="site-header__logo" href="/" aria-label={messages.homeLabel(site.name)}>
            <Monogram className="site-header__mark" />
          </a>
          {track && (
            // A visual cue only: the chapter headings carry the structure for assistive technology.
            <p className="site-header__track" key={track.id} aria-hidden="true">
              <span className="site-header__track-number">{track.number}</span>
              <span className="site-header__track-label">{track.label}</span>
            </p>
          )}
        </div>
        <div className="site-header__actions">
          <a className="site-header__cta" href={chapterHref('contacto')}>{ui.navigation.talk} </a>
          <a className="site-header__index" href="#tracklist">{ui.navigation.index} </a>
          <StaggeredMenu
            items={menuItems}
            projects={menuProjects}
            socialItems={socials}
            availability={site.availability.open ? site.availability.label : undefined}
            currentPath={path}
            currentHref={currentChapterHref}
          />
        </div>
      </div>
    </header>
  );
}

export default SiteHeader;
