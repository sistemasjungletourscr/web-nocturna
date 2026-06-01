import Image from "next/image";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { TermsContent } from "@/components/TermsContent";
import { IMAGES, ROUTES, type Locale } from "@/lib/constants";
import type { Dictionary } from "@/lib/dictionaries";
import { breadcrumbSchema } from "@/lib/schema";

type TermsPageLayoutProps = {
  locale: Locale;
  dict: Dictionary;
};

export function TermsPageLayout({ locale, dict }: TermsPageLayoutProps) {
  const terms = dict.pages.terms;

  return (
    <>
      <Header locale={locale} dict={dict} page="terms" />
      <main>
        <section className="relative isolate overflow-hidden bg-night">
          <Image
            src={IMAGES.hero}
            alt={`${terms.title} Arenal Forest Night Hike`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-night via-night/84 to-night/36" />
          <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-b from-transparent to-night" />
          <div className="section-shell relative z-10 flex min-h-[360px] items-end py-14 md:min-h-[460px] md:py-20">
            <div className="load-fade-in load-fade-in-up max-w-3xl">
              <p className="mb-4 inline-flex rounded-full border border-lantern/30 bg-lantern/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-lantern">
                Arenal Forest Night Hike
              </p>
              <h1 className="font-heading text-5xl leading-tight text-soft md:text-7xl">
                {terms.title}
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-volcanic md:text-xl">
                {terms.intro}
              </p>
            </div>
          </div>
        </section>

        <section className="section-shell py-12 md:py-16">
          <div className="mx-auto max-w-4xl">
            <TermsContent locale={locale} dict={dict} />
          </div>
        </section>
      </main>
      <Footer locale={locale} dict={dict} />
      <SeoJsonLd
        data={breadcrumbSchema(locale, [
          { name: dict.nav.home, path: ROUTES[locale].home },
          { name: terms.title, path: ROUTES[locale].terms }
        ])}
      />
    </>
  );
}
