import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SupportPage } from "@/components/SupportPage";
import { isLocale, type Locale } from "@/lib/constants";
import { getDictionary } from "@/lib/dictionaries";
import { buildMetadata } from "@/lib/seo";

export const dynamicParams = false;

export function generateStaticParams() {
  return [{ locale: "en" }];
}

export function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  return params.then(({ locale }) =>
    locale === "en" ? buildMetadata("en", "cancellation") : {}
  );
}

export default async function CancellationPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam) || localeParam !== "en") notFound();
  const locale = localeParam as Locale;
  const dict = getDictionary(locale);

  return (
    <SupportPage
      locale={locale}
      dict={dict}
      page="cancellation"
      title={dict.pages.cancellation.title}
    >
      <ul className="space-y-3">
        {dict.pages.cancellation.items.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-lantern" />
            {item}
          </li>
        ))}
      </ul>
    </SupportPage>
  );
}
