import { Info, Scale, TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";

type CalloutVariant = "note" | "method" | "caution";

const variants: Record<CalloutVariant, { icon: typeof Info; className: string }> = {
  note: { icon: Info, className: "border-dusty/40 text-dusty" },
  method: { icon: Scale, className: "border-teal/40 text-teal" },
  caution: { icon: TriangleAlert, className: "border-sand/50 text-sand" },
};

/** Calm callout for context, method notes and cautions. */
export function Callout({
  variant = "note",
  title,
  children,
  className,
}: {
  variant?: CalloutVariant;
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  const config = variants[variant];
  const Icon = config.icon;
  return (
    <aside
      className={cn(
        "rounded-lg border border-l-4 bg-panel/50 p-4 sm:p-5",
        config.className,
        className,
      )}
    >
      <p className="flex items-center gap-2 text-sm font-semibold">
        <Icon aria-hidden="true" className="h-4 w-4" />
        {title}
      </p>
      <div className="mt-2 space-y-2 text-sm leading-relaxed text-secondary-foreground">
        {children}
      </div>
    </aside>
  );
}

/** Page section heading with eyebrow, title and optional description. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  as: Tag = "h2",
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  as?: "h1" | "h2";
  className?: string;
}) {
  return (
    <div className={cn("space-y-3", className)}>
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-teal">
          {eyebrow}
        </p>
      ) : null}
      <Tag
        tabIndex={-1}
        className="font-serif text-2xl leading-tight text-foreground sm:text-3xl"
      >
        {title}
      </Tag>
      {description ? (
        <p className="reading-measure text-base leading-relaxed text-muted-foreground">
          {description}
        </p>
      ) : null}
    </div>
  );
}
