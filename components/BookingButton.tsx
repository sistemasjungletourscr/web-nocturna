"use client";

import { ArrowRight } from "lucide-react";
import type { Locale } from "@/lib/constants";
import { bookingCtaParams, trackEvent } from "@/tracking/events";

type BookingButtonProps = {
  locale: Locale;
  label: string;
  className?: string;
  source?: "header" | "hero" | "site_cta";
};

export function BookingButton({
  locale,
  label,
  className = "",
  source = "site_cta"
}: BookingButtonProps) {
  function handleClick() {
    trackEvent("click_book_now", bookingCtaParams(locale, source));
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth" });
    trackEvent("scroll_to_booking", {
      language: locale,
      source_section: source,
      booking_engine: "Peek Pro"
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center justify-center gap-2 rounded-md bg-lantern px-5 py-3 text-sm font-bold text-night shadow-glow transition hover:-translate-y-0.5 hover:bg-[#ffd06a] focus-visible:ring-2 focus-visible:ring-lantern ${className}`}
    >
      {label}
      <ArrowRight aria-hidden="true" size={18} />
    </button>
  );
}
