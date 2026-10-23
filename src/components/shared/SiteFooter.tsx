import { siteConfig } from "@/config/site";
import { formatLongDate } from "@/lib/research/format";

/**
 * Site footer. The root layout's body is a min-h-screen flex column, so this
 * footer sticks to the bottom on short pages and is pushed down naturally by
 * long content. The bottom padding respects mobile safe areas.
 */
export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-surface">
      <div className="mx-auto max-w-6xl px-4 py-10 pb-[calc(2.5rem+env(safe-area-inset-bottom))]">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-3">
            <p className="font-serif text-lg text-foreground">Australia Clarity</p>
            <p className="text-sm text-muted-foreground">{siteConfig.tagline}.</p>
            <p className="text-sm text-quiet">
              An independent, non-commercial, nonpartisan, evidence-based
              educational project.
            </p>
          </div>
          <nav aria-label="Footer" className="space-y-2 text-sm">
            <p className="font-medium text-secondary-foreground">Sections</p>
            <ul className="space-y-2">
              <li><a className="text-muted-foreground hover:text-sand" href="#/chapters">Research chapters</a></li>
              <li><a className="text-muted-foreground hover:text-sand" href="#/method">Method &amp; standards</a></li>
              <li><a className="text-muted-foreground hover:text-sand" href="#/sources">Data sources</a></li>
              <li><a className="text-muted-foreground hover:text-sand" href="#/status">Research status &amp; corrections</a></li>
              <li><a className="text-muted-foreground hover:text-sand" href="#/about">About &amp; disclaimer</a></li>
            </ul>
          </nav>
          <div className="space-y-3 text-sm">
            <p className="font-medium text-secondary-foreground">Project</p>
            <p className="text-muted-foreground">
              Source code and issue tracking on GitHub:
              <br />
              <a
                className="text-teal underline decoration-dotted underline-offset-2 hover:text-sand"
                href={siteConfig.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                australia-clarity/australia-clarity.github.io
              </a>
            </p>
            <p className="text-muted-foreground">
              No advertisements, donations, memberships, sign-ups or trackers.
            </p>
            <p className="text-quiet">Last reviewed: {formatLongDate(siteConfig.lastReviewedDate)}</p>
          </div>
        </div>
        <div className="mt-8 space-y-2 border-t border-border pt-6 text-xs text-quiet">
          <p>
            This is an independent, non-commercial, nonpartisan, evidence-based
            educational project. It is not affiliated with, sponsored by, or
            endorsed by any government department, political party, advocacy
            group, academic institution or other organisation referenced here.
          </p>
          <p>
            © {new Date().getFullYear()} Australia Clarity project. Original
            text licensed CC BY 4.0 where applicable; cited datasets remain the
            property of their issuing institutions under their respective
            licences.
          </p>
        </div>
      </div>
    </footer>
  );
}
