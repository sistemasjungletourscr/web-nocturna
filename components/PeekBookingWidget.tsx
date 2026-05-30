"use client";

import { useEffect } from "react";
import { CalendarDays, TicketPercent } from "lucide-react";
import { TOUR, type Locale } from "@/lib/constants";
import { peekBookingParams, trackEvent } from "@/tracking/events";

declare global {
  interface Window {
    _peekConfig?: {
      key: string;
    };
  }
}

const PEEK_KEY = "9a4fe6cc-212c-4b90-b12d-98bce7693768";
const PEEK_SCRIPT_ID = "peek-book-button-js";
const PEEK_CSS_ID = "peek-book-button-css";

type PeekBookingWidgetProps = {
  locale: Locale;
  title: string;
  copy: string;
  button: string;
};

export function PeekBookingWidget({
  locale,
  title,
  copy,
  button
}: PeekBookingWidgetProps) {
  useEffect(() => {
    trackEvent("view_booking_widget", {
      booking_engine: "Peek Pro",
      language: locale
    });
  }, [locale]);

  useEffect(() => {
    window._peekConfig = { key: PEEK_KEY };

    const stamp = `${new Date().getMonth()}-${new Date().getDate()}`;
    const basePath = "https://js.peek.com";
    const head = document.getElementsByTagName("head")[0];

    if (!document.getElementById(PEEK_CSS_ID)) {
      const css = document.createElement("link");
      css.id = PEEK_CSS_ID;
      css.href = `${basePath}/widget_button.css?ts=${stamp}`;
      css.rel = "stylesheet";
      css.type = "text/css";
      head.appendChild(css);
    }

    if (!document.getElementById(PEEK_SCRIPT_ID)) {
      const script = document.createElement("script");
      script.id = PEEK_SCRIPT_ID;
      script.src = `${basePath}/widget_button.js?ts=${stamp}`;
      script.async = true;
      head.appendChild(script);
    }
  }, []);

  const offerLabel = locale === "es" ? "Oferta" : "Offer";
  const fromLabel = locale === "es" ? "Desde:" : "From:";
  const audienceLabel =
    locale === "es" ? "Adultos y ni\u00f1os" : "Adults & Children";

  return (
    <section id="booking" className="anchor-offset section-shell py-16 md:py-24">
      <div className="glass-panel rounded-lg p-6 text-center sm:p-8 md:p-10">
        <div className="mx-auto max-w-3xl">
          <div className="mb-5 inline-flex rounded-md bg-lantern/12 p-3 text-lantern">
            <CalendarDays aria-hidden="true" size={24} />
          </div>
          <h2 className="font-heading text-4xl leading-tight text-soft md:text-6xl">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-fog md:text-lg">
            {copy}
          </p>

          <div className="mx-auto mt-8 max-w-xl rounded-lg border border-lantern/35 bg-lantern/8 p-5 text-center shadow-glow sm:p-6">
            <span className="inline-flex items-center gap-2 rounded-full bg-lantern px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-night">
              <TicketPercent aria-hidden="true" size={14} />
              {offerLabel}
            </span>
            <p className="mt-4 text-sm font-bold uppercase tracking-[0.16em] text-volcanic">
              {audienceLabel}
            </p>
            <p className="mt-5 text-2xl font-bold text-fog line-through md:text-3xl">
              ${TOUR.regularPrice}
            </p>
            <p className="mt-2 text-4xl font-black leading-none text-lantern md:text-5xl">
              <span className="mr-2 align-middle text-lg font-bold text-volcanic md:text-xl">
                {fromLabel}
              </span>
              ${TOUR.price}
              <span className="ml-2 align-middle text-base font-bold text-volcanic">
                {TOUR.taxText}
              </span>
            </p>
          </div>

          <a
            href={TOUR.peekUrl}
            className="mt-7 inline-flex w-full max-w-xl items-center justify-center rounded-md bg-lantern px-5 py-4 text-center text-base font-bold text-night shadow-glow transition hover:-translate-y-0.5 hover:bg-[#ffd06a]"
            data-button-text={button}
            onClick={() =>
              trackEvent("click_peekpro_booking", peekBookingParams(locale))
            }
          >
            {button}
          </a>
        </div>
      </div>
    </section>
  );
}
