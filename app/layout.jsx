import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/config";

const serif = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});
const sans = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata = {
  title: `${SITE.name} | ${SITE.tagline}`,
  description: SITE.description,
};

export const viewport = {
  themeColor: "#FBEAEE",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={`${serif.variable} ${sans.variable}`}>
      <body>{children}</body>
    </html>
  );
}
