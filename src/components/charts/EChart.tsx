"use client";

import { useEffect, useRef } from "react";
import type { EChartsOption, EChartsType } from "echarts";

export interface EChartProps {
  option: EChartsOption;
  className?: string;
  ariaLabel: string;
}

/**
 * Lifecycle-safe ECharts wrapper.
 *
 * - ECharts is imported lazily on the client only (static-export compatible).
 * - Every mount creates a fresh chart instance; every unmount disposes it,
 *   disconnects the ResizeObserver and clears the instance reference. This is
 *   what makes repeated Chart → Table → Chart toggles restore reliably.
 * - Container resize triggers `chart.resize()` so mobile rotation and
 *   responsive layout changes never clip the canvas.
 */
export function EChart({ option, className, ariaLabel }: EChartProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let cancelled = false;
    let observer: ResizeObserver | null = null;
    let chart: EChartsType | null = null;

    void import("echarts").then((echarts) => {
      if (cancelled || !containerRef.current) return;
      chart = echarts.init(containerRef.current);
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      chart.setOption({
        ...option,
        animation: !prefersReducedMotion && option.animation !== false,
      });
      observer = new ResizeObserver(() => {
        chart?.resize();
      });
      observer.observe(containerRef.current);
    });

    return () => {
      cancelled = true;
      observer?.disconnect();
      observer = null;
      chart?.dispose();
      chart = null;
    };
  }, [option]);

  return (
    <div
      ref={containerRef}
      className={className}
      role="img"
      aria-label={ariaLabel}
    />
  );
}
