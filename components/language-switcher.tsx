"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, type Locale } from "@/lib/locales";

const rememberLocale = (locale: Locale) => {
  document.cookie = `NEXT_LOCALE=${locale};path=/;max-age=31536000;samesite=lax`;
};

const LanguageSwitcher = ({ lang }: { lang: Locale }) => {
  const pathname = usePathname();

  const pathFor = (locale: Locale) => {
    const segments = pathname.split("/");
    segments[1] = locale;
    return segments.join("/");
  };

  return (
    <div className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider">
      {locales.map((locale, index) => (
        <span key={locale} className="flex items-center gap-1">
          {index > 0 && <span className="text-gray-600">/</span>}
          <Link
            href={pathFor(locale)}
            onClick={() => rememberLocale(locale)}
            aria-current={locale === lang ? "true" : undefined}
            className={
              locale === lang
                ? "text-accent"
                : "text-gray-400 transition-colors hover:text-accent"
            }
          >
            {locale.toUpperCase()}
          </Link>
        </span>
      ))}
    </div>
  );
};

export default LanguageSwitcher;
