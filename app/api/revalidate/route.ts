import { revalidateTag } from 'next/cache';
import { NextResponse, type NextRequest } from 'next/server';

import { SITE_TAG } from '@/lib/content';
import { env } from '@/lib/env';
import { verifySignature } from '@/lib/revalidate';

/** Allowed clock skew between the LMS backend and the landing host. */
const MAX_AGE_SECONDS = 300;

/**
 * Cache-revalidation webhook called by the LMS backend whenever the owner
 * saves landing content. When ``REVALIDATE_SECRET`` is configured we require
 * a valid HMAC-SHA256 signature over the timestamp header; in dev (no secret)
 * the request is accepted unsigned for convenience.
 */
export async function POST(request: NextRequest) {
  const secret = env.REVALIDATE_SECRET;
  if (!secret) {
    // Fail closed in production: an unset secret would let anyone bust the cache.
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json({ error: 'secret_required' }, { status: 503 });
    }
    console.warn('REVALIDATE_SECRET unset — accepting unsigned revalidate (dev only)');
  }
  if (secret) {
    const timestamp = request.headers.get('x-revalidate-timestamp');
    const signature = request.headers.get('x-revalidate-signature');
    if (!timestamp || !signature) {
      return NextResponse.json({ error: 'missing_signature' }, { status: 401 });
    }
    if (!verifySignature(timestamp, signature, secret)) {
      return NextResponse.json({ error: 'invalid_signature' }, { status: 401 });
    }
    const age = Math.abs(Date.now() / 1000 - Number(timestamp));
    if (!Number.isFinite(age) || age > MAX_AGE_SECONDS) {
      return NextResponse.json({ error: 'expired' }, { status: 401 });
    }
  }
  revalidateTag(SITE_TAG);
  return NextResponse.json({ revalidated: true, tag: SITE_TAG });
}
