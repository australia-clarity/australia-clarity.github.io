"use client";

import { SectionHeading, Callout } from "@/components/shared/Callout";
import { siteConfig } from "@/config/site";
import { formatLongDate } from "@/lib/research/format";
import { ExternalLink, Github, HeartHandshake, ShieldCheck } from "lucide-react";

export function AboutView() {
  return (
    <div className="mx-auto max-w-6xl space-y-14 px-4 py-10 pb-16 sm:py-14">
      <SectionHeading
        as="h1"
        eyebrow="About"
        title="An independent reading of Australia"
        description={siteConfig.description}
      />

      <section aria-labelledby="mission-heading" className="space-y-5">
        <h2 id="mission-heading" className="font-serif text-2xl text-foreground">Mission</h2>
        <div className="reading-measure space-y-4 text-secondary-foreground">
          <p>
            Australia Clarity examines Australia&rsquo;s societal strengths,
            challenges, uncertainties and potential improvements through
            transparent evidence and carefully matched international
            comparison. The approach resembles a physician&rsquo;s examination:
            observe evidence before making a diagnosis, compare appropriate
            baselines, explore competing explanations, and distinguish
            possible interventions from established outcomes.
          </p>
          <p>
            A country and its people are never characterised as inherently ill
            or defective. Strengths and problem areas receive equivalent
            rigour, and national averages are never presented as universal
            experiences.
          </p>
        </div>
      </section>

      <section aria-labelledby="principles-heading" className="space-y-5">
        <h2 id="principles-heading" className="font-serif text-2xl text-foreground">Principles</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <Callout variant="method" title="Integrity before polish">
            <p>
              A robust working platform with one honestly-labelled chapter is
              better than fourteen apparently complete but unverified ones.
              Research, testing and deployment status are only ever claimed
              with evidence.
            </p>
          </Callout>
          <Callout variant="method" title="Positive and constructive">
            <p>
              Australia&rsquo;s strengths and areas for improvement are both
              examined, without narrative cherry-picking on either side.
            </p>
          </Callout>
          <Callout variant="note" title="No commercial dimension">
            <p>
              No advertising, donations, memberships, paywalls, sign-ups or
              intrusive trackers. The project is non-commercial.
            </p>
          </Callout>
          <Callout variant="note" title="Open by design">
            <p>
              Source code, datasets and their provenance are published for
              checking. Suggestions and corrections are welcome through the
              public repository.
            </p>
          </Callout>
        </div>
      </section>

      <section aria-labelledby="disclaimer-heading" className="space-y-5">
        <h2 id="disclaimer-heading" className="font-serif text-2xl text-foreground">
          Publication disclaimer
        </h2>
        <div className="reading-measure rounded-lg border border-border bg-panel/50 p-5 text-secondary-foreground sm:p-6">
          <p className="flex items-start gap-3 leading-relaxed">
            <HeartHandshake aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-teal" />
            <span>
              This is an independent, non-commercial, nonpartisan,
              evidence-based educational project that examines
              Australia&rsquo;s societal conditions through transparent
              research and international comparison. It is not affiliated
              with, sponsored by, or endorsed by any government department,
              political party, advocacy group, academic institution or other
              organization referenced here. Findings depend on the
              definitions, dates, uncertainties and limitations of cited
              evidence. References to third-party organizations do not imply
              endorsement. Third-party materials remain subject to their
              respective copyrights, attribution and licence terms.
            </span>
          </p>
        </div>
      </section>

      <section aria-labelledby="project-heading" className="space-y-5">
        <h2 id="project-heading" className="font-serif text-2xl text-foreground">The project</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-border bg-surface p-5">
            <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Github aria-hidden="true" className="h-4 w-4" />
              Repository
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              The site is developed in the open at{" "}
              <a
                href={siteConfig.repositoryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal underline decoration-dotted underline-offset-2 hover:text-sand"
              >
                australia-clarity/australia-clarity.github.io
                <ExternalLink aria-hidden="true" className="ml-1 inline h-3.5 w-3.5" />
              </a>
              , built as a static site with Next.js, TypeScript and Tailwind
              CSS, and deployed via GitHub Pages once release review is
              complete.
            </p>
          </div>
          <div className="rounded-lg border border-border bg-surface p-5">
            <p className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <ShieldCheck aria-hidden="true" className="h-4 w-4" />
              Content dates
            </p>
            <p className="mt-2 text-sm text-muted-foreground">
              Published {formatLongDate(siteConfig.publishedDate)} · last
              reviewed {formatLongDate(siteConfig.lastReviewedDate)} · version{" "}
              {siteConfig.version}. Chapter-level dates appear on each
              chapter page.
            </p>
          </div>
        </div>
        <div className="reading-measure space-y-3 text-sm text-muted-foreground">
          <p>
            Language: this site is published in Australian English only. There
            is no language switcher by design; browser translation tools can
            be used independently by any reader.
          </p>
          <p>
            The project does not accept sponsorships or donations and does
            not run fundraising of any kind. If you see this content behind a
            paywall or with advertising, it is not this project.
          </p>
        </div>
      </section>
    </div>
  );
}
