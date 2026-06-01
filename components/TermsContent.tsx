import Link from "next/link";
import { ExpandableImage } from "@/components/ExpandableImage";
import { FadeInSections } from "@/components/FadeInSections";
import { IMAGES, ROUTES, type Locale } from "@/lib/constants";
import type { Dictionary } from "@/lib/dictionaries";

type TermsContentProps = {
  locale: Locale;
  dict: Dictionary;
};

export function TermsContent({ locale, dict }: TermsContentProps) {
  const terms = dict.pages.terms;
  const openRangeLabel =
    locale === "es" ? "Abrir mapa de pickup" : "Open pickup map";
  const closeRangeLabel =
    locale === "es" ? "Cerrar mapa de pickup" : "Close pickup map";

  return (
    <FadeInSections as="div" className="grid gap-10">
      <section>
        <h2 className="font-heading text-3xl leading-tight text-soft">
          {terms.generalTitle}
        </h2>
        <FadeInSections as="div" className="mt-5 grid gap-5">
          {terms.generalSections.map((section) => (
            <section
              key={section.title}
              className="rounded-lg border border-volcanic/15 bg-white/5 p-5"
            >
              <h3 className="text-xl font-bold text-soft">{section.title}</h3>
              <ul className="mt-4 space-y-3">
                {section.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-lantern" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </FadeInSections>
        <p className="mt-5">
          <Link
            href={ROUTES[locale].cancellation}
            className="font-bold text-lantern underline-offset-4 hover:underline"
          >
            {terms.cancellationLink}
          </Link>
        </p>
      </section>

      <section className="rounded-lg border border-lantern/25 bg-lantern/8 p-5">
        <h2 className="font-heading text-3xl leading-tight text-soft">
          {terms.transportSection.title}
        </h2>
        <p className="mt-4">{terms.transportSection.intro}</p>
        <ExpandableImage
          src={IMAGES.transportRange}
          alt={terms.transportSection.imageAlt}
          sizes="(min-width: 1024px) 760px, 100vw"
          openLabel={openRangeLabel}
          closeLabel={closeRangeLabel}
          className="mt-6 aspect-[4/3] rounded-lg border border-volcanic/20 bg-night sm:aspect-[16/10]"
        />
        <ul className="mt-5 space-y-3">
          {terms.transportSection.items.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-lantern" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>
    </FadeInSections>
  );
}
