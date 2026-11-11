import type { ReactNode } from 'react';
import '../../../design/components/CreditsTable/CreditsTable.css';

export interface CreditRow {
  label: string;
  value: ReactNode;
}

interface CreditsTableProps {
  rows: CreditRow[];
  className?: string;
  /** `compact` tightens rows for indexes and rows. */
  density?: 'regular' | 'compact';
}

/**
 * Liner-note credits: the A24 "DIRECTED BY / YEAR / STARRING" table as a
 * description list. Since ADR-001 the label is sentence case beside its value,
 * with no rules between rows.
 */
export function CreditsTable({ rows, className = '', density = 'regular' }: CreditsTableProps) {
  return (
    <dl className={`credits credits--${density} ${className}`.trim()}>
      {rows.map((row) => (
        <div className="credits__row" key={row.label}>
          <dt className="credits__label">{row.label}</dt>
          <dd className="credits__value">{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}

export default CreditsTable;
