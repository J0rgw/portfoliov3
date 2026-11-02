import { StrictMode } from 'react';
import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App';
import { matchRoute, routeKey } from './routes';
import './design/index.css';

const container = document.getElementById('root')!;
const path = window.location.pathname;
const app = (
  <StrictMode>
    <App path={path} />
  </StrictMode>
);

// Hydrate only HTML that was prerendered for this route. The dev server, or a
// host answering an unknown URL with another page, gets a fresh client render.
const prerenderedFor = container.dataset.route;
if (container.firstElementChild && prerenderedFor === routeKey(matchRoute(path))) {
  hydrateRoot(container, app);
} else {
  if (container.firstElementChild) container.replaceChildren();
  createRoot(container).render(app);
}
