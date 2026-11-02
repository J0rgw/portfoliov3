import { ui } from '../../config/ui';
import type { CSSProperties } from 'react';
import ChapterHeading from '../../components/editorial/ChapterHeading/ChapterHeading';
import { ArrowRight } from '../../components/ui/Icon/Icon';
import { chapterById } from '../../config/navigation';
import { services, servicesIntro } from '../../config/services';
import { mailto } from '../../config/site';
import '../../design/sections/Services/Services.css';

const chapter = chapterById('servicios');

/**
 * Chapter 03: services organised by client problem. The calmest chapter:
 * reveal only, no decoration that competes with reading.
 * Contract: docs/INFORMATION_ARCHITECTURE.md §3.
 */
export function Services() {
  return (
    <section id={chapter.id} className="chapter services" aria-labelledby="services-title">
      <div className="container">
        <ChapterHeading
          id="services-title"
          title={servicesIntro.heading}
          handwriting={ui.services.annotation}
          lede={servicesIntro.lede}
        />

        <ul className="services__grid" role="list">
          {services.map((service, index) => (
            <li
              className="service"
              key={service.id}
              data-reveal="up"
              style={{ '--reveal-index': index % 2 } as CSSProperties}
            >
              <article className="service__card" aria-labelledby={`service-${service.id}`}>
                <h3 id={`service-${service.id}`} className="service__title">
                  {service.title}
                </h3>
                <p className="service__problem">{service.problem}</p>
                <p className="service__outcome">{service.outcome}</p>
                <ul className="service__scope" role="list">
                  {service.scope.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <p className="service__evidence">
                  <span className="service__evidence-label">{ui.services.evidence}</span>
                  {service.evidence.map((item, i) => (
                    <span key={item.href}>
                      {i > 0 && ', '}
                      <a
                        className="text-link"
                        href={item.href}
                        {...(item.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      >
                        {item.label}
                      </a>
                    </span>
                  ))}
                </p>
                <a className="service__cta" href={mailto(service.cta.subject)}>
                  {service.cta.label}
                  <ArrowRight size={18} aria-hidden="true" />
                </a>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Services;
