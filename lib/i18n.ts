import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const locales = ['ru', 'en', 'az'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'ru';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = (await requestLocale) ?? defaultLocale;
  if (!locales.includes(requested as Locale)) notFound();
  return {
    locale: requested,
    messages: (await import(`../messages/${requested}.json`)).default,
  };
});
