import type { CSSProperties } from 'react';
import ChapterHeading from '../../components/editorial/ChapterHeading/ChapterHeading';
import { aboutChapter, instruments, milestones } from '../../config/about';
import { site } from '../../config/site';
import { ui } from '../../config/ui';
import '../../design/sections/AboutCredits/AboutCredits.css';

/** "A, B y C", the way Spanish writes a list (DESIGN.md "Typography"). */
const listFormat = (items: string[]) =>
  items.length > 1 ? `${items.slice(0, -1).join(', ')} y ${items[items.length - 1]}` : items.join('');

/**
 * The album's credits for the person, right after Sobre mí on the home (ADR-004):
 * the timeline newest first, one line per milestone (when, the role, where), then the
 * instruments and the languages, on shared columns. A24's credits, printed straight on
 * the page: no rules, no small capitals.
 */
export function AboutCredits() {
  return (
    <section id="creditos" className="chapter about-credits" aria-labelledby="about-credits-title">
      <div className="container about-credits__inner">
        <ChapterHeading id="about-credits-title" title={aboutChapter.credits} />

        <div className="about-credits__columns">
          <div>
            <h3 className="about-credits__subhead">{ui.about.timeline}</h3>
            <ol className="about-credits__milestones" role="list">
              {milestones.map((milestone, index) => (
                <li
                  key={`${milestone.period}-${milestone.title}-${milestone.org}`}
                  className="about-credits__milestone"
                  data-reveal="up"
                  style={{ '--reveal-index': index % 4 } as CSSProperties}
                >
                  {/* When, the role, where: hierarchy by type, no separators. */}
                  <span className="about-credits__period mono">{milestone.period}</span>
                  <span className="about-credits__role">{milestone.title}</span>
                  <span className="about-credits__org">{milestone.org}</span>
                </li>
              ))}
            </ol>
          </div>

          <dl className="about-credits__instruments">
            <div className="about-credits__group">
              <dt>{ui.about.instruments}</dt>
              <dd>{listFormat(instruments.flatMap((group) => group.items))}</dd>
            </div>
            <div className="about-credits__group">
              <dt>{ui.labels.languages}</dt>
              <dd>{site.languages}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}

export default AboutCredits;
