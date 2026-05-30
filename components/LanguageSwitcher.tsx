"use client";

import Link from "next/link";
import { Languages } from "lucide-react";
import { ROUTES, type Locale } from "@/lib/constants";
import { trackEvent } from "@/tracking/events";

type PageKey = "home" | "faq" | "about" | "terms" | "cancellation" | "thanks";

type LanguageSwitcherProps = {
  locale: Locale;
  page: PageKey;
};

export function LanguageSwitcher({ locale, page }: LanguageSwitcherProps) {
  const nextLocale: Locale = locale === "es" ? "en" : "es";
  const href = ROUTES[nextLocale][page];

  return (
    <Link
      href={href}
      hrefLang={nextLocale}
      onClick={() =>
        trackEvent("language_switch", {
          from_language: locale,
          to_language: nextLocale
        })
      }
      className="inline-flex items-center gap-2 rounded-md border border-volcanic/20 bg-white/5 px-3 py-2 text-sm font-semibold text-soft transition hover:border-lantern/60 hover:bg-white/10"
      aria-label={`Switch language to ${nextLocale.toUpperCase()}`}
    >
      <Languages aria-hidden="true" size={17} />
      {nextLocale.toUpperCase()}
    </Link>
  );
}
