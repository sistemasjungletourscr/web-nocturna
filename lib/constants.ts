export const SITE_URL = "https://www.arenalnighthike.com";

export const LOCALES = ["es", "en"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

export const TOUR = {
  name: "Arenal Forest Night Hike",
  domain: "www.arenalnighthike.com",
  email: "info@arenalnighthike.com",
  phoneDisplay: "+506 22277680",
  phoneHref: "+50622277680",
  whatsappNumber: "50622277680",
  location: "La Fortuna, Alajuela, Costa Rica",
  price: 35,
  regularPrice: 50,
  currency: "USD",
  taxText: "+ Tax",
  schedule: "Daily at 6:00 PM",
  scheduleEs: "Todos los días a las 6:00 PM",
  duration: "Approx. 2 hours",
  durationEs: "Aprox. 2 horas",
  distance: "Approx. 2 km",
  distanceEs: "Aprox. 2 km",
  difficulty: "Moderate",
  difficultyEs: "Moderado / Medio",
  minimumAge: "Ages 4+",
  minimumAgeEs: "Niños 4+",
  group: "Max. 10 people per guide",
  groupEs: "Máx. 10 personas por guía",
  groupNote: "Subject to change during high season",
  groupNoteEs: "Sujeto a cambios durante temporada alta",
  languages: "Spanish / English",
  languagesEs: "Español / Inglés",
  peekUrl:
    "https://book.peek.com/s/9a4fe6cc-212c-4b90-b12d-98bce7693768/mY4Lx",
  tripadvisorUrl:
    "https://www.tripadvisor.com/AttractionProductReview-g309226-d20065165-Arenal_Night_Walk_Snakes_Frogs_Wildlife-La_Fortuna_de_San_Carlos_Arenal_Volcano_Na.html",
  mapEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d980.8113962650876!2d-84.67808533937094!3d10.481296353079552!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa00dba6f488f89%3A0x860eb1a99103673b!2sArenal%20Park%20Adventure!5e0!3m2!1ses-419!2scr!4v1779736242940!5m2!1ses-419!2scr"
};

export const IMAGES = {
  hero: "/images/red-eyed-tree-frog-arenal-night-hike-la-fortuna.webp",
  forest: "/images/arenal-rainforest-night-hike-volcano-foothills.webp",
  poisonFrog: "/images/strawberry-poison-dart-frog-arenal-night-hike.webp",
  redEyedPair: "/images/red-eyed-tree-frogs-night-tour-la-fortuna.webp",
  treeFrog: "/images/tree-frog-arenal-forest-night-hike.webp",
  snake: "/images/boa-snake-night-hike-la-fortuna-costa-rica.webp",
  nocturnalFrog:
    "/images/nocturnal-frog-night-walk-la-fortuna-costa-rica.webp",
  transportRange: "/images/la-fortuna-free-transport-range.webp"
};

export const ROUTES = {
  en: {
    home: "/en",
    faq: "/en/faq",
    about: "/en/about",
    terms: "/en/terms-and-conditions",
    cancellation: "/en/cancellation-policy",
    thanks: "/en/thank-you"
  },
  es: {
    home: "/es",
    faq: "/es/faq",
    about: "/es/nosotros",
    terms: "/es/terminos-y-condiciones",
    cancellation: "/es/politicas-de-cancelacion",
    thanks: "/es/gracias"
  }
} as const;

export const PAGE_PATHS = [
  ROUTES.en.home,
  ROUTES.en.faq,
  ROUTES.en.about,
  ROUTES.en.terms,
  ROUTES.en.cancellation,
  ROUTES.en.thanks,
  ROUTES.es.home,
  ROUTES.es.faq,
  ROUTES.es.about,
  ROUTES.es.terms,
  ROUTES.es.cancellation,
  ROUTES.es.thanks
];

export function isLocale(value: string): value is Locale {
  return LOCALES.includes(value as Locale);
}

export function whatsappUrl(locale: Locale, source?: string) {
  const text =
    locale === "es"
      ? "Hola, quiero más información sobre el Arenal Forest Night Hike."
      : "Hello, I would like more information about the Arenal Forest Night Hike.";

  const url = new URL(`https://wa.me/${TOUR.whatsappNumber}`);
  url.searchParams.set("text", text);
  if (source) url.searchParams.set("source", source);
  return url.toString();
}
