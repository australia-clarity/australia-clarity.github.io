import type { ResearchStatus } from "@/lib/research/types";
import { researchStatusLabel } from "@/lib/research/types";
import { cn } from "@/lib/utils";

const statusStyles: Record<ResearchStatus, { dot: string; text: string }> = {
  planned: { dot: "bg-muted-foreground", text: "text-muted-foreground" },
  "in-progress": { dot: "bg-sand", text: "text-sand" },
  "initial-release": { dot: "bg-teal", text: "text-teal" },
};

/** Honest research-status badge (never implies completion that hasn't happened). */
export function StatusBadge({
  status,
  className,
}: {
  status: ResearchStatus;
  className?: string;
}) {
  const styles = statusStyles[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border bg-panel/60 px-3 py-1 text-xs font-medium",
        styles.text,
        className,
      )}
    >
      <span aria-hidden="true" className={cn("h-2 w-2 rounded-full", styles.dot)} />
      {researchStatusLabel[status]}
    </span>
  );
}
