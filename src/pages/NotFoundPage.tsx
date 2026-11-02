import { ui } from '../config/ui';
import Button from '../components/ui/Button/Button';
import Disc from '../components/cd/Disc/Disc';
import { site } from '../config/site';
import '../design/pages/NotFoundPage.css';

/** 404: "track not found". Served by GitHub Pages as /404.html (noindex). */
export function NotFoundPage() {
  return (
    <section className="container not-found" aria-labelledby="not-found-title">
      <div className="not-found__disc" aria-hidden="true">
        {/* Estrella cannot draw accents: "Nada", never "Vacío". */}
        <Disc variant="cdr" handwriting={ui.notFound.annotation} print={{ brand: ui.media.cdr, spec: ui.media.capacity, catalog: site.catalog }} />
      </div>
      <div className="not-found__text">
        <h1 id="not-found-title" className="not-found__title">{ui.notFound.heading} </h1>
        <p className="lede">{ui.notFound.body}</p>
        <div className="not-found__actions">
          <Button href="/">{ui.notFound.back}</Button>
          <Button href="/proyectos/" variant="secondary">{ui.actions.viewProjects} </Button>
        </div>
      </div>
    </section>
  );
}

export default NotFoundPage;
