import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

import { ContactChannels } from '@/components/sections/ContactChannels';
import { Courses } from '@/components/sections/Courses';
import { Faq } from '@/components/sections/Faq';
import { Footer } from '@/components/sections/Footer';
import { Founder } from '@/components/sections/Founder';
import { Hero } from '@/components/sections/Hero';
import { LeadForm } from '@/components/sections/LeadForm';
import { Nav } from '@/components/sections/Nav';
import { Results } from '@/components/sections/Results';
import { Subjects } from '@/components/sections/Subjects';
import { Testimonials } from '@/components/sections/Testimonials';
import { WhyUs } from '@/components/sections/WhyUs';
import { getSite } from '@/lib/content';
import { DEFAULT_SITE_BUNDLE } from '@/lib/defaults';
import { env } from '@/lib/env';
import { resolveLocalized } from '@/lib/localized';
import { buildSiteJsonLd } from '@/lib/schema';

export const revalidate = 60;

/** Map next-intl codes to Open Graph territory-qualified locales. */
const OG_LOCALE: Record<string, string> = { ru: 'ru_RU', en: 'en_US', az: 'az_AZ' };

/**
 * Localized keyword sets. Low signal for Google, but Yandex — relevant for this
 * ru/az Baku audience — still reads the ``keywords`` meta tag.
 */
const KEYWORDS: Record<string, string[]> = {
  ru: ['TED Academy', 'TED Academy Баку', 'учебный центр Баку', 'курсы Баку', 'обучение Баку', 'подготовка к SAT', 'SAT Баку', 'IELTS Баку', 'TOEFL', 'подготовка к DİM', 'математика Баку', 'английский язык Баку', 'IT курсы Баку', 'курсы программирования Баку', 'Study Abroad', 'репетитор Баку', 'Fuad Ismayilov'],
  en: ['TED Academy', 'TED Academy Baku', 'educational center Baku', 'courses Baku', 'tutoring Baku', 'SAT prep', 'SAT Baku', 'IELTS Baku', 'TOEFL', 'DİM preparation', 'mathematics Baku', 'English courses Baku', 'IT courses Baku', 'programming courses Baku', 'Study Abroad', 'Fuad Ismayilov'],
  az: ['TED Academy', 'TED Academy Bakı', 'Bakıda tədris mərkəzi', 'Bakıda kurslar', 'SAT hazırlığı', 'SAT Bakı', 'IELTS Bakı', 'TOEFL', 'DİM hazırlığı', 'riyaziyyat Bakı', 'ingilis dili Bakı', 'IT kursları Bakı', 'proqramlaşdırma kursları Bakı', 'Study Abroad', 'repetitor Bakı', 'Fuad İsmayılov'],
};

/** Path segment for a locale (default ``ru`` has no prefix — ``localePrefix: 'as-needed'``). */
function localePath(locale: string): string {
  return locale === 'ru' ? '' : `/${locale}`;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  // Metadata must never crash the page if the backend is briefly unavailable —
  // fall back to sensible defaults (the page body itself is guarded by error.tsx).
  const meta = await getSite()
    .then((site) => site.content.meta)
    .catch(() => null);

  // Always resolve against the bundled defaults so the title/description are
  // never empty even if the backend is down or the field is null.
  const title =
    resolveLocalized(meta?.site_title ?? DEFAULT_SITE_BUNDLE.content.meta.site_title, locale) || 'TED Academy';
  const description =
    resolveLocalized(meta?.site_description ?? DEFAULT_SITE_BUNDLE.content.meta.site_description, locale) || undefined;
  const path = localePath(locale);
  const ogImage = meta?.og_image_url ?? undefined;
  const ogImages = ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined;

  // A missing/malformed NEXT_PUBLIC_SITE_URL must not 500 the metadata route
  // (the env getter throws when unset, and `new URL` throws on a bad value).
  // metadataBase is optional — degrade to undefined rather than crash.
  let metadataBase: URL | undefined;
  try {
    metadataBase = new URL(env.NEXT_PUBLIC_SITE_URL);
  } catch {
    metadataBase = undefined;
  }

  return {
    // ``default`` is the home title; ``template`` brands any future child pages.
    title: { default: title, template: '%s | TED Academy' },
    description,
    keywords: KEYWORDS[locale] ?? KEYWORDS.ru,
    metadataBase,
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description,
      url: path || '/',
      type: 'website',
      locale: OG_LOCALE[locale] ?? OG_LOCALE.ru,
      alternateLocale: Object.keys(OG_LOCALE)
        .filter((l) => l !== locale)
        .map((l) => OG_LOCALE[l]),
      // When the backend supplies no OG image, omit ``images`` entirely so the
      // file-based ``app/opengraph-image`` fallback applies instead.
      ...(ogImages ? { images: ogImages } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      // Same fallback story — Twitter reuses the OG image when none is set here.
      ...(ogImage ? { images: [ogImage] } : {}),
    },
    alternates: {
      canonical: path || '/',
      languages: {
        ru: '/',
        en: '/en',
        az: '/az',
        'x-default': '/',
      },
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const site = await getSite();

  // Base URL for the absolute ``@id``/``url`` in the JSON-LD graph; degrade to
  // relative rather than 500 the page if NEXT_PUBLIC_SITE_URL is somehow unset.
  let baseUrl = '';
  try {
    baseUrl = env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, '');
  } catch {
    baseUrl = '';
  }
  const jsonLd = buildSiteJsonLd({ site, locale, baseUrl });

  // Escape ``<`` so a backend-sourced string containing ``</script>`` can't break
  // out of the inline JSON-LD block (JSON.stringify leaves ``<`` intact).
  const jsonLdHtml = JSON.stringify(jsonLd).replace(/</g, '\\u003c');

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdHtml }}
      />
      <Nav
        announcement={resolveLocalized(site.content.hero.eyebrow, locale)}
        logoUrl={site.content.meta.logo_url}
      />
      <Hero hero={site.content.hero} contacts={site.content.contacts} locale={locale} />
      <Courses courses={site.courses} locale={locale} />
      <Subjects subjects={site.subjects} locale={locale} />
      <WhyUs whyUs={site.content.why_us} locale={locale} />
      <Results results={site.results ?? []} locale={locale} />
      <Founder founder={site.content.founder} locale={locale} />
      <Testimonials testimonials={site.testimonials} locale={locale} />
      <ContactChannels contacts={site.content.contacts} />
      <LeadForm courses={site.courses} />
      <Faq />
      <Footer
        contacts={site.content.contacts}
        locale={locale}
        logoUrl={site.content.meta.logo_url}
      />
    </>
  );
}
