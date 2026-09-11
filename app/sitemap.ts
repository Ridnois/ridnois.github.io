import type { MetadataRoute } from "next";

import { PROFILE } from "@/lib/resume-data";

const ROUTES = ["", "/dev", "/3d-artist", "/human", "/resume"];

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map((route) => ({
    url: `${PROFILE.siteUrl}${route}`,
    lastModified,
  }));
}
