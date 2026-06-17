'use client';

import { Globe } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { type ChangeEvent } from 'react';

import { locales, type Locale } from '@/lib/i18n';
import { usePathname, useRouter } from '@/lib/navigation';

/**
 * Native ``<select>`` language switcher. Uses next-intl's locale-aware router
 * ({@link @/lib/navigation}) so switching re-applies the correct ``as-needed``
 * prefix AND sets the ``NEXT_LOCALE`` cookie — without the cookie update,
 * returning to the default locale (ru) bounces back via locale detection.
 */
export function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  const t = useTranslations('language');

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;
    // ``usePathname`` here is locale-agnostic (no prefix); the next-intl router
    // re-applies the ``as-needed`` prefix and sets the NEXT_LOCALE cookie, so
    // switching back to ru no longer bounces via locale detection.
    router.replace(pathname, { locale: nextLocale });
  }

  return (
    <label className="flex items-center gap-1.5 text-xs">
      <Globe className="size-4 text-ink-3" aria-hidden="true" />
      <span className="sr-only">{t('label')}</span>
      <select
        value={currentLocale}
        onChange={handleChange}
        className="focus-ring cursor-pointer rounded-full bg-transparent py-1 pr-1 pl-1 text-sm font-medium text-ink-2 transition-colors hover:text-primary focus-visible:text-primary"
      >
        {locales.map((locale) => (
          <option key={locale} value={locale}>
            {t(locale)}
          </option>
        ))}
      </select>
    </label>
  );
}
