import { ArrowRight, BookOpen } from 'lucide-react';

import { Reveal } from '@/components/ui/Reveal';
import type { HeroContent } from '@/lib/content';
import { resolveLocalized } from '@/lib/localized';

/**
 * The 80vh hero block: animated eyebrow pill, two-tone display title with a
 * gradient accent on ``title_lead``, sub-paragraph, two CTAs, and the four
 * statistic tiles below.
 */
export function Hero({ hero, locale }: { hero: HeroContent; locale: string }) {
  return (
    <section className="px-5 pt-20 pb-16 sm:px-8 sm:pt-24 sm:pb-20">
      <Reveal className="mx-auto max-w-[920px] text-center">
        <h1 className="mb-6 font-extrabold leading-[1.02] tracking-[-0.035em] text-balance text-[clamp(36px,6.4vw,88px)] text-ink">
          <span className="bg-linear-to-r from-primary via-primary-2 to-accent-pink bg-clip-text text-transparent">
            {resolveLocalized(hero.title_lead, locale)}
          </span>
          {resolveLocalized(hero.title_tail, locale)}
        </h1>
        <p className="mx-auto mb-11 max-w-[680px] text-pretty leading-[1.55] text-ink-2 text-[clamp(17px,1.5vw,21px)]">
          {resolveLocalized(hero.subtitle, locale)}
        </p>
        <div className="flex flex-wrap justify-center gap-3.5">
          <a
            href="#form"
            className="inline-flex items-center gap-2.5 rounded-full bg-ink px-7 py-4 text-[15px] font-semibold text-white shadow-[0_14px_30px_-10px_rgba(12,20,36,0.4)] transition-all hover:-translate-y-0.5 hover:bg-primary hover:shadow-[0_20px_40px_-12px_rgba(36,21,194,0.5)]"
          >
            {resolveLocalized(hero.cta_primary_label, locale)}
            <ArrowRight className="size-4.5" />
          </a>
          <a
            href="#courses"
            className="glass inline-flex items-center gap-2.5 rounded-full px-7 py-4 text-[15px] font-semibold text-ink transition-all hover:-translate-y-0.5"
          >
            <BookOpen className="size-4.5" />
            {resolveLocalized(hero.cta_secondary_label, locale)}
          </a>
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
      </Reveal>
    </section>
  );
}
