import type { EChartsOption, LineSeriesOption } from "echarts";
import type { ChartDefinition } from "@/lib/research/types";

/**
 * Australia Clarity chart theme and option builders.
 *
 * All charts are interactive (hover/touch tooltips), legend-togglable and
 * rendered client-side with ECharts. Colour is never the only differentiator:
 * legends, axis labels, tooltips and the accessible table alternative carry
 * the same information.
 */

export const chartPalette = [
  "#6FA3A8", // muted teal
  "#C8B38E", // soft sand
  "#7F93A6", // dusty blue
  "#9FB8C4", // light steel
  "#D8C7A8", // pale sand
  "#8FA8B8", // light dusty
] as const;

const FOREGROUND = "#E8EEF3";
const SECONDARY_TEXT = "#C7D1DA";
const QUIET_TEXT = "#93A1AE";
const BORDER = "#2A3642";
const PANEL = "#1B2530";
const TEAL = "#6FA3A8";
const SAND = "#C8B38E";
const DUSTY = "#7F93A6";

const FONT =
  'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif';

function enAu(value: number): string {
  return new Intl.NumberFormat("en-AU").format(value);
}

function baseTooltip() {
  return {
    trigger: "axis" as const,
    backgroundColor: PANEL,
    borderColor: BORDER,
    borderWidth: 1,
    padding: [8, 12],
    textStyle: { color: FOREGROUND, fontSize: 12, fontFamily: FONT },
    confine: true,
    extraCssText: "max-width: 70vw; white-space: normal;",
  };
}

function baseLegend(seriesNames: string[]) {
  return {
    type: "scroll" as const,
    top: 0,
    textStyle: { color: SECONDARY_TEXT, fontSize: 12, fontFamily: FONT },
    inactiveColor: "#5a6773",
    itemWidth: 16,
    itemHeight: 8,
    icon: "roundRect",
    data: seriesNames,
  };
}

function baseGrid() {
  return {
    left: 8,
    right: 16,
    top: 40,
    bottom: 8,
    containLabel: true,
  };
}

function baseXAxisCategory(categories: string[], rotate = 0) {
  return {
    type: "category" as const,
    data: categories,
    boundaryGap: false,
    axisLine: { lineStyle: { color: BORDER } },
    axisTick: { show: false },
    axisLabel: {
      color: SECONDARY_TEXT,
      fontSize: 11,
      fontFamily: FONT,
      rotate,
      hideOverlap: true,
    },
  };
}

function baseYAxis(name?: string) {
  return {
    type: "value" as const,
    name,
    nameTextStyle: { color: QUIET_TEXT, fontSize: 11, fontFamily: FONT },
    axisLine: { show: false },
    axisTick: { show: false },
    axisLabel: {
      color: SECONDARY_TEXT,
      fontSize: 11,
      fontFamily: FONT,
      formatter: (value: number) => enAu(value),
    },
    splitLine: {
      lineStyle: { color: BORDER, type: "dashed" as const, opacity: 0.7 },
    },
  };
}

/** Builds a complete ECharts option for a chart definition. */
export function buildEChartsOption(chart: ChartDefinition): EChartsOption {
  switch (chart.kind) {
    case "line":
      return buildLineOption(chart);
    case "bar":
      return buildBarOption(chart);
    case "comparison-bar":
      return buildComparisonBarOption(chart);
    case "pyramid":
      return buildPyramidOption(chart);
  }
}

function buildLineOption(chart: ChartDefinition): EChartsOption {
  const categories = chart.series[0]?.data.map((point) => point.x) ?? [];
  const lineSeries: LineSeriesOption[] = chart.series.map((series, index) => ({
    name: series.name,
    type: "line" as const,
    symbol: "none",
    smooth: 0.15,
    lineStyle: { width: 2, color: series.color ?? chartPalette[index % chartPalette.length] },
    itemStyle: { color: series.color ?? chartPalette[index % chartPalette.length] },
    emphasis: { focus: "series" as const },
    data: series.data.map((point) => point.y),
  }));
  if (chart.markLine) {
    for (const series of lineSeries) {
      series.markLine = {
        silent: true,
        symbol: "none",
        lineStyle: { color: SAND, type: "dashed", width: 1.5 },
        label: {
          formatter: chart.markLine.label,
          color: SAND,
          fontSize: 11,
          fontFamily: FONT,
          position: "insideEndTop",
        },
        data: [{ yAxis: chart.markLine.value }],
      };
    }
  }
  return {
    animationDuration: 300,
    textStyle: { fontFamily: FONT },
    tooltip: {
      ...baseTooltip(),
      axisPointer: { type: "line", lineStyle: { color: BORDER } },
    },
    legend: chart.series.length > 1 ? baseLegend(chart.series.map((s) => s.name)) : undefined,
    grid: baseGrid(),
    xAxis: baseXAxisCategory(categories),
    yAxis: baseYAxis(chart.yLabel),
    series: lineSeries,
  };
}

function buildBarOption(chart: ChartDefinition): EChartsOption {
  const series = chart.series[0];
  const rotate = (series?.data.length ?? 0) > 6 ? 32 : 0;
  return {
    animationDuration: 300,
    textStyle: { fontFamily: FONT },
    tooltip: {
      ...baseTooltip(),
      trigger: "item",
      axisPointer: { type: "shadow" },
      valueFormatter: (value) => enAu(Number(value)),
    },
    grid: { ...baseGrid(), top: 24 },
    xAxis: {
      type: "category",
      data: series?.data.map((point) => point.x) ?? [],
      axisLine: { lineStyle: { color: BORDER } },
      axisTick: { show: false },
      axisLabel: { color: SECONDARY_TEXT, fontSize: 11, fontFamily: FONT, rotate, interval: 0 },
    },
    yAxis: baseYAxis(chart.yLabel),
    series: [
      {
        name: series?.name ?? chart.title,
        type: "bar",
        barMaxWidth: 36,
        itemStyle: { color: TEAL, borderRadius: [3, 3, 0, 0] },
        emphasis: { itemStyle: { color: "#84b3b8" } },
        data: series?.data.map((point) => point.y) ?? [],
      },
    ],
  };
}

function buildComparisonBarOption(chart: ChartDefinition): EChartsOption {
  const series = chart.series[0];
  const sorted = [...(series?.data ?? [])].sort((a, b) => b.y - a.y);
  return {
    animationDuration: 300,
    textStyle: { fontFamily: FONT },
    tooltip: {
      ...baseTooltip(),
      trigger: "item",
      axisPointer: { type: "shadow" },
      valueFormatter: (value) => `${Number(value).toFixed(2)} ${chart.unit}`,
    },
    grid: { ...baseGrid(), top: 24 },
    xAxis: {
      type: "category",
      data: sorted.map((point) => point.x),
      axisLine: { lineStyle: { color: BORDER } },
      axisTick: { show: false },
      axisLabel: { color: SECONDARY_TEXT, fontSize: 11, fontFamily: FONT, rotate: 32, interval: 0 },
    },
    yAxis: baseYAxis(chart.yLabel),
    series: [
      {
        name: series?.name ?? chart.title,
        type: "bar",
        barMaxWidth: 30,
        itemStyle: { borderRadius: [3, 3, 0, 0] },
        emphasis: { itemStyle: { color: "#84b3b8" } },
        data: sorted.map((point) => ({
          value: point.y,
          itemStyle:
            point.x === chart.highlight
              ? { color: TEAL, borderColor: SAND, borderWidth: 1.5 }
              : { color: DUSTY, borderWidth: 0 },
        })),
      },
    ],
  };
}

function buildPyramidOption(chart: ChartDefinition): EChartsOption {
  const maleSeries = chart.series.find((series) => /male/i.test(series.id) && !/female/i.test(series.id));
  const femaleSeries = chart.series.find((series) => /female/i.test(series.id));
  const categories = maleSeries?.data.map((point) => point.x) ?? [];
  return {
    animationDuration: 300,
    textStyle: { fontFamily: FONT },
    tooltip: {
      ...baseTooltip(),
      trigger: "item",
      axisPointer: { type: "shadow" },
      formatter: (params) => {
        const p = Array.isArray(params) ? params[0] : params;
        const value = typeof p.value === "number" ? Math.abs(Number(p.value)) : 0;
        const seriesName = typeof p.seriesName === "string" ? p.seriesName : "";
        return `<strong>${p.categoryLabel ?? p.name}</strong><br/>${seriesName}: ${enAu(value)}`;
      },
    },
    legend: baseLegend([maleSeries?.name ?? "Males", femaleSeries?.name ?? "Females"]),
    grid: { ...baseGrid(), top: 40 },
    xAxis: {
      type: "value",
      axisLine: { show: false },
      axisTick: { show: false },
      axisLabel: {
        color: SECONDARY_TEXT,
        fontSize: 11,
        fontFamily: FONT,
        formatter: (value: number) => enAu(Math.abs(value)),
      },
      splitLine: { lineStyle: { color: BORDER, type: "dashed", opacity: 0.7 } },
    },
    yAxis: {
      type: "category",
      data: categories,
      inverse: true,
      axisLine: { lineStyle: { color: BORDER } },
      axisTick: { show: false },
      axisLabel: { color: SECONDARY_TEXT, fontSize: 11, fontFamily: FONT },
    },
    series: [
      {
        name: maleSeries?.name ?? "Males",
        type: "bar",
        stack: "population",
        barMaxWidth: 16,
        itemStyle: { color: DUSTY, borderRadius: [3, 0, 0, 3] },
        emphasis: { focus: "series" },
        data: maleSeries?.data.map((point) => -point.y) ?? [],
      },
      {
        name: femaleSeries?.name ?? "Females",
        type: "bar",
        stack: "population",
        barMaxWidth: 16,
        itemStyle: { color: SAND, borderRadius: [0, 3, 3, 0] },
        emphasis: { focus: "series" },
        data: femaleSeries?.data.map((point) => point.y) ?? [],
      },
    ],
  };
}
