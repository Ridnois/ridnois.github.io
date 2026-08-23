import type { Metadata } from "next";

import { PersonaPage } from "@/components/persona-page";
import { ARTIST_CONTENT } from "@/lib/persona-data";

export const metadata: Metadata = {
  title: `${ARTIST_CONTENT.role} — Ridnois`,
  description: ARTIST_CONTENT.tagline,
  alternates: { canonical: "/3d-artist" },
};

export default function ThreeDArtistPage() {
  return <PersonaPage {...ARTIST_CONTENT} />;
}
