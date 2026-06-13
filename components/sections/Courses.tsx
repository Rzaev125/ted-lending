import { getTranslations } from 'next-intl/server';
import { Code, GraduationCap, Languages, Sigma, type LucideIcon } from 'lucide-react';

import { Reveal } from '@/components/ui/Reveal';
import type { LandingCourse, LandingCourseIcon } from '@/lib/content';
import { resolveLocalized } from '@/lib/localized';

const ICON_MAP: Record<LandingCourseIcon, LucideIcon> = {
  math: Sigma,
  languages: Languages,
  exam: GraduationCap,
  it: Code,
};

const TONE_MAP: Record<LandingCourseIcon, string> = {
  math: 'bg-linear-to-br from-[#2415C2] to-[#5A2BD8] shadow-[0_8px_20px_-8px_#2415C2]',
  languages: 'bg-linear-to-br from-[#5A2BD8] to-[#8A2BD0] shadow-[0_8px_20px_-8px_#5A2BD8]',
  exam: 'bg-linear-to-br from-[#8E18BE] to-[#B215A6] shadow-[0_8px_20px_-8px_#8E18BE]',
  it: 'bg-linear-to-br from-[#A601A9] to-[#C42BB0] shadow-[0_8px_20px_-8px_#A601A9]',
};

export async function Courses({ courses, locale }: { courses: LandingCourse[]; locale: string }) {
  if (courses.length === 0) return null;
  const t = await getTranslations('sections.courses');
  return (
    <section id="courses" className="px-5 py-16 sm:px-8 sm:py-24 md:py-30">
      <div className="container mx-auto max-w-[1240px]">
        <Reveal className="text-center">
          <div className="mb-3.5 text-xs font-semibold tracking-[0.18em] text-primary uppercase">
            {t('eyebrow')}
          </div>
          <h2 className="mb-4 font-extrabold leading-[1.05] tracking-[-0.03em] text-balance text-[clamp(30px,4vw,56px)] text-ink">
            {t('heading')}
          </h2>
          <p className="mx-auto mb-10 max-w-[620px] text-[18px] leading-[1.55] text-ink-2 sm:mb-14">
            {t('subheading')}
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-5.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-fr">
          {courses.map((course, index) => {
            const Icon = ICON_MAP[course.icon_key] ?? Sigma;
            const tone = TONE_MAP[course.icon_key] ?? TONE_MAP.math;
            return (
              <Reveal key={course.id} className="h-full" delay={Math.min(index, 6) * 0.07}>
                <article className="glass flex h-full flex-col p-6 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-glass-hover sm:p-7">
                  <div className={`mb-5.5 grid size-14 place-items-center rounded-[18px] ${tone}`}>
                    <Icon className="size-7 text-white" />
                  </div>
                  <h3 className="mb-2.5 text-[clamp(18px,2vw,22px)] font-bold tracking-[-0.02em] text-ink">
                    {resolveLocalized(course.title, locale)}
                  </h3>
                  <p className="text-[15px] leading-relaxed text-ink-2">
                    {resolveLocalized(course.body, locale)}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
