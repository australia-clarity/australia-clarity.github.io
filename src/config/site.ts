/**
 * Australia Clarity — single typed source of identity and URL truth.
 *
 * IMPORTANT: the production canonical URL below is the *intended* root for
 * the organisation's GitHub Pages site. GitHub Pages has been verified as
 * enabled for the repository (it currently serves the default README render),
 * but the built site itself has NOT yet been deployed. Until a real deployment
 * is observed, `deploymentVerified` stays `false` and page metadata therefore
 * omits canonical/og:url fields. The optional domain `australia-clarity.com`
 * is NOT owned and must never appear in metadata, CNAME or DNS.
 */
export const siteConfig = {
  name: "Australia Clarity",
  tagline: "Understanding Australia Through Evidence",
  description:
    "An independent, non-commercial, nonpartisan platform examining Australia's societal strengths, challenges, uncertainties and potential improvements through transparent evidence and carefully matched international comparison.",
  language: "en-AU",
  organisation: "australia-clarity",
  repositoryUrl: "https://github.com/australia-clarity/australia-clarity.github.io",
  intendedSiteUrl: "https://australia-clarity.github.io",
  /** Set to true only after a real deployment has been observed live. */
  deploymentVerified: false,
  /** Publication date of this build's content. */
  publishedDate: "2026-10-23",
  lastReviewedDate: "2026-10-23",
  version: "0.1.0",
  licence:
    "Creative Commons Attribution 4.0 International (CC BY 4.0) for original text; cited datasets remain under their respective source licences.",
} as const;

export type SiteConfig = typeof siteConfig;
