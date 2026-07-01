import Script from 'next/script';

import { env } from '@/lib/env';

/**
 * Google Analytics 4 + Yandex Metrica. Each loads ONLY when its id is set via
 * env (``NEXT_PUBLIC_GA_ID`` / ``NEXT_PUBLIC_YM_ID``), so the site ships zero
 * trackers until you configure them. The external origins are allowlisted in the
 * CSP in ``next.config.ts`` — update both together.
 *
 * Not a direct ranking factor, but essential for measuring what works; Metrica
 * additionally helps Yandex understand the site (relevant for the ru/az market).
 */
export function Analytics() {
  const ga = env.GA_ID;
  const ym = env.YM_ID;

  return (
    <>
      {ga && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${ga}`}
            strategy="afterInteractive"
          />
          <Script id="ga4-init" strategy="afterInteractive">
            {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${ga}');`}
          </Script>
        </>
      )}

      {ym && (
        <>
          <Script id="ym-init" strategy="afterInteractive">
            {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return;}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,'script','https://mc.yandex.ru/metrika/tag.js','ym');ym(${ym},'init',{clickmap:true,trackLinks:true,accurateTrackBounce:true});`}
          </Script>
          <noscript>
            <div>
              {/* eslint-disable-next-line @next/next/no-img-element -- Metrica noscript tracking pixel */}
              <img
                src={`https://mc.yandex.ru/watch/${ym}`}
                style={{ position: 'absolute', left: '-9999px' }}
                alt=""
              />
            </div>
          </noscript>
        </>
      )}
    </>
  );
}
