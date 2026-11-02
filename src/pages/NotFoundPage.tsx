import Button from '../components/Button/Button';
import Disc from '../components/Disc/Disc';
import { site } from '../content/site';
import './NotFoundPage.css';

/** 404: "track not found". Served by GitHub Pages as /404.html (noindex). */
export function NotFoundPage() {
  return (
    <section className="container not-found" aria-labelledby="not-found-title">
      <div className="not-found__disc" aria-hidden="true">
        {/* Estrella cannot draw accents: "Nada", never "Vacío". */}
        <Disc variant="cdr" handwriting="Nada" print={{ brand: 'CD-R', spec: '80 min · 700 MB', catalog: site.catalog }} />
      </div>
      <div className="not-found__text">
        <p className="label">Error 404</p>
        <h1 id="not-found-title" className="not-found__title">
          Pista no encontrada
        </h1>
        <p className="lede">Esta pista no está en el disco. Puede que el enlace haya cambiado o que nunca existiera.</p>
        <div className="not-found__actions">
          <Button href="/">Volver a la portada</Button>
          <Button href="/proyectos/" variant="secondary">
            Ver proyectos
          </Button>
        </div>
      </div>
    </section>
  );
}

export default NotFoundPage;
