import { Reveal } from '@/components/ui/Reveal';
import { safeHex } from '@/lib/color';
import type { LandingSubjectPill } from '@/lib/content';
import { resolveLocalized } from '@/lib/localized';

export function Subjects({
  subjects,
  locale,
}: {
  subjects: LandingSubjectPill[];
  locale: string;
}) {
  if (subjects.length === 0) return null;
  // Defensive: enforce admin ordering even if the backend returns it unsorted.
  const visible = [...subjects].sort((a, b) => a.order_index - b.order_index);
  return (
    <section className="px-5 pb-16 sm:px-8 sm:pb-24 md:pb-30">
      <div className="container mx-auto max-w-[1080px]">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 auto-rows-fr">
          {visible.map((pill, index) => (
            <Reveal key={pill.id} className="h-full" delay={Math.min(index, 9) * 0.05}>
              <div className="glass flex h-full items-center gap-2.5 rounded-2xl px-4.5 py-3.5 text-[14px] font-semibold text-ink transition-all hover:-translate-y-0.5">
                <span
                  className="size-2 shrink-0 rounded-full"
                  style={{ backgroundColor: safeHex(pill.color_hex, '#2415C2') }}
                  aria-hidden="true"
                />
                {resolveLocalized(pill.label, locale)}
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
