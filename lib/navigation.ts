import { createNavigation } from 'next-intl/navigation';

import { routing } from './routing';

/**
 * Locale-aware navigation helpers. Unlike the plain ``next/navigation`` APIs,
 * these understand the ``as-needed`` locale prefix and set the ``NEXT_LOCALE``
 * cookie when navigating with an explicit ``locale`` — which is what makes the
 * language switcher able to return to the default locale without bouncing.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
