import { getTranslations } from 'next-intl/server';
import Link from 'next/link';

export default async function NotFound() {
  const t = await getTranslations('errors');
  return (
    <div className="grid min-h-[70vh] place-items-center px-8">
      <div className="glass mx-auto max-w-[520px] p-12 text-center">
        <h1 className="mb-3 font-extrabold text-[28px] tracking-[-0.02em] text-ink">
          {t('notFoundTitle')}
        </h1>
        <p className="mb-7 text-[15px] leading-relaxed text-ink-2">{t('notFoundBody')}</p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-white no-underline transition-all hover:-translate-y-0.5 hover:bg-primary"
        >
          {t('back')}
        </Link>
      </div>
    </div>
  );
}
