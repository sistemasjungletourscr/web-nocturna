import type { Metadata } from "next";
import { IMAGES, ROUTES, SITE_URL, type Locale } from "@/lib/constants";
import { getDictionary } from "@/lib/dictionaries";

type SeoKey =
  | "home"
  | "faq"
  | "about"
  | "terms"
  | "cancellation"
  | "thanks";

const pageMetaMap = {
  home: ["homeTitle", "homeDescription"],
  faq: ["faqTitle", "faqDescription"],
  about: ["aboutTitle", "aboutDescription"],
  terms: ["termsTitle", "termsDescription"],
  cancellation: ["cancellationTitle", "cancellationDescription"],
  thanks: ["thanksTitle", "thanksDescription"]
} as const;

export function localizedPath(locale: Locale, page: SeoKey) {
  if (page === "home") return ROUTES[locale].home;
  return ROUTES[locale][page];
}

export function buildMetadata(locale: Locale, page: SeoKey): Metadata {
  const dict = getDictionary(locale);
  const [titleKey, descriptionKey] = pageMetaMap[page];
  const path = localizedPath(locale, page);
  const title = dict.seo[titleKey];
  const description = dict.seo[descriptionKey];
  const image = `${SITE_URL}${IMAGES.hero}`;

  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: {
      canonical: path,
      languages: {
        en: localizedPath("en", page),
        es: localizedPath("es", page),
        "x-default": localizedPath("en", page)
      }
    },
    openGraph: {
      title,
      description,
      url: `${SITE_URL}${path}`,
      siteName: "Arenal Forest Night Hike",
      locale: locale === "es" ? "es_CR" : "en_US",
      type: "website",
      images: [
        {
          url: image,
          width: 2000,
          height: 1333,
          alt: "Red-eyed tree frog seen during an Arenal forest night hike"
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image]
    },
    keywords: [
      "Arenal Forest Night Hike",
      "Arenal Volcano Night Hike",
      "La Fortuna Night Hike",
      "Night Hike Arenal",
      "Arenal Night Walk",
      "La Fortuna Night Walk",
      "Arenal Volcano Night Tour",
      "Costa Rica Night Hike",
      "Caminata nocturna La Fortuna",
      "Caminata nocturna Volcán Arenal",
      "Tour nocturno Arenal",
      "Hike nocturno Costa Rica"
    ]
  };
}
