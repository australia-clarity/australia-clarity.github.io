import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

/** Required for static export (`output: 'export'`). */
export const dynamic = "force-static";

/**
 * robots.txt for the public site.
 *
 * Note: the intended GitHub Pages root is pre-configured here. The site
 * itself is deployed only after owner release review (see
 * docs/PUBLIC_RELEASE_SECURITY_AUDIT.md); robots.txt has no effect until
 * then.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
  };
}
