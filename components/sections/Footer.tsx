import { getTranslations } from 'next-intl/server';
import { MapPin } from 'lucide-react';

import type { ContactsContent } from '@/lib/content';
import { resolveLocalized } from '@/lib/localized';

export async function Footer({
  contacts,
  locale,
  logoUrl,
}: {
  contacts: ContactsContent;
  locale: string;
  logoUrl?: string | null;
}) {
  const t = await getTranslations('footer');
  const tRoot = await getTranslations();
  return (
    <footer id="contact" className="relative z-10 pt-16 pb-10 sm:pt-20">
      <div className="container mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="glass grid grid-cols-1 gap-8 p-6 text-center sm:p-12 md:grid-cols-3 md:text-left lg:grid-cols-[1.2fr_1fr_1.4fr] lg:gap-10">
          <div className="order-1 md:order-0">
            <div className="mb-3.5 flex justify-center md:block">
              {/* eslint-disable-next-line @next/next/no-img-element -- logo is a dynamic presigned/local URL; next/image can't take an unknown presigned host */}
              <img src={logoUrl ?? '/Logo.avif'} alt={tRoot('brand')} width={1225} height={228} className="h-5 w-auto object-contain sm:h-5 lg:h-7" />
            </div>
            <p className="text-[14px] leading-[1.55] text-ink-2">{t('tagline')}</p>
          </div>

          <div className="order-2 md:order-0">
            <h4 className="mb-4 text-xs font-bold tracking-[0.18em] text-ink-3 uppercase">
              {t('addressHeading')}
            </h4>
            <ul className="flex flex-col gap-2.5 text-[15px] font-medium text-ink">
              <li>{resolveLocalized(contacts.address, locale)}</li>
              {contacts.hours.map((line, index) => (
                <li key={index} className="text-[13px] font-normal text-ink-3">
                  {resolveLocalized(line, locale)}
                </li>
              ))}
            </ul>
          </div>

          <div className="order-3 md:order-0">
            <h4 className="mb-4 text-xs font-bold tracking-[0.18em] text-ink-3 uppercase">
              {t('mapHeading')}
            </h4>
            <MapEmbed mapLink={contacts.map_link} locale={locale} title={t('mapHeading')} />
          </div>
        </div>

        <div className="mt-8 border-t border-ink/[0.06] pt-6 text-center text-[13px] text-ink-3">
          {t('copyright')}
        </div>
      </div>
    </footer>
  );
}

/**
 * Live Google Maps embed centered on TED Academy in Baku. Uses the keyless
 * ``output=embed`` search URL (no API key) so Google resolves the business
 * location by name. A CMS-provided ``map_link`` is honored only when it is
 * itself an embeddable URL (normal share links can't be framed). The iframe is
 * allowed by the ``frame-src`` directive in ``next.config.ts``.
 */
function MapEmbed({
  mapLink,
  locale,
  title,
}: {
  mapLink?: string | null;
  locale: string;
  title: string;
}) {
  // Only frame an owner-provided link when it's a Google Maps ``output=embed``
  // URL; anything else falls back to the keyless search embed (prevents an
  // arbitrary host being embedded in the iframe).
  const isEmbeddableGoogleMap = (link: string): boolean => {
    try {
      const u = new URL(link);
      return (
        (u.hostname === 'google.com' || u.hostname.endsWith('.google.com')) &&
        u.searchParams.get('output') === 'embed'
      );
    } catch {
      return false;
    }
  };
  const src =
    mapLink && isEmbeddableGoogleMap(mapLink)
      ? mapLink
      : `https://maps.google.com/maps?q=${encodeURIComponent('TED Academy, Baku')}&z=15&hl=${locale}&output=embed`;
  return (
    <div className="group relative overflow-hidden rounded-[20px] border border-glass-border">
      <iframe
        src={src}
        title={title}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="h-[180px] w-full border-0 saturate-[.82] brightness-[1.06] contrast-[.96] transition-[filter] duration-300 group-hover:brightness-100 group-hover:contrast-100 group-hover:saturate-100"
      />
      {/* Decorative marker (index.html style). pointer-events-none so the map stays draggable. */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-linear-to-br from-primary to-primary-2 text-white"
        style={{ animation: 'pulse-pin 2.2s ease-in-out infinite' }}
        aria-hidden="true"
      >
        <MapPin className="size-6" />
      </div>
    </div>
  );
}
