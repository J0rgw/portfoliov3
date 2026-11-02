import { ui } from '../../../config/ui';
import { chapters, chapterHref } from '../../../config/navigation';
import { formatTrack, projectHref, projects } from '../../../config/projects';
import { site, socials } from '../../../config/site';
import { ArrowUp } from '../Icon/Icon';
import Barcode from '../../graphics/Barcode/Barcode';
import '../../../design/components/SiteFooter/SiteFooter.css';

/**
 * The tray card: the back of the album on every page. Full tracklist (site
 * map), catalog number, barcode and the liner-note credits.
 */
export function SiteFooter() {
  return (
    <footer className="site-footer on-night">
      <div className="container site-footer__grid">
        <nav className="site-footer__tracklist" id="tracklist" aria-labelledby="tracklist-title">
          <h2 id="tracklist-title" className="label">{ui.navigation.tracklist} </h2>
          <ol role="list" className="site-footer__list">
            <li>
              <a href="/#inicio">
                <span className="mono">00</span> {ui.navigation.cover} </a>
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
          <h2 id="footer-projects-title" className="label">{ui.navigation.projects} </h2>
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
                <span className="mono">··</span> {ui.navigation.fullIndex} </a>
            </li>
          </ol>
        </nav>

        <div className="site-footer__contact">
          <h2 className="label">{ui.navigation.contact}</h2>
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
          <p className="site-footer__credits">{ui.footer.credit} {site.name}{ui.footer.tools}{' '}
            <a className="text-link" href={site.sourceUrl} target="_blank" rel="noopener noreferrer">{ui.actions.source} </a>
          </p>
          <p className="site-footer__copy">
            © {site.releaseYear} {site.name}. {site.location}.
          </p>
          <a className="site-footer__top" href="#top">
            <ArrowUp size={16} aria-hidden="true" />{ui.navigation.backTop} </a>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
