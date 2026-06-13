import { createHmac, timingSafeEqual } from 'node:crypto';

/**
 * Constant-time HMAC verification.
 *
 * Backend sends ``hex(hmac_sha256(secret, timestamp))`` in the
 * ``x-revalidate-signature`` header. We recompute it on our side and compare
 * with ``timingSafeEqual`` to avoid timing oracles.
 */
export function verifySignature(timestamp: string, signature: string, secret: string): boolean {
  const expected = createHmac('sha256', secret).update(timestamp).digest();
  // Decode the hex header to raw bytes; an invalid/odd-length hex string yields
  // a buffer of a different length, so the guard rejects it before comparing.
  const provided = Buffer.from(signature, 'hex');
  if (provided.length !== expected.length) return false;
  return timingSafeEqual(expected, provided);
}
