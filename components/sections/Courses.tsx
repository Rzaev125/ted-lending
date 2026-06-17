import { getTranslations } from 'next-intl/server';
import { Code, GraduationCap, Languages, Sigma, type LucideIcon } from 'lucide-react';

import { Reveal } from '@/components/ui/Reveal';
import { SectionHeading } from '@/components/ui/SectionHeading';
import type { LandingCourse, LandingCourseIcon } from '@/lib/content';
import { resolveLocalized } from '@/lib/localized';

const ICON_MAP: Record<LandingCourseIcon, LucideIcon> = {
  math: Sigma,
  languages: Languages,
  exam: GraduationCap,
  it: Code,
};

const TONE_MAP: Record<LandingCourseIcon, string> = {
  math: 'bg-linear-to-br from-primary to-accent-mint shadow-[0_8px_20px_-8px_var(--color-primary)]',
  languages:
    'bg-linear-to-br from-accent-mint to-accent-indigo shadow-[0_8px_20px_-8px_var(--color-accent-mint)]',
  exam: 'bg-linear-to-br from-accent-amber to-accent-magenta shadow-[0_8px_20px_-8px_var(--color-accent-amber)]',
  it: 'bg-linear-to-br from-primary-2 to-accent-pink shadow-[0_8px_20px_-8px_var(--color-primary-2)]',
};

export async function Courses({ courses, locale }: { courses: LandingCourse[]; locale: string }) {
  // Defensive: hide archived entries and enforce admin ordering even if the
  // backend returns an unsorted/unfiltered list.
  const visible = courses
    .filter((course) => !course.archived_at)
    .sort((a, b) => a.order_index - b.order_index);
  if (visible.length === 0) return null;
  const t = await getTranslations('sections.courses');
  return (
    <section id="courses" className="px-5 py-16 sm:px-8 sm:py-24 md:py-30">
      <div className="container mx-auto max-w-[1240px]">
        <Reveal className="text-center">
          <SectionHeading
            eyebrow={t('eyebrow')}
            heading={t('heading')}
            subheading={t('subheading')}
          />
        </Reveal>

        <div className="grid grid-cols-1 gap-5.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-fr">
          {visible.map((course, index) => {
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
