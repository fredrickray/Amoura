import type { Metadata } from "next";
import { Great_Vibes, Instrument_Serif, Manrope } from "next/font/google";
import { CustomCursor } from "@/components/CustomCursor";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

const instrument = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument",
  display: "swap",
});

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-great-vibes",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Amoura — Perfumes, Magazines & Lashes",
    template: "%s · Amoura",
  },
  description:
    "Amoura curates signature perfumes, customized magazines, and professional lash artistry — goods and services designed to delight.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${instrument.variable} ${greatVibes.variable}`}
    >
      <body
        className="min-h-screen bg-canvas antialiased"
        style={{ fontFamily: "var(--font-manrope), Helvetica Neue, Arial, sans-serif" }}
      >
        <CustomCursor />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
