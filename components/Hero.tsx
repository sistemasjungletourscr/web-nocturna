import Image from "next/image";
import { IMAGES, type Locale } from "@/lib/constants";
import type { Dictionary } from "@/lib/dictionaries";
import { BookingButton } from "@/components/BookingButton";
import { WhatsAppButton } from "@/components/WhatsAppButton";

type HeroProps = {
  locale: Locale;
  dict: Dictionary;
};

export function Hero({ locale, dict }: HeroProps) {
  return (
    <section className="relative isolate min-h-[calc(100svh-76px)] overflow-hidden">
      <Image
        src={IMAGES.hero}
        alt="Red-eyed tree frog in Arenal forest at night"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[66%_center]"
      />
      <div className="hero-mask absolute inset-0" />
      <div className="lantern-sweep pointer-events-none absolute inset-0" />
      <div className="mist pointer-events-none absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-fog/18 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute inset-0">
        {[18, 28, 42, 58, 71, 84].map((left, index) => (
          <span
            key={left}
            className="firefly absolute h-1.5 w-1.5 rounded-full bg-frog shadow-[0_0_16px_rgba(124,255,107,0.8)]"
            style={{
              left: `${left}%`,
              top: `${24 + ((index * 11) % 42)}%`,
              animationDelay: `${index * 0.75}s`
            }}
          />
        ))}
      </div>
      <div className="section-shell relative z-10 flex min-h-[calc(100svh-76px)] items-center py-16">
        <div className="max-w-3xl">
          <p className="mb-4 inline-flex rounded-full border border-lantern/30 bg-lantern/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-lantern">
            {dict.hero.eyebrow}
          </p>
          <h1 className="font-heading text-5xl leading-[0.95] text-soft sm:text-6xl lg:text-7xl">
            {dict.hero.headline}
          </h1>
          <p className="mt-5 max-w-2xl text-xl leading-8 text-volcanic md:text-2xl">
            {dict.hero.subheadline}
          </p>
          <p className="mt-5 max-w-2xl text-base leading-8 text-fog">
            {dict.hero.copy}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <BookingButton locale={locale} label={dict.hero.primary} />
            <WhatsAppButton
              locale={locale}
              label={dict.hero.secondary}
              source="hero"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
