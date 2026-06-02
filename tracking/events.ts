"use client";

import { TOUR, type Locale } from "@/lib/constants";

type TrackingParams = Record<string, string | number | boolean | undefined>;
type DataLayerEvent = TrackingParams & { event: string };

declare global {
  interface Window {
    dataLayer?: DataLayerEvent[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(event: string, params: TrackingParams = {}) {
  if (typeof window === "undefined") return;

  const eventParams = {
    tour_name: TOUR.name,
    ...params
  };

  window.dataLayer?.push({ event, ...eventParams });
  window.gtag?.("event", event, eventParams);
}

export function bookingCtaParams(locale: Locale, sourceSection: string) {
  return {
    source_section: sourceSection,
    location: "La Fortuna, Costa Rica",
    language: locale,
    price: TOUR.price,
    currency: TOUR.currency
  };
}

export function peekBookingParams(locale: Locale, sourceSection: string) {
  return {
    source_section: sourceSection,
    booking_engine: "Peek Pro",
    schedule: "Daily 6:00 PM",
    language: locale
  };
}

export function whatsappParams(locale: Locale, sourceSection: string) {
  return {
    source_section: sourceSection,
    language: locale
  };
}
