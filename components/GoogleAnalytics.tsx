"use client";

import Script from "next/script";

type GoogleAnalyticsProps = {
  analyticsConsentGranted: boolean;
};

export function GoogleAnalytics({ analyticsConsentGranted }: GoogleAnalyticsProps) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('consent', 'default', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied'
          });
          gtag('js', new Date());
          gtag('config', '${gaId}', { send_page_view: true });
          gtag('consent', 'update', {
            analytics_storage: '${analyticsConsentGranted ? "granted" : "denied"}',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied'
          });
        `}
      </Script>
    </>
  );
}
