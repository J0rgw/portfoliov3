import type { ReactNode } from 'react';
import '../../../design/components/graphics/Sticker.css';
export default function Sticker({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <span className={`sticker ${className}`.trim()}>{children}</span>;
}
