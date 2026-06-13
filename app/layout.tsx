import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'TED Academy',
};

/**
 * Pass-through root layout. The real ``<html>`` / ``<body>`` live in
 * ``app/[locale]/layout.tsx`` so the ``lang`` attribute can reflect the active
 * locale — a root ``<html lang>`` here would force one hardcoded language for
 * every locale. Because this layout renders no document, the sibling
 * ``app/not-found.tsx`` ships its own ``<html>``/``<body>`` for out-of-locale
 * misses (next-intl App Router pattern).
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return children;
}
