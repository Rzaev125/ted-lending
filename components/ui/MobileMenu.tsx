'use client';

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

interface MobileMenuLink {
  href: string;
  label: string;
}

/**
 * Burger menu for <lg viewports. The parent ``Nav`` is a server component and
 * passes already-localized strings in (this client island holds only the
 * open/close state). Hidden at ``lg`` and up, where the desktop link row +
 * CTA take over.
 *
 * While open it traps Tab focus inside the panel, locks background scroll, and
 * restores focus to the trigger on close — standard disclosure a11y.
 */
export function MobileMenu({
  links,
  ctaHref,
  ctaLabel,
  menuLabel,
}: {
  links: MobileMenuLink[];
  ctaHref: string;
  ctaLabel: string;
  menuLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Lock background scroll, move focus into the panel, and trap Tab while open.
  useEffect(() => {
    if (!open) return;

    const trigger = triggerRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const focusables = () =>
      Array.from(panelRef.current?.querySelectorAll<HTMLElement>('a, button') ?? []);
    // Move focus to the first link on open.
    focusables()[0]?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (event.key !== 'Tab') return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
      // Return focus to the burger trigger after the panel closes.
      trigger?.focus();
    };
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={menuLabel}
        aria-expanded={open}
        aria-controls="mobile-menu"
        className="grid size-10 cursor-pointer place-items-center rounded-full text-ink transition-colors hover:text-primary"
      >
        {open ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id="mobile-menu"
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ duration: reduce ? 0 : 0.2, ease: 'easeOut' }}
            className="glass-strong absolute top-full right-0 left-0 mt-3 flex flex-col gap-1 rounded-[24px] p-3"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-[15px] font-medium text-ink-2 transition-colors hover:bg-ink/[0.04] hover:text-primary"
              >
                {link.label}
              </a>
            ))}
            <a
              href={ctaHref}
              onClick={() => setOpen(false)}
              className="mt-1 rounded-full bg-ink px-5 py-3 text-center text-[15px] font-semibold text-white transition-colors hover:bg-primary"
            >
              {ctaLabel}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
