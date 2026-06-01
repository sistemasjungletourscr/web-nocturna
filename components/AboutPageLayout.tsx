import Image from "next/image";
import { Binoculars, Leaf, Mountain, ShieldCheck } from "lucide-react";
import { FadeInSections } from "@/components/FadeInSections";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { PeekBookingButton } from "@/components/PeekBookingButton";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { IMAGES, ROUTES, type Locale } from "@/lib/constants";
import type { Dictionary } from "@/lib/dictionaries";
import { breadcrumbSchema } from "@/lib/schema";

type AboutPageLayoutProps = {
  locale: Locale;
  dict: Dictionary;
};

const highlightIcons = [Mountain, ShieldCheck, Leaf, Binoculars];

export function AboutPageLayout({ locale, dict }: AboutPageLayoutProps) {
  const about = dict.pages.about;
  const featuredSections = about.sections.slice(0, 2);
  const remainingSections = about.sections.slice(2);

  return (
    <>
      <Header locale={locale} dict={dict} page="about" />
      <main>
        <section className="relative isolate overflow-hidden bg-night">
          <Image
            src={about.image}
            alt={`${about.title} Arenal Forest Night Hike`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-night via-night/82 to-night/30" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-night" />
          <div className="section-shell relative z-10 flex min-h-[380px] items-end py-14 md:min-h-[500px] md:py-20">
            <div className="load-fade-in load-fade-in-up max-w-3xl">
              <p className="mb-4 inline-flex rounded-full border border-lantern/30 bg-lantern/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-lantern">
                {about.eyebrow}
              </p>
              <h1 className="font-heading text-5xl leading-tight text-soft md:text-7xl">
                {about.title}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-volcanic md:text-xl">
                {about.intro}
              </p>
            </div>
          </div>
        </section>

        <section className="section-shell py-12 md:py-16">
          <FadeInSections as="div" className="mx-auto grid max-w-5xl gap-10">
            <section className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.82fr)] lg:items-stretch">
              <div className="grid gap-5">
                {featuredSections.map((section) => (
                  <article
                    key={section.title}
                    className="rounded-lg border border-volcanic/15 bg-white/5 p-6 sm:p-7"
                  >
                    <h2 className="font-heading text-3xl leading-tight text-soft md:text-4xl">
                      {section.title}
                    </h2>
                    <p className="mt-4 text-base leading-8 text-fog">
                      {section.body}
                    </p>
                  </article>
                ))}
              </div>

              <div className="relative min-h-[300px] overflow-hidden rounded-lg border border-volcanic/15 bg-white/5 sm:min-h-[380px] lg:min-h-full">
                <Image
                  src={IMAGES.treeFrog}
                  alt="Tree frog at Arenal Forest Night Hike"
                  fill
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  className="object-cover"
                />
              </div>
            </section>

            <section className="grid gap-5">
              {remainingSections.map((section) => (
                <article
                  key={section.title}
                  className="rounded-lg border border-volcanic/15 bg-white/5 p-6 sm:p-7"
                >
                  <h2 className="font-heading text-3xl leading-tight text-soft md:text-4xl">
                    {section.title}
                  </h2>
                  <p className="mt-4 text-base leading-8 text-fog">
                    {section.body}
                  </p>
                </article>
              ))}
            </section>

            <section>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {about.highlights.map((highlight, index) => {
                  const Icon = highlightIcons[index] ?? Leaf;
                  return (
                    <article
                      key={highlight.title}
                      className="rounded-lg border border-lantern/20 bg-lantern/8 p-5"
                    >
                      <Icon aria-hidden="true" className="text-lantern" size={24} />
                      <h2 className="mt-4 text-xl font-bold text-soft">
                        {highlight.title}
                      </h2>
                      <p className="mt-3 text-sm leading-7 text-fog">
                        {highlight.copy}
                      </p>
                    </article>
                  );
                })}
              </div>
            </section>
          </FadeInSections>
        </section>

        <FadeInSections as="div">
          <section className="border-y border-volcanic/15 bg-gradient-to-br from-jungle via-night to-[#020b08]">
            <div className="section-shell grid gap-8 py-14 md:grid-cols-[1fr_auto] md:items-center md:py-16">
              <div>
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-lantern">
                  Arenal Forest Night Hike
                </p>
                <h2 className="mt-3 font-heading text-4xl leading-tight text-soft md:text-5xl">
                  {about.ctaTitle}
                </h2>
                <p className="mt-4 max-w-2xl text-base leading-8 text-fog">
                  {about.ctaCopy}
                </p>
              </div>
              <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
                <PeekBookingButton
                  locale={locale}
                  label={about.ctaPrimary}
                  showArrow
                  className="inline-flex items-center justify-center gap-2 rounded-md bg-lantern px-6 py-4 text-base font-bold text-night shadow-glow transition hover:-translate-y-0.5 hover:bg-[#ffd06a]"
                />
                <WhatsAppButton
                  locale={locale}
                  label={about.ctaSecondary}
                  source="about"
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
          { name: about.title, path: ROUTES[locale].about }
        ])}
      />
    </>
  );
}
