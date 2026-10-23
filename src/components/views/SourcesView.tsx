"use client";

import { SectionHeading, Callout } from "@/components/shared/Callout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { chapters } from "@/chapters/registry";
import { formatLongDate } from "@/lib/research/format";
import { ExternalLink } from "lucide-react";

const AUSTRALIAN_SOURCES = [
  {
    name: "Australian Bureau of Statistics (ABS)",
    url: "https://www.abs.gov.au/",
    focus: "Census, demographics, employment, household and economic statistics — the primary statistical authority.",
  },
  {
    name: "Australian Institute of Health and Welfare (AIHW)",
    url: "https://www.aihw.gov.au/",
    focus: "Health, welfare and international comparisons in those domains.",
  },
  {
    name: "Productivity Commission",
    url: "https://www.pc.gov.au/",
    focus: "Productivity, services and rigorous analytical reports.",
  },
  {
    name: "Reserve Bank of Australia (RBA)",
    url: "https://www.rba.gov.au/",
    focus: "Monetary and financial indicators and related statistical series.",
  },
  {
    name: "Australian Institute of Family Studies (AIFS)",
    url: "https://aifs.gov.au/",
    focus: "Family and household research.",
  },
  {
    name: "Australian Electoral Commission (AEC)",
    url: "https://www.aec.gov.au/",
    focus: "Strictly descriptive institutional data where relevant. No electoral persuasion.",
  },
  {
    name: "AIATSIS",
    url: "https://aiatsis.gov.au/",
    focus: "Cultural research and Indigenous data governance protocols, with respect for Indigenous knowledge and permissions.",
  },
  {
    name: "National Indigenous Australians Agency (NIAA)",
    url: "https://www.niaa.gov.au/",
    focus: "Policy and reports, always triangulated with independent sources.",
  },
  {
    name: "Bureau of Meteorology (BoM)",
    url: "http://www.bom.gov.au/",
    focus: "Climate, hazards and weather observations.",
  },
  {
    name: "Geoscience Australia",
    url: "https://www.ga.gov.au/",
    focus: "Geoscience, hazards and spatial data.",
  },
  {
    name: "Department of Climate Change, Energy, the Environment and Water",
    url: "https://www.dcceew.gov.au/",
    focus: "Energy and environmental datasets.",
  },
  {
    name: "Department of Education",
    url: "https://www.education.gov.au/",
    focus: "Education evidence and programs.",
  },
  {
    name: "Australian Curriculum, Assessment and Reporting Authority (ACARA)",
    url: "https://www.acara.edu.au/",
    focus: "School-level education data.",
  },
  {
    name: "National Housing Supply and Affordability Council",
    url: "https://nhsac.gov.au/",
    focus: "Housing supply and affordability evidence.",
  },
];

const INTERNATIONAL_SOURCES = [
  { name: "OECD Data Explorer", url: "https://data-explorer.oecd.org/", focus: "Harmonised international series for matched comparisons." },
  { name: "World Bank Open Data", url: "https://data.worldbank.org/", focus: "Development indicators including demographic series." },
  { name: "UN DESA Population", url: "https://population.un.org/", focus: "World Population Prospects estimates and projections." },
  { name: "UNDP", url: "https://www.undp.org/", focus: "Human development reporting." },
  { name: "World Health Organization (WHO)", url: "https://www.who.int/", focus: "Health definitions and cross-national statistics." },
  { name: "ILOSTAT", url: "https://ilostat.ilo.org/", focus: "Labour statistics." },
  { name: "UNESCO UIS", url: "http://uis.unesco.org/", focus: "Education statistics." },
  { name: "IMF", url: "https://www.imf.org/", focus: "Macro-financial data." },
  { name: "FAO", url: "https://www.fao.org/", focus: "Food and agriculture statistics." },
  { name: "UNEP", url: "https://www.unep.org/", focus: "Environmental data." },
];

export function SourcesView() {
  const provenance = chapters.flatMap((chapter) =>
    chapter.provenance.map((record) => ({ chapter, record })),
  );

  return (
    <div className="mx-auto max-w-6xl space-y-14 px-4 py-10 pb-16 sm:py-14">
      <SectionHeading
        as="h1"
        eyebrow="Data sources"
        title="Where the evidence comes from"
        description="Every substantive dataset carries a typed provenance record: issuing institution, original title, deep URL, access and reference dates, definitions, extraction method, transformations, licence, verification status, comparability notes and known gaps. Provenance records for published chapters appear below."
      />

      <Callout variant="method" title="How sources are chosen">
        <p>
          Preference is given to official statistical institutions and
          independently reviewed bodies. Candidate comparator countries are
          selected per indicator — never cherry-picked — and matched on
          definitions, years, purchasing power, age ranges and geographic
          coverage, with residual differences explained.
        </p>
        <p>
          A successful download does not prove a figure: headings, units,
          sheets and rounding are checked and several observations are manually
          confirmed before a dataset is marked verified.
        </p>
      </Callout>

      <section aria-labelledby="provenance-heading" className="space-y-5">
        <h2 id="provenance-heading" className="font-serif text-2xl text-foreground">
          Provenance register ({provenance.length} datasets)
        </h2>
        <div className="scroll-custom max-h-[32rem] overflow-auto rounded-lg border border-border">
          <table className="w-full text-sm">
            <caption className="sr-only">
              Data provenance records for all published chapters
            </caption>
            <thead className="sticky top-0 bg-panel">
              <tr>
                <th scope="col" className="min-w-24 px-3 py-2 text-left font-medium text-quiet">Chapter</th>
                <th scope="col" className="min-w-56 px-3 py-2 text-left font-medium text-quiet">Dataset</th>
                <th scope="col" className="min-w-36 px-3 py-2 text-left font-medium text-quiet">Reference period</th>
                <th scope="col" className="min-w-28 px-3 py-2 text-left font-medium text-quiet">Accessed</th>
                <th scope="col" className="px-3 py-2 text-left font-medium text-quiet">Status</th>
              </tr>
            </thead>
            <tbody>
              {provenance.map(({ chapter, record }) => (
                <tr key={`${chapter.id}-${record.id}`} className="border-t border-border/60">
                  <th scope="row" className="px-3 py-2 text-left font-normal text-muted-foreground">
                    {String(chapter.number).padStart(2, "0")} · {chapter.shortTitle}
                  </th>
                  <td className="px-3 py-2">
                    <a
                      href={record.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-teal underline decoration-dotted underline-offset-2 hover:text-sand"
                    >
                      {record.originalTitle}
                    </a>
                  </td>
                  <td className="px-3 py-2 text-muted-foreground">{record.referencePeriod}</td>
                  <td className="px-3 py-2 text-muted-foreground">{formatLongDate(record.accessDate)}</td>
                  <td className="px-3 py-2">
                    {record.verificationStatus === "verified-against-source" ? (
                      <span className="text-teal">Verified</span>
                    ) : (
                      <span className="text-sand">Pending</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-labelledby="directory-heading" className="space-y-5">
        <h2 id="directory-heading" className="font-serif text-2xl text-foreground">
          Source directory
        </h2>
        <p className="reading-measure text-sm text-muted-foreground">
          Starting points used or planned across the fourteen chapters. Listing
          an institution does not imply its endorsement of this project, and
          links point to the institutions themselves.
        </p>
        <h3 className="pt-2 text-sm font-semibold uppercase tracking-wider text-teal">
          Australian institutions
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {AUSTRALIAN_SOURCES.map((source) => (
            <Card key={source.name} className="h-full bg-surface">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm leading-snug">
                  <a
                    className="inline-flex items-start gap-1.5 hover:text-sand"
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {source.name}
                    <ExternalLink aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-quiet" />
                  </a>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">{source.focus}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
        <h3 className="pt-4 text-sm font-semibold uppercase tracking-wider text-teal">
          International institutions
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INTERNATIONAL_SOURCES.map((source) => (
            <Card key={source.name} className="h-full bg-surface">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm leading-snug">
                  <a
                    className="inline-flex items-start gap-1.5 hover:text-sand"
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {source.name}
                    <ExternalLink aria-hidden="true" className="mt-0.5 h-3.5 w-3.5 shrink-0 text-quiet" />
                  </a>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">{source.focus}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <Callout variant="note" title="Licence and attribution">
        <p>
          Original text on this site is offered under Creative Commons
          Attribution 4.0 (CC BY 4.0) where applicable. Cited datasets remain
          the property of their issuing institutions under their respective
          licences; where redistribution is not permitted, we link to the
          original files instead of copying them.
        </p>
      </Callout>
    </div>
  );
}
