import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/** Required for static export (`output: 'export'`). */
export const dynamic = "force-static";

/**
 * Sitemap for the public site.
 *
 * The site is a single static route ("/") — all sections are hash-addressed
 * within it, so only the root is listed. The base URL is the organisation's
 * intended GitHub Pages root; the site deploy itself is pending owner review
 * (see docs/PUBLIC_RELEASE_SECURITY_AUDIT.md — "Deployment not verified").
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteConfig.intendedSiteUrl}/`,
      lastModified: new Date(`${siteConfig.lastReviewedDate}T00:00:00Z`),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
