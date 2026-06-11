import type { Metadata } from "next";
import "./globals.css";
import { Inter, Poppins } from "next/font/google";
import Link from "next/link";
import Footer from "@/components/footer";
import type { Locale } from "@/lib/locales";

// Routing-level 404 (experimental.globalNotFound): rendered when no route
// matches, outside the [lang] layout, so it must return a full <html>
// document and cannot receive a locale param. Both language variants are
// rendered; the inline script below sets <html lang> from the URL before
// first paint and CSS shows the matching one. English is the no-JS fallback.
const text: Record<Locale, {
  badge: string;
  title: string;
  titleHighlight: string;
  description: string;
  returnHome: string;
}> = {
  en: {
    badge: "Error 404",
    title: "Lost in the",
    titleHighlight: "digital void?",
    description: "The page you are looking for doesn't exist or has been moved to another dimension.",
    returnHome: "Return Home",
  },
  cs: {
    badge: "Chyba 404",
    title: "Ztraceni v",
    titleHighlight: "digitálním prázdnu?",
    description: "Stránka, kterou hledáte, neexistuje nebo se přesunula do jiné dimenze.",
    returnHome: "Zpět na úvod",
  },
};

export const metadata: Metadata = {
  title: "modulBit",
  icons: {
    icon: "/logo.png",
  },
};

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const NotFoundBody = ({ lang }: { lang: Locale }) => {
  const t = text[lang];

  return (
    <div className="bg-[#181d24] text-white selection:bg-accent/30 selection:text-white overflow-hidden min-h-screen flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center">
        <div className="inline-flex items-center px-3 py-1 rounded-full bg-accent/10 border border-accent/20 mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-accent">{t.badge}</span>
        </div>

        <h1 className="text-7xl md:text-9xl font-bold font-poppins mb-6 tracking-tight text-accent">
          404
        </h1>

        <h2 className="text-3xl md:text-4xl font-bold font-poppins mb-8">
          {t.title} <span className="text-white">{t.titleHighlight}</span>
        </h2>

        <p className="text-xl text-gray-400 font-inter mb-12 max-w-lg leading-relaxed">
          {t.description}
        </p>

        <Link
          href={`/${lang}`}
          className="px-8 py-3 bg-accent text-[#181d24] rounded-full font-bold transition-all hover:scale-105 hover:bg-accent/90 active:scale-95"
        >
          {t.returnHome}
        </Link>
      </div>

      <Footer lang={lang} />
    </div>
  );
};

export default function GlobalNotFound() {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html:
              'if(/^\\/cs(\\/|$)/.test(location.pathname))document.documentElement.lang="cs"',
          }}
        />
      </head>
      <body className="min-h-full bg-[#181d24]">
        <div className="hidden [html[lang=en]_&]:block">
          <NotFoundBody lang="en" />
        </div>
        <div className="hidden [html[lang=cs]_&]:block">
          <NotFoundBody lang="cs" />
        </div>
      </body>
    </html>
  );
}
