import type { ChapterModule } from "@/lib/research/types";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { formatLongDate } from "@/lib/research/format";
import { siteConfig } from "@/config/site";

/** Chapter entry card used on the home page and chapters index. */
export function ChapterCard({ chapter }: { chapter: ChapterModule }) {
  const published = chapter.status !== "planned";
  return (
    <Card className="group flex h-full flex-col transition-colors hover:border-sand/50">
      <CardHeader className="space-y-3 pb-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-serif text-sm text-quiet">
            {String(chapter.number).padStart(2, "0")}
          </span>
          <StatusBadge status={chapter.status} />
        </div>
        <CardTitle className="text-lg leading-snug">
          <a
            href={`#/chapters/${chapter.id}`}
            className="focus-visible:outline-2 focus-visible:outline-offset-4"
          >
            {chapter.title}
          </a>
        </CardTitle>
        <CardDescription className="leading-relaxed">{chapter.summary}</CardDescription>
      </CardHeader>
      <CardContent className="mt-auto pt-0">
        <div className="flex items-center justify-between gap-3 border-t border-border/70 pt-3 text-xs text-quiet">
          <span>
            {published
              ? `Reviewed ${formatLongDate(chapter.lastReviewed ?? siteConfig.publishedDate)} · ${chapter.charts?.length ?? 0} datasets`
              : "Research not yet started"}
          </span>
          <a
            href={`#/chapters/${chapter.id}`}
            className="inline-flex min-h-11 items-center gap-1 font-medium text-teal hover:text-sand"
          >
            {published ? "Read chapter" : "View scope"}
            <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
