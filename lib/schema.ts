/**
 * schema.org JSON-LD builders for the landing's rich results.
 *
 * Emitted as a single ``@graph`` block from {@link ../app/[locale]/page}. The
 * graph models the academy as one node (EducationalOrganization + LocalBusiness)
 * plus a WebSite node and an ItemList of the offered Courses, cross-linked by
 * ``@id`` so Google reads them as one connected entity. All localizable text is
 * resolved per request via {@link ./localized}; the physical-location facts that
 * the editable content model does not carry (street, opening hours) live here as
 * stable constants.
 *
 * Deliberately NO ``aggregateRating`` — the data model has no real rating values
 * and inventing them violates Google's structured-data policy. Add it only once
 * the backend serves genuine ratings. ``geo`` is likewise omitted until real
 * coordinates exist (guessing would mislead Maps).
 */

import type { PublicSiteBundle } from './content';
import { SOCIAL_PROFILE_URLS } from './links';
import { type LocalizedText, resolveLocalized } from './localized';

/** Physical-location facts not present in the editable ``contacts`` model. */
const STREET_ADDRESS = 'Seyfəddin Dağlı 51';
const ADDRESS_LOCALITY = 'Baku';
const ADDRESS_COUNTRY = 'AZ';

/** Mon–Sat 10:00–18:00 — mirrors the ``contacts.hours`` copy. */
const OPENING_HOURS = {
  '@type': 'OpeningHoursSpecification',
  dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
  opens: '10:00',
  closes: '18:00',
};

/** Strip the ``[[…]]`` highlight markers the bio copy uses for the UI. */
function stripMarkup(value: string): string {
  return value.replace(/\[\[|\]\]/g, '').trim();
}

export function buildSiteJsonLd({
  site,
  locale,
  baseUrl,
}: {
  site: PublicSiteBundle;
  locale: string;
  baseUrl: string;
}) {
  const { content, courses } = site;
  const name = 'TED Academy';
  const orgId = `${baseUrl}/#organization`;
  const websiteId = `${baseUrl}/#website`;
  const description = resolveLocalized(content.meta.site_description ?? undefined, locale) || undefined;
  const logo = content.meta.logo_url ?? `${baseUrl}/Logo.avif`;
  const firstBio = content.founder.bio_paragraphs?.[0] as LocalizedText | undefined;

  const organization = {
    '@type': ['EducationalOrganization', 'LocalBusiness'],
    '@id': orgId,
    name,
    url: baseUrl || undefined,
    logo,
    image: logo,
    description,
    telephone: content.contacts.phone,
    email: content.contacts.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: STREET_ADDRESS,
      addressLocality: ADDRESS_LOCALITY,
      addressCountry: ADDRESS_COUNTRY,
    },
    areaServed: [{ '@type': 'City', name: 'Baku' }, 'Online'],
    openingHoursSpecification: [OPENING_HOURS],
    sameAs: SOCIAL_PROFILE_URLS,
    founder: {
      '@type': 'Person',
      name: content.founder.name,
      jobTitle: resolveLocalized(content.founder.title, locale) || undefined,
      description: firstBio ? stripMarkup(resolveLocalized(firstBio, locale)) || undefined : undefined,
    },
  };

  const website = {
    '@type': 'WebSite',
    '@id': websiteId,
    name,
    url: baseUrl || undefined,
    inLanguage: locale,
    publisher: { '@id': orgId },
  };

  const activeCourses = courses.filter((course) => !course.archived_at);
  const courseList = {
    '@type': 'ItemList',
    itemListElement: activeCourses.map((course, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Course',
        name: resolveLocalized(course.title, locale),
        description: resolveLocalized(course.body, locale) || undefined,
        provider: { '@id': orgId },
      },
    })),
  };

  return {
    '@context': 'https://schema.org',
    '@graph': activeCourses.length > 0 ? [organization, website, courseList] : [organization, website],
  };
}
