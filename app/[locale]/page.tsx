import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BenefitsSection } from "@/components/BenefitsSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { PeekBookingWidget } from "@/components/PeekBookingWidget";
import { ReviewsSection } from "@/components/ReviewsSection";
import { SeoJsonLd } from "@/components/SeoJsonLd";
import { TourCard } from "@/components/TourCard";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { WildlifeSection } from "@/components/WildlifeSection";
import { isLocale, ROUTES, type Locale } from "@/lib/constants";
import { getDictionary } from "@/lib/dictionaries";
import { baseBusinessSchema, breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return params.then(({ locale }) =>
    isLocale(locale) ? buildMetadata(locale, "home") : {}
  );
}

export default async function HomePage({
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
      <Header locale={locale} dict={dict} page="home" />
      <main>
        <Hero locale={locale} dict={dict} />
        <BenefitsSection dict={dict} />
        <TourCard dict={dict} />
        <WildlifeSection dict={dict} />
        <PeekBookingWidget
          locale={locale}
          title={dict.booking.title}
          copy={dict.booking.copy}
          button={dict.booking.button}
        />
        <ReviewsSection locale={locale} dict={dict} />
        <ContactSection locale={locale} dict={dict} />
      </main>
      <Footer locale={locale} dict={dict} />
      <WhatsAppButton
        locale={locale}
        label={dict.nav.whatsapp}
        source="floating_button"
        variant="floating"
        iconOnly
      />
      <SeoJsonLd data={baseBusinessSchema(locale)} />
      <SeoJsonLd
        data={breadcrumbSchema(locale, [
          { name: dict.nav.home, path: ROUTES[locale].home }
        ])}
      />
    </>
  );
}
