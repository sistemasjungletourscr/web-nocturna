import type { MetadataRoute } from "next";
import { ROUTES, SITE_URL } from "@/lib/constants";

const lastModified = new Date("2026-06-02");

const indexablePages = [
  { path: ROUTES.en.home, changeFrequency: "weekly", priority: 1 },
  { path: ROUTES.es.home, changeFrequency: "weekly", priority: 1 },
  { path: ROUTES.en.faq, changeFrequency: "monthly", priority: 0.8 },
  { path: ROUTES.es.faq, changeFrequency: "monthly", priority: 0.8 },
  { path: ROUTES.en.about, changeFrequency: "monthly", priority: 0.8 },
  { path: ROUTES.es.about, changeFrequency: "monthly", priority: 0.8 },
  { path: ROUTES.en.terms, changeFrequency: "yearly", priority: 0.3 },
  { path: ROUTES.es.terms, changeFrequency: "yearly", priority: 0.3 },
  { path: ROUTES.en.cancellation, changeFrequency: "yearly", priority: 0.3 },
  { path: ROUTES.es.cancellation, changeFrequency: "yearly", priority: 0.3 }
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return indexablePages.map((page) => ({
    url: `${SITE_URL}${page.path}`,
    lastModified,
    changeFrequency: page.changeFrequency,
    priority: page.priority
  }));
}
