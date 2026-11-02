import { ui } from '../config/ui';
import { projectTheme } from '../components/cd/CoverArt/projectTheme';
import type { CSSProperties } from 'react';
import CoverArt from '../components/cd/CoverArt/CoverArt';
import Disc from '../components/cd/Disc/Disc';
import { formatTrack, projectBySlug, projects } from '../config/projects';
import { site } from '../config/site';

/**
 * 1200×630 social preview card, rendered to static HTML by entry-server and
 * captured by scripts/generate-og.mjs. Styles: src/seo/og.css. Not part of the
 * site bundle.
 */
export const ogKeys = ['home', ...projects.filter((project) => !project.assets?.social).map((project) => project.slug)];

export function OgCard({ cardKey }: { cardKey: string }) {
  const project = cardKey === 'home' ? undefined : projectBySlug(cardKey);

  if (!project) {
    return (
      <div className="og og--home">
        <div className="og__text">
          <p className="og__name">{site.name}</p>
          <p className="og__role">{site.role}</p>
          <p className="og__statement">{site.hero.statement}</p>
          <p className="og__url">{new URL(site.baseUrl).host}</p>
        </div>
        <div className="og__object">
          <Disc
            variant="cdr"
            handwriting={site.signature}
            print={{ brand: ui.media.cdr, spec: ui.media.capacity, catalog: `${site.catalog} · ${site.releaseYear}` }}
            rimText={`${site.name} · ${site.catalog} · ${site.role}`}
            style={{ '--disc-rotate': '-16deg' } as CSSProperties}
          />
        </div>
      </div>
    );
  }

  const track = formatTrack(project.track);
  return (
    <div className="og og--project">
      <div className="og__text">
        <p className="og__title">{project.title}</p>
        <p className="og__tagline">{project.tagline}</p>
        <p className="og__url">{ui.detail.overview} · {site.name}</p>
      </div>
      <div className="og__object">
        <div className="og__sleeve">
          <CoverArt cover={projectTheme(project.id)} assets={project.assets} title={project.title} track={track} catalog={site.catalog} />
        </div>
        <div className="og__disc">
          <Disc variant="pressed" ink={projectTheme(project.id).ink} rimText={`${project.title} · ${site.name} · ${project.year} · ${site.catalog}`}>
            <CoverArt cover={projectTheme(project.id)} assets={project.assets} title={project.title} track={track} catalog={site.catalog} shape="disc" />
          </Disc>
        </div>
      </div>
    </div>
  );
}

export default OgCard;
