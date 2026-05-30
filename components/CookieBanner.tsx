"use client";

import { useSyncExternalStore } from "react";
import type { Locale } from "@/lib/constants";

const STORAGE_KEY = "afnh_cookie_consent";

type Consent = "accepted" | "rejected" | "unset";

type CookieBannerProps = {
  locale: Locale;
};

export function CookieBanner({ locale }: CookieBannerProps) {
  const consent = useSyncExternalStore(subscribe, getSnapshot, () => "unset");

  function save(value: Exclude<Consent, "unset">) {
    window.localStorage.setItem(STORAGE_KEY, value);
    window.dispatchEvent(new Event("afnh-cookie-consent"));
  }

  if (consent !== "unset") return null;

  const text =
    locale === "es"
      ? "Usamos cookies opcionales para medir visitas y mejorar la experiencia. Puedes aceptar o rechazar el seguimiento."
      : "We use optional cookies to measure visits and improve the experience. You can accept or reject tracking.";

  return (
    <section
      aria-label={locale === "es" ? "Preferencias de cookies" : "Cookie preferences"}
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-3xl rounded-lg border border-volcanic/20 bg-night/95 p-4 shadow-glass backdrop-blur"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-6 text-fog">{text}</p>
        <div className="flex shrink-0 gap-2">
          <button
            type="button"
            onClick={() => save("rejected")}
            className="rounded-md border border-volcanic/25 px-4 py-2 text-sm font-semibold text-soft hover:bg-white/10"
          >
            {locale === "es" ? "Rechazar" : "Reject"}
          </button>
          <button
            type="button"
            onClick={() => save("accepted")}
            className="rounded-md bg-lantern px-4 py-2 text-sm font-bold text-night hover:bg-[#ffd06a]"
          >
            {locale === "es" ? "Aceptar" : "Accept"}
          </button>
        </div>
      </div>
    </section>
  );
}

function subscribe(callback: () => void) {
  window.addEventListener("afnh-cookie-consent", callback);
  window.addEventListener("storage", callback);
  return () => {
    window.removeEventListener("afnh-cookie-consent", callback);
    window.removeEventListener("storage", callback);
  };
}

function getSnapshot(): Consent {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored === "accepted" || stored === "rejected") return stored;
  return "unset";
}
