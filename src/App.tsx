import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import PageShell from './pages/PageShell';
import ProjectPage from './pages/ProjectPage';
import ProjectsIndexPage from './pages/ProjectsIndexPage';
import { matchRoute } from './routes';

/**
 * Renders the page for a path. The same component runs on the server
 * (prerender) and in the browser (hydration), so it must render
 * deterministically from `path` alone.
 */
export default function App({ path }: { path: string }) {
  const route = matchRoute(path);

  return (
    <PageShell route={route}>
      {route.page === 'home' && <HomePage />}
      {route.page === 'projects' && <ProjectsIndexPage />}
      {route.page === 'project' && <ProjectPage slug={route.slug} />}
      {route.page === 'not-found' && <NotFoundPage />}
    </PageShell>
  );
}
