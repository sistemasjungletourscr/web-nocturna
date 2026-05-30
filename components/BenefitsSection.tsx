import { Compass, Footprints, Leaf, Mountain, ShieldCheck, Users } from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries";

const icons = [Footprints, Mountain, Compass, Users, ShieldCheck, Leaf];

export function BenefitsSection({ dict }: { dict: Dictionary }) {
  return (
    <section id="hike" className="anchor-offset section-shell py-16 md:py-24">
      <div className="w-full">
        <h2 className="font-heading text-4xl text-soft md:text-5xl">
          {dict.benefits.title}
        </h2>
        <p className="mt-5 text-lg leading-8 text-fog">{dict.benefits.copy}</p>
      </div>
      <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {dict.benefits.cards.map((card, index) => {
          const Icon = icons[index];
          return (
            <article key={card} className="glass-panel rounded-lg p-5">
              <Icon aria-hidden="true" className="mb-4 text-lantern" size={26} />
              <h3 className="text-lg font-bold text-soft">{card}</h3>
            </article>
          );
        })}
      </div>
    </section>
  );
}
