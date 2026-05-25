import type { Metadata } from "next";
import { Geist, Geist_Mono, Press_Start_2P } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const pressStart = Press_Start_2P({
  variable: "--font-pixel",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Michael Hayford — Software Engineer",
  description:
    "Michael Hayford is a Duke CS '26 student, incoming Goldman Sachs engineer, senior engineer at JonasRX, and founder of BeginnerCode. Portfolio of software, AI, and startup work.",
  keywords: [
    "Michael Hayford",
    "Software Engineer",
    "Duke University",
    "Goldman Sachs",
    "BeginnerCode",
    "JonasRX",
    "AI Engineer",
    "Portfolio",
  ],
  authors: [{ name: "Michael Hayford" }],
  openGraph: {
    title: "Michael Hayford — Software Engineer",
    description:
      "Duke CS '26 · Incoming Goldman Sachs SWE · Senior Engineer @ JonasRX · Founder @ BeginnerCode.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Michael Hayford — Software Engineer",
    description:
      "Duke CS '26 · Incoming Goldman Sachs SWE · Senior Engineer @ JonasRX · Founder @ BeginnerCode.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pressStart.variable} antialiased bg-grain`}
      >
        {children}
      </body>
    </html>
  );
}
