import type { Metadata } from "next";
import "../globals.css";
import { Inter, Poppins } from "next/font/google";
import TopBar from "@/components/top-bar";
import { getDictionary } from "@/lib/dictionaries";
import { locales, toLocale } from "@/lib/locales";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const lang = toLocale((await params).lang);
  return {
    title: "modulBit",
    description: getDictionary(lang).metadata.description,
    icons: {
      icon: "/logo.png",
    },
  };
}

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"], // adjust as needed
  variable: "--font-poppins",
  display: "swap",
});

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}>) {
  const lang = toLocale((await params).lang);
  return (
    <html
      lang={lang}
      className={`${inter.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#181d24]">
        <TopBar lang={lang} />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
