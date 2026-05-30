import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SupportPage } from "@/components/SupportPage";
import { isLocale, type Locale } from "@/lib/constants";
import { getDictionary } from "@/lib/dictionaries";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "en" }];
}

export function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return params.then(({ locale }) => (locale === "en" ? buildMetadata("en", "terms") : {}));
}

export default async function TermsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam) || localeParam !== "en") notFound();
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);

  return (
    <SupportPage locale={locale} dict={dict} page="terms" title={dict.pages.terms.title}>
      {/* Temporary legal copy. Review with qualified legal counsel before publishing. */}
      <p>{dict.pages.terms.copy}</p>
      <p className="mt-5">
        Reservations may be affected by weather, safety, trail conditions, or
        operational adjustments. Taxes and booking fees may apply.
      </p>
    </SupportPage>
  );
}
