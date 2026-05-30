import { IMAGES, ROUTES, TOUR } from "@/lib/constants";

export const en = {
  locale: "en",
  nav: {
    home: "Home",
    tour: "Tour",
    faq: "FAQ",
    about: "About",
    hike: "The Hike",
    includes: "Includes",
    booking: "Book",
    reviews: "Reviews",
    contact: "Contact",
    book: "Book Now",
    whatsapp: "WhatsApp"
  },
  seo: {
    homeTitle:
      "Arenal Forest Night Hike | Night Hike in La Fortuna Costa Rica",
    homeDescription:
      "Join a real night hike in the forested foothills of Arenal Volcano. Daily 6:00 PM guided tour, approx. 2 hours, ages 4+, bilingual guide and small groups.",
    faqTitle: "FAQ | Arenal Forest Night Hike",
    faqDescription:
      "Frequently asked questions about the Arenal Forest Night Hike in La Fortuna, Costa Rica.",
    aboutTitle: "About | Arenal Forest Night Hike",
    aboutDescription:
      "Learn about Arenal Forest Night Hike, a real guided night hike in the forested foothills of Arenal Volcano.",
    termsTitle: "Terms and Conditions | Arenal Forest Night Hike",
    termsDescription:
      "Temporary terms and conditions for Arenal Forest Night Hike reservations.",
    cancellationTitle: "Cancellation Policy | Arenal Forest Night Hike",
    cancellationDescription:
      "Cancellation policy for Arenal Forest Night Hike bookings in La Fortuna.",
    thanksTitle: "Thank You | Arenal Forest Night Hike",
    thanksDescription:
      "Thank you for your interest in Arenal Forest Night Hike."
  },
  hero: {
    eyebrow: "La Fortuna, Costa Rica",
    headline: TOUR.name,
    subheadline:
      "Explore the real night side of Arenal Volcano on a guided uphill forest hike beneath the volcano.",
    copy: "This is not a flat night walk. It is a real forest hike through elevated terrain, natural trails, and the authentic sounds of the Arenal rainforest after dark.",
    primary: "Book Your Night Hike",
    secondary: "Ask by WhatsApp",
    badges: [
      "Every day at 6:00 PM",
      "Ages 4+",
      "Bilingual Guide",
      "Small Groups",
      "Approx. 2 Hours"
    ]
  },
  benefits: {
    title: "A Real Night Hike, Not Just a Flat Walk",
    copy: "Most night tours stay on easy flat trails. Arenal Forest Night Hike takes you into elevated forest terrain on the lower slopes of Arenal Volcano, where the night feels deeper, wilder, and more immersive.",
    cards: [
      "Uphill forest terrain",
      "Real Arenal volcano foothills",
      "Naturalist night experience",
      "Small groups",
      "Safe for adventurous families",
      "Wildlife-focused hike"
    ]
  },
  tour: {
    title: TOUR.name,
    price: "From $35 + Tax",
    short:
      "Enter the Arenal Volcano forest after sunset and follow a guided trail through the volcano foothills, where the night reveals its own rhythm. Flashlights uncover details on leaves, roots, trunks, and the forest floor while frogs, reptiles, insects, and other nocturnal life move through their natural habitat. It is an immersive way to feel the rainforest sounds, darkness, humidity, and wildlife of La Fortuna after dark.",
    facts: [
      ["Schedule", TOUR.schedule],
      ["Duration", TOUR.duration],
      ["Distance", TOUR.distance],
      ["Difficulty", TOUR.difficulty],
      ["Age", TOUR.minimumAge],
      ["Group", `${TOUR.group}. ${TOUR.groupNote}.`],
      ["Languages", TOUR.languages]
    ],
    wildlife: [
      "Colorful frogs",
      "Snakes",
      "Insects",
      "Mammals",
      "Other nocturnal animals depending on season and natural conditions"
    ]
  },
  includes: {
    title: "What Is Included",
    includesTitle: "Includes",
    excludesTitle: "Excludes",
    bringTitle: "What to Bring",
    includes: [
      "Pick-up or drop-off service from La Fortuna Area",
      "Entrance Fee",
      "Flashlight equipment",
      "Professional bilingual guide Spanish / English"
    ],
    excludes: ["VAT 13% and fees", "Food", "Photos"],
    bring: [
      "Hiking shoes or closed-toe shoes - important",
      "Long pants",
      "Personal medication",
      "Mosquito repellent",
      "Rain jacket",
      "Camera"
    ]
  },
  booking: {
    title: "Book Your Arenal Forest Night Hike",
    copy: "Secure your spot for the 6:00 PM night hike. Small groups are limited to keep the experience safe, personal, and wildlife-focused.",
    button: "Book Now"
  },
  reviews: {
    title: "Real Guest Reviews",
    copy: "Recent verified Tripadvisor excerpts from travelers who joined the night wildlife experience in La Fortuna.",
    source: "Verified Tripadvisor excerpts",
    empty: "Real guest reviews will appear here once verified reviews are added.",
    button: "Read reviews on Tripadvisor"
  },
  contact: {
    title: "Contact and Meeting Area",
    copy: "Questions before booking? Send us a message, call, email, or ask directly by WhatsApp.",
    formTitle: "Send a Message",
    name: "Name",
    email: "Email",
    phone: "WhatsApp / Phone",
    date: "Preferred date",
    people: "Number of people",
    message: "Message",
    submit: "Send by Email",
    mapTitle: "Map to provisional meeting area"
  },
  footer: {
    tagline:
      "A real night hike through elevated forest terrain in the foothills of Arenal Volcano.",
    links: [
      ["FAQ", ROUTES.en.faq],
      ["About", ROUTES.en.about],
      ["Terms", ROUTES.en.terms],
      ["Cancellation Policy", ROUTES.en.cancellation]
    ]
  },
  faq: [
    {
      q: "Is this tour a flat night walk?",
      a: "No. This is a real night hike on natural elevated terrain in the forested foothills of Arenal Volcano."
    },
    {
      q: "What time does the tour start?",
      a: "The tour runs every day of the year at 6:00 PM, subject to weather and operational conditions."
    },
    {
      q: "Are animals guaranteed?",
      a: "No. Wildlife sightings depend on season, weather, natural behavior, and trail conditions."
    },
    {
      q: "Is it suitable for children?",
      a: "Children ages 4 and older may join. Families should be comfortable with a moderate night hike."
    },
    {
      q: "What shoes should I wear?",
      a: "Hiking shoes or closed-toe shoes are important because the trail includes natural terrain and uphill sections."
    }
  ],
  pages: {
    about: {
      title: "About Arenal Forest Night Hike",
      copy: "Arenal Forest Night Hike is a guided naturalist experience designed for travelers who want a more authentic night adventure in La Fortuna. The hike explores elevated forest terrain near the foothills of Arenal Volcano with bilingual guidance and a safety-first approach.",
      image: IMAGES.forest
    },
    terms: {
      title: "Terms and Conditions",
      copy: "These temporary terms describe general reservation conditions for Arenal Forest Night Hike. Booking details, operational conditions, taxes, and service terms may be updated before publication."
    },
    cancellation: {
      title: "Cancellation Policy",
      items: [
        "Free cancellation is available up to 24 hours before the tour.",
        "Cancellations made less than 24 hours before the tour may be non-refundable.",
        "No-shows are non-refundable.",
        "The operator may modify or cancel the activity due to weather, safety, trail, or operational conditions.",
        "If the operator cancels the activity, rescheduling or a refund will be offered as appropriate."
      ]
    },
    thanks: {
      title: "Thank You",
      copy: "Your request has been received or your booking flow has redirected here. A completed booking conversion should only be recorded here when Peek Pro confirms a real reservation through an official redirect or callback."
    }
  }
} as const;
