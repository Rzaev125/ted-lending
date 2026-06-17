import { MessageSquare, Phone } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { CtaButton } from '@/components/ui/CtaButton';
import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { ContactsContent } from '@/lib/content';
import { buildContactLinks, telHref, writeHref } from '@/lib/links';

/**
 * Секция контактных каналов главной страницы (перенесена со старой страницы-визитки
 * `/links`). Телефон, e-mail и WhatsApp берутся из редактируемого слоя `contacts`
 * (см. `lib/links.ts` → `buildContactLinks`); URL соцсетей — статика. Кнопки сохраняют
 * фирменные градиенты каналов и раскладываются адаптивной сеткой.
 *
 * Сверху — сквозная пара CTA «Позвоните нам» / «Напишите нам» (ТЗ §8, дублирует
 * кнопки hero), ведущая на `tel:` и WhatsApp/e-mail из тех же контактов.
 */
export async function ContactChannels({ contacts }: { contacts: ContactsContent }) {
  const t = await getTranslations('links');
  const tCta = await getTranslations('cta');
  const links = buildContactLinks(contacts);
  const callHref = telHref(contacts.phone);
  const messageHref = writeHref(contacts);
  const messageExternal = /^https?:/.test(messageHref);

  return (
    <section id="contacts" className="px-5 py-16 sm:px-8 sm:py-24 md:py-30">
      <div className="container mx-auto max-w-[1240px]">
        <Reveal className="text-center">
          <SectionHeading
            eyebrow={t('eyebrow')}
            heading={t('title')}
            subheading={t('subtitle')}
            subheadingClassName="mb-9"
          />
        </Reveal>

        <Reveal>
          <div className="mb-12 flex flex-wrap justify-center gap-3.5 sm:mb-14">
            <CtaButton href={callHref} variant="primary">
              <Phone className="size-4.5" />
              {tCta('call')}
            </CtaButton>
            <CtaButton
              href={messageHref}
              variant="glass"
              {...(messageExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <MessageSquare className="size-4.5" />
              {tCta('write')}
            </CtaButton>
          </div>
        </Reveal>

        <div className="mx-auto grid max-w-[920px] grid-cols-2 gap-4 md:grid-cols-4">
          {links.map(({ id, href, gradient, external, Icon }, index) => (
            <Reveal key={id} className="h-full" delay={Math.min(index, 6) * 0.07}>
              <a
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="focus-ring group flex h-full flex-col items-center gap-3 rounded-2xl px-5 py-6 text-center text-white shadow-[0_8px_22px_-10px_rgba(0,0,0,0.45)] transition-transform hover:-translate-y-1 active:scale-[0.99]"
                style={{ background: gradient }}
              >
                <span className="grid size-12 place-items-center rounded-2xl bg-white/15">
                  <Icon className="size-6" />
                </span>
                <span className="text-[15px] font-semibold leading-tight">{t(id)}</span>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
