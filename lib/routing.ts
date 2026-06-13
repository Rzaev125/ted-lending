import { defineRouting } from 'next-intl/routing';

import { defaultLocale, locales } from './i18n';

/**
 * Shared next-intl routing definition — the single source of truth for the
 * middleware ({@link ../middleware}) and the locale-aware navigation helpers
 * ({@link ./navigation}). Keeping both on the same object guarantees the
 * language switcher prefixes URLs and sets the ``NEXT_LOCALE`` cookie exactly
 * the way the middleware expects.
 *
 * ``localeDetection`` stays at its default (``true``): the first visit picks the
 * language from the browser, and subsequent visits remember the choice via the
 * ``NEXT_LOCALE`` cookie.
 */
export const routing = defineRouting({
  locales: [...locales],
  defaultLocale,
  localePrefix: 'as-needed',
});
