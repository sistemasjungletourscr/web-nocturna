"use client";

import Link from "next/link";
import Image from "next/image";
import { Mail, MapPin, MessageCircle } from "lucide-react";
import { ROUTES, TOUR, type Locale, whatsappUrl } from "@/lib/constants";
import type { Dictionary } from "@/lib/dictionaries";
import { trackEvent, whatsappParams } from "@/tracking/events";

export function Footer({
  locale,
  dict,
  className
}: {
  locale: Locale;
  dict: Dictionary;
  className?: string;
}) {
  const year = new Date().getFullYear();
  const mainLinks = [
    [dict.nav.home, ROUTES[locale].home],
    [dict.nav.tour, `${ROUTES[locale].home}#tour`],
    [dict.nav.faq, ROUTES[locale].faq],
    [dict.nav.contact, `${ROUTES[locale].home}#contact`],
    [dict.nav.about, ROUTES[locale].about]
  ] as const;
  const legalLinks = [
    [
      locale === "es" ? "T\u00e9rminos y condiciones" : "Terms and Conditions",
      ROUTES[locale].terms
    ],
    [
      locale === "es" ? "Pol\u00edticas de cancelaci\u00f3n" : "Cancellation Policy",
      ROUTES[locale].cancellation
    ]
  ] as const;

  return (
    <footer
      className={[
        "border-t border-volcanic/10 bg-gradient-to-b from-night/10 via-jungle/25 to-night/40",
        className
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="section-shell grid gap-10 py-12 md:grid-cols-[1.1fr_0.8fr_1fr] md:py-14">
        <div>
          <div className="relative h-24 w-24 overflow-hidden rounded-full sm:h-28 sm:w-28">
            <Image
              src="/images/arenal-night-hike-favicon.svg"
              alt="Arenal Forest Night Hike"
              width={643}
              height={639}
              className="h-full w-full object-contain"
            />
          </div>
          <p className="mt-4 max-w-md text-sm leading-7 text-fog">
            {dict.footer.tagline}
          </p>
        </div>

        <nav className="grid gap-3 text-sm text-fog" aria-label="Footer navigation">
          <h2 className="text-base font-bold text-soft">
            {locale === "es" ? "Enlaces" : "Links"}
          </h2>
          {mainLinks.map(([label, href]) => (
            <Link key={href} href={href} className="transition hover:text-lantern">
              {label}
            </Link>
          ))}
        </nav>

        <address className="grid gap-4 text-sm not-italic leading-6 text-fog">
          <h2 className="text-base font-bold text-soft">
            {locale === "es" ? "Contacto" : "Contact"}
          </h2>
          <p className="flex items-start gap-3">
            <MapPin aria-hidden="true" className="mt-1 shrink-0 text-lantern" size={18} />
            <span>{TOUR.location}</span>
          </p>
          <a
            href={whatsappUrl(locale, "footer")}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={
              locale === "es"
                ? `Escribir por WhatsApp al ${TOUR.phoneDisplay}`
                : `Message on WhatsApp at ${TOUR.phoneDisplay}`
            }
            onClick={() => trackEvent("click_whatsapp", whatsappParams(locale, "footer"))}
            className="flex items-center gap-3 transition hover:text-lantern"
          >
            <MessageCircle aria-hidden="true" className="shrink-0 text-lantern" size={18} />
            {TOUR.phoneDisplay}
          </a>
          <a
            href={`mailto:${TOUR.email}`}
            onClick={() =>
              trackEvent("click_email", {
                language: locale,
                source_section: "footer"
              })
            }
            className="flex items-center gap-3 break-all transition hover:text-lantern"
          >
            <Mail aria-hidden="true" className="shrink-0 text-lantern" size={18} />
            {TOUR.email}
          </a>
        </address>
      </div>

      <div className="border-t border-volcanic/10 bg-[#020b08]/80">
        <div className="section-shell flex flex-col gap-4 py-5 text-xs text-fog/75 md:flex-row md:items-center md:justify-between">
          <p>Copyright {year} Arenal Forest Night Hike. All rights reserved.</p>
          <nav
            className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6"
            aria-label="Legal"
          >
            {legalLinks.map(([label, href]) => (
              <Link key={href} href={href} className="transition hover:text-lantern">
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
