import { defineRouting } from 'next-intl/routing';

import { defaultLocale, locales } from './i18n';

/**
 * Shared next-intl routing definition — the single source of truth for the
 * middleware ({@link ../middleware}) and the locale-aware navigation helpers
 * ({@link ./navigation}). Keeping both on the same object guarantees the
 * language switcher prefixes URLs and sets the ``NEXT_LOCALE`` cookie exactly
 * the way the middleware expects.
 *
 * ``localeDetection`` is turned OFF: the URL is the single source of truth for
 * the active language. With auto-detection on, ``/`` would 307-redirect visitors
 * (and crawlers sending an ``Accept-Language``) to ``/en`` / ``/az``, which muddies
 * canonicalisation and makes Googlebot chase redirects on the home URL. Language
 * is now chosen explicitly via the switcher; the ``NEXT_LOCALE`` cookie still
 * records the choice for the switcher's own navigation.
 */
export const routing = defineRouting({
  locales: [...locales],
  defaultLocale,
  localePrefix: 'as-needed',
  localeDetection: false,
});
