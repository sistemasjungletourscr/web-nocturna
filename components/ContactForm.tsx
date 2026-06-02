"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import type { Locale } from "@/lib/constants";
import type { Dictionary } from "@/lib/dictionaries";
import { trackEvent } from "@/tracking/events";

type SubmitStatus = "idle" | "submitting" | "success" | "error";

export function ContactForm({
  locale,
  dict
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const [status, setStatus] = useState<SubmitStatus>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "submitting") return;

    const form = event.currentTarget;
    const formData = new FormData(form);

    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          locale,
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          date: formData.get("date"),
          people: formData.get("people"),
          message: formData.get("message"),
          company: formData.get("company")
        })
      });

      if (!response.ok) {
        throw new Error("Contact request failed");
      }

      trackEvent("submit_contact_form", {
        language: locale,
        source_section: "contact_form"
      });

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  const isSubmitting = status === "submitting";

  return (
    <form
      onSubmit={handleSubmit}
      onChange={() => {
        if (status === "success" || status === "error") setStatus("idle");
      }}
      className="grid gap-4"
    >
      <label className="sr-only" aria-hidden="true">
        Company
        <input
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </label>
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
            disabled={isSubmitting}
            className="rounded-md border border-volcanic/20 bg-night/70 px-4 py-3 text-soft placeholder:text-fog/60"
          />
        </label>
      ))}
      <label className="grid gap-2 text-sm font-semibold text-soft">
        {dict.contact.message}
        <textarea
          name="message"
          rows={5}
          disabled={isSubmitting}
          className="resize-y rounded-md border border-volcanic/20 bg-night/70 px-4 py-3 text-soft placeholder:text-fog/60"
        />
      </label>
      <div aria-live="polite">
        {status === "success" && (
          <p className="rounded-md border border-lantern/30 bg-lantern/10 px-4 py-3 text-sm font-semibold text-lantern">
            {dict.contact.success}
          </p>
        )}
        {status === "error" && (
          <p className="rounded-md border border-red-300/30 bg-red-500/10 px-4 py-3 text-sm font-semibold text-red-100">
            {dict.contact.error}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="rounded-md bg-lantern px-5 py-3 text-sm font-bold text-night transition hover:bg-[#ffd06a] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? dict.contact.submitting : dict.contact.submit}
      </button>
    </form>
  );
}
