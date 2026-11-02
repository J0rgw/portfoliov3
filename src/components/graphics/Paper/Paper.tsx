import type { ReactNode } from 'react';
import '../../../design/components/graphics/Paper.css';
export default function Paper({ children, className = '', variant = 'insert' }: {
  children: ReactNode; className?: string; variant?: 'insert' | 'note';
}) {
  return <div className={`paper paper--${variant} ${className}`.trim()}>{children}</div>;
}
