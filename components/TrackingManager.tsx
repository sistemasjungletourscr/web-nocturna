"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";
import { GoogleTagManager } from "@/components/GoogleTagManager";

const STORAGE_KEY = "afnh_cookie_consent";

export function TrackingManager() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const readConsent = () => {
      setEnabled(window.localStorage.getItem(STORAGE_KEY) === "accepted");
    };

    readConsent();
    window.addEventListener("afnh-cookie-consent", readConsent);
    return () => window.removeEventListener("afnh-cookie-consent", readConsent);
  }, []);

  return (
    <>
      <GoogleTagManager enabled={enabled} />
      <GoogleAnalytics enabled={enabled} />
    </>
  );
}
