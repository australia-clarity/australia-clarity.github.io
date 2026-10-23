import type { ChapterModule } from "@/lib/research/types";
import { chapter01 } from "@/chapters/chapter-01";
import { plannedChapters } from "@/chapters/planned-chapters";

/**
 * Typed chapter registry — the single public index of research chapters.
 *
 * - All 14 slots always exist; status is shown honestly.
 * - Chapters are isolated: the registry exposes only typed ChapterModule
 *   objects; no cross-chapter private imports exist.
 */
export const chapters: ChapterModule[] = [chapter01, ...plannedChapters];

export function getChapter(id: string): ChapterModule | undefined {
  return chapters.find((chapter) => chapter.id === id);
}

export const crossCuttingLens = {
  title: "A cross-cutting lens in every chapter",
  intro:
    "Every relevant chapter examines differences across these dimensions rather than relying on national averages alone:",
  items: [
    "Aboriginal and Torres Strait Islander peoples, with respect for Indigenous data governance and culturally safe interpretation",
    "State and territory differences — Australia is a federation, not a single jurisdiction",
    "Metropolitan, regional and remote Australia",
    "Age and socio-economic groups",
    "Gender where relevant",
    "Disability and accessibility where relevant",
    "Migration background where classification is methodologically and ethically sound",
  ],
  caveat:
    "A national average is never a description of every Australian. Distinct peoples and communities are never homogenised.",
} as const;
