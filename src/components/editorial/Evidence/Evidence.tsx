import type { CSSProperties } from 'react';
import { mediaTheme } from './mediaTheme';
import { ui } from '../../../config/ui';
import type { Evidence as EvidenceItem } from '../../../config/types';
import '../../../design/components/Evidence/Evidence.css';

/**
 * Renders one piece of evidence: a real screenshot (with a browser or phone
 * frame), a command excerpt, a flow diagram or a table of states. Everything is
 * real HTML text except the screenshots, which carry descriptive alt text.
 */
export function Evidence({ item }: { item: EvidenceItem }) {
  switch (item.kind) {
    case 'image':
      return (
        <figure className={`evidence evidence--image evidence--${mediaTheme(item.src).frame}`}>
          <div className="evidence__frame">
            {mediaTheme(item.src).frame === 'browser' && (
              <span className="evidence__chrome" aria-hidden="true">
                <span />
                <span />
                <span />
              </span>
            )}
            <img
              src={item.src}
              alt={item.alt}
              width={item.width}
              height={item.height}
              loading="lazy"
              decoding="async"
              className={mediaTheme(item.src).pixelated ? 'is-pixelated' : undefined}
              style={mediaTheme(item.src).pixelated ? ({ '--pixels': `${item.width}px` } as CSSProperties) : undefined}
            />
          </div>
          {item.caption && <figcaption>{item.caption}</figcaption>}
        </figure>
      );
    case 'code':
      return (
        <figure className="evidence evidence--code">
          <div className="evidence__code-head">
            <span className="evidence__code-title">{item.title}</span>
            <span className="evidence__code-lang">{item.language}</span>
          </div>
          <pre tabIndex={0}>
            <code>{item.code}</code>
          </pre>
          {item.caption && <figcaption>{item.caption}</figcaption>}
        </figure>
      );
    case 'diagram':
      return (
        <figure className="evidence evidence--diagram">
          <p className="evidence__diagram-title">{item.title}</p>
          <ol className="evidence__flow" role="list">
            {item.steps.map((step) => (
              <li key={step.label}>
                <span className="evidence__flow-label">{step.label}</span>
                {step.detail && <span className="evidence__flow-detail">{step.detail}</span>}
              </li>
            ))}
          </ol>
          {item.caption && <figcaption>{item.caption}</figcaption>}
        </figure>
      );
    case 'states':
      return (
        <figure className="evidence evidence--states">
          <table>
            <caption>{item.title}</caption>
            <thead>
              <tr>
                <th scope="col">{ui.labels.status}</th>
                <th scope="col">{ui.labels.meaning}</th>
              </tr>
            </thead>
            <tbody>
              {item.rows.map((row) => (
                <tr key={row.state}>
                  <td>
                    <code>{row.state}</code>
                  </td>
                  <td>{row.meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {item.caption && <figcaption>{item.caption}</figcaption>}
        </figure>
      );
    default:
      return null;
  }
}

export default Evidence;
