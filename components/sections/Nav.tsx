import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

import { LanguageSwitcher } from '@/components/ui/LanguageSwitcher';
import { MobileMenu } from '@/components/ui/MobileMenu';
import { NavLinks } from '@/components/ui/NavLinks';

/**
 * Sticky glass-pill navigation. Anchor links jump to in-page sections.
 * Brand text comes from the ``brand`` message key (shared with the footer).
 *
 * Below ``md`` the section links + CTA collapse into a burger ``MobileMenu``;
 * the top row keeps just brand · language · burger.
 *
 * ``announcement`` (the hero eyebrow text) renders inside this sticky container
 * so it stays pinned and moves together with the header on scroll.
 */
export async function Nav({
  announcement,
  logoUrl,
}: {
  announcement?: string;
  logoUrl?: string | null;
}) {
  const t = await getTranslations('nav');
  const tRoot = await getTranslations();
  const links = [
    { href: '#courses', label: t('directions') },
    { href: '#why', label: t('whyUs') },
    { href: '#results', label: t('results') },
    { href: '#founder', label: t('founder') },
    { href: '#reviews', label: t('reviews') },
    // Points at the in-page ContactChannels section (#contacts), not the footer
    // (#contact): the footer is the last element, so anchoring there clamps the
    // scroll to the document bottom ("jumps too far"). #contacts lands cleanly
    // just below the sticky nav; the trial-lesson form and footer sit beneath it.
    // The id reads "contacts" so the URL hash matches the "Contacts" nav label.
    { href: '#contacts', label: t('contact') },
  ];
  return (
    <header className="group sticky top-5 z-50 mx-auto mt-5 max-w-[1100px] px-4 sm:px-6">
      <nav aria-label={t('menu')} className="glass-strong relative flex items-center justify-between gap-3 rounded-full px-4 py-3 sm:px-6 sm:py-3.5">
        <Link href="/" aria-label={tRoot('brand')} className="focus-ring flex shrink-0 items-center no-underline">
          {/* eslint-disable-next-line @next/next/no-img-element -- logo is a dynamic presigned/local URL; next/image can't take an unknown presigned host */}
          <img src={logoUrl ?? '/Logo.avif'} alt={tRoot('brand')} width={1225} height={228} className="h-5 w-auto object-contain sm:h-5 lg:h-7" />
        </Link>
        <NavLinks links={links} />
        <div className="flex items-center gap-2">
          <LanguageSwitcher />
          <a
            href="#form"
            className="focus-ring hidden rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-white no-underline transition-all hover:-translate-y-px hover:bg-primary xl:inline-flex"
          >
            {t('cta')}
          </a>
          <MobileMenu links={links} ctaHref="#form" ctaLabel={t('cta')} menuLabel={t('menu')} />
        </div>
      </nav>

      {announcement && (
        <div className="mt-3 flex max-w-full justify-center transition-opacity duration-200 group-has-[#mobile-menu]:pointer-events-none group-has-[#mobile-menu]:opacity-0">
          <div className="inline-flex max-w-[90%] items-center gap-2 rounded-full glass px-4 py-2 pl-2.5 text-center text-[13px] font-medium text-balance text-ink-2">
            <span className="relative inline-flex shrink-0">
              <span className="size-2 rounded-full bg-success" />
              <span className="absolute inset-0 size-2 rounded-full bg-success/22 ring-4 ring-success/22" />
            </span>
            {announcement}
          </div>
        </div>
      )}
    </header>
  );
}
