import type { MetadataRoute } from "next";

import { PROFILE } from "@/lib/resume-data";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${PROFILE.siteUrl}/sitemap.xml`,
  };
}
