"use client";

import { TOUR, type Locale } from "@/lib/constants";

type TrackingParams = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: TrackingParams[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackEvent(event: string, params: TrackingParams = {}) {
  if (typeof window === "undefined") return;

  const payload = {
    event,
    tour_name: TOUR.name,
    ...params
  };

  window.dataLayer?.push(payload);
  window.gtag?.("event", event, params);
}

export function bookingCtaParams(locale: Locale) {
  return {
    tour_name: TOUR.name,
    location: "La Fortuna, Costa Rica",
    language: locale,
    price: TOUR.price,
    currency: TOUR.currency
  };
}

export function peekBookingParams(locale: Locale) {
  return {
    tour_name: TOUR.name,
    booking_engine: "Peek Pro",
    schedule: "Daily 6:00 PM",
    language: locale
  };
}

export function whatsappParams(locale: Locale, sourceSection: string) {
  return {
    source_section: sourceSection,
    tour_name: TOUR.name,
    language: locale
  };
}
