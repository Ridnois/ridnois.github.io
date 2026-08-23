import type { Metadata } from "next";

import { PersonaPage } from "@/components/persona-page";
import { HUMAN_CONTENT } from "@/lib/persona-data";

export const metadata: Metadata = {
  title: `${HUMAN_CONTENT.role} — Ridnois`,
  description: HUMAN_CONTENT.tagline,
  alternates: { canonical: "/human" },
};

export default function HumanPage() {
  return <PersonaPage {...HUMAN_CONTENT} />;
}
