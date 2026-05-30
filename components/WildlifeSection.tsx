"use client";

import { PointerEvent, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { IMAGES } from "@/lib/constants";
import type { Dictionary } from "@/lib/dictionaries";

const galleryImages = [
  {
    src: IMAGES.redEyedPair,
    alt: "Red-eyed tree frogs seen at night in La Fortuna",
    captionEn: "Red-eyed tree frogs in the Arenal forest after dark.",
    captionEs: "Ranas de ojos rojos en el bosque del Arenal al anochecer."
  },
  {
    src: IMAGES.poisonFrog,
    alt: "Colorful frog on the forest floor during a night hike",
    captionEn: "A colorful frog on the wet forest floor.",
    captionEs: "Una rana colorida sobre el suelo húmedo del bosque."
  },
  {
    src: IMAGES.snake,
    alt: "Boa snake observed in nocturnal forest conditions",
    captionEn: "Reptiles may appear along the trail under natural conditions.",
    captionEs: "Los reptiles pueden aparecer en el sendero bajo condiciones naturales."
  },
  {
    src: IMAGES.nocturnalFrog,
    alt: "Nocturnal frog in Costa Rica rainforest",
    captionEn: "Nocturnal frogs are part of the changing soundscape.",
    captionEs: "Las ranas nocturnas forman parte del paisaje sonoro cambiante."
  },
  {
    src: IMAGES.hero,
    alt: "Red-eyed tree frog during an Arenal night hike",
    captionEn: "Flashlight details reveal the small life of the rainforest.",
    captionEs: "La luz de la linterna revela los pequeños detalles del bosque."
  },
  {
    src: IMAGES.treeFrog,
    alt: "Tree frog on a branch during a night hike",
    captionEn: "Every evening brings different wildlife activity.",
    captionEs: "Cada noche trae actividad distinta de vida silvestre."
  },
  {
    src: IMAGES.forest,
    alt: "Arenal rainforest texture on natural night hike terrain",
    captionEn: "Natural forest textures along the real uphill hike.",
    captionEs: "Texturas naturales del bosque durante el verdadero hike de subida."
  }
];

export function WildlifeSection({ dict }: { dict: Dictionary }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const pointerStartX = useRef<number | null>(null);
  const pointerMoved = useRef(false);
  const activeImage = galleryImages[activeIndex];
  const captionKey = dict.locale === "es" ? "captionEs" : "captionEn";

  useEffect(() => {
    if (lightboxIndex !== null) return;

    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % galleryImages.length);
    }, 4200);

    return () => window.clearInterval(interval);
  }, [lightboxIndex]);

  useEffect(() => {
    if (lightboxIndex === null) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setLightboxIndex(null);
      if (event.key === "ArrowRight") showNext();
      if (event.key === "ArrowLeft") showPrevious();
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  });

  function showNext() {
    setLightboxIndex((current) =>
      current === null ? 0 : (current + 1) % galleryImages.length
    );
  }

  function showPrevious() {
    setLightboxIndex((current) =>
      current === null
        ? galleryImages.length - 1
        : (current - 1 + galleryImages.length) % galleryImages.length
    );
  }

  function showNextSlide() {
    setActiveIndex((current) => (current + 1) % galleryImages.length);
  }

  function showPreviousSlide() {
    setActiveIndex((current) =>
      (current - 1 + galleryImages.length) % galleryImages.length
    );
  }

  function handlePointerDown(event: PointerEvent<HTMLDivElement>) {
    pointerStartX.current = event.clientX;
    pointerMoved.current = false;
  }

  function handlePointerUp(event: PointerEvent<HTMLDivElement>) {
    if (pointerStartX.current === null) return;

    const deltaX = event.clientX - pointerStartX.current;
    pointerStartX.current = null;

    if (Math.abs(deltaX) > 42) {
      pointerMoved.current = true;
      if (deltaX < 0) showNextSlide();
      else showPreviousSlide();
      return;
    }

    if (event.pointerType === "mouse" && !pointerMoved.current) {
      showNextSlide();
    }
  }

  return (
    <section className="section-shell py-16 md:py-24" aria-label="Wildlife photo gallery">
      <div className="relative overflow-hidden rounded-lg border border-volcanic/15 bg-jungle shadow-glass">
        <div
          onPointerDown={handlePointerDown}
          onPointerUp={handlePointerUp}
          className="group relative block aspect-[4/5] w-full touch-pan-y overflow-hidden text-left sm:aspect-[16/10] lg:aspect-[16/8]"
          role="region"
          aria-roledescription="carousel"
          aria-label={
            dict.locale === "es"
              ? "Carrusel de fotos de fauna nocturna"
              : "Nocturnal wildlife photo carousel"
          }
        >
          {galleryImages.map((image, index) => (
            <Image
              key={image.src}
              src={image.src}
              alt={index === activeIndex ? image.alt : ""}
              fill
              sizes="100vw"
              priority={index === 0}
              className={`object-cover transition duration-700 ease-out group-hover:scale-[1.03] ${
                index === activeIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-night via-night/45 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-night/88 via-night/35 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 lg:p-10">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="rounded-md border border-volcanic/20 bg-night/55 px-4 py-3 text-sm text-volcanic backdrop-blur">
                {activeImage[captionKey]}
              </p>
              <button
                type="button"
                onPointerDown={(event) => event.stopPropagation()}
                onPointerUp={(event) => event.stopPropagation()}
                onClick={(event) => {
                  event.stopPropagation();
                  setLightboxIndex(activeIndex);
                }}
                className="inline-flex items-center gap-2 rounded-md bg-lantern px-4 py-3 text-sm font-bold text-night transition hover:bg-[#ffd06a]"
              >
                <Maximize2 aria-hidden="true" size={17} />
                {dict.locale === "es" ? "Abrir galería" : "Open gallery"}
              </button>
            </div>
          </div>
          <button
            type="button"
            onPointerDown={(event) => event.stopPropagation()}
            onPointerUp={(event) => event.stopPropagation()}
            onClick={showPreviousSlide}
            className="absolute left-3 top-1/2 hidden -translate-y-1/2 rounded-full border border-volcanic/25 bg-night/65 p-3 text-soft backdrop-blur transition hover:bg-lantern hover:text-night md:inline-flex"
            aria-label={dict.locale === "es" ? "Imagen anterior" : "Previous image"}
          >
            <ChevronLeft aria-hidden="true" size={24} />
          </button>
          <button
            type="button"
            onPointerDown={(event) => event.stopPropagation()}
            onPointerUp={(event) => event.stopPropagation()}
            onClick={showNextSlide}
            className="absolute right-3 top-1/2 hidden -translate-y-1/2 rounded-full border border-volcanic/25 bg-night/65 p-3 text-soft backdrop-blur transition hover:bg-lantern hover:text-night md:inline-flex"
            aria-label={dict.locale === "es" ? "Imagen siguiente" : "Next image"}
          >
            <ChevronRight aria-hidden="true" size={24} />
          </button>
        </div>

        <div className="hidden gap-2 border-t border-volcanic/15 bg-night/70 p-3 sm:grid sm:grid-cols-4 lg:grid-cols-7">
          {galleryImages.map((image, index) => (
            <button
              key={image.src}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`group relative aspect-[5/4] overflow-hidden rounded-md border text-left transition ${
                index === activeIndex
                  ? "border-lantern"
                  : "border-volcanic/15 hover:border-lantern/60"
              }`}
              aria-label={image[captionKey]}
            >
              <Image
                src={image.src}
                alt=""
                fill
                sizes="(min-width: 1024px) 150px, 25vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-night/90 via-transparent to-transparent" />
              <span className="absolute bottom-2 left-2 right-2 line-clamp-2 text-[11px] font-semibold leading-4 text-soft">
                {image[captionKey]}
              </span>
            </button>
          ))}
        </div>
      </div>

      {lightboxIndex !== null ? (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-night/92 p-4 backdrop-blur-md"
          role="dialog"
          aria-modal="true"
          aria-label={dict.locale === "es" ? "Galería de fotos" : "Photo gallery"}
        >
          <button
            type="button"
            onClick={() => setLightboxIndex(null)}
            className="absolute right-4 top-4 rounded-md border border-volcanic/25 bg-white/8 p-3 text-soft transition hover:bg-white/15"
            aria-label={dict.locale === "es" ? "Cerrar galería" : "Close gallery"}
          >
            <X aria-hidden="true" size={22} />
          </button>
          <button
            type="button"
            onClick={showPrevious}
            className="absolute left-4 top-1/2 hidden -translate-y-1/2 rounded-full border border-volcanic/25 bg-white/8 p-3 text-soft transition hover:bg-white/15 sm:block"
            aria-label={dict.locale === "es" ? "Foto anterior" : "Previous photo"}
          >
            <ChevronLeft aria-hidden="true" size={28} />
          </button>
          <figure className="animate-[fadeIn_240ms_ease-out] w-full max-w-6xl">
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg border border-volcanic/20 bg-black sm:aspect-[16/10]">
              <Image
                src={galleryImages[lightboxIndex].src}
                alt={galleryImages[lightboxIndex].alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
            <figcaption className="mx-auto mt-4 max-w-3xl rounded-md border border-volcanic/20 bg-white/8 px-4 py-3 text-center text-sm leading-6 text-volcanic">
              {galleryImages[lightboxIndex][captionKey]}
            </figcaption>
          </figure>
          <button
            type="button"
            onClick={showNext}
            className="absolute right-4 top-1/2 hidden -translate-y-1/2 rounded-full border border-volcanic/25 bg-white/8 p-3 text-soft transition hover:bg-white/15 sm:block"
            aria-label={dict.locale === "es" ? "Foto siguiente" : "Next photo"}
          >
            <ChevronRight aria-hidden="true" size={28} />
          </button>
          <div className="absolute bottom-4 flex gap-3 sm:hidden">
            <button
              type="button"
              onClick={showPrevious}
              className="rounded-md border border-volcanic/25 bg-white/8 px-4 py-3 text-soft"
            >
              <ChevronLeft aria-hidden="true" size={24} />
            </button>
            <button
              type="button"
              onClick={showNext}
              className="rounded-md border border-volcanic/25 bg-white/8 px-4 py-3 text-soft"
            >
              <ChevronRight aria-hidden="true" size={24} />
            </button>
          </div>
        </div>
      ) : null}
    </section>
  );
}
