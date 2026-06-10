import { defaultLocale, type Locale } from "@/lib/locales";

// Inlined instead of using the dictionaries so the footer stays cheap to
// import from client components (error/not-found pages).
const rights: Record<Locale, string> = {
  en: "All rights reserved.",
  cs: "Všechna práva vyhrazena.",
};

export default function Footer({ lang = defaultLocale }: { lang?: Locale }) {
  return (
    <footer className="py-12 px-6 border-t border-white/5 text-center text-sm text-gray-500 font-inter">
      <p>© {new Date().getFullYear()} modulBit. {rights[lang]}</p>
    </footer>
  );
}
