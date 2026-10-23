"use client";

import type { ChapterModule } from "@/lib/research/types";
import { actionScopeLabel } from "@/lib/research/types";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Callout, SectionHeading } from "@/components/shared/Callout";
import { ChartPanel } from "@/components/charts/ChartPanel";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { crossCuttingLens, chapters } from "@/chapters/registry";
import { formatLongDate } from "@/lib/research/format";
import { ArrowLeft, ArrowRight, CalendarCheck, Database } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function ProvenanceTable({ chapter }: { chapter: ChapterModule }) {
  return (
    <div
      className="scroll-custom max-h-96 overflow-auto rounded-lg border border-border"
      role="region"
      aria-label="Data provenance records"
      tabIndex={0}
    >
      <Table>
        <caption className="sr-only">
          Data provenance records for {chapter.title}: dataset, source, reference period, access date and verification status.
        </caption>
        <TableHeader className="sticky top-0 z-10 bg-panel">
          <TableRow>
            <TableHead scope="col" className="min-w-40">Dataset</TableHead>
            <TableHead scope="col" className="min-w-56">Source</TableHead>
            <TableHead scope="col" className="min-w-36">Reference period</TableHead>
            <TableHead scope="col" className="min-w-28">Accessed</TableHead>
            <TableHead scope="col">Verification</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {chapter.provenance.map((record) => (
            <TableRow key={record.id}>
              <th scope="row" className="align-top px-4 py-3 text-left font-normal">
                <a
                  href={record.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-teal underline decoration-dotted underline-offset-2 hover:text-sand"
                >
                  {record.originalTitle}
                </a>
                <p className="mt-1 text-xs text-quiet">{record.issuingInstitution}</p>
              </th>
              <TableCell className="align-top text-muted-foreground">
                <span className="line-clamp-3">{record.unitDefinition}</span>
              </TableCell>
              <TableCell className="align-top text-muted-foreground">{record.referencePeriod}</TableCell>
              <TableCell className="align-top text-muted-foreground">
                {formatLongDate(record.accessDate)}
              </TableCell>
              <TableCell className="align-top">
                {record.verificationStatus === "verified-against-source" ? (
                  <span className="inline-flex items-center gap-1.5 text-teal">
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-teal" />
                    Verified against source
                  </span>
                ) : (
                  <span className="text-sand">Pending</span>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export function ChapterView({ chapter }: { chapter: ChapterModule }) {
  const published = chapter.status !== "planned";
  const chartsById = new Map((chapter.charts ?? []).map((chart) => [chart.id, chart]));

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 pb-16 sm:py-14">
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <a className="hover:text-sand" href="#/chapters">
          Chapters
        </a>
        <span aria-hidden="true" className="mx-2 text-quiet">/</span>
        <span aria-current="page" className="text-secondary-foreground">
          {String(chapter.number).padStart(2, "0")} · {chapter.title}
        </span>
      </nav>

      <header className="mt-6 space-y-5">
        <div className="flex flex-wrap items-center gap-3">
          <span className="font-serif text-sm text-quiet">
            Chapter {String(chapter.number).padStart(2, "0")} of 14
          </span>
          <StatusBadge status={chapter.status} />
        </div>
        <h1
          id="view-heading"
          tabIndex={-1}
          className="font-serif text-3xl leading-tight text-foreground sm:text-4xl"
        >
          {chapter.title}
        </h1>
        <p className="reading-measure text-lg leading-relaxed text-secondary-foreground">
          {chapter.summary}
        </p>
        {chapter.lastReviewed ? (
          <p className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-quiet">
            <span className="inline-flex items-center gap-1.5">
              <CalendarCheck aria-hidden="true" className="h-3.5 w-3.5" />
              Last reviewed {formatLongDate(chapter.lastReviewed)}
            </span>
            <span>Version {chapter.version}</span>
            {chapter.charts?.length ? (
              <span className="inline-flex items-center gap-1.5">
                <Database aria-hidden="true" className="h-3.5 w-3.5" />
                {chapter.charts.length} interactive datasets
              </span>
            ) : null}
          </p>
        ) : null}
      </header>

      <div className="reading-measure mt-10 space-y-4 text-secondary-foreground">
        {chapter.overview?.map((paragraph) => (
          <p key={paragraph.slice(0, 40)} className="leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      {published && chapter.observations?.length ? (
        <section aria-labelledby="observations-heading" className="mt-12">
          <SectionHeading eyebrow="Key observations" title="What the evidence shows" />
          <h2 id="observations-heading" className="sr-only">Key observations</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {chapter.observations.map((observation) => (
              <Card key={observation.label} className="h-full bg-surface">
                <CardHeader className="pb-2">
                  <CardDescription className="text-xs font-semibold uppercase tracking-wider text-teal">
                    {observation.label}
                  </CardDescription>
                  <CardTitle className="text-xl leading-snug">{observation.value}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">{observation.context}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ) : null}

      {chapter.sections?.length ? (
        <div className="mt-14 space-y-12">
          {chapter.sections.map((section) => {
            const chart = section.chartId ? chartsById.get(section.chartId) : undefined;
            return (
              <section key={section.id} aria-labelledby={`section-${section.id}`}>
                <h2 id={`section-${section.id}`} className="font-serif text-2xl text-foreground">
                  {section.heading}
                </h2>
                <div className="reading-measure mt-4 space-y-4 text-secondary-foreground">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph.slice(0, 40)} className="leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                  {section.listItems?.length ? (
                    <ul className="list-disc space-y-1.5 pl-5">
                      {section.listItems.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  ) : null}
                </div>
                {chart ? (
                  <div className="mt-6">
                    <ChartPanel chart={chart} />
                  </div>
                ) : null}
              </section>
            );
          })}
        </div>
      ) : null}

      {!published ? (
        <section aria-labelledby="planned-heading" className="mt-12 space-y-6">
          <Callout variant="note" title="Research has not yet started for this chapter">
            <p>
              This chapter is planned. The scope and open questions below
              describe what it will examine when research begins. Nothing here
              should be read as a finding.
            </p>
          </Callout>
          <h2 id="planned-heading" className="font-serif text-2xl text-foreground">
            What this chapter will examine
          </h2>
          <ul className="reading-measure list-disc space-y-2 pl-5 text-secondary-foreground">
            {chapter.scope.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <h3 className="pt-4 font-serif text-xl text-foreground">Open questions</h3>
          <ul className="reading-measure list-disc space-y-2 pl-5 text-secondary-foreground">
            {chapter.keyQuestions.map((question) => (
              <li key={question}>{question}</li>
            ))}
          </ul>
          <Callout variant="method" title={crossCuttingLens.title}>
            <p>{crossCuttingLens.intro}</p>
            <p className="text-quiet">{crossCuttingLens.caveat}</p>
          </Callout>
        </section>
      ) : null}

      {chapter.methodNotes?.length ? (
        <section aria-labelledby="method-notes-heading" className="mt-14">
          <SectionHeading
            eyebrow="Methodological care"
            title="Reading the numbers carefully"
          />
          <h2 id="method-notes-heading" className="sr-only">Methodological notes</h2>
          <div className="mt-6 space-y-4">
            {chapter.methodNotes.map((note) => (
              <Callout key={note.slice(0, 40)} variant="note" title="">
                <p className="!text-secondary-foreground">{note}</p>
              </Callout>
            ))}
          </div>
        </section>
      ) : null}

      {chapter.comparisons?.length ? (
        <section aria-labelledby="comparisons-heading" className="mt-14 space-y-6">
          <SectionHeading eyebrow="International comparison" title="In context" />
          <h2 id="comparisons-heading" className="sr-only">Comparisons</h2>
          {chapter.comparisons.map((comparison) => (
            <div key={comparison.heading} className="space-y-4">
              <h3 className="font-serif text-xl text-foreground">{comparison.heading}</h3>
              <div className="reading-measure space-y-3 text-secondary-foreground">
                {comparison.paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 40)} className="leading-relaxed">{paragraph}</p>
                ))}
              </div>
              {comparison.table?.length ? (
                <Table>
                  <caption className="sr-only">{comparison.tableCaption ?? comparison.heading}</caption>
                  <TableHeader>
                    <TableRow>
                      <TableHead scope="col">Country</TableHead>
                      {comparison.tableColumns?.map((column) => (
                        <TableHead key={column} scope="col">
                          {column}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {comparison.table.map((row) => (
                      <TableRow key={row.label}>
                        <th scope="row" className="px-4 py-2 text-left font-medium">{row.label}</th>
                        {row.columns.map((cell, index) => (
                          <TableCell key={index} className="tabular-nums">{cell}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : null}
            </div>
          ))}
        </section>
      ) : null}

      {chapter.actions?.length ? (
        <section aria-labelledby="actions-heading" className="mt-14">
          <SectionHeading
            eyebrow="From evidence to action"
            title="What you can do — voluntarily"
            description="Actions are evidence-linked suggestions at four scopes. They are voluntary, nonpartisan, and never a substitute for structural solutions — nor an instruction to vote or campaign any way."
          />
          <h2 id="actions-heading" className="sr-only">Actions</h2>
          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {chapter.actions.map((action) => (
              <Card key={action.title} className="h-full bg-surface">
                <CardHeader className="pb-3">
                  <CardDescription className="text-xs font-semibold uppercase tracking-wider text-sand">
                    {actionScopeLabel[action.scope]}
                  </CardDescription>
                  <CardTitle className="text-base leading-snug">{action.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm leading-relaxed">
                  <p>
                    <span className="font-medium text-foreground">What: </span>
                    <span className="text-muted-foreground">{action.what}</span>
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Why it may help: </span>
                    <span className="text-muted-foreground">{action.why}</span>
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Evidence: </span>
                    <span className="text-muted-foreground">{action.evidence}</span>
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Costs and effort: </span>
                    <span className="text-muted-foreground">{action.effort}</span>
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Limitations: </span>
                    <span className="text-muted-foreground">{action.limitations}</span>
                  </p>
                  <p>
                    <span className="font-medium text-foreground">Where to begin: </span>
                    <span className="text-muted-foreground">{action.startWhere}</span>
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      ) : null}

      {chapter.provenance.length ? (
        <section aria-labelledby="sources-heading" className="mt-14">
          <SectionHeading
            eyebrow="Data provenance"
            title="Sources for this chapter"
            description="Each dataset carries a full provenance record: issuing institution, exact publication, reference period, access date, definitions, transformations, licence, verification status and known limitations."
          />
          <h2 id="sources-heading" className="sr-only">Sources</h2>
          <div className="mt-6">
            <ProvenanceTable chapter={chapter} />
          </div>
        </section>
      ) : null}

      {chapter.corrections?.length ? (
        <section aria-labelledby="corrections-heading" className="mt-14">
          <SectionHeading eyebrow="Correction history" title="Changes and corrections" />
          <h2 id="corrections-heading" className="sr-only">Corrections</h2>
          <ul className="mt-6 space-y-3">
            {chapter.corrections.map((correction) => (
              <li key={correction.date} className="rounded-lg border border-border bg-surface p-4">
                <p className="text-sm font-medium text-foreground">
                  {formatLongDate(correction.date)} — {correction.summary}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{correction.detail}</p>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      <ChapterNav chapterId={chapter.id} />
    </div>
  );
}

function ChapterNav({ chapterId }: { chapterId: string }) {
  const index = chapters.findIndex((chapter) => chapter.id === chapterId);
  const previous = index > 0 ? chapters[index - 1] : undefined;
  const next = index < chapters.length - 1 ? chapters[index + 1] : undefined;

  return (
    <nav
      aria-label="Chapter navigation"
      className="mt-16 grid gap-3 border-t border-border pt-6 sm:grid-cols-2"
    >
      {previous ? (
        <a
          href={`#/chapters/${previous.id}`}
          className="group flex min-h-11 items-center gap-3 rounded-lg border border-border bg-surface p-4 text-sm hover:border-sand/50"
        >
          <ArrowLeft aria-hidden="true" className="h-4 w-4 shrink-0 text-quiet group-hover:text-sand" />
          <span>
            <span className="block text-xs text-quiet">
              Chapter {String(previous.number).padStart(2, "0")}
            </span>
            <span className="font-medium text-secondary-foreground">{previous.title}</span>
          </span>
        </a>
      ) : (
        <span aria-hidden="true" />
      )}
      {next ? (
        <a
          href={`#/chapters/${next.id}`}
          className="group flex min-h-11 items-center justify-end gap-3 rounded-lg border border-border bg-surface p-4 text-right text-sm hover:border-sand/50 sm:col-start-2"
        >
          <span>
            <span className="block text-xs text-quiet">
              Chapter {String(next.number).padStart(2, "0")}
            </span>
            <span className="font-medium text-secondary-foreground">{next.title}</span>
          </span>
          <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 text-quiet group-hover:text-sand" />
        </a>
      ) : null}
    </nav>
  );
}
