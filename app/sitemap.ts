import type { MetadataRoute } from "next";
import { PAGE_PATHS, SITE_URL } from "@/lib/constants";

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGE_PATHS.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date("2026-05-25"),
    changeFrequency: path === "/en" || path === "/es" ? "weekly" : "monthly",
    priority: path === "/en" || path === "/es" ? 1 : 0.7
  }));
}
