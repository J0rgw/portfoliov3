import { useEffect, useRef, useState } from 'react';
import StaggeredMenu from '../StaggeredMenu/StaggeredMenu';
import { chapters, chapterHref } from '../../content/chapters';
import { formatTrack, projectHref, projects } from '../../content/projects';
import { site, socials } from '../../content/site';
import './SiteHeader.css';

type Tone = 'paper' | 'night';

/**
 * Persistent header on every page: logo (home), the contact action and the
 * menu. Keeps its own view-transition name so it stays put while the page
 * changes underneath (references.md #16).
 *
 * It has no ground of its own (ART_DIRECTION §9), so it follows the ground
 * behind it: while an `.on-night` section (back cover, footer) crosses the
 * header's middle line, `data-tone="night"` switches the navigation to paper
 * ink. One IntersectionObserver whose root is that one-pixel line; no scroll
 * listener, no layout reads while scrolling.
 */
export function SiteHeader({ path }: { path: string }) {
  const headerRef = useRef<HTMLElement>(null);
  const [tone, setTone] = useState<Tone>('paper');

  useEffect(() => {
    const header = headerRef.current;
    const grounds = document.querySelectorAll<HTMLElement>('.on-night');
    if (!header || !grounds.length) return;

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
          setTone(crossing.size ? 'night' : 'paper');
        },
        { rootMargin: `-${middle}px 0px -${Math.max(window.innerHeight - middle - 1, 0)}px 0px` },
      );
      grounds.forEach((ground) => observer?.observe(ground));
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
    { label: 'Inicio', href: '/#inicio', number: '00' },
    ...chapters.map((chapter) => ({ label: chapter.label, href: chapterHref(chapter.id), number: chapter.number })),
  ];

  const menuProjects = projects.map((project) => ({
    label: project.title,
    href: projectHref(project.slug),
    number: formatTrack(project.track),
    detail: project.tagline,
  }));

  return (
    <header className="site-header" data-tone={tone === 'night' ? tone : undefined} ref={headerRef}>
      <div className="site-header__bar">
        <a className="site-header__logo" href="/" aria-label={`${site.name}, inicio`}>
          <img src="/images/brand/logo-jorgw.webp" alt="" width={130} height={32} decoding="async" />
        </a>
        <div className="site-header__actions">
          <a className="site-header__cta" href={chapterHref('contacto')}>
            Hablemos
          </a>
          <a className="site-header__index" href="#tracklist">
            Índice
          </a>
          <StaggeredMenu
            items={menuItems}
            projects={menuProjects}
            socialItems={socials}
            availability={site.availability.open ? site.availability.label : undefined}
            currentPath={path}
          />
        </div>
      </div>
    </header>
  );
}

export default SiteHeader;
