'use client';

import { animate, motion, useMotionValue, useReducedMotion, type PanInfo } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useRef, useState } from 'react';

import { Reveal } from '@/components/ui/Reveal';
import { safeHex } from '@/lib/color';
import type { LandingTestimonial } from '@/lib/content';
import { resolveLocalized } from '@/lib/localized';

const AUTOPLAY_MS = 6000;
const SLIDE_TRANSITION = { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } as const;

export function Testimonials({
  testimonials,
  locale,
}: {
  testimonials: LandingTestimonial[];
  locale: string;
}) {
  const t = useTranslations('sections.reviews');
  const prefersReducedMotion = useReducedMotion();
  const [idx, setIdx] = useState(0);
  // ``paused`` is set while the pointer/keyboard focus is inside the carousel so
  // autoplay never advances out from under someone reading or interacting.
  const [paused, setPaused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const total = testimonials.length;

  // The strip is positioned in *pixels* (not %) so the drag gesture and the
  // programmatic slide animation share one unit — mixing px-drag with a
  // %-based transform is what made the swipe jump on release.
  const stripRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const x = useMotionValue(0);

  const go = useCallback(
    (next: number) => {
      if (total === 0) return;
      setIdx(((next % total) + total) % total);
    },
    [total],
  );

  // Measure one slide's width (== strip width; each slide is flex-[0_0_100%]).
  useEffect(() => {
    const el = stripRef.current;
    if (!el) return;
    const observer = new ResizeObserver(() => setWidth(el.offsetWidth));
    observer.observe(el);
    setWidth(el.offsetWidth);
    return () => observer.disconnect();
  }, []);

  // Keep the strip aligned to the active slide. Skipped while dragging so
  // framer owns ``x`` for a true 1:1 finger-follow; a too-small drag lands here
  // with idx unchanged and animates back (snap-back) for free.
  useEffect(() => {
    if (width === 0 || dragging) return;
    const target = -idx * width;
    if (prefersReducedMotion) {
      x.set(target);
      return;
    }
    const controls = animate(x, target, SLIDE_TRANSITION);
    return () => controls.stop();
  }, [idx, width, dragging, prefersReducedMotion, x]);

  useEffect(() => {
    if (total <= 1 || paused || dragging || prefersReducedMotion) return;
    const timer = setTimeout(() => setIdx((current) => (current + 1) % total), AUTOPLAY_MS);
    return () => clearTimeout(timer);
  }, [idx, paused, dragging, total, prefersReducedMotion]);

  // Commit a slide change when the user flicks/drags past a threshold (offset
  // distance OR velocity). Dragging right → previous, left → next. Bounded to
  // [0, total-1] — arrows/autoplay keep their own wrap-around via go().
  const handleDragEnd = useCallback(
    (_event: unknown, info: PanInfo) => {
      const { offset, velocity } = info;
      const threshold = Math.max(40, width * 0.2);
      let next = idx;
      if (offset.x > threshold || velocity.x > 500) next = idx - 1;
      else if (offset.x < -threshold || velocity.x < -500) next = idx + 1;
      setIdx(Math.max(0, Math.min(total - 1, next)));
      setDragging(false);
    },
    [idx, width, total],
  );

  if (total === 0) return null;

  return (
    <section id="reviews" className="px-5 py-16 sm:px-8 sm:py-24 md:py-30">
      <div className="container mx-auto max-w-[1240px]">
        <Reveal className="text-center">
          <div className="mb-3.5 text-xs font-semibold tracking-[0.18em] text-primary uppercase">
            {t('eyebrow')}
          </div>
          <h2 className="mb-10 font-extrabold leading-[1.05] tracking-[-0.03em] text-balance text-[clamp(30px,4vw,56px)] text-ink sm:mb-14">
            {t('heading')}
          </h2>
        </Reveal>

        <Reveal>
          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
          >
          <div className="overflow-hidden rounded-[28px] glass p-1">
            <motion.div
              ref={stripRef}
              className={
                prefersReducedMotion
                  ? 'flex'
                  : 'flex cursor-grab touch-pan-y active:cursor-grabbing'
              }
              style={{ x }}
              drag={!prefersReducedMotion && total > 1 && width > 0 ? 'x' : false}
              dragConstraints={{ left: -(total - 1) * width, right: 0 }}
              dragElastic={0.15}
              onDragStart={() => setDragging(true)}
              onDragEnd={handleDragEnd}
            >
              {testimonials.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-[0_0_100%] flex-col gap-6 p-6 sm:p-12 md:p-14"
                >
                  <p className="text-pretty font-medium leading-[1.55] tracking-[-0.012em] text-ink text-[clamp(18px,1.7vw,22px)]">
                    <span className="mb-4 block text-[48px] leading-none font-extrabold text-primary sm:text-[64px]">
                      “
                    </span>
                    {resolveLocalized(item.quote, locale)}
                  </p>
                  <div className="flex items-center gap-3.5">
                    <div
                      className="grid size-13 shrink-0 place-items-center rounded-full border-[2px] border-white/70 text-[18px] font-bold text-white shadow-[0_6px_14px_-4px_rgba(20,35,80,0.2)]"
                      style={{
                        background: `linear-gradient(135deg, ${safeHex(item.avatar_gradient_from, '#A601A9')}, ${safeHex(item.avatar_gradient_to, '#5A2BD8')})`,
                      }}
                    >
                      {item.avatar_initial}
                    </div>
                    <div>
                      <div className="text-[16px] font-bold text-ink">{item.author_name}</div>
                      <div className="mt-0.5 text-[13px] text-ink-3">
                        {resolveLocalized(item.author_role, locale)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              type="button"
              className="glass-strong grid size-11 cursor-pointer place-items-center rounded-full text-ink transition-transform hover:scale-105 sm:size-12"
              onClick={() => go(idx - 1)}
              aria-label={t('prev')}
            >
              <ArrowLeft className="size-5" />
            </button>
            <div className="flex gap-2">
              {testimonials.map((_, n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => go(n)}
                  aria-label={t('dot', { n: n + 1 })}
                  aria-current={n === idx ? 'true' : undefined}
                  className={
                    n === idx
                      ? 'h-2 w-7 cursor-pointer rounded bg-ink p-0 transition-all'
                      : 'size-2 cursor-pointer rounded-full border-0 bg-ink/20 p-0 transition-all'
                  }
                />
              ))}
            </div>
            <button
              type="button"
              className="glass-strong grid size-11 cursor-pointer place-items-center rounded-full text-ink transition-transform hover:scale-105 sm:size-12"
              onClick={() => go(idx + 1)}
              aria-label={t('next')}
            >
              <ArrowRight className="size-5" />
            </button>
          </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
