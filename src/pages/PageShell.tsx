import { ui } from '../config/ui';
import { useEffect, type ReactNode } from 'react';
import ChapterHold from '../components/ui/motion/ChapterHold';
import Contact from '../sections/Contact/Contact';
import SiteFooter from '../components/ui/SiteFooter/SiteFooter';
import SiteHeader from '../components/ui/SiteHeader/SiteHeader';
import { HiddenTrack } from '../components/ui/HiddenTrack/HiddenTrack';
import { RevealController } from '../components/ui/motion/RevealController';
import { SmoothScroll } from '../components/ui/motion/SmoothScroll';
import { routeMeta, type Route } from '../routes';

/**
 * Layout shared by every page: skip link, header, main landmark, the back
 * cover that closes every page (ADR-003: contact is no longer a chapter of the
 * home; a case study keeps its own contact band, with the same anchor), footer, the
 * reveal controller, the smooth scroller (chapter snap on home) and the console's
 * hidden track. In
 * production the <head> is prerendered; in development the title is set here
 * from the same route metadata.
 */
export function PageShell({ route, children }: { route: Route; children: ReactNode }) {
  useEffect(() => {
    const { title } = routeMeta(route);
    if (document.title !== title) document.title = title;
  }, [route]);

  return (
    <>
      <a className="skip-link" href="#contenido">{ui.navigation.skip} </a>
      <div id="top" />
      <SiteHeader path={route.path} />
      <main id="contenido" tabIndex={-1}>
        {children}
        {route.page !== 'project' && (
          <ChapterHold>
            <Contact />
          </ChapterHold>
        )}
      </main>
      <SiteFooter contact={route.page === 'project'} />
      <RevealController routeKey={route.path} />
      <SmoothScroll snap={route.page === 'home'} />
      <HiddenTrack />
    </>
  );
}

export default PageShell;
