import { projectBySlug, projectHref, projects } from '../content/projects';
import { services } from '../content/services';
import { site, socials } from '../content/site';
import type { Route } from '../routes';

/**
 * JSON-LD built only from verified facts (docs/INFORMATION_ARCHITECTURE.md §7).
 * No LocalBusiness (no public address), no alumniOf (implies graduation),
 * no ratings or reviews.
 */

const url = (path: string) => `${site.baseUrl}${path}`;
const personId = url('/#persona');

const person = () => ({
  '@type': 'Person',
  '@id': personId,
  name: site.name,
  url: url('/'),
  image: url('/images/brand/avatar.webp'),
  jobTitle: site.roleShort,
  description: site.summary,
  email: `mailto:${site.email}`,
  nationality: { '@type': 'Country', name: 'España' },
  knowsLanguage: ['es', 'en'],
  sameAs: socials.filter((social) => social.href.startsWith('http')).map((social) => social.href),
  knowsAbout: ['Desarrollo web a medida', 'React', 'TypeScript', 'Node.js', 'Python', 'Integración de CRM', 'Automatización de procesos'],
  makesOffer: services.map((service) => ({
    '@type': 'Offer',
    itemOffered: {
      '@type': 'Service',
      name: service.title,
      description: service.outcome,
      provider: { '@id': personId },
    },
  })),
});

const breadcrumb = (items: { name: string; path: string }[]) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: url(item.path),
  })),
});

export const schemaFor = (route: Route): object[] => {
  switch (route.page) {
    case 'home':
      return [
        { '@context': 'https://schema.org', ...person() },
        {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: `${site.name} · Portfolio`,
          url: url('/'),
          inLanguage: site.lang,
          author: { '@id': personId },
        },
      ];
    case 'projects':
      return [
        {
          '@context': 'https://schema.org',
          '@type': 'CollectionPage',
          name: 'Proyectos',
          url: url('/proyectos/'),
          inLanguage: site.lang,
          author: { '@id': personId },
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: projects.map((project, index) => ({
              '@type': 'ListItem',
              position: index + 1,
              url: url(projectHref(project.slug)),
              name: project.title,
            })),
          },
        },
        { '@context': 'https://schema.org', ...breadcrumb([{ name: 'Inicio', path: '/' }, { name: 'Proyectos', path: '/proyectos/' }]) },
      ];
    case 'project': {
      const project = projectBySlug(route.slug)!;
      return [
        {
          '@context': 'https://schema.org',
          '@type': 'CreativeWork',
          name: project.title,
          headline: project.seo.title,
          description: project.summary,
          url: url(projectHref(project.slug)),
          inLanguage: site.lang,
          dateCreated: project.year.slice(0, 4),
          keywords: project.technologies.join(', '),
          author: { '@type': 'Person', '@id': personId, name: site.name },
          ...(project.team ? { contributor: project.team.filter((member) => member !== site.name).map((name) => ({ '@type': 'Person', name })) } : {}),
          ...(project.links.repo ? { sameAs: project.links.repo } : {}),
        },
        {
          '@context': 'https://schema.org',
          ...breadcrumb([
            { name: 'Inicio', path: '/' },
            { name: 'Proyectos', path: '/proyectos/' },
            { name: project.title, path: projectHref(project.slug) },
          ]),
        },
      ];
    }
    default:
      return [];
  }
};
