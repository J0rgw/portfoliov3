import { seoTemplates } from './config/seo';
import { projectBySlug, projectHref, projects } from './config/projects';
import { site } from './config/site';

/**
 * Route table. Every route here is prerendered by scripts/prerender.mjs and
 * listed in the sitemap (unless noindex). Add new pages here.
 */

export type Route =
  | { page: 'home'; path: '/' }
  | { page: 'projects'; path: '/proyectos/' }
  | { page: 'project'; path: string; slug: string }
  | { page: 'not-found'; path: string };

export interface RouteMeta {
  title: string;
  description: string;
  /** Canonical absolute URL. */
  url: string;
  image: string;
  imageAlt: string;
  type: 'website' | 'article';
  noindex?: boolean;
}

/** "/proyectos/mathgeon" and "/proyectos/mathgeon/index.html" → "/proyectos/mathgeon/". */
export const normalizePath = (pathname: string): string => {
  let path = pathname.split(/[?#]/)[0] || '/';
  path = path.replace(/index\.html$/, '');
  if (!path.startsWith('/')) path = `/${path}`;
  if (!path.endsWith('/') && !path.endsWith('.html')) path = `${path}/`;
  return path;
};

export const matchRoute = (pathname: string): Route => {
  const path = normalizePath(pathname);
  if (path === '/') return { page: 'home', path: '/' };
  if (path === '/proyectos/') return { page: 'projects', path: '/proyectos/' };
  const match = path.match(/^\/proyectos\/([a-z0-9-]+)\/$/);
  if (match && projectBySlug(match[1])) return { page: 'project', path, slug: match[1] };
  return { page: 'not-found', path };
};

/**
 * Identifies which page a document was rendered for. The prerenderer stamps it
 * on #root; the client only hydrates when it matches, so a host that answers an
 * unknown URL with another page's HTML (an SPA fallback) gets a clean client
 * render instead of a hydration mismatch.
 */
export const routeKey = (route: Route): string => (route.page === 'project' ? `project:${route.slug}` : route.page);

const absolute = (path: string) => `${site.baseUrl}${path}`;

export const routeMeta = (route: Route): RouteMeta => {
  switch (route.page) {
    case 'home':
      return {
        title: site.seo.title,
        description: site.seo.description,
        url: absolute('/'),
        image: absolute(site.seo.image),
        imageAlt: `${site.name}, ${site.role}`,
        type: 'website',
      };
    case 'projects':
      return {
        title: seoTemplates.projectsTitle(site.name),
        description:
          seoTemplates.projectsDescription,
        url: absolute('/proyectos/'),
        image: absolute(site.seo.image),
        imageAlt: seoTemplates.projectsImageAlt(site.name),
        type: 'website',
      };
    case 'project': {
      const project = projectBySlug(route.slug)!;
      return {
        title: project.seo.title,
        description: project.seo.description,
        url: absolute(projectHref(project.slug)),
        image: absolute(project.assets?.social ?? `/images/og/${project.slug}.jpg`),
        imageAlt: seoTemplates.projectImageAlt(project.title),
        type: 'article',
      };
    }
    default:
      return {
        title: seoTemplates.notFoundTitle,
        description: seoTemplates.notFoundDescription,
        url: absolute('/404.html'),
        image: absolute(site.seo.image),
        imageAlt: site.name,
        type: 'website',
        noindex: true,
      };
  }
};

/** Every path the prerenderer writes. */
export const prerenderPaths: string[] = [
  '/',
  '/proyectos/',
  ...projects.map((project) => projectHref(project.slug)),
  '/404.html',
];
