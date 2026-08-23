import { OG_IMAGE_CONTENT_TYPE, OG_IMAGE_SIZE, renderPersonaOgImage } from "@/lib/og-image";
import { ARTIST_CONTENT } from "@/lib/persona-data";

export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default async function Image() {
  return renderPersonaOgImage({
    role: ARTIST_CONTENT.role,
    tagline: ARTIST_CONTENT.tagline,
    accent: ARTIST_CONTENT.color,
  });
}
