import { site } from '../config/site';
import { routeMeta, type Route } from '../routes';
import { schemaFor } from './schema';

const escapeHtml = (value: string): string =>
  value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** JSON inside <script> must not close the tag. */
const escapeJson = (value: unknown): string => JSON.stringify(value).replace(/</g, '\\u003c');

/**
 * The <head> tags for one route, as an HTML string for the prerenderer.
 * Title, description, canonical, robots, Open Graph, Twitter and JSON-LD.
 */
export const buildHead = (route: Route): string => {
  const meta = routeMeta(route);
  const tags = [
    `<meta name="author" content="${escapeHtml(site.name)}" />`,
    `<title>${escapeHtml(meta.title)}</title>`,
    `<meta name="description" content="${escapeHtml(meta.description)}" />`,
    `<link rel="canonical" href="${meta.url}" />`,
    meta.noindex ? '<meta name="robots" content="noindex" />' : '<meta name="robots" content="index, follow" />',
    `<meta property="og:type" content="${meta.type}" />`,
    `<meta property="og:site_name" content="${escapeHtml(`${site.name} · ${site.portfolioLabel}`)}" />`,
    `<meta property="og:locale" content="${site.locale}" />`,
    `<meta property="og:title" content="${escapeHtml(meta.title)}" />`,
    `<meta property="og:description" content="${escapeHtml(meta.description)}" />`,
    `<meta property="og:url" content="${meta.url}" />`,
    `<meta property="og:image" content="${meta.image}" />`,
    '<meta property="og:image:width" content="1200" />',
    '<meta property="og:image:height" content="630" />',
    `<meta property="og:image:alt" content="${escapeHtml(meta.imageAlt)}" />`,
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${escapeHtml(meta.title)}" />`,
    `<meta name="twitter:description" content="${escapeHtml(meta.description)}" />`,
    `<meta name="twitter:image" content="${meta.image}" />`,
    ...schemaFor(route).map((schema) => `<script type="application/ld+json">${escapeJson(schema)}</script>`),
  ];
  return tags.join('\n    ');
};
