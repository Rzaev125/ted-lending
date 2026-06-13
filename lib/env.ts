/**
 * Lazy environment accessors.
 *
 * Wrapped in getters so that ``next build`` can statically analyse the routes
 * without setting BACKEND_API_URL at compile time. Each call validates the
 * required vars only when the value is actually needed (at request time).
 */

function required(name: string, value: string | undefined): string {
  if (!value) throw new Error(`Missing required env var: ${name}`);
  return value;
}

export const env = {
  get BACKEND_API_URL(): string {
    return required('BACKEND_API_URL', process.env.BACKEND_API_URL);
  },
  get REVALIDATE_SECRET(): string {
    return process.env.REVALIDATE_SECRET ?? '';
  },
  get NEXT_PUBLIC_SITE_URL(): string {
    const value = process.env.NEXT_PUBLIC_SITE_URL;
    if (value) return value;
    // Fail closed in production: an unset value would silently ship localhost
    // URLs in sitemap/robots/canonical/OG. Dev keeps the convenience fallback.
    if (process.env.NODE_ENV === 'production') {
      throw new Error('Missing required env var: NEXT_PUBLIC_SITE_URL');
    }
    return 'http://localhost:3000';
  },
};
