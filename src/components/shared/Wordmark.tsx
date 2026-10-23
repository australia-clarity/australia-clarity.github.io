import { siteConfig } from "@/config/site";

/**
 * Typography-first wordmark with a restrained abstract symbol.
 * The mark is a generic "clarity lens" — concentric arcs converging to a
 * focal point. It deliberately avoids flags, seals, government or party
 * imagery. An informal similarity review found no obvious conflict; this is
 * not a trademark clearance.
 */
export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg
        viewBox="0 0 64 64"
        className={compact ? "h-6 w-6" : "h-8 w-8"}
        aria-hidden="true"
        focusable="false"
      >
        <rect width="64" height="64" rx="14" fill="#0F141A" />
        <g fill="none" strokeLinecap="round">
          <circle cx="32" cy="32" r="21" stroke="#2A3642" strokeWidth="2.5" />
          <path d="M32 51 A19 19 0 0 0 51 32" stroke="#7F93A6" strokeWidth="3" />
          <path d="M13 32 A19 19 0 0 1 32 13" stroke="#6FA3A8" strokeWidth="3" />
          <path d="M24 40 A11.3 11.3 0 0 1 24 24" stroke="#C8B38E" strokeWidth="3" />
        </g>
        <circle cx="32" cy="32" r="3.2" fill="#E8EEF3" />
      </svg>
      <span
        className={`font-serif tracking-wide text-foreground ${
          compact ? "text-base" : "text-lg"
        }`}
      >
        Australia&nbsp;Clarity
      </span>
    </span>
  );
}

export function SiteWordmarkLink() {
  return (
    <a
      href="#/"
      className="flex min-h-11 items-center rounded-md focus-visible:outline-2 focus-visible:outline-offset-4"
      aria-label={`${siteConfig.name} — home`}
    >
      <Wordmark />
    </a>
  );
}
