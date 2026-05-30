import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { SupportPage } from "@/components/SupportPage";
import { isLocale, type Locale } from "@/lib/constants";
import { getDictionary } from "@/lib/dictionaries";
import { faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

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

  return (
    <>
      <SupportPage locale={locale} dict={dict} page="faq" title="FAQ">
        <div className="space-y-6">
          {dict.faq.map((item) => (
            <section key={item.q}>
              <h2 className="text-xl font-bold text-soft">{item.q}</h2>
              <p className="mt-2">{item.a}</p>
            </section>
          ))}
        </div>
      </SupportPage>
      <SeoJsonLd data={faqSchema(locale)} />
    </>
  );
}
