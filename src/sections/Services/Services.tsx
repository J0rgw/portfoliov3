import type { CSSProperties } from 'react';
import ChapterHeading from '../../components/editorial/ChapterHeading/ChapterHeading';
import LinkCue from '../../components/ui/LinkCue/LinkCue';
import { chapterById } from '../../config/navigation';
import { services, servicesIntro } from '../../config/services';
import { mailto } from '../../config/site';
import { ui } from '../../config/ui';
import '../../design/sections/Services/Services.css';

const chapter = chapterById('servicios');

/**
 * Chapter 03, Servicios (ADR-001): the four offers as a tracklist printed
 * straight on the page, one row each: the offer's title large, one line on
 * what the client gets, where Jorge has done it and the enquiry, its words
 * the cue (LinkCue: underlined, circled by the pen when pointed at; no
 * number, no arrow: Jorge, 2026-11-12, ADR-002).
 * Still the calmest chapter: reveal only. Contract:
 * docs/INFORMATION_ARCHITECTURE.md §3.
 */
export function Services() {
  return (
    <section id={chapter.id} className="chapter chapter--frame services" aria-labelledby="services-title">
      <div className="container frame services__frame">
        <ChapterHeading
          id="services-title"
          title={servicesIntro.heading}
          lede={servicesIntro.lede}
        />

        <ol className="services__list" role="list">
          {services.map((service, index) => (
            <li
              key={service.id}
              className="service"
              data-reveal="up"
              style={{ '--reveal-index': index } as CSSProperties}
            >
              <h3 id={`service-${service.id}`} className="service__title">{service.title}</h3>
              <div className="service__body">
                <p className="service__outcome">{service.outcome}</p>
                <p className="service__evidence">
                  {ui.services.evidence}{' '}
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
              </div>
              <a className="service__cta" href={mailto(service.cta.subject)} aria-describedby={`service-${service.id}`}>
                <LinkCue>{service.cta.label}</LinkCue>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default Services;
