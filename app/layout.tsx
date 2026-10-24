import type { Metadata } from "next";
import { Fraunces, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { PersonJsonLd } from "@/components/person-jsonld";
import { ThemeProvider } from "@/components/theme-provider";
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
  weight: ["400", "500", "600"],
});

const title = `${PROFILE.name} — ${PROFILE.role}`;
const description = `${PROFILE.role} in Santiago, Chile: front-end architecture, API building and system design. Next.js for Disney, UNICEF, LATAM and British Airways; on-chain payment infrastructure. Open to work.`;

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
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <PersonJsonLd />
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
