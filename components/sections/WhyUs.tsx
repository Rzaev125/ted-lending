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
  Users,
  type LucideIcon,
} from 'lucide-react';

import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { WhyUsContent } from '@/lib/content';
import { resolveLocalized } from '@/lib/localized';

const ICON_MAP: Record<string, LucideIcon> = {
  cpu: Cpu,
  route: Route,
  'line-chart': LineChart,
  'heart-handshake': HeartHandshake,
  'book-marked': BookMarked,
  home: Home,
  users: Users,
  'graduation-cap': GraduationCap,
  languages: Languages,
};

const TONE_RAMP = [
  'text-primary',
  'text-accent-pink',
  'text-accent-mint',
  'text-primary-2',
  'text-accent-amber',
  'text-accent-violet',
];

export async function WhyUs({ whyUs, locale }: { whyUs: WhyUsContent; locale: string }) {
  const t = await getTranslations('sections.whyUs');
  return (
    <section id="why" className="px-5 py-16 sm:px-8 sm:py-24 md:py-30">
      <div className="container mx-auto max-w-[1240px]">
        <Reveal className="mb-10 text-center sm:mb-14">
          <SectionHeading
            eyebrow={t('eyebrow')}
            heading={resolveLocalized(whyUs.title, locale)}
            headingClassName=""
          />
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

        {whyUs.subtitle && (
          <Reveal className="mt-12 sm:mt-16">
            <div className="mx-auto max-w-[860px] rounded-[28px] border-2 border-primary/25 bg-white/55 px-8 py-8 text-center shadow-glass backdrop-blur-md sm:px-12 sm:py-10">
              <p className="font-extrabold leading-[1.2] tracking-[-0.02em] text-balance text-[clamp(20px,2.6vw,30px)] text-ink">
                {resolveLocalized(whyUs.subtitle, locale)}
              </p>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
