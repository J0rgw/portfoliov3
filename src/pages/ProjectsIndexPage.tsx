import { ui } from '../config/ui';
import { coverThemes } from '../design/themes/covers';
import { projectTheme } from '../components/cd/CoverArt/projectTheme';
import type { CSSProperties } from 'react';
import CoverArt from '../components/cd/CoverArt/CoverArt';
import CreditsTable from '../components/editorial/CreditsTable/CreditsTable';
import Disc from '../components/cd/Disc/Disc';
import { chapterHref } from '../config/navigation';
import { formatTrack, privateWork, projectHref, projects, trackTotal } from '../config/projects';
import { site } from '../config/site';
import '../design/pages/ProjectsIndexPage.css';

/**
 * /proyectos/: the full index (A24's "Index" view). Every release with its
 * disc and credits, linking to its case study.
 */
export function ProjectsIndexPage() {
  return (
    <div className="index-page">
      <header className="container index-page__head">
        <nav className="case-crumbs" aria-label={ui.navigation.breadcrumbs}>
          <ol role="list">
            <li>
              <a href="/">{ui.navigation.home}</a>
            </li>
            <li aria-current="page">{ui.navigation.projects}</li>
          </ol>
        </nav>
        <h1 className="index-page__title enter enter--still">{ui.navigation.projects}</h1>
        <p className="lede enter" style={{ '--enter-index': 0 } as CSSProperties}>{ui.projects.indexIntro} </p>
      </header>

      <ol className="container index-grid" role="list">
        {projects.map((project, index) => (
          <li
            key={project.slug}
            className="index-card"
            data-reveal="up"
            style={{ '--reveal-index': index % 3 } as CSSProperties}
          >
            <a className="index-card__link" href={projectHref(project.slug)}>
              <span className="index-card__disc" aria-hidden="true">
                <Disc
                  variant="pressed"
                  transitionName={`disc-${project.slug}`}
                  ink={projectTheme(project.id).ink}
                  rimText={`${project.title} · ${site.catalog}`}
                >
                  <CoverArt
                    cover={projectTheme(project.id)} assets={project.assets}
                    title={project.title}
                    track={formatTrack(project.track)}
                    catalog={site.catalog}
                    shape="disc"
                    rim
                  />
                </Disc>
              </span>
              <span className="index-card__number mono">{formatTrack(project.track)}</span>
              <span className="index-card__title">{project.title}</span>
              <span className="index-card__tagline">{project.tagline}</span>
            </a>
            <CreditsTable
              density="compact"
              rows={[
                { label: ui.labels.type, value: project.typeLabel },
                { label: ui.labels.year, value: project.year },
                { label: ui.labels.status, value: project.status.label },
                { label: ui.labels.stack, value: project.technologies.slice(0, 3).join(' · ') },
              ]}
            />
          </li>
        ))}
        {privateWork.visible && <li className="index-card index-card--private" data-reveal="up">
          <a className="index-card__link" href={chapterHref('contacto')}>
            <span className="index-card__disc" aria-hidden="true">
              <Disc variant="pressed">
                <CoverArt
                  cover={coverThemes.private}
                  title={privateWork.title}
                  track={formatTrack(trackTotal)}
                  catalog={site.catalog}
                  shape="disc"
                />
              </Disc>
            </span>
            <span className="index-card__number mono">{formatTrack(trackTotal)}</span>
            <span className="index-card__title">{privateWork.title}</span>
            <span className="index-card__tagline">{privateWork.tagline}</span>
          </a>
        </li>}
      </ol>
    </div>
  );
}

export default ProjectsIndexPage;
