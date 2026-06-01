"use client";

import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
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

type PeekBookingButtonProps = {
  locale: Locale;
  label: string;
  className?: string;
  showArrow?: boolean;
};

export function PeekBookingButton({
  locale,
  label,
  className,
  showArrow = false
}: PeekBookingButtonProps) {
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

  return (
    <a
      href={TOUR.peekUrl}
      className={className}
      data-button-text={label}
      onClick={() =>
        trackEvent("click_peekpro_booking", peekBookingParams(locale))
      }
    >
      {label}
      {showArrow ? <ArrowRight aria-hidden="true" size={18} /> : null}
    </a>
  );
}
