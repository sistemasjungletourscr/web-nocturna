import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { TermsPageLayout } from "@/components/TermsPageLayout";
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

  return <TermsPageLayout locale={locale} dict={dict} />;
}
