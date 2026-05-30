import { en } from "@/lib/dictionaries/en";
import { es } from "@/lib/dictionaries/es";
import type { Locale } from "@/lib/constants";

export const dictionaries = { en, es };

export type Dictionary = (typeof dictionaries)[Locale];

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
