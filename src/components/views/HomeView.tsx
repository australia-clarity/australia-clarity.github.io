"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChapterCard } from "@/components/shared/ChapterCard";
import { Callout, SectionHeading } from "@/components/shared/Callout";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { chapters, crossCuttingLens } from "@/chapters/registry";
import { siteConfig } from "@/config/site";
import { formatLongDate } from "@/lib/research/format";
import {
  Eye,
  GitCompareArrows,
  Microscope,
  ClipboardCheck,
  Scale,
  Compass,
} from "lucide-react";

const METHOD_STEPS = [
  {
    icon: Eye,
    name: "Observe",
    description: "Look at what the evidence actually says before forming any view.",
  },
  {
    icon: ClipboardCheck,
    name: "Verify",
    description: "Check figures against the original, authoritative publications.",
  },
  {
    icon: GitCompareArrows,
    name: "Compare",
    description: "Match definitions, years and coverage when comparing countries.",
  },
  {
    icon: Microscope,
    name: "Investigate",
    description: "Explore competing explanations in proportion to the evidence.",
  },
  {
    icon: Scale,
    name: "Evaluate",
    description: "Weigh possible interventions against established outcomes.",
  },
  {
    icon: Compass,
    name: "Act",
    description: "Offer voluntary, evidence-linked actions at four levels of scope.",
  },
];

export function HomeView() {
  const published = chapters.filter((c) => c.status !== "planned");
  const planned = chapters.filter((c) => c.status === "planned");

  return (
    <div className="space-y-16 pb-16 sm:space-y-24">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border bg-surface">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(42rem 22rem at 18% -8%, rgba(111,163,168,0.13), transparent 65%), radial-gradient(36rem 20rem at 95% 12%, rgba(200,179,142,0.07), transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-6xl px-4 py-14 sm:py-20">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-teal">
            Independent · Non-commercial · Nonpartisan
          </p>
          <h1
            id="view-heading"
            tabIndex={-1}
            className="mt-4 max-w-3xl font-serif text-4xl leading-[1.08] text-foreground sm:text-5xl"
          >
            Understanding Australia through evidence
          </h1>
          <p className="reading-measure mt-6 text-lg leading-relaxed text-secondary-foreground">
            {siteConfig.description} Like a physician&rsquo;s examination, we observe
            the evidence first, compare appropriate baselines, and keep possible
            responses distinct from established outcomes — because a country and
            its people are never themselves a diagnosis.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg" className="min-h-11">
              <a href="#/chapters">Explore the research</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="min-h-11">
              <a href="#/method">How we work</a>
            </Button>
          </div>
          <p className="mt-6 text-sm text-quiet">
            First release · {formatLongDate(siteConfig.publishedDate)} · Chapter 01 of 14 ·
            all figures verified against cited official sources
          </p>
        </div>
      </section>

      {/* Method strip */}
      <section aria-labelledby="method-heading" className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="The examination approach"
          title="Observe before diagnosing"
          description="Six disciplines shape every chapter. They exist so that the research can be checked, not just read."
        />
        <h2 id="method-heading" className="sr-only">Research method</h2>
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {METHOD_STEPS.map((step) => (
            <li key={step.name}>
              <Card className="h-full">
                <CardHeader className="flex-row items-center gap-3 space-y-0 pb-2">
                  <step.icon aria-hidden="true" className="h-5 w-5 shrink-0 text-teal" />
                  <CardTitle className="text-base">{step.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="leading-relaxed">{step.description}</CardDescription>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </section>

      {/* Research status strip */}
      <section aria-labelledby="status-heading" className="mx-auto max-w-6xl px-4">
        <div className="rounded-lg border border-border bg-surface p-4 sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="mt-0.5">
                <StatusBadge status="initial-release" />
              </div>
              <div>
                <h2 id="status-heading" className="text-base font-semibold text-foreground">
                  1 of 14 chapters published
                </h2>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  Chapter 01 — Population &amp; Family — is published with every
                  figure verified against the cited ABS and World Bank
                  publications. The other thirteen chapters state their scope
                  honestly as planned work, not as findings.
                </p>
              </div>
            </div>
            <Button asChild variant="outline" className="min-h-11 shrink-0">
              <a href="#/status">Research status</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Chapters */}
      <section aria-labelledby="chapters-heading" className="mx-auto max-w-6xl px-4">
        <SectionHeading
          eyebrow="Fourteen research chapters"
          title="The research programme"
          description="Each chapter owns its data, sources and corrections. Chapter status is always shown honestly."
        />
        <h2 id="chapters-heading" className="sr-only">All chapters</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {chapters.map((chapter) => (
            <ChapterCard key={chapter.id} chapter={chapter} />
          ))}
        </div>
        <p className="mt-4 text-sm text-quiet">
          {published.length} chapter{published.length === 1 ? "" : "s"} published ·{" "}
          {planned.length} planned
        </p>
      </section>

      {/* Cross-cutting lens */}
      <section aria-labelledby="lens-heading" className="mx-auto max-w-6xl px-4">
        <Callout variant="method" title={crossCuttingLens.title}>
          <p>{crossCuttingLens.intro}</p>
          <ul className="list-disc space-y-1.5 pl-5">
            {crossCuttingLens.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="text-quiet">{crossCuttingLens.caveat}</p>
        </Callout>
      </section>

      {/* Independence */}
      <section aria-labelledby="independence-heading" className="mx-auto max-w-6xl px-4">
        <Callout variant="note" title="An independent project">
          <p>
            Australia Clarity is not affiliated with, sponsored by, or endorsed
            by any government department, political party, advocacy group,
            academic institution or other organisation referenced here. There
            are no advertisements, donations, memberships or trackers on this
            site.
          </p>
          <p>
            <a className="text-teal underline decoration-dotted underline-offset-2 hover:text-sand" href="#/about">
              Read the full disclaimer and principles
            </a>
          </p>
        </Callout>
      </section>
    </div>
  );
}
