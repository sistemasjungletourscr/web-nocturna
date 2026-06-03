"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import { peekBookingUrl, type Locale } from "@/lib/constants";
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
const PEEK_BASE_PATH = "https://js.peek.com";

let peekAssetsPromise: Promise<void> | null = null;

type PeekBookingButtonProps = {
  locale: Locale;
  label: string;
  className?: string;
  showArrow?: boolean;
  source?: "booking_widget" | "faq_cta" | "about_cta";
};

export function PeekBookingButton({
  locale,
  label,
  className,
  showArrow = false,
  source = "booking_widget"
}: PeekBookingButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        void loadPeekAssets();
        observer.disconnect();
      },
      { rootMargin: "420px 0px", threshold: 0 }
    );

    observer.observe(button);

    return () => {
      observer.disconnect();
    };
  }, []);

  function warmPeekAssets() {
    void loadPeekAssets();
  }

  return (
    <a
      ref={buttonRef}
      href={peekBookingUrl()}
      className={className}
      data-button-text={label}
      onFocus={warmPeekAssets}
      onPointerEnter={warmPeekAssets}
      onTouchStart={warmPeekAssets}
      onClick={() => {
        warmPeekAssets();
        trackEvent("click_peekpro_booking", peekBookingParams(locale, source));
      }}
    >
      {label}
      {showArrow ? <ArrowRight aria-hidden="true" size={18} /> : null}
    </a>
  );
}

function loadPeekAssets() {
  if (typeof window === "undefined") return Promise.resolve();

  window._peekConfig = { key: PEEK_KEY };

  if (peekAssetsPromise) return peekAssetsPromise;

  peekAssetsPromise = Promise.all([
    loadStylesheet(PEEK_CSS_ID, `${PEEK_BASE_PATH}/widget_button.css`),
    loadScript(PEEK_SCRIPT_ID, `${PEEK_BASE_PATH}/widget_button.js`)
  ]).then(() => undefined);

  return peekAssetsPromise;
}

function loadStylesheet(id: string, href: string) {
  if (document.getElementById(id)) return Promise.resolve();

  return new Promise<void>((resolve) => {
    const stylesheet = document.createElement("link");
    stylesheet.id = id;
    stylesheet.href = href;
    stylesheet.rel = "stylesheet";
    stylesheet.type = "text/css";
    stylesheet.onload = () => resolve();
    stylesheet.onerror = () => resolve();
    document.head.appendChild(stylesheet);
  });
}

function loadScript(id: string, src: string) {
  if (document.getElementById(id)) return Promise.resolve();

  return new Promise<void>((resolve) => {
    const script = document.createElement("script");
    script.id = id;
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => resolve();
    document.head.appendChild(script);
  });
}
