import { IMAGES, ROUTES, TOUR } from "@/lib/constants";

export const es = {
  locale: "es",
  nav: {
    home: "Inicio",
    tour: "Tour",
    faq: "FAQ",
    about: "Nosotros",
    hike: "El Hike",
    includes: "Incluye",
    booking: "Reservar",
    reviews: "Reviews",
    contact: "Contacto",
    book: "Reservar ahora",
    whatsapp: "WhatsApp"
  },
  seo: {
    homeTitle: "Arenal Forest Night Hike | Caminata Nocturna en La Fortuna",
    homeDescription:
      "Vive un verdadero hike nocturno en el bosque de las faldas del Volcán Arenal. Tour diario a las 6:00 PM, aprox. 2 horas, niños 4+, guía bilingüe y grupos pequeños.",
    faqTitle: "FAQ | Arenal Forest Night Hike",
    faqDescription:
      "Preguntas frecuentes sobre Arenal Forest Night Hike en La Fortuna, Costa Rica.",
    aboutTitle: "Nosotros | Arenal Forest Night Hike",
    aboutDescription:
      "Conoce Arenal Forest Night Hike, una caminata nocturna guiada en el bosque de las faldas del Volcán Arenal.",
    termsTitle: "Términos y Condiciones | Arenal Forest Night Hike",
    termsDescription:
      "Términos y condiciones temporales para reservas de Arenal Forest Night Hike.",
    cancellationTitle: "Políticas de Cancelación | Arenal Forest Night Hike",
    cancellationDescription:
      "Política de cancelación para reservas de Arenal Forest Night Hike en La Fortuna.",
    thanksTitle: "Gracias | Arenal Forest Night Hike",
    thanksDescription: "Gracias por tu interés en Arenal Forest Night Hike."
  },
  hero: {
    eyebrow: "La Fortuna, Costa Rica",
    headline: TOUR.name,
    subheadline:
      "Explora el verdadero bosque nocturno del Volcán Arenal en una caminata guiada por las faldas del volcán.",
    copy: "No es un sendero plano. Es un hike nocturno real por terreno elevado, senderos naturales y el sonido auténtico del bosque del Arenal al caer la noche.",
    primary: "Reservar ahora",
    secondary: "Consultar por WhatsApp",
    badges: [
      "Todos los días 6:00 PM",
      "Niños 4+",
      "Guía bilingüe",
      "Grupos pequeños",
      "Aprox. 2 horas"
    ]
  },
  benefits: {
    title: "Un verdadero Night Hike, no solo una caminata plana",
    copy: "La mayoría de tours nocturnos se realizan en senderos planos. Arenal Forest Night Hike te lleva por terreno elevado en el bosque de las faldas del Volcán Arenal, donde la noche se siente más profunda, natural y auténtica.",
    cards: [
      "Terreno elevado en bosque",
      "Faldas reales del Volcán Arenal",
      "Experiencia naturalista nocturna",
      "Grupos pequeños",
      "Seguro para familias aventureras",
      "Hike enfocado en fauna"
    ]
  },
  tour: {
    title: TOUR.name,
    price: "Desde $35 + Tax",
    short:
      "Entra al bosque del Volcán Arenal después del atardecer y recorre un sendero guiado en las faldas del volcán, donde la noche revela su propio ritmo. Las linternas descubren detalles en hojas, raíces, troncos y suelo del bosque mientras ranas, reptiles, insectos y otros animales nocturnos se mueven en su hábitat natural. Es una forma inmersiva de sentir los sonidos, la oscuridad, la humedad y la vida silvestre de La Fortuna al caer la noche.",
    facts: [
      ["Horario", TOUR.scheduleEs],
      ["Duración", TOUR.durationEs],
      ["Distancia", TOUR.distanceEs],
      ["Dificultad", TOUR.difficultyEs],
      ["Edad", TOUR.minimumAgeEs],
      ["Grupo", `${TOUR.groupEs}. ${TOUR.groupNoteEs}.`],
      ["Idiomas", TOUR.languagesEs]
    ],
    wildlife: [
      "Ranas coloridas",
      "Serpientes",
      "Insectos",
      "Mamíferos",
      "Otros animales nocturnos según temporada y condiciones naturales"
    ]
  },
  includes: {
    title: "Qué Incluye",
    includesTitle: "Incluye",
    excludesTitle: "No incluye",
    bringTitle: "Qué llevar",
    includes: [
      "Servicio de recogida o regreso en el área de La Fortuna",
      "Entrada",
      "Equipo de linterna",
      "Guía profesional bilingüe Español / Inglés"
    ],
    excludes: ["IVA 13% y cargos", "Comida", "Fotos"],
    bring: [
      "Zapatos de hiking o calzado cerrado - importante",
      "Pantalón largo",
      "Medicamentos personales",
      "Repelente",
      "Capa o jacket para lluvia",
      "Cámara"
    ]
  },
  booking: {
    title: "Reserva tu Arenal Forest Night Hike",
    copy: "Reserva tu espacio para el hike nocturno de las 6:00 PM. Los grupos son pequeños para mantener una experiencia segura, personalizada y enfocada en la observación de fauna.",
    button: "Reservar ahora"
  },
  reviews: {
    title: "Reseñas Reales",
    copy: "Extractos recientes verificados de Tripadvisor de viajeros que realizaron la experiencia nocturna de fauna en La Fortuna.",
    source: "Extractos verificados de Tripadvisor",
    empty: "Las rese\u00f1as reales aparecer\u00e1n aqu\u00ed cuando se agreguen rese\u00f1as verificadas.",
    button: "Leer reviews en Tripadvisor"
  },
  contact: {
    title: "Contacto y Localización",
    copy: "¿Tienes preguntas antes de reservar? Escríbenos, llama, envía un correo o consulta directamente por WhatsApp.",
    formTitle: "Enviar Mensaje",
    name: "Nombre",
    email: "Email",
    phone: "WhatsApp / teléfono",
    date: "Fecha deseada",
    people: "Número de personas",
    message: "Mensaje",
    submit: "Enviar por Email",
    mapTitle: "Mapa al punto de encuentro provisional"
  },
  footer: {
    tagline:
      "Un verdadero hike nocturno por terreno elevado en el bosque de las faldas del Volcán Arenal.",
    links: [
      ["FAQ", ROUTES.es.faq],
      ["Nosotros", ROUTES.es.about],
      ["Términos", ROUTES.es.terms],
      ["Políticas de cancelación", ROUTES.es.cancellation]
    ]
  },
  faq: [
    {
      q: "¿Este tour es una caminata nocturna plana?",
      a: "No. Es un verdadero hike nocturno por terreno natural elevado en el bosque de las faldas del Volcán Arenal."
    },
    {
      q: "¿A qué hora inicia el tour?",
      a: "El tour se realiza todos los días del año a las 6:00 PM, sujeto a clima y condiciones operativas."
    },
    {
      q: "¿Se garantizan animales?",
      a: "No. Los avistamientos dependen de temporada, clima, comportamiento natural y condiciones del sendero."
    },
    {
      q: "¿Es apto para niños?",
      a: "Pueden participar niños desde 4 años. Las familias deben sentirse cómodas con un hike nocturno moderado."
    },
    {
      q: "¿Qué zapatos debo usar?",
      a: "Es importante usar zapatos de hiking o calzado cerrado porque el sendero incluye terreno natural y secciones de subida."
    }
  ],
  pages: {
    about: {
      title: "Nosotros",
      copy: "Arenal Forest Night Hike es una experiencia naturalista guiada para viajeros que buscan una aventura nocturna más auténtica en La Fortuna. El hike explora terreno elevado cerca de las faldas del Volcán Arenal con guía bilingüe y enfoque en seguridad.",
      image: IMAGES.forest
    },
    terms: {
      title: "Términos y Condiciones",
      copy: "Estos términos temporales describen condiciones generales de reserva para Arenal Forest Night Hike. Los detalles de reserva, condiciones operativas, impuestos y términos del servicio pueden actualizarse antes de publicar."
    },
    cancellation: {
      title: "Políticas de Cancelación",
      items: [
        "Cancelación gratuita hasta 24 horas antes del tour.",
        "Cancelaciones con menos de 24 horas pueden no ser reembolsables.",
        "No-shows no son reembolsables.",
        "El operador puede modificar o cancelar la actividad por clima, seguridad, condiciones del sendero o condiciones operativas.",
        "En caso de cancelación por parte del operador, se ofrecerá reprogramación o reembolso según corresponda."
      ]
    },
    thanks: {
      title: "Gracias",
      copy: "Tu solicitud fue recibida o el flujo de reserva te redirigió aquí. Una conversión de reserva completada solo debe registrarse aquí cuando Peek Pro confirme una reserva real mediante redirect o callback oficial."
    }
  }
} as const;
