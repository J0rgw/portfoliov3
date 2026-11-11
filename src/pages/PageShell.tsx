import { ui } from '../config/ui';
import { useEffect, type ReactNode } from 'react';
import SiteFooter from '../components/ui/SiteFooter/SiteFooter';
import SiteHeader from '../components/ui/SiteHeader/SiteHeader';
import { HiddenTrack } from '../components/ui/HiddenTrack/HiddenTrack';
import { RevealController } from '../components/ui/motion/RevealController';
import { SmoothScroll } from '../components/ui/motion/SmoothScroll';
import { routeMeta, type Route } from '../routes';

/**
 * Layout shared by every page: skip link, header, main landmark, footer, the
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
      </main>
      <SiteFooter contact={route.page !== 'home'} />
      <RevealController routeKey={route.path} />
      <SmoothScroll snap={route.page === 'home'} />
      <HiddenTrack />
    </>
  );
}

export default PageShell;
