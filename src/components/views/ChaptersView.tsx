"use client";

import { ChapterCard } from "@/components/shared/ChapterCard";
import { SectionHeading } from "@/components/shared/Callout";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { chapters } from "@/chapters/registry";

export function ChaptersView() {
  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-10 sm:py-14">
      <SectionHeading
        as="h1"
        eyebrow="Research chapters"
        title="Fourteen chapters, honest status"
        description="Each chapter examines one area of Australian society with its own datasets, sources, methods and correction history. A chapter is only marked as having findings when its figures have been verified against the cited publications."
      />
      <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
        <span className="text-quiet">Legend:</span>
        <StatusBadge status="initial-release" />
        <StatusBadge status="in-progress" />
        <StatusBadge status="planned" />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {chapters.map((chapter) => (
          <ChapterCard key={chapter.id} chapter={chapter} />
        ))}
      </div>
    </div>
  );
}
