import { getTranslations } from 'next-intl/server';
import { GraduationCap } from 'lucide-react';

import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { safeHex } from '@/lib/color';
import type { LandingResult } from '@/lib/content';
import { resolveLocalized } from '@/lib/localized';

/**
 * "Results" — admission cards for our students: photo (or initial avatar),
 * name, the course they took and where they were admitted. Mirrors the static
 * card-grid pattern of {@link WhyUs}; the avatar reuses the gradient-initial
 * treatment from {@link Testimonials}.
 */
export async function Results({
  results,
  locale,
}: {
  results: LandingResult[];
  locale: string;
}) {
  // Defensive: hide archived entries and enforce admin ordering (order_index)
  // even if the backend returns an unsorted/unfiltered list.
  const items = results
    .filter((item) => !item.archived_at)
    .sort((a, b) => a.order_index - b.order_index);

  if (items.length === 0) return null;

  const t = await getTranslations('sections.results');

  return (
    <section id="results" className="px-5 py-16 sm:px-8 sm:py-24 md:py-30">
      <div className="container mx-auto max-w-[1240px]">
        <Reveal className="mb-10 text-center sm:mb-14">
          <SectionHeading
            eyebrow={t('eyebrow')}
            heading={t('heading')}
            subheading={t('subheading')}
            headingClassName="mb-4"
            subheadingClassName=""
          />
        </Reveal>

        <div className="grid grid-cols-1 gap-5.5 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {items.map((item, index) => (
            <Reveal key={item.id} delay={Math.min(index, 6) * 0.07} className="h-full">
              <div className="glass flex h-full flex-col items-center p-6 text-center sm:p-8">
                {item.photo_url ? (
                  // eslint-disable-next-line @next/next/no-img-element -- photo is a dynamic presigned/local URL; next/image can't take an unknown presigned host
                  <img
                    src={item.photo_url}
                    alt={item.author_name}
                    width={72}
                    height={72}
                    className="mb-4 size-18 shrink-0 rounded-full border-[2px] border-white/70 object-cover shadow-[0_6px_14px_-4px_rgba(20,35,80,0.2)]"
                  />
                ) : (
                  <div
                    className="mb-4 grid size-18 shrink-0 place-items-center rounded-full border-[2px] border-white/70 text-[24px] font-bold text-white shadow-[0_6px_14px_-4px_rgba(20,35,80,0.2)]"
                    style={{
                      background: `linear-gradient(135deg, ${safeHex(item.avatar_gradient_from, '#A601A9')}, ${safeHex(item.avatar_gradient_to, '#5A2BD8')})`,
                    }}
                  >
                    {item.avatar_initial}
                  </div>
                )}

                <h3 className="text-[clamp(17px,2vw,20px)] font-bold tracking-[-0.02em] text-ink">
                  {item.author_name}
                </h3>

                <span className="mt-2 inline-flex items-center rounded-full border border-glass-border bg-white/55 px-3 py-1 text-[12px] font-semibold tracking-[0.01em] text-primary">
                  {resolveLocalized(item.course, locale)}
                </span>

                <p className="mt-auto flex items-center justify-center gap-1.5 pt-4 text-[15px] leading-[1.45] font-medium text-ink-2">
                  <GraduationCap className="size-4.5 shrink-0 text-accent-mint" />
                  {resolveLocalized(item.admission, locale)}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
