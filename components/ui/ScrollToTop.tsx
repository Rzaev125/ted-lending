'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';

const SHOW_AFTER_PX = 600;

/**
 * Floating scroll-to-top button. Appears after scrolling past ~600px and jumps
 * back to the top. Rendered once per locale page from the locale layout.
 */
export function ScrollToTop() {
  const t = useTranslations('nav');
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        setVisible(window.scrollY > SHOW_AFTER_PX);
        frame = 0;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={() =>
            window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' })
          }
          aria-label={t('toTop')}
          initial={reduce ? false : { opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: reduce ? 0 : 0.2, ease: 'easeOut' }}
          className="focus-ring glass-strong fixed right-5 bottom-5 z-40 grid size-12 cursor-pointer place-items-center rounded-full text-ink shadow-glass transition-colors hover:text-primary"
        >
          <ArrowUp className="size-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
