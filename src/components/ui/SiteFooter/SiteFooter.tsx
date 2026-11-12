import { ui } from '../../../config/ui';
import { chapters, chapterHref } from '../../../config/navigation';
import { projectHref, projects } from '../../../config/projects';
import { site, socials } from '../../../config/site';
import { ArrowRight, ArrowUp } from '../Icon/Icon';
import Barcode from '../../graphics/Barcode/Barcode';
import '../../../design/components/SiteFooter/SiteFooter.css';

/**
 * The tray card: the back of the album on every page (ADR-001). The full
 * tracklist (site map) and every case study as rows of links, without numbers
 * (2026-11-11), then one line of print: barcode and catalog number, the
 * credits, the copyright, back to top.
 * `contact={false}` drops the contact row where the page has just listed the
 * same links (home: chapter 06, the back cover, sits right above).
 */
export function SiteFooter({ contact = true }: { contact?: boolean }) {
  return (
    <footer className="site-footer on-night">
      <div className="container site-footer__inner">
        <nav className="site-footer__row" id="tracklist" aria-labelledby="tracklist-title">
          <h2 id="tracklist-title" className="site-footer__heading">{ui.navigation.tracklist}</h2>
          <ol role="list" className="site-footer__list">
            <li>
              <a href="/#inicio">
                {ui.navigation.cover}
              </a>
            </li>
            {chapters.map((chapter) => (
              <li key={chapter.id}>
                <a href={chapterHref(chapter.id)}>
                  {chapter.label}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        <nav className="site-footer__row" aria-labelledby="footer-projects-title">
          <h2 id="footer-projects-title" className="site-footer__heading">{ui.navigation.projects}</h2>
          <ol role="list" className="site-footer__list">
            {projects.map((project) => (
              <li key={project.slug}>
                <a href={projectHref(project.slug)}>
                  {project.title}
                </a>
              </li>
            ))}
            {/* A page, not a track: an arrow like the site's other "go there" links. */}
            <li>
              <a className="site-footer__more" href="/proyectos/">
                {ui.navigation.fullIndex}
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </li>
          </ol>
        </nav>

        {contact && (
          <div className="site-footer__row">
            <h2 className="site-footer__heading">{ui.navigation.contact}</h2>
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
        )}

        <div className="site-footer__base">
          <div className="site-footer__catalog">
            <Barcode value={site.catalog} className="site-footer__barcode" />
            <p className="mono">{site.catalog}</p>
          </div>
          <p className="site-footer__credits">
            {ui.footer.credit} {site.name}{ui.footer.tools}{' '}
            <a className="text-link" href={site.sourceUrl} target="_blank" rel="noopener noreferrer">{ui.actions.source}</a>
          </p>
          <p className="site-footer__copy">
            © {site.releaseYear} {site.name}. {site.location}.
          </p>
          <a className="site-footer__top" href="#top">
            <ArrowUp size={16} aria-hidden="true" />
            {ui.navigation.backTop}
          </a>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
