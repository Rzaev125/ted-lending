/**
 * Resolve a localized string against the configured fallback chain.
 *
 * Backend ``LocalizedText`` JSONB blobs always carry ``ru`` and may also carry
 * ``en`` / ``az``. When the requested language is missing the chain falls
 * back ru → en → az (see ``backend/app/schemas/common.py``).
 */

const FALLBACK_ORDER = ['ru', 'en', 'az'] as const;

export type LocalizedText = { ru?: string; en?: string; az?: string };

export function resolveLocalized(data: LocalizedText | undefined | null, lang: string = 'ru'): string {
  if (!data) return '';
  const direct = data[lang as keyof LocalizedText];
  if (direct) return direct;
  for (const fallback of FALLBACK_ORDER) {
    const value = data[fallback];
    if (value) return value;
  }
  return '';
}
