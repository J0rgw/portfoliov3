export const seo = {
    title: 'Jorge Arcas desarrollador full-stack freelance',
    description:
      'Desarrollo webs, aplicaciones y automatizaciones a medida con React, TypeScript, Node.js y Python. Casos reales, proceso claro y contacto directo.',
    image: '/images/og/home.jpg',
  };

export const seoTemplates = {
  /** The site's name in link previews and search results (og:site_name, WebSite). */
  siteName: (name: string, label: string) => `${label} de ${name}`,
  projectsTitle: (name: string) => `Proyectos de ${name}`,
  projectsDescription: 'Índice de proyectos de Jorge Arcas: aplicaciones web, automatización con CRM, herramientas y frontend, cada uno con su caso de estudio, su papel y su tecnología.',
  projectsImageAlt: (name: string) => `Proyectos de ${name}`,
  projectImageAlt: (title: string) => `Portada del caso de estudio ${title}`,
  servicesTitle: (name: string) => `Servicios de ${name}`,
  servicesDescription: 'Webs, aplicaciones web, automatización con CRM y frontend a medida, y cómo trabajo: de entender el problema a publicar y mantener lo que construyo.',
  libraryTitle: 'Librería de componentes React, en preparación',
  libraryDescription: 'Una librería de componentes React en preparación, todavía sin nombre ni fecha. Avísame por email y te escribo una sola vez, cuando haya algo que probar.',
  notFoundTitle: 'Pista no encontrada',
  notFoundDescription: 'Esta página no existe. Vuelve a la portada o al índice de proyectos.',
};
export const personSeo = {
  image: '/images/brand/avatar.webp', nationality: 'España', languages: ['es', 'en'],
  topics: ['Desarrollo web a medida', 'React', 'TypeScript', 'Node.js', 'Python', 'Integración de CRM', 'Automatización de procesos'],
};
