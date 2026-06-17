import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server';
import { Inter } from 'next/font/google';
import { notFound } from 'next/navigation';
import type { ReactNode } from 'react';

import { Blobs } from '@/components/ui/Blobs';
import { ScrollToTop } from '@/components/ui/ScrollToTop';
import { locales } from '@/lib/i18n';

import '../globals.css';

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(locales, locale)) notFound();
  setRequestLocale(locale);
  const messages = await getMessages();
  const t = await getTranslations('nav');

  return (
    <html lang={locale} className={inter.variable}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white focus:no-underline"
        >
          {t('skip')}
        </a>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Blobs />
          <main id="main" tabIndex={-1} className="relative z-10 focus:outline-none">
            {children}
          </main>
          <ScrollToTop />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
