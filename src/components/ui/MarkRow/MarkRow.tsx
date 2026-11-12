import { useRef, type ReactNode } from 'react';
import { useMarkGroup } from '../motion/useMarkGroup';
import '../../../design/components/MarkRow/MarkRow.css';

interface MarkRowProps {
  className: string;
  /** Names the list for assistive technology ("Stack"). */
  label: string;
  /** The marks, one `li` each; a mark's `title` is the name its tag shows. */
  children: ReactNode;
}

/**
 * A row of technology marks that lift under the pointer and share one name
 * tag (useMarkGroup, docs/MOTION_SYSTEM.md §2.7). The tag is the list's last
 * child, so it needs no wrapper, and it is hidden from assistive technology,
 * which reads each mark's own alt text.
 */
export function MarkRow({ className, label, children }: MarkRowProps) {
  const ref = useRef<HTMLUListElement>(null);
  useMarkGroup(ref);
  return (
    <ul ref={ref} className={className} role="list" aria-label={label} data-mark-group>
      {children}
      <li className="mark-tip" data-mark-tip aria-hidden="true">
        <span className="mark-tip__text" />
      </li>
    </ul>
  );
}

export default MarkRow;
