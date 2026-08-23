import type { Metadata } from "next";

import { PersonaPage } from "@/components/persona-page";
import { DEV_CONTENT } from "@/lib/persona-data";

export const metadata: Metadata = {
  title: `${DEV_CONTENT.role} — Ridnois`,
  description: DEV_CONTENT.tagline,
  alternates: { canonical: "/dev" },
};

export default function DevPage() {
  return <PersonaPage {...DEV_CONTENT} />;
}
