import { ChevronDown } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';

/**
 * FAQ accordion built on native ``<details>``/``<summary>`` — every answer ships
 * in the DOM (collapsed only visually), so crawlers index the keyword-rich copy
 * and no client JS is needed. Also emits a ``FAQPage`` JSON-LD block for the
 * rich FAQ result in Google. Content is static (from messages), trilingual.
 */
const FAQ_KEYS = ['courses', 'location', 'languages', 'trial', 'exams', 'online'] as const;

export async function Faq() {
  const t = await getTranslations('sections.faq');
  const items = FAQ_KEYS.map((key) => ({ q: t(`items.${key}.q`), a: t(`items.${key}.a`) }));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: { '@type': 'Answer', text: item.a },
    })),
  };
  // Escape ``<`` so a stray ``</script>`` in copy can't break out of the block.
  const jsonLdHtml = JSON.stringify(jsonLd).replace(/</g, '\\u003c');

  return (
    <section id="faq" className="px-5 py-16 sm:px-8 sm:py-24 md:py-30">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml }} />
      <div className="container mx-auto max-w-[820px]">
        <Reveal className="mb-10 text-center sm:mb-14">
          <SectionHeading eyebrow={t('eyebrow')} heading={t('heading')} />
        </Reveal>
        <div className="flex flex-col gap-3.5">
          {items.map((item, index) => (
            <Reveal key={index} delay={Math.min(index, 6) * 0.05}>
              <details className="glass group rounded-2xl p-5 sm:p-6">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[16px] font-semibold text-ink [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <ChevronDown
                    aria-hidden="true"
                    className="size-5 shrink-0 text-ink-3 transition-transform duration-300 group-open:rotate-180"
                  />
                </summary>
                <p className="mt-3 text-[15px] leading-[1.6] text-ink-2">{item.a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
