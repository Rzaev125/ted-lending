import type { MetadataRoute } from 'next';

import { locales } from '@/lib/i18n';
import { env } from '@/lib/env';

/**
 * One entry per locale (``as-needed`` prefix: ``ru`` at the root, ``en``/``az``
 * prefixed), and EACH entry carries the full set of hreflang alternates incl.
 * ``x-default`` — the reciprocal form Google recommends for multilingual sites,
 * so every language version is discoverable from any other.
 *
 * Resolves to ``/sitemap.xml`` — the dot in the path means the next-intl
 * middleware matcher skips it, so it is served as-is.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const base = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
  const path = (locale: string) => (locale === 'ru' ? base : `${base}/${locale}`);
  const languages = {
    ru: path('ru'),
    en: path('en'),
    az: path('az'),
    'x-default': base,
  };
  const lastModified = new Date();

  return locales.map((locale): MetadataRoute.Sitemap[number] => ({
    url: path(locale),
    lastModified,
    changeFrequency: 'weekly',
    priority: locale === 'ru' ? 1 : 0.9,
    alternates: { languages },
  }));
}
