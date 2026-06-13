/**
 * Public bundle returned by ``GET /public/site`` on the LMS API.
 *
 * Mirrors the Pydantic shape from ``backend/app/schemas/landing.py``. Kept
 * structurally aligned with ``frontend-lms/src/api/site.ts`` so PR-2 and PR-3
 * share a vocabulary.
 */

import { DEFAULT_SITE_BUNDLE } from './defaults';
import { env } from './env';
import type { LocalizedText } from './localized';

// ============================================================================
// site_content
// ============================================================================

export interface HeroStat {
  value: string;
  label: LocalizedText;
}

export interface HeroContent {
  eyebrow: LocalizedText;
  title_lead: LocalizedText;
  title_tail: LocalizedText;
  subtitle: LocalizedText;
  cta_primary_label: LocalizedText;
  cta_secondary_label: LocalizedText;
  stats: HeroStat[];
}

export interface WhyUsCard {
  icon_key: string;
  title: LocalizedText;
  body: LocalizedText;
}

export interface WhyUsContent {
  eyebrow: LocalizedText;
  title: LocalizedText;
  subtitle?: LocalizedText | null;
  cards: WhyUsCard[];
}

export interface FounderContent {
  eyebrow: LocalizedText;
  name: string;
  title: LocalizedText;
  badge_label: LocalizedText;
  bio_paragraphs: LocalizedText[];
  quote: LocalizedText;
}

export interface ContactsContent {
  phone: string;
  email: string;
  whatsapp_url?: string | null;
  telegram_url?: string | null;
  address: LocalizedText;
  hours: LocalizedText[];
  map_link?: string | null;
}

export interface MetaContent {
  site_title?: LocalizedText | null;
  site_description?: LocalizedText | null;
  og_image_url?: string | null;
  /** Resolved (presigned) URL of the owner-uploaded logo, or null → use the
   *  bundled ``/Logo.avif`` fallback. */
  logo_url?: string | null;
}

export interface SiteContentRead {
  hero: HeroContent;
  why_us: WhyUsContent;
  founder: FounderContent;
  contacts: ContactsContent;
  meta: MetaContent;
  updated_at: string;
}

// ============================================================================
// repeating entities
// ============================================================================

export type LandingCourseIcon = 'math' | 'languages' | 'exam' | 'it';

export interface LandingCourse {
  id: string;
  order_index: number;
  icon_key: LandingCourseIcon;
  title: Record<string, string>;
  body: Record<string, string>;
  link_url: string | null;
  archived_at: string | null;
}

export interface LandingSubjectPill {
  id: string;
  order_index: number;
  label: Record<string, string>;
  color_hex: string;
}

export interface LandingTestimonial {
  id: string;
  order_index: number;
  quote: Record<string, string>;
  author_name: string;
  author_role: Record<string, string>;
  avatar_initial: string;
  avatar_gradient_from: string;
  avatar_gradient_to: string;
  archived_at: string | null;
}

export interface PublicSiteBundle {
  content: SiteContentRead;
  courses: LandingCourse[];
  subjects: LandingSubjectPill[];
  testimonials: LandingTestimonial[];
}

// ============================================================================
// fetcher
// ============================================================================

/** Tag used by both the ISR fetch and the revalidate webhook. */
export const SITE_TAG = 'site';

/** Cap the SSR fetch so a hung backend falls back instead of hanging the render. */
const SITE_FETCH_TIMEOUT_MS = 5000;

/**
 * Server-side fetch of the public site bundle. Cached at the edge by Next's
 * data layer with the ``site`` tag — the LMS triggers ``revalidateTag('site')``
 * via the webhook in ``app/api/revalidate/route.ts`` whenever the owner saves
 * content.
 *
 * Resilient by design: if the backend is unreachable, errors, or times out, we
 * log and return the bundled {@link DEFAULT_SITE_BUNDLE} so the landing page
 * still renders fully instead of crashing into the error boundary. (ISR keeps
 * serving the last good content while the cache is warm; this covers the cold
 * start / backend-down case.)
 */
export async function getSite(): Promise<PublicSiteBundle> {
  try {
    const response = await fetch(`${env.BACKEND_API_URL}/public/site`, {
      next: { revalidate: 60, tags: [SITE_TAG] },
      signal: AbortSignal.timeout(SITE_FETCH_TIMEOUT_MS),
    });
    if (!response.ok) {
      throw new Error(`Failed to fetch /public/site: ${response.status}`);
    }
    return (await response.json()) as PublicSiteBundle;
  } catch (error) {
    console.warn('[landing] /public/site unavailable — using bundled defaults:', error);
    return DEFAULT_SITE_BUNDLE;
  }
}
