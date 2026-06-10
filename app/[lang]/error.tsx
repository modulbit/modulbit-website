'use client';

import { useEffect } from 'react';
import Link from "next/link";
import { usePathname } from "next/navigation";
import Footer from "@/components/footer";
import { defaultLocale, hasLocale, type Locale } from "@/lib/locales";

// Inlined instead of using the dictionaries so this client page doesn't pull
// the full translation files into its bundle.
const text: Record<Locale, {
  badge: string;
  title: string;
  titleAccent: string;
  description: string;
  tryAgain: string;
  returnHome: string;
}> = {
  en: {
    badge: "System Error",
    title: "Something went",
    titleAccent: "wrong",
    description: "We encountered an unexpected glitch in the matrix. Our team has been notified.",
    tryAgain: "Try Again",
    returnHome: "Return Home",
  },
  cs: {
    badge: "Systémová chyba",
    title: "Něco se",
    titleAccent: "pokazilo",
    description: "Narazili jsme na neočekávanou chybu. Náš tým o ní ví.",
    tryAgain: "Zkusit znovu",
    returnHome: "Zpět na úvod",
  },
};

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const pathname = usePathname();
  const maybeLocale = pathname.split("/")[1];
  const lang: Locale = hasLocale(maybeLocale) ? maybeLocale : defaultLocale;
  const t = text[lang];

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="bg-[#181d24] text-white selection:bg-accent/30 selection:text-white overflow-hidden min-h-[calc(100vh-73px)] flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-red-500">{t.badge}</span>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold font-poppins mb-6 tracking-tight text-white">
          {t.title} <span className="text-accent">{t.titleAccent}</span>
        </h1>

        <p className="text-xl text-gray-400 font-inter mb-12 max-w-lg leading-relaxed">
          {t.description}
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => reset()}
            className="px-8 py-3 bg-accent text-[#181d24] rounded-full font-bold transition-all hover:scale-105 hover:bg-accent/90 cursor-pointer active:scale-95"
          >
            {t.tryAgain}
          </button>

          <Link
            href={`/${lang}`}
            className="px-8 py-3 border border-white/20 rounded-full font-bold transition-all hover:bg-white/5 hover:border-accent/40 active:scale-95 text-center"
          >
            {t.returnHome}
          </Link>
        </div>
      </div>

      <Footer lang={lang} />
    </div>
  );
}
