import { chapters, chapterHref } from '../../content/chapters';
import { formatTrack, projectHref, projects } from '../../content/projects';
import { site, socials } from '../../content/site';
import { ArrowUp } from '../Icon/Icon';
import Barcode from './Barcode';
import './SiteFooter.css';

/**
 * The tray card: the back of the album on every page. Full tracklist (site
 * map), catalog number, barcode and the liner-note credits.
 */
export function SiteFooter() {
  return (
    <footer className="site-footer on-night">
      <div className="container site-footer__grid">
        <nav className="site-footer__tracklist" id="tracklist" aria-labelledby="tracklist-title">
          <h2 id="tracklist-title" className="label">
            Tracklist
          </h2>
          <ol role="list" className="site-footer__list">
            <li>
              <a href="/#inicio">
                <span className="mono">00</span> Portada
              </a>
            </li>
            {chapters.map((chapter) => (
              <li key={chapter.id}>
                <a href={chapterHref(chapter.id)}>
                  <span className="mono">{chapter.number}</span> {chapter.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <nav className="site-footer__tracklist" aria-labelledby="footer-projects-title">
          <h2 id="footer-projects-title" className="label">
            Proyectos
          </h2>
          <ol role="list" className="site-footer__list">
            {projects.map((project) => (
              <li key={project.slug}>
                <a href={projectHref(project.slug)}>
                  <span className="mono">{formatTrack(project.track)}</span> {project.title}
                </a>
              </li>
            ))}
            <li>
              <a href="/proyectos/">
                <span className="mono">··</span> Índice completo
              </a>
            </li>
          </ol>
        </nav>

        <div className="site-footer__contact">
          <h2 className="label">Contacto</h2>
          <ul role="list" className="site-footer__list">
            {socials.map((social) => (
              <li key={social.label}>
                <a
                  href={social.href}
                  {...(social.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {social.label}
                  {social.detail && <span className="site-footer__detail">{social.detail}</span>}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="site-footer__spine">
          <Barcode value={site.catalog} className="site-footer__barcode" />
          <p className="mono site-footer__catalog">{site.catalog}</p>
          <p className="site-footer__credits">
            Diseño y desarrollo: {site.name}. Hecho con React, TypeScript y Vite. Tipografías: Estrella
            (Uncarving) y Poppins (OFL).{' '}
            <a className="text-link" href="https://github.com/J0rgw/portfoliov3" target="_blank" rel="noopener noreferrer">
              Código fuente
            </a>
          </p>
          <p className="site-footer__copy">
            © {site.releaseYear} {site.name}. {site.location}.
          </p>
          <a className="site-footer__top" href="#top">
            <ArrowUp size={16} aria-hidden="true" />
            Volver arriba
          </a>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
