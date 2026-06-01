import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TermsPageLayout } from "@/components/TermsPageLayout";
import { isLocale, type Locale } from "@/lib/constants";
import { getDictionary } from "@/lib/dictionaries";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "es" }];
}

export function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return params.then(({ locale }) =>
    locale === "es" ? buildMetadata("es", "terms") : {}
  );
}

export default async function TerminosPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam) || localeParam !== "es") notFound();
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);

  return <TermsPageLayout locale={locale} dict={dict} />;
}
