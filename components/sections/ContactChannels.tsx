import { getTranslations } from 'next-intl/server';

import { Reveal } from '@/components/ui/Reveal';
import { CONTACT_LINKS } from '@/lib/links';

/**
 * Секция контактных каналов главной страницы (перенесена со старой страницы-визитки
 * `/links`). Переиспользует статический конфиг `CONTACT_LINKS` (lib/links.ts) и i18n
 * `links`. Кнопки сохраняют фирменные градиенты каналов, но раскладываются адаптивной
 * сеткой: 1 колонка (моб.) → 2 (sm) → 3 (md) → ряд из 5 (lg+).
 */
export async function ContactChannels() {
  const t = await getTranslations('links');
  return (
    <section id="contacts" className="px-5 py-16 sm:px-8 sm:py-24 md:py-30">
      <div className="container mx-auto max-w-[1240px]">
        <Reveal className="text-center">
          <div className="mb-3.5 text-xs font-semibold tracking-[0.18em] text-primary uppercase">
            {t('eyebrow')}
          </div>
          <h2 className="mb-4 font-extrabold leading-[1.05] tracking-[-0.03em] text-balance text-[clamp(30px,4vw,56px)] text-ink">
            {t('title')}
          </h2>
          <p className="mx-auto mb-14 max-w-[620px] text-[18px] leading-[1.55] text-ink-2">
            {t('subtitle')}
          </p>
        </Reveal>

        <div className="mx-auto grid max-w-[920px] grid-cols-2 gap-4 md:grid-cols-4">
          {CONTACT_LINKS.map(({ id, href, gradient, external, Icon }, index) => (
            <Reveal key={id} className="h-full" delay={Math.min(index, 6) * 0.07}>
              <a
                href={href}
                {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                className="group flex h-full flex-col items-center gap-3 rounded-2xl px-5 py-6 text-center text-white shadow-[0_8px_22px_-10px_rgba(0,0,0,0.45)] transition-transform hover:-translate-y-1 active:scale-[0.99]"
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
