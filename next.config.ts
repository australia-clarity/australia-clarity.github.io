import type { NextConfig } from "next";

/**
 * Australia Clarity — dual-mode Next.js configuration.
 *
 * Mode A (development preview): `next dev` — no `output` override.
 * Mode B (GitHub Pages static export): `DEPLOY_TARGET=github-pages next build`
 *   — produces a fully static `out/` directory for GitHub Actions deployment.
 *
 * The site is a static, client-rendered experience (no SSR data, no server
 * actions, no API routes, no middleware, no ISR, no authentication), so the
 * identical code works in both modes.
 */
const isGitHubPages = process.env.DEPLOY_TARGET === "github-pages";

const nextConfig: NextConfig = {
  ...(isGitHubPages ? { output: "export" as const } : {}),
  images: { unoptimized: true },
  trailingSlash: true,
  reactStrictMode: true,
};

export default nextConfig;
