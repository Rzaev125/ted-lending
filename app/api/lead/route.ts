import { NextResponse, type NextRequest } from 'next/server';

import { env } from '@/lib/env';

/**
 * Locale-agnostic proxy that forwards landing-form submissions to the LMS
 * backend's anonymous ``POST /public/leads`` endpoint. Lives under
 * ``/api/*`` so the next-intl middleware leaves it alone (matcher excludes
 * the api prefix).
 */
const MAX_BODY_BYTES = 10_000;
const BACKEND_TIMEOUT_MS = 10_000;

export async function POST(request: NextRequest) {
  if (Number(request.headers.get('content-length') ?? 0) > MAX_BODY_BYTES) {
    return NextResponse.json({ error: 'payload_too_large' }, { status: 413 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
  }

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), BACKEND_TIMEOUT_MS);
  try {
    const response = await fetch(`${env.BACKEND_API_URL}/public/leads`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    const text = await response.text();
    return new NextResponse(text || '{}', {
      status: response.status,
      headers: { 'content-type': 'application/json' },
    });
  } catch (error) {
    console.error('Lead proxy failed to reach backend:', error);
    return NextResponse.json({ error: 'backend_unavailable' }, { status: 503 });
  } finally {
    clearTimeout(timeout);
  }
}
