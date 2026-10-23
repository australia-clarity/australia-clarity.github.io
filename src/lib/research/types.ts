/**
 * Research integrity contracts shared by every chapter module.
 *
 * Chapter isolation rule: a chapter owns its content, datasets, chart
 * definitions, provenance records, notes and corrections inside its own
 * namespace. Shared components consume these typed contracts; no chapter may
 * import another chapter's private modules.
 */

export type ResearchStatus = "planned" | "in-progress" | "initial-release";

export const researchStatusLabel: Record<ResearchStatus, string> = {
  planned: "Planned",
  "in-progress": "Research in progress",
  "initial-release": "Initial release — verification continuing",
};

/** Typed provenance record for every substantive dataset (spec §4). */
export interface ProvenanceRecord {
  id: string;
  issuingInstitution: string;
  originalTitle: string;
  /** Deep URL of the exact publication used. */
  url: string;
  sourceLanguage: "en-AU" | "en";
  publicationDate?: string;
  /** Date the source was actually accessed and checked. */
  accessDate: string;
  referencePeriod: string;
  dataVersion?: string;
  coverage: string;
  unitDefinition: string;
  extractionMethod: string;
  transformations: string;
  licence: string;
  verificationStatus: "verified-against-source" | "pending";
  comparabilityNotes: string;
  knownGaps: string;
}

/** One data series of a chart definition. */
export interface ChartSeries {
  id: string;
  name: string;
  /** Hex colour from the site palette (defaults handled by the theme). */
  color?: string;
  data: Array<{ x: string; y: number }>;
}

export type ChartKind = "line" | "bar" | "pyramid" | "comparison-bar";

/** Chart definition with full provenance and accessibility requirements. */
export interface ChartDefinition {
  id: string;
  title: string;
  /** The question the chart addresses (rendered as subtitle). */
  question: string;
  kind: ChartKind;
  measurement: string;
  unit: string;
  referencePeriod: string;
  sourceId: string;
  sourceLabel: string;
  sourceUrl: string;
  /** Long plain-language description for screen readers and as visible caption. */
  accessibleDescription: string;
  /** Honest reading of what the chart shows and does not show. */
  interpretation?: string;
  /** Horizontal reference line (e.g. replacement fertility). */
  markLine?: { value: number; label: string };
  /** Bar to highlight (e.g. Australia in a comparison). */
  highlight?: string;
  xLabel?: string;
  yLabel?: string;
  csvFilename: string;
  series: ChartSeries[];
  /** Height class for the chart container. */
  height?: "sm" | "md" | "lg";
}

export type ActionScope =
  | "individual"
  | "community"
  | "professional"
  | "institutional";

export const actionScopeLabel: Record<ActionScope, string> = {
  individual: "Individual",
  community: "Community",
  professional: "Professional",
  institutional: "Institutional / public participation",
};

/** Evidence-linked action guidance (spec §5) — voluntary, nonpartisan. */
export interface ActionItem {
  scope: ActionScope;
  title: string;
  what: string;
  why: string;
  evidence: string;
  effort: string;
  limitations: string;
  startWhere: string;
}

export interface CorrectionRecord {
  date: string;
  summary: string;
  detail: string;
}

/** Content section of a chapter (prose optionally paired with a chart). */
export interface ChapterSection {
  id: string;
  heading: string;
  paragraphs: string[];
  listItems?: string[];
  chartId?: string;
}

/** The chapter contract every chapter module must satisfy. */
export interface ChapterModule {
  id: string;
  number: number;
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  status: ResearchStatus;
  /** ISO date — only set when some verified content is published. */
  lastReviewed?: string;
  version: string;
  scope: string[];
  keyQuestions: string[];
  overview?: string[];
  observations?: Array<{
    label: string;
    value: string;
    context: string;
    sourceId: string;
  }>;
  sections?: ChapterSection[];
  methodNotes?: string[];
  comparisons?: Array<{
    heading: string;
    paragraphs: string[];
    /** Optional small key-value comparison table. */
    table?: Array<{ label: string; columns: string[] }>;
    tableColumns?: string[];
    tableCaption?: string;
  }>;
  actions?: ActionItem[];
  charts?: ChartDefinition[];
  provenance: ProvenanceRecord[];
  corrections?: CorrectionRecord[];
}
