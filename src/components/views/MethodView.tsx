"use client";

import { SectionHeading, Callout } from "@/components/shared/Callout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatLongDate } from "@/lib/research/format";
import { siteConfig } from "@/config/site";
import {
  Eye,
  ClipboardCheck,
  GitCompareArrows,
  Microscope,
  Scale,
  Compass,
  ShieldCheck,
} from "lucide-react";

const METHOD_DETAIL = [
  {
    icon: Eye,
    name: "Observe",
    body: "Describe achievements and problem areas with equivalent rigour. We never preselect a narrative, and we distinguish observations from opinions, forecasts and causal claims.",
  },
  {
    icon: ClipboardCheck,
    name: "Verify",
    body: "Every published figure is checked against the original authoritative publication, with the exact dataset, definition, reference period and access date recorded in a provenance register. A successful download is not verification.",
  },
  {
    icon: GitCompareArrows,
    name: "Compare",
    body: "International comparisons select comparator countries per indicator, not per narrative. We match definitions, years, purchasing power, age ranges and geographic coverage, and explain residual differences. We avoid unsupported aggregate country scores and league tables.",
  },
  {
    icon: Microscope,
    name: "Investigate",
    body: "Competing credible explanations are explored in proportion to the evidence, without false balance. Where the evidence does not settle a question, we say so.",
  },
  {
    icon: Scale,
    name: "Evaluate",
    body: "Possible interventions are kept distinct from established outcomes. Policy discussions present verifiable objectives, measured outcomes, independent assessments, trade-offs and differing documented interpretations — with no party or candidate endorsements, election advice or political scores.",
  },
  {
    icon: Compass,
    name: "Act",
    body: "Each chapter ends with voluntary, evidence-linked actions at four scopes — individual, community, professional and institutional/public participation — including what to do, why it may help, the evidence, effort, limitations and where to begin. Personal responsibility never substitutes for structural solutions.",
  },
];

export function MethodView() {
  return (
    <div className="mx-auto max-w-6xl space-y-14 px-4 py-10 pb-16 sm:py-14">
      <SectionHeading
        as="h1"
        eyebrow="Method & standards"
        title="How this research works"
        description="Australia Clarity follows a single research discipline: Observe → Verify → Compare → Investigate → Evaluate → Act. The method exists so that you can check the work, not just read it."
      />

      <section aria-labelledby="steps-heading" className="space-y-6">
        <h2 id="steps-heading" className="font-serif text-2xl text-foreground">The six disciplines</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {METHOD_DETAIL.map((step) => (
            <Card key={step.name} className="h-full">
              <CardHeader className="flex-row items-center gap-3 space-y-0 pb-2">
                <step.icon aria-hidden="true" className="h-5 w-5 shrink-0 text-teal" />
                <CardTitle className="text-base">{step.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="leading-relaxed">{step.body}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section aria-labelledby="neutrality-heading" className="space-y-5">
        <h2 id="neutrality-heading" className="font-serif text-2xl text-foreground">
          Neutrality standards
        </h2>
        <div className="space-y-4">
          <Callout variant="method" title="Strictly nonpartisan">
            <p>
              This project does not endorse political parties, candidates,
              electoral choices or lobbying campaigns, and never converts
              evidence into political scorecards. Political institutions and
              policy outcomes are described factually, with evidence and
              divergent attributed interpretations.
            </p>
          </Callout>
          <Callout variant="note" title="What we never do">
            <ul className="list-disc space-y-1.5 pl-5">
              <li>Invent statistics, citations, quotes or research completion</li>
              <li>Portray demonstration data as real statistics</li>
              <li>Present a national average as a description of every Australian</li>
              <li>Suggest that cultural or ethnic groups are inherently superior or inferior</li>
              <li>Claim verification, testing or deployment that has not actually happened</li>
            </ul>
          </Callout>
        </div>
      </section>

      <section aria-labelledby="indigenous-heading" className="space-y-5">
        <h2 id="indigenous-heading" className="font-serif text-2xl text-foreground">
          Aboriginal and Torres Strait Islander data governance
        </h2>
        <div className="reading-measure space-y-4 text-secondary-foreground">
          <p>
            Statistics about Aboriginal and Torres Strait Islander peoples are
            distinct peoples&rsquo; statistics, and they are approached here with
            care: sufficient context, respect for official statistical
            disclosure practices that protect small communities, attention to
            the ABS&rsquo;s own guidance that population change between Censuses
            is not wholly explained by demographic factors, and respect for
            data-sovereignty protocols such as those maintained by AIATSIS.
          </p>
          <p>
            This project does not publish sensitive disaggregated data without
            appropriate community-governed permissions, and never homogenises
            distinct peoples and communities into a single story.
          </p>
        </div>
      </section>

      <section aria-labelledby="limits-heading" className="space-y-5">
        <h2 id="limits-heading" className="font-serif text-2xl text-foreground">
          Limitations and uncertainty
        </h2>
        <div className="reading-measure space-y-4 text-secondary-foreground">
          <p>
            Every chapter carries a &ldquo;reading the numbers carefully&rdquo;
            section covering the definitions, revisions, registration effects,
            sampling limits and comparability caveats that apply to its data.
            Where something could not be verified — for example, an
            international series whose original source was unavailable — it is
            marked as not verified rather than quietly substituted.
          </p>
          <p>
            Spot-checking a few metrics is never reported as validation of every
            chart or claim. Provenance records make the boundary of verification
            explicit for each dataset.
          </p>
        </div>
      </section>

      <section aria-labelledby="corrections-heading" className="space-y-5">
        <h2 id="corrections-heading" className="font-serif text-2xl text-foreground">
          Corrections
        </h2>
        <div className="reading-measure space-y-4 text-secondary-foreground">
          <p>
            Errors are corrected openly. Each chapter keeps a dated correction
            history, and substantive pages show publication and last-reviewed
            dates. Dataset versions are retained so that earlier analyses remain
            reproducible even after sources are revised.
          </p>
          <p className="flex items-center gap-2 text-sm text-quiet">
            <ShieldCheck aria-hidden="true" className="h-4 w-4" />
            Current content last reviewed {formatLongDate(siteConfig.lastReviewedDate)}.
          </p>
        </div>
      </section>
    </div>
  );
}
