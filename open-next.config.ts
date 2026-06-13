import { defineCloudflareConfig } from '@opennextjs/cloudflare';

/**
 * OpenNext → Cloudflare Workers adapter config.
 *
 * Minimal setup: SSR + time-based ISR (`revalidate = 60`) work out of the box.
 *
 * The `/api/revalidate` webhook calls `revalidateTag('site')`. For that tag
 * invalidation to persist across Worker instances you must back it with durable
 * storage — add an R2 incremental cache + a tag cache, e.g.:
 *
 *   import r2IncrementalCache from '@opennextjs/cloudflare/overrides/incremental-cache/r2-incremental-cache';
 *   import d1NextTagCache from '@opennextjs/cloudflare/overrides/tag-cache/d1-next-tag-cache';
 *   export default defineCloudflareConfig({
 *     incrementalCache: r2IncrementalCache,
 *     tagCache: d1NextTagCache,
 *   });
 *
 * and declare the matching R2 bucket + D1 binding in wrangler.jsonc. Without
 * them the page still renders and time-based revalidation still runs; only the
 * cross-instance on-demand webhook is a no-op.
 */
export default defineCloudflareConfig({});
