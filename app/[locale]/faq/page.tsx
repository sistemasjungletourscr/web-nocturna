import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CalendarDays, ChevronDown, Clock, Gauge, Users } from "lucide-react";
import { FadeInSections } from "@/components/FadeInSections";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PeekBookingButton } from "@/components/PeekBookingButton";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { IMAGES, isLocale, ROUTES, TOUR, type Locale } from "@/lib/constants";
import { getDictionary } from "@/lib/dictionaries";
import { breadcrumbSchema, faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

const categoryKeys = ["tour", "wildlife", "family", "gear", "booking"] as const;

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "es" }];
}

export function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return params.then(({ locale }) =>
    isLocale(locale) ? buildMetadata(locale, "faq") : {}
  );
}

export default async function FaqPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);
  const page = dict.pages.faq;
  const facts = [dict.tour.facts[0], dict.tour.facts[1], dict.tour.facts[3], dict.tour.facts[4]];
  const factIcons = [CalendarDays, Clock, Gauge, Users];
  const scheduleLabel = locale === "es" ? TOUR.scheduleEs : TOUR.schedule;

  return (
    <>
      <Header locale={locale} dict={dict} page="faq" />
      <main>
        <section className="relative isolate overflow-hidden bg-night">
          <Image
            src={IMAGES.forest}
            alt={page.heroImageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-night via-night/82 to-night/28" />
          <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-night" />
          <div className="section-shell relative z-10 flex min-h-[420px] items-end py-14 md:min-h-[520px] md:py-20">
            <div className="load-fade-in load-fade-in-up max-w-3xl">
              <p className="mb-4 inline-flex rounded-full border border-lantern/30 bg-lantern/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-lantern">
                {page.eyebrow}
              </p>
              <h1 className="font-heading text-5xl leading-tight text-soft md:text-7xl">
                {page.title}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-volcanic md:text-xl">
                {page.copy}
              </p>
            </div>
          </div>
        </section>

        <section className="section-shell py-12 md:py-16">
          <FadeInSections as="div" className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {facts.map(([label, value], index) => {
              const Icon = factIcons[index];
              return (
                <div
                  key={label}
                  className="rounded-lg border border-volcanic/15 bg-white/5 p-4"
                >
                  <Icon aria-hidden="true" className="mb-3 text-lantern" size={22} />
                  <p className="text-sm font-bold text-lantern">{label}</p>
                  <p className="mt-1 text-base text-soft">{value}</p>
                </div>
              );
            })}
          </FadeInSections>

          <div className="mt-12 grid gap-8 lg:grid-cols-[0.32fr_0.68fr] lg:items-start">
            <aside className="lg:sticky lg:top-[calc(var(--header-height)+24px)]">
              <FadeInSections as="div">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-lantern">
                {locale === "es" ? "Categorías" : "Categories"}
              </p>
              <nav className="mt-5 grid gap-2 text-sm text-fog" aria-label="FAQ categories">
                {categoryKeys.map((categoryKey) => (
                  <a
                    key={categoryKey}
                    href={`#faq-${categoryKey}`}
                    className="rounded-md border border-volcanic/15 bg-white/5 px-4 py-3 transition hover:border-lantern/50 hover:text-lantern"
                  >
                    {dict.faqCategories[categoryKey]}
                  </a>
                ))}
              </nav>
              </FadeInSections>
            </aside>

            <FadeInSections as="div" className="grid gap-8">
              {categoryKeys.map((categoryKey) => {
                const items = dict.faq.filter((item) => item.category === categoryKey);

                return (
                  <section
                    key={categoryKey}
                    id={`faq-${categoryKey}`}
                    className="anchor-offset"
                  >
                    <h2 className="font-heading text-3xl text-soft md:text-4xl">
                      {dict.faqCategories[categoryKey]}
                    </h2>
                    <FadeInSections as="div" className="mt-5 grid gap-3">
                      {items.map((item, index) => (
                        <details
                          key={item.q}
                          className="group rounded-lg border border-volcanic/15 bg-white/5 p-5 open:bg-jungle/55"
                          open={index === 0 && categoryKey === "tour"}
                        >
                          <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-left text-lg font-bold text-soft">
                            <span>{item.q}</span>
                            <ChevronDown
                              aria-hidden="true"
                              className="mt-1 shrink-0 text-lantern transition group-open:rotate-180"
                              size={20}
                            />
                          </summary>
                          <p className="mt-4 text-base leading-8 text-fog">{item.a}</p>
                        </details>
                      ))}
                    </FadeInSections>
                  </section>
                );
              })}
            </FadeInSections>
          </div>
        </section>

        <FadeInSections as="div">
          <section className="border-y border-volcanic/15 bg-gradient-to-br from-jungle via-night to-[#020b08]">
            <div className="section-shell grid gap-8 py-14 md:grid-cols-[1fr_auto] md:items-center md:py-16">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-lantern">
                  {scheduleLabel}
                </p>
                <h2 className="mt-3 font-heading text-4xl leading-tight text-soft md:text-5xl">
                  {page.ctaTitle}
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-fog">
                  {page.ctaCopy}
                </p>
                <Link
                  href={`${ROUTES[locale].home}#tour`}
                  className="mt-5 inline-flex text-sm font-bold text-lantern underline-offset-4 hover:underline"
                >
                  {page.tourLink}
                </Link>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
                <PeekBookingButton
                  locale={locale}
                  label={page.ctaPrimary}
                  showArrow
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-lantern px-6 py-4 text-base font-bold text-night shadow-glow transition hover:-translate-y-0.5 hover:bg-[#ffd06a]"
                />
                <WhatsAppButton
                  locale={locale}
                  label={page.ctaSecondary}
                  source="faq"
                />
              </div>
            </div>
          </section>
        </FadeInSections>
      </main>
      <Footer locale={locale} dict={dict} />
      <SeoJsonLd
        data={breadcrumbSchema(locale, [
          { name: dict.nav.home, path: ROUTES[locale].home },
          { name: page.title, path: ROUTES[locale].faq }
        ])}
      />
      <SeoJsonLd data={faqSchema(locale)} />
    </>
  );
}
