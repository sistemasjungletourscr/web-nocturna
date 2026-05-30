import Image from "next/image";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { ROUTES, type Locale } from "@/lib/constants";
import type { Dictionary } from "@/lib/dictionaries";
import { breadcrumbSchema } from "@/lib/schema";

type SupportPageProps = {
  locale: Locale;
  dict: Dictionary;
  page: "faq" | "about" | "terms" | "cancellation" | "thanks";
  title: string;
  children: React.ReactNode;
  image?: string;
};

export function SupportPage({
  locale,
  dict,
  page,
  title,
  children,
  image
}: SupportPageProps) {
  return (
    <>
      <Header locale={locale} dict={dict} page={page} />
      <main className="section-shell py-14 md:py-20">
        <div className="grid gap-8 lg:grid-cols-[0.78fr_1.22fr] lg:items-start">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-lantern">
              Arenal Forest Night Hike
            </p>
            <h1 className="mt-3 font-heading text-5xl leading-tight text-soft md:text-6xl">
              {title}
            </h1>
          </div>
          <article className="glass-panel rounded-lg p-6 text-base leading-8 text-fog sm:p-8">
            {children}
          </article>
        </div>
        {image ? (
          <figure className="relative mt-8 aspect-[16/7] overflow-hidden rounded-lg border border-volcanic/15">
            <Image
              src={image}
              alt={`${title} Arenal Forest Night Hike`}
              fill
              sizes="100vw"
              className="object-cover"
            />
          </figure>
        ) : null}
      </main>
      <Footer locale={locale} dict={dict} />
      <SeoJsonLd
        data={breadcrumbSchema(locale, [
          { name: dict.nav.home, path: ROUTES[locale].home },
          { name: title, path: ROUTES[locale][page] }
        ])}
      />
    </>
  );
}
