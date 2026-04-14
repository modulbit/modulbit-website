import "./globals.css";
import { Inter, Poppins } from "next/font/google";
import TopBar from "@/components/top-bar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"], // adjust as needed
  variable: "--font-poppins",
  display: "swap",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#181d24]">
        <TopBar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
