import { ImageResponse } from 'next/og';

/**
 * Static brand fallback OG/Twitter image (1200×630). Used whenever the backend
 * does not supply ``og_image_url`` (see ``app/[locale]/page.tsx``). Has no
 * dynamic params and reads no request data, so Next prerenders it to a static
 * asset at build time — no ``next/og`` work happens on the Cloudflare runtime.
 *
 * Text is kept Latin-only to stay on the bundled default font (no extra font
 * fetch), since this is a single brand card, not localized copy.
 */
export const alt = 'TED Academy — educational center in Baku';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #2415C2 0%, #7A1FC0 55%, #A601A9 100%)',
          color: '#ffffff',
          fontFamily: 'sans-serif',
          textAlign: 'center',
          padding: '0 80px',
        }}
      >
        <div style={{ fontSize: 104, fontWeight: 800, letterSpacing: '-0.03em' }}>TED Academy</div>
        <div style={{ fontSize: 42, marginTop: 28, opacity: 0.95 }}>Educational center in Baku</div>
        <div style={{ fontSize: 28, marginTop: 16, opacity: 0.82 }}>
          Mathematics · SAT · IELTS · DİM · Study Abroad
        </div>
      </div>
    ),
    { ...size },
  );
}
