import type { CSSProperties } from 'react';
import ChapterHeading from '../../components/editorial/ChapterHeading/ChapterHeading';
import PenMark from '../../components/graphics/PenMark/PenMark';
import { ArrowRight } from '../../components/ui/Icon/Icon';
import { chapterById } from '../../config/navigation';
import { services, servicesIntro } from '../../config/services';
import { mailto } from '../../config/site';
import { ui } from '../../config/ui';
import '../../design/sections/Services/Services.css';

const chapter = chapterById('servicios');

/**
 * Chapter 03, Servicios (ADR-001): the four offers as a tracklist printed
 * straight on the page, one row each: the number, the offer's title large,
 * one line on what the client gets, where Jorge has done it and the enquiry.
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
          lede={<PenMark text={servicesIntro.lede} mark={servicesIntro.mark} />}
        />

        <ol className="services__list" role="list">
          {services.map((service, index) => (
            <li
              key={service.id}
              className="service"
              data-reveal="up"
              style={{ '--reveal-index': index } as CSSProperties}
            >
              <span className="service__track mono" aria-hidden="true">
                {String(index + 1).padStart(2, '0')}
              </span>
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
                {service.cta.label}
                <ArrowRight size={18} aria-hidden="true" />
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default Services;
