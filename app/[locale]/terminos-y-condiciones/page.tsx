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
  return params.then(({ locale }) => (locale === "es" ? buildMetadata("es", "terms") : {}));
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

  return (
    <SupportPage locale={locale} dict={dict} page="terms" title={dict.pages.terms.title}>
      {/* Texto legal temporal. Revisar con asesoría legal calificada antes de publicar. */}
      <p>{dict.pages.terms.copy}</p>
      <p className="mt-5">
        Las reservas pueden verse afectadas por clima, seguridad, condiciones del
        sendero o ajustes operativos. Pueden aplicar impuestos y cargos de reserva.
      </p>
    </SupportPage>
  );
}
