import { getTranslations } from 'next-intl/server';
import { Award } from 'lucide-react';

import { Reveal } from '@/components/ui/Reveal';
import type { FounderContent } from '@/lib/content';
import { resolveLocalized } from '@/lib/localized';

function initials(name: string): string {
  return name
    .split(/\s+/)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .filter(Boolean)
    .slice(0, 2)
    .join('');
}

export async function Founder({
  founder,
  locale,
}: {
  founder: FounderContent;
  locale: string;
}) {
  const t = await getTranslations('sections.founder');
  const fallbackInitials = initials(founder.name) || 'FI';
  return (
    <section id="founder" className="px-5 py-16 sm:px-8 sm:py-24 md:py-30">
      <div className="container mx-auto max-w-[1240px]">
        <Reveal className="text-center">
          <div className="mb-3.5 text-xs font-semibold tracking-[0.18em] text-primary uppercase">
            {t('eyebrow')}
          </div>
          <h2 className="mb-8 font-extrabold leading-[1.05] tracking-[-0.03em] text-balance text-[clamp(30px,4vw,56px)] text-ink sm:mb-14">
            {t('heading')}
          </h2>
        </Reveal>

        <Reveal>
          <div className="glass grid grid-cols-1 overflow-hidden md:grid-cols-2 lg:grid-cols-[0.85fr_1fr]">
            <div
              className="relative grid min-h-[300px] place-items-center p-6 sm:p-10 md:min-h-[460px]"
              style={{
                background:
                  'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.6), transparent 60%), linear-gradient(135deg, #0a0799 0%, #7A1FC0 50%, #A601A9 100%)',
              }}
            >
              <div
                className="grid size-[220px] place-items-center rounded-full text-[88px] font-extrabold tracking-[-0.04em] text-white shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)]"
                style={{
                  background:
                    'linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.1))',
                  backdropFilter: 'blur(20px)',
                  border: '3px solid rgba(255,255,255,0.5)',
                }}
              >
                {fallbackInitials}
              </div>
              <div className="absolute bottom-8 left-8 flex items-center gap-2 rounded-full bg-white/90 px-4 py-2.5 text-[13px] font-semibold text-ink backdrop-blur">
                <Award className="size-3.5 text-primary" />
                {resolveLocalized(founder.badge_label, locale)}
              </div>
            </div>

            <div className="flex flex-col justify-center p-6 sm:p-12">
              <div className="mb-3 text-xs font-semibold tracking-[0.18em] text-primary uppercase">
                {resolveLocalized(founder.eyebrow, locale)}
              </div>
              <h3 className="mb-2 font-extrabold leading-[1.05] tracking-[-0.03em] text-[clamp(28px,3vw,40px)] text-ink">
                {founder.name}
              </h3>
              <p className="mb-6 text-[15px] font-medium text-ink-3">
                {resolveLocalized(founder.title, locale)}
              </p>
              {founder.bio_paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="mb-6 text-pretty text-[16px] leading-[1.6] text-ink-2"
                >
                  {resolveLocalized(paragraph, locale)}
                </p>
              ))}
              <div className="rounded-xl border-l-[3px] border-primary bg-primary/5 px-5 py-4 text-[15px] font-medium italic leading-[1.5] text-ink">
                {resolveLocalized(founder.quote, locale)}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
