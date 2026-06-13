'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { createElement, type ReactNode } from 'react';

const VARIANTS: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  /** Used to override the wrapper element (default ``div``). */
  as?: 'div' | 'section' | 'article' | 'header' | 'footer';
}

/**
 * Wraps its children in a one-shot scroll-reveal: fade + translateY when at
 * least 12% of the element enters the viewport. Mirrors the IntersectionObserver
 * recipe from ``index.html`` but uses framer-motion so future animation tweaks
 * (stagger, exit, etc.) stay in one library.
 *
 * NOTE: for content that is ALWAYS in the viewport (a centered standalone card),
 * don't use this — ``whileInView`` doesn't reliably re-fire across a client-side
 * navigation and the SSR output starts at opacity:0 (invisible without JS). Use
 * the CSS ``.ted-reveal`` utility (``app/globals.css``) instead.
 */
export function Reveal({ children, delay = 0, className, as = 'div' }: RevealProps) {
  const prefersReducedMotion = useReducedMotion();
  // Honour the OS "reduce motion" setting: render the element statically with no
  // fade/translate instead of the scroll-reveal animation.
  if (prefersReducedMotion) {
    return createElement(as, { className }, children);
  }

  const MotionTag = motion[as];
  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay }}
      variants={VARIANTS}
    >
      {children}
    </MotionTag>
  );
}
