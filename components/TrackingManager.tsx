"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { GoogleTagManager } from "@/components/GoogleTagManager";

const STORAGE_KEY = "afnh_cookie_consent";

export function TrackingManager() {
  const [analyticsConsentGranted, setAnalyticsConsentGranted] = useState(false);

  useEffect(() => {
    const readConsent = () => {
      const accepted = window.localStorage.getItem(STORAGE_KEY) === "accepted";
      setAnalyticsConsentGranted(accepted);
      window.gtag?.("consent", "update", {
        analytics_storage: accepted ? "granted" : "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied"
      });
    };

    readConsent();
    window.addEventListener("afnh-cookie-consent", readConsent);
    return () => window.removeEventListener("afnh-cookie-consent", readConsent);
  }, []);

  return (
    <>
      <GoogleTagManager enabled={analyticsConsentGranted} />
      <GoogleAnalytics analyticsConsentGranted={analyticsConsentGranted} />
    </>
  );
}
