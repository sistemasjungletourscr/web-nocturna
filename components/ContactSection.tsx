"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { TOUR, type Locale } from "@/lib/constants";
import type { Dictionary } from "@/lib/dictionaries";
import { ContactForm } from "@/components/ContactForm";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { trackEvent } from "@/tracking/events";

export function ContactSection({
  locale,
  dict
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  return (
    <section id="contact" className="anchor-offset section-shell py-16 md:py-24">
      <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="glass-panel rounded-lg p-6 sm:p-8">
          <h2 className="font-heading text-4xl text-soft md:text-5xl">
            {dict.contact.title}
          </h2>
          <p className="mt-4 text-base leading-8 text-fog">{dict.contact.copy}</p>
          <div className="mt-7 grid gap-3 text-fog">
            <a
              href={`tel:${TOUR.phoneHref}`}
              onClick={() =>
                trackEvent("click_call", {
                  language: locale,
                  source_section: "contact"
                })
              }
              className="flex items-center gap-3 hover:text-lantern"
            >
              <Phone aria-hidden="true" size={18} />
              {TOUR.phoneDisplay}
            </a>
            <a
              href={`mailto:${TOUR.email}`}
              onClick={() =>
                trackEvent("click_email", {
                  language: locale,
                  source_section: "contact"
                })
              }
              className="flex items-center gap-3 hover:text-lantern"
            >
              <Mail aria-hidden="true" size={18} />
              {TOUR.email}
            </a>
            <p className="flex items-start gap-3">
              <MapPin aria-hidden="true" className="mt-1 shrink-0" size={18} />
              <span>{TOUR.location}</span>
            </p>
          </div>
          <div className="mt-7">
            <WhatsAppButton locale={locale} label={dict.nav.whatsapp} source="contact" />
          </div>
        </div>
        <div className="glass-panel rounded-lg p-6 sm:p-8 lg:row-span-2">
          <h3 className="mb-5 text-2xl font-bold text-soft">{dict.contact.formTitle}</h3>
          <ContactForm locale={locale} dict={dict} />
        </div>
        <div className="overflow-hidden rounded-lg border border-volcanic/15 bg-jungle">
          <iframe
            title={dict.contact.mapTitle}
            src={TOUR.mapEmbed}
            width="600"
            height="450"
            className="h-[300px] w-full lg:h-[360px]"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            onLoad={() =>
              trackEvent("view_map_embed", {
                language: locale,
                source_section: "contact"
              })
            }
          />
        </div>
      </div>
    </section>
  );
}
