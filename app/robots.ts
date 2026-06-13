import type { MetadataRoute } from 'next';

import { env } from '@/lib/env';

/** Resolves to ``/robots.txt`` (dot in path → skipped by the i18n middleware). */
export default function robots(): MetadataRoute.Robots {
  const base = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/api/',
    },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
