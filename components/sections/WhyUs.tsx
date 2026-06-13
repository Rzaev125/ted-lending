import { getTranslations } from 'next-intl/server';
import {
  BookMarked,
  Cpu,
  GraduationCap,
  HeartHandshake,
  Home,
  Languages,
  LineChart,
  Route,
  type LucideIcon,
} from 'lucide-react';

import { Reveal } from '@/components/ui/Reveal';
import type { WhyUsContent } from '@/lib/content';
import { resolveLocalized } from '@/lib/localized';

const ICON_MAP: Record<string, LucideIcon> = {
  cpu: Cpu,
  route: Route,
  'line-chart': LineChart,
  'heart-handshake': HeartHandshake,
  'book-marked': BookMarked,
  home: Home,
  'graduation-cap': GraduationCap,
  languages: Languages,
};

const TONE_RAMP = [
  'text-primary',
  'text-accent-pink',
  'text-accent-mint',
  'text-primary-2',
  'text-accent-amber',
  'text-[#7A1FC8]',
];

export async function WhyUs({ whyUs, locale }: { whyUs: WhyUsContent; locale: string }) {
  const t = await getTranslations('sections.whyUs');
  return (
    <section id="why" className="px-5 py-16 sm:px-8 sm:py-24 md:py-30">
      <div className="container mx-auto max-w-[1240px]">
        <Reveal className="text-center">
          <div className="mb-3.5 text-xs font-semibold tracking-[0.18em] text-primary uppercase">
            {t('eyebrow')}
          </div>
          <h2 className="mb-4 font-extrabold leading-[1.05] tracking-[-0.03em] text-balance text-[clamp(30px,4vw,56px)] text-ink">
            {resolveLocalized(whyUs.title, locale)}
          </h2>
          {whyUs.subtitle && (
            <p className="mx-auto mb-10 max-w-[620px] text-[18px] leading-[1.55] text-ink-2 sm:mb-14">
              {resolveLocalized(whyUs.subtitle, locale)}
            </p>
          )}
        </Reveal>

        <div className="grid grid-cols-1 gap-5.5 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {whyUs.cards.map((card, index) => {
            const Icon = ICON_MAP[card.icon_key] ?? Cpu;
            const tone = TONE_RAMP[index % TONE_RAMP.length];
            return (
              <Reveal key={index} delay={Math.min(index, 6) * 0.07} className="h-full">
                <div className="glass flex h-full flex-col p-6 text-left sm:p-8">
                  <div className="mb-5 grid size-14 place-items-center rounded-[18px] bg-linear-to-br from-white/90 to-white/50 border border-glass-border shadow-[0_8px_16px_-8px_rgba(20,35,80,0.2)]">
                    <Icon className={`size-6.5 ${tone}`} />
                  </div>
                  <h3 className="mb-2.5 text-[clamp(17px,2vw,20px)] font-bold tracking-[-0.02em] text-ink">
                    {resolveLocalized(card.title, locale)}
                  </h3>
                  <p className="text-[15px] leading-[1.55] text-ink-2">
                    {resolveLocalized(card.body, locale)}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
