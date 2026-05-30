"use client";

import Script from "next/script";

type GoogleTagManagerProps = {
  enabled: boolean;
};

export function GoogleTagManager({ enabled }: GoogleTagManagerProps) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  if (!enabled || !gtmId) return null;

  return (
    <Script id="gtm-init" strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({'gtm.start': new Date().getTime(), event: 'gtm.js'});
        var f = document.getElementsByTagName('script')[0],
          j = document.createElement('script'),
          dl = 'dataLayer' != 'dataLayer' ? '&l=' + 'dataLayer' : '';
        j.async = true;
        j.src = 'https://www.googletagmanager.com/gtm.js?id=${gtmId}' + dl;
        f.parentNode.insertBefore(j, f);
      `}
    </Script>
  );
}
