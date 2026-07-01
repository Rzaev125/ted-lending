import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./lib/i18n.ts');

/**
 * CSP for the landing. Fonts are self-hosted by ``next/font`` so no Google
 * origins are needed. ``'unsafe-inline'`` is required for script (Next injects
 * inline RSC/bootstrap chunks; we have no nonce middleware) and for the many
 * inline ``style`` attributes (blobs, gradients). ``frame-src`` allows the
 * footer's Google Maps embed (the ``maps.google.com`` URL redirects to
 * ``www.google.com/maps/embed``). A nonce-based policy would be stricter —
 * revisit if a CSP nonce middleware is added.
 */
const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  // googletagmanager (GA4) + mc.yandex.ru (Metrica) load their tag scripts.
  "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://mc.yandex.ru",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self'",
  // Analytics beacons: GA → *.google-analytics.com / *.analytics.google.com,
  // Metrica → mc.yandex.ru / mc.yandex.com.
  "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://mc.yandex.ru https://mc.yandex.com",
  // Google Maps embed (footer) + Metrica webvisor frame.
  'frame-src https://www.google.com https://maps.google.com https://mc.yandex.ru',
  "frame-ancestors 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "form-action 'self'",
].join('; ');

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async headers() {
    const securityHeaders = [
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'geolocation=(), microphone=(), camera=()' },
    ];
    // HSTS + CSP only in production — they would interfere with the local dev
    // server (HTTP, HMR over ws, eval-based source maps).
    if (process.env.NODE_ENV === 'production') {
      securityHeaders.push(
        {
          key: 'Strict-Transport-Security',
          value: 'max-age=63072000; includeSubDomains; preload',
        },
        { key: 'Content-Security-Policy', value: CONTENT_SECURITY_POLICY },
      );
    }
    return [{ source: '/:path*', headers: securityHeaders }];
  },
};

export default withNextIntl(nextConfig);
