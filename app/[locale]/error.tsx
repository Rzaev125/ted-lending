'use client';

import { useTranslations } from 'next-intl';
import { useEffect } from 'react';

/**
 * Locale-scoped error boundary. If the page render throws — most likely
 * ``getSite()`` failing because the LMS backend is unreachable — show a calm
 * fallback with a retry instead of a raw 500. ISR keeps serving the last good
 * page on revalidation errors, so this mainly covers a cold cache.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations('errors');
  useEffect(() => {
    console.error('Landing page render failed:', error);
  }, [error]);

  return (
    <div className="grid min-h-[70vh] place-items-center px-8">
      <div className="glass mx-auto max-w-[520px] p-12 text-center">
        <h1 className="mb-3 text-[28px] font-extrabold tracking-[-0.02em] text-ink">
          TED Academy
        </h1>
        <p className="mb-7 text-[15px] leading-relaxed text-ink-2">{t('loadFailedBody')}</p>
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:bg-primary"
        >
          {t('retry')}
        </button>
      </div>
    </div>
  );
}
