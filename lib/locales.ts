// Kept separate from lib/dictionaries.ts so client components and the proxy
// can import locale constants without pulling the translation files into their bundle.
export const locales = ["en", "cs"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const hasLocale = (locale: string): locale is Locale =>
  (locales as readonly string[]).includes(locale);

// Narrows the untyped `lang` route param; routes only receive known locales
// (the proxy redirects everything else), so the fallback is just for type safety.
export const toLocale = (value: string): Locale =>
  hasLocale(value) ? value : defaultLocale;
