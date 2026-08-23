import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";

import { Header } from "@/components/header";
import { PersonJsonLd } from "@/components/person-jsonld";
import { PROFILE } from "@/lib/resume-data";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["500", "600"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["600"],
});

const title = `${PROFILE.name} — ${PROFILE.role}`;
const description = `${PROFILE.role} specializing in TypeScript, React/Next.js, and Web3 — resume and portfolio. Open to work.`;

export const metadata: Metadata = {
  metadataBase: new URL(PROFILE.siteUrl),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: {
    title,
    description,
    url: PROFILE.siteUrl,
    siteName: PROFILE.brand,
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <PersonJsonLd />
        <Header />
        {children}
      </body>
    </html>
  );
}
