import { motion } from '../../design/motion';
import { ui } from '../../config/ui';
import type { CSSProperties } from 'react';
import ChapterHeading from '../../components/editorial/ChapterHeading/ChapterHeading';
import LogoLoop from '../../components/ui/LogoLoop/LogoLoop';
import ProfileCard from '../../components/editorial/ProfileCard/ProfileCard';
import { aboutIntro, aboutNarrative, instrumentLogos, instruments, milestones, passCard, principles } from '../../config/about';
import { chapterById, chapterHref } from '../../config/navigation';
import { site } from '../../config/site';
import '../../design/sections/About/About.css';

const chapter = chapterById('sobre-mi');

const KIND_LABEL: Record<string, string> = {
  education: ui.about.education,
  community: ui.about.community,
  work: ui.about.work,
  talk: ui.about.talk,
  projects: ui.navigation.projects,
};

/**
 * Chapter 04: the credits. The person behind the record, built from verified
 * artefacts (references.md #4 Kyoosang Choi; #5 Boccia; #8 Huy Phan).
 * Contract: docs/INFORMATION_ARCHITECTURE.md §3.
 */
export function About() {
  return (
    <section id={chapter.id} className="chapter about" aria-labelledby="about-title">
      <div className="container">
        <ChapterHeading id="about-title" title={aboutIntro.heading} />
      </div>
      <div className="container about__grid">
        <div className="about__pass" data-reveal="up">
          <ProfileCard
            avatarUrl={passCard.avatar}
            iconUrl={passCard.icon}
            name={passCard.name}
            title={passCard.title}
            handle={passCard.handle}
            status={site.availability.open ? site.availability.short : undefined}
            badge={`${site.catalog} · ${ui.about.credits}`}
            contactText={passCard.contactLabel}
            contactHref={chapterHref('contacto')}
          />
          <span className="about__pass-note handwriting" aria-hidden="true">
            {site.name.split(' ')[0]}
          </span>
        </div>

        <div className="about__story">
          <div className="about__narrative prose">
            {aboutNarrative.map((paragraph, index) => (
              <p key={index} data-reveal="up" style={{ '--reveal-index': index } as CSSProperties}>
                {paragraph}
              </p>
            ))}
          </div>

          <ul className="about__principles" role="list">
            {principles.map((principle, index) => (
              <li key={principle.title} data-reveal="up" style={{ '--reveal-index': index } as CSSProperties}>
                <h3 className="about__principle-title">{principle.title}</h3>
                <p>{principle.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container about__credits">
        <div className="about__timeline">
          <h3 className="about__subhead label">{ui.about.timeline}</h3>
          <ol className="about__milestones" role="list">
            {milestones.map((milestone, index) => (
              <li
                key={`${milestone.period}-${milestone.title}`}
                className="about__milestone"
                data-kind={milestone.kind}
                data-reveal="up"
                style={{ '--reveal-index': index % 4 } as CSSProperties}
              >
                <span className="about__milestone-period mono">{milestone.period}</span>
                <div>
                  <p className="about__milestone-title">
                    {milestone.title}
                    <span className="about__milestone-org"> · {milestone.org}</span>
                  </p>
                  {milestone.detail && <p className="about__milestone-detail">{milestone.detail}</p>}
                </div>
                <span className="about__milestone-kind">{KIND_LABEL[milestone.kind]}</span>
              </li>
            ))}
          </ol>
        </div>

        <div className="about__instruments">
          <h3 className="about__subhead label">{ui.about.instruments}</h3>
          <dl className="about__instrument-list">
            {instruments.map((group) => (
              <div key={group.label} className="about__instrument-group">
                <dt>{group.label}</dt>
                <dd>{group.items.join(' · ')}</dd>
              </div>
            ))}
            <div className="about__instrument-group">
              <dt>{ui.labels.languages}</dt>
              <dd>{site.languages}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="about__loop">
        <LogoLoop
          logos={instrumentLogos}
          speed={motion.logoLoop.speed}
          logoHeight={motion.logoLoop.height}
          gap={motion.logoLoop.gap}
          pauseOnHover
          fadeOut
          fadeOutColor="var(--color-paper)"
          scaleOnHover
          ariaLabel={ui.about.technologies}
        />
      </div>
    </section>
  );
}

export default About;
