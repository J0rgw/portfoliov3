import { useEffect, type ReactNode } from 'react';
import SiteFooter from '../components/SiteFooter/SiteFooter';
import SiteHeader from '../components/SiteHeader/SiteHeader';
import { RevealController } from '../motion/RevealController';
import { routeMeta, type Route } from '../routes';

/**
 * Layout shared by every page: skip link, header, main landmark, footer and
 * the reveal controller. In production the <head> is prerendered; in
 * development the title is set here from the same route metadata.
 */
export function PageShell({ route, children }: { route: Route; children: ReactNode }) {
  useEffect(() => {
    const { title } = routeMeta(route);
    if (document.title !== title) document.title = title;
  }, [route]);

  return (
    <>
      <a className="skip-link" href="#contenido">
        Saltar al contenido
      </a>
      <div id="top" />
      <SiteHeader path={route.path} />
      <main id="contenido" tabIndex={-1}>
        {children}
      </main>
      <SiteFooter />
      <RevealController routeKey={route.path} />
    </>
  );
}

export default PageShell;
