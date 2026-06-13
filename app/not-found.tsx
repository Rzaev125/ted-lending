import Link from 'next/link';

/**
 * Root-level 404 document. Required because the root layout
 * (``app/layout.tsx``) is a pass-through that renders no ``<html>``/``<body>``:
 * the localized ``app/[locale]/not-found.tsx`` handles in-app misses, while
 * this catches anything outside a known locale segment (and the invalid-locale
 * ``notFound()`` thrown from the locale layout). Self-contained inline styles
 * keep it independent of the locale-scoped font + globals.
 */
export default function RootNotFound() {
  return (
    <html lang="ru">
      <body
        style={{
          fontFamily: 'system-ui, -apple-system, sans-serif',
          minHeight: '100vh',
          display: 'grid',
          placeItems: 'center',
          margin: 0,
          background: '#F1ECF9',
          color: '#0c1424',
        }}
      >
        <div style={{ textAlign: 'center', padding: 32 }}>
          <h1 style={{ fontSize: 30, fontWeight: 800, margin: '0 0 12px' }}>404</h1>
          <p style={{ margin: '0 0 24px', color: '#3b4456' }}>
            Страница не найдена · Page not found · Səhifə tapılmadı
          </p>
          <Link href="/" style={{ color: '#2415C2', fontWeight: 600 }}>
            TED Academy →
          </Link>
        </div>
      </body>
    </html>
  );
}
