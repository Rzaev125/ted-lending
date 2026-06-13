import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';

import { ContactChannels } from '@/components/sections/ContactChannels';
import { Courses } from '@/components/sections/Courses';
import { Footer } from '@/components/sections/Footer';
import { Founder } from '@/components/sections/Founder';
import { Hero } from '@/components/sections/Hero';
import { LeadForm } from '@/components/sections/LeadForm';
import { Nav } from '@/components/sections/Nav';
import { Subjects } from '@/components/sections/Subjects';
import { Testimonials } from '@/components/sections/Testimonials';
import { WhyUs } from '@/components/sections/WhyUs';
import { getSite } from '@/lib/content';
import { env } from '@/lib/env';
import { resolveLocalized } from '@/lib/localized';

export const revalidate = 60;

/** Map next-intl codes to Open Graph territory-qualified locales. */
const OG_LOCALE: Record<string, string> = { ru: 'ru_RU', en: 'en_US', az: 'az_AZ' };

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

  const title = resolveLocalized(meta?.site_title ?? undefined, locale) || 'TED Academy';
  const description = resolveLocalized(meta?.site_description ?? undefined, locale) || undefined;
  const path = localePath(locale);
  const ogImage = meta?.og_image_url ?? undefined;

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
    title,
    description,
    metadataBase,
    openGraph: {
      title,
      description,
      url: path || '/',
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined,
      type: 'website',
      locale: OG_LOCALE[locale] ?? OG_LOCALE.ru,
      alternateLocale: Object.keys(OG_LOCALE)
        .filter((l) => l !== locale)
        .map((l) => OG_LOCALE[l]),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
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

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'TED Academy',
    description: resolveLocalized(site.content.meta.site_description ?? undefined, locale) || undefined,
    url: `${env.NEXT_PUBLIC_SITE_URL}${localePath(locale)}`,
    telephone: site.content.contacts.phone,
    email: site.content.contacts.email,
    address: resolveLocalized(site.content.contacts.address, locale) || undefined,
  };

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
      <Hero hero={site.content.hero} locale={locale} />
      <Courses courses={site.courses} locale={locale} />
      <Subjects subjects={site.subjects} locale={locale} />
      <WhyUs whyUs={site.content.why_us} locale={locale} />
      <Founder founder={site.content.founder} locale={locale} />
      <Testimonials testimonials={site.testimonials} locale={locale} />
      <LeadForm courses={site.courses} />
      <ContactChannels />
      <Footer
        contacts={site.content.contacts}
        locale={locale}
        logoUrl={site.content.meta.logo_url}
      />
    </>
  );
}
