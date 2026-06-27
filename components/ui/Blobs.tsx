'use client';

import { type CSSProperties, useEffect, useState } from 'react';

/**
 * Five drifting radial-gradient blobs that anchor the cosmic background of the
 * landing. Pure presentational — no props, no interactivity. Pinned with
 * ``position: fixed`` so the blobs float over the long scroll.
 *
 * The ``drift`` animation (and the ``will-change`` layer promotion) is held back
 * until shortly after mount so it never competes with hydration or the LCP
 * paint — the resting blobs are identical, they simply start moving a beat later.
 * The global ``prefers-reduced-motion`` rule in ``globals.css`` neutralises the
 * animation entirely for users who ask for less motion.
 */
const BLOBS: Array<{ style: CSSProperties; color: string; animation: string }> = [
  { style: { width: 560, height: 560, top: -120, left: -100 }, color: '#9D8BFF', animation: 'drift 22s ease-in-out infinite 0s' },
  { style: { width: 480, height: 480, top: '30%', right: -120 }, color: '#E59BE8', animation: 'drift 28s ease-in-out infinite -7s' },
  { style: { width: 420, height: 420, top: '70%', left: '10%' }, color: '#BBA3F2', animation: 'drift 25s ease-in-out infinite -14s' },
  { style: { width: 520, height: 520, top: '46%', right: '12%' }, color: '#C7B5FF', animation: 'drift 30s ease-in-out infinite -3s' },
  { style: { width: 380, height: 380, top: '82%', left: -60 }, color: '#DCA9EC', animation: 'drift 26s ease-in-out infinite -10s' },
];

export function Blobs() {
  const [drifting, setDrifting] = useState(false);

  useEffect(() => {
    // Defer the drift so it starts after the critical load window (post-LCP).
    const id = window.setTimeout(() => setDrifting(true), 1200);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {BLOBS.map((blob, index) => (
        <div
          key={index}
          className="absolute rounded-full opacity-55 blur-[80px]"
          style={{
            ...blob.style,
            background: `radial-gradient(circle, ${blob.color} 0%, transparent 65%)`,
            animation: drifting ? blob.animation : undefined,
            willChange: drifting ? 'transform' : undefined,
          }}
        />
      ))}
    </div>
  );
}
