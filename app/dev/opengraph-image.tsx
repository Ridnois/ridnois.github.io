import { OG_IMAGE_CONTENT_TYPE, OG_IMAGE_SIZE, renderPersonaOgImage } from "@/lib/og-image";
import { DEV_CONTENT } from "@/lib/persona-data";

export const size = OG_IMAGE_SIZE;
export const contentType = OG_IMAGE_CONTENT_TYPE;

export default async function Image() {
  return renderPersonaOgImage({
    role: DEV_CONTENT.role,
    tagline: DEV_CONTENT.tagline,
    accent: DEV_CONTENT.color,
  });
}
