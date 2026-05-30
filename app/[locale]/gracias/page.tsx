import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SupportPage } from "@/components/SupportPage";
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
  return params.then(({ locale }) => (locale === "es" ? buildMetadata("es", "thanks") : {}));
}

export default async function GraciasPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam) || localeParam !== "es") notFound();
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);

  return (
    <SupportPage locale={locale} dict={dict} page="thanks" title={dict.pages.thanks.title}>
      {/* Disparar purchase_or_booking_completed solo después de configurar un redirect o callback real de confirmación de Peek Pro. */}
      <p>{dict.pages.thanks.copy}</p>
    </SupportPage>
  );
}
