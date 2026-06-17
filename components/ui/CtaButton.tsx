import type { ComponentProps } from 'react';

/**
 * Large pill CTA shared by the hero and the contacts section (the two places
 * that repeated the same long class string). Renders an anchor — used for the
 * call (`tel:`) / write (WhatsApp · mailto) / scroll links.
 *
 * ``variant`` picks the dark-ink (primary) or frosted-glass skin; any size or
 * layout extras (e.g. ``w-full``) go through ``className``. The keyboard focus
 * ring comes from the shared ``.focus-ring`` utility.
 */
const VARIANT_CLASS = {
  primary:
    'bg-ink text-white shadow-[0_14px_30px_-10px_rgba(12,20,36,0.4)] hover:bg-primary hover:shadow-[0_20px_40px_-12px_rgba(36,21,194,0.5)]',
  glass: 'glass text-ink',
} as const;

export function CtaButton({
  variant = 'primary',
  className = '',
  children,
  ...props
}: ComponentProps<'a'> & { variant?: 'primary' | 'glass' }) {
  return (
    <a
      className={`focus-ring inline-flex items-center justify-center gap-2.5 rounded-full px-7 py-4 text-[15px] font-semibold no-underline transition-all hover:-translate-y-0.5 ${VARIANT_CLASS[variant]} ${className}`}
      {...props}
    >
      {children}
    </a>
  );
}
