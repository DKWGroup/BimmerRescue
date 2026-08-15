import type { Metadata } from "next";
import { Inter, Orbitron } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BMW | Hello World - Ultimate Driving Machine",
  description: "Exclusive BMW M Performance Next.js Greeting Experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${orbitron.variable} h-full overflow-hidden antialiased`}>
      <body className="h-full w-full overflow-hidden bg-slate-950 text-slate-100 font-sans select-none">
        {children}
      </body>
    </html>
  );
}
