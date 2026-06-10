import en from "@/dictionaries/en";
import cs from "@/dictionaries/cs";
import type { Locale } from "@/lib/locales";

export type Dictionary = typeof en;

const dictionaries: Record<Locale, Dictionary> = { en, cs };

export const getDictionary = (locale: Locale): Dictionary => dictionaries[locale];
