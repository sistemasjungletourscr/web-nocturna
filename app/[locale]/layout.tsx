import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import "@/app/globals.css";
import { GoogleSearchConsoleVerification } from "@/components/GoogleSearchConsoleVerification";
import { TrackingManager } from "@/components/TrackingManager";
import { CookieBanner } from "@/components/CookieBanner";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { isLocale, LOCALES, type Locale } from "@/lib/constants";
import { getDictionary } from "@/lib/dictionaries";

const heading = localFont({
  src: "../../node_modules/@fontsource/marcellus/files/marcellus-latin-400-normal.woff2",
  variable: "--font-heading",
  display: "swap"
});

const body = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource/inter/files/inter-latin-400-normal.woff2",
      weight: "400",
      style: "normal"
    },
    {
      path: "../../node_modules/@fontsource/inter/files/inter-latin-600-normal.woff2",
      weight: "600",
      style: "normal"
    },
    {
      path: "../../node_modules/@fontsource/inter/files/inter-latin-700-normal.woff2",
      weight: "700",
      style: "normal"
    }
  ],
  variable: "--font-body",
  display: "swap"
});

export const metadata: Metadata = {
  applicationName: "Arenal Forest Night Hike",
  category: "travel",
  creator: "Arenal Forest Night Hike",
  icons: {
    icon: [
      {
        url: "/images/arenal-night-hike-favicon.svg",
        type: "image/svg+xml"
      }
    ],
    shortcut: [
      {
        url: "/images/arenal-night-hike-favicon.svg",
        type: "image/svg+xml"
      }
    ]
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#06130E"
};

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);

  return (
    <html lang={locale} className={`${heading.variable} ${body.variable}`}>
      <head>
        <GoogleSearchConsoleVerification />
      </head>
      <body className="font-sans antialiased">
        {children}
        <WhatsAppButton
          locale={locale}
          label={dict.nav.whatsapp}
          source="floating_button"
          variant="floating"
          iconOnly
        />
        <CookieBanner locale={locale} />
        <TrackingManager />
      </body>
    </html>
  );
}
