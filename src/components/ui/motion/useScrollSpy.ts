import { useEffect, useState } from 'react';

/**
 * Returns the id of the section currently being read: the first one, in
 * document order, that crosses a reading line at ~35% of the viewport height.
 */
export function useScrollSpy(ids: string[]): string | null {
  const [active, setActive] = useState<string | null>(null);
  const key = ids.join('|');

  useEffect(() => {
    const sectionIds = key.split('|').filter(Boolean);
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((element): element is HTMLElement => element !== null);
    if (elements.length === 0 || typeof IntersectionObserver === 'undefined') return;

    const intersecting = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) intersecting.set(entry.target.id, entry.isIntersecting);
        const current = sectionIds.find((id) => intersecting.get(id));
        if (current) setActive(current);
      },
      { rootMargin: '-35% 0px -60% 0px' },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [key]);

  return active;
}
