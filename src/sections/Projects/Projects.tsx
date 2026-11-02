import { ui } from '../../config/ui';
import { useCallback, useState } from 'react';
import { ArrowRight } from '../../components/ui/Icon/Icon';
import { chapterById, chapterHref } from '../../config/navigation';
import { privateWork, projectSummaries } from '../../config/projects';
import { site } from '../../config/site';
import DiscGallery from '../../components/cd/DiscGallery/DiscGallery';
import QuickResume from '../../components/editorial/QuickResume/QuickResume';
import '../../design/sections/Projects/Projects.css';

const chapter = chapterById('proyectos');
const total = projectSummaries.length;

/**
 * Chapter 01: the releases as a collection of discs.
 * Contract: docs/INFORMATION_ARCHITECTURE.md §3. Primary reference: A24 by
 * Ravi Klaassens (composition, credits, discs on an arc, the pen loop on
 * hover); the blue marker arrow is Jorge's own image (public/images/gallery/).
 *
 * The credits (QuickResume) always show the selected disc; the gallery owns
 * the selection and reports it here. The list at the end is the no-JavaScript
 * path to every case study.
 */
export function Projects() {
  const [selected, setSelected] = useState(0);
  const [animate, setAnimate] = useState(false);
  const project = projectSummaries[selected];

  const handleSelect = useCallback((index: number, restored: boolean) => {
    setSelected(index);
    setAnimate(!restored);
  }, []);

  return (
    <section id={chapter.id} className="chapter projects" aria-labelledby="projects-title">
      <div className="projects__frame">
        <header className="projects__info">
          <h2 id="projects-title" className="projects__heading">{ui.projects.heading} </h2>
          {project ? <QuickResume key={project.id} project={project} total={total} animate={animate} /> : <p className="lede">{ui.projects.empty}</p>}
        </header>

        {project && <DiscGallery items={projectSummaries} credit={site.name} catalog={site.catalog} onSelect={handleSelect} />}
      </div>

      <nav className="projects__all container" aria-label={ui.actions.allProjects}>
        <p className="label">{ui.projects.allTracks}</p>
        <ol role="list">
          {projectSummaries.map((item) => (
            <li key={item.slug}>
              <a href={item.href}>
                <span className="mono">{item.track}</span>
                <span className="projects__all-title">{item.title}</span>
                <span className="projects__all-tagline">{item.shortDescription}</span>
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <div className="projects__foot container">
        <p>
          {privateWork.visible && privateWork.tagline}{' '}
          <a className="text-link" href={chapterHref('contacto')}>{ui.actions.write} </a>
        </p>
        <a className="projects__index-link" href="/proyectos/">{ui.actions.projectIndex} <ArrowRight size={16} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

export default Projects;
