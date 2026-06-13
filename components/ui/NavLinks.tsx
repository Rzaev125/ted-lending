'use client';

import { useEffect, useState } from 'react';

interface NavLink {
  href: string;
  label: string;
}

/**
 * Desktop (≥lg) nav link row with scroll-spy: a single IntersectionObserver
 * over the in-page section ids highlights the link for the section currently in
 * view. Server ``Nav`` passes the already-localized links in.
 */
export function NavLinks({ links }: { links: NavLink[] }) {
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    const ids = links.map((link) => link.href.slice(1)); // "#courses" -> "courses"
    const elements = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          // Rank by the visible *pixel height* within the center band, not the
          // target-normalized intersectionRatio — ratio over-favors short
          // sections (a small section fully inside the band scores higher than a
          // tall one that merely spans it), highlighting the wrong link.
          visible.set(entry.target.id, entry.isIntersecting ? entry.intersectionRect.height : 0);
        }
        // Pick the section with the largest visible area in the band.
        let best = '';
        let bestHeight = 0;
        for (const [id, height] of visible) {
          if (height > bestHeight) {
            bestHeight = height;
            best = id;
          }
        }
        // Unconditional: when no section occupies the band (gaps, page top/bottom)
        // best is '' and the highlight clears instead of sticking to the last one.
        setActive(best);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [links]);

  return (
    <div className="hidden gap-7 lg:flex">
      {links.map((link) => {
        const isActive = link.href.slice(1) === active;
        return (
          <a
            key={link.href}
            href={link.href}
            aria-current={isActive ? 'true' : undefined}
            className={`text-sm font-medium transition-colors hover:text-primary ${
              isActive ? 'font-semibold text-primary' : 'text-ink-2'
            }`}
          >
            {link.label}
          </a>
        );
      })}
    </div>
  );
}
