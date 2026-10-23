"use client";

import type { ChartDefinition } from "@/lib/research/types";

function formatChartValue(value: number): string {
  if (!Number.isFinite(value)) return "";
  const formatter = new Intl.NumberFormat("en-AU");
  if (Number.isInteger(value)) return formatter.format(value);
  if (Math.abs(value) < 10) {
    return String(parseFloat(value.toFixed(3)));
  }
  return new Intl.NumberFormat("en-AU", {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(value);
}

/**
 * Accessible tabular alternative for a chart.
 *
 * - Semantic <table> with caption, column scopes and row headers.
 * - Wrapped in a scrollable region for long series with a sticky header.
 */
export function ChartDataTable({ chart }: { chart: ChartDefinition }) {
  const rowLabels = chart.series[0]?.data.map((point) => point.x) ?? [];

  return (
    <div
      className="scroll-custom max-h-96 overflow-auto rounded-md border border-border bg-panel/40"
      role="region"
      aria-label={`${chart.title} — data table`}
      tabIndex={0}
    >
      <table className="w-full border-collapse text-sm">
        <caption className="sr-only">
          {chart.title}. {chart.accessibleDescription}
        </caption>
        <thead className="sticky top-0 z-10 bg-panel">
          <tr>
            <th scope="col" className="whitespace-nowrap px-3 py-2 text-left font-medium text-quiet">
              {chart.xLabel ?? "Period"}
            </th>
            {chart.series.map((series) => (
              <th
                key={series.id}
                scope="col"
                className="whitespace-nowrap px-3 py-2 text-right font-medium text-quiet"
              >
                {series.name}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rowLabels.map((label, rowIndex) => (
            <tr key={label} className="border-t border-border/60">
              <th scope="row" className="whitespace-nowrap px-3 py-1.5 text-left font-normal text-secondary-foreground">
                {label}
              </th>
              {chart.series.map((series) => (
                <td key={series.id} className="whitespace-nowrap px-3 py-1.5 text-right tabular-nums">
                  {formatChartValue(series.data[rowIndex]?.y ?? Number.NaN)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
