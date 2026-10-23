import type { ChapterModule } from "@/lib/research/types";
import { chapter01Content } from "@/chapters/chapter-01/content";
import { chapter01Charts } from "@/chapters/chapter-01/charts/charts";
import { chapter01Provenance } from "@/chapters/chapter-01/sources/provenance";

/** Chapter 01 — Population & Family (first substantive research priority). */
export const chapter01: ChapterModule = {
  id: "chapter-01",
  number: 1,
  slug: "population-family",
  ...chapter01Content,
  charts: chapter01Charts,
  provenance: chapter01Provenance,
};
