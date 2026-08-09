import type { Metadata } from "next";
import { Geist, Poppins, Rubik } from "next/font/google";
import "./globals.css";

// Corpo de texto — sans neutra e legível.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

// Títulos / marca — rounded geométrica, no clima dos flyers da Finesse.
const displayFont = Poppins({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

// Números (preços, quantidades, estoque) — sans levemente arredondada.
const numFont = Rubik({
  variable: "--font-num",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Finesse It Car Care",
  description:
    "Estética automotiva Finesse It Car Care — lavagens, polimentos, proteções e higienizações. Agende online ou pelo WhatsApp.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${displayFont.variable} ${numFont.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
