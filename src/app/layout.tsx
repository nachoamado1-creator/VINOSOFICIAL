import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Vinoteca Tandil · Cata de Vinos Experiencia · Tandil",
  description:
    "Sumergete en una experiencia sensorial única en Tandil. Nuestras cavas de vino más exquisitas te esperan en una velada inolvidable.",
  keywords: [
    "cata de vinos",
    "Tandil",
    "vinoteca",
    "experiencia premium",
    "Argentina",
    "sommelier",
  ],
  openGraph: {
    title: "Cata de Vinos Experiencia · Tandil",
    description:
      "Experiencia premium de cata de vinos en Tandil, Argentina. Solo 20 cupos disponibles.",
    type: "website",
    locale: "es_AR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-wine-dark text-text-main antialiased">
        {children}
      </body>
    </html>
  );
}
