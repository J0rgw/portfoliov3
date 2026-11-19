import { ui } from '../../../config/ui';
import { pages } from '../../../config/navigation';
import { projectHref, projects } from '../../../config/projects';
import { mailto, site, socials } from '../../../config/site';
import { ArrowUpRight } from '../Icon/Icon';
import Barcode from '../../graphics/Barcode/Barcode';
import '../../../design/components/SiteFooter/SiteFooter.css';

/**
 * The tray card: the back of the album on every page (ADR-001). Deslopped on
 * 2026-11-16 at Jorge's request: no names in the margin, no rule over it, no
 * credits line and no "back to top" (the header's monogram is the way up).
 * The pages as the menu names them, every case study, and, on a case study,
 * whose contact band carries no details, the address and the two profiles;
 * then the print: barcode and catalog number, the copyright, the source.
 * `contact` adds that contact row.
 */
export function SiteFooter({ contact = false }: { contact?: boolean }) {
  const profiles = socials.filter((social) => social.icon !== 'mail');

  return (
    <footer className="site-footer on-night">
      <div className="container site-footer__inner">
        {/* The header's no-JavaScript "Índice" link lands here. */}
        <nav id="tracklist" aria-label={ui.navigation.pages}>
          <ol role="list" className="site-footer__list">
            {pages.map((page) => (
              <li key={page.id}>
                <a href={page.path}>{page.label}</a>
              </li>
            ))}
          </ol>
        </nav>

        <nav aria-label={ui.navigation.projects}>
          <ol role="list" className="site-footer__list">
            {projects.map((project) => (
              <li key={project.slug}>
                <a href={projectHref(project.slug)}>{project.title}</a>
              </li>
            ))}
          </ol>
        </nav>

        {contact && (
          <ul role="list" className="site-footer__list">
            <li>
              <a href={mailto(site.contact.subject, site.contact.body)}>{site.email}</a>
            </li>
            {profiles.map((social) => (
              <li key={social.label}>
                <a href={social.href} target="_blank" rel="noopener noreferrer">
                  {social.label}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        )}

        <div className="site-footer__base">
          <div className="site-footer__catalog">
            <Barcode value={site.catalog} className="site-footer__barcode" />
            <p className="mono">{site.catalog}</p>
          </div>
          <p>
            © {site.releaseYear} {site.name}
          </p>
          <a className="site-footer__source" href={site.sourceUrl} target="_blank" rel="noopener noreferrer">
            {ui.actions.source}
            <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default SiteFooter;
