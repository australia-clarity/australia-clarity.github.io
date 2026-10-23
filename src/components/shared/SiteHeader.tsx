"use client";

import type { Route } from "@/lib/navigation/hashRouter";
import { routeToHash } from "@/lib/navigation/hashRouter";
import { cn } from "@/lib/utils";

const NAV_ITEMS: Array<{ label: string; route: Route; match: Route["view"][] }> = [
  { label: "Home", route: { view: "home" }, match: ["home"] },
  { label: "Chapters", route: { view: "chapters" }, match: ["chapters", "chapter"] },
  { label: "Method", route: { view: "method" }, match: ["method"] },
  { label: "Data sources", route: { view: "sources" }, match: ["sources"] },
  { label: "Research status", route: { view: "status" }, match: ["status"] },
  { label: "About", route: { view: "about" }, match: ["about"] },
];

export function SiteHeader({ current }: { current: Route["view"] }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur supports-[backdrop-filter]:bg-surface/85">
      <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:py-2">
        <a
          href="#/"
          className="flex min-h-11 shrink-0 items-center rounded-md font-serif text-lg tracking-wide text-foreground"
          aria-label="Australia Clarity — home"
        >
          <svg viewBox="0 0 64 64" className="mr-2.5 h-7 w-7" aria-hidden="true" focusable="false">
            <rect width="64" height="64" rx="14" fill="#0F141A" />
            <g fill="none" strokeLinecap="round">
              <circle cx="32" cy="32" r="21" stroke="#2A3642" strokeWidth="2.5" />
              <path d="M32 51 A19 19 0 0 0 51 32" stroke="#7F93A6" strokeWidth="3" />
              <path d="M13 32 A19 19 0 0 1 32 13" stroke="#6FA3A8" strokeWidth="3" />
              <path d="M24 40 A11.3 11.3 0 0 1 24 24" stroke="#C8B38E" strokeWidth="3" />
            </g>
            <circle cx="32" cy="32" r="3.2" fill="#E8EEF3" />
          </svg>
          Australia&nbsp;Clarity
        </a>
        <nav
          aria-label="Primary"
          className="scroll-custom -mx-1 flex items-center gap-1 overflow-x-auto px-1 py-1 sm:overflow-visible"
        >
          {NAV_ITEMS.map((item) => {
            const active = item.match.includes(current);
            return (
              <a
                key={item.label}
                href={routeToHash(item.route)}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex min-h-11 shrink-0 items-center whitespace-nowrap rounded-md px-3 py-2 text-sm transition-colors",
                  active
                    ? "bg-panel text-sand"
                    : "text-muted-foreground hover:bg-panel/60 hover:text-foreground",
                )}
              >
                {item.label}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
