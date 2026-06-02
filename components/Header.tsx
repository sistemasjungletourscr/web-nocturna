"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { ROUTES, type Locale } from "@/lib/constants";
import type { Dictionary } from "@/lib/dictionaries";
import { BookingButton } from "@/components/BookingButton";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

type HeaderProps = {
  locale: Locale;
  dict: Dictionary;
  className?: string;
  page?: "home" | "faq" | "about" | "terms" | "cancellation" | "thanks";
};

export function Header({ locale, dict, className, page = "home" }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const home = ROUTES[locale].home;
  const nav = [
    [dict.nav.home, home],
    [dict.nav.tour, `${home}#tour`],
    [dict.nav.faq, ROUTES[locale].faq],
    [dict.nav.contact, `${home}#contact`],
    [dict.nav.about, ROUTES[locale].about]
  ];

  return (
    <header
      className={[
        "sticky top-0 z-40 border-b border-volcanic/10 bg-night/88 backdrop-blur-xl",
        className
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className="section-shell flex min-h-[76px] items-center justify-between gap-4">
        <Link
          href={home}
          className="flex h-14 w-[150px] shrink-0 items-center sm:w-[175px] lg:w-[195px]"
          aria-label="Arenal Forest Night Hike"
        >
          <Image
            src="/images/arenal-night-hike-header.svg"
            alt="Arenal Forest Night Hike"
            width={1034}
            height={394}
            priority
            className="h-full w-full object-contain object-left"
          />
        </Link>

        <nav className="hidden items-center gap-5 text-sm text-fog lg:flex" aria-label="Main">
          {nav.map(([label, href]) => (
            <Link key={href} href={href} className="transition hover:text-lantern">
              {label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 lg:flex">
          <LanguageSwitcher locale={locale} page={page} />
          <BookingButton
            locale={locale}
            label={dict.nav.book}
            className="px-4 py-3"
            source="header"
          />
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="rounded-md border border-volcanic/20 p-2 text-soft lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-volcanic/10 bg-night lg:hidden">
          <nav className="section-shell grid gap-2 py-4 text-sm text-soft" aria-label="Mobile">
            {nav.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 hover:bg-white/8"
              >
                {label}
              </Link>
            ))}
            <div className="mt-2 flex flex-wrap gap-2">
              <LanguageSwitcher locale={locale} page={page} />
              <BookingButton locale={locale} label={dict.nav.book} source="header" />
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
