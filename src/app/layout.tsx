import type { Metadata, Viewport } from "next";
import "./globals.css";
import { siteConfig } from "@/config/site";

/**
 * Metadata notes (Gate: honest deployment status):
 * - Canonical and og:url are intentionally omitted while
 *   `siteConfig.deploymentVerified === false`.
 * - The site is English (Australian) only; no language switcher exists.
 */
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.intendedSiteUrl),
  title: {
    default: `${siteConfig.name} — ${siteConfig.tagline}`,
    template: `%s — ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  keywords: [
    "Australia",
    "evidence",
    "research",
    "population",
    "society",
    "statistics",
    "international comparison",
    "nonpartisan",
  ],
  authors: [{ name: `${siteConfig.name} project` }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    siteName: siteConfig.name,
    locale: "en_AU",
    type: "website",
    images: [
      {
        url: "/og.png",
        width: 1344,
        height: 768,
        alt: "Australia Clarity — Understanding Australia Through Evidence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0f141a",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AU" suppressHydrationWarning>
      <body className="flex min-h-screen flex-col bg-background font-sans text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
