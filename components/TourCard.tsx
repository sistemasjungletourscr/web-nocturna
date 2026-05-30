import {
  Bug,
  CalendarDays,
  Check,
  Clock,
  Gauge,
  Languages,
  Mountain,
  PackageCheck,
  PawPrint,
  Route,
  User,
  Users,
  X
} from "lucide-react";
import type { Dictionary } from "@/lib/dictionaries";

export function TourCard({ dict }: { dict: Dictionary }) {
  const wildlifeIcons = [PawPrint, Route, Bug, Mountain];
  const factIcons = [CalendarDays, Clock, Route, Gauge, User, Users, Languages];
  const detailGroups = [
    [dict.includes.includesTitle, dict.includes.includes, Check],
    [dict.includes.excludesTitle, dict.includes.excludes, X],
    [dict.includes.bringTitle, dict.includes.bring, PackageCheck]
  ] as const;

  return (
    <section id="tour" className="anchor-offset section-shell py-8">
      <article className="glass-panel overflow-hidden rounded-lg">
        <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
          <div className="p-6 sm:p-8">
            <p className="mb-3 text-sm font-bold uppercase tracking-[0.18em] text-lantern">
              {dict.tour.price}
            </p>
            <h2 className="font-heading text-4xl text-soft md:text-5xl">
              {dict.tour.title}
            </h2>
            <p className="mt-5 text-base leading-8 text-fog">{dict.tour.short}</p>
          </div>
          <dl className="grid border-t border-volcanic/15 bg-black/12 sm:grid-cols-2 lg:border-l lg:border-t-0">
            {dict.tour.facts.map(([label, value], index) => {
              const Icon = factIcons[index];
              return (
                <div key={label} className="border-b border-volcanic/10 p-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <dt className="text-sm font-bold text-lantern">{label}</dt>
                      <dd className="mt-2 text-base leading-6 text-soft">{value}</dd>
                    </div>
                    <Icon
                      aria-hidden="true"
                      className="mt-1 shrink-0 text-lantern"
                      size={23}
                    />
                  </div>
                </div>
              );
            })}
            <div className="p-5 sm:col-span-2">
              <dt className="text-sm font-bold text-lantern">Wildlife</dt>
              <dd className="mt-3 flex flex-wrap gap-2">
                {dict.tour.wildlife.map((item, index) => {
                  const Icon = wildlifeIcons[index % wildlifeIcons.length];
                  return (
                    <span
                      key={item}
                      className="inline-flex items-center gap-2 rounded-full bg-white/6 px-3 py-2 text-sm text-fog"
                    >
                      <Icon aria-hidden="true" size={15} />
                      {item}
                    </span>
                  );
                })}
              </dd>
            </div>
          </dl>
        </div>

        <div
          id="includes"
          className="anchor-offset grid border-t border-volcanic/15 lg:grid-cols-3"
        >
          {detailGroups.map(([title, items, Icon]) => (
            <section
              key={title}
              className="border-b border-volcanic/15 p-6 last:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0"
            >
              <Icon aria-hidden="true" className="mb-4 text-lantern" size={24} />
              <h3 className="text-xl font-bold text-soft">{title}</h3>
              <ul className="mt-5 space-y-3 text-fog">
                {items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-lantern" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </article>
    </section>
  );
}
