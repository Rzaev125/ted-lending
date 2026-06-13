import type { MetadataRoute } from 'next';

import { env } from '@/lib/env';

/**
 * Single home entry with hreflang alternates for all three locales. Resolves to
 * ``/sitemap.xml`` — the dot in the path means the next-intl middleware matcher
 * skips it, so it is served as-is.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
  return [
    {
      url: base,
      changeFrequency: 'weekly',
      priority: 1,
      alternates: {
        languages: {
          ru: base,
          en: `${base}/en`,
          az: `${base}/az`,
          'x-default': base,
        },
      },
    },
  ];
}
