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
  return params.then(({ locale }) => (locale === "en" ? buildMetadata("en", "thanks") : {}));
}

export default async function ThankYouPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam) || localeParam !== "en") notFound();
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);

  return (
    <SupportPage locale={locale} dict={dict} page="thanks" title={dict.pages.thanks.title}>
      {/* Fire purchase_or_booking_completed only after a real Peek Pro booking confirmation redirect or callback is configured. */}
      <p>{dict.pages.thanks.copy}</p>
    </SupportPage>
  );
}
