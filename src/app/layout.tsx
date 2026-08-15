import type { Metadata } from "next";
import { Montserrat, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BimmerRescue Silesia - Mobilny Serwis BMW Premium",
  description:
    "Serwis BMW bez kolejki. Profesjonalna diagnostyka OEM, kodowanie funkcji ukrytych i instalacja bezprzewodowego CarPlay pod Twoim domem lub biurem na terenie Śląska.",
  keywords: [
    "serwis BMW Śląsk",
    "mobilny serwis BMW Katowice",
    "kodowanie BMW Gliwice",
    "CarPlay BMW Zabrze",
    "diagnostyka ISTA BMW Śląsk",
    "BimmerRescue Silesia",
  ],
  authors: [{ name: "BimmerRescue Silesia" }],
  openGraph: {
    title: "BimmerRescue Silesia - Mobilny Serwis BMW Premium",
    description:
      "Serwis BMW bez kolejki. My przyjeżdżamy do Ciebie. Diagnostyka, kodowanie i CarPlay na terenie Śląska.",
    url: "https://bimmerrescue.pl",
    siteName: "BimmerRescue Silesia",
    locale: "pl_PL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`${montserrat.variable} ${inter.variable} ${jetbrainsMono.variable} scroll-smooth dark`}
    >
      <body className="min-h-screen bg-[#0c0f0f] text-[#e2e2e2] font-sans antialiased selection:bg-[#e00000] selection:text-white">
        {children}
      </body>
    </html>
  );
}
