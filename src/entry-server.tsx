import { StrictMode } from 'react';
import { renderToStaticMarkup, renderToString } from 'react-dom/server';
import App from './App';
import { matchRoute, prerenderPaths, routeKey } from './routes';
import { buildHead } from './seo/head';
import OgCard, { ogKeys } from './seo/OgCard';

export { prerenderPaths, ogKeys };

/** Used by scripts/prerender.mjs: the page body and its <head> tags. */
export function render(url: string): { html: string; head: string; status: number; key: string } {
  const route = matchRoute(url);
  const html = renderToString(
    <StrictMode>
      <App path={url} />
    </StrictMode>,
  );
  return { html, head: buildHead(route), status: route.page === 'not-found' ? 404 : 200, key: routeKey(route) };
}

/** Used by scripts/generate-og.mjs: static markup of one social card. */
export function renderOgCard(key: string): string {
  return renderToStaticMarkup(<OgCard cardKey={key} />);
}

export { site } from './config/site';
