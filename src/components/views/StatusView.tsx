"use client";

import { SectionHeading, Callout } from "@/components/shared/Callout";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { chapters } from "@/chapters/registry";
import { formatLongDate } from "@/lib/research/format";
import { siteConfig } from "@/config/site";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function StatusView() {
  return (
    <div className="mx-auto max-w-6xl space-y-14 px-4 py-10 pb-16 sm:py-14">
      <SectionHeading
        as="h1"
        eyebrow="Research status"
        title="What is done, and what is not"
        description="Honest status for every chapter, the project's verification transparency, and the corrections policy. Nothing is described as verified or complete without evidence."
      />

      <section aria-labelledby="chapter-status-heading" className="space-y-5">
        <h2 id="chapter-status-heading" className="font-serif text-2xl text-foreground">
          Chapter status
        </h2>
        <div className="scroll-custom overflow-x-auto rounded-lg border border-border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead scope="col">#</TableHead>
                <TableHead scope="col" className="min-w-44">Chapter</TableHead>
                <TableHead scope="col" className="min-w-40">Status</TableHead>
                <TableHead scope="col" className="min-w-28">Last reviewed</TableHead>
                <TableHead scope="col">Datasets</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {chapters.map((chapter) => (
                <TableRow key={chapter.id}>
                  <TableCell className="font-mono text-xs text-quiet">
                    {String(chapter.number).padStart(2, "0")}
                  </TableCell>
                  <TableCell>
                    <a className="font-medium hover:text-sand" href={`#/chapters/${chapter.id}`}>
                      {chapter.title}
                    </a>
                  </TableCell>
                  <TableCell>
                    <StatusBadge status={chapter.status} />
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {chapter.lastReviewed ? formatLongDate(chapter.lastReviewed) : "—"}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {chapter.charts?.length ?? 0} charts · {chapter.provenance.length} provenance records
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>

      <section aria-labelledby="verification-heading" className="space-y-5">
        <h2 id="verification-heading" className="font-serif text-2xl text-foreground">
          Verification transparency
        </h2>
        <div className="grid gap-4 lg:grid-cols-2">
          <Callout variant="method" title="What has been verified">
            <ul className="list-disc space-y-1.5 pl-5">
              <li>All Chapter 01 headline figures quoted from the cited ABS or World Bank publications on the access dates recorded in the provenance register</li>
              <li>Chart series extracted directly from ABS time-series spreadsheets and the World Bank API, with extraction scripts retained</li>
              <li>Accessibility of chart/table alternatives and interactive chart↔table toggling in the development preview</li>
            </ul>
          </Callout>
          <Callout variant="caution" title="What has not been verified">
            <ul className="list-disc space-y-1.5 pl-5">
              <li>OECD-sourced fertility comparison (the OECD's former national dataflow was retired; World Bank/UN series used instead, clearly labelled)</li>
              <li>Any claim about deployment status of this site beyond the development preview</li>
              <li>Spot-checking a few metrics is not validation of every chart, year or claim — the provenance register defines the exact verification boundary</li>
            </ul>
          </Callout>
        </div>
      </section>

      <section aria-labelledby="corrections-policy-heading" className="space-y-5">
        <h2 id="corrections-policy-heading" className="font-serif text-2xl text-foreground">
          Corrections policy
        </h2>
        <div className="reading-measure space-y-4 text-secondary-foreground">
          <p>
            Errors of fact, citation or transcription are corrected as soon as
            they are confirmed, and every substantive change is logged in the
            affected chapter&rsquo;s correction history with its date and
            reason. When a source revises its data (as the ABS regularly
            does), the chapter is updated with the new reference period and
            the change is noted.
          </p>
          <p>
            Dataset versions are retained so that earlier analyses remain
            reproducible. Suggestions can be raised through the project&rsquo;s
            public GitHub repository.
          </p>
        </div>
      </section>

      <section aria-labelledby="changelog-heading" className="space-y-5">
        <h2 id="changelog-heading" className="font-serif text-2xl text-foreground">
          Change log
        </h2>
        <ol className="space-y-4 border-l-2 border-border pl-5">
          <li className="relative">
            <span aria-hidden="true" className="absolute -left-[1.5625rem] top-1.5 h-2.5 w-2.5 rounded-full bg-teal" />
            <p className="text-sm font-medium text-foreground">
              {formatLongDate(siteConfig.publishedDate)} — Initial release (version {siteConfig.version})
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Site foundation: method, sources register, corrections policy,
              all fourteen chapter slots with honest status, and Chapter 01
              (Population &amp; Family) with verified data and interactive
              charts.
            </p>
          </li>
        </ol>
      </section>
    </div>
  );
}
