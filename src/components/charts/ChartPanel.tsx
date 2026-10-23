"use client";

import { useCallback, useMemo, useState } from "react";
import { BarChart3, Download, Table2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ChartDefinition } from "@/lib/research/types";
import { EChart } from "@/components/charts/EChart";
import { ChartDataTable } from "@/components/charts/ChartDataTable";
import { buildEChartsOption } from "@/components/charts/chartTheme";

const heightClasses = {
  sm: "h-[280px]",
  md: "h-[360px]",
  lg: "h-[460px]",
} as const;

function buildCsv(chart: ChartDefinition): string {
  const escape = (value: string) =>
    /[",\n]/.test(value) ? `"${value.replace(/"/g, '""')}"` : value;
  const header = [chart.xLabel ?? "Period", ...chart.series.map((s) => s.name)]
    .map(escape)
    .join(",");
  const rows: string[] = [header];
  const rowCount = chart.series[0]?.data.length ?? 0;
  for (let i = 0; i < rowCount; i += 1) {
    const label = chart.series[0]?.data[i]?.x ?? "";
    const values = chart.series
      .map((series) => series.data[i]?.y)
      .map((value) => (value === undefined ? "" : String(value)))
      .map(escape);
    rows.push([escape(label), ...values].join(","));
  }
  return rows.join("\r\n");
}

/**
 * Interactive chart panel with:
 * - keyboard-operable Chart ↔ Table toggle (repeated toggles always restore
 *   the chart, because each mode switch unmounts/remounts a clean instance);
 * - CSV export of the plotted data;
 * - measurement, unit, reference period, citation and accessible description.
 */
export function ChartPanel({ chart }: { chart: ChartDefinition }) {
  const [mode, setMode] = useState<"chart" | "table">("chart");
  const option = useMemo(() => buildEChartsOption(chart), [chart]);
  const csv = useMemo(() => buildCsv(chart), [chart]);

  const downloadCsv = useCallback(() => {
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = chart.csvFilename;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);
  }, [chart.csvFilename, csv]);

  const headingId = `chart-heading-${chart.id}`;

  return (
    <figure
      aria-labelledby={headingId}
      className="overflow-hidden rounded-lg border border-border bg-surface"
    >
      <div className="flex flex-col gap-3 border-b border-border p-4 sm:flex-row sm:items-start sm:justify-between sm:p-5">
        <div className="min-w-0">
          <h3 id={headingId} className="text-base font-semibold text-foreground sm:text-lg">
            {chart.title}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{chart.question}</p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            aria-pressed={mode === "table"}
            onClick={() => setMode((current) => (current === "chart" ? "table" : "chart"))}
          >
            {mode === "chart" ? (
              <>
                <Table2 aria-hidden="true" className="h-4 w-4" />
                View as table
              </>
            ) : (
              <>
                <BarChart3 aria-hidden="true" className="h-4 w-4" />
                View as chart
              </>
            )}
            <span className="sr-only">
              {mode === "chart"
                ? "for the chart titled " + chart.title
                : "for the chart titled " + chart.title}
            </span>
          </Button>
          <Button type="button" variant="outline" size="sm" onClick={downloadCsv}>
            <Download aria-hidden="true" className="h-4 w-4" />
            Download CSV
          </Button>
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        {mode === "chart"
          ? "Showing the interactive chart."
          : "Showing the data as an accessible table."}
      </p>

      <div className="p-4 sm:p-5">
        {mode === "chart" ? (
          <EChart
            option={option}
            ariaLabel={`${chart.title}. ${chart.accessibleDescription}`}
            className={`${heightClasses[chart.height ?? "md"]} w-full`}
          />
        ) : (
          <ChartDataTable chart={chart} />
        )}
      </div>

      <figcaption className="space-y-2 border-t border-border bg-panel/40 px-4 py-3 text-sm sm:px-5">
        <p className="text-muted-foreground">{chart.accessibleDescription}</p>
        {chart.interpretation ? (
          <p className="text-secondary-foreground">
            <span className="font-medium text-foreground">How to read this: </span>
            {chart.interpretation}
          </p>
        ) : null}
        <p className="text-xs text-quiet">
          Measurement: {chart.measurement} · Unit: {chart.unit} · Reference period:{" "}
          {chart.referencePeriod} · Source:{" "}
          <a
            href={chart.sourceUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline decoration-dotted underline-offset-2 hover:text-sand"
          >
            {chart.sourceLabel}
          </a>
        </p>
      </figcaption>
    </figure>
  );
}
