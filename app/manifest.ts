import type { MetadataRoute } from 'next';

/**
 * Web app manifest (resolves to ``/manifest.webmanifest``). Gives Android/iOS a
 * proper install name, brand colours and icons — reuses the file-based icons in
 * ``app/`` (``icon.png`` / ``apple-icon.png``).
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'TED Academy',
    short_name: 'TED Academy',
    description:
      'Educational center in Baku — mathematics, languages, SAT & DİM prep, IT and Study Abroad.',
    start_url: '/',
    display: 'standalone',
    theme_color: '#2415C2',
    background_color: '#F1ECF9',
    icons: [
      { src: '/icon.png', sizes: '512x512', type: 'image/png' },
      { src: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  };
}
