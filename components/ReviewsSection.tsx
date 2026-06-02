"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, ExternalLink, Star } from "lucide-react";
import reviewsData from "@/data/tripadvisor-reviews.json";
import { TOUR, type Locale } from "@/lib/constants";
import type { Dictionary } from "@/lib/dictionaries";
import { trackEvent } from "@/tracking/events";

type TripadvisorReview = {
  id: string;
  reviewerName: string;
  rating: number;
  date: string;
  excerpt: string;
  sourceUrl: string;
};

const verifiedReviews = (reviewsData as TripadvisorReview[])
  .filter((review) => review.rating >= 4)
  .slice(0, 10);

function chunkReviews(reviews: TripadvisorReview[], size: number) {
  return Array.from({ length: Math.ceil(reviews.length / size) }, (_, index) =>
    reviews.slice(index * size, index * size + size)
  );
}

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 text-lantern" aria-label={`${rating} out of 5`}>
      {[0, 1, 2, 3, 4].map((item) => (
        <Star
          key={item}
          aria-hidden="true"
          size={17}
          className={item < rating ? "fill-current" : "opacity-30"}
        />
      ))}
    </div>
  );
}

function TripadvisorMark() {
  return (
    <div
      className="flex h-24 w-full max-w-[250px] items-center justify-center rounded-lg border border-lantern/20 bg-soft/95 px-6 shadow-glass md:h-28 md:max-w-[300px]"
    >
      <Image
        src="/icons/tripadvisor-logo-official.svg"
        alt="Tripadvisor"
        width={132}
        height={86}
        className="h-16 w-auto md:h-20"
      />
    </div>
  );
}

export function ReviewsSection({
  locale,
  dict
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const pageSize = isDesktop ? 2 : 1;
  const reviewSlides = useMemo(() => chunkReviews(verifiedReviews, pageSize), [pageSize]);
  const totalSlides = Math.max(1, reviewSlides.length);
  const safeActiveSlide = Math.min(activeSlide, totalSlides - 1);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    function updateViewport() {
      setIsDesktop(mediaQuery.matches);
    }

    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);
    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  useEffect(() => {
    if (isPaused || verifiedReviews.length <= pageSize) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const interval = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % totalSlides);
    }, 5600);

    return () => window.clearInterval(interval);
  }, [isPaused, pageSize, totalSlides]);

  function showPrevious() {
    setActiveSlide((current) => (current - 1 + totalSlides) % totalSlides);
  }

  function showNext() {
    setActiveSlide((current) => (current + 1) % totalSlides);
  }

  return (
    <section id="reviews" className="anchor-offset section-shell py-16 md:py-24">
      <div
        className="glass-panel overflow-hidden rounded-lg"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onFocus={() => setIsPaused(true)}
        onBlur={() => setIsPaused(false)}
      >
        <div className="flex flex-col gap-6 border-b border-volcanic/15 p-6 sm:p-8 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-lantern/30 bg-lantern/10 px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-lantern">
              <Star aria-hidden="true" size={15} className="fill-current" />
              {dict.reviews.source}
            </div>
            <h2 className="font-heading text-4xl text-soft md:text-5xl">
              {dict.reviews.title}
            </h2>
            <p className="mt-4 text-base leading-8 text-fog">{dict.reviews.copy}</p>
          </div>
          <div className="flex w-full flex-col items-start gap-4 md:w-auto md:items-end">
            <TripadvisorMark />
            <a
              href={TOUR.tripadvisorUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackEvent("outbound_tripadvisor_click", {
                  language: locale,
                  source_section: "reviews_header"
                })
              }
              className="inline-flex items-center justify-center gap-2 rounded-md border border-lantern/50 px-5 py-3 text-sm font-bold text-lantern transition hover:bg-lantern hover:text-night"
            >
              {dict.reviews.button}
              <ExternalLink aria-hidden="true" size={16} />
            </a>
          </div>
        </div>

        {verifiedReviews.length > 0 ? (
          <div className="p-4 sm:p-6 md:p-8">
            <div
              className="overflow-hidden"
              aria-live="polite"
              aria-label={
                locale === "es"
                  ? "Carrusel de rese\u00f1as de Tripadvisor"
                  : "Tripadvisor reviews carousel"
              }
            >
              <div
                className="flex transition-transform duration-700 ease-out motion-reduce:transition-none"
                style={{ transform: `translateX(-${safeActiveSlide * 100}%)` }}
              >
                {reviewSlides.map((slide, slideIndex) => (
                  <div
                    key={slide.map((review) => review.id).join("-")}
                    className="grid w-full flex-none gap-4 md:grid-cols-2"
                    aria-hidden={slideIndex !== safeActiveSlide}
                  >
                    {slide.map((review) => (
                      <article
                        key={review.id}
                        className="flex min-h-[260px] min-w-0 flex-col justify-between rounded-lg border border-volcanic/15 bg-night/55 p-5 text-left shadow-glass"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-4">
                            <Stars rating={review.rating} />
                            <span className="text-xs font-bold uppercase tracking-[0.14em] text-fog">
                              {review.date}
                            </span>
                          </div>
                          <blockquote className="mt-6 min-w-0 text-xl font-semibold leading-8 text-soft">
                            &ldquo;{review.excerpt}&rdquo;
                          </blockquote>
                        </div>
                        <div className="mt-6 flex items-center justify-between gap-4 border-t border-volcanic/15 pt-4">
                          <p className="font-bold text-volcanic">{review.reviewerName}</p>
                          <a
                            href={review.sourceUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() =>
                              trackEvent("outbound_tripadvisor_click", {
                                language: locale,
                                source_section: "reviews_card",
                                review_id: review.id
                              })
                            }
                            className="text-sm font-bold text-lantern underline-offset-4 hover:underline"
                          >
                            Tripadvisor
                          </a>
                        </div>
                      </article>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between gap-4">
              <div className="flex gap-2">
                {Array.from({ length: totalSlides }).map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setActiveSlide(index)}
                    className={`h-2.5 rounded-full transition ${
                      index === safeActiveSlide
                        ? "w-8 bg-lantern"
                        : "w-2.5 bg-volcanic/30 hover:bg-volcanic/60"
                    }`}
                    aria-label={
                      locale === "es"
                        ? `Ir al grupo de rese\u00f1as ${index + 1}`
                        : `Go to review group ${index + 1}`
                    }
                  />
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={showPrevious}
                  className="rounded-md border border-volcanic/25 bg-white/5 p-3 text-soft transition hover:bg-lantern hover:text-night"
                  aria-label={locale === "es" ? "Rese\u00f1as anteriores" : "Previous reviews"}
                >
                  <ChevronLeft aria-hidden="true" size={20} />
                </button>
                <button
                  type="button"
                  onClick={showNext}
                  className="rounded-md border border-volcanic/25 bg-white/5 p-3 text-soft transition hover:bg-lantern hover:text-night"
                  aria-label={locale === "es" ? "Rese\u00f1as siguientes" : "Next reviews"}
                >
                  <ChevronRight aria-hidden="true" size={20} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-6 text-base leading-8 text-fog sm:p-8">
            {dict.reviews.empty}
          </div>
        )}
      </div>
    </section>
  );
}
