"use client";

import { MessageCircle } from "lucide-react";
import { TOUR, type Locale, whatsappUrl } from "@/lib/constants";
import { trackEvent, whatsappParams } from "@/tracking/events";

type WhatsAppButtonProps = {
  locale: Locale;
  label: string;
  source: "header" | "hero" | "faq" | "about" | "contact" | "floating_button";
  variant?: "primary" | "ghost" | "floating";
  iconOnly?: boolean;
  hideIcon?: boolean;
};

export function WhatsAppButton({
  locale,
  label,
  source,
  variant = "ghost",
  iconOnly = false,
  hideIcon = false
}: WhatsAppButtonProps) {
  const styles = {
    primary:
      "bg-lantern text-night shadow-glow hover:bg-[#ffd06a]",
    ghost:
      "border border-volcanic/25 bg-white/5 text-soft hover:border-lantern/60 hover:bg-white/10",
    floating:
      "fixed bottom-5 right-5 z-50 bg-[#25D366] text-night shadow-glow hover:bg-[#45e17d]"
  };

  return (
    <a
      href={whatsappUrl(locale, source)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} ${TOUR.phoneDisplay}`}
      onClick={() => trackEvent("click_whatsapp", whatsappParams(locale, source))}
      className={`inline-flex items-center justify-center rounded-md text-sm font-bold transition hover:-translate-y-0.5 ${
        iconOnly ? "h-14 w-14 p-0" : "gap-2 px-4 py-3"
      } ${styles[variant]}`}
    >
      {hideIcon ? null : <MessageCircle aria-hidden="true" size={iconOnly ? 24 : 18} />}
      {iconOnly ? <span className="sr-only">{label}</span> : <span>{label}</span>}
    </a>
  );
}
