import { ROUTES, SITE_URL, TOUR, type Locale } from "@/lib/constants";
import { getDictionary } from "@/lib/dictionaries";

export function baseBusinessSchema(locale: Locale) {
  const dict = getDictionary(locale);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "TouristAttraction"],
        "@id": `${SITE_URL}/#business`,
        name: TOUR.name,
        url: SITE_URL,
        email: TOUR.email,
        telephone: TOUR.phoneDisplay,
        priceRange: "$$",
        address: {
          "@type": "PostalAddress",
          addressLocality: "La Fortuna",
          addressRegion: "Alajuela",
          addressCountry: "CR"
        },
        areaServed: "La Fortuna, Costa Rica",
        description: dict.seo.homeDescription
      },
      {
        "@type": "Product",
        "@id": `${SITE_URL}/#tour`,
        name: TOUR.name,
        description: dict.tour.short,
        brand: {
          "@type": "Brand",
          name: TOUR.name
        },
        category: "Night hike tour",
        offers: {
          "@type": "Offer",
          url: `${SITE_URL}${ROUTES[locale].home}#booking`,
          price: TOUR.price,
          priceCurrency: TOUR.currency,
          availability: "https://schema.org/InStock",
          validFrom: "2026-05-25"
        }
      }
    ]
  };
}

export function breadcrumbSchema(
  locale: Locale,
  items: Array<{ name: string; path: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`
    }))
  };
}

export function faqSchema(locale: Locale) {
  const dict = getDictionary(locale);
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: dict.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a
      }
    }))
  };
}
