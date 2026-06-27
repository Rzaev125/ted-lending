import { MessageSquare, Phone } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { CtaButton } from '@/components/ui/CtaButton';
import type { ContactsContent, HeroContent } from '@/lib/content';
import { telHref, writeHref } from '@/lib/links';
import { resolveLocalized } from '@/lib/localized';

/**
 * The hero block: horizontal logo, animated two-tone display title with a
 * gradient accent on ``title_lead``, sub-paragraph, the «Позвоните нам» /
 * «Напишите нам» CTAs (call → ``tel:``, write → WhatsApp/e-mail, both from the
 * editable ``contacts``), and the statistic tiles below.
 */
export async function Hero({
  hero,
  contacts,
  locale,
}: {
  hero: HeroContent;
  contacts: ContactsContent;
  locale: string;
}) {
  const t = await getTranslations('hero');
  const callHref = telHref(contacts.phone);
  const messageHref = writeHref(contacts);
  const messageExternal = /^https?:/.test(messageHref);

  return (
    <section className="px-5 pt-20 pb-16 sm:px-8 sm:pt-24 sm:pb-20">
      {/* CSS ``.ted-reveal`` (not the framer <Reveal>) so this above-the-fold
          block — which holds the LCP <h1> — is server-rendered fully visible and
          isn't gated behind hydration. */}
      <div className="ted-reveal mx-auto max-w-[920px] text-center">
        <h1 className="font-extrabold leading-[1.02] tracking-[-0.035em] text-balance text-[clamp(36px,6.4vw,88px)] text-ink">
          <span className="block bg-linear-to-r from-primary via-primary-2 to-accent-pink bg-clip-text text-transparent">
            {resolveLocalized(hero.title_lead, locale)}
          </span>
          {/* Keyword-bearing descriptor for SEO + a11y; visually the hero stays
              the brand wordmark, screen readers/crawlers get "…— <city descriptor>". */}
          <span className="sr-only"> — {t('tagline')}</span>
        </h1>
        {(() => {
          // Slogan as a sub-headline (its own <p>, not inside the <h1>): the two
          // clauses are joined by an on-brand gradient em-dash; each half is
          // nowrap so on narrow screens it folds to two balanced lines at the
          // dash instead of breaking mid-word. Tolerant of a legacy "\n" split.
          const tail = resolveLocalized(hero.title_tail, locale);
          const sep = tail.includes('—') ? '—' : '\n';
          const [rawLead, ...rest] = tail.split(sep);
          const lead = rawLead.replace(/\s+/g, ' ').trim();
          const goal = rest.join(' ').replace(/\s+/g, ' ').trim();
          return (
            <p className="mx-auto mt-3 mb-10 max-w-[34ch] bg-linear-to-r from-primary via-primary-2 to-accent-pink bg-clip-text text-balance font-semibold italic tracking-[0.01em] text-transparent text-[clamp(19px,2.6vw,32px)] leading-[1.3] sm:mt-4 sm:mb-12">
              <span className="whitespace-nowrap">{lead}</span>
              {goal && (
                <>
                  <span aria-hidden="true" className="mx-[0.4ch]">
                    —
                  </span>
                  <span className="whitespace-nowrap">{goal}</span>
                </>
              )}
            </p>
          );
        })()}
        <p className="mx-auto mb-11 max-w-[680px] text-pretty leading-[1.55] text-ink-2 text-[clamp(17px,1.5vw,21px)]">
          {resolveLocalized(hero.subtitle, locale)}
        </p>
        <div className="flex flex-wrap justify-center gap-3.5">
          <CtaButton href={callHref} variant="primary">
            <Phone className="size-4.5" />
            {resolveLocalized(hero.cta_primary_label, locale)}
          </CtaButton>
          <CtaButton
            href={messageHref}
            variant="glass"
            {...(messageExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          >
            <MessageSquare className="size-4.5" />
            {resolveLocalized(hero.cta_secondary_label, locale)}
          </CtaButton>
        </div>

        {hero.stats.length > 0 && (
          <div className="mt-16 flex flex-wrap justify-center gap-x-10 gap-y-6 sm:gap-14">
            {hero.stats.map((stat, index) => (
              <div key={index}>
                <div className="font-extrabold leading-none tracking-[-0.03em] text-[32px] text-ink sm:text-[40px]">
                  {stat.value}
                </div>
                <div className="mt-1.5 text-[13px] font-medium text-ink-3">
                  {resolveLocalized(stat.label, locale)}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
