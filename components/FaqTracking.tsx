"use client";

import type { SyntheticEvent } from "react";
import { ChevronDown } from "lucide-react";
import type { Locale } from "@/lib/constants";
import { trackEvent } from "@/tracking/events";

type FaqCategory = {
  key: string;
  label: string;
};

type TrackedFaqCategoryLinkProps = {
  category: FaqCategory;
  locale: Locale;
};

type TrackedFaqItemProps = {
  question: string;
  answer: string;
  category: FaqCategory;
  locale: Locale;
  openByDefault?: boolean;
};

export function TrackedFaqCategoryLink({
  category,
  locale
}: TrackedFaqCategoryLinkProps) {
  return (
    <a
      href={`#faq-${category.key}`}
      onClick={() =>
        trackEvent("click_faq_category", {
          language: locale,
          source_section: "faq",
          faq_category: category.key,
          faq_category_label: category.label
        })
      }
      className="rounded-md border border-volcanic/15 bg-white/5 px-4 py-3 transition hover:border-lantern/50 hover:text-lantern"
    >
      {category.label}
    </a>
  );
}

export function TrackedFaqItem({
  question,
  answer,
  category,
  locale,
  openByDefault = false
}: TrackedFaqItemProps) {
  function handleToggle(event: SyntheticEvent<HTMLDetailsElement>) {
    if (!event.currentTarget.open) return;

    trackEvent("open_faq_item", {
      language: locale,
      source_section: "faq",
      faq_category: category.key,
      faq_category_label: category.label,
      faq_question: question
    });
  }

  return (
    <details
      className="group rounded-lg border border-volcanic/15 bg-white/5 p-5 open:bg-jungle/55"
      open={openByDefault}
      onToggle={handleToggle}
    >
      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left text-lg font-bold text-soft">
        <span>{question}</span>
        <ChevronDown
          aria-hidden="true"
          className="mt-1 shrink-0 text-lantern transition group-open:rotate-180"
          size={20}
        />
      </summary>
      <p className="mt-4 text-base leading-8 text-fog">{answer}</p>
    </details>
  );
}
