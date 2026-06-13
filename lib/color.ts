/**
 * Guard backend-supplied colours before they reach an inline ``style``. The
 * backend already enforces ``^#[0-9A-Fa-f]{6}$`` (subject pills, avatar
 * gradients), so this is defence-in-depth against a misbehaving API rather than
 * a known hole — a bad value falls back to a safe brand colour.
 */
const HEX_RE = /^#[0-9A-Fa-f]{6}$/;

export function safeHex(value: string | null | undefined, fallback: string): string {
  return value && HEX_RE.test(value) ? value : fallback;
}
