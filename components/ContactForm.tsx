"use client";

import type { FormEvent } from "react";
import type { Locale } from "@/lib/constants";
import { TOUR } from "@/lib/constants";
import type { Dictionary } from "@/lib/dictionaries";
import { trackEvent } from "@/tracking/events";

function clean(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, 500);
}

export function ContactForm({
  locale,
  dict
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const subject =
      locale === "es"
        ? "Consulta sobre Arenal Forest Night Hike"
        : "Question about Arenal Forest Night Hike";
    const body = [
      `${dict.contact.name}: ${clean(formData.get("name"))}`,
      `${dict.contact.email}: ${clean(formData.get("email"))}`,
      `${dict.contact.phone}: ${clean(formData.get("phone"))}`,
      `${dict.contact.date}: ${clean(formData.get("date"))}`,
      `${dict.contact.people}: ${clean(formData.get("people"))}`,
      `${dict.contact.message}: ${clean(formData.get("message"))}`
    ].join("\n");

    trackEvent("submit_contact_form", {
      tour_name: TOUR.name,
      language: locale
    });

    window.location.href = `mailto:${TOUR.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      {[
        ["name", dict.contact.name, "text"],
        ["email", dict.contact.email, "email"],
        ["phone", dict.contact.phone, "tel"],
        ["date", dict.contact.date, "date"],
        ["people", dict.contact.people, "number"]
      ].map(([name, label, type]) => (
        <label key={name} className="grid gap-2 text-sm font-semibold text-soft">
          {label}
          <input
            name={name}
            type={type}
            min={name === "people" ? "1" : undefined}
            required={name === "name" || name === "email"}
            className="rounded-md border border-volcanic/20 bg-night/70 px-4 py-3 text-soft placeholder:text-fog/60"
          />
        </label>
      ))}
      <label className="grid gap-2 text-sm font-semibold text-soft">
        {dict.contact.message}
        <textarea
          name="message"
          rows={5}
          className="resize-y rounded-md border border-volcanic/20 bg-night/70 px-4 py-3 text-soft placeholder:text-fog/60"
        />
      </label>
      <button
        type="submit"
        className="rounded-md bg-lantern px-5 py-3 text-sm font-bold text-night transition hover:bg-[#ffd06a]"
      >
        {dict.contact.submit}
      </button>
    </form>
  );
}
